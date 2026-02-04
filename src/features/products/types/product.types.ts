export interface Category {
    id: string;
    name: string;
    color: string;
}

export interface Product {
    id: string;
    code: string;
    name: string;
    image: string;
    category: Category;
    price: number;
    stock: number;
    status: 'in-stock' | 'out-of-stock';
}

export interface ProductFilters {
    search?: string;
    status?: 'all' | 'in-stock' | 'out-of-stock';
    page?: number;
    pageSize?: number;
}

export interface ProductsResponse {
    data: Product[];
    total: number;
    page: number;
    pageSize: number;
}
