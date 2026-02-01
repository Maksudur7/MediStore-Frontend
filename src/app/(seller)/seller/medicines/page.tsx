"use client";
import { useState, useEffect, useCallback } from "react";
import { Trash2, Loader2, PackageX } from "lucide-react";
import { useAuth } from "@/src/lib/auth-context";
import { toast } from "react-hot-toast";
import AddMedicineModal from "@/src/components/ddMedicineModal";
import EditMedicineModal from "@/src/components/EditMedicineModal";

export default function SellerInventory() {
  const { getMedicines, deletMedicines } = useAuth();

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getMedicines();
      if (res) setMedicines(res);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [getMedicines]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await deletMedicines(id);
      if (res) {
        toast.success("Medicine Deleted Successfully");
        fetchInventory();
      } else {
        toast.error("Failed to delete medicine");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050b18] flex items-center justify-center">
        <Loader2 className="text-teal-500 animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-32 px-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-2 italic">
            MY <span className="text-teal-500">INVENTORY.</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
            Control center for your pharmaceutical stock.
          </p>
        </div>

        <AddMedicineModal onRefresh={fetchInventory} />
      </div>

      <div className="bg-[#0a192f]/40 border border-white/10 rounded-[45px] overflow-hidden backdrop-blur-xl">
        {medicines.length > 0 ? (
          <table className="w-full z-10 text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] text-gray-500 uppercase font-black tracking-widest">
                <th className="px-10 py-8">Medicine</th>
                <th className="px-10 py-8">Price</th>
                <th className="px-10 py-8">Stock</th>
                <th className="px-10 py-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {medicines.map((m: any) => (
                <tr key={m.id} className="group hover:bg-white/[0.02] z-10 transition-colors">
                  <td className="px-10 py-6">
                    <div className="font-bold text-white tracking-tight">{m.name}</div>
                    <div className="text-[9px] text-gray-600 uppercase font-black">{m.manufacturer}</div>
                  </td>
                  <td className="px-10 py-6 text-teal-400 font-black">
                    ${Number(m.price).toFixed(2)}
                  </td>
                  <td className="px-10 py-6">
                    <span className={`font-medium ${m.stockQuantity < 10 ? 'text-red-500' : 'text-gray-400'}`}>
                      {m.stockQuantity} Units
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <EditMedicineModal medicine={m} onRefresh={fetchInventory} />
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-3 bg-white/5 rounded-xl hover:text-red-500 transition-all border border-transparent hover:border-red-500/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-24 text-center">
            <PackageX size={48} className="mx-auto mb-4 opacity-10" />
            <p className="text-gray-600 font-black text-[10px] uppercase tracking-[0.3em]">
              Inventory Node Empty
            </p>
          </div>
        )}
      </div>
    </div>
  );
}