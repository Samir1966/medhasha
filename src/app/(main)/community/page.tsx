"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Mic,
    MessageCircle,
    Heart,
    Share2,
    Play,
    Plus,
    Image as ImageIcon,
    X,
    Send,
    Sparkles,
    TrendingUp,
    Clock,
    MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Post } from "@/types/community";
import {
    loadPosts,
    savePosts,
    addPost,
    toggleLike,
    hasUserLiked,
    getUserId
} from "@/lib/storage";
import { formatDistanceToNow } from "date-fns";

// Default posts for first-time users
const defaultPosts: Post[] = [
    {
        id: "default_1",
        author: "Ramesh Uncle",
        avatar: "R",
        content: "Today I completed 5 levels of Matching Pairs! Feeling very sharp.",
        audio: true,
        likes: 12,
        comments: 3,
        timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
        likedBy: [],
    },
    {
        id: "default_2",
        author: "Dr. Anjali",
        avatar: "D",
        content: "Remember to drink enough water in this heat. Hydration is key for brain health.",
        audio: false,
        likes: 45,
        comments: 8,
        timestamp: Date.now() - 5 * 60 * 60 * 1000, // 5 hours ago
        likedBy: [],
    },
    {
        id: "default_3",
        author: "Savitri Devi",
        avatar: "S",
        content: "Can anyone recommend a good yoga exercise for back pain?",
        audio: true,
        likes: 8,
        comments: 12,
        timestamp: Date.now() - 24 * 60 * 60 * 1000, // Yesterday
        likedBy: [],
    },
];

