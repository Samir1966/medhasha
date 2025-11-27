"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Play, RefreshCw, CheckCircle, XCircle } from "lucide-react";

export default function NumberRecallGame() {
    const [level, setLevel] = useState(1);
    const [sequence, setSequence] = useState<string>("");
    const [userInput, setUserInput] = useState("");
    const [gameState, setGameState] = useState<'idle' | 'memorize' | 'recall' | 'result'>('idle');
    const [timeLeft, setTimeLeft] = useState(0);
    const [score, setScore] = useState(0);

    const generateSequence = (length: number) => {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10).toString();
        }
        return result;
    };

    const startGame = () => {
        const newSequence = generateSequence(level + 2); // Start with 3 digits
        setSequence(newSequence);
        setGameState('memorize');
        setTimeLeft(3 + level); // More time for longer sequences
        setUserInput("");
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === 'memorize' && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (gameState === 'memorize' && timeLeft === 0) {
            setGameState('recall');
        }
        return () => clearTimeout(timer);
    }, [gameState, timeLeft]);

    const handleSubmit = () => {
        if (userInput === sequence) {
            setScore(score + 10);
            setLevel(level + 1);
            setGameState('result');
        } else {
            setGameState('result');
        }
    };

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">Number Recall</h2>
                <div className="text-lg font-medium">Score: {score}</div>
            </div>

            <Card className="min-h-[300px] flex flex-col justify-center items-center text-center p-6">
                {gameState === 'idle' && (
                    <div className="space-y-4">
                        <p className="text-muted-foreground">Memorize the number sequence shown on screen.</p>
                        <Button size="lg" onClick={startGame} className="gap-2">
                            <Play className="h-5 w-5" /> Start Game
                        </Button>
                    </div>
                )}

                {gameState === 'memorize' && (
                    <div className="space-y-6">
                        <p className="text-sm text-muted-foreground">Memorize this number:</p>
                        <div className="text-6xl font-bold tracking-widest text-primary animate-in zoom-in duration-300">
                            {sequence}
                        </div>
                        <Progress value={(timeLeft / (3 + level)) * 100} className="w-full" />
                        <p className="text-sm font-medium text-red-500">Time left: {timeLeft}s</p>
                    </div>
                )}

                {gameState === 'recall' && (
                    <div className="space-y-6 w-full">
                        <p className="text-lg font-medium">What was the number?</p>
                        <Input
                            type="number"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="text-center text-2xl tracking-widest"
                            placeholder="Enter number"
                            autoFocus
                        />
                        <Button size="lg" onClick={handleSubmit} className="w-full">Submit</Button>
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="space-y-6">
                        {userInput === sequence ? (
                            <div className="text-green-600 space-y-2">
                                <CheckCircle className="h-16 w-16 mx-auto" />
                                <h3 className="text-2xl font-bold">Correct!</h3>
                                <p>Next level will be harder.</p>
                                <Button onClick={startGame} size="lg" className="mt-4">Next Level</Button>
                            </div>
                        ) : (
                            <div className="text-red-600 space-y-2">
                                <XCircle className="h-16 w-16 mx-auto" />
                                <h3 className="text-2xl font-bold">Wrong!</h3>
                                <p className="text-foreground">The number was: <span className="font-bold">{sequence}</span></p>
                                <Button onClick={() => { setLevel(1); setScore(0); startGame(); }} variant="outline" size="lg" className="mt-4 gap-2">
                                    <RefreshCw className="h-4 w-4" /> Try Again
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
}
