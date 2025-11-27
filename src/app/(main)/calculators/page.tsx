"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Activity, TrendingDown, ArrowRight, Calculator } from "lucide-react";
import { motion } from "framer-motion";

const calculators = [
    {
        id: "dementia",
        title: "Dementia Risk Assessment",
        description: "Evaluate your risk factors for developing dementia based on lifestyle and health indicators",
        icon: Brain,
        color: "from-blue-500 to-purple-500",
        bgColor: "from-blue-50 to-purple-50",
        href: "/calculators/dementia",
    },
    {
        id: "stroke",
        title: "Stroke Risk Calculator",
        description: "Assess your stroke risk with an interactive gauge based on key health metrics",
        icon: Activity,
        color: "from-red-500 to-orange-500",
        bgColor: "from-red-50 to-orange-50",
        href: "/calculators/stroke",
        badge: "New",
    },
    {
        id: "cognitive",
        title: "Cognitive Decline Progression",
        description: "Project your cognitive health trajectory over the next 5 years with personalized insights",
        icon: TrendingDown,
        color: "from-purple-500 to-blue-500",
        bgColor: "from-purple-50 to-blue-50",
        href: "/calculators/cognitive",
        badge: "New",
    },
];

export default function CalculatorsHub() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4 rounded-b-[3rem] shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
                <div className="container mx-auto text-center relative z-10">
                    <Calculator className="h-20 w-20 mx-auto mb-6 opacity-90" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Health Risk Calculators</h1>
                    <p className="text-indigo-100 max-w-2xl mx-auto text-lg">
                        Evidence-based tools to assess your brain health risks and plan preventive care
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {calculators.map((calc, index) => (
                        <motion.div
                            key={calc.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={calc.href}>
                                <Card className={`h-full overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group bg-gradient-to-br ${calc.bgColor}`}>
                                    <CardContent className="p-6 space-y-4">
                                        {/* Icon and Badge */}
                                        <div className="flex justify-between items-start">
                                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${calc.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                                <calc.icon className="h-8 w-8" />
                                            </div>
                                            {calc.badge && (
                                                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                                    {calc.badge}
                                                </span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                {calc.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {calc.description}
                                            </p>
                                        </div>

                                        {/* CTA */}
                                        <Button
                                            className={`w-full bg-gradient-to-r ${calc.color} text-white shadow-md group-hover:shadow-lg transition-all`}
                                        >
                                            Start Assessment
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Info Section */}
                <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-indigo-100 shadow-lg">
                    <div className="max-w-3xl mx-auto text-center space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">Why Use Risk Calculators?</h2>
                        <p className="text-gray-600 leading-relaxed">
                            These calculators use evidence-based algorithms to help you understand your health risks.
                            Early detection and lifestyle modifications can significantly reduce your risk of cognitive decline,
                            stroke, and dementia. Always consult with healthcare professionals for personalized medical advice.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
                                <span className="text-sm font-medium text-indigo-700">✓ Evidence-Based</span>
                            </div>
                            <div className="bg-purple-50 px-4 py-2 rounded-full border border-purple-100">
                                <span className="text-sm font-medium text-purple-700">✓ Interactive Results</span>
                            </div>
                            <div className="bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                                <span className="text-sm font-medium text-blue-700">✓ Personalized Insights</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
