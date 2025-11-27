"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Upload, User } from "lucide-react";

interface PatientData {
    name: string;
    age: string;
    bloodGroup: string;
    condition: string;
    address: string;
    phone: string;
    history: { event: string; date: string; color: string }[];
}

interface EditProfileDialogProps {
    data: PatientData;
    onSave: (newData: PatientData) => void;
}

export function EditProfileDialog({ data, onSave }: EditProfileDialogProps) {
    const [formData, setFormData] = useState<PatientData>(data);
    const [open, setOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Pencil className="h-4 w-4" /> Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" /> Edit Patient Profile
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="h-20 w-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                            <Upload className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                            <p>Click to upload new photo</p>
                            <p className="text-xs">(Simulated)</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" name="age" value={formData.age} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="bloodGroup">Blood Group</Label>
                            <Input id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="condition">Current Condition</Label>
                            <Input id="condition" name="condition" value={formData.condition} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" name="address" value={formData.address} onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label>Medical History (Read-only in MVP)</Label>
                        <div className="text-xs text-muted-foreground border p-2 rounded bg-gray-50">
                            {formData.history.map((h, i) => (
                                <div key={i} className="flex justify-between">
                                    <span>{h.event}</span>
                                    <span>{h.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
