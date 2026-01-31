"use client";
import { motion } from "framer-motion";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";

export default function SellerDashboard() {
    const stats = [
        { label: "Total Sales", value: "$4,250", icon: DollarSign, color: "text-emerald-400" },
        { label: "Total Medicines", value: "24", icon: Package, color: "text-teal-400" },
        { label: "New Orders", value: "08", icon: ShoppingCart, color: "text-blue-400" },
        { label: "Profit Rate", value: "+18%", icon: TrendingUp, color: "text-purple-400" },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-12">
                <p className="text-[10px] font-black text-teal-500 uppercase tracking-[0.4em] mb-2">Business Insight</p>
                <h1 className="text-5xl font-black tracking-tighter">WELCOME BACK, <span className="text-white/20 font-outline">SELLER.</span></h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i}
                        className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:border-white/20 transition-all group">
                        <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${s.color} group-hover:scale-110 transition-transform`}>
                            <s.icon size={24} />
                        </div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{s.label}</p>
                        <p className="text-3xl font-black">{s.value}</p>
                    </motion.div>
                ))}
            </div>
            
            {/* Recent Orders Placeholder */}
            <div className="mt-12 bg-white/5 border border-white/10 rounded-[50px] p-10 h-64 flex flex-col items-center justify-center border-dashed">
                <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">Sales Graph Coming Soon</p>
            </div>
        </div>
    );
}