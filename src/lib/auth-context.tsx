"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "./api";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (token) {
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
            api.auth.getProfile()
                .then(res => {
                    if (res.success) {
                        setUser(res.data.user);
                        localStorage.setItem("user", JSON.stringify(res.data.user));
                    }
                })
                .catch(() => logout())
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials: any) => {
        try {
            const res = await api.auth.login(credentials);
            console.log("Login Response:", res);

            if (res.success || res.data.token) {
                localStorage.setItem("token", res.data.token);
                setUser(res.data.user);
                const role = res.data.user.role.toUpperCase();
                if (role === 'ADMIN') router.push('/admin');
                else if (role === 'SELLER') router.push('/seller');
                else router.push('/shop');

                return { success: true };
            }
            return res.data;
        } catch (err: any) {
            console.error("Login Context Error:", err);
            return { success: false, message: err.response?.data?.message };
        }
    };

    const register = async (userData: any) => {
        const res = await api.auth.register(userData);
        if (res.success || res.data.token) {
            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
            const role = res.data.user.role.toUpperCase();
            if (role === 'ADMIN') router.push('/admin');
            else if (role === 'SELLER') router.push('/seller');
            else router.push('/shop');
        }
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setLoading(false);
        window.location.href = "/login";
    };

    const getAllCategories = async () => {
        try {
            const res = await api?.categories?.getAll();
            console.log(" all catagory data ", res);
            return res;
        }
        catch (err: any) {
            console.error("Fetch Categories Error:", err);
            return [];
        }
    };

    const postACategory = async (categoryData: any) => {
        try {
            console.log('catagory Data is ', categoryData);
            const res = await api.categories.create(categoryData);
            console.log('post Catagory', res);
            return res.data;
        }
        catch (err: any) {
            console.error("Create Category Error:", err);
            return null;
        }
    };

    const updateACategory = async (id: string, categoryData: any) => {
        try {
            console.log('update catagory', id, categoryData);
            const res = await api.categories.update(id, categoryData);
            return res.data;
        }
        catch (err: any) {
            console.error("Update Category Error:", err);
            return null;
        }
    };

    const deleteACategory = async (id: string) => {
        try {
            const res = await api.categories.delete(id);
            return res.data;
        }
        catch (err: any) {
            console.error("Delete Category Error:", err);
            return null;
        }
    };

    const getAllUsers = async () => {
        try {
            const res = await api?.users?.getAll();
            console.log(" all users data ", res);
            return res;
        }
        catch (err: any) {
            console.error("Fetch Users Error:", err);
            return [];
        }
    };

    const updateUserRole = async (id: string, updates: { role?: string; status?: boolean }) => {
        try {
            console.log(id, updates)
            const response = await api.users.updateUserByAdmin(id, updates);
            return response;
        } catch (error: any) {
            throw new Error(error.message || "Failed to update user");
        }
    };

    const deleteUser = async (id: string) => {
        try {
            const res = await api.users.delete(id);
            return res.data;
        }
        catch (err: any) {
            console.error("Delete User Error:", err);
            return null;
        }
    }

    const getAdminStats = async () => {
        try {
            const res = await api.admin.getStats();
            console.log('getAdmin data', res);
            return res;
        } catch (err: any) {
            console.error("Fetch Admin Stats Error:", err);
            return null;
        }
    };

    const getSellerStats = async () => {
        try {
            const res = await api.seller.getStats();
            return res;
        } catch (err: any) {
            console.error("Fetch Seller Stats Error:", err);
            return null;
        }
    }

    const postMedicine = async (medicineData: any) => {
        try {
            const res = await api.medicines.create(medicineData);
            console.log('post medicine data', res);
            return res;
        } catch (err: any) {
            console.error("Post Medicine Error:", err);
            return null;
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            loading,
            getAllCategories,
            postACategory,
            updateACategory,
            deleteACategory,
            getAllUsers,
            updateUserRole,
            deleteUser,
            getAdminStats,
            getSellerStats,
            postMedicine
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);