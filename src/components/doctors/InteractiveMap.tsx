"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";

interface City {
    id: string;
    name: string;
    x: number; // Percentage from left
    y: number; // Percentage from top
    doctors: number;
}

const cities: City[] = [
    { id: "delhi", name: "Delhi", x: 30, y: 25, doctors: 12 },
    { id: "kolkata", name: "Kolkata", x: 75, y: 45, doctors: 8 },
    { id: "odisha", name: "Odisha", x: 65, y: 55, doctors: 15 },
];

interface InteractiveMapProps {
    onSelectCity: (cityId: string) => void;
    selectedCity: string | null;
}

export function InteractiveMap({ onSelectCity, selectedCity }: InteractiveMapProps) {
    return (
        <div className="relative w-full aspect-[4/5] bg-blue-50/50 rounded-3xl overflow-hidden border border-blue-100 shadow-inner">
            {/* Abstract India Map Background */}
            <svg
                viewBox="0 0 400 500"
                className="absolute inset-0 w-full h-full text-blue-200/50"
                fill="currentColor"
            >
                {/* Simplified Abstract Polygon for India-ish shape */}
                <path d="M 130 20 L 200 10 L 280 40 L 320 100 L 350 150 L 380 200 L 320 250 L 280 300 L 200 480 L 120 350 L 50 250 L 20 150 L 80 80 Z" />
            </svg>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

            {/* City Hotspots */}
            {cities.map((city) => (
                <motion.div
                    key={city.id}
                    className="absolute cursor-pointer"
                    style={{ left: `${city.x}%`, top: `${city.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    onClick={() => onSelectCity(city.id)}
                >
                    <div className="relative flex flex-col items-center group">
                        {/* Pulse Effect */}
                        <motion.div
                            className={`absolute w-12 h-12 rounded-full ${selectedCity === city.id ? "bg-orange-500/30" : "bg-blue-500/20"
                                }`}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Pin Icon */}
                        <motion.div
                            whileHover={{ scale: 1.2, y: -5 }}
                            className={`relative z-10 p-2 rounded-full shadow-lg transition-colors ${selectedCity === city.id
                                    ? "bg-orange-500 text-white"
                                    : "bg-white text-blue-600 group-hover:bg-blue-50"
                                }`}
                        >
                            <MapPin className="h-6 w-6" fill={selectedCity === city.id ? "currentColor" : "none"} />
                        </motion.div>

                        {/* Label */}
                        <motion.div
                            className={`mt-2 px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm transition-colors ${selectedCity === city.id
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-white/80 text-gray-700 group-hover:bg-white"
                                }`}
                        >
                            {city.name}
                        </motion.div>

                        {/* Count Badge */}
                        <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-green-500 text-white text-[10px] font-bold rounded-full border-2 border-white">
                            {city.doctors}
                        </span>
                    </div>
                </motion.div>
            ))}

            {/* Instructions Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-white/50 text-center">
                <p className="text-sm text-gray-600">
                    Tap a location to find specialists near you
                </p>
            </div>
        </div>
    );
}
