# CMS project - Hệ thống quản lý bán hàng

Hệ thống CMS quản lý bán hàng xây dựng với **Vite + React + TypeScript + Ant Design**.

## 🚀 Tech Stack

### Core
- **Vite 6.0** - Build tool & dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router v6** - Client-side routing

### State Management
- **Zustand** - Client state management
- **TanStack Query (React Query)** - Server state management

### UI Framework
- **Ant Design 5** - Enterprise UI components
- **Tailwind CSS v4** - Utility-first CSS framework

### API
- **Axios** - HTTP client

## 📁 Project Structure

```
src/
├── app/                  # Global styles
│   └── globals.css       # Tailwind + Ant Design customization
├── features/             # Feature-based modules
│   ├── auth/             # Authentication feature
│   ├── collaborators/    # Collaborators management
│   └── products/         # Products management
├── shared/               # Shared components
│   └── components/
│       └── layout/       # Layout components (Sidebar, Header, MainLayout)
├── core/                 # Core infrastructure
│   └── api/              # API client (Axios)
├── lib/                  # Library setup (React Query)
├── App.tsx               # Root component với Ant Design ConfigProvider
├── routes.tsx            # React Router configuration
└── main.tsx              # Application entry point
```

## ✅ Implemented Features

### Collaborators Management (Quản lý cộng tác viên)
- Danh sách cộng tác viên với Table
- Search by name/code
- Filter button
- Pagination
- Cột: Mã CTV, Tên CTV, Tổng đơn hàng, Tổng giá trị, % Hoa hồng, Cấp bậc, Hoa hồng nhận được
- Actions dropdown (View, Edit, Delete)

### Products Management (Quản lý sản phẩm)
- Danh sách sản phẩm với Table
- Tabs: Tất cả, Còn hàng, Hết hàng
- Search & Filter
- Pagination
- Cột: ID, Tên sản phẩm, Danh mục, Giá bán, Số lượng tồn kho, Trạng thái

### Layout System
- **Sidebar** - Navigation menu với các routes
- **Header** - Title, Language selector, Notifications, User dropdown
- **MainLayout** - Wrapper component with Outlet

## 📦 Feature Structure

Mỗi feature tuân theo cấu trúc:

```
features/{feature-name}/
├── pages/         # Page components
├── components/    # Feature-specific components
├── hooks/         # Custom hooks (useProducts, useCollaborators)
├── types/         # TypeScript interfaces & enums
└── index.ts       # Public API exports
```

### File Header Convention

Mỗi file đều có header description:

```typescript
/**
 * @file filename.ts
 * @description Description of the file
 * @author Kindy
 * @created 2025-11-16
 */
```

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Mở [http://localhost:6868](http://localhost:6868) để xem ứng dụng.

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎨 Styling

### Ant Design Theme
```typescript
const theme = {
    token: {
        colorPrimary: '#F97316', // Orange-500
        borderRadius: 8,
    },
    components: {
        Menu: {
            itemSelectedBg: '#FFF7ED',
            itemSelectedColor: '#EA580C',
        },
    },
};
```

### Tailwind CSS
Custom utilities và Ant Design overrides trong `src/app/globals.css`.

## 📖 Routes

| Path | Page |
|------|------|
| `/dashboard` | Tổng quan |
| `/products` | Quản lý sản phẩm |
| `/collaborators` | Quản lý cộng tác viên |
| `/drivers` | Quản lý tài xế |
| `/warehouse` | Quản lý kho |
| `/orders` | Xử lý đơn hàng |
| `/marketing` | Tiếp thị & Khuyến mãi |
| `/customers` | Quản lý khách hàng |
| `/messages` | Tin nhắn |
| `/settings` | Cài đặt |

## 👤 Author

**Kindy** - Created on 2025-11-16
