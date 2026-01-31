"use client";
import { useState } from "react";
import {
  CreditCard,
  MapPin,
  Truck,
  Lock,
  ChevronRight,
  Info,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const [step, setStep] = useState(1); // ১: অ্যাড্রেস, ২: পেমেন্ট

  return (
    <div className="min-h-screen bg-[#050b18] text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* --- PROGRESS BAR --- */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-teal-400' : 'text-gray-600'}`}>
            <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-black text-xs ${step >= 1 ? 'border-teal-400 bg-teal-400/10' : 'border-gray-800'}`}>1</span>
            <span className="text-[10px] uppercase font-black tracking-widest hidden sm:block">Shipping</span>
          </div>
          <div className="w-12 h-px bg-white/10" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-teal-400' : 'text-gray-600'}`}>
            <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-black text-xs ${step >= 2 ? 'border-teal-400 bg-teal-400/10' : 'border-gray-800'}`}>2</span>
            <span className="text-[10px] uppercase font-black tracking-widest hidden sm:block">Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-16">

          {/* --- LEFT: FORMS --- */}
          <div className="lg:col-span-3 space-y-12">
            {step === 1 ? (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="flex items-center gap-3">
                  <MapPin className="text-teal-400" />
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Shipping <span className="text-teal-400">Details.</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 mt-2 outline-none focus:border-teal-500 transition-all font-medium" placeholder="Enter your name" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Street Address</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 mt-2 outline-none focus:border-teal-500 transition-all font-medium" placeholder="House no, Street name" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-500 ml-1">City</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 mt-2 outline-none focus:border-teal-500 transition-all font-medium" placeholder="e.g. Dhaka" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Phone Number</label>
                    <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 mt-2 outline-none focus:border-teal-500 transition-all font-medium" placeholder="+880" />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-2xl flex items-center justify-center gap-2">
                  Continue to Payment <ChevronRight size={18} />
                </button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-teal-400" />
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Payment <span className="text-teal-400">Method.</span></h2>
                </div>

                <div className="space-y-4">
                  {['Cash on Delivery', 'bKash / Nagad', 'Online Payment'].map((method) => (
                    <label key={method} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-[28px] cursor-pointer hover:border-teal-500/50 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-teal-500">
                          <div className="w-3 h-3 bg-teal-500 rounded-full opacity-0 group-active:opacity-100" />
                        </div>
                        <span className="font-bold uppercase tracking-widest text-xs">{method}</span>
                      </div>
                      <CheckCircle2 size={20} className="text-gray-800 group-hover:text-teal-500/20" />
                      <input type="radio" name="payment" className="hidden" />
                    </label>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 bg-white/5 border border-white/10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all">Back</button>
                  <button className="flex-[2] bg-teal-500 text-[#050b18] py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20">Confirm Order</button>
                </div>
              </motion.div>
            )}
          </div>

          {/* --- RIGHT: ORDER SUMMARY --- */}
          <div className="lg:col-span-2">
            <div className="bg-[#0a192f]/40 border border-white/10 rounded-[45px] p-8 backdrop-blur-xl">
              <h3 className="text-xl font-black uppercase tracking-tight mb-8">Order Summary</h3>

              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xs font-bold italic">x2</div>
                    <span className="text-sm font-bold text-gray-300">Napa Extend 500mg</span>
                  </div>
                  <span className="font-black">$30.00</span>
                </div>
                <div className="flex justify-between items-center text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span>$30.00</span>
                </div>
                <div className="flex justify-between items-center text-gray-400 text-sm">
                  <span>Shipping</span>
                  <span className="text-teal-400">FREE</span>
                </div>
                <div className="h-px bg-white/5 my-6" />
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black uppercase text-gray-500">Total</span>
                  <span className="text-4xl font-black text-white">$30.00</span>
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-teal-400">
                  <Lock size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed font-medium">Your personal data will be used to process your order and support your experience throughout this website.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}