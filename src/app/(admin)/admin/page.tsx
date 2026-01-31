"use client";
import { useState, useEffect } from "react";
import {
    Users,
    Package,
    ShoppingBag,
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/src/lib/api";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalMedicines: 0,
        totalOrders: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Backend theke data anar fake simulation or real call
        const fetchDashboardData = async () => {
            try {
                // Example calls: actual logic depends on your backend routes
                const [usersRes, medRes] = await Promise.all([
                    api.auth.getProfile(), // or api.users.getAll()
                    api.medicines.getAll()
                ]);

                // Demo values setup: replace with actual backend totals
                setStats({
                    totalUsers: 124,
                    totalMedicines: 450,
                    totalOrders: 89,
                    totalRevenue: 15400
                });
            } catch (err) {
                console.error("Dashboard Load Error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const statCards = [
        { title: "Total Revenue", value: `$${stats.totalRevenue}`, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        { title: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
        { title: "Medicines", value: stats.totalMedicines, icon: Package, color: "text-teal-400", bg: "bg-teal-500/10" },
        { title: "Orders", value: stats.totalOrders, icon: ShoppingBag, color: "text-purple-400", bg: "bg-purple-500/10" },
    ];

    return (
        <div className="min-h-screen bg-[#050b18] text-white p-6 md:p-12 pt-32">
            <div className="max-w-7xl mx-auto pt-24">
                {/* --- HEADER --- */}
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-teal-400 mb-2 font-black uppercase tracking-[0.4em] text-[10px]"
                    >
                        <TrendingUp size={14} /> System Overview
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter">ADMIN <span className="text-teal-500">DASHBOARD.</span></h1>
                </div>

                {/* --- STATS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statCards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0a192f]/40 border border-white/10 p-8 rounded-[35px] backdrop-blur-xl hover:border-white/20 transition-all group"
                        >
                            <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <card.icon size={24} />
                            </div>
                            <h3 className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">{card.title}</h3>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-black">{card.value}</span>
                                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 mb-1">
                                    +12% <ArrowUpRight size={14} />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* --- RECENT ACTIVITY TABLE --- */}
                    <div className="lg:col-span-2 bg-[#0a192f]/40 border border-white/10 rounded-[40px] p-8 backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black uppercase tracking-tight">Recent Orders</h2>
                            <button className="text-[10px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors">View All</button>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
                                            <ShoppingBag size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Order #MD-992{item}</p>
                                            <p className="text-[10px] text-gray-500 font-medium">Customer: John Doe</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black">$120.00</p>
                                        <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-tighter">Success</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- SYSTEM HEALTH / QUICK ACTIONS --- */}
                    <div className="bg-gradient-to-b from-teal-500/20 to-transparent border border-white/10 rounded-[40px] p-8 backdrop-blur-xl">
                        <h2 className="text-xl font-black uppercase tracking-tight mb-8">Quick Actions</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <button className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-teal-400 transition-all">
                                Generate Report
                            </button>
                            <button className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">
                                Update Inventory
                            </button>

                            <div className="mt-8 p-6 bg-black/40 rounded-[30px] border border-white/5">
                                <div className="flex items-center gap-2 text-teal-400 mb-4">
                                    <Clock size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Server Status</span>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                                    All systems operational. <br />
                                    Last backup: <span className="text-white">2 mins ago</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}