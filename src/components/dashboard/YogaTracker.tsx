"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Flame, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function YogaTracker() {
    const progress = 75; // Mock progress
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    return (
        <Card className="h-full bg-white/80 backdrop-blur-md border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full -ml-12 -mb-12 blur-2xl" />

            <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" /> Daily Progress
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6 relative z-10">
                <div className="relative h-40 w-40">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                            className="text-gray-100"
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="50"
                            cy="50"
                        />
                        <motion.circle
                            className="text-primary drop-shadow-md"
                            strokeWidth="8"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="50"
                            cy="50"
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            className="text-3xl font-extrabold text-gray-800"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {progress}%
                        </motion.span>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Goal</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                    <div className="bg-orange-50 p-3 rounded-xl flex flex-col items-center justify-center border border-orange-100">
                        <Flame className="h-5 w-5 text-orange-500 mb-1" />
                        <span className="text-lg font-bold text-gray-800">12</span>
                        <span className="text-[10px] text-gray-500 uppercase">Streak</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl flex flex-col items-center justify-center border border-blue-100">
                        <Trophy className="h-5 w-5 text-blue-500 mb-1" />
                        <span className="text-lg font-bold text-gray-800">45m</span>
                        <span className="text-[10px] text-gray-500 uppercase">Total</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
