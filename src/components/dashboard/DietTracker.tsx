"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Utensils, Coffee, Sun, Moon, Apple } from "lucide-react";

export function DietTracker() {
    const [diet, setDiet] = useState({
        breakfast: true,
        lunch: true,
        snacks: false,
        dinner: false,
    });

    return (
        <Card className="h-full bg-white/50 backdrop-blur-md border-none shadow-lg">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
                    <Utensils className="h-5 w-5" /> Daily Diet Tracker
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full text-orange-500">
                            <Coffee className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-gray-700">Breakfast</span>
                    </div>
                    <Checkbox
                        checked={diet.breakfast}
                        onCheckedChange={(c: boolean | string) => setDiet(prev => ({ ...prev, breakfast: !!c }))}
                        className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full text-yellow-500">
                            <Sun className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-gray-700">Lunch</span>
                    </div>
                    <Checkbox
                        checked={diet.lunch}
                        onCheckedChange={(c: boolean | string) => setDiet(prev => ({ ...prev, lunch: !!c }))}
                        className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                    />
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full text-green-500">
                            <Apple className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-gray-700">Snacks</span>
                    </div>
                    <Checkbox
                        checked={diet.snacks}
                        onCheckedChange={(c: boolean | string) => setDiet(prev => ({ ...prev, snacks: !!c }))}
                        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                </div>

                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full text-indigo-500">
                            <Moon className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-gray-700">Dinner</span>
                    </div>
                    <Checkbox
                        checked={diet.dinner}
                        onCheckedChange={(c: boolean | string) => setDiet(prev => ({ ...prev, dinner: !!c }))}
                        className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
