"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
    DollarSign,
    Package,
    ShoppingCart,
    TrendingUp,
    ArrowRight,
    Loader2,
    Calendar,
    AlertCircle
} from "lucide-react";
import { useAuth } from "@/src/lib/auth-context";
import AddMedicineModal from "@/src/components/ddMedicineModal";

export default function SellerDashboard() {
    const { getSellerStats, user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState({
        totalSales: 0,
        totalMedicines: 0,
        newOrders: 0,
        profitRate: 0,
        recentOrders: []
    });

    const fetchStats = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getSellerStats();
            console.log(res);
            if (res) {
                setData({
                    totalSales: Number(res.totalSales) || 0,
                    totalMedicines: Number(res.totalMedicines) || 0,
                    newOrders: Number(res.newOrders) || 0,
                    profitRate: Number(res.profitRate) || 0,
                    recentOrders: Array.isArray(res.recentOrders) ? res.recentOrders : []
                });
            }
        } catch (err) {
            console.error("Seller Stats Error:", err);
            setError("Failed to synchronize with mainframe.");
        } finally {
            setLoading(false);
        }
    }, [getSellerStats]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const statsCards = useMemo(() => [
        {
            label: "Total Revenue",
            value: `$${data.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: DollarSign,
            color: "text-emerald-400",
            sub: "Gross Earnings"
        },
        {
            label: "Inventory Size",
            value: data.totalMedicines,
            icon: Package,
            color: "text-teal-400",
            sub: "Live Products"
        },
        {
            label: "Pending Orders",
            value: data.newOrders,
            icon: ShoppingCart,
            color: "text-blue-400",
            sub: "Await processing"
        },
        {
            label: "Net Profit",
            value: `${data.profitRate > 0 ? '+' : ''}${data.profitRate}%`,
            icon: TrendingUp,
            color: "text-purple-400",
            sub: "Growth margin"
        },
    ], [data]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050b18] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="text-teal-500 animate-spin mx-auto mb-4" size={40} />
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Accessing Secure Node...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050b18] text-white p-6 md:p-12 selection:bg-teal-500/30">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 pt-24">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <p className="text-[10px] font-black text-teal-500 uppercase tracking-[0.4em] mb-2 italic">Commercial Analytics</p>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                                {user?.name ? user.name.split(' ')[0] : 'VITAL'} <span className="text-teal-500">TRADING.</span>
                            </h1>
                        </div>

                        <AddMedicineModal onRefresh={fetchStats} />
                    </div>
                    {error && (
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-xs font-bold uppercase tracking-tighter">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statsCards.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0a192f]/40 border border-white/10 p-8 rounded-[40px] hover:border-teal-500/30 transition-all group backdrop-blur-xl relative overflow-hidden"
                        >
                            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${s.color} group-hover:scale-110 transition-transform`}>
                                <s.icon size={24} />
                            </div>
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{s.label}</p>
                            <p className="text-4xl font-black tracking-tighter mb-1">{s.value}</p>
                            <p className="text-[9px] font-bold text-gray-600 uppercase">{s.sub}</p>

                            <div className={`absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full bg-current ${s.color}`} />
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-[#0a192f]/40 border border-white/10 rounded-[50px] p-10 backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-xl font-black uppercase tracking-tight">Incoming Requests</h2>
                            <button className="text-[10px] font-black text-teal-400 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all border-b border-teal-500/20 pb-1">
                                View Ledger <ArrowRight size={14} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {data.recentOrders.length > 0 ? (
                                data.recentOrders.map((order: any) => (
                                    <div key={order.id} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/[0.08] transition-all group">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all">
                                                <ShoppingCart size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm tracking-tight text-white/90">Order #{order.id.slice(-6).toUpperCase()}</p>
                                                <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                                                    <Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black tracking-tight text-emerald-400">${Number(order.totalAmount).toFixed(2)}</p>
                                            <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${order.status === 'PAID' || order.status === 'DELIVERED'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[40px] bg-white/[0.02]">
                                    <p className="text-gray-600 font-black text-[10px] uppercase tracking-[0.3em]">No Active Transactions</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-teal-500/10 via-[#0a192f]/40 to-transparent border border-white/10 rounded-[50px] p-10 backdrop-blur-xl h-fit">
                            <h3 className="text-lg font-black uppercase tracking-tight mb-8 text-teal-400">Inventory Status</h3>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between text-[10px] font-black uppercase mb-3">
                                        <span className="text-gray-400 tracking-widest">Stock Health</span>
                                        <span className="text-teal-400">{data.totalMedicines > 0 ? '82%' : '0%'}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: data.totalMedicines > 0 ? "82%" : "0%" }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="h-full bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)]"
                                        />
                                    </div>
                                </div>
                                <div className="p-6 bg-black/20 rounded-[30px] border border-white/5">
                                    <p className="text-[11px] text-gray-400 leading-relaxed font-medium italic">
                                        Mainframe reports <span className="text-white font-bold">optimal</span> levels. <br />
                                        {data.totalMedicines} total SKUs synced to your terminal.
                                    </p>
                                </div>
                                <button className="w-full py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 hover:border-white/20 transition-all text-teal-500">
                                    Audit Inventory
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}