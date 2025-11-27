"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import Script from "next/script";

// Declare global types for MediaPipe
declare global {
    interface Window {
        Pose: any;
        POSE_CONNECTIONS: any;
        drawConnectors: any;
        drawLandmarks: any;
    }
}

export function PoseDetector() {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [feedback, setFeedback] = useState("Align your body in the frame");
    const [score, setScore] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const poseRef = useRef<any>(null);
    const requestRef = useRef<number>(0);

    const onResults = useCallback((results: any) => {
        if (!canvasRef.current || !webcamRef.current?.video) return;

        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const canvasCtx = canvasRef.current.getContext("2d");
        if (!canvasCtx) return;

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        if (results.poseLandmarks) {
            if (window.drawConnectors && window.POSE_CONNECTIONS) {
                window.drawConnectors(canvasCtx, results.poseLandmarks, window.POSE_CONNECTIONS, {
                    color: "#00FF00",
                    lineWidth: 4,
                });
            }

            if (window.drawLandmarks) {
                window.drawLandmarks(canvasCtx, results.poseLandmarks, {
                    color: "#FF0000",
                    lineWidth: 2,
                    radius: 4
                });
            }

            const leftWrist = results.poseLandmarks[15];
            const rightWrist = results.poseLandmarks[16];
            const nose = results.poseLandmarks[0];

            if (leftWrist && rightWrist && nose) {
                if (leftWrist.y < nose.y && rightWrist.y < nose.y) {
                    setFeedback("Great! Arms raised high.");
                    setScore((prev) => Math.min(prev + 1, 100));
                } else {
                    setFeedback("Raise your arms above your head!");
                }
            }
        }
        canvasCtx.restore();
    }, []);

    const initializePose = useCallback(() => {
        if (window.Pose && !poseRef.current) {
            try {
                const pose = new window.Pose({
                    locateFile: (file: string) => {
                        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
                    },
                });

                pose.setOptions({
                    modelComplexity: 1,
                    smoothLandmarks: true,
                    enableSegmentation: false,
                    smoothSegmentation: false,
                    minDetectionConfidence: 0.5,
                    minTrackingConfidence: 0.5,
                });

                pose.onResults(onResults);
                poseRef.current = pose;
                setIsModelLoaded(true);
                console.log("Pose model initialized");
            } catch (err) {
                console.error("Error initializing Pose:", err);
                setError("Failed to initialize AI model.");
            }
        }
    }, [onResults]);

    useEffect(() => {
        if (isModelLoaded) {
            return () => {
                if (poseRef.current) {
                    poseRef.current.close();
                }
            };
        }
    }, [isModelLoaded]);

    const detect = useCallback(async () => {
        if (
            webcamRef.current &&
            webcamRef.current.video &&
            webcamRef.current.video.readyState === 4 &&
            poseRef.current
        ) {
            try {
                await poseRef.current.send({ image: webcamRef.current.video });
            } catch (err) {
                console.error("Detection error:", err);
            }
        }
        if (isDetecting) {
            requestRef.current = requestAnimationFrame(detect);
        }
    }, [isDetecting]);

    useEffect(() => {
        if (isDetecting && isModelLoaded) {
            requestRef.current = requestAnimationFrame(detect);
        } else {
            cancelAnimationFrame(requestRef.current);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [isDetecting, detect, isModelLoaded]);

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <Script
                src="https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js"
                strategy="lazyOnload"
                onLoad={initializePose}
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
                strategy="lazyOnload"
            />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-xl border-4 border-primary bg-black shadow-2xl">
                <Webcam
                    ref={webcamRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    mirrored
                />
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {!isModelLoaded && !error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                        <div className="text-white text-xl font-bold animate-pulse">Loading AI Model...</div>
                    </div>
                )}

                <div className="absolute top-4 right-4 z-10">
                    <div className="rounded-lg bg-black/60 px-4 py-2 text-white backdrop-blur-md">
                        <span className="text-sm font-bold uppercase tracking-wider">Score</span>
                        <div className="text-2xl font-bold text-green-400">{score}%</div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
                    <span className="rounded-full bg-black/70 px-6 py-3 text-lg font-medium text-white backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-4">
                        {feedback}
                    </span>
                </div>
            </div>

            <div className="flex gap-4 w-full max-w-md justify-center">
                <Button
                    size="lg"
                    className="w-32 h-12 text-lg"
                    variant={isDetecting ? "destructive" : "default"}
                    onClick={() => setIsDetecting(!isDetecting)}
                    disabled={!isModelLoaded}
                >
                    {isDetecting ? <><Pause className="mr-2" /> Pause</> : <><Play className="mr-2" /> Start</>}
                </Button>
                <Button variant="outline" size="lg" className="w-32 h-12 text-lg" onClick={() => setScore(0)}>
                    <RotateCcw className="mr-2" /> Reset
                </Button>
            </div>
        </div>
    );
}
