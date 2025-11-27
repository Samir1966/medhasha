"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, CreditCard, Users } from "lucide-react";

export default function DonatePage() {
    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-primary">Support Our Mission</h1>
                <p className="text-muted-foreground">
                    Your donation helps us provide brain health tools to rural elders across India.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-2 border-primary/20 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="h-5 w-5 text-red-500 fill-current" /> Adopt a Senior
                        </CardTitle>
                        <CardDescription>₹500 / month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">Sponsor complete care for one elder: Medical reports, premium games, and doctor consults.</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Subscribe</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" /> One-time Donation
                        </CardTitle>
                        <CardDescription>Any amount</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label>Amount (₹)</Label>
                            <Input type="number" placeholder="1000" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Donate Now</Button>
                    </CardFooter>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Transparency Ledger</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm border-b pb-2">
                            <span>Total Donations</span>
                            <span className="font-bold">₹12,45,000</span>
                        </div>
                        <div className="flex justify-between text-sm border-b pb-2">
                            <span>Elders Supported</span>
                            <span className="font-bold">850+</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Villages Covered</span>
                            <span className="font-bold">12</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
