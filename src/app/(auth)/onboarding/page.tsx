"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Volume2, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedLang, setSelectedLang] = useState("en");

    const languages = [
        { code: "en", label: "English", native: "English" },
        { code: "hi", label: "Hindi", native: "हिंदी" },
        { code: "or", label: "Odia", native: "ଓଡ଼ିଆ" },
    ];

    const handleLangSelect = (code: string) => {
        setSelectedLang(code);
        i18n.changeLanguage(code);
        // Play audio greeting here
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        else router.push("/");
    };

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 p-4">
            <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={cn(
                            "h-2 w-16 rounded-full transition-colors",
                            step >= s ? "bg-primary" : "bg-muted"
                        )}
                    />
                ))}
            </div>

            <Card className="w-full max-w-lg border-2 border-primary/20 shadow-xl">
                <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
                    {step === 1 && (
                        <>
                            <Volume2 className="h-16 w-16 text-primary animate-pulse" />
                            <h1 className="text-3xl font-bold">Select Language / भाषा चुनें</h1>
                            <div className="grid w-full gap-4">
                                {languages.map((lang) => (
                                    <Button
                                        key={lang.code}
                                        variant={selectedLang === lang.code ? "default" : "outline"}
                                        className="h-16 text-xl"
                                        onClick={() => handleLangSelect(lang.code)}
                                    >
                                        {lang.native}
                                        {selectedLang === lang.code && <Check className="ml-2 h-6 w-6" />}
                                    </Button>
                                ))}
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Mic className="h-16 w-16 text-primary" />
                            <h1 className="text-3xl font-bold">{t("welcome")}</h1>
                            <p className="text-xl text-muted-foreground">
                                Tap the button and say your name.
                            </p>
                            <Button size="lg" className="h-24 w-24 rounded-full">
                                <Mic className="h-10 w-10" />
                            </Button>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <Check className="h-16 w-16 text-green-500" />
                            <h1 className="text-3xl font-bold">All Set!</h1>
                            <p className="text-xl text-muted-foreground">
                                Let's start your journey to better brain health.
                            </p>
                        </>
                    )}

                    <Button onClick={nextStep} size="lg" className="w-full text-xl h-14 mt-4">
                        {step === 3 ? "Get Started" : "Next"} <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
