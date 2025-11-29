"use client";

import { PoseDetector } from "@/components/yoga/PoseDetector";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Timer, Trophy, Maximize2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function YogaSessionPage() {
    const { id } = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [showCountdown, setShowCountdown] = useState(true);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showCountdown && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (showCountdown && countdown === 0) {
            setShowCountdown(false);
            setIsPlaying(true);
        }
        return () => clearTimeout(timer);
    }, [countdown, showCountdown]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] gap-4">
            {/* Header */}
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100 rounded-full">
                        <Link href="/yoga">
                            <ArrowLeft className="h-6 w-6 text-gray-700" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Chair Yoga Session</h1>
                        <p className="text-xs text-muted-foreground font-medium">Focus: Balance & Flexibility</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                        <Timer className="h-5 w-5 text-blue-500" />
                        <span className="font-mono font-bold text-blue-700">{formatTime(duration)}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <span className="font-bold text-yellow-700">Score: 85</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative flex-1 bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                <AnimatePresence>
                    {showCountdown && (
                        <motion.div
                            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                key={countdown}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: 1 }}
                                exit={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-9xl font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                            >
                                {countdown > 0 ? countdown : "GO!"}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <PoseDetector />

                {/* Overlay Controls */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                    <span className="text-white font-medium">Current Pose: <span className="text-green-400 font-bold">Mountain Pose</span></span>
                </div>

                <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:bg-white/20">
                    <Maximize2 className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}
