"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom"; // Portal import kora hoyeche
import { X, Save, Loader2, Edit3, Package } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "../lib/auth-context";

export default function EditMedicineModal({ medicine, onRefresh }: { medicine: any, onRefresh: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false); // Client-side check er jonno
    const [loading, setLoading] = useState(false);
    const { updateMedicines } = useAuth();

    const [formData, setFormData] = useState({
        name: medicine.name,
        description: medicine.description || "",
        price: medicine.price.toString(),
        stockQuantity: medicine.stockQuantity.toString(),
        manufacturer: medicine.manufacturer || "",
        categoryId: medicine.categoryId,
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                stockQuantity: parseInt(formData.stockQuantity)
            };

            const res = await updateMedicines(medicine.id, payload);
            if (res) {
                toast.success("DATABASE RECORD UPDATED");
                setIsOpen(false);
                onRefresh();
            }
        } catch (err: any) {
            toast.error("Update Failed");
        } finally {
            setLoading(false);
        }
    };

    const modalContent = (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <div 
                className="absolute inset-0 bg-[#050b18]/95 backdrop-blur-2xl" 
                onClick={() => setIsOpen(false)} 
            />

            <div className="bg-[#0a192f] border border-white/10 p-8 rounded-[40px] w-full max-w-xl shadow-[0_0_100px_rgba(0,0,0,0.9)] relative z-50 overflow-hidden text-left">
                
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 blur-[100px] rounded-full" />

                <div className="flex justify-between items-center mb-8 relative z-10">
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tighter text-teal-500 flex items-center gap-2 italic">
                            <Package size={22} /> Edit <span className="text-white">Record.</span>
                        </h2>
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">ID: #{medicine.id.slice(-8).toUpperCase()}</p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div>
                        <label className="text-[9px] font-black uppercase text-gray-500 ml-1 mb-2 block">Nomenclature</label>
                        <input
                            required
                            value={formData.name}
                            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-teal-500"
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[9px] font-black uppercase text-gray-500 ml-1 mb-2 block">Price ($)</label>
                            <input
                                required type="number" step="0.01"
                                value={formData.price}
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-teal-500"
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-[9px] font-black uppercase text-gray-500 ml-1 mb-2 block">Stock</label>
                            <input
                                required type="number"
                                value={formData.stockQuantity}
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-teal-500"
                                onChange={e => setFormData({ ...formData, stockQuantity: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 py-4 border border-white/10 rounded-2xl font-black uppercase text-[10px] text-gray-400 hover:bg-white/5 transition-all"
                        >
                            Abort
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-4 bg-teal-500 text-black rounded-2xl font-black uppercase text-[10px] flex justify-center items-center gap-2 hover:bg-teal-400 disabled:opacity-50 transition-all shadow-[0_10px_20px_rgba(20,184,166,0.2)]"
                        >
                            {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="p-3 bg-white/5 rounded-xl hover:text-teal-400 transition-all border border-transparent hover:border-teal-500/20"
            >
                <Edit3 size={16} />
            </button>

            {isOpen && mounted && createPortal(modalContent, document.body)}
        </>
    );
}