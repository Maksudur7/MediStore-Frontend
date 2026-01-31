"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function CategoryModal({ isOpen, onClose, onSave, initialData }: any) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (initialData) setName(initialData.name);
        else setName("");
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-[#0a192f] border border-white/10 p-8 rounded-[32px] w-full max-w-md relative shadow-2xl">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X size={20} /></button>
                <h2 className="text-2xl font-bold mb-6 text-teal-400">{initialData ? 'Update' : 'Add New'} Category</h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Category Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 mt-2 outline-none focus:border-teal-500 transition-all text-white"
                            placeholder="e.g. Fever & Pain" />
                    </div>
                    <button onClick={() => onSave({ name })}
                        className="w-full bg-teal-500 hover:bg-teal-400 text-[#050b18] font-black py-4 rounded-2xl transition-all shadow-lg shadow-teal-500/20 uppercase tracking-widest">
                        {initialData ? 'Save Changes' : 'Create Category'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}