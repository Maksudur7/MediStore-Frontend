"use client";
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Plus,
  Minus,
  Pill,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { api } from "@/src/lib/api";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const [medicine, setMedicine] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        // api.ts এ getOne method টি থাকতে হবে
        const res = await api.medicines.getAll(); // আপাতত getAll থেকে ফিল্টার করছি
        const found = res.data.find((m: any) => m._id === params.id);
        setMedicine(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicine();
  }, [params.id]);

  if (loading) return <div className="min-h-screen bg-[#050b18] pt-40 text-center animate-pulse font-black text-teal-500">LOADING PRODUCT...</div>;
  if (!medicine) return <div className="min-h-screen bg-[#050b18] pt-40 text-center text-white font-black">PRODUCT NOT FOUND.</div>;

  return (
    <div className="min-h-screen bg-[#050b18] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-400 transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Shop</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* --- LEFT: PRODUCT VISUAL --- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square bg-[#0a192f]/40 border border-white/10 rounded-[60px] flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent" />
            <Pill size={160} className="text-teal-500/20 rotate-45" />
            <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/5 backdrop-blur-md rounded-[40px] border border-white/10">
              <div className="flex items-center gap-4">
                <ShieldCheck className="text-teal-400" size={24} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-teal-400">Verified Medicine</p>
                  <p className="text-xs text-gray-400">100% Genuine and Lab Tested</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT: PRODUCT INFO --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <span className="px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-[10px] font-black uppercase tracking-widest">
                {medicine.category?.name || "General"}
              </span>
              <h1 className="text-5xl md:text-6xl font-black mt-6 tracking-tighter uppercase">{medicine.name}</h1>
              <p className="text-gray-500 mt-4 text-lg font-medium italic">Generic: {medicine.genericName || "Acetaminophen"}</p>
            </div>

            <div className="flex items-end gap-4">
              <p className="text-5xl font-black text-white">${medicine.price}</p>
              <p className="text-gray-600 font-bold mb-2">/ per unit</p>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm max-w-xl">
              {medicine.description || "Detailed information about this medicine. It is used to treat various conditions. Always consult a doctor before use."}
            </p>

            {/* Inventory Status */}
            <div className="flex items-center gap-3 py-4 border-y border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">In Stock & Ready to ship</span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-[24px] px-6 py-4">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="hover:text-teal-400 transition-colors"><Minus size={20} /></button>
                <span className="text-xl font-black w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="hover:text-teal-400 transition-colors"><Plus size={20} /></button>
              </div>

              <button className="flex-1 w-full bg-white text-black py-5 rounded-[24px] font-black uppercase tracking-[0.2em] text-xs hover:bg-teal-400 transition-all shadow-2xl flex items-center justify-center gap-3 group">
                <ShoppingCart size={20} />
                Add To Cart
              </button>
            </div>

            {/* Extra Features */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="p-6 bg-white/5 rounded-[30px] border border-white/5">
                <Truck className="text-teal-400 mb-3" size={20} />
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">Fast Delivery</p>
                <p className="text-[9px] text-gray-500">Within 60 mins in city area</p>
              </div>
              <div className="p-6 bg-white/5 rounded-[30px] border border-white/5">
                <AlertCircle className="text-teal-400 mb-3" size={20} />
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">Prescription</p>
                <p className="text-[9px] text-gray-500">Required for certain drugs</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}