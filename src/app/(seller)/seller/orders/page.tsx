"use client";
import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  Eye,
  Search,
  MoreVertical,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";

export default function SellerOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seller-er nijer medicine er order-gulo anar jonno api call
    const fetchOrders = async () => {
      try {
        // Ekhane api logic thakbe (e.g. api.orders.getSellerOrders())
        // Fixed dummy data for design visualization
        setOrders([
          { _id: "ORD-8821", customer: "Rakibul Hasan", total: 45.00, status: "pending", createdAt: new Date() },
          { _id: "ORD-9932", customer: "Anika Tasnim", total: 120.50, status: "processing", createdAt: new Date() },
          { _id: "ORD-1120", customer: "Sabbir Ahmed", total: 15.00, status: "shipped", createdAt: new Date() },
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const statusColors: any = {
    pending: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    processing: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    shipped: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    delivered: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <div className="max-w-6xl mx-auto pt-32">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-teal-400 mb-2 font-black uppercase tracking-[0.3em] text-[10px]">
            <ShoppingBag size={14} /> Sales Management
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">Incoming <span className="text-teal-500">Orders.</span></h1>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Find Order ID..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-teal-500/50 text-xs font-bold"
            />
          </div>
          <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:text-teal-400 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* --- ORDERS TABLE --- */}
      <div className="bg-[#0a192f]/40 border border-white/10 rounded-[45px] overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">
                <th className="px-10 py-8">Order Details</th>
                <th className="px-10 py-8">Customer</th>
                <th className="px-10 py-8">Revenue</th>
                <th className="px-10 py-8">Status</th>
                <th className="px-10 py-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order, i) => (
                <motion.tr
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={order._id}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all">
                        <ShoppingBag size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">#{order._id}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <p className="text-sm font-bold text-gray-300">{order.customer}</p>
                  </td>
                  <td className="px-10 py-6">
                    <p className="text-lg font-black">${order.total}</p>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:text-teal-400 hover:border-teal-500/30 transition-all group/btn">
                        <Eye size={16} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                      <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:text-white transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- FOOTER INSIGHT --- */}
      <div className="mt-8 flex justify-between items-center px-6">
        <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest italic">Showing recent activity for last 30 days</p>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[10px] text-gray-500 font-bold uppercase">Pending: 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[10px] text-gray-500 font-bold uppercase">Processing: 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}