"use client";

import { useState } from "react";
import { InteractiveMap } from "@/components/doctors/InteractiveMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Phone, Video, Calendar, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Real Doctors Data from Odisha
const doctorsData = {
    odisha: [
        {
            id: 1,
            name: "Dr. Jyoti Narayan Das",
            specialty: "Geriatric Specialist",
            hospital: "Pattamundai, Odisha",
            rating: 4.9,
            reviews: 124,
            image: "/images/doctors/dr-jyoti.png",
            available: true,
            fee: "₹500",
            phone: "+91 70779 91009",
            whatsapp: "917077991009"
        },
        {
            id: 2,
            name: "Dr. Bhagyabati Das",
            specialty: "General Physician",
            hospital: "Aul, Odisha",
            rating: 4.8,
            reviews: 98,
            image: "/images/doctors/dr-bhagyabati.png",
            available: true,
            fee: "₹400",
            phone: "+91 94382 73089",
            whatsapp: "919438273089"
        },
        {
            id: 3,
            name: "Dr. Madhusmita",
            specialty: "Healthcare Specialist",
            hospital: "Odisha",
            rating: 4.7,
            reviews: 85,
            image: "/images/doctors/dr-madhusmita.png",
            available: true,
            fee: "₹450",
            phone: "+91 93484 22438",
            whatsapp: "919348422438"
        },
    ],
    kolkata: [],
    delhi: [],
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
                                                                    <Phone className="h-3 w-3 text-gray-400" /> {doctor.phone}
                                                                </p>
                                                                <p className="flex items-center gap-2">
                                                                    <span className="font-semibold text-gray-900">{doctor.fee}</span> Consultation Fee
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="mt-5 flex gap-3">
                                                            <Button
                                                                className="flex-1 gap-2 bg-blue-500 hover:bg-blue-600 shadow-lg"
                                                                onClick={() => window.location.href = `tel:${doctor.phone}`}
                                                            >
                                                                <Phone className="h-4 w-4" /> Call Doctor
                                                            </Button>
                                                            <Button
                                                                className="flex-1 gap-2 bg-green-500 hover:bg-green-600 text-white shadow-lg"
                                                                onClick={() => window.open(`https://wa.me/${doctor.whatsapp}`, '_blank')}
                                                            >
                                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                                </svg>
                                                                Chat
                                                            </Button>
                                                            <Button
                                                                className="flex-1 gap-2 bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
                                                                onClick={() => window.open(`https://wa.me/${doctor.whatsapp}?text=Hello Dr. ${doctor.name}, I would like to request a video call.`, '_blank')}
                                                            >
                                                                <Video className="h-4 w-4" />
                                                                Video Call
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
