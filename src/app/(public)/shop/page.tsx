"use client";
import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  ChevronRight, 
  LayoutGrid, 
  List,
  Pill
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/src/lib/api";

export default function ShopPage() {
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
                    api.medicines.getAll(),
                    api.categories.getAll()
                ]);
                if (medRes.success) setMedicines(medRes.data);
                if (catRes.success) setCategories(catRes.data);
            } catch (err) {
                console.error("Shop Data Load Error", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Filter Logic
    const filteredMeds = medicines.filter(med => {
        const matchesCategory = selectedCategory === "All" || med.category?.name === selectedCategory;
        const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#050b18] text-white pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                
                {/* --- TOP BAR (Search & Title) --- */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                    <div className="max-w-xl">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase">
                            Digital <span className="text-teal-400 font-outline">Pharmacy.</span>
                        </h1>
                        <p className="text-gray-500 font-medium">Browse thousands of genuine medicines from verified sellers.</p>
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
                    
                    {/* --- SIDEBAR (Categories) --- */}
                    <aside className="lg:col-span-1 space-y-10">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400 mb-6">Categories</h3>
                            <div className="flex flex-col gap-2">
                                <button 
                                    onClick={() => setSelectedCategory("All")}
                                    className={`text-left px-6 py-4 rounded-2xl font-bold text-sm transition-all ${selectedCategory === "All" ? 'bg-teal-500 text-[#050b18]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                >
                                    All Medicines
                                </button>
                                {categories.map((cat) => (
                                    <button 
                                        key={cat._id}
                                        onClick={() => setSelectedCategory(cat.name)}
                                        className={`text-left px-6 py-4 rounded-2xl font-bold text-sm transition-all ${selectedCategory === cat.name ? 'bg-teal-500 text-[#050b18]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Info Card */}
                        <div className="p-8 rounded-[40px] bg-gradient-to-br from-teal-500/20 to-transparent border border-white/10">
                            <Pill className="text-teal-400 mb-4" size={32} />
                            <h4 className="font-bold text-lg mb-2 leading-tight">Need help with prescription?</h4>
                            <p className="text-xs text-gray-500 mb-6">Our pharmacists are available 24/7.</p>
                            <button className="text-[10px] font-black uppercase tracking-widest bg-white text-black px-6 py-3 rounded-xl">Contact Us</button>
                        </div>
                    </aside>

                    {/* --- MEDICINE GRID --- */}
                    <main className="lg:col-span-3">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-80 bg-white/5 animate-pulse rounded-[40px]" />
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-8 px-2">
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-600">Showing {filteredMeds.length} Results</p>
                                    <div className="flex gap-2 text-gray-500">
                                        <LayoutGrid size={18} className="text-teal-400 cursor-pointer" />
                                        <List size={18} className="cursor-pointer hover:text-white" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                    <AnimatePresence mode="popLayout">
                                        {filteredMeds.map((med) => (
                                            <motion.div 
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                key={med._id}
                                                className="bg-[#0a192f]/40 border border-white/10 rounded-[45px] p-8 hover:border-teal-500/50 transition-all group relative overflow-hidden"
                                            >
                                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all" />
                                                
                                                <div className="mb-6">
                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-teal-400">
                                                        {med.category?.name || "Medicine"}
                                                    </span>
                                                </div>

                                                <h3 className="text-2xl font-black mb-2 tracking-tighter group-hover:text-teal-400 transition-colors">{med.name}</h3>
                                                <p className="text-gray-500 text-xs font-medium mb-6 line-clamp-2">{med.description || "No description available for this medicine."}</p>
                                                
                                                <div className="flex items-center justify-between mt-auto">
                                                    <div>
                                                        <p className="text-[10px] text-gray-600 font-bold uppercase">Price</p>
                                                        <p className="text-2xl font-black text-white">${med.price}</p>
                                                    </div>
                                                    <button className="bg-white text-black p-4 rounded-2xl hover:bg-teal-400 transition-all shadow-xl active:scale-90">
                                                        <ShoppingCart size={20} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {filteredMeds.length === 0 && (
                                    <div className="text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
                                        <Search size={40} className="mx-auto text-gray-700 mb-4" />
                                        <h3 className="text-xl font-bold text-gray-500 uppercase tracking-widest">No Medicines Found</h3>
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