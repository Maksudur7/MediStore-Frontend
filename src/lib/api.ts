const BASE_URL = process.env.BASE_URL || 'https://assinment-4-backend-eight.vercel.app';

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
        login: (credentials: any) => baseRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
        register: (userData: any) => baseRequest('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
        getProfile: (id: string) => baseRequest(`/user/${id}`, { method: 'GET' }),

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


        updateProfile: (id: string, data: any) =>
            baseRequest(`/user/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            }),

    },
    admin: {
        getStats: () => baseRequest('/user/admin/stats', { method: 'GET' }),
    },
    seller: {
        getStats: () => baseRequest('/user/seller/stats', { method: 'GET' }),
    },

    medicines: {
        getAll: () =>
            baseRequest('/medicines', { method: 'GET' }),
        create: (medicineData: any) =>
            baseRequest('/medicines', { method: 'POST', body: JSON.stringify(medicineData) }),

        getById: (id: string) =>
            baseRequest(`/medicines/${id}`, { method: 'GET' }),

        getByCategory: (categoryName: string) =>
            baseRequest(`/medicines?category=${categoryName}`),
        update: (id: string, updates: any) =>
            baseRequest(`/medicines/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updates)
            }),
        delete: (id: string) =>
            baseRequest(`/medicines/${id}`, { method: 'DELETE' }),
    },

    orders: {
        getSellerOrders: () =>
            baseRequest('/orders/seller-orders', { method: 'GET' }),

        getCustomerOrder: () =>
            baseRequest('/orders/my-orders', { method: 'GET' }),

        updateOrderStatus: (orderId: string, status: string) =>
            baseRequest(`/orders/${orderId}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status })
            }),
        createOrder: (orderData: any) =>
            baseRequest('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
        getOrderDetails: (id: string) =>
            baseRequest(`/orders/${id}`, { method: 'GET' }),
    },

    cart: {
        adToCart: (medicineId: string, quantity: number) =>
            baseRequest('/cart', { method: 'POST', body: JSON.stringify({ medicineId, quantity }) }),
        getCart: () =>
            baseRequest('/cart', { method: 'GET' }),
        updateCartItem: (itemId: string, quantity: number) =>
            baseRequest(`/cart/${itemId}`, {
                method: 'PATCH',
                body: JSON.stringify({ quantity })
            }),
        removeItemFromCart: (itemId: string) =>
            baseRequest(`/cart/${itemId}`, { method: 'DELETE' }),
    },
    reviews: {
        getAll: () => baseRequest('/reviews', { method: 'GET' }),
        post: (data: { medicineId: string; rating: number; comment: string }) =>
            baseRequest('/reviews', {
                method: 'POST',
                body: JSON.stringify(data)
            }),
    },

};