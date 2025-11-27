"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface StrokeFormData {
    age: string;
    systolicBP: string;
    cholesterol: string;
    smoking: string;
    diabetes: string;
    physicalActivity: string;
}

export default function StrokeCalculator() {
    const [formData, setFormData] = useState<StrokeFormData>({
        age: "",
        systolicBP: "",
        cholesterol: "",
        smoking: "no",
        diabetes: "no",
        physicalActivity: "moderate",
    });
    const [result, setResult] = useState<number | null>(null);
    const [step, setStep] = useState(1);

    const handleChange = (field: keyof StrokeFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const calculateRisk = () => {
        let risk = 0;

        // Age factor
        const age = parseInt(formData.age);
        if (age > 65) risk += 30;
        else if (age > 55) risk += 20;
        else if (age > 45) risk += 10;

        // Blood pressure
        const bp = parseInt(formData.systolicBP);
        if (bp > 140) risk += 25;
        else if (bp > 130) risk += 15;
        else if (bp > 120) risk += 5;

        // Cholesterol
        const chol = parseInt(formData.cholesterol);
        if (chol > 240) risk += 20;
        else if (chol > 200) risk += 10;

        // Smoking
        if (formData.smoking === "yes") risk += 15;

        // Diabetes
        if (formData.diabetes === "yes") risk += 15;

        // Physical activity
        if (formData.physicalActivity === "low") risk += 10;
        else if (formData.physicalActivity === "high") risk -= 5;

        setResult(Math.min(Math.max(risk, 0), 100));
    };

    const getRiskLevel = (risk: number) => {
        if (risk < 20) return { label: "Low", color: "#10b981", icon: CheckCircle };
        if (risk < 50) return { label: "Moderate", color: "#f59e0b", icon: AlertTriangle };
        return { label: "High", color: "#ef4444", icon: AlertTriangle };
    };

    const gaugeData = result !== null ? [
        { name: "Risk", value: result },
        { name: "Safe", value: 100 - result },
    ] : [];

    const riskInfo = result !== null ? getRiskLevel(result) : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pb-20">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-12 px-4 rounded-b-[3rem] shadow-xl">
                <div className="container mx-auto text-center">
                    <Activity className="h-16 w-16 mx-auto mb-4" />
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Stroke Risk Calculator</h1>
                    <p className="text-red-100 max-w-xl mx-auto">
                        Assess your stroke risk based on key health factors
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <AnimatePresence mode="wait">
                    {result === null ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="text-orange-500" />
                                        Health Assessment (Step {step} of 3)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {step === 1 && (
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="age">Age</Label>
                                                <Input
                                                    id="age"
                                                    type="number"
                                                    placeholder="Enter your age"
                                                    value={formData.age}
                                                    onChange={(e) => handleChange("age", e.target.value)}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="bp">Systolic Blood Pressure (mmHg)</Label>
                                                <Input
                                                    id="bp"
                                                    type="number"
                                                    placeholder="e.g., 120"
                                                    value={formData.systolicBP}
                                                    onChange={(e) => handleChange("systolicBP", e.target.value)}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="chol">Total Cholesterol (mg/dL)</Label>
                                                <Input
                                                    id="chol"
                                                    type="number"
                                                    placeholder="e.g., 200"
                                                    value={formData.cholesterol}
                                                    onChange={(e) => handleChange("cholesterol", e.target.value)}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-6">
                                            <div>
                                                <Label>Do you smoke?</Label>
                                                <RadioGroup value={formData.smoking} onValueChange={(v) => handleChange("smoking", v)} className="mt-2">
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no" id="smoke-no" />
                                                        <Label htmlFor="smoke-no">No</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="yes" id="smoke-yes" />
                                                        <Label htmlFor="smoke-yes">Yes</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                            <div>
                                                <Label>Do you have diabetes?</Label>
                                                <RadioGroup value={formData.diabetes} onValueChange={(v) => handleChange("diabetes", v)} className="mt-2">
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no" id="diabetes-no" />
                                                        <Label htmlFor="diabetes-no">No</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="yes" id="diabetes-yes" />
                                                        <Label htmlFor="diabetes-yes">Yes</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div>
                                            <Label>Physical Activity Level</Label>
                                            <RadioGroup value={formData.physicalActivity} onValueChange={(v) => handleChange("physicalActivity", v)} className="mt-2 space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="low" id="activity-low" />
                                                    <Label htmlFor="activity-low">Low (Sedentary lifestyle)</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="moderate" id="activity-mod" />
                                                    <Label htmlFor="activity-mod">Moderate (Exercise 2-3 times/week)</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="high" id="activity-high" />
                                                    <Label htmlFor="activity-high">High (Exercise 4+ times/week)</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    )}

                                    <div className="flex gap-3 pt-4">
                                        {step > 1 && (
                                            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                                                Previous
                                            </Button>
                                        )}
                                        {step < 3 ? (
                                            <Button onClick={() => setStep(step + 1)} className="flex-1">
                                                Next
                                            </Button>
                                        ) : (
                                            <Button onClick={calculateRisk} className="flex-1 bg-gradient-to-r from-red-500 to-orange-500">
                                                Calculate Risk
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-center">Your Stroke Risk Assessment</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex flex-col items-center">
                                        <ResponsiveContainer width="100%" height={250}>
                                            <PieChart>
                                                <Pie
                                                    data={gaugeData}
                                                    cx="50%"
                                                    cy="50%"
                                                    startAngle={180}
                                                    endAngle={0}
                                                    innerRadius={80}
                                                    outerRadius={120}
                                                    dataKey="value"
                                                >
                                                    <Cell fill={riskInfo?.color} />
                                                    <Cell fill="#e5e7eb" />
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="text-center -mt-16">
                                            <div className="text-5xl font-bold" style={{ color: riskInfo?.color }}>
                                                {result}%
                                            </div>
                                            <div className="text-lg font-medium text-gray-600 mt-2">{riskInfo?.label} Risk</div>
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-xl border-2`} style={{ borderColor: riskInfo?.color, backgroundColor: `${riskInfo?.color}10` }}>
                                        <div className="flex items-start gap-3">
                                            {riskInfo?.icon && <riskInfo.icon className="h-6 w-6 mt-1" style={{ color: riskInfo.color }} />}
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Recommendations</h3>
                                                <ul className="space-y-1 text-sm text-gray-700">
                                                    {result < 20 && (
                                                        <>
                                                            <li>✓ Maintain your healthy lifestyle</li>
                                                            <li>✓ Continue regular exercise</li>
                                                            <li>✓ Annual health checkups recommended</li>
                                                        </>
                                                    )}
                                                    {result >= 20 && result < 50 && (
                                                        <>
                                                            <li>⚠ Consult with your doctor</li>
                                                            <li>⚠ Monitor blood pressure regularly</li>
                                                            <li>⚠ Consider lifestyle modifications</li>
                                                        </>
                                                    )}
                                                    {result >= 50 && (
                                                        <>
                                                            <li>🚨 Seek immediate medical consultation</li>
                                                            <li>🚨 Comprehensive health screening needed</li>
                                                            <li>🚨 Lifestyle changes strongly recommended</li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <Button onClick={() => { setResult(null); setStep(1); }} variant="outline" className="w-full">
                                        Calculate Again
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
