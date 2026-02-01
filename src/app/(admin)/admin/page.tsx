"use client";
import { useState, useEffect } from "react";
import {
    Users,
    Package,
    ShoppingBag,
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    Clock,
    Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/src/lib/auth-context";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalMedicines: 0,
        totalOrders: 0,
        totalRevenue: 0,
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);
    const { getAdminStats } = useAuth();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const res = await getAdminStats();
                if (res) {
                    setStats({
                        totalUsers: res.totalUsers || 0,
                        totalMedicines: res.totalMedicines || 0,
                        totalOrders: res.totalOrders || 0,
                        totalRevenue: res.totalRevenue || 0,
                        recentOrders: res.recentOrders || []
                    });
                }
            } catch (err) {
                console.error("Dashboard Load Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [getAdminStats]);

    const statCards = [
        { title: "Total Revenue", value: `$${stats.totalRevenue}`, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        { title: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
        { title: "Medicines", value: stats.totalMedicines, icon: Package, color: "text-teal-400", bg: "bg-teal-500/10" },
        { title: "Orders", value: stats.totalOrders, icon: ShoppingBag, color: "text-purple-400", bg: "bg-purple-500/10" },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050b18] flex items-center justify-center">
                <Loader2 className="text-teal-500 animate-spin" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050b18] text-white p-6 md:p-12 pt-32">
            <div className="max-w-7xl mx-auto pt-10">
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-teal-400 mb-2 font-black uppercase tracking-[0.4em] text-[10px]"
                    >
                        <TrendingUp size={14} /> System Governance
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">Nexus <span className="text-teal-500">Core.</span></h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statCards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0a192f]/40 border border-white/10 p-8 rounded-[35px] backdrop-blur-xl hover:border-teal-500/30 transition-all group cursor-default"
                        >
                            <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <card.icon size={24} />
                            </div>
                            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">{card.title}</h3>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-black tracking-tighter">{card.value}</span>
                                <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1 mb-1 bg-emerald-500/10 px-2 py-1 rounded-full">
                                    +12% <ArrowUpRight size={12} />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-[#0a192f]/40 border border-white/10 rounded-[40px] p-8 backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black uppercase tracking-tight">Real-time Orders</h2>
                            <button className="text-[10px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors border-b border-teal-500/20 pb-1">View Ledger</button>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-white/10 hover:bg-white/[0.07] transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all">
                                            <ShoppingBag size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold tracking-tight">Transaction #MD-00{item}</p>
                                            <p className="text-[10px] text-gray-500 font-medium italic">Status: Processing</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black">$240.00</p>
                                        <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Confirmed</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-teal-500/10 via-transparent to-purple-500/10 border border-white/10 rounded-[40px] p-8 backdrop-blur-xl">
                            <h2 className="text-xl font-black uppercase tracking-tight mb-8">Operations</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <button className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-teal-400 transition-all shadow-lg shadow-white/5">
                                    Export Analytics
                                </button>
                                <button className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">
                                    Inventory Audit
                                </button>

                                <div className="mt-8 p-6 bg-black/40 rounded-[30px] border border-white/5">
                                    <div className="flex items-center gap-2 text-teal-400 mb-4">
                                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Mainframe Status</span>
                                    </div>
                                    <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                                        Node-01 is currently <span className="text-white font-bold">Optimal</span>. <br />
                                        All services responding at <span className="text-teal-400">14ms</span>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}