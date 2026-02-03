# CMS Project - Hệ thống quản lý bán hàng (Fullstack)

Hệ thống CMS quản lý bán hàng````````` toàn diện với Frontend React/Vite và Backend Node.js/Express.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18, Vite 6.0
- **Language**: TypeScript
- **UI Libraries**: Ant Design 5, Tailwind CSS v4
- **State Management**: Zustand (Client), TanStack Query (Server)
- **Routing**: React Router v6
- **HTTP Client**: Axios

### Backend (`ecommerce-nodejs`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, cors

## 📁 Project Structure

```
CMS-project/
├── ecommerce-nodejs/     # Backend Server
│   ├── src/
│   │   ├── config/       # DB Connection
│   │   ├── controllers/  # Route Logic
│   │   ├── middleware/   # Auth Middleware
│   │   ├── model/        # Mongoose Models
│   │   └── routers/      # API Routes
│   └── package.json
│
├── src/                  # Frontend Client
│   ├── features/         # Feature Modules
│   │   ├── auth/         # Login, Register pages & logic
│   │   ├── products/     # Product CRUD & UI
│   │   └── ...
│   ├── core/             # API Config & Envs
│   ├── shared/           # Common components
│   └── App.tsx
└── README.md
```

## ✅ Implemented Features

### 🔐 Authentication
- **Đăng ký (Register)**: Tạo tài khoản mới, validate dữ liệu.
- **Đăng nhập (Login)**: Xác thực, nhận JWT token, lưu trữ vào localStorage.
- **Protected Routes**: Chuyển hướng nếu chưa đăng nhập.

### 📦 Products Management (Full CRUD)
- **Danh sách**: Hiển thị sản phẩm từ Database, phân trang server-side.
- **Xem chi tiết**: Modal hiển thị thông tin đầy đủ.
- **Thêm mới**: Form tạo sản phẩm mới.
- **Chỉnh sửa**: Cập nhật thông tin sản phẩm.
- **Xóa**: Xóa mềm/cứng sản phẩm có xác nhận.
- **Tìm kiếm**: Tìm kiếm theo tên sản phẩm realtime.

### 👥 Collaborators Management
- Quản lý danh sách cộng tác viên (UI-only currently).

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

Mở terminal mới:
```bash
# Tại thư mục gốc CMS-project
npm install
npm run dev
```
Frontend sẽ chạy tại `http://localhost:6868`

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

## 📖 Routes

| Path | Page |
|------|------|
| `/login` | Trang Đăng nhập |
| `/register` | Trang Đăng ký |
| `/dashboard` | Tổng quan hệ thống |
| `/products` | Quản lý sản phẩm |
| `/collaborators` | Quản lý cộng tác viên |

## 👤 Author

**HoangPhuc**
- Created: 03-02-2026
- Last Updated: 03-02-2026
