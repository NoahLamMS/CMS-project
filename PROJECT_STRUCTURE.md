# 📁 CẤU TRÚC DỰ ÁN CHI TIẾT (PROJECT STRUCTURE)

> Tài liệu hướng dẫn chi tiết về cấu trúc thư mục và chức năng từng file trong dự án CMS.

---


## 📋 Mục lục
- [Sơ đồ cây thư mục](#sơ-đồ-cây-thư-mục)
- [Chi tiết từng thư mục](#chi-tiết-từng-thư-mục)
- [Hướng dẫn sửa code](#hướng-dẫn-sửa-code)
- [Import Paths](#import-paths)

---

## Sơ đồ cây thư mục

```
src/
│
├── 📦 app/                              # App Shell - Khởi tạo ứng dụng
│   ├── providers/                       # Các provider toàn cục
│   │   ├── QueryProvider.tsx            # ⚙️ Config TanStack Query (cache, retry)
│   │   └── AntdProvider.tsx             # 🎨 Config theme Ant Design (màu, font, components)
│   │
│   ├── router/                          # Hệ thống routing
│   │   ├── index.tsx                    # 🔀 Router component (sử dụng useRoutes)
│   │   ├── routes.tsx                   # 📍 Định nghĩa tất cả routes của app
│   │   └── PrivateRoute.tsx             # 🔒 Auth guard (kiểm tra đăng nhập)
│   │
│   └── App.tsx                          # 🏠 Root component (kết hợp providers + router)
│
├── 🎨 layouts/                          # Layout templates
│   └── AdminLayout/                     # Layout chính cho trang quản trị
│       ├── index.tsx                    # 📐 MainLayout - Wrapper chứa Sidebar + Header + <Outlet />
│       ├── Sidebar.tsx                  # 📋 Menu navigation bên trái
│       └── Header.tsx                   # 🎯 Header trên cùng (user info, notifications, language)
│
├── ⚡ features/                         # Domain-based modules (Modules theo domain)
│   │
│   ├── auth/                            # 🔐 Module Authentication
│   │   ├── pages/                       # Các trang
│   │   │   ├── LoginPage.tsx            # Trang đăng nhập
│   │   │   └── RegisterPage.tsx         # Trang đăng ký
│   │   ├── components/                  # Components riêng cho auth
│   │   │   └── LoginForm.tsx            # Form đăng nhập
│   │   ├── api/                         # API calls
│   │   │   └── authApi.ts               # signin(), signup(), logout()
│   │   ├── store/                       # Zustand store
│   │   │   └── authStore.ts             # Lưu token, user, isAuthenticated
│   │   ├── hooks/                       # Custom hooks
│   │   │   └── useAuth.ts               # Hook xử lý auth logic
│   │   ├── types/                       # TypeScript types
│   │   │   └── auth.types.ts            # User, LoginCredentials, AuthResponse
│   │   └── index.ts                     # Export public API
│   │
│   ├── products/                        # 📦 Module Quản lý sản phẩm
│   │   ├── pages/
│   │   │   └── ProductsPage.tsx         # Trang danh sách sản phẩm
│   │   ├── components/
│   │   │   ├── ProductTable.tsx         # Bảng hiển thị sản phẩm
│   │   │   ├── ProductModal.tsx         # Modal xem/thêm/sửa sản phẩm
│   │   │   └── ProductForm.tsx          # Form nhập liệu sản phẩm
│   │   ├── api/
│   │   │   └── productApi.ts            # CRUD functions (get, create, update, delete)
│   │   ├── hooks/
│   │   │   └── useProducts.ts           # TanStack Query hooks
│   │   ├── types/
│   │   │   └── product.types.ts         # IProduct, CreateProductData, UpdateProductData
│   │   └── index.ts
│   │
│   ├── collaborators/                   # 👥 Module Quản lý cộng tác viên
│   │   ├── pages/
│   │   │   └── CollaboratorsPage.tsx    # Trang quản lý CTV
│   │   ├── hooks/
│   │   │   └── useCollaborators.ts      # Query hooks
│   │   ├── types/
│   │   │   └── collaborator.types.ts    # Collaborator types
│   │   └── index.ts
│   │
│   └── ...                              # Các features khác (orders, warehouse, etc.)
│
├── 🔧 services/                         # Infrastructure Layer (Lớp hạ tầng)
│   ├── axios.instance.ts                # 🌐 Axios instance với config
│   │                                    #    - baseURL, timeout
│   │                                    #    - Request interceptor: Tự động thêm Authorization header
│   │                                    #    - Response interceptor: Xử lý lỗi 401, network errors
│   ├── handleApi.ts                     # 🛡️ API wrapper function
│   │                                    #    - Wrap API calls, trả về { data, error, status }
│   └── types.ts                         # 📝 Common types (ApiResponse<T>)
│
├── 💾 stores/                           # Global Zustand Stores (State toàn cục)
│   └── ui.store.ts                      # 🎨 UI state
│                                        #    - sidebarCollapsed (đóng/mở sidebar)
│                                        #    - theme (light/dark)
│                                        #    - language (vi/en)
│                                        #    - Persist vào localStorage
│
├── 🎯 constants/                        # Constants & Configs (Hằng số & cấu hình)
│   ├── env.ts                           # 🔐 Environment variables
│   │                                    #    - ENV.API_URL
│   │                                    #    - ENV.NODE_ENV
│   │                                    #    - ENV.API_TIMEOUT
│   ├── routes.ts                        # 📍 Route path constants
│   │                                    #    - ROUTES.LOGIN, ROUTES.DASHBOARD, etc.
│   └── api-routes.ts                    # 🔗 API endpoint constants
│                                        #    - API_ENDPOINTS.AUTH.SIGNIN
│                                        #    - API_ENDPOINTS.PRODUCTS.LIST, etc.
│
├── 🎨 styles/                           # Global Styles
│   └── globals.css                      # 🌈 Global CSS
│                                        #    - Import Tailwind CSS
│                                        #    - CSS variables (:root)
│                                        #    - Ant Design overrides
│                                        #    - Custom utility classes
│                                        #    - Scrollbar styling
│
├── 🛠️ utils/                            # Utilities (Hàm tiện ích)
│   └── format.ts                        # 🔧 Helper functions
│                                        #    - cn(): Merge Tailwind classes (clsx + twMerge)
│                                        #    - Có thể thêm: formatDate, formatCurrency, etc.
│
├── 🧩 shared/                           # Shared Components
│   └── components/
│       └── ui/                          # Reusable UI components
│           ├── Button.tsx               # Button component
│           ├── Card.tsx                 # Card component
│           ├── Input.tsx                # Input component
│           └── index.ts                 # Export tất cả UI components
│
├── 📄 types/                            # Global TypeScript Types
│   └── index.d.ts                       # Global type declarations
│
├── index.css                            # 🎨 Tailwind CSS entry point
├── main.tsx                             # 🚀 App bootstrap entry point
└── vite-env.d.ts                        # Vite type definitions

```

---

## Chi tiết từng thư mục

### 📦 `src/app/` - App Shell

> **Mục đích**: Khởi tạo và cấu hình ứng dụng (providers, routing, root component)

#### **Các files trong `app/providers/`**

| File | Chức năng | Khi nào sửa | Ví dụ code |
|------|-----------|-------------|------------|
| `QueryProvider.tsx` | Cấu hình TanStack Query:<br>- `staleTime`: Thời gian cache<br>- `retry`: Số lần retry khi lỗi<br>- `refetchOnWindowFocus`: Tự động refetch khi focus window | • Đổi thời gian cache<br>• Đổi số lần retry<br>• Thêm config khác | `staleTime: 5 * 60 * 1000` |
| `AntdProvider.tsx` | Cấu hình theme Ant Design:<br>- `colorPrimary`: Màu chủ đạo<br>- `borderRadius`: Bo góc<br>- `fontFamily`: Font chữ<br>- Locale (vi/en) | • Đổi màu chủ đạo<br>• Đổi font chữ<br>• Custom component styles | `colorPrimary: '#F97316'` |

#### **Các files trong `app/router/`**

| File | Chức năng | Khi nào sửa |
|------|-----------|-------------|
| `routes.tsx` | **Định nghĩa tất cả routes**:<br>- Public routes (login, register)<br>- Protected routes (dashboard, products)<br>- Nested routes (warehouse/inventory)<br>- 404 fallback | • Thêm route mới<br>• Đổi path<br>• Thêm nested route |
| `index.tsx` | **Router component**:<br>- Sử dụng `useRoutes` hook<br>- Render routes từ config | Hiếm khi sửa |
| `PrivateRoute.tsx` | **Auth guard**:<br>- Kiểm tra `isAuthenticated`<br>- Redirect về `/login` nếu chưa đăng nhập | • Đổi logic kiểm tra auth<br>• Thêm permission check |

#### **File `app/App.tsx`**

**Chức năng**: Root component, kết hợp tất cả providers và router

**Cấu trúc**:
```tsx
<QueryProvider>
  <AntdProvider>
    <Router />
  </AntdProvider>
</QueryProvider>
```

**Khi nào sửa**: Thêm provider mới (Error Boundary, i18n Provider, etc.)

---

### 🎨 `src/layouts/` - Layouts

> **Mục đích**: Templates cho các nhóm pages (admin, auth, public)

#### **`layouts/AdminLayout/`**

| File | Chức năng | Khi nào sửa |
|------|-----------|-------------|
| `index.tsx` | **MainLayout wrapper**:<br>- Chứa Sidebar + Header<br>- Render `<Outlet />` cho child routes<br>- Quản lý collapse state | • Đổi layout structure<br>• Thêm footer<br>• Đổi cách arrange components |
| `Sidebar.tsx` | **Navigation menu**:<br>- Danh sách menu items<br>- Active route highlighting<br>- Collapse/expand<br>- Logo | • Thêm/bớt menu items<br>• Đổi icon<br>• Đổi logo |
| `Header.tsx` | **Top header**:<br>- User info + avatar<br>- Notifications badge<br>- Language selector<br>- Settings dropdown | • Thêm items vào header<br>• Đổi user menu<br>• Thêm search bar |

---

### ⚡ `src/features/` - Domain Modules

> **Mục đích**: Tổ chức code theo domain/feature. Mỗi feature tự chứa logic riêng, dễ maintain và scale.

#### **Cấu trúc chuẩn mỗi feature**

```
feature-name/
├── pages/           # Page components
├── components/      # Feature-specific components
├── api/             # API calls
├── hooks/           # Custom hooks (TanStack Query)
├── store/           # Zustand store (optional)
├── types/           # TypeScript types
└── index.ts         # Export public API
```

#### **Feature `auth/` - Authentication**

| Thư mục/File | Chức năng |
|--------------|-----------|
| `pages/LoginPage.tsx` | Form đăng nhập với validation |
| `pages/RegisterPage.tsx` | Form đăng ký tài khoản |
| `api/authApi.ts` | `signin()`, `signup()`, `logout()` functions |
| `store/authStore.ts` | Zustand store: `token`, `user`, `isAuthenticated`, `login()`, `logout()` |
| `types/auth.types.ts` | `User`, `LoginCredentials`, `RegisterData`, `AuthResponse` |

#### **Feature `products/` - Quản lý sản phẩm**

| Thư mục/File | Chức năng |
|--------------|-----------|
| `pages/ProductsPage.tsx` | Trang danh sách + actions (search, filter, create) |
| `components/ProductTable.tsx` | Table hiển thị với pagination |
| `components/ProductModal.tsx` | Modal xem/thêm/sửa |
| `components/ProductForm.tsx` | Form inputs cho product |
| `api/productApi.ts` | CRUD: `getAll()`, `getById()`, `create()`, `update()`, `delete()` |
| `hooks/useProducts.ts` | TanStack Query hooks: `useProducts()`, `useProduct()`, `useCreateProduct()`, etc. |
| `types/product.types.ts` | `IProduct`, `CreateProductData`, `UpdateProductData` |

#### **Quy tắc khi thêm feature mới**

1. Tạo folder trong `features/`
2. Copy cấu trúc chuẩn (pages, components, api, hooks, types)
3. Implement từng layer từ dưới lên: types → api → hooks → components → pages
4. Export qua `index.ts`
5. Thêm route vào `app/router/routes.tsx`
6. Thêm menu item vào `layouts/AdminLayout/Sidebar.tsx`

---

### 🔧 `src/services/` - Infrastructure Layer

> **Mục đích**: Services dùng chung cho toàn app (HTTP client, error handling, logging)

| File | Chức năng Chi tiết | Khi nào sửa |
|------|-------------------|-------------|
| `axios.instance.ts` | **Axios instance config**:<br>• `baseURL`: API base URL<br>• `timeout`: Request timeout<br>• **Request Interceptor**: Tự động thêm Authorization header từ localStorage<br>• **Response Interceptor**: Xử lý lỗi 401 (redirect login), network errors | • Đổi baseURL/timeout<br>• Thêm logic xử lý lỗi<br>• Thêm custom headers<br>• Log requests |
| `handleApi.ts` | **API wrapper function**:<br>• Wrap API calls để có error handling chuẩn<br>• Return `{ data, error, status }`<br>• Dễ dàng handle errors ở component | • Thêm logic xử lý response<br>• Transform data |
| `types.ts` | **Common API types**:<br>• `ApiResponse<T>`<br>• `PaginatedResponse<T>`<br>• `ApiError` | Thêm common types |

**Ví dụ sử dụng**:
```typescript
// Trong feature/products/api/productApi.ts
import { apiClient } from '@/services/axios.instance';
import { API_ENDPOINTS } from '@/constants/api-routes';

export const productApi =  {
  getAll: () => apiClient.get(API_ENDPOINTS.PRODUCTS.LIST),
};
```

---

### 💾 `src/stores/` - Global Stores

> **Mục đích**: Zustand stores cho **client state toàn cục** (không liên quan đến API data)

> ⚠️ **Lưu ý**: Server state (data từ API) nên dùng TanStack Query, KHÔNG lưu vào Zustand!

| File | State | Actions | Persist? |
|------|-------|---------|----------|
| `ui.store.ts` | • `sidebarCollapsed`<br>• `theme`<br>• `language` | • `toggleSidebar()`<br>• `setTheme()`<br>• `setLanguage()` | ✅ localStorage |

**Khi nào tạo store mới**:
- Cần global UI state (theme, language, notifications)
- Cần persist state vào localStorage
- State KHÔNG đến từ API

**Khi nào KHÔNG dùng Zustand**:
- Data từ API → Dùng TanStack Query
- Local component state → Dùng `useState`
- Form state → Dùng React Hook Form hoặc `useState`

---

### 🎯 `src/constants/` - Constants & Configs

> **Mục đích**: Tập trung hằng số, config để dễ quản lý và tránh hard-code

| File | Chứa gì | Ví dụ | Khi nào sửa |
|------|---------|-------|-------------|
| `env.ts` | Environment variables | `ENV.API_URL = 'http://localhost:3000'`<br>`ENV.API_TIMEOUT = 10000` | • Thêm env var mới<br>• Đổi default values |
| `routes.ts` | Route path constants | `ROUTES.LOGIN = '/login'`<br>`ROUTES.PRODUCTS = '/products'` | Thêm route constant |
| `api-routes.ts` | API endpoint constants | `API_ENDPOINTS.PRODUCTS.LIST = '/products'`<br>`API_ENDPOINTS.AUTH.SIGNIN = '/signin'` | Thêm endpoint mới |

**Lợi ích**:
```typescript
// ❌ Bad - Hard code
navigate('/products');
apiClient.get('/api/products');

// ✅ Good - Sử dụng constants
navigate(ROUTES.PRODUCTS);
apiClient.get(API_ENDPOINTS.PRODUCTS.LIST);
```

---

### 🛠️ `src/utils/` - Utilities

> **Mục đích**: Helper functions dùng chung

| File | Functions | Ví dụ |
|------|-----------|-------|
| `format.ts` | • `cn()`: Merge Tailwind classes<br>• `formatDate()`<br>• `formatCurrency()`<br>• `truncate()` | `cn('text-sm', isActive && 'font-bold')` |

**Khi nào thêm vào utils**:
- Function sử dụng ở nhiều nơi
- Pure function (không side effects)
- Không liên quan đến business logic

---

### 🎨 `src/styles/` - Styles

| File | Chứa gì | Khi nào sửa |
|------|---------|-------------|
| `globals.css` | • Import Tailwind CSS<br>• CSS variables (`:root`)<br>• Ant Design overrides<br>• Custom utility classes<br>• Scrollbar styling | • Đổi màu chủ đạo (`:root` variables)<br>• Custom Ant Design styles<br>• Thêm global styles |

**Ví dụ CSS variables**:
```css
:root {
  --color-primary: #F97316;
  --color-primary-hover: #EA580C;
  --color-background: #F9FAFB;
}
```

---

### 🧩 `src/shared/` - Shared Components

> **Mục đích**: Components UI tái sử dụng, không thuộc domain cụ thể

```
shared/
└── components/
    └── ui/              # Primitive UI components
        ├── Button.tsx
        ├── Card.tsx
        ├── Input.tsx
        └── ...
```

**Khi nào thêm vào shared**:
- Component dùng ở nhiều features
- Không chứa business logic
- Reusable, generic

---

## Hướng dẫn sửa code

### 🎯 Tôi muốn thêm trang mới?

**Ví dụ: Thêm trang "Quản lý đơn hàng"**

1. **Tạo feature structure**:
   ```
   src/features/orders/
   ├── pages/OrdersPage.tsx
   ├── components/OrderTable.tsx
   ├── api/orders.api.ts
   ├── hooks/useOrders.ts
   ├── types/order.types.ts
   └── index.ts
   ```

2. **Thêm vào constants** (`src/constants/`):
   ```typescript
   // routes.ts
   ORDERS: '/orders'
   
   // api-routes.ts
   ORDERS: {
     LIST: '/orders',
     DETAIL: (id) => `/orders/${id}`
   }
   ```

3. **Thêm route** (`src/app/router/routes.tsx`):
   ```typescript
   {
     path: 'orders',
     element: <OrdersPage />
   }
   ```

4. **Thêm menu** (`src/layouts/AdminLayout/Sidebar.tsx`):
   ```typescript
   { 
     key: '/orders', 
     icon: <ShoppingCartOutlined />, 
     label: 'Quản lý đơn hàng' 
   }
   ```

---

### 🎨 Tôi muốn đổi màu theme?

1. **Đổi màu Ant Design** → Sửa `src/app/providers/AntdProvider.tsx`:
   ```typescript
   colorPrimary: '#1677ff' // Đổi từ #F97316
   ```

2. **Đổi CSS variables** → Sửa `src/styles/globals.css`:
   ```css
   :root {
     --color-primary: #1677ff;
     --color-primary-hover: #0958d9;
   }
   ```

---

### 📡 Tôi muốn thêm API endpoint mới?

1. **Thêm vào constants** (`src/constants/api-routes.ts`):
   ```typescript
   export const API_ENDPOINTS = {
     // ...
     ORDERS: {
       LIST: '/orders',
       DETAIL: (id: string) => `/orders/${id}`,
       CREATE: '/orders',
     }
   };
   ```

2. **Tạo API functions** (trong feature's `api/` folder):
   ```typescript
   // features/orders/api/orders.api.ts
   import { apiClient } from '@/services/axios.instance';
   import { API_ENDPOINTS } from '@/constants/api-routes';
   
   export const ordersApi = {
     getAll: () => apiClient.get(API_ENDPOINTS.ORDERS.LIST),
     getById: (id: string) => apiClient.get(API_ENDPOINTS.ORDERS.DETAIL(id)),
   };
   ```

3. **Tạo hooks** (trong feature's `hooks/` folder):
   ```typescript
   // features/orders/hooks/useOrders.ts
   import { useQuery } from '@tanstack/react-query';
   import { ordersApi } from '../api/orders.api';
   
   export const useOrders = () => {
     return useQuery({
       queryKey: ['orders'],
       queryFn: ordersApi.getAll,
     });
   };
   ```

---

### 💾 Tôi muốn thêm global state?

**Server state (từ API)** → ✅ Dùng TanStack Query (trong feature's `hooks/`)

**Client state (UI)** → ✅ Dùng Zustand (trong `stores/`)

**Ví dụ thêm notification store**:

```typescript
// src/stores/notification.store.ts
import { create } from 'zustand';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) => {
    const id = Date.now().toString();
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }]
    }));
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }));
  },
}));
```

---

### 🔧 Tôi muốn thêm utility function?

Thêm vào `src/utils/format.ts`:

```typescript
// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

// Format date
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('vi-VN').format(new Date(date));
}
```

---

## Import Paths

### Alias `@/` Config

TypeScript và Vite đã được config sẵn alias `@/` → `src/`

| Import | Thực tế trỏ đến |
|--------|----------------|
| `@/app/...` | `src/app/...` |
| `@/features/...` | `src/features/...` |
| `@/services/...` | `src/services/...` |
| `@/constants/...` | `src/constants/...` |
| `@/layouts/...` | `src/layouts/...` |
| `@/stores/...` | `src/stores/...` |
| `@/utils/...` | `src/utils/...` |
| `@/shared/...` | `src/shared/...` |

### Best Practices

```typescript
// ✅ GOOD - Dùng alias
import { apiClient } from '@/services/axios.instance';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/features/auth/store/authStore';
import { cn } from '@/utils/format';

// ❌ BAD - Relative paths
import { apiClient } from '../../../services/axios.instance';
import { ROUTES } from '../../constants/routes';
```

---

## 📝 Bảng tóm tắt nhanh

| Tôi muốn... | Sửa file nào | Thư mục |
|-------------|--------------|---------|
| Thêm trang mới | Tạo feature folder → routes.tsx → Sidebar.tsx | `features/`, `app/router/`, `layouts/` |
| Đổi màu theme | AntdProvider.tsx, globals.css | `app/providers/`, `styles/` |
| Thêm API endpoint | api-routes.ts → feature's api/ | `constants/`, `features/[name]/api/` |
| Thêm menu item | Sidebar.tsx | `layouts/AdminLayout/` |
| Thêm global UI state | Tạo store mới | `stores/` |
| Fetch data từ API | Tạo hook trong feature | `features/[name]/hooks/` |
| Thêm utility function | format.ts | `utils/` |
| Custom Ant Design | globals.css | `styles/` |
| Thay đổi routing | routes.tsx | `app/router/` |
| Đổi baseURL API | env.ts hoặc `.env` file | `constants/` |

---

## 🎓 Nguyên tắc quan trọng

### 1. **Feature-First Organization**
- Code được tổ chức theo domain/feature, KHÔNG phải theo type (components, hooks, api)
- Mỗi feature tự quản lý logic riêng → Dễ maintain, scale

### 2. **Separation of Concerns**
- **Server State** (API data) → TanStack Query
- **Client State** (UI state) → Zustand
- **Form State** → React Hook Form hoặc `useState`

### 3. **Single Source of Truth**
- Routes → `constants/routes.ts`
- API endpoints → `constants/api-routes.ts`
- Env vars → `constants/env.ts`

### 4. **Import Alias**
- LUÔN dùng `@/` thay vì relative paths
- Dễ refactor, dễ đọc

### 5. **Types Safety**
- Mọi API response đều có TypeScript types
- Types nằm trong feature's `types/` folder

---

**Author**: HoangPhuc  
**Last Updated**: 04-02-2026  
**Version**: 2.0
