export type UserRole = 'ADMIN' | 'SELLER' | 'CUSTOMER';
export type OrderStatus = 'PLACED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: 'active' | 'banned';
}

export interface Medicine {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    manufacturer: string;
    sellerId: string;
    image?: string;
}

export interface Order {
    id: string;
    customerId: string;
    items: { medicineId: string; quantity: number; price: number }[];
    totalAmount: number;
    status: OrderStatus;
    address: string;
    createdAt: Date;
}