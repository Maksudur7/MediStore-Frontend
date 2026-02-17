"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Pill, Star, Quote, Send, X, ShieldCheck, Truck, Clock, HeartPulse } from "lucide-react";
import { useAuth } from "@/src/lib/auth-context";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

const staggerContainer: Variants = {
    visible: { transition: { staggerChildren: 0.2 } },
    hidden: {}
};

export default function HomePage() {
    const { getReviews, postReview, user } = useAuth();
    const [reviews, setReviews] = useState<any[]>([]);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        medicineId: "",
        rating: 5,
        comment: ""
    });

    const fetchReviews = async () => {
        try {
            const data = await getReviews();
            if (data) setReviews(data);
        } catch (err) {
            console.error("Failed to fetch reviews", err);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleExplore = () => {
        router.push("/shop");
    }

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return toast.error("Please login to post a review");

        setLoading(true);
        try {
            await postReview(formData);
            toast.success("Review posted successfully!");
            setShowReviewModal(false);
            setFormData({ medicineId: "", rating: 5, comment: "" });
            fetchReviews();
        } catch (err: any) {
            toast.error(err.message || "Failed to post review. Ensure you purchased this medicine.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050b18] text-white selection:bg-teal-500/30 overflow-x-hidden font-sans">

            {/* --- 1. HERO SECTION --- */}
            <section className="relative pt-56 pb-32 px-6">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-500/10 blur-[150px] rounded-full" />
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center text-left">
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                        <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tight">
                            YOUR HEALTH. <br />
                            <span className="bg-gradient-to-r from-teal-300 via-teal-500 to-blue-500 bg-clip-text text-transparent italic">DELIVERED.</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-gray-400 text-lg mt-8 max-w-lg leading-relaxed">
                            Order genuine OTC medicines with instant delivery. Your trusted digital apothecary is now just a click away.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex gap-5 mt-10">
                            <button onClick={()=>handleExplore()} className="bg-white text-black px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-teal-400 transition-all shadow-2xl">
                                Explore Medicines <ArrowRight size={20} />
                            </button>
                            {user && (
                                <button
                                    onClick={() => setShowReviewModal(true)}
                                    className="border border-teal-500/30 bg-teal-500/5 backdrop-blur-md px-10 py-5 rounded-2xl font-bold hover:bg-teal-500/10 transition-all flex items-center gap-2"
                                >
                                    Write a Review <Star size={18} className="text-teal-400" />
                                </button>
                            )}
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative hidden lg:flex justify-center">
                        <div >
                            <img src='/Gemini_Generated_Image_7ouudw7ouudw7ouu.png' alt="Medicine" className="relative z-10 w-[450px] h-[450px] bg-gradient-to-br from-white/10 to-transparent rounded-[100px] border border-white/20 backdrop-blur-3xl flex items-center justify-center shadow-2xl" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- 2. FEATURES GRID (Section 2) --- */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                    {[
                        { icon: <ShieldCheck className="text-teal-400" />, title: "100% Genuine", desc: "Direct from manufacturers" },
                        { icon: <Truck className="text-teal-400" />, title: "Express Delivery", desc: "Within 60 minutes" },
                        { icon: <Clock className="text-teal-400" />, title: "24/7 Support", desc: "Pharmacists on call" },
                        { icon: <HeartPulse className="text-teal-400" />, title: "Health First", desc: "Safety verified drugs" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
                        >
                            <div className="mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- 3. PROMO/ABOUT SECTION (Section 3) --- */}
            <section className="py-24 px-6 bg-[#0a1425]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
                    <div className="md:w-1/2 relative">
                        <div className="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full"></div>
                        <div className="relative border border-white/10 p-4 rounded-[40px] bg-white/5 backdrop-blur-md">
                            <img src="/Gemini_Generated_Image_7etkce7etkce7etk.png" alt="Medicine" className="rounded-[30px] w-full object-cover h-[400px]" />
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">Your Trusted <span className="text-teal-400">Healthcare Partner.</span></h2>
                        <p className="text-gray-400 text-lg mb-8">We combine technology with pharmacy to bring your essential healthcare needs right to your doorstep. No more waiting in queues.</p>
                        <ul className="space-y-4">
                            {["Verified Prescriptions", "Secure Payments", "Discrete Packaging"].map((text, i) => (
                                <li key={i} className="flex items-center gap-3 font-medium">
                                    <div className="w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400">✓</div>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- 4. REVIEWS SLIDER (Section 4) --- */}
            <section className="py-32 bg-[#050b18] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold">What Our <span className="text-teal-400 italic">Customers Say</span></h2>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-10 no-scrollbar snap-x">
                        {reviews.length > 0 ? reviews.map((rev) => (
                            <motion.div
                                key={rev.id}
                                className="min-w-[350px] bg-white/5 border border-white/10 p-8 rounded-[40px] snap-center backdrop-blur-xl"
                            >
                                <Quote className="text-teal-500/20 mb-4" size={40} />
                                <div className="flex gap-1 mb-4">
                                    {[...Array(rev.rating)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-teal-400 text-teal-400" />
                                    ))}
                                </div>
                                <p className="text-lg mb-6 text-gray-200">{rev.comment}</p>
                                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                    <div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 font-bold uppercase">
                                        {rev.customer?.name?.[0] || "U"}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">{rev.customer?.name}</h4>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{rev.medicine?.name}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <p className="text-center w-full text-gray-500">No reviews yet.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* --- REVIEW MODAL (Your Logic) --- */}
            <AnimatePresence>
                {showReviewModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setShowReviewModal(false)}
                            className="absolute inset-0 bg-[#050b18]/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-[#0a192f] border border-white/10 p-8 md:p-12 rounded-[40px] max-w-xl w-full shadow-2xl"
                        >
                            <button onClick={() => setShowReviewModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X /></button>
                            <h3 className="text-3xl font-bold mb-2">Share Your Experience</h3>
                            <form onSubmit={handleSubmitReview} className="space-y-6 mt-6">
                                <input
                                    required
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-teal-500 transition-all text-white"
                                    placeholder="Medicine ID (e.g. med-123)"
                                    value={formData.medicineId}
                                    onChange={(e) => setFormData({ ...formData, medicineId: e.target.value })}
                                />
                                <div className="flex gap-4">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <button
                                            key={num} type="button"
                                            onClick={() => setFormData({ ...formData, rating: num })}
                                            className={`flex-1 py-3 rounded-xl border transition-all ${formData.rating >= num ? 'bg-teal-500/20 border-teal-400 text-teal-400' : 'bg-white/5 border-white/10 text-gray-500'}`}
                                        >
                                            {num} ★
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    required
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-teal-500 h-32 text-white"
                                    placeholder="How was the service?"
                                    value={formData.comment}
                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                />
                                <button disabled={loading} className="w-full bg-teal-500 text-[#050b18] font-bold py-5 rounded-2xl hover:bg-teal-400 transition-all disabled:opacity-50">
                                    {loading ? "Posting..." : "Submit Review"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}