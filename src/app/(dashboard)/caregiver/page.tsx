"use client";

import { useState } from "react";
import { PatientProfile } from "@/components/dashboard/PatientProfile";
import { HealthCharts } from "@/components/dashboard/HealthCharts";
import { DietTracker } from "@/components/dashboard/DietTracker";
import { YogaTracker } from "@/components/dashboard/YogaTracker";
import { CaretakerCard } from "@/components/dashboard/CaretakerCard";
import { EditProfileDialog } from "@/components/dashboard/EditProfileDialog";
import { Button } from "@/components/ui/button";
import { Upload, Calendar as CalendarIcon, FileText } from "lucide-react";

// Initial Mock Data
const initialPatientData = {
    name: "Ram Prasad",
    age: "72",
    bloodGroup: "O+",
    condition: "Dementia (Stage 2)",
    address: "123, Gandhi Nagar, Bhubaneswar, Odisha",
    phone: "+91 98765 43210",
    history: [
        { event: "Diagnosed with Mild Dementia", date: "Jan 2024", color: "bg-green-500" },
        { event: "Hypertension Detected", date: "Nov 2023", color: "bg-gray-300" },
    ]
};

export default function CaregiverDashboard() {
    const [patientData, setPatientData] = useState(initialPatientData);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 p-4 md:p-8 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Caregiver Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, Priya. Here's today's update for {patientData.name.split(' ')[0]}.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 bg-white/50 backdrop-blur-sm">
                        <CalendarIcon className="h-4 w-4" /> Schedule
                    </Button>
                    <Button className="gap-2 shadow-lg shadow-primary/20">
                        <Upload className="h-4 w-4" /> Upload Report
                    </Button>
                </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Column: Profile & Trackers (4 cols) */}
                <div className="md:col-span-4 space-y-6">
                    <div className="relative group">
                        <PatientProfile data={patientData} />
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <EditProfileDialog data={patientData} onSave={setPatientData} />
                        </div>
                    </div>

                    <CaretakerCard />
                </div>

                {/* Right Column: Charts & Detailed Trackers (8 cols) */}
                <div className="md:col-span-8 space-y-6">
                    {/* Health Charts Row */}
                    <HealthCharts />

                    {/* Trackers Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <DietTracker />
                        <YogaTracker />
                    </div>

                    {/* Recent Reports Stub (Glassmorphism) */}
                    <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <FileText className="h-5 w-5 text-blue-500" /> Recent Reports
                            </h3>
                            <Button variant="ghost" size="sm">View All</Button>
                        </div>
                        <div className="space-y-3">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">Blood_Test_Report.pdf</p>
                                            <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">Verified</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
