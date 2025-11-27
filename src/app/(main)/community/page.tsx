"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MessageCircle, Heart, Share2, Play } from "lucide-react";

const posts = [
    {
        id: 1,
        author: "Ramesh Uncle",
        avatar: "R",
        content: "Today I completed 5 levels of Matching Pairs! Feeling very sharp.",
        audio: true,
        likes: 12,
        comments: 3,
        time: "2 hours ago",
    },
    {
        id: 2,
        author: "Dr. Anjali",
        avatar: "D",
        content: "Remember to drink enough water in this heat. Hydration is key for brain health.",
        audio: false,
        likes: 45,
        comments: 8,
        time: "5 hours ago",
    },
    {
        id: 3,
        author: "Savitri Devi",
        avatar: "S",
        content: "Can anyone recommend a good yoga exercise for back pain?",
        audio: true,
        likes: 8,
        comments: 12,
        time: "Yesterday",
    },
];

export default function CommunityPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-primary">Community Connect</h1>
                <Button className="gap-2 rounded-full shadow-lg">
                    <Mic className="h-4 w-4" /> New Voice Post
                </Button>
            </div>

            <div className="space-y-4">
                {posts.map((post) => (
                    <Card key={post.id}>
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                            <Avatar>
                                <AvatarFallback className="bg-primary/10 text-primary font-bold">{post.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-base">{post.author}</CardTitle>
                                <p className="text-xs text-muted-foreground">{post.time}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm md:text-base">{post.content}</p>
                            {post.audio && (
                                <div className="mt-3 flex items-center gap-3 rounded-full bg-muted/50 px-4 py-2 w-full max-w-xs border">
                                    <Button size="icon" variant="default" className="h-8 w-8 rounded-full shrink-0">
                                        <Play className="h-3 w-3 ml-0.5" />
                                    </Button>
                                    <div className="h-1.5 flex-1 bg-primary/20 rounded-full overflow-hidden">
                                        <div className="h-full w-1/3 bg-primary rounded-full" />
                                    </div>
                                    <span className="text-xs text-muted-foreground font-mono">0:15</span>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="border-t p-2 bg-muted/10">
                            <div className="flex w-full justify-around">
                                <Button variant="ghost" size="sm" className="gap-2 hover:text-red-500">
                                    <Heart className="h-4 w-4" /> <span className="text-xs">{post.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-2 hover:text-blue-500">
                                    <MessageCircle className="h-4 w-4" /> <span className="text-xs">{post.comments}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <Share2 className="h-4 w-4" /> <span className="text-xs">Share</span>
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
