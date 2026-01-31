"use client";
import { useState, useEffect } from "react";
import { User, ShieldCheck, Mail, Trash2, UserCog, Search, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "@/src/lib/api";

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const loadUsers = async () => {
        try {
            setLoading(true);
            const res = await api.users.getAll();
            if (res.success) setUsers(res.data);
        } catch (err: any) {
            toast.error(err.message || "Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadUsers(); }, []);

    const handleRoleChange = async (id: string, newRole: string) => {
        try {
            await api.users.updateRole(id, newRole);
            toast.success(`Role updated to ${newRole}`);
            loadUsers(); // Refresh list
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#050b18] text-white p-6 md:p-12 pt-32">
            <div className="max-w-7xl mx-auto pt-24">
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-3 text-teal-400 mb-2 font-black uppercase tracking-[0.4em] text-[10px]">
                            <ShieldCheck size={14}/> Security & Access
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter">MANAGE <span className="text-teal-500">USERS.</span></h1>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name or email..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-[20px] pl-14 pr-6 py-4 outline-none focus:border-teal-500/50 transition-all text-sm font-medium"
                        />
                    </div>
                </div>

                {/* --- USERS TABLE --- */}
                <div className="bg-[#0a192f]/40 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-xl shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">
                                    <th className="px-10 py-8">User Profile</th>
                                    <th className="px-10 py-8">Role Status</th>
                                    <th className="px-10 py-8">Joined Date</th>
                                    <th className="px-10 py-8 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr><td colSpan={4} className="px-10 py-32 text-center text-gray-500 font-bold tracking-widest uppercase animate-pulse">Synchronizing Users...</td></tr>
                                ) : filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500/20 to-blue-600/20 border border-white/10 flex items-center justify-center text-teal-400 font-bold text-lg">
                                                    {user.name[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-lg leading-tight">{user.name}</p>
                                                    <p className="text-gray-500 text-xs mt-1 flex items-center gap-1 italic"><Mail size={12}/> {user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <select 
                                                value={user.role} 
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className={`bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full outline-none transition-all cursor-pointer ${
                                                    user.role === 'ADMIN' ? 'text-purple-400' : user.role === 'SELLER' ? 'text-teal-400' : 'text-blue-400'
                                                }`}
                                            >
                                                <option value="CUSTOMER">Customer</option>
                                                <option value="SELLER">Seller</option>
                                                <option value="ADMIN">Admin</option>
                                            </select>
                                        </td>
                                        <td className="px-10 py-6">
                                            <p className="text-xs font-mono text-gray-500 italic">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:text-red-500 hover:border-red-500/30 transition-all">
                                                    <Trash2 size={16}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Insight */}
                <div className="mt-8 flex justify-between items-center px-6">
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Total Users: {filteredUsers.length}</p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-400"></span> <span className="text-[10px] text-gray-600 uppercase font-bold">Admin</span></div>
                        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal-400"></span> <span className="text-[10px] text-gray-600 uppercase font-bold">Seller</span></div>
                        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400"></span> <span className="text-[10px] text-gray-600 uppercase font-bold">Customer</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}