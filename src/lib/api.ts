import { create } from "domain";

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const baseRequest = async (endpoint: string, options: RequestInit = {}) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'API Request Failed');
        }

        return result;
    } catch (error: any) {
        console.error(`API Error [${endpoint}]:`, error.message);
        throw error;
    }
};


export const api = {
    auth: {
        login: (credentials: any) =>
            baseRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),

        register: (userData: any) =>
            baseRequest('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),

        getProfile: () => baseRequest('/user', { method: 'GET' }),
    },

    categories: {
        getAll: () => baseRequest('/category', { method: 'GET' }),

        create: (data: { name: string }) =>
            baseRequest('/category', {
                method: 'POST',
                body: JSON.stringify(data)
            }),

        update: (id: string, data: { name: string }) =>
            baseRequest(`/category/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            }),

        delete: (id: string) =>
            baseRequest(`/category/${id}`, { method: 'DELETE' }),
    },

    users: {
        getAll: () => baseRequest('/user', { method: 'GET' }),

        updateUserByAdmin: (id: string, updates: { role?: string; status?: boolean }) =>
            baseRequest(`/user/${id}/role`, {
                method: 'PATCH',
                body: JSON.stringify(updates)
            }),
        delete: (id: string) =>
            baseRequest(`/user/${id}`, { method: 'DELETE' }),

    },
    admin: {
        getStats: () => baseRequest('/user/admin/stats', { method: 'GET' }),
    },
    seller: {
        getStats: () => baseRequest('/user/seller/stats', { method: 'GET' }),
    },

    medicines: {
        getAll: () =>
            baseRequest('/medicines'),
        create: (medicineData: any) =>
            baseRequest('/medicines', { method: 'POST', body: JSON.stringify(medicineData) }),

        getById: (id: string) =>
            baseRequest(`/medicines/${id}`),

        getByCategory: (categoryName: string) =>
            baseRequest(`/medicines?category=${categoryName}`),
    },

    // orders: {
    //     create: (orderData: any) =>
    //         baseRequest('/orders', { method: 'POST', body: JSON.stringify(orderData) }),

    //     getMyOrders: () =>
    //         baseRequest('/orders/my-orders'),
    // }
};