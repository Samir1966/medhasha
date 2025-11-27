"use client";

import { PoseDetector } from "@/components/yoga/PoseDetector";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function YogaSessionPage() {
    const { id } = useParams();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/yoga">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Chair Yoga Session</h1>
                    <p className="text-muted-foreground">Focus: Balance & Flexibility</p>
                </div>
            </div>

            <PoseDetector />
        </div>
    );
}
