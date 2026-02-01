"use client";
import { useState, useEffect } from "react";
import { X, Save, Loader2, Database, Package, Info } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "../lib/auth-context";

export default function AddMedicineModal({ onRefresh }: { onRefresh: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const { postMedicine, getAllCategories } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        manufacturer: "",
        categoryId: "",
    });

    useEffect(() => {
        if (isOpen) {
            const fetchCategories = async () => {
                try {
                    const res = await getAllCategories();
                    console.log(res);
                    if (res) {
                        setCategories(res);
                    }
                } catch (err) {
                    console.error("Category load failed");
                }
            };
            fetchCategories();
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.categoryId) {
            return toast.error("Please select a valid Category!");
        }

        setLoading(true);
        try {
            const cleanPayload = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: parseFloat(formData.price), 
                stockQuantity: parseInt(formData.stockQuantity), 
                categoryId: formData.categoryId,
                manufacturer: formData.manufacturer || "Unknown",
            };

            const res = await postMedicine(cleanPayload);

            if (res) {
                toast.success("MEDICINE ADDED TO INVENTORY");
                setFormData({ name: "", description: "", price: "", stockQuantity: "", manufacturer: "", categoryId: "" });
                setIsOpen(false);
                onRefresh(); 
            }
        } catch (err: any) {
            const errMsg = err.response?.data?.details || "Constraint Violation: Check Category/Seller";
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-teal-500 text-black px-6 py-3 rounded-xl font-black uppercase text-[11px] tracking-wider hover:bg-teal-400 transition-all flex items-center gap-2"
            >
                <Database size={16} /> Add New Medicine
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-[#050b18]/90 backdrop-blur-md">
                    <div className="bg-[#0a192f] border border-white/10 p-8 rounded-[30px] w-full max-w-xl shadow-2xl relative">

                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-tighter text-teal-500 flex items-center gap-2">
                                    <Package size={22} /> Medicine <span className="text-white">Entry.</span>
                                </h2>
                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Fill all mandatory prisma fields</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-500"><X /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-[9px] font-black uppercase text-gray-500 ml-1 mb-2 block">Nomenclature</label>
                                <input required placeholder="e.g. Napa Extra" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-teal-500 transition-all"
                                    onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[9px] font-black uppercase text-gray-500 ml-1 mb-2 block">Price ($)</label>
                                    <input required type="number" step="0.01" placeholder="0.00" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-teal-500"
                                        onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase text-gray-500 ml-1 mb-2 block">Quantity</label>
                                    <input required type="number" placeholder="0" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-teal-500"
                                        onChange={e => setFormData({ ...formData, stockQuantity: e.target.value })} />
                                </div>
                            </div>

                            <div>
                                <label className="text-[9px] font-black uppercase text-gray-500 ml-1 mb-2 block">Classification</label>
                                <select
                                    required
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-teal-500 appearance-none cursor-pointer"
                                    onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                                    value={formData.categoryId}
                                >
                                    <option value="" className="bg-[#0a192f]">-- Select Category --</option>
                                    {categories.map((cat: any) => (
                                        <option key={cat.id} value={cat.id} className="bg-[#0a192f]">{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-[9px] font-black uppercase text-gray-500 ml-1 mb-2 block">Manufacturer</label>
                                <input placeholder="Square Pharma Ltd." className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-teal-500"
                                    onChange={e => setFormData({ ...formData, manufacturer: e.target.value })} />
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-4 border border-white/10 rounded-2xl font-black uppercase text-[10px] text-gray-400 hover:bg-white/5 transition-all">Abort</button>
                                <button type="submit" disabled={loading} className="flex-1 py-4 bg-teal-500 text-black rounded-2xl font-black uppercase text-[10px] flex justify-center items-center gap-2 hover:bg-teal-400 disabled:opacity-50">
                                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save Medicine
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}