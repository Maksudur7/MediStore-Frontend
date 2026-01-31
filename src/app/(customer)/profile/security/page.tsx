"use client";
import { Lock, Save } from "lucide-react";

export default function SecurityPage() {
    return (
        <div className="bg-[#0a192f]/40 border border-white/10 rounded-[40px] p-8 md:p-10 backdrop-blur-xl">
            <h2 className="text-2xl font-black mb-8 uppercase tracking-tight">Security <span className="text-teal-500">Settings</span></h2>
            
            <form className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-teal-500 transition-all font-medium" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">New Password</label>
                        <input type="password" placeholder="Min 8 characters" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-teal-500 transition-all font-medium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Confirm New Password</label>
                        <input type="password" placeholder="Repeat password" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-teal-500 transition-all font-medium" />
                    </div>
                </div>

                <button className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-2xl flex items-center justify-center gap-2 mt-4">
                    <Save size={18}/> Update Password
                </button>
            </form>
        </div>
    );
}