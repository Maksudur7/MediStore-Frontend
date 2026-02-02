"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Package, MapPin, Calendar, 
  CreditCard, 
} from "lucide-react";
import { useAuth } from "@/src/lib/auth-context";

export default function OrderDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { getOrderDetails } = useAuth();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getOrderDetails(id as string);
        setOrder(res);
      } catch (err) {
        console.error("Detail Load Error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#050b18] flex items-center justify-center text-teal-400 font-black italic">LOADING DETAILS...</div>;
  if (!order) return <div className="min-h-screen bg-[#050b18] flex items-center justify-center text-white font-black italic">ORDER NOT FOUND.</div>;

  return (
    <div className="min-h-screen bg-[#050b18] text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 font-black uppercase text-[10px] tracking-widest">
          <ArrowLeft size={16} /> Back to Orders
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <p className="text-teal-400 font-black uppercase tracking-widest text-[10px] mb-2">Invoice Detail</p>
            <h1 className="text-5xl font-black tracking-tighter italic uppercase">Order #{order.id?.slice(-8)}</h1>
          </div>
          <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest text-teal-400">
            Status: {order.status}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 p-8 rounded-[32px] border border-white/5">
            <MapPin className="text-teal-400 mb-4" size={24} />
            <h4 className="font-black uppercase text-[10px] text-gray-500 tracking-widest mb-2">Shipping Address</h4>
            <p className="text-sm font-medium leading-relaxed">{order.shippingAddress}</p>
          </div>

          <div className="bg-white/5 p-8 rounded-[32px] border border-white/5">
            <Calendar className="text-teal-400 mb-4" size={24} />
            <h4 className="font-black uppercase text-[10px] text-gray-500 tracking-widest mb-2">Order Date</h4>
            <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>

          <div className="bg-white/5 p-8 rounded-[32px] border border-white/5">
            <CreditCard className="text-teal-400 mb-4" size={24} />
            <h4 className="font-black uppercase text-[10px] text-gray-500 tracking-widest mb-2">Total Amount</h4>
            <p className="text-2xl font-black">${order.totalAmount}</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-[40px] border border-white/10 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/[0.02]">
            <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-3">
              <Package size={18} className="text-teal-400" /> Order Items ({order.items?.length})
            </h3>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              {order.items?.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black text-teal-400 border border-white/5">
                      {item.quantity}x
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-tight">{item.medicine?.name}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">{item.medicine?.category?.name || 'Medicine'}</p>
                    </div>
                  </div>
                  <p className="font-black text-lg">${item.unitPrice * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                <span className="font-black uppercase text-xs tracking-[0.3em] text-gray-500">Subtotal Paid</span>
                <span className="text-3xl font-black text-teal-400">${order.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}