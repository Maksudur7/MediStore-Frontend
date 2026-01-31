"use client";
import { useState, useEffect } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Lock,
    Camera,
    ShieldCheck,
    Save
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { api } from "@/src/lib/api";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.auth.getProfile();
                if (res.success) setUser(res.data);
            } catch (err: any) {
                toast.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // এখানে আপনার আপডেট API কল করবেন
        setTimeout(() => {
            toast.success("Profile updated successfully!");
            setIsSaving(false);
        }, 1500);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#050b18]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-teal-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050b18] text-white pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-black tracking-tighter mb-12">EDIT <span className="text-teal-400 font-outline italic">PROFILE.</span></h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* --- MAIN FORM --- */}
                    <div className="md:col-span-3">
                        <form onSubmit={handleUpdate} className="bg-[#0a192f]/40 border border-white/10 rounded-[45px] p-8 md:p-10 backdrop-blur-xl">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                            <input type="text" defaultValue={user?.name} className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-teal-500 transition-all font-medium" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                            <input type="email" readOnly defaultValue={user?.email} className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 outline-none opacity-50 cursor-not-allowed font-medium" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                            <input type="tel" defaultValue={user?.phone || "+880"} className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-teal-500 transition-all font-medium" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Default Shipping Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                            <textarea rows={3} defaultValue={user?.address} className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-teal-500 transition-all font-medium resize-none" placeholder="Your full address here..."></textarea>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    disabled={isSaving}
                                    className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSaving ? "Updating..." : <><Save size={18} /> Save Changes</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}