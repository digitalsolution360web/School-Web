"use client";

import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function EnquiryPage() {
    const [parentName, setParentName] = useState("");
    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [classApplying, setClassApplying] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const canSubmit = useMemo(() => {
        return Boolean(parentName.trim() && studentName.trim() && phone.trim() && classApplying.trim());
    }, [parentName, studentName, phone, classApplying]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(null);

        if (!canSubmit) {
            setSubmitError("Please fill all required fields (Parent name, Student name, Phone, Class).");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    parentName,
                    studentName,
                    email,
                    phone,
                    classApplying,
                    message,
                }),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setSubmitError(data?.error || "Failed to submit enquiry. Please try again.");
                return;
            }

            setSubmitSuccess(data?.message || "Enquiry submitted successfully!");
            setParentName("");
            setStudentName("");
            setEmail("");
            setPhone("");
            setClassApplying("");
            setMessage("");
        } catch (err) {
            setSubmitError("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col">
            <Header />
            <section className="grow pt-32 pb-20 bg-[#0a0f1a] relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Left: Contact info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-white/10"
                        >
                            <h2 className="text-2xl font-serif font-bold text-[#FFD700] mb-8">Get in Touch</h2>
                            <div className="space-y-8">
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <MapPin className="text-[#FFD700]" size={22} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white mb-1 tracking-wide">Address</p>
                                        <p className="text-white/70 leading-relaxed">Opposite of B. T. M. Jharsuguda. Odisha. Pin-768203.</p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <Phone className="text-[#FFD700]" size={22} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white mb-1 tracking-wide">Phone</p>
                                        <p className="text-white/70">9439010371 (Working days only)</p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <Mail className="text-[#FFD700]" size={22} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white mb-1 tracking-wide">Email</p>
                                        <p className="text-white/70"><a href="mailto:sjcsjharsuguda@gmail.com" className="hover:text-[#FFD700] transition-colors">sjcsjharsuguda@gmail.com</a></p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10">
                                <p className="text-white/50 text-sm italic">
                                    "Education is the most powerful weapon which you can use to change the world."
                                </p>
                            </div>
                        </motion.div>

                        {/* Right: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-white/10"
                        >
                            <h1 className="text-3xl font-serif font-bold text-[#FFD700] mb-2 uppercase tracking-wide">Admission Enquiry</h1>
                            <p className="text-white/60 mb-8 font-medium">Session 2026-27</p>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {submitError && (
                                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                        {submitError}
                                    </div>
                                )}
                                {submitSuccess && (
                                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                                        {submitSuccess}
                                    </div>
                                )}
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-black text-[#FFD700] uppercase tracking-widest mb-2.5">Student&apos;s Full Name</label>
                                        <input
                                            type="text"
                                            name="studentName"
                                            value={studentName}
                                            onChange={(e) => setStudentName(e.target.value)}
                                            className="w-full bg-white/5 px-4 py-3.5 rounded-lg border border-white/10 text-white placeholder:text-white/20 focus:border-[#FFD700] focus:bg-white/10 focus:ring-1 focus:ring-[#FFD700] outline-none transition-all"
                                            placeholder="Enter Student's Full Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-[#FFD700] uppercase tracking-widest mb-2.5">Parent&apos;s Full Name</label>
                                        <input
                                            type="text"
                                            name="parentName"
                                            value={parentName}
                                            onChange={(e) => setParentName(e.target.value)}
                                            className="w-full bg-white/5 px-4 py-3.5 rounded-lg border border-white/10 text-white placeholder:text-white/20 focus:border-[#FFD700] focus:bg-white/10 focus:ring-1 focus:ring-[#FFD700] outline-none transition-all"
                                            placeholder="Enter Parent's Full Name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-[#FFD700] uppercase tracking-widest mb-2.5">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 px-4 py-3.5 rounded-lg border border-white/10 text-white placeholder:text-white/20 focus:border-[#FFD700] focus:bg-white/10 focus:ring-1 focus:ring-[#FFD700] outline-none transition-all"
                                        placeholder="example@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-[#FFD700] uppercase tracking-widest mb-2.5">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-white/5 px-4 py-3.5 rounded-lg border border-white/10 text-white placeholder:text-white/20 focus:border-[#FFD700] focus:bg-white/10 focus:ring-1 focus:ring-[#FFD700] outline-none transition-all"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-[#FFD700] uppercase tracking-widest mb-2.5">Class Applying For</label>
                                    <select
                                        name="classApplying"
                                        value={classApplying}
                                        onChange={(e) => setClassApplying(e.target.value)}
                                        className="w-full bg-white/5 px-4 py-3.5 rounded-lg border border-white/10 text-white focus:border-[#FFD700] focus:bg-white/10 focus:ring-1 focus:ring-[#FFD700] outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-[#0a0f1a]">Select Class</option>
                                        <option value="Nursery" className="bg-[#0a0f1a]">Nursery</option>
                                        <option value="KG" className="bg-[#0a0f1a]">KG</option>
                                        <option value="Class I" className="bg-[#0a0f1a]">Class I</option>
                                        <option value="Class II - V" className="bg-[#0a0f1a]">Class II - V</option>
                                        <option value="Class VI - VIII" className="bg-[#0a0f1a]">Class VI - VIII</option>
                                        {/* <option value="Class IX - XII" className="bg-[#0a0f1a]">Class IX - XII</option> */}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-[#FFD700] uppercase tracking-widest mb-2.5">Message (Optional)</label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full bg-white/5 px-4 py-3.5 rounded-lg border border-white/10 text-white placeholder:text-white/20 focus:border-[#FFD700] focus:bg-white/10 focus:ring-1 focus:ring-[#FFD700] outline-none transition-all resize-none"
                                        placeholder="Any specific requirements..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-[#FFD700] text-[#004080] font-black py-4 rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] text-lg uppercase tracking-widest active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {submitting ? "Submitting..." : "Submit Enquiry"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="container mx-auto px-4 md:px-6 relative z-10 mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/10 w-full overflow-hidden"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3702.559916724059!2d84.00840269999999!3d21.8745045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a20e69a30ed1be1%3A0xf0e5e61e65e629a4!2sSt.%20Joseph&#39;s%20Convent%20School!5e0!3m2!1sen!2sin!4v1772277941414!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0, borderRadius: "0.5rem" }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
