"use client";
import { useState } from "react";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CartPage() {
  // টেস্ট করার জন্য ডামি ডাটা, পরে আপনি আপনার Context বা Redux থেকে নিবেন
  const [cartItems, setCartItems] = useState([
    { _id: "1", name: "Napa Extend", price: 15.00, quantity: 2, category: "Fever" },
    { _id: "2", name: "Azithromycin 500", price: 120.50, quantity: 1, category: "Antibiotic" },
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 45; // ৫০০ টাকার উপরে ফ্রি ডেলিভারি লজিক
  const total = subtotal + shipping;

  const updateQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item =>
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* --- HEADER --- */}
        <div className="mb-12">
          <div className="flex items-center gap-3 text-teal-400 mb-2 font-black uppercase tracking-[0.4em] text-[10px]">
            <ShoppingBag size={14} /> Checkout Process
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic">YOUR <span className="text-teal-400 font-outline not-italic">CART.</span></h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-12">

            {/* --- CART ITEMS (Left) --- */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    key={item._id}
                    className="bg-[#0a192f]/40 border border-white/5 rounded-[35px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 group hover:border-white/20 transition-all"
                  >
                    <div className="w-20 h-20 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400">
                      <ShoppingBag size={32} />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-teal-500 mb-1">{item.category}</p>
                      <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                      <p className="text-gray-500 text-sm font-medium">${item.price} / unit</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-2 border border-white/5">
                      <button onClick={() => updateQty(item._id, -1)} className="p-2 hover:text-teal-400 transition-colors"><Minus size={16} /></button>
                      <span className="w-8 text-center font-black">{item.quantity}</span>
                      <button onClick={() => updateQty(item._id, 1)} className="p-2 hover:text-teal-400 transition-colors"><Plus size={16} /></button>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <p className="text-xl font-black">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="p-4 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* --- ORDER SUMMARY (Right) --- */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-[45px] p-10 sticky top-32">
                <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">Summary</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Shipping</span>
                    <span className="text-white">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="h-px bg-white/10 my-4" />
                  <div className="flex justify-between items-end">
                    <span className="text-gray-400 font-bold uppercase text-xs">Total Amount</span>
                    <span className="text-4xl font-black text-teal-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-teal-500 hover:bg-teal-400 text-[#050b18] py-5 rounded-[24px] font-black uppercase tracking-widest transition-all shadow-xl shadow-teal-500/20 flex items-center justify-center gap-3 group">
                  Proceed to Pay <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-3 text-gray-500">
                    <ShieldCheck size={18} className="text-teal-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payment SSL</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <Truck size={18} className="text-teal-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Fast Delivery (60 mins)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* EMPTY CART */
          <div className="text-center py-32 bg-white/[0.02] border border-dashed border-white/10 rounded-[60px]">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={40} className="text-gray-700" />
            </div>
            <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Your cart is empty.</h2>
            <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium">Add some medicines to your cart and they will appear here for checkout.</p>
            <Link href="/shop" className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-xs hover:bg-teal-400 transition-all shadow-2xl">
              Return to Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}