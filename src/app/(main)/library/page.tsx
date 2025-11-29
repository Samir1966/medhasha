"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { articles } from "@/data/library";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Clock, Bookmark, TrendingUp, Filter, Sparkles, Brain } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LibraryPage() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'hi' | 'or';
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");

    const getLocalizedContent = (article: any, field: string) => {
        const key = field + (lang === 'en' ? '' : `_${lang}`);
        return article[key] || article[field];
    };

    // Get unique categories
    const categories = ["All", ...Array.from(new Set(articles.map(a => a.category)))];

    // Filter and sort articles
    const filteredArticles = articles
        .filter(article => {
            const matchesSearch = getLocalizedContent(article, 'title').toLowerCase().includes(searchQuery.toLowerCase()) ||
                getLocalizedContent(article, 'content').toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === "newest") return parseInt(b.id) - parseInt(a.id);
            if (sortBy === "oldest") return parseInt(a.id) - parseInt(b.id);
            return 0;
        });

    // Statistics
    const totalArticles = articles.length;
    const totalCategories = categories.length - 1; // Exclude "All"

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 pb-20">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4 pt-6"
                >
                    <div className="flex items-center justify-center gap-3">
                        <Brain className="h-10 w-10 text-blue-600" />
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                            {t("library")}
                        </h1>
                        <Sparkles className="h-10 w-10 text-orange-500" />
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore our curated collection of articles on brain health, wellness, and elderly care.
                    </p>
                </motion.div>

                {/* Statistics Banner */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Total Articles", value: totalArticles, icon: BookOpen, color: "text-blue-600" },
                        { label: "Categories", value: totalCategories, icon: Filter, color: "text-purple-600" },
                        { label: "Readers", value: "1.2k+", icon: TrendingUp, color: "text-green-600" },
                        { label: "Avg. Read Time", value: "5 min", icon: Clock, color: "text-orange-600" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border shadow-sm flex items-center gap-4"
                        >
                            <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Search and Filter Bar */}
                <div className="sticky top-20 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4 rounded-2xl border shadow-lg space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search articles..."
                            className="pl-10 bg-transparent border-none focus-visible:ring-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Articles Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {filteredArticles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                                    <div className="relative aspect-video w-full overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                            <span className="text-white text-sm font-medium flex items-center gap-2">
                                                <Clock className="h-4 w-4" /> 5 min read
                                            </span>
                                        </div>
                                        <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-blue-600 transition-colors">
                                            <Bookmark className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200">
                                                {article.category}
                                            </Badge>
                                        </div>
                                        <CardTitle className="line-clamp-2 text-xl group-hover:text-blue-600 transition-colors">
                                            {getLocalizedContent(article, 'title')}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">
                                            {getLocalizedContent(article, 'content')}
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md group-hover:shadow-lg transition-all">
                                            <Link href={`/library/${article.id}`}>
                                                Read Article <BookOpen className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

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
            </div>
        </div>
    );
}
