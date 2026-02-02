"use client";
import React, { useState, useEffect, use } from "react";
import {
  ShoppingCart, ShieldCheck, Truck, ArrowLeft, Plus, Minus, Pill, AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/src/lib/auth-context";

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [medicine, setMedicine] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { getMedicinesDettles, addToCart } = useAuth();
  useEffect(() => {
    const fetchMedicine = async () => {
      if (!id || id === "undefined") return;

      try {
        setLoading(true);
        const res = await getMedicinesDettles(id);
        const data = res?.data || res;
        setMedicine(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [id, getMedicinesDettles]);

  const addToCartData = async (id: string, quentity: number) => {
    try {
      await addToCart(id, quentity);
    } catch (err) {
      console.error("Add to Cart Error:", err);
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#050b18] flex items-center justify-center font-black text-teal-500 tracking-widest uppercase">
      Loading Formula...
    </div>
  );

  if (!medicine) return (
    <div className="min-h-screen bg-[#050b18] flex flex-col items-center justify-center text-white">
      <h2 className="font-black text-2xl uppercase italic opacity-20">Data Not Found</h2>
      <Link href="/shop" className="mt-4 text-teal-500 underline text-xs uppercase font-bold tracking-widest">Back to shop</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050b18] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-400 transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Back to Marketplace</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square bg-[#0a192f]/40 border border-white/10 rounded-[60px] flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent" />
            <Pill size={160} className="text-teal-500/20 rotate-45" />
            <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/5 backdrop-blur-md rounded-[40px] border border-white/10">
              <div className="flex items-center gap-4">
                <ShieldCheck className="text-teal-400" size={24} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-teal-400">Authentic Grade</p>
                  <p className="text-xs text-gray-400 font-medium">100% Genuine and Lab Tested</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <span className="px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-[10px] font-black uppercase tracking-widest">
                {medicine.category?.name || "Verified Pharma"}
              </span>
              <h1 className="text-5xl md:text-7xl font-black mt-6 tracking-tighter uppercase italic">{medicine.name}</h1>
              <p className="text-gray-500 mt-4 text-lg font-bold italic">Generic: {medicine.genericName || "Acetaminophen"}</p>
            </div>

            <div className="flex items-end gap-4">
              <p className="text-6xl font-black text-white">${medicine.price}</p>
              <p className="text-gray-600 font-black mb-2 uppercase text-[10px]">/ per unit</p>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm max-w-xl bg-white/5 p-6 rounded-[30px] border border-white/5 italic">
              {medicine.description || "Pharmaceutical grade product, clinically tested and verified for distribution."}
            </p>

            <div className="flex items-center gap-3 py-4 border-y border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">In Stock & Ready to ship</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-[24px] px-8 py-5">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="hover:text-teal-400 transition-colors"><Minus size={20} /></button>
                <span className="text-2xl font-black w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="hover:text-teal-400 transition-colors"><Plus size={20} /></button>
              </div>

              <button
                onClick={() => addToCartData(medicine.id, quantity)}
                className="flex-1 w-full bg-white text-black py-6 rounded-[24px] font-black uppercase tracking-[0.2em] text-xs hover:bg-teal-400 transition-all shadow-2xl flex items-center justify-center gap-3 group active:scale-95">
                <ShoppingCart size={20} />
                Add To Cart
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="p-6 bg-white/5 rounded-[30px] border border-white/5">
                <Truck className="text-teal-400 mb-3" size={20} />
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">Fast Delivery</p>
                <p className="text-[9px] text-gray-500 font-bold uppercase">Within 60 mins</p>
              </div>
              <div className="p-6 bg-white/5 rounded-[30px] border border-white/5">
                <AlertCircle className="text-amber-500 mb-3" size={20} />
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">Prescription</p>
                <p className="text-[9px] text-gray-500 font-bold uppercase">Required for distribution</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}