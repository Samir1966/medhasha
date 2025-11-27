"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export function YogaTracker() {
    const progress = 75; // Mock progress
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <Card className="h-full bg-white/50 backdrop-blur-md border-none shadow-lg">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
                    <Activity className="h-5 w-5" /> Yoga Progress
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="relative h-32 w-32">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                            className="text-gray-200"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="50"
                            cy="50"
                        />
                        <circle
                            className="text-green-500 transition-all duration-1000 ease-out"
                            strokeWidth="10"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="50"
                            cy="50"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-gray-800">{progress}%</span>
                        <span className="text-xs text-gray-500">Daily Goal</span>
                    </div>
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                    3 out of 4 sessions completed today.
                </p>
            </CardContent>
        </Card>
    );
}
