"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, Activity } from "lucide-react";

const sessions = [
    {
        id: "chair-yoga",
        title: "Chair Yoga",
        duration: "10 min",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=800&q=80",
    },
    {
        id: "balance",
        title: "Balance Basics",
        duration: "15 min",
        difficulty: "Medium",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    },
    {
        id: "breathing",
        title: "Deep Breathing",
        duration: "5 min",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    },
];

export default function YogaPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary">Virtual Yoga Centre</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sessions.map((session) => (
                    <Card key={session.id} className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg">
                        <div className="aspect-video w-full bg-muted relative">
                            <img src={session.image} alt={session.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <PlayCircle className="h-12 w-12 text-white" />
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle>{session.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" /> {session.duration}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Activity className="h-4 w-4" /> {session.difficulty}
                                </div>
                            </div>
                            <Button asChild className="mt-4 w-full">
                                <Link href={`/yoga/session/${session.id}`}>Start Session</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
