"use client";
import { useState, useEffect, useCallback } from "react";
import {
  ShoppingBag,
  Eye,
  Search,
  MoreVertical,
  Filter,
  Loader2,
  PackageCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useAuth } from "@/src/lib/auth-context";

export default function SellerOrders() {
  const { getSellerOrders, updateOrderStatus } = useAuth(); // Context থেকে ফাংশন আনা হলো
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getSellerOrders();
      setOrders(res?.data || res || []);
    } catch (err) {
      console.error("Orders Fetch Error:", err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [getSellerOrders]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res) {
        toast.success(`Order marked as ${newStatus}`);
        fetchOrders(); 
      }
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const statusColors: any = {
    pending: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    processing: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    shipped: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    delivered: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    cancelled: "text-red-400 bg-red-500/10 border-red-500/20",
  };

  const filteredOrders = orders.filter(order => 
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050b18] flex items-center justify-center">
        <Loader2 className="text-teal-500 animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-32 px-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-teal-400 mb-2 font-black uppercase tracking-[0.3em] text-[10px]">
            <ShoppingBag size={14} /> Sales Management
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">
            Incoming <span className="text-teal-500">Orders.</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Find Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-teal-500/50 text-xs font-bold transition-all"
            />
          </div>
          <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:text-teal-400 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-[#0a192f]/40 border border-white/10 rounded-[45px] overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto">
          {filteredOrders.length > 0 ? (
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
                {filteredOrders.map((order, i) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={order._id}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all shadow-lg">
                          <ShoppingBag size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-sm tracking-tight text-white italic">#{order._id.slice(-6).toUpperCase()}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-sm font-bold text-gray-300">{order.customer?.name || order.customerName || "Guest User"}</p>
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-lg font-black text-teal-400">${order.totalAmount || order.total}</p>
                    </td>
                    <td className="px-10 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:text-teal-400 hover:border-teal-500/30 transition-all group/btn">
                          <Eye size={16} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(order._id, 'delivered')}
                          className="p-3 bg-white/5 border border-white/10 rounded-xl hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                        >
                          <PackageCheck size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-32 text-center">
              <p className="text-gray-600 font-black text-xs uppercase tracking-[0.3em]">No incoming orders found</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center px-6">
        <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest italic">Live Database Sync Active</p>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            <span className="text-[10px] text-gray-500 font-bold uppercase">Pending: {orders.filter(o => o.status === 'pending').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <span className="text-[10px] text-gray-500 font-bold uppercase">Processing: {orders.filter(o => o.status === 'processing').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}