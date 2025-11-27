"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

export function CaretakerCard() {
    return (
        <Card className="bg-gradient-to-br from-primary to-purple-600 text-white border-none shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-white/30">
                        <AvatarImage src="/images/caretaker.png" />
                        <AvatarFallback className="bg-white/20 text-white">JD</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-bold text-lg">Dr. Priya Sharma</h3>
                        <p className="text-white/80 text-sm">Primary Caregiver</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button size="icon" variant="secondary" className="rounded-full bg-white/20 hover:bg-white/30 text-white border-none">
                        <Phone className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full bg-white/20 hover:bg-white/30 text-white border-none">
                        <MessageCircle className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
