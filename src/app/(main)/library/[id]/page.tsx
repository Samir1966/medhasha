"use client";

import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { articles } from "@/data/library";

export default function ArticlePage() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'hi' | 'or';

    const article = articles.find((a) => a.id === id);

    if (!article) {
        return <div className="p-8 text-center">Article not found</div>;
    }

    const getLocalizedContent = (field: string) => {
        const key = field + (lang === 'en' ? '' : `_${lang}`);
        return (article as any)[key] || (article as any)[field];
    };

    const speak = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const text = getLocalizedContent('content');
            const utterance = new SpeechSynthesisUtterance(text);
            if (lang === 'hi') utterance.lang = 'hi-IN';
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="space-y-6">
            <Button variant="ghost" asChild className="pl-0">
                <Link href="/library">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
                </Link>
            </Button>

            <Card className="overflow-hidden">
                <div className="aspect-video w-full bg-muted">
                    <img
                        src={article.image}
                        alt={getLocalizedContent('title')}
                        className="h-full w-full object-cover"
                    />
                </div>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <Badge>{article.category}</Badge>
                        <Button variant="outline" size="icon" onClick={speak}>
                            <Volume2 className="h-5 w-5" />
                        </Button>
                    </div>
                    <CardTitle className="text-3xl">{getLocalizedContent('title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose max-w-none dark:prose-invert">
                        <p className="text-lg leading-relaxed whitespace-pre-wrap">
                            {getLocalizedContent('content')}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
