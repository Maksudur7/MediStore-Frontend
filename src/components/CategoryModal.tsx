"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { toast } from "react-hot-toast";

export default function CategoryModal({ isOpen, onClose, onSave, initialData }: any) {
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { postACategory, updateACategory } = useAuth();
    useEffect(() => {
        if (initialData) setName(initialData.name);
        else setName("");
    }, [initialData, isOpen]);

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast.error("Category name is required!");
            return;
        }

        setIsSubmitting(true);
        try {
            let res;
            if (initialData) {
                res = await updateACategory(initialData.id, { name });
            } else {
                res = await postACategory({ name });
            }
            if (res) {
                toast.success(initialData ? "Category updated!" : "Category created!");
                onSave(); 
                onClose(); 
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#0a192f] border border-white/10 p-8 rounded-[32px] w-full max-w-md relative shadow-2xl"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-teal-400">
                    {initialData ? 'Update' : 'Add New'} Category
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                            Category Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 mt-2 outline-none focus:border-teal-500 transition-all text-white disabled:opacity-50"
                            placeholder="e.g. Fever & Pain"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-teal-500 hover:bg-teal-400 disabled:bg-gray-700 text-[#050b18] font-black py-4 rounded-2xl transition-all shadow-lg shadow-teal-500/20 uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            initialData ? 'Save Changes' : 'Create Category'
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}