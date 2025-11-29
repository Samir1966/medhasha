"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Heart, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const COLORS = [
    { id: 0, name: "red", bg: "bg-red-500", glow: "shadow-red-500/50", hover: "hover:bg-red-600" },
    { id: 1, name: "blue", bg: "bg-blue-500", glow: "shadow-blue-500/50", hover: "hover:bg-blue-600" },
    { id: 2, name: "green", bg: "bg-green-500", glow: "shadow-green-500/50", hover: "hover:bg-green-600" },
    { id: 3, name: "yellow", bg: "bg-yellow-500", glow: "shadow-yellow-500/50", hover: "hover:bg-yellow-600" },
];

export function ColorSequence() {
    const [sequence, setSequence] = useState<number[]>([]);
    const [userSequence, setUserSequence] = useState<number[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isUserTurn, setIsUserTurn] = useState(false);
    const [activeColor, setActiveColor] = useState<number | null>(null);
    const [lives, setLives] = useState(3);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
    const [showCelebration, setShowCelebration] = useState(false);

    const startGame = () => {
        setSequence([]);
        setUserSequence([]);
        setLives(3);
        setStreak(0);
        setGameState("playing");
        setIsPlaying(false);
        setIsUserTurn(false);
        setTimeout(() => {
            addToSequence();
        }, 500);
    };

    const addToSequence = () => {
        const newColor = Math.floor(Math.random() * 4);
        const newSequence = [...sequence, newColor];
        setSequence(newSequence);
        setUserSequence([]);
        playSequence(newSequence);
    };

    const playSequence = async (seq: number[]) => {
        setIsPlaying(true);
        setIsUserTurn(false);

        await new Promise((resolve) => setTimeout(resolve, 500));

        for (let i = 0; i < seq.length; i++) {
            setActiveColor(seq[i]);
            await new Promise((resolve) => setTimeout(resolve, 600));
            setActiveColor(null);
            await new Promise((resolve) => setTimeout(resolve, 200));
        }

        setIsPlaying(false);
        setIsUserTurn(true);
    };

    const handleColorClick = async (colorId: number) => {
        if (!isUserTurn || isPlaying) return;

        const newUserSequence = [...userSequence, colorId];
        setUserSequence(newUserSequence);

        // Flash the color
        setActiveColor(colorId);
        setTimeout(() => setActiveColor(null), 300);

        // Check if correct
        const currentIndex = newUserSequence.length - 1;
        if (sequence[currentIndex] !== colorId) {
            // Wrong color
            handleWrongColor();
        } else if (newUserSequence.length === sequence.length) {
            // Sequence completed successfully
            handleCorrectSequence();
        }
    };

    const handleCorrectSequence = async () => {
        setIsUserTurn(false);
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) {
            setBestStreak(newStreak);
        }

        setShowCelebration(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setShowCelebration(false);

        // Add next color to sequence
        setTimeout(() => {
            addToSequence();
        }, 500);
    };

    const handleWrongColor = async () => {
        setIsUserTurn(false);
        const newLives = lives - 1;
        setLives(newLives);
        setStreak(0);

        if (newLives === 0) {
            setGameState("gameover");
        } else {
            // Replay the sequence
            await new Promise((resolve) => setTimeout(resolve, 1000));
            playSequence(sequence);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            {/* Header Stats */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex w-full max-w-md items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-red-500/20 via-blue-500/20 to-green-500/20 backdrop-blur-lg p-4 border border-purple-300 dark:border-purple-500/30"
            >
                <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-600" />
                    <div>
                        <p className="text-xs text-muted-foreground">Streak</p>
                        <p className="text-2xl font-bold text-orange-600">{streak}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <div className="flex gap-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 1 }}
                                animate={{ scale: i < lives ? 1 : 0.5 }}
                                className={cn(
                                    "h-8 w-8 rounded-full flex items-center justify-center",
                                    i < lives ? "bg-red-500" : "bg-gray-300 dark:bg-gray-700"
                                )}
                            >
                                <Heart className={cn("h-4 w-4", i < lives ? "fill-white text-white" : "text-gray-500")} />
                            </motion.div>
                        ))}
                    </div>
                </div>
                <Button
                    onClick={startGame}
                    variant="outline"
                    size="icon"
                    className="rounded-full border-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                >
                    <RefreshCw className="h-5 w-5" />
                </Button>
            </motion.div>

            {/* Game State Messages */}
            <AnimatePresence mode="wait">
                {gameState === "idle" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
                            Color Sequence Challenge
                        </h2>
                        <p className="text-muted-foreground max-w-md">
                            Watch the color sequence, then repeat it! The sequence gets longer each round.
                        </p>
                        <Button
                            onClick={startGame}
                            className="gap-2 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 hover:opacity-90"
                            size="lg"
                        >
                            Start Game
                        </Button>
                    </motion.div>
                )}

                {gameState === "playing" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                    >
                        {isPlaying && (
                            <p className="text-lg font-semibold text-purple-600">
                                Watch the sequence...
                            </p>
                        )}
                        {isUserTurn && (
                            <p className="text-lg font-semibold text-blue-600">
                                Your turn! ({userSequence.length}/{sequence.length})
                            </p>
                        )}
                    </motion.div>
                )}

                {gameState === "gameover" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center space-y-2"
                    >
                        <p className="text-2xl font-bold text-red-600">Game Over!</p>
                        <p className="text-lg text-muted-foreground">
                            Best Streak: <span className="font-bold text-orange-600">{bestStreak}</span>
                        </p>
                        <Button
                            onClick={startGame}
                            className="gap-2 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 hover:opacity-90 mt-4"
                        >
                            Play Again
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Color Buttons */}
            {gameState === "playing" && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md w-full"
                >
                    {COLORS.map((color) => (
                        <motion.button
                            key={color.id}
                            whileHover={isUserTurn ? { scale: 1.05 } : {}}
                            whileTap={isUserTurn ? { scale: 0.95 } : {}}
                            onClick={() => handleColorClick(color.id)}
                            disabled={!isUserTurn}
                            className={cn(
                                "h-32 sm:h-40 rounded-2xl transition-all duration-200 border-4 border-white dark:border-gray-800",
                                color.bg,
                                color.hover,
                                activeColor === color.id && "scale-95 shadow-2xl",
                                activeColor === color.id && color.glow,
                                !isUserTurn && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            <motion.div
                                animate={
                                    activeColor === color.id
                                        ? {
                                            scale: [1, 1.2, 1],
                                            opacity: [1, 0.8, 1],
                                        }
                                        : {}
                                }
                                transition={{ duration: 0.3 }}
                                className="w-full h-full rounded-xl"
                            />
                        </motion.button>
                    ))}
                </motion.div>
            )}

            {/* Celebration Effect */}
            <AnimatePresence>
                {showCelebration && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl"
                        >
                            ✨
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Streak Celebration */}
            <AnimatePresence>
                {showCelebration && streak > 0 && streak % 5 === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-2xl z-50"
                    >
                        🔥 {streak} Streak! Amazing!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
