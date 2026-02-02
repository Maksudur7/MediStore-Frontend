"use client";
import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useAuth } from "@/src/lib/auth-context";

export default function ProfilePage() {
    const { user, updateProfile } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id || "",
                name: user.name || "",
                phone: user.phone || "",
                address: user.address || ""
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        console.log('updating profile with data:', formData);
        try {
            const res = await updateProfile(formData);
            if (res.success) {
                toast.success("Profile updated successfully!");
            } else {
                toast.error(res.message || "Failed to update");
            }
        } catch (err) {
            toast.error("An error occurred");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050b18] text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <p className="text-teal-400 font-black uppercase tracking-[0.4em] text-[10px] mb-2">Account Settings</p>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase">
                        Edit <span className="text-teal-400 font-outline">Profile.</span>
                    </h1>
                </div>

                <form onSubmit={handleUpdate} className="bg-[#0a192f]/40 border border-white/10 rounded-[45px] p-8 md:p-12 backdrop-blur-xl shadow-2xl">
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-[24px] pl-14 pr-6 py-5 outline-none focus:border-teal-500 transition-all font-bold text-lg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">Email (Locked)</label>
                                <div className="relative">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700" size={20} />
                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        readOnly
                                        className="w-full bg-white/[0.02] border border-white/5 rounded-[24px] pl-14 pr-6 py-5 opacity-40 cursor-not-allowed font-bold text-lg text-gray-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 md:col-span-2">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">Mobile Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
                                    <input
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-[24px] pl-14 pr-6 py-5 outline-none focus:border-teal-500 transition-all font-bold text-lg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 md:col-span-2">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">Shipping Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-5 top-8 -translate-y-1/2 text-gray-600" size={20} />
                                    <textarea
                                        name="address"
                                        rows={4}
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-[30px] pl-14 pr-6 py-6 outline-none focus:border-teal-500 transition-all font-bold text-lg resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full bg-white text-black py-6 rounded-[24px] font-black uppercase tracking-[0.3em] text-xs hover:bg-teal-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isSaving ? (
                                <><Loader2 className="animate-spin" size={20} /> Updating...</>
                            ) : (
                                <><Save size={18} /> Update Profile</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}