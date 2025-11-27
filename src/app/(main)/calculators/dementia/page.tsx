"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

export default function DementiaCalculator() {
    const [score, setScore] = useState<number | null>(null);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const questions = [
        { id: "age", label: "Age Group", options: ["<60", "60-70", "70-80", "80+"] },
        { id: "memory", label: "Do you often forget names or faces?", options: ["Never", "Sometimes", "Often"] },
        { id: "family", label: "Family history of dementia?", options: ["No", "Yes"] },
        { id: "lifestyle", label: "Physical activity level", options: ["High", "Moderate", "Low"] },
    ];

    const calculateRisk = () => {
        // Mock calculation
        let risk = 10; // Base risk
        if (answers.age === "70-80") risk += 10;
        if (answers.age === "80+") risk += 30;
        if (answers.memory === "Sometimes") risk += 10;
        if (answers.memory === "Often") risk += 20;
        if (answers.family === "Yes") risk += 15;
        if (answers.lifestyle === "Moderate") risk += 5;
        if (answers.lifestyle === "Low") risk += 15;
        setScore(Math.min(risk, 100));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-primary">Dementia Risk Calculator</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Assessment Form</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {questions.map((q) => (
                        <div key={q.id} className="space-y-2">
                            <Label className="text-base">{q.label}</Label>
                            <RadioGroup onValueChange={(v) => setAnswers({ ...answers, [q.id]: v })}>
                                <div className="flex flex-wrap gap-4">
                                    {q.options.map((opt) => (
                                        <div key={opt} className="flex items-center space-x-2">
                                            <RadioGroupItem value={opt} id={`${q.id}-${opt}`} />
                                            <Label htmlFor={`${q.id}-${opt}`}>{opt}</Label>
                                        </div>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>
                    ))}

                    <Button onClick={calculateRisk} className="w-full mt-4" disabled={Object.keys(answers).length < questions.length}>
                        Calculate Risk
                    </Button>
                </CardContent>
            </Card>

            {score !== null && (
                <Card className="border-2 border-primary animate-in fade-in slide-in-from-bottom-4">
                    <CardHeader>
                        <CardTitle>Your Risk Score</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <span className={`text-5xl font-bold ${score > 50 ? 'text-red-500' : 'text-green-500'}`}>
                                {score}%
                            </span>
                            <p className="text-muted-foreground mt-2">Estimated Risk Level</p>
                        </div>
                        <Progress value={score} className="h-4" />
                        <div className="rounded-lg bg-muted p-4">
                            <h3 className="font-bold mb-2">Recommendations:</h3>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                <li>Consult a neurologist for a detailed checkup.</li>
                                <li>Engage in daily brain games (try our Matching Pairs!).</li>
                                <li>Maintain a healthy diet rich in Omega-3.</li>
                                <li>Stay socially active in the Community forum.</li>
                            </ul>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            Disclaimer: This is an educational tool and not a medical diagnosis.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
