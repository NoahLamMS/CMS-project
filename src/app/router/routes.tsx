import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../../features/auth/pages/LoginPage";
import MainLayout from "../../layouts/MainLayout";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import ProductsPage from "../../features/products/pages/ProductsPage";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
    ],
  },
];
