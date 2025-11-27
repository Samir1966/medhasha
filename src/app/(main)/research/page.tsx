"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Activity, Users } from "lucide-react";

export default function ResearchPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary">Research & Impact</h1>
            <p className="text-muted-foreground">Aggregated anonymous data from MedhAsha users.</p>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Cognitive Score</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78/100</div>
                        <p className="text-xs text-muted-foreground">+5% improvement</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Games Played</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,543</div>
                        <p className="text-xs text-muted-foreground">Most popular: Matching Pairs</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Cognitive Health Trends (Village-wise)</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                    <p className="text-muted-foreground">Chart Placeholder (Recharts Integration)</p>
                </CardContent>
            </Card>
        </div>
    );
}
