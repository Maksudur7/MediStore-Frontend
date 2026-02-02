"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "./api";
import { AuthContextType } from "../types";


interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
    phone?: string;
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (token && savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);

            const userId = parsedUser.id || parsedUser._id;

            if (userId) {
                api.auth.getProfile(userId)
                    .then(res => {
                        if (res) {
                            setUser(res);
                            localStorage.setItem("user", JSON.stringify(res));
                        }
                    })
                    .catch(() => logout())
                    .finally(() => setLoading(false));
            }
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

    const getMedicines = async () => {
        try {
            const res = await api.medicines.getAll();
            return res;
        }
        catch (err: any) {
            console.error("Fetch Medicines Error:", err);
            return [];
        }
    };

    const getMedicinesDettles = async (id: string) => {
        try {
            const res = await api.medicines.getById(id);
            return res;
        }
        catch (err: any) {
            console.error("Fetch Medicines Details Error:", err);
            return null;
        }
    };

    const updateMedicines = async (id: string, updates: any) => {
        try {
            const res = await api.medicines.update(id, updates);
            console.log("Update Medicine Response:", res);
            return res;
        } catch (err: any) {
            console.error("Update Medicine Error:", err);
            return null;
        }
    };

    const deletMedicines = async (id: string) => {
        try {
            const res = await api.medicines.delete(id);
            console.log(res);
            return res;
        } catch (err: any) {
            console.error("Delete Medicine Error:", err);
            return null;
        }
    };

    const getSellerOrders = async () => {
        try {
            const res = await api.orders.getSellerOrders();
            return res;
        } catch (err: any) {
            console.error("Fetch Seller Orders Error:", err);
            return null;
        }
    };

    const createOrder = async (orderData: any) => {
        try {
            const res = await api.orders.createOrder(orderData);
            return res;
        }
        catch (err: any) {
            console.error("Create Order Error:", err);
            return null;
        }
    };

    const updateOrderStatus = async (orderId: string, status: string) => {
        try {
            const res = await api.orders.updateOrderStatus(orderId, status);
            return res;
        } catch (err: any) {
            console.error("Update Order Status Error:", err);
            return null;
        }
    };

    const getMyOrder = async () => {
        try {
            const res = await api.orders.getCustomerOrder();
            console.log('API Response in Context:', res);
            return res;
        } catch (err: any) {
            console.error("Get my order Error:", err.message);
            return [];
        }
    }

    const getOrderDetails = async (id: string) => {
        try {
            const res = await api.orders.getOrderDetails(id);
            return res;
        } catch (err: any) {
            console.error("Get Order Details Error:", err);
            return null;
        }
    }

    const addToCart = async (medicineId: string, quantity: number) => {
        try {
            const res = await api.cart.adToCart(medicineId, quantity);
            return res;
        } catch (err: any) {
            console.error("Add to Cart Error:", err);
            return null;
        }
    };

    const getCart = async () => {
        try {
            const res = await api.cart.getCart();
            console.log(res)
            return res;
        } catch (err: any) {
            console.error("Get Cart Error:", err);
            return null;
        }
    };

    const updateCartItem = async (itemId: string, quantity: number) => {
        try {
            const res = await api.cart.updateCartItem(itemId, quantity);
            console.log(res)
            return res;
        } catch (err: any) {
            console.error("Update Cart Item Error:", err);
            return null;
        }
    }

    const removeItemFromCart = async (itemId: string) => {
        try {
            const res = await api.cart.removeItemFromCart(itemId);
            return res;
        } catch (err: any) {
            console.error("Delete Cart Item Error:", err);
            return null;
        }
    }

    const updateProfile = async (formData: any) => {
        try {
            const userId = user?.id!

            if (!userId) {
                return { success: false, message: "User ID not found. Please re-login." };
            }
            const res = await api.users.updateProfile(userId, formData);
            setUser(res);
            return res;
        } catch (err: any) {
            console.error("Update error:", err);
            return { success: false, message: err.message };
        }
    };

    const postReview = async (reviewData: any) => {
        try {
            const res = await api.reviews.post(reviewData);
            return res;
        } catch (err: any) {
            throw err;
        }
    };

    const getReviews = async () => {
        try {
            return await api.reviews.getAll();
        } catch (err) {
            return [];
        }
    };


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
            postMedicine,
            getMedicines,
            getMedicinesDettles,
            updateMedicines,
            deletMedicines,
            getSellerOrders,
            getMyOrder,
            updateOrderStatus,
            addToCart,
            getCart,
            updateCartItem,
            removeItemFromCart,
            createOrder,
            getOrderDetails,
            updateProfile,
            postReview,
            getReviews

        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);