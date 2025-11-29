"use client";

import { ChatInterface } from "@/components/chat/ChatInterface";
import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

export default function ChatPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-cyan-900/20 pb-20">
            <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-3 pt-6"
                >
                    <div className="flex items-center justify-center gap-3">
                        <Brain className="h-10 w-10 text-blue-600" />
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                            NeuroBuddy AI Assistant
                        </h1>
                        <Sparkles className="h-10 w-10 text-cyan-600" />
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Your intelligent health companion powered by advanced AI. Ask questions, upload images, or speak naturally!
                    </p>
                </motion.div>

                {/* Chat Interface */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <ChatInterface />
                </motion.div>

                {/* Floating Particles Background */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                    {Array.from({ length: 15 }).map((_, i) => (
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
                                duration: Math.random() * 20 + 15,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            className="absolute w-2 h-2 rounded-full bg-blue-400/20"
                        />
                    ))}
                </div>

                {/* Features Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 dark:border-blue-500/30"
                >
                    <h2 className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        How to Use NeuroBuddy
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-4 text-center">
                        <div className="space-y-2">
                            <div className="text-3xl">💬</div>
                            <h3 className="font-semibold">Type Messages</h3>
                            <p className="text-sm text-muted-foreground">
                                Ask health questions and get instant AI-powered responses
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl">🎤</div>
                            <h3 className="font-semibold">Voice Input</h3>
                            <p className="text-sm text-muted-foreground">
                                Click the microphone to speak your questions naturally
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl">📎</div>
                            <h3 className="font-semibold">Upload Files</h3>
                            <p className="text-sm text-muted-foreground">
                                Share images or PDFs for AI analysis and insights
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
