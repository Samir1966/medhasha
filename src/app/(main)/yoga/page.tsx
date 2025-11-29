"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, Activity, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { YogaTracker } from "@/components/dashboard/YogaTracker";

const sessions = [
    {
        id: "chair-yoga",
        title: "Chair Yoga",
        duration: "10 min",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=800&q=80",
        description: "Gentle movements to improve flexibility while seated.",
        color: "from-blue-500/20 to-cyan-500/20",
    },
    {
        id: "balance",
        title: "Balance Basics",
        duration: "15 min",
        difficulty: "Medium",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        description: "Strengthen core muscles to improve stability and prevent falls.",
        color: "from-purple-500/20 to-pink-500/20",
    },
    {
        id: "breathing",
        title: "Deep Breathing",
        duration: "5 min",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
        description: "Calming techniques to reduce stress and anxiety.",
        color: "from-green-500/20 to-emerald-500/20",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function YogaPage() {
    return (
        <div className="space-y-8 pb-10">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-4 border border-white/30">
                                <Sparkles className="h-4 w-4 text-yellow-300" />
                                <span>New Sessions Added</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                                Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">Inner Peace</span>
                            </h1>
                            <p className="text-lg md:text-xl text-indigo-100 max-w-lg leading-relaxed">
                                Join our virtual yoga sessions designed specifically for cognitive health and physical well-being.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold shadow-lg border-none">
                                Start Today
                            </Button>
                            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                                View Schedule
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        className="hidden md:block w-full max-w-xs"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <YogaTracker />
                    </motion.div>
                </div>
            </div>

            {/* Sessions Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Available Sessions</h2>
                    <Button variant="ghost" className="text-primary hover:text-primary/80">
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <motion.div
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {sessions.map((session) => (
                        <motion.div key={session.id} variants={item}>
                            <Card className="overflow-hidden group cursor-pointer border-none shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-white">
                                <div className="aspect-video w-full bg-muted relative overflow-hidden">
                                    <img
                                        src={session.image}
                                        alt={session.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${session.color} opacity-60 mix-blend-multiply transition-opacity group-hover:opacity-70`} />
                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
                                        </motion.div>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm">
                                        {session.difficulty}
                                    </div>
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{session.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col">
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                                        {session.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm font-medium text-gray-500 pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4 text-primary" /> {session.duration}
                                        </div>
                                        <Button size="sm" variant="secondary" asChild className="group-hover:bg-primary group-hover:text-white transition-colors">
                                            <Link href={`/yoga/session/${session.id}`}>Start</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
