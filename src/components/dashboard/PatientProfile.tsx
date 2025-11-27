"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, User, MapPin, Phone } from "lucide-react";

interface PatientData {
    name: string;
    age: string;
    bloodGroup: string;
    condition: string;
    address: string;
    phone: string;
    history: { event: string; date: string; color: string }[];
}

interface PatientProfileProps {
    data: PatientData;
}

export function PatientProfile({ data }: PatientProfileProps) {
    return (
        <Card className="h-full bg-white/50 backdrop-blur-md border-none shadow-lg">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
                    <User className="h-5 w-5" /> Patient Profile
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-4 border-white shadow-sm">
                        <AvatarImage src="/images/elder-avatar.png" alt="Patient" />
                        <AvatarFallback className="bg-orange-100 text-orange-700 text-xl">
                            {data.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{data.name}</h3>
                        <p className="text-sm text-muted-foreground">Age: {data.age}</p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                                {data.bloodGroup}
                            </Badge>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                                {data.condition}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{data.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span>{data.address}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Medical History</h4>
                    <div className="relative border-l-2 border-gray-200 ml-2 space-y-4 pl-4">
                        {data.history.map((item, index) => (
                            <div key={index} className="relative">
                                <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full ${item.color} ring-4 ring-white`} />
                                <p className="text-sm font-medium">{item.event}</p>
                                <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-red-50 p-3 rounded-xl flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full shadow-sm text-red-500">
                            <Heart className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Heart Rate</p>
                            <p className="text-lg font-bold text-gray-800">78 bpm</p>
                        </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full shadow-sm text-blue-500">
                            <Activity className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">BP</p>
                            <p className="text-lg font-bold text-gray-800">120/80</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
