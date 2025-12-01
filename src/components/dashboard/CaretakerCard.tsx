"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface DoctorInfo {
    name: string;
    specialty: string;
    phone: string;
    whatsappNumber: string;
    avatar?: string;
}

interface CaretakerCardProps {
    doctor?: DoctorInfo;
}

export function CaretakerCard({ doctor }: CaretakerCardProps) {
    // Default doctor data if none provided
    const defaultDoctor: DoctorInfo = {
        name: "Dr. Priya Sharma",
        specialty: "Geriatric Specialist",
        phone: "+91 98765 12345",
        whatsappNumber: "919876512345",
        avatar: "/images/caretaker.png"
    };

    const doctorInfo = doctor || defaultDoctor;

    const handleWhatsAppClick = () => {
        const whatsappUrl = `https://wa.me/${doctorInfo.whatsappNumber}`;
        window.open(whatsappUrl, '_blank');
    };

    const handlePhoneClick = () => {
        window.location.href = `tel:${doctorInfo.phone}`;
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <Card className="bg-gradient-to-br from-primary to-purple-600 text-white border-none shadow-lg overflow-hidden">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 border-2 border-white/30">
                            <AvatarImage src={doctorInfo.avatar} alt={doctorInfo.name} />
                            <AvatarFallback className="bg-white/20 text-white font-bold">
                                {getInitials(doctorInfo.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-bold text-lg">{doctorInfo.name}</h3>
                            <p className="text-white/80 text-sm">{doctorInfo.specialty}</p>
                            <p className="text-white/70 text-xs mt-1 flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {doctorInfo.phone}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Button
                                size="icon"
                                variant="secondary"
                                className="rounded-full bg-white/20 hover:bg-white/30 text-white border-none"
                                onClick={handlePhoneClick}
                                title="Call Doctor"
                            >
                                <Phone className="h-5 w-5" />
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Button
                                size="icon"
                                variant="secondary"
                                className="rounded-full bg-green-500 hover:bg-green-600 text-white border-none shadow-lg"
                                onClick={handleWhatsAppClick}
                                title="Chat on WhatsApp"
                            >
                                <MessageCircle className="h-5 w-5" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
