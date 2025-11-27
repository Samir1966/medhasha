"use client";

import { useState } from "react";
import { InteractiveMap } from "@/components/doctors/InteractiveMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Phone, Video, Calendar, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data with AI Images
const doctorsData = {
    odisha: [
        {
            id: 1,
            name: "Dr. Ananya Das",
            specialty: "Neurologist",
            hospital: "AIIMS Bhubaneswar",
            rating: 4.9,
            reviews: 124,
            image: "/images/doctors/odisha.png",
            available: true,
            fee: "₹800",
        },
        {
            id: 2,
            name: "Dr. Rajesh Mishra",
            specialty: "Geriatric Psychiatrist",
            hospital: "Apollo Hospitals, Bhubaneswar",
            rating: 4.7,
            reviews: 89,
            image: "/images/doctor-placeholder.png",
            available: false,
            fee: "₹1200",
        },
    ],
    kolkata: [
        {
            id: 3,
            name: "Dr. S. K. Banerjee",
            specialty: "Neurosurgeon",
            hospital: "Fortis Hospital, Kolkata",
            rating: 4.8,
            reviews: 210,
            image: "/images/doctors/kolkata.png",
            available: true,
            fee: "₹1500",
        },
    ],
    delhi: [
        {
            id: 4,
            name: "Dr. Priya Kapoor",
            specialty: "Cognitive Therapist",
            hospital: "Max Healthcare, Delhi",
            rating: 4.9,
            reviews: 156,
            image: "/images/doctors/delhi.png",
            available: true,
            fee: "₹2000",
        },
    ],
};

export default function DoctorsPage() {
    const [selectedCity, setSelectedCity] = useState<string | null>("odisha");
    const [searchQuery, setSearchQuery] = useState("");

    const currentDoctors = selectedCity ? doctorsData[selectedCity as keyof typeof doctorsData] : [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 pb-20">
            {/* Hero Section */}
            <div className="bg-primary text-white py-12 px-4 rounded-b-[3rem] shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/patterns/circuit.svg')] opacity-10" />
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Find the Best Care</h1>
                    <p className="text-blue-100 max-w-xl mx-auto mb-8">
                        Connect with top neurologists and geriatric specialists in your region.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                            placeholder="Search doctors, hospitals, or specialties..."
                            className="pl-10 h-12 rounded-full bg-white text-gray-900 shadow-lg border-none focus-visible:ring-2 focus-visible:ring-orange-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Interactive Map (Sticky on Desktop) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MapPin className="text-orange-500" /> Select Region
                            </h2>
                            <InteractiveMap
                                selectedCity={selectedCity}
                                onSelectCity={setSelectedCity}
                            />
                        </div>
                    </div>

                    {/* Right Column: Doctor Listings */}
                    <div className="lg:col-span-7">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                Doctors in <span className="text-primary capitalize">{selectedCity || "India"}</span>
                            </h2>
                            <Badge variant="outline" className="px-3 py-1">
                                {currentDoctors?.length || 0} Available
                            </Badge>
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence mode="wait">
                                {currentDoctors?.map((doctor) => (
                                    <motion.div
                                        key={doctor.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm group">
                                            <CardContent className="p-0">
                                                <div className="flex flex-col sm:flex-row">
                                                    {/* Doctor Image */}
                                                    <div className="sm:w-1/3 relative h-48 sm:h-auto bg-gray-100 overflow-hidden">
                                                        <img
                                                            src={doctor.image}
                                                            alt={doctor.name}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        {doctor.available && (
                                                            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                                                                Available Today
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Doctor Details */}
                                                    <div className="p-5 sm:w-2/3 flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                                                                    <p className="text-primary font-medium text-sm">{doctor.specialty}</p>
                                                                </div>
                                                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                                                                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                                                    <span className="text-xs font-bold text-yellow-700">{doctor.rating}</span>
                                                                </div>
                                                            </div>

                                                            <div className="mt-3 space-y-1 text-sm text-gray-600">
                                                                <p className="flex items-center gap-2">
                                                                    <MapPin className="h-3 w-3 text-gray-400" /> {doctor.hospital}
                                                                </p>
                                                                <p className="flex items-center gap-2">
                                                                    <span className="font-semibold text-gray-900">{doctor.fee}</span> Consultation Fee
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="mt-5 flex gap-3">
                                                            <Button className="flex-1 gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                                                                <Calendar className="h-4 w-4" /> Book Visit
                                                            </Button>
                                                            <Button variant="outline" className="flex-1 gap-2 border-primary/20 text-primary hover:bg-primary/5">
                                                                <Video className="h-4 w-4" /> Video Call
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {(!currentDoctors || currentDoctors.length === 0) && (
                                <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-gray-300">
                                    <p className="text-gray-500">No doctors found in this region yet.</p>
                                    <Button variant="link" className="text-primary">View all regions</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
