# API Guide - Cách Call API với Axios

## Pattern: Feature API → Hooks → Components/Pages

### Quy trình 3 bước (giống React Native):

```
1. API Layer (api/)      → Định nghĩa API calls với axios
2. Hooks Layer (hooks/)  → Wrap API với React Query
3. Components/Pages      → Sử dụng hooks
```

## Bước 1: Tạo API Functions

### File: `features/products/api/productApi.ts`

```typescript
import { apiClient } from '@/core/api/client';
import { API_ENDPOINTS } from '@/core/api/endpoints';
import { Product, ProductFilter } from '../types/product.types';

export const productApi = {
  // GET - Simple
  getProducts: async (filter?: ProductFilter): Promise<Product[]> => {
    const { data } = await apiClient.get<Product[]>(API_ENDPOINTS.PRODUCTS.LIST, {
      params: filter,
    });
    return data;
  },

  // GET - Với path params
  getProductDetail: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id));
    return data;
  },

  // POST - Create
  createProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    const { data } = await apiClient.post<Product>(
      API_ENDPOINTS.PRODUCTS.CREATE,
      productData
    );
    return data;
  },

  // PUT - Update
  updateProduct: async (id: string, data: Partial<Product>): Promise<Product> => {
    const { data: response } = await apiClient.put<Product>(
      API_ENDPOINTS.PRODUCTS.UPDATE(id),
      data,
    );
    return response;
  },

  // DELETE
  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
  },
};
```

## Bước 2: Tạo Hooks với React Query

### File: `features/products/hooks/useProducts.ts`

```typescript
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../api/productApi';

// ✅ GET - useQuery
export function useProducts(filter?: ProductFilter) {
  return useQuery({
    queryKey: ['products', filter],
    queryFn: () => productApi.getProducts(filter),
  });
}

// ✅ GET - Với conditional fetch
export function useProductDetail(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id),
    enabled: !!id,
  });
}

// ✅ POST/PUT/DELETE - useMutation
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
```

## Bước 3: Sử dụng trong Component/Page

### Client Component:

```typescript
'use client';

import { useProducts } from '@/features/products';

export function ProductList() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Server Component (Next.js App Router):

```typescript
import { productApi } from '@/features/products/api/productApi';

export default async function ProductsPage() {
  const products = await productApi.getProducts();
  
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## API Client Configuration

### Auto-add Auth Token

File: `core/api/client.ts` đã được setup:

```typescript
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**→ Tất cả API calls tự động có token!**

### Error Handling

```typescript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## Checklist khi tạo API mới

- [ ] Thêm endpoint vào `core/api/endpoints.ts`
- [ ] Tạo API function trong `features/{feature}/api/`
- [ ] Tạo hook với `useQuery` (GET) hoặc `useMutation` (POST/PUT/DELETE)
- [ ] Export hook trong `features/{feature}/index.ts`
- [ ] Sử dụng hook trong Component/Page
- [ ] Handle loading & error states
- [ ] Invalidate queries sau mutations

## Best Practices

### ✅ DO

1. **Luôn dùng hooks, không gọi API trực tiếp trong Component**
   ```typescript
   ✅ const { data } = useProducts();
   ❌ const data = await productApi.getProducts();
   ```

2. **Đặt queryKey rõ ràng**
   ```typescript
   ✅ ['products', filter]
   ✅ ['product', id]
   ❌ ['data']
   ```

3. **Invalidate queries sau mutations**
   ```typescript
   onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ['products'] });
   }
   ```

### ❌ DON'T

1. **KHÔNG gọi API trực tiếp trong Component**
   ```typescript
   ❌ useEffect(() => {
       productApi.getProducts().then(setProducts);
     }, []);
   ```

2. **KHÔNG quên handle loading/error**
   ```typescript
   ❌ const { data } = useProducts();
     return <List data={data} />; // data có thể undefined!
   ```

3. **KHÔNG hardcode endpoints**
   ```typescript
   ❌ apiClient.get('/products')
   ✅ apiClient.get(API_ENDPOINTS.PRODUCTS.LIST)
   ```

## So sánh với React Native

| React Native | Next.js |
|-------------|---------|
| `apiClient.get()` | `apiClient.get()` ✅ Giống nhau |
| `useQuery()` | `useQuery()` ✅ Giống nhau |
| `useMutation()` | `useMutation()` ✅ Giống nhau |
| Interceptors | Interceptors ✅ Giống nhau |

**→ Cấu trúc và cách sử dụng hoàn toàn giống nhau!**

