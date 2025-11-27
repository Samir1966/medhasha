"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/library";

export default function LibraryPage() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'hi' | 'or';

    const getLocalizedContent = (article: any, field: string) => {
        const key = field + (lang === 'en' ? '' : `_${lang}`);
        return article[key] || article[field];
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary">{t("library")}</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <Card key={article.id} className="overflow-hidden">
                        <div className="aspect-video w-full bg-muted">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <CardHeader>
                            <div className="flex justify-between">
                                <Badge variant="secondary">{article.category}</Badge>
                            </div>
                            <CardTitle className="line-clamp-2">
                                {getLocalizedContent(article, 'title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="line-clamp-3 text-sm text-muted-foreground">
                                {getLocalizedContent(article, 'content')}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={`/library/${article.id}`}>Read More</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
