# CMS Project - Hệ thống quản lý bán hàng (Fullstack)

Hệ thống CMS quản lý bán hàng toàn diện với Frontend React/Vite và Backend Node.js/Express.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Libraries**: Ant Design v5, Tailwind CSS v4
- **State Management**: 
  - TanStack Query (Server state)
  - Zustand (Client/UI state)
- **Routing**: React Router v6 (Browser Router)
- **HTTP Client**: Axios

### Backend (`ecommerce-nodejs`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, cors

## 📁 Cấu trúc dự án (Project Structure)

### Tổng quan thư mục

```
src/
├── app/                         # App shell (bootstrap)
│   ├── providers/               # Global providers
│   │   ├── QueryProvider.tsx    # TanStack Query setup
│   │   └── AntdProvider.tsx     # Ant Design theme config
│   │
│   ├── router/                  # Routing system
│   │   ├── index.tsx            # useRoutes hook
│   │   ├── routes.tsx           # Route definitions
│   │   └── PrivateRoute.tsx     # Auth guard
│   │
│   └── App.tsx                  # Root App component
│
├── layouts/                     # Layout components
│   ├── AdminLayout/             # Main admin layout
│   │   ├── index.tsx            # Layout wrapper
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   └── Header.tsx           # Top header
│   │
│   └── AuthLayout/              # Login layout (future)
│
├── features/                    # Domain-based modules
│   ├── auth/                    # Authentication feature
│   │   ├── pages/               # Login, Register pages
│   │   ├── api/                 # Auth API calls
│   │   ├── store/               # Auth state (Zustand)
│   │   ├── types/               # Auth types
│   │   └── hooks/               # Auth hooks
│   │
│   ├── products/                # Product management
│   │   ├── pages/               # Products page
│   │   ├── components/          # Product components
│   │   ├── api/                 # Product API
│   │   ├── types/               # Product types
│   │   └── hooks/               # Product hooks
│   │
│   └── collaborators/           # Collaborators management
│       ├── pages/
│       ├── hooks/
│       └── types/
│
├── services/                    # Infrastructure layer
│   ├── axios.instance.ts        # Axios config + interceptors
│   ├── handleApi.ts             # API call wrapper
│   └── types.ts                 # Common API types
│
├── stores/                      # Global Zustand stores
│   └── ui.store.ts              # UI state (sidebar, theme, language)
│
├── constants/                   # Constants & configs
│   ├── env.ts                   # Environment variables
│   ├── routes.ts                # Route path constants
│   └── api-routes.ts            # API endpoint constants
│
├── styles/
│   └── globals.css              # Global CSS + Tailwind customizations
│
├── utils/                       # Helper utilities
│   └── format.ts                # Utility functions (cn, etc.)
│
├── shared/                      # Shared components (UI components)
│   └── components/
│       └── ui/                  # Reusable UI components
│
├── index.css                    # Tailwind entry point
└── main.tsx                     # App bootstrap entry
```

---

## 📂 Chi tiết từng thư mục

### 1. `src/app/` - App Shell
**Mục đích**: Khởi tạo và cấu hình ứng dụng

#### `app/providers/`
Chứa các Provider components cho context toàn cục:
- **`QueryProvider.tsx`**: Cấu hình TanStack Query (staleTime, retry, etc.)
- **`AntdProvider.tsx`**: Theme và locale của Ant Design

#### `app/router/`
Hệ thống routing:
- **`routes.tsx`**: Định nghĩa tất cả routes (export `routes` array)
- **`index.tsx`**: Component Router sử dụng `useRoutes` hook
- **`PrivateRoute.tsx`**: Guard component kiểm tra authentication

#### `app/App.tsx`
Root component, wrap các providers và router:
```tsx
<QueryProvider>
  <AntdProvider>
    <Router />
  </AntdProvider>
</QueryProvider>
```

---

### 2. `src/layouts/` - Layouts
**Mục đích**: Các layout templates cho các nhóm pages

#### `layouts/AdminLayout/`
Layout chính cho trang quản trị:
- **`index.tsx`**: MainLayout - Wrapper chứa Sidebar + Header + `<Outlet />`
- **`Sidebar.tsx`**: Navigation menu bên trái
- **`Header.tsx`**: Header với notifications, user menu, language selector

> **Khi nào sửa**: 
> - Thay đổi menu → sửa `Sidebar.tsx`
> - Thêm/bớt items trong header → sửa `Header.tsx`

---

### 3. `src/features/` - Domain Modules
**Mục đích**: Tổ chức code theo domain/feature, mỗi folder tự chứa logic riêng

#### Cấu trúc chung mỗi feature:
```
feature-name/
├── pages/          # Page components
├── components/     # Feature-specific components
├── api/            # API calls cho feature này
├── hooks/          # Custom hooks
├── store/          # Zustand store (nếu cần)
├── types/          # TypeScript types
└── index.ts        # Export public API
```

#### `features/auth/`
Quản lý authentication:
- **`pages/LoginPage.tsx`**: Trang đăng nhập
- **`pages/RegisterPage.tsx`**: Trang đăng ký
- **`api/authApi.ts`**: Các hàm gọi API login/register
- **`store/auth.store.ts`**: Zustand store lưu token, user info
- **`types/auth.types.ts`**: Interface `User`, `LoginCredentials`, etc.

#### `features/products/`
Quản lý sản phẩm:
- **`pages/ProductsPage.tsx`**: Trang danh sách sản phẩm
- **`components/`**: ProductTable, ProductModal, ProductForm, etc.
- **`api/productApi.ts`**: CRUD operations
- **`types/product.types.ts`**: Interface `IProduct`, `CreateProductData`
- **`hooks/useProducts.ts`**: TanStack Query hooks

> **Khi nào sửa**:
> - Thêm feature mới → Tạo folder mới trong `features/`
> - Sửa logic API → Sửa file trong `api/`
> - Thay đổi UI → Sửa file trong `pages/` hoặc `components/`

---

### 4. `src/services/` - Infrastructure Layer
**Mục đích**: Các service dùng chung cho toàn app

- **`axios.instance.ts`**: 
  - Axios instance với `baseURL`, `timeout`
  - Request interceptor: Tự động thêm Authorization header
  - Response interceptor: Xử lý lỗi 401, network errors
  
- **`handleApi.ts`**: 
  - Wrapper function để handle API calls
  - Trả về `{ data, error, status }`
  
- **`types.ts`**: 
  - Interface `ApiResponse<T>`

> **Khi nào sửa**:
> - Thay đổi baseURL hoặc timeout → `axios.instance.ts`
> - Thêm logic xử lý lỗi chung → `axios.instance.ts`

---

### 5. `src/stores/` - Global Stores
**Mục đích**: Zustand stores cho state toàn cục (không liên quan server data)

- **`ui.store.ts`**: 
  - Sidebar collapsed state
  - Theme (light/dark)
  - Language (vi/en)
  - Persist vào localStorage

> **Khi nào sửa**:
> - Thêm global UI state → Sửa `ui.store.ts`
> - Cần store mới → Tạo file mới trong `stores/`

---

### 6. `src/constants/` - Constants & Configs
**Mục đích**: Các hằng số, config tập trung

- **`env.ts`**: 
  - `ENV.API_URL`, `ENV.NODE_ENV`, `ENV.API_TIMEOUT`
  - Đọc từ `import.meta.env.VITE_*`
  
- **`routes.ts`**: 
  - `ROUTES.LOGIN`, `ROUTES.DASHBOARD`, etc.
  - Tránh hard-code đường dẫn
  
- **`api-routes.ts`**: 
  - `API_ENDPOINTS.AUTH.SIGNIN`, `API_ENDPOINTS.PRODUCTS.LIST`, etc.

> **Khi nào sửa**:
> - Thêm route mới → `routes.ts`
> - Thêm API endpoint → `api-routes.ts`
> - Đổi API URL → File `.env` hoặc `env.ts`

---

### 7. `src/utils/` - Utilities
**Mục đích**: Helper functions dùng chung

- **`format.ts`**: 
  - `cn()`: Merge Tailwind classes (clsx + tailwind-merge)
  - Có thể thêm: formatDate, formatCurrency, etc.

> **Khi nào sửa**:
> - Thêm utility function mới → `format.ts` hoặc tạo file mới

---

### 8. `src/styles/` - Styles
**Mục đích**: CSS toàn cục

- **`globals.css`**: 
  - Import Tailwind
  - CSS variables (`:root`)
  - Ant Design overrides
  - Custom utility classes

> **Khi nào sửa**:
> - Đổi màu chủ đạo → `:root` variables
> - Custom Ant Design → Override classes

---

### 9. `src/shared/` - Shared Components
**Mục đích**: Components tái sử dụng không thuộc domain cụ thể

- **`components/ui/`**: Button, Card, Input, etc.

> **Khi nào sửa**:
> - Tạo component UI mới → Thêm vào `shared/components/ui/`

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/signup` | Đăng ký tài khoản | Public |
| POST | `/api/signin` | Đăng nhập lấy Token | Public |
| GET | `/api/products` | Lấy danh sách sản phẩm | Public |
| GET | `/api/products/:id` | Lấy chi tiết sản phẩm | Public |
| POST | `/api/products` | Tạo sản phẩm mới | Admin |
| PUT | `/api/products/:id` | Cập nhật sản phẩm | Admin |
| DELETE | `/api/products/:id` | Xóa sản phẩm | Admin |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB (đang chạy tại `mongodb://localhost:27017`)

### 1. Start Backend

```bash
cd ecommerce-nodejs
npm install
npm run dev
```
Backend sẽ chạy tại `http://localhost:3000`

### 2. Start Frontend

```bash
# Tại thư mục gốc CMS-project
npm install
npm run dev
```
Frontend sẽ chạy tại `http://localhost:6868`

---

## 📖 Routes

| Path | Page |
|------|------|
| `/login` | Trang Đăng nhập |
| `/register` | Trang Đăng ký |
| `/dashboard` | Tổng quan hệ thống |
| `/products` | Quản lý sản phẩm |
| `/collaborators` | Quản lý cộng tác viên |
| `/drivers` | Quản lý tài xế |
| `/warehouse/*` | Quản lý kho |
| `/orders` | Xử lý đơn hàng |
| `/marketing` | Tiếp thị & Khuyến mãi |
| `/customers` | Quản lý khách hàng |
| `/messages` | Tin nhắn |
| `/settings` | Cài đặt |
| `/profile` | Tài khoản |

---

## ✅ Implemented Features

### 🔐 Authentication
- **Đăng ký (Register)**: Tạo tài khoản mới, validate dữ liệu
- **Đăng nhập (Login)**: Xác thực, nhận JWT token, lưu vào localStorage
- **Protected Routes**: Chuyển hướng nếu chưa đăng nhập

### 📦 Products Management (Full CRUD)
- **Danh sách**: Hiển thị sản phẩm từ Database, phân trang
- **Xem chi tiết**: Modal hiển thị thông tin đầy đủ
- **Thêm mới**: Form tạo sản phẩm
- **Chỉnh sửa**: Cập nhật thông tin
- **Xóa**: Xóa sản phẩm có xác nhận
- **Tìm kiếm**: Tìm kiếm theo tên realtime

### 👥 Collaborators Management
- Quản lý danh sách cộng tác viên

---

## 🎯 Hướng dẫn sửa code

### Khi muốn thêm một trang mới:
1. Tạo folder trong `src/features/feature-name/`
2. Tạo `pages/FeatureNamePage.tsx`
3. Tạo API calls trong `api/featureName.api.ts`
4. Thêm route vào `src/app/router/routes.tsx`
5. Thêm menu item vào `src/layouts/AdminLayout/Sidebar.tsx`

### Khi muốn thay đổi theme/màu sắc:
1. Sửa `src/app/providers/AntdProvider.tsx` (Ant Design theme)
2. Sửa `src/styles/globals.css` (CSS variables)

### Khi muốn thêm API endpoint mới:
1. Thêm vào `src/constants/api-routes.ts`
2. Tạo function trong feature's `api/` folder
3. Sử dụng `apiClient` từ `src/services/axios.instance.ts`

### Khi muốn thêm state toàn cục:
- **Server state** (API data): Dùng TanStack Query trong feature's `hooks/`
- **Client state** (UI): Dùng Zustand, tạo store trong `src/stores/`

---

## 👤 Author

**HoangPhuc**
- Created: 03-02-2026
- Last Updated: 04-02-2026
