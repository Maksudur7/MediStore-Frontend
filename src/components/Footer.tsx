"use client";
import { Pill, Mail, Phone, MapPin, Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="pt-24 pb-12 border-t border-white/10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="col-span-1 md:col-span-1 space-y-6">
                    <div className="flex items-center gap-2 font-bold text-2xl text-teal-400">
                        <Pill /> MediStore
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Redefining how you access healthcare. Trustworthy, fast, and always at your service.
                    </p>
                    <div className="flex gap-4">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-teal-500 hover:text-black transition-all cursor-pointer"><Facebook size={18} /></div>
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-teal-500 hover:text-black transition-all cursor-pointer"><Instagram size={18} /></div>
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-teal-500 hover:text-black transition-all cursor-pointer"><Twitter size={18} /></div>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-8 text-white">Company</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                        <li className="hover:text-teal-400 cursor-pointer transition-all">About Us</li>
                        <li className="hover:text-teal-400 cursor-pointer transition-all">Careers</li>
                        <li className="hover:text-teal-400 cursor-pointer transition-all">Blog</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-8 text-white">Contact</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                        <li className="flex items-center gap-3"><Mail size={16} className="text-teal-400" /> support@medistore.com</li>
                        <li className="flex items-center gap-3"><Phone size={16} className="text-teal-400" /> +880 123 456 789</li>
                        <li className="flex items-center gap-3 leading-relaxed"><MapPin size={16} className="text-teal-400" /> 123 Health St, Dhaka</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-8 text-white">Newsletter</h4>
                    <p className="text-sm text-gray-500 mb-6">Stay updated on latest health tips.</p>
                    <div className="flex bg-white/5 p-2 rounded-2xl border border-white/10">
                        <input type="text" placeholder="Your Email" className="bg-transparent px-4 text-xs outline-none w-full text-white" />
                        <button className="bg-teal-500 p-3 rounded-xl hover:bg-teal-400 transition-all"><ArrowRight size={18} className="text-[#050b18]" /></button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-gray-600 text-xs font-medium uppercase tracking-widest italic">© 2026 MediStore. Pure Quality.</p>
                <div className="flex gap-8 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                    <span>Terms</span> <span>Privacy</span> <span>Cookies</span>
                </div>
            </div>
        </footer>
    );
}