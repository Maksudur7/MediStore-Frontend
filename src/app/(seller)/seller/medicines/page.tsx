"use client";
import { Plus, Edit3, Trash2, Search } from "lucide-react";

export default function SellerInventory() {
  return (
    <div className="max-w-6xl mx-auto pt-32">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-2">MY <span className="text-teal-500">INVENTORY.</span></h1>
          <p className="text-gray-500 text-sm font-medium">Manage your medicines and stock levels.</p>
        </div>
        <button className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-teal-400 transition-all flex items-center gap-2">
          <Plus size={16} /> Add Medicine
        </button>
      </div>

      <div className="bg-[#0a192f]/40 border border-white/10 rounded-[45px] overflow-hidden backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] text-gray-500 uppercase font-black tracking-widest">
              <th className="px-10 py-8">Medicine</th>
              <th className="px-10 py-8">Price</th>
              <th className="px-10 py-8">Stock</th>
              <th className="px-10 py-8 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[1, 2, 3].map((m) => (
              <tr key={m} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-10 py-6 font-bold">Napa Extend 500mg</td>
                <td className="px-10 py-6 text-teal-400 font-black">$12.00</td>
                <td className="px-10 py-6 text-gray-400 font-medium">45 Units</td>
                <td className="px-10 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-3 bg-white/5 rounded-xl hover:text-teal-400 transition-all"><Edit3 size={16} /></button>
                    <button className="p-3 bg-white/5 rounded-xl hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}