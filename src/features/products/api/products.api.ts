import type { Product, ProductFilters, ProductsResponse } from '../types/product.types';

// Mock product data
const mockProducts: Product[] = [
    {
        id: '1',
        code: 'HS102',
        name: 'Hộp trứng gà PinkyEgg 6 quả',
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=100&h=100&fit=crop',
        category: { id: '1', name: 'Hộp 6', color: '#3B82F6' },
        price: 25000,
        stock: 0,
        status: 'out-of-stock',
    },
    {
        id: '2',
        code: 'MGV01',
        name: 'Giỏ trứng gà PinkyEgg 30 quả',
        image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=100&h=100&fit=crop',
        category: { id: '2', name: 'Hộp 30', color: '#3B82F6' },
        price: 125000,
        stock: 0,
        status: 'out-of-stock',
    },
    {
        id: '3',
        code: 'HS102',
        name: 'Pinky Egg Organic hộp 6',
        image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=100&h=100&fit=crop',
        category: { id: '1', name: 'Hộp 6', color: '#3B82F6' },
        price: 35000,
        stock: 95,
        status: 'in-stock',
    },
    {
        id: '4',
        code: 'HS850',
        name: 'Hộp trứng gà PinkyEgg 12 quả',
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=100&h=100&fit=crop',
        category: { id: '3', name: 'Hộp 12', color: '#EC4899' },
        price: 45000,
        stock: 0,
        status: 'out-of-stock',
    },
    {
        id: '5',
        code: 'HS102',
        name: 'Khay trứng gà 30 quả',
        image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=100&h=100&fit=crop',
        category: { id: '2', name: 'Hộp 30', color: '#3B82F6' },
        price: 95000,
        stock: 593,
        status: 'in-stock',
    },
    {
        id: '6',
        code: 'HS102',
        name: 'Hộp trứng gà PinkyEgg 150 quả',
        image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=100&h=100&fit=crop',
        category: { id: '4', name: 'Hộp 150', color: '#3B82F6' },
        price: 112000,
        stock: 0,
        status: 'out-of-stock',
    },
    {
        id: '7',
        code: 'HS102',
        name: 'Hộp trứng gà PinkyEgg 16 quả',
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=100&h=100&fit=crop',
        category: { id: '1', name: 'Hộp 6', color: '#3B82F6' },
        price: 92000,
        stock: 138,
        status: 'in-stock',
    },
    {
        id: '8',
        code: 'HS102',
        name: 'Rổ trứng gà 12 quả',
        image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=100&h=100&fit=crop',
        category: { id: '3', name: 'Hộp 12', color: '#EC4899' },
        price: 225000,
        stock: 0,
        status: 'out-of-stock',
    },
    {
        id: '9',
        code: 'HS102',
        name: 'Khay trứng gà PinkyEgg 30 quả',
        image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=100&h=100&fit=crop',
        category: { id: '5', name: 'Khay 30', color: '#F97316' },
        price: 150000,
        stock: 482,
        status: 'in-stock',
    },
    {
        id: '10',
        code: 'HS102',
        name: 'Hộp trứng gà PinkyEgg 6 quả',
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=100&h=100&fit=crop',
        category: { id: '1', name: 'Hộp 6', color: '#3B82F6' },
        price: 25000,
        stock: 0,
        status: 'out-of-stock',
    },
    {
        id: '11',
        code: '#01923',
        name: 'Hộp trứng gà PinkyEgg 12 quả',
        image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=100&h=100&fit=crop',
        category: { id: '3', name: 'Hộp 12', color: '#EC4899' },
        price: 65000,
        stock: 100,
        status: 'in-stock',
    },
];

export const getProducts = async (filters: ProductFilters): Promise<ProductsResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredProducts = [...mockProducts];

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(searchLower) ||
                product.code.toLowerCase().includes(searchLower)
        );
    }

    if (filters.status && filters.status !== 'all') {
        filteredProducts = filteredProducts.filter(
            (product) => product.status === filters.status
        );
    }

    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
        data: paginatedProducts,
        total: filteredProducts.length,
        page,
        pageSize,
    };
};
