"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, TrendingDown, AlertCircle } from "lucide-react";

interface CognitiveFormData {
    currentAge: number;
    currentScore: number;
    education: number;
    physicalActivity: number;
    socialEngagement: number;
    sleepQuality: number;
}

export default function CognitiveDeclineCalculator() {
    const [formData, setFormData] = useState<CognitiveFormData>({
        currentAge: 65,
        currentScore: 75,
        education: 12,
        physicalActivity: 3,
        socialEngagement: 3,
        sleepQuality: 3,
    });
    const [showResults, setShowResults] = useState(false);

    const calculateProjection = () => {
        const baseDeclineRate = 2.5; // Base decline per year

        // Protective factors
        let protectionFactor = 0;
        if (formData.education >= 16) protectionFactor += 0.5;
        else if (formData.education >= 12) protectionFactor += 0.3;

        protectionFactor += (formData.physicalActivity - 3) * 0.2;
        protectionFactor += (formData.socialEngagement - 3) * 0.15;
        protectionFactor += (formData.sleepQuality - 3) * 0.2;

        const adjustedDeclineRate = Math.max(baseDeclineRate - protectionFactor, 0.5);

        const projectionData = [];
        for (let year = 0; year <= 5; year++) {
            const age = formData.currentAge + year;
            const score = Math.max(formData.currentScore - (adjustedDeclineRate * year), 0);
            projectionData.push({
                year: year === 0 ? "Now" : `+${year}yr`,
                age,
                score: Math.round(score * 10) / 10,
            });
        }

        return projectionData;
    };

    const projectionData = showResults ? calculateProjection() : [];
    const finalScore = projectionData.length > 0 ? projectionData[projectionData.length - 1].score : 0;
    const totalDecline = formData.currentScore - finalScore;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pb-20">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12 px-4 rounded-b-[3rem] shadow-xl">
                <div className="container mx-auto text-center">
                    <Brain className="h-16 w-16 mx-auto mb-4" />
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Cognitive Decline Progression</h1>
                    <p className="text-purple-100 max-w-xl mx-auto">
                        Project your cognitive health trajectory over the next 5 years
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <AnimatePresence mode="wait">
                    {!showResults ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Brain className="text-purple-500" />
                                        Current Health Profile
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="age">Current Age: {formData.currentAge}</Label>
                                            <Slider
                                                id="age"
                                                min={40}
                                                max={90}
                                                step={1}
                                                value={[formData.currentAge]}
                                                onValueChange={(v) => setFormData({ ...formData, currentAge: v[0] })}
                                                className="mt-3"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="score">Current Cognitive Score: {formData.currentScore}/100</Label>
                                            <Slider
                                                id="score"
                                                min={0}
                                                max={100}
                                                step={5}
                                                value={[formData.currentScore]}
                                                onValueChange={(v) => setFormData({ ...formData, currentScore: v[0] })}
                                                className="mt-3"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="education">Years of Education: {formData.education}</Label>
                                        <Slider
                                            id="education"
                                            min={8}
                                            max={20}
                                            step={1}
                                            value={[formData.education]}
                                            onValueChange={(v) => setFormData({ ...formData, education: v[0] })}
                                            className="mt-3"
                                        />
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="font-semibold text-lg">Lifestyle Factors (1=Low, 5=High)</h3>

                                        <div>
                                            <Label>Physical Activity Level: {formData.physicalActivity}/5</Label>
                                            <Slider
                                                min={1}
                                                max={5}
                                                step={1}
                                                value={[formData.physicalActivity]}
                                                onValueChange={(v) => setFormData({ ...formData, physicalActivity: v[0] })}
                                                className="mt-3"
                                            />
                                        </div>

                                        <div>
                                            <Label>Social Engagement: {formData.socialEngagement}/5</Label>
                                            <Slider
                                                min={1}
                                                max={5}
                                                step={1}
                                                value={[formData.socialEngagement]}
                                                onValueChange={(v) => setFormData({ ...formData, socialEngagement: v[0] })}
                                                className="mt-3"
                                            />
                                        </div>

                                        <div>
                                            <Label>Sleep Quality: {formData.sleepQuality}/5</Label>
                                            <Slider
                                                min={1}
                                                max={5}
                                                step={1}
                                                value={[formData.sleepQuality]}
                                                onValueChange={(v) => setFormData({ ...formData, sleepQuality: v[0] })}
                                                className="mt-3"
                                            />
                                        </div>
                                    </div>

                                    <Button onClick={() => setShowResults(true)} className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                                        Generate 5-Year Projection
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-center">5-Year Cognitive Projection</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={projectionData}>
                                            <defs>
                                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                            <XAxis dataKey="year" stroke="#6b7280" />
                                            <YAxis domain={[0, 100]} stroke="#6b7280" />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                            />
                                            <Area type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                                        </AreaChart>
                                    </ResponsiveContainer>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                            <div className="text-sm text-gray-600">Current Score</div>
                                            <div className="text-3xl font-bold text-purple-600">{formData.currentScore}</div>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                            <div className="text-sm text-gray-600">Projected (5yr)</div>
                                            <div className="text-3xl font-bold text-blue-600">{finalScore}</div>
                                        </div>
                                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                            <div className="text-sm text-gray-600">Total Decline</div>
                                            <div className="text-3xl font-bold text-orange-600">-{totalDecline.toFixed(1)}</div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="h-6 w-6 text-purple-600 mt-1" />
                                            <div>
                                                <h3 className="font-bold text-lg mb-3">Personalized Recommendations</h3>
                                                <ul className="space-y-2 text-sm text-gray-700">
                                                    {formData.physicalActivity < 3 && (
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-orange-500">⚠</span>
                                                            <span>Increase physical activity to 30+ minutes daily to slow cognitive decline</span>
                                                        </li>
                                                    )}
                                                    {formData.socialEngagement < 3 && (
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-orange-500">⚠</span>
                                                            <span>Engage in more social activities - join clubs or community groups</span>
                                                        </li>
                                                    )}
                                                    {formData.sleepQuality < 3 && (
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-orange-500">⚠</span>
                                                            <span>Improve sleep quality - aim for 7-8 hours of quality sleep nightly</span>
                                                        </li>
                                                    )}
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-green-500">✓</span>
                                                        <span>Continue brain-training exercises and cognitive games</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-green-500">✓</span>
                                                        <span>Maintain a Mediterranean-style diet rich in omega-3 fatty acids</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <Button onClick={() => setShowResults(false)} variant="outline" className="w-full">
                                        Recalculate
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
