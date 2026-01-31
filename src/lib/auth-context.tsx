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
        if (token) {
            api.auth.getProfile()
                .then(res => {
                    if (res.success) setUser(res.data.user);
                })
                .catch(() => localStorage.removeItem("token"))
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
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading  }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);