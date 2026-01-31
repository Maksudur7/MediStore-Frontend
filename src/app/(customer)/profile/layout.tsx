"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Bell, Camera, Lock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/src/lib/api";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);

    const menuItems = [
        { name: "General Info", href: "/profile", icon: User },
        { name: "Security", href: "/profile/security", icon: Lock },
        { name: "Notifications", href: "/profile/notifications", icon: Bell },
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.auth.getProfile();
                if (res.success) setUser(res.data);
            } catch (err: any) {
                toast.error("Failed to load profile");
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen bg-[#050b18] text-white pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                {/* --- HEADER --- */}
                <div className="mb-12 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-teal-500 to-blue-600 p-[2px]">
                            <div className="w-full h-full rounded-[38px] bg-[#0a192f] flex items-center justify-center overflow-hidden">
                                <span className="text-4xl font-black text-teal-400">{user?.name?.[0].toUpperCase()}</span>
                            </div>
                        </div>
                        <button className="absolute bottom-0 right-0 p-3 bg-white text-black rounded-2xl shadow-xl hover:bg-teal-400 transition-all active:scale-90">
                            <Camera size={18} />
                        </button>
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-black tracking-tighter uppercase">{user?.name}</h1>
                        <p className="text-teal-500 font-bold text-xs tracking-[0.3em] uppercase mt-1">{user?.role || "Customer"}</p>
                        <div className="flex items-center gap-4 mt-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-500" /> Verified Account</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* --- SIDE MENU --- */}
                    <aside className="lg:col-span-1 space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${isActive
                                        ? "bg-teal-500 text-[#050b18] shadow-lg shadow-teal-500/20"
                                        : "bg-white/5 text-gray-500 hover:bg-white/10"
                                        }`}
                                >
                                    <item.icon size={18} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </aside>

                    {/* --- DYNAMIC CONTENT --- */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}