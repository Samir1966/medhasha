"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Gamepad2, Activity, BookOpen, MapPin, Heart, Calculator, FileText, ArrowRight, Sparkles, Glasses } from "lucide-react";

export default function HomePage() {
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const features = [
    { href: "/chat", icon: MessageCircle, label: "NeuroBuddy", desc: "Your AI Companion", color: "bg-green-100 text-green-600", border: "border-green-200" },
    { href: "/games", icon: Gamepad2, label: "Brain Games", desc: "Sharpen your mind", color: "bg-blue-100 text-blue-600", border: "border-blue-200" },
    { href: "/yoga", icon: Activity, label: "Virtual Yoga", desc: "Body & Mind Balance", color: "bg-orange-100 text-orange-600", border: "border-orange-200" },
    { href: "/library", icon: BookOpen, label: "Library", desc: "Health Wisdom", color: "bg-purple-100 text-purple-600", border: "border-purple-200" },
    { href: "/doctors", icon: MapPin, label: "Find Doctors", desc: "Local Specialists", color: "bg-red-100 text-red-600", border: "border-red-200" },
    { href: "/community", icon: Heart, label: "Community", desc: "Connect & Share", color: "bg-pink-100 text-pink-600", border: "border-pink-200" },
    { href: "/calculators", icon: Calculator, label: "Risk Check", desc: "Health Analysis", color: "bg-yellow-100 text-yellow-600", border: "border-yellow-200" },
    { href: "/caregiver", icon: FileText, label: "Caregiver", desc: "Tools & Reports", color: "bg-slate-100 text-slate-600", border: "border-slate-200" },
    { href: "https://medhasha-vr.vercel.app/", icon: Glasses, label: "Medhasha VR", desc: "Virtual Reality", color: "bg-indigo-100 text-indigo-600", border: "border-indigo-200", external: true },
  ];

  return (
    <div className="flex flex-col gap-12 pb-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 md:p-12 shadow-lg">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />

        <div className="relative z-10 grid gap-8 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center md:text-left"
          >
            <div className="inline-flex items-center rounded-full border bg-background/50 px-3 py-1 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
              <span>Welcome back, Ramesh!</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
              Empowering Your <br />
              <span className="text-foreground">Brain Health Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
              Engage in daily activities, connect with doctors, and stay healthy with your personal AI companion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-primary/25 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all" asChild>
                <Link href="/chat">
                  Chat with NeuroBuddy <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-lg h-14 px-8 border-2" asChild>
                <Link href="/games">Play Games</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
              <img
                src="/images/hero-brain.png"
                alt="Brain Health Illustration"
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Daily Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-none bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 shadow-md">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Daily Streak: 5 Days 🔥</h3>
                <p className="text-muted-foreground">You're doing great! Keep it up.</p>
              </div>
            </div>
            <Button variant="secondary" className="whitespace-nowrap">View Progress</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {features.map((feature) => (
          <motion.div key={feature.href} variants={item}>
            {feature.external ? (
              <a href={feature.href} target="_blank" rel="noopener noreferrer">
                <Card className={`h-full transition-all hover:-translate-y-1 hover:shadow-lg border ${feature.border} bg-background/50 backdrop-blur-sm cursor-pointer group`}>
                  <CardContent className="flex flex-col items-center justify-center gap-4 p-6 text-center h-full">
                    <div className={`h-16 w-16 rounded-2xl ${feature.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-lg font-bold block">{feature.label}</span>
                      <span className="text-xs text-muted-foreground">{feature.desc}</span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ) : (
              <Link href={feature.href}>
                <Card className={`h-full transition-all hover:-translate-y-1 hover:shadow-lg border ${feature.border} bg-background/50 backdrop-blur-sm cursor-pointer group`}>
                  <CardContent className="flex flex-col items-center justify-center gap-4 p-6 text-center h-full">
                    <div className={`h-16 w-16 rounded-2xl ${feature.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-lg font-bold block">{feature.label}</span>
                      <span className="text-xs text-muted-foreground">{feature.desc}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative h-48 w-full overflow-hidden rounded-2xl shadow-lg"
      >
        <img
          src="/images/banner.png"
          alt="Community Banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-8">
          <div className="text-white max-w-md">
            <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
            <p className="mb-4 opacity-90">Connect with other elders and share your journey.</p>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/community">Explore Now</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
