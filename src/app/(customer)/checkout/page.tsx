"use client";
import { useState, useEffect } from "react";
import {
  CreditCard, MapPin, ChevronRight, Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/src/lib/auth-context";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { getCart, createOrder } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
    paymentMethod: "Cash on Delivery"
  });

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await getCart();
        setCartItems(res || []);
      } catch (err) {
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCartData();
  }, [getCart]);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.medicine?.price || item.price || 0;
    return acc + (price * item.quantity);
  }, 0);
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 45;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!formData.fullName || !formData.address || !formData.phone) {
      return toast.error("Please fill in all shipping details");
    }

    try {
      setIsSubmitting(true);
      const orderPayload = {
        totalAmount: Number(total),
        shippingAddress: `${formData.address}, ${formData.city}`,
        phoneNumber: formData.phone,
        paymentMethod: formData.paymentMethod,
        items: cartItems.map((item: any) => ({
          medicineId: item.medicineId || item.medicine?.id || item.id,
          quantity: item.quantity,
          price: item.medicine?.price || item.price
        }))
      };

      const res = await createOrder(orderPayload);
      if (res) {
        toast.success("Order Placed Successfully!");
        router.push("/success"); 
      }
    } catch (err: any) {
      toast.error(err.message || "Order failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className=" min-h-screen bg-[#050b18] flex items-center justify-center"><Loader2 className="animate-spin text-teal-500" /></div>;

  return (
    <div className="min-h-screen bg-[#050b18] text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
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
                    <input name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 mt-2 outline-none focus:border-teal-500 transition-all" placeholder="Enter your name" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Street Address</label>
                    <input name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 mt-2 outline-none focus:border-teal-500 transition-all" placeholder="House no, Street name" />
                  </div>
                  <input name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-teal-500" placeholder="City" />
                  <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-teal-500" placeholder="Phone Number" />
                </div>
                <button onClick={() => setStep(2)} className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-400 transition-all flex items-center justify-center gap-2">
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
                  {['Cash on Delivery', 'bKash / Nagad'].map((method) => (
                    <label key={method} className={`flex items-center justify-between p-6 border rounded-[28px] cursor-pointer transition-all ${formData.paymentMethod === method ? 'bg-teal-500/10 border-teal-500' : 'bg-white/5 border-white/10'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === method ? 'border-teal-500' : 'border-white/20'}`}>
                          {formData.paymentMethod === method && <div className="w-3 h-3 bg-teal-500 rounded-full" />}
                        </div>
                        <span className="font-bold uppercase tracking-widest text-xs">{method}</span>
                      </div>
                      <input type="radio" name="payment" className="hidden" onChange={() => setFormData({...formData, paymentMethod: method})} checked={formData.paymentMethod === method} />
                    </label>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 bg-white/5 border border-white/10 py-5 rounded-2xl font-black uppercase tracking-widest">Back</button>
                  <button onClick={handlePlaceOrder} disabled={isSubmitting} className="flex-[2] bg-teal-500 text-[#050b18] py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-400 transition-all flex items-center justify-center gap-2">
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Confirm Order"}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-[#0a192f]/40 border border-white/10 rounded-[45px] p-8 backdrop-blur-xl sticky top-32">
              <h3 className="text-xl font-black uppercase tracking-tight mb-8">Order Summary</h3>
              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xs font-bold italic">x{item.quantity}</div>
                      <span className="text-sm font-bold text-gray-300 truncate max-w-[120px]">{item.medicine?.name || item.name}</span>
                    </div>
                    <span className="font-black text-sm">${((item.medicine?.price || item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex justify-between text-gray-400 text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-400 text-sm"><span>Shipping</span><span className="text-teal-400">{shipping === 0 ? "FREE" : `$${shipping}`}</span></div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-xs font-black uppercase text-gray-500">Total</span>
                  <span className="text-4xl font-black text-teal-400">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}