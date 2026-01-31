"use client";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, LayoutGrid, Search } from "lucide-react";
import { toast } from "react-hot-toast"; // npm i react-hot-toast install kora thakte hobe
import CategoryModal from "@/src/components/CategoryModal";
import { api } from "@/src/lib/api";

export default function AdminCategories() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);

    // Load Categories from Backend
    const loadCategories = async () => {
        try {
            setLoading(true);
            const res = await api.categories.getAll();
            if (res.success) setCategories(res.data);
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadCategories(); }, []);

    // Create or Update Logic
    const handleSave = async (formData: any) => {
        try {
            if (editingCategory) {
                // Backend e update endpoint thakle api.ts e add kore nite hobe
                // await api.categories.update(editingCategory._id, formData);
                toast.success("Category updated!");
            } else {
                // Backend check: baseRequest('/categories', {method: 'POST', body: JSON.stringify(formData)})
                // await api.categories.create(formData);
                toast.success("Category created!");
            }
            setIsModalOpen(false);
            loadCategories();
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#050b18] text-white p-6 md:p-12 pt-32">
            <div className="max-w-6xl mx-auto pt-24">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-teal-400 mb-2 font-bold uppercase tracking-[0.3em] text-[10px]">
                            <LayoutGrid size={14} /> Admin Control
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">MANAGE <span className="text-teal-500">CATEGORIES.</span></h1>
                    </div>
                    <button onClick={() => { setEditingCategory(null); setIsModalOpen(true); }}
                        className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-black hover:bg-teal-400 transition-all shadow-xl uppercase text-xs">
                        <Plus size={18} /> New Category
                    </button>
                </div>

                {/* Table View */}
                <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">
                                <th className="px-10 py-6">Category ID</th>
                                <th className="px-10 py-6">Category Name</th>
                                <th className="px-10 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={3} className="px-10 py-20 text-center text-gray-500 animate-pulse font-bold tracking-widest uppercase">Fetching Data...</td></tr>
                            ) : categories.map((cat) => (
                                <tr key={cat._id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-10 py-6 text-xs font-mono text-gray-500">#{cat._id.slice(-6)}</td>
                                    <td className="px-10 py-6 font-bold text-lg">{cat.name}</td>
                                    <td className="px-10 py-6 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setEditingCategory(cat); setIsModalOpen(true); }}
                                                className="p-3 bg-white/5 border border-white/10 rounded-xl hover:text-teal-400 transition-all"><Edit2 size={16} /></button>
                                            <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingCategory}
            />
        </div>
    );
}