"use client";

import React, { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const events = [
    {
        title: " Science Quiz",
        subtitle: "Inter-School Events",
        date: "FEB 05, 2026",
        image: "/a3.webp",
        borderColor: "border-red-500",
    },
    {
        title: " Computer lab",
        subtitle: "Lab & Awards",
        date: "FEB 03, 2026",
        image: "/Gallery/training/lab.webp",
        borderColor: "border-blue-500",
    },
    {
        title: "Yoga Classes",
        subtitle: "Student Yoga",
        date: "JAN 29, 2026",
        image: "/Gallery/Yoga/Yoga-Day.jpg",
        borderColor: "border-purple-500",
    },
    {
        title: "Happy Republic Day",
        subtitle: "CELEBRATION",
        date: "JAN 26, 2026",
        image: "/Gallery/Republic-Day/Republic-Day.jpg",
        borderColor: "border-orange-500",
    },
];

export default function RecentActivitiesPage() {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
        }
    };

    return (
        <main className="min-h-screen bg-white overflow-hidden">
            <Header />
            <section className="pt-28 pb-20 relative group/section">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h1 className="text-4xl md:text-5xl font-serif font-black text-primary mb-4 uppercase tracking-[0.2em]">
                                Recent Activities
                            </h1>
                            <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full mb-6" />
                            <Link
                                href="/"
                                className="group flex items-center justify-center gap-2 text-secondary font-black uppercase tracking-widest text-sm hover:text-primary transition-colors"
                            >
                                Back to Home
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Slider Container Wrapper with Navigation Buttons */}
                    <div className="relative">
                        <button
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-xl text-primary hover:bg-primary hover:text-white transition-all opacity-0 group-hover/section:opacity-100 hidden md:block"
                            aria-label="Scroll Left"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-xl text-primary hover:bg-primary hover:text-white transition-all opacity-0 group-hover/section:opacity-100 hidden md:block"
                            aria-label="Scroll Right"
                        >
                            <ChevronRight size={28} />
                        </button>

                        <div
                            ref={sliderRef}
                            className="flex overflow-x-auto gap-10 pb-12 px-4 snap-x snap-mandatory scrollbar-hide max-w-7xl mx-auto"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {events.map((event, index) => (
                                <div
                                    key={event.title}
                                    className="flex-shrink-0 w-80 md:w-96 snap-center group"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                        className={`relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)] transition-all duration-500 border-b-[6px] ${event.borderColor} hover:-translate-y-3 cursor-pointer`}
                                    >
                                        {/* Image Section */}
                                        <div className="aspect-[4/3] overflow-hidden relative">
                                            <Image
                                                src={event.image}
                                                alt={event.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                                            {/* Date Badge Overlay */}
                                            <div className="absolute top-6 right-6">
                                                <div className="bg-white/95 backdrop-blur px-4 py-1.5 rounded-full shadow-lg">
                                                    <p className="text-[10px] font-black text-primary tracking-widest uppercase">
                                                        {event.date}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-8 text-center flex flex-col items-center h-full relative z-10 bg-white">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                                                <Calendar size={20} className="text-secondary group-hover:text-white transition-colors" />
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-serif font-black text-primary mb-2 tracking-tight group-hover:text-secondary transition-colors duration-300 leading-tight">
                                                {event.title}
                                            </h3>
                                            <p className="text-xs font-black text-secondary tracking-[0.2em] mb-6">
                                                {event.subtitle}
                                            </p>

                                            <span className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary group-hover:text-secondary">
                                                Read Highlights <ChevronRight size={14} />
                                            </span>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Background design elements */}
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10 translate-x-1/2 translate-y-1/2"></div>
            </section>
            <Footer />
        </main>
    );
}
