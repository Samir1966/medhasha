"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Play, RefreshCw } from "lucide-react";

const questions = [
    {
        id: 1,
        items: ["🍎", "🍌", "🍇", "🚗"],
        answer: "🚗",
        reason: "Car is a vehicle, others are fruits."
    },
    {
        id: 2,
        items: ["🐶", "🐱", "🐰", "🌲"],
        answer: "🌲",
        reason: "Tree is a plant, others are animals."
    },
    {
        id: 3,
        items: ["⚽", "🏀", "🎾", "🎸"],
        answer: "🎸",
        reason: "Guitar is an instrument, others are sports balls."
    },
    {
        id: 4,
        items: ["🌞", "🌝", "⭐", "🌧️"],
        answer: "🌧️",
        reason: "Rain is weather, others are celestial bodies (simplified)."
    },
    {
        id: 5,
        items: ["🔴", "🟦", "🔺", "🟩"],
        answer: "🔺",
        reason: "Triangle is a shape, others are colors (represented by shapes but focus is color/shape distinction)."
    }
];

export default function OddOneOutGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'result' | 'finished'>('idle');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const startGame = () => {
        setCurrentQuestion(0);
        setScore(0);
        setGameState('playing');
        setSelectedItem(null);
        setFeedback(null);
    };

    const handleSelect = (item: string) => {
        setSelectedItem(item);
        const correct = item === questions[currentQuestion].answer;

        if (correct) {
            setScore(score + 1);
            setFeedback("Correct! " + questions[currentQuestion].reason);
        } else {
            setFeedback("Wrong! " + questions[currentQuestion].reason);
        }
        setGameState('result');
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setGameState('playing');
            setSelectedItem(null);
            setFeedback(null);
        } else {
            setGameState('finished');
        }
    };

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">Odd One Out</h2>
                <div className="text-lg font-medium">Score: {score}/{questions.length}</div>
            </div>

            <Card className="min-h-[400px] flex flex-col justify-center items-center text-center p-6">
                {gameState === 'idle' && (
                    <div className="space-y-4">
                        <p className="text-muted-foreground">Find the item that doesn't belong in the group.</p>
                        <Button size="lg" onClick={startGame} className="gap-2">
                            <Play className="h-5 w-5" /> Start Game
                        </Button>
                    </div>
                )}

                {(gameState === 'playing' || gameState === 'result') && (
                    <div className="w-full space-y-8">
                        <h3 className="text-xl font-medium">Which one is different?</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {questions[currentQuestion].items.map((item, index) => (
                                <Button
                                    key={index}
                                    variant={selectedItem === item ? (item === questions[currentQuestion].answer ? "default" : "destructive") : "outline"}
                                    className={`h-24 text-4xl transition-all ${gameState === 'result' && item === questions[currentQuestion].answer ? "ring-4 ring-green-500" : ""}`}
                                    onClick={() => gameState === 'playing' && handleSelect(item)}
                                    disabled={gameState === 'result'}
                                >
                                    {item}
                                </Button>
                            ))}
                        </div>

                        {gameState === 'result' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4">
                                <div className={`p-4 rounded-lg ${selectedItem === questions[currentQuestion].answer ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                    <p className="font-medium">{feedback}</p>
                                </div>
                                <Button onClick={nextQuestion} size="lg" className="w-full">
                                    {currentQuestion + 1 < questions.length ? "Next Question" : "Finish Game"}
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {gameState === 'finished' && (
                    <div className="space-y-6">
                        <div className="text-primary">
                            <CheckCircle className="h-20 w-20 mx-auto mb-4" />
                            <h3 className="text-3xl font-bold">Game Over!</h3>
                        </div>
                        <p className="text-xl">You scored {score} out of {questions.length}</p>
                        <Button onClick={startGame} size="lg" className="gap-2">
                            <RefreshCw className="h-4 w-4" /> Play Again
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}