export default function CommunityPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newPostContent, setNewPostContent] = useState("");
    const [newPostImage, setNewPostImage] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userId, setUserId] = useState<string>("");
    const [filter, setFilter] = useState<"all" | "trending" | "recent">("all");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Load posts on mount
    useEffect(() => {
        const uid = getUserId();
        setUserId(uid);

        const storedPosts = loadPosts();
        if (storedPosts.length === 0) {
            // First time user, use default posts
            savePosts(defaultPosts);
            setPosts(defaultPosts);
        } else {
            setPosts(storedPosts);
        }
    }, []);

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setNewPostImage(result);
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle post submission
    const handleSubmitPost = async () => {
        if (!newPostContent.trim() && !newPostImage) return;

        setIsSubmitting(true);

        // Simulate a brief delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newPost = addPost({
            author: "You",
            avatar: "Y",
            content: newPostContent.trim(),
            image: newPostImage || undefined,
            audio: false,
            likes: 0,
            comments: 0,
        });

        setPosts([newPost, ...posts]);

        // Reset form
        setNewPostContent("");
        setNewPostImage(null);
        setImagePreview(null);
        setIsDialogOpen(false);
        setIsSubmitting(false);
    };

    // Handle like toggle
    const handleLike = (postId: string) => {
        toggleLike(postId, userId);
        const updatedPosts = loadPosts();
        setPosts(updatedPosts);
    };

    // Handle WhatsApp share
    const handleWhatsAppShare = (post: Post) => {
        const text = `${post.author} shared on BrainHope Community:\n\n"${post.content}"\n\nJoin our community: https://brainhope.app`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    // Filter posts
    const filteredPosts = [...posts].sort((a, b) => {
        if (filter === "trending") {
            return b.likes - a.likes;
        } else if (filter === "recent") {
            return b.timestamp - a.timestamp;
        }
        return 0;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 pb-20">
            <div className="max-w-4xl mx-auto space-y-6 p-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-purple-200/50 dark:border-purple-500/30"
                >
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                            <Sparkles className="h-8 w-8 text-purple-500" />
                            Community Connect
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">Share your journey, inspire others</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2 rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105">
                                <Plus className="h-5 w-5" />
                                <span className="hidden sm:inline">New Post</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-900/20 border-purple-200 dark:border-purple-500/30">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Create New Post
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                                <div>
                                    <Label htmlFor="content" className="text-sm font-medium">
                                        What's on your mind?
                                    </Label>
                                    <Textarea
                                        id="content"
                                        placeholder="Share your thoughts, achievements, or questions..."
                                        value={newPostContent}
                                        onChange={(e) => setNewPostContent(e.target.value)}
                                        className="mt-2 min-h-[120px] resize-none border-purple-200 dark:border-purple-500/30 focus:ring-purple-500"
                                        maxLength={500}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1 text-right">
                                        {newPostContent.length}/500
                                    </p>
                                </div>

                                {imagePreview && (
                                    <div className="relative rounded-lg overflow-hidden border-2 border-purple-200 dark:border-purple-500/30">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-48 object-cover"
                                        />
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="absolute top-2 right-2 rounded-full"
                                            onClick={() => {
                                                setImagePreview(null);
                                                setNewPostImage(null);
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <Label
                                        htmlFor="image-upload"
                                        className="flex-1 cursor-pointer"
                                    >
                                        <div className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-purple-300 dark:border-purple-500/50 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                                            <ImageIcon className="h-5 w-5 text-purple-600" />
                                            <span className="text-sm font-medium text-purple-600">
                                                Add Image
                                            </span>
                                        </div>
                                        <Input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                        />
                                    </Label>
                                </div>

                                <Button
                                    onClick={handleSubmitPost}
                                    disabled={(!newPostContent.trim() && !newPostImage) || isSubmitting}
                                    className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            >
                                                <Sparkles className="h-4 w-4" />
                                            </motion.div>
                                            Posting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            Share Post
                                        </>
                                    )}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-2 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-xl p-2 border border-purple-200/50 dark:border-purple-500/30"
                >
                    <Button
                        variant={filter === "all" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("all")}
                        className={filter === "all" ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}
                    >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        All Posts
                    </Button>
                    <Button
                        variant={filter === "trending" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("trending")}
                        className={filter === "trending" ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}
                    >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Trending
                    </Button>
                    <Button
                        variant={filter === "recent" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("recent")}
                        className={filter === "recent" ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}
                    >
                        <Clock className="h-4 w-4 mr-2" />
                        Recent
                    </Button>
                </motion.div>

                {/* Posts List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -4 }}
                            >
                                <Card className="overflow-hidden border-purple-200/50 dark:border-purple-500/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-3">
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                            <Avatar className="h-12 w-12 border-2 border-purple-200 dark:border-purple-500/50">
                                                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg">
                                                    {post.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                        </motion.div>
                                        <div className="flex-1">
                                            <CardTitle className="text-base font-semibold">{post.author}</CardTitle>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                                            </p>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-3">
                                        <p className="text-sm md:text-base leading-relaxed">{post.content}</p>

                                        {post.image && (
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                className="rounded-lg overflow-hidden cursor-pointer border-2 border-purple-200 dark:border-purple-500/30"
                                                onClick={() => setSelectedImage(post.image!)}
                                            >
                                                <img
                                                    src={post.image}
                                                    alt="Post image"
                                                    className="w-full h-64 object-cover"
                                                />
                                            </motion.div>
                                        )}

                                        {post.audio && (
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                className="flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-3 w-full max-w-xs border border-purple-200 dark:border-purple-500/30"
                                            >
                                                <Button
                                                    size="icon"
                                                    className="h-10 w-10 rounded-full shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                                >
                                                    <Play className="h-4 w-4 ml-0.5" />
                                                </Button>
                                                <div className="h-2 flex-1 bg-purple-200 dark:bg-purple-700/30 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: "33%" }}
                                                        transition={{ duration: 0.5 }}
                                                    />
                                                </div>
                                                <span className="text-xs text-muted-foreground font-mono">0:15</span>
                                            </motion.div>
                                        )}
                                    </CardContent>

                                    <CardFooter className="border-t border-purple-200/50 dark:border-purple-500/30 p-2 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10">
                                        <div className="flex w-full justify-around">
                                            <motion.div whileTap={{ scale: 0.9 }}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={`gap-2 transition-all duration-300 ${hasUserLiked(post, userId)
                                                            ? "text-red-500 hover:text-red-600"
                                                            : "hover:text-red-500"
                                                        }`}
                                                    onClick={() => handleLike(post.id)}
                                                >
                                                    <motion.div
                                                        animate={
                                                            hasUserLiked(post, userId)
                                                                ? { scale: [1, 1.3, 1] }
                                                                : { scale: 1 }
                                                        }
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <Heart
                                                            className={`h-5 w-5 ${hasUserLiked(post, userId) ? "fill-current" : ""
                                                                }`}
                                                        />
                                                    </motion.div>
                                                    <span className="text-sm font-semibold">{post.likes}</span>
                                                </Button>
                                            </motion.div>

                                            <motion.div whileTap={{ scale: 0.9 }}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="gap-2 hover:text-blue-500 transition-colors"
                                                >
                                                    <MessageCircle className="h-5 w-5" />
                                                    <span className="text-sm font-semibold">{post.comments}</span>
                                                </Button>
                                            </motion.div>

                                            <motion.div whileTap={{ scale: 0.9 }}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="gap-2 hover:text-green-500 transition-colors"
                                                    onClick={() => handleWhatsAppShare(post)}
                                                >
                                                    <Share2 className="h-5 w-5" />
                                                    <span className="text-sm font-semibold">WhatsApp</span>
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <Sparkles className="h-16 w-16 mx-auto text-purple-400 mb-4" />
                        <h3 className="text-xl font-semibold text-muted-foreground">No posts yet</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            Be the first to share something!
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Image Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-4xl max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Full size"
                                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                            />
                            <Button
                                size="icon"
                                variant="destructive"
                                className="absolute top-4 right-4 rounded-full"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
