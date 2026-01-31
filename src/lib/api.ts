
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

        getProfile: () =>
            baseRequest('/auth/profile'),
    },

    categories: {
        getAll: () =>
            baseRequest('/categories'),

        getById: (id: string) =>
            baseRequest(`/categories/${id}`),
    },

    medicines: {
        getAll: () =>
            baseRequest('/medicines'),

        getById: (id: string) =>
            baseRequest(`/medicines/${id}`),

        getByCategory: (categoryName: string) =>
            baseRequest(`/medicines?category=${categoryName}`),
    },

    orders: {
        create: (orderData: any) =>
            baseRequest('/orders', { method: 'POST', body: JSON.stringify(orderData) }),

        getMyOrders: () =>
            baseRequest('/orders/my-orders'),
    }
};