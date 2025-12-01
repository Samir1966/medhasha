"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface WhatsAppButtonProps {
    onGenerateReport: () => string;
    variant?: "default" | "outline";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
}

export function WhatsAppButton({
    onGenerateReport,
    variant = "default",
    size = "default",
    className = ""
}: WhatsAppButtonProps) {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleClick = async () => {
        setIsGenerating(true);

        try {
            // Generate the progress report
            const reportText = onGenerateReport();

            // Encode the report for URL
            const encodedReport = encodeURIComponent(reportText);

            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/?text=${encodedReport}`;

            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
        } catch (error) {
            console.error('Error generating report:', error);
        } finally {
            setTimeout(() => setIsGenerating(false), 1000);
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Button
                onClick={handleClick}
                disabled={isGenerating}
                variant={variant}
                size={size}
                className={`gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/30 ${className}`}
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <MessageCircle className="h-4 w-4" />
                        Share via WhatsApp
                    </>
                )}
            </Button>
        </motion.div>
    );
}
