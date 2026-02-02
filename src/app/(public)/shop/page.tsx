"use client";
import { useState, useEffect } from "react";
import {
    Search,
    ShoppingCart,
    LayoutGrid,
    List,
    Pill,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/src/lib/auth-context";
import Link from "next/link";

export default function ShopPage() {
    const { getMedicines, getAllCategories } = useAuth(); 

    const [medicines, setMedicines] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [medRes, catRes] = await Promise.all([
                    getMedicines(),
                    getAllCategories()
                ]);

                const medData = medRes?.data || medRes || [];
                const catData = catRes?.data || catRes || [];

                setMedicines(medData);
                setCategories(catData);
            } catch (err) {
                console.error("Shop Data Load Error via useAuth", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [getMedicines, getAllCategories]);

    const filteredMeds = medicines.filter(med => {
        const matchesCategory = selectedCategory === "All" ||
            med.category?.name === selectedCategory ||
            med.categoryId === selectedCategory; 
        const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    console.log('filter Meds', filteredMeds);

    return (
        <div className="min-h-screen bg-[#050b18] text-white pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                    <div className="max-w-xl">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase italic">
                            Digital <span className="text-teal-400">Pharmacy.</span>
                        </h1>
                        <p className="text-gray-500 font-medium uppercase text-[10px] tracking-widest">
                            Browse thousands of genuine medicines from verified sellers.
                        </p>
                    </div>

                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search medicine name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 outline-none focus:border-teal-500/50 transition-all text-sm font-bold shadow-2xl"
                        />
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-12">

                    <aside className="lg:col-span-1 space-y-10">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400 mb-6 italic">Classification</h3>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => setSelectedCategory("All")}
                                    className={`text-left px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${selectedCategory === "All" ? 'bg-teal-500 text-black shadow-[0_10px_20px_rgba(20,184,166,0.2)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                >
                                    All Medicines
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id || cat._id}
                                        onClick={() => setSelectedCategory(cat.name)}
                                        className={`text-left px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${selectedCategory === cat.name ? 'bg-teal-500 text-black shadow-[0_10px_20px_rgba(20,184,166,0.2)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-[40px] bg-gradient-to-br from-teal-500/10 to-transparent border border-white/10 relative overflow-hidden group">
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-teal-500/10 blur-3xl group-hover:bg-teal-500/20 transition-all" />
                            <Pill className="text-teal-400 mb-4" size={32} />
                            <h4 className="font-black text-lg mb-2 leading-tight uppercase italic tracking-tighter">Need help with prescription?</h4>
                            <p className="text-[10px] text-gray-500 mb-6 uppercase font-bold tracking-wider">Our pharmacists are available 24/7 for you.</p>
                            <button className="text-[9px] font-black uppercase tracking-widest bg-white text-black px-6 py-4 rounded-xl hover:bg-teal-400 transition-all active:scale-95 shadow-xl">Contact Us</button>
                        </div>
                    </aside>

                    <main className="lg:col-span-3">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-80 bg-white/5 animate-pulse rounded-[40px] border border-white/5 flex items-center justify-center">
                                        <Loader2 className="text-teal-500/20 animate-spin" size={30} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-8 px-2">
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 italic">Showing {filteredMeds.length} Active Strains</p>
                                    <div className="flex gap-2 text-gray-500">
                                        <LayoutGrid size={18} className="text-teal-400 cursor-pointer" />
                                        <List size={18} className="cursor-pointer hover:text-white" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                    <AnimatePresence mode="popLayout">
                                        {filteredMeds.map((med) => (
                                            <Link href={`/shop/${med.id}`} key={med.id}>
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    key={med.id}
                                                    className="bg-[#0a192f]/40 border border-white/10 rounded-[45px] p-8 hover:border-teal-500/40 transition-all group relative overflow-hidden backdrop-blur-xl"
                                                >
                                                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all" />

                                                    <div className="mb-6 flex justify-between items-start">
                                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-teal-400 shadow-inner">
                                                            {med.category?.name || "Medicine"}
                                                        </span>
                                                        <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{med.manufacturer || "Generic"}</p>
                                                    </div>

                                                    <h3 className="text-2xl font-black mb-2 tracking-tighter group-hover:text-teal-400 transition-colors uppercase italic leading-none">{med.name}</h3>
                                                    <p className="text-gray-500 text-[11px] font-medium mb-8 line-clamp-2 leading-relaxed">{med.description || "Pharmaceutical grade product verified for distribution."}</p>

                                                    <div className="flex items-center justify-between mt-auto">
                                                        <div>
                                                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1">Price Unit</p>
                                                            <p className="text-2xl font-black text-white tracking-tighter">${med.price}</p>
                                                        </div>
                                                        <button className="bg-white text-black p-4 rounded-2xl hover:bg-teal-400 transition-all shadow-2xl active:scale-90 hover:shadow-teal-500/20 group-hover:rotate-[-5deg]">
                                                            <ShoppingCart size={20} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {filteredMeds.length === 0 && (
                                    <div className="text-center py-32 bg-white/5 rounded-[45px] border border-dashed border-white/10">
                                        <Search size={40} className="mx-auto text-gray-800 mb-4 opacity-50" />
                                        <h3 className="text-xs font-black text-gray-600 uppercase tracking-[0.4em]">No Inventory Matches</h3>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}