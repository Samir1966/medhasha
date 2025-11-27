"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Brain, Zap, Puzzle } from "lucide-react";

const games = [
    {
        id: "matching",
        title: "Matching Pairs",
        description: "Find matching cards to test your memory.",
        icon: Brain,
        color: "bg-blue-500",
        href: "/games/matching",
    },
    {
        id: "recall",
        title: "Number Recall",
        description: "Remember and repeat number sequences.",
        icon: Zap,
        color: "bg-orange-500",
        href: "/games/number-recall",
    },
    {
        id: "odd-one",
        title: "Odd One Out",
        description: "Find the item that doesn't belong.",
        icon: Puzzle,
        color: "bg-green-500",
        href: "/games/odd-one-out",
    },
];

export default function GamesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary">Masti & Memory Zone</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {games.map((game) => (
                    <Link key={game.id} href={game.href}>
                        <Card className="h-full transition-transform hover:scale-105 cursor-pointer">
                            <CardHeader>
                                <div className={`h-12 w-12 rounded-lg ${game.color} flex items-center justify-center text-white`}>
                                    <game.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="mt-4">{game.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{game.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
