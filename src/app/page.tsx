"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Headphones, Pill, Activity, Star } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function HomePage() {
    // API থেকে ক্যাটাগরি এবং ফিচারড প্রোডাক্ট আনার জন্য স্টেট
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // fetch('/api/categories').then(res => res.json()).then(data => setCategories(data));
    }, []);

    return (
        <div className="min-h-screen bg-[#050b18] text-white selection:bg-teal-500/30 overflow-x-hidden">
            {/* <Navbar /> */}

            {/* --- SECTION 1: HERO (THE 3D GLASS LOOK) --- */}
            <section className="relative pt-56 pb-32 px-6">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-500/10 blur-[150px] rounded-full" />
                
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
                        <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tight">
                            YOUR HEALTH. <br />
                            <span className="bg-gradient-to-r from-teal-300 via-teal-500 to-blue-500 bg-clip-text text-transparent italic">DELIVERED.</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-gray-400 text-lg mt-8 max-w-lg leading-relaxed">
                            Order genuine OTC medicines with instant delivery. Your trusted digital apothecary is now just a click away.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex gap-5 mt-10">
                            <button className="bg-white text-black px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-teal-400 transition-all shadow-2xl">
                                Explore Medicines <ArrowRight size={20} />
                            </button>
                            <button className="border border-white/10 backdrop-blur-md px-10 py-5 rounded-2xl font-bold hover:bg-white/5 transition-all">
                                Track Order
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Fancy Floating Visual */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        className="relative hidden lg:flex justify-center"
                    >
                        <div className="relative z-10 w-[450px] h-[450px] bg-gradient-to-br from-white/10 to-transparent rounded-[100px] border border-white/20 backdrop-blur-3xl flex items-center justify-center shadow-2xl">
                             <Pill className="w-48 h-48 text-teal-400 drop-shadow-[0_0_40px_rgba(45,212,191,0.6)]" />
                             {/* Floating Activity Card */}
                             <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 -right-12 bg-[#0a192f] border border-white/10 p-6 rounded-3xl shadow-2xl">
                                <Activity className="text-teal-400 mb-2" />
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Live Status</p>
                                <p className="text-xl font-bold">Safe & Verified</p>
                             </motion.div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-teal-500/10 rounded-full animate-[spin_40s_linear_infinite]" />
                    </motion.div>
                </div>
            </section>

            {/* --- SECTION 2: BENTO CATEGORIES (DYNAMIC) --- */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl font-bold">Top Categories</h2>
                        <p className="text-gray-500 mt-2">Find exactly what you need in seconds.</p>
                    </div>
                    <button className="text-teal-400 font-bold flex items-center gap-2">View All <ArrowRight size={16}/></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[500px]">
                    <div className="md:col-span-2 row-span-2 bg-gradient-to-br from-teal-500/20 to-blue-600/10 rounded-[50px] border border-white/10 p-12 flex flex-col justify-end group cursor-pointer overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform"><Pill size={150}/></div>
                        <h3 className="text-4xl font-bold mb-4">Daily Wellness</h3>
                        <p className="text-gray-400 max-w-xs">Boost your health with our verified selection of daily supplements.</p>
                    </div>
                    <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-[50px] p-10 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer">
                        <div><h3 className="text-2xl font-bold">Pain Relief</h3><p className="text-gray-500 mt-2">Fast acting OTC solutions.</p></div>
                        <div className="bg-teal-500/20 p-5 rounded-full"><Star className="text-teal-400"/></div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[50px] p-10 hover:bg-white/10 transition-all cursor-pointer">
                        <h3 className="text-xl font-bold">First Aid</h3>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[50px] p-10 hover:bg-white/10 transition-all cursor-pointer">
                        <h3 className="text-xl font-bold">Skin Care</h3>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: TRUST & FLOW --- */}
            <section className="py-24 bg-[#0a192f]/30 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
                    {[
                        { icon: <Truck className="text-teal-400"/>, title: "Superfast Delivery", desc: "Local delivery in under 60 minutes." },
                        { icon: <ShieldCheck className="text-blue-400"/>, title: "Verified Pharmacy", desc: "Every seller is licensed and vetted." },
                        { icon: <Headphones className="text-purple-400"/>, title: "Expert Advice", desc: "Talk to a pharmacist at any time." },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-6">
                            <div className="bg-white/5 p-4 h-fit rounded-2xl border border-white/10">{item.icon}</div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- SECTION 4: SELLER CTA --- */}
            <section className="py-32 px-6 max-w-6xl mx-auto">
                <div className="bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-[60px] p-16 md:p-24 text-center text-[#050b18] relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">BECOME A SELLER.</h2>
                        <p className="text-[#050b18]/70 text-lg font-bold mb-12 max-w-lg mx-auto">Register your pharmacy and start selling to thousands of customers today.</p>
                        <button className="bg-[#050b18] text-white px-12 py-5 rounded-2xl font-bold hover:scale-105 transition-transform shadow-2xl">
                            Register Pharmacy Now
                        </button>
                    </div>
                    <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-white/20 blur-[100px] rounded-full" />
                </div>
            </section>

            {/* <Footer /> */}
        </div>
    );
}