"use client";
import { useState, useEffect } from "react";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Search,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/src/lib/auth-context";
import Link from "next/link";

export default function CustomerOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { getMyOrder } = useAuth()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getMyOrder();
        if (Array.isArray(res)) {
          setOrders(res);
        } else if (res?.success) {
          setOrders(res.data || []);
        }
      } catch (err) {
        console.error("Orders Load Error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'pending': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'processing': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-400 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-teal-400 mb-2 font-black uppercase tracking-[0.4em] text-[10px]"
          >
            <Package size={14} /> Shopping History
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">MY <span className="text-teal-400 font-outline italic">ORDERS.</span></h1>
        </div>

        <div className="space-y-6">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-white/5 rounded-[40px] animate-pulse border border-white/5" />
            ))
          ) : orders.length > 0 ? (
            orders.map((order, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={order?.id}
                className="bg-[#0a192f]/40 border border-white/10 rounded-[40px] p-8 md:p-10 backdrop-blur-xl hover:border-white/20 transition-all group"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex gap-6 items-center">
                    <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center border ${getStatusStyles(order.status)}`}>
                      {order.status === 'delivered' ? <CheckCircle2 size={28} /> : <Clock size={28} />}
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Order ID: #{order?.id?.slice(-8)}</p>
                      <h3 className="text-xl font-black mb-1">
                        {order.items?.length} {order.items?.length > 1 ? 'Items' : 'Item'}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2">
                    <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="text-2xl font-black text-white">${order.totalAmount || order.price}</p>
                  </div>

                  <div className="pt-4 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto">
                    <Link
                      href={`/orders/${order.id}`}
                      className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-teal-400 transition-all flex items-center justify-center gap-2"
                    >
                      Details <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>

                <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
                  {order.items?.map((item: any, i: number) => (
                    <div key={i} className="bg-white/5 border border-white/5 px-4 py-2 rounded-xl text-[10px] font-bold text-gray-400 whitespace-nowrap">
                      {item.medicine?.name} x {item.quantity}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-24 bg-[#0a192f]/20 border border-dashed border-white/10 rounded-[60px]">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={32} className="text-gray-600" />
              </div>
              <h3 className="text-2xl font-black mb-2 italic">NO ORDERS YET.</h3>
              <p className="text-gray-500 text-sm mb-8 font-medium">Looks like you haven't made your first purchase.</p>
              <button className="bg-teal-500 text-[#050b18] px-10 py-4 rounded-2xl font-black uppercase text-xs hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/10">
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}