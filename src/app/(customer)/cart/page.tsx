"use client";
import { useEffect, useState, useCallback } from "react";
import {
  Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/src/lib/auth-context";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { getCart, updateCartItem, removeItemFromCart, createOrder, user } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);


  const fetchCart = useCallback(async () => {
    try {
      if (!user) return;
      setLoading(true);
      const res = await getCart();

      setCartItems(res);
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [getCart]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = cartItems?.reduce((acc, item) => {
    const price = item?.medicine?.price || item?.price || 0;
    return acc + (price * item?.quantity);
  }, 0);

  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 45;
  const total = subtotal + shipping;

  const handleUpdateQty = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;

    const originalItems = [...cartItems];
    setCartItems(prev => prev?.map(item =>
      (item?.id === itemId || item?._id === itemId) ? { ...item, quantity: newQty } : item
    ));

    try {
      if (updateCartItem) {
        await updateCartItem(itemId, newQty);
      }
    } catch (err) {
      setCartItems(originalItems);
      toast?.error("Can't update quantity");
    }
  };

  const handleRemove = async (itemId: string) => {
    const originalItems = [...cartItems];
    setCartItems(prev => prev?.filter(item => (item?.id !== itemId && item?._id !== itemId)));

    try {
      if (removeItemFromCart) {
        await removeItemFromCart(itemId);
        toast?.success("Item removed from cart");
      }
    } catch (err) {
      setCartItems(originalItems);
      toast?.error("Failed to remove item");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050b18] flex flex-col items-center justify-center">
        <Loader2 className="text-teal-500 animate-spin mb-4" size={40} />
        <p className="text-teal-500 font-black uppercase text-[10px] tracking-[0.3em]">Syncing Cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050b18] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 text-teal-400 mb-2 font-black uppercase tracking-[0.4em] text-[10px]">
            <ShoppingBag size={14} /> Checkout Process
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic">YOUR <span className="text-teal-400 not-italic">CART.</span></h1>
        </div>

        {cartItems?.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {cartItems?.map((item) => {
                  const id = item?.id || item._id;
                  const medicine = item?.medicine || item;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={id}
                      className="bg-[#0a192f]/40 border border-white/5 rounded-[35px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 group hover:border-teal-500/20 transition-all"
                    >
                      <div className="w-20 h-20 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400">
                        <ShoppingBag size={32} />
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <p className="text-[9px] font-black uppercase tracking-widest text-teal-500 mb-1">
                          {medicine?.category?.name || "Medicine"}
                        </p>
                        <h3 className="text-xl font-bold mb-1">{medicine?.name}</h3>
                        <p className="text-gray-500 text-sm font-medium">${medicine?.price} / unit</p>
                      </div>

                      <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-2 border border-white/5">
                        <button onClick={() => handleUpdateQty(id, item?.quantity - 1)} className="p-2 hover:text-teal-400 transition-colors"><Minus size={16} /></button>
                        <span className="w-8 text-center font-black">{item?.quantity}</span>
                        <button onClick={() => handleUpdateQty(id, item?.quantity + 1)} className="p-2 hover:text-teal-400 transition-colors"><Plus size={16} /></button>
                      </div>

                      <div className="text-right min-w-[100px]">
                        <p className="text-xl font-black">${((medicine?.price || 0) * item?.quantity).toFixed(2)}</p>
                      </div>

                      <button
                        onClick={() => handleRemove(id)}
                        className="p-4 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-[45px] p-10 sticky top-32">
                <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">${subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Shipping</span>
                    <span className="text-teal-400 font-bold">{shipping === 0 ? "FREE" : `$${shipping?.toFixed(2)}`}</span>
                  </div>
                  <div className="h-px bg-white/10 my-4" />
                  <div className="flex justify-between items-end">
                    <span className="text-gray-400 font-bold uppercase text-xs">Total</span>
                    <span className="text-4xl font-black text-white">${total?.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className={`w-full bg-teal-500 hover:bg-teal-400 text-[#050b18] py-5 rounded-[24px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 group ${cartItems?.length === 0 ? 'pointer-events-none opacity-50' : ''}`}
                >
                  Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-3 text-gray-500">
                    <ShieldCheck size={18} className="text-teal-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">SSL Encrypted Payment</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <Truck size={18} className="text-teal-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Express Pharma Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32 bg-white/[0.02] border border-dashed border-white/10 rounded-[60px]"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={40} className="text-gray-700" />
            </div>
            <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Your cart is empty.</h2>
            <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium italic">Your pharmacological essentials will appear here once added.</p>
            <Link href="/shop" className="inline-block bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-xs hover:bg-teal-400 transition-all">
              Return to Marketplace
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}