"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Trophy, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tile {
    id: number;
    isActive: boolean;
    isUserSelected: boolean;
    isCorrect?: boolean;
}

export function PatternMemory() {
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [pattern, setPattern] = useState<number[]>([]);
    const [userPattern, setUserPattern] = useState<number[]>([]);
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [isShowing, setIsShowing] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameState, setGameState] = useState<"idle" | "showing" | "playing" | "success" | "failure">("idle");
    const [showConfetti, setShowConfetti] = useState(false);

    const GRID_SIZE = 25; // 5x5 grid

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const initialTiles: Tile[] = Array.from({ length: GRID_SIZE }, (_, i) => ({
            id: i,
            isActive: false,
            isUserSelected: false,
        }));
        setTiles(initialTiles);
        setLevel(1);
        setScore(0);
        setGameState("idle");
    };

    const startLevel = () => {
        // Generate random pattern
        const patternLength = Math.min(3 + level, 12); // Start with 4, max 12
        const newPattern: number[] = [];
        while (newPattern.length < patternLength) {
            const randomTile = Math.floor(Math.random() * GRID_SIZE);
            if (!newPattern.includes(randomTile)) {
                newPattern.push(randomTile);
            }
        }
        setPattern(newPattern);
        setUserPattern([]);
        showPattern(newPattern);
    };

    const showPattern = async (patternToShow: number[]) => {
        setGameState("showing");
        setIsShowing(true);

        const newTiles = tiles.map((tile) => ({
            ...tile,
            isActive: false,
            isUserSelected: false,
            isCorrect: undefined,
        }));

        // Show pattern tiles one by one
        for (let i = 0; i < patternToShow.length; i++) {
            newTiles[patternToShow[i]].isActive = true;
            setTiles([...newTiles]);
            await new Promise((resolve) => setTimeout(resolve, 150));
        }

        // Keep pattern visible for a moment
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Hide pattern
        const hiddenTiles = newTiles.map((tile) => ({
            ...tile,
            isActive: false,
        }));
        setTiles(hiddenTiles);
        setIsShowing(false);
        setIsPlaying(true);
        setGameState("playing");
    };

    const handleTileClick = (tileId: number) => {
        if (!isPlaying || isShowing) return;

        const newUserPattern = [...userPattern, tileId];
        setUserPattern(newUserPattern);

        // Update tile visual state
        const newTiles = [...tiles];
        newTiles[tileId].isUserSelected = true;
        setTiles(newTiles);

        // Check if pattern matches so far
        const isCorrectSoFar = pattern.slice(0, newUserPattern.length).every(
            (tile, index) => tile === newUserPattern[index]
        );

        if (!isCorrectSoFar) {
            // Wrong tile clicked
            handleFailure();
        } else if (newUserPattern.length === pattern.length) {
            // Pattern completed successfully
            handleSuccess();
        }
    };

    const handleSuccess = async () => {
        setGameState("success");
        setIsPlaying(false);
        setShowConfetti(true);

        // Show correct tiles
        const newTiles = tiles.map((tile) => ({
            ...tile,
            isCorrect: tile.isUserSelected ? true : undefined,
        }));
        setTiles(newTiles);

        const points = level * 10;
        setScore(score + points);

        await new Promise((resolve) => setTimeout(resolve, 1500));
        setShowConfetti(false);
        setLevel(level + 1);

        // Auto-start next level
        setTimeout(() => {
            startLevel();
        }, 500);
    };

    const handleFailure = async () => {
        setGameState("failure");
        setIsPlaying(false);

        // Show incorrect tiles
        const newTiles = tiles.map((tile, index) => ({
            ...tile,
            isCorrect: pattern.includes(index) ? true : tile.isUserSelected ? false : undefined,
        }));
        setTiles(newTiles);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Reset to level 1
        setLevel(1);
        setGameState("idle");
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            {/* Header Stats */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex w-full max-w-md items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg p-4 border border-purple-300 dark:border-purple-500/30"
            >
                <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <div>
                        <p className="text-xs text-muted-foreground">Level</p>
                        <p className="text-2xl font-bold text-purple-600">{level}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-blue-600" />
                    <div>
                        <p className="text-xs text-muted-foreground">Score</p>
                        <p className="text-2xl font-bold text-blue-600">{score}</p>
                    </div>
                </div>
                <Button
                    onClick={initializeGame}
                    variant="outline"
                    size="icon"
                    className="rounded-full border-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                >
                    <RefreshCw className="h-5 w-5" />
                </Button>
            </motion.div>

            {/* Instructions */}
            <AnimatePresence mode="wait">
                {gameState === "idle" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Pattern Memory Challenge
                        </h2>
                        <p className="text-muted-foreground max-w-md">
                            Watch the pattern carefully, then recreate it by clicking the tiles in the same order!
                        </p>
                        <Button
                            onClick={startLevel}
                            className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            size="lg"
                        >
                            <Zap className="h-5 w-5" />
                            Start Level {level}
                        </Button>
                    </motion.div>
                )}

                {gameState === "showing" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                    >
                        <p className="text-lg font-semibold text-purple-600">
                            Watch carefully...
                        </p>
                    </motion.div>
                )}

                {gameState === "playing" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                    >
                        <p className="text-lg font-semibold text-blue-600">
                            Your turn! ({userPattern.length}/{pattern.length})
                        </p>
                    </motion.div>
                )}

                {gameState === "success" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center"
                    >
                        <p className="text-2xl font-bold text-green-600">
                            Perfect! 🎉
                        </p>
                        <p className="text-sm text-muted-foreground">+{level * 10} points</p>
                    </motion.div>
                )}

                {gameState === "failure" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center"
                    >
                        <p className="text-2xl font-bold text-red-600">
                            Oops! Try Again
                        </p>
                        <p className="text-sm text-muted-foreground">Starting from Level 1</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Game Grid */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-5 gap-2 sm:gap-3 p-4 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-purple-200 dark:border-purple-500/30"
            >
                {tiles.map((tile, index) => (
                    <motion.div
                        key={tile.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.01 }}
                        whileHover={isPlaying && !isShowing ? { scale: 1.1 } : {}}
                        whileTap={isPlaying && !isShowing ? { scale: 0.95 } : {}}
                    >
                        <Card
                            className={cn(
                                "h-12 w-12 sm:h-16 sm:w-16 cursor-pointer transition-all duration-300 flex items-center justify-center border-2",
                                tile.isActive && "bg-gradient-to-br from-purple-500 to-blue-500 border-purple-400 shadow-lg shadow-purple-500/50",
                                tile.isUserSelected && !tile.isCorrect && "bg-blue-200 dark:bg-blue-900/30 border-blue-400",
                                tile.isCorrect === true && "bg-gradient-to-br from-green-400 to-green-600 border-green-500 shadow-lg shadow-green-500/50",
                                tile.isCorrect === false && "bg-gradient-to-br from-red-400 to-red-600 border-red-500 shadow-lg shadow-red-500/50 animate-shake",
                                !tile.isActive && !tile.isUserSelected && "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border-gray-300 dark:border-gray-600 hover:border-purple-400"
                            )}
                            onClick={() => handleTileClick(tile.id)}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Confetti Effect */}
            <AnimatePresence>
                {showConfetti && (
                    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
                        {Array.from({ length: 50 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    scale: 1,
                                }}
                                animate={{
                                    opacity: 0,
                                    x: (Math.random() - 0.5) * 1000,
                                    y: Math.random() * 1000,
                                    scale: 0,
                                    rotate: Math.random() * 360,
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeOut",
                                }}
                                className="absolute w-3 h-3 rounded-full"
                                style={{
                                    backgroundColor: ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"][
                                        Math.floor(Math.random() * 5)
                                    ],
                                }}
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
