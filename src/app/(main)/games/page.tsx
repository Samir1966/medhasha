"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, Puzzle, Grid3x3, Palette, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const games = [
    {
        id: "matching",
        title: "Matching Pairs",
        description: "Find matching cards to test your memory.",
        icon: Brain,
        gradient: "from-blue-500 to-cyan-500",
        href: "/games/matching",
        difficulty: "Easy",
    },
    {
        id: "recall",
        title: "Number Recall",
        description: "Remember and repeat number sequences.",
        icon: Zap,
        gradient: "from-orange-500 to-red-500",
        href: "/games/number-recall",
        difficulty: "Medium",
    },
    {
        id: "odd-one",
        title: "Odd One Out",
        description: "Find the item that doesn't belong.",
        icon: Puzzle,
        gradient: "from-green-500 to-emerald-500",
        href: "/games/odd-one-out",
        difficulty: "Easy",
    },
    {
        id: "pattern-memory",
        title: "Pattern Memory",
        description: "Remember and recreate visual patterns.",
        icon: Grid3x3,
        gradient: "from-purple-500 to-blue-500",
        href: "/games/pattern-memory",
        difficulty: "Hard",
        isNew: true,
    },
    {
        id: "color-sequence",
        title: "Color Sequence",
        description: "Repeat the sequence of colors shown.",
        icon: Palette,
        gradient: "from-pink-500 to-rose-500",
        href: "/games/color-sequence",
        difficulty: "Medium",
        isNew: true,
    },
];

export default function GamesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 pb-20">
            <div className="max-w-6xl mx-auto space-y-8 p-4 sm:p-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4 pt-6"
                >
                    <div className="flex items-center justify-center gap-3">
                        <Sparkles className="h-10 w-10 text-purple-600" />
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                            Masti & Memory Zone
                        </h1>
                        <Sparkles className="h-10 w-10 text-pink-600" />
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Challenge your brain with fun and engaging memory games designed to keep your mind sharp!
                    </p>
                </motion.div>

                {/* Games Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {games.map((game, index) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            <Link href={game.href}>
                                <Card className="h-full transition-all duration-300 hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-purple-400 dark:hover:border-purple-500 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden group relative">
                                    {/* New Badge */}
                                    {game.isNew && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                                            className="absolute top-3 right-3 z-10"
                                        >
                                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                NEW!
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Gradient Background Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                    <CardHeader className="space-y-4">
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-white shadow-lg`}
                                        >
                                            <game.icon className="h-8 w-8" />
                                        </motion.div>
                                        <div>
                                            <CardTitle className="text-xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                {game.title}
                                            </CardTitle>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span
                                                    className={`text-xs font-semibold px-2 py-1 rounded-full ${game.difficulty === "Easy"
                                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                            : game.difficulty === "Medium"
                                                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                        }`}
                                                >
                                                    {game.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {game.description}
                                        </p>
                                        <motion.div
                                            initial={{ x: -10, opacity: 0 }}
                                            whileHover={{ x: 0, opacity: 1 }}
                                            className="mt-4 flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400"
                                        >
                                            Play Now
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                            >
                                                →
                                            </motion.span>
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Particles Background */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: `${Math.random() * 100}%`,
                                y: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                x: `${Math.random() * 100}%`,
                                y: `${Math.random() * 100}%`,
                            }}
                            transition={{
                                duration: Math.random() * 20 + 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            className="absolute w-2 h-2 rounded-full bg-purple-400/20"
                        />
                    ))}
                </div>

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 dark:border-purple-500/30 mt-8"
                >
                    <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Why Play Brain Games?
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-4 text-center">
                        <div className="space-y-2">
                            <div className="text-3xl">🧠</div>
                            <h3 className="font-semibold">Improve Memory</h3>
                            <p className="text-sm text-muted-foreground">
                                Strengthen your short-term and working memory
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl">⚡</div>
                            <h3 className="font-semibold">Boost Focus</h3>
                            <p className="text-sm text-muted-foreground">
                                Enhance concentration and attention span
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl">🎯</div>
                            <h3 className="font-semibold">Stay Sharp</h3>
                            <p className="text-sm text-muted-foreground">
                                Keep your mind active and healthy
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
