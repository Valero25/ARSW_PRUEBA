import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { CatalogPage } from "../pages/CatalogPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { AuctionsPage } from "../pages/AuctionsPage";
import { AuctionRoomPage } from "../pages/AuctionRoomPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { UserProfilePage } from "../pages/UserProfilePage";
import { AdminDashboardPage } from "../pages/AdminDashboardPage";
import { LoginPage, RegisterPage } from "../pages/AuthPages";
import { MainLayout } from "../components/layout/MainLayout";
import { RequireAuth } from "./RequireAuth";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <LandingPage />
          </MainLayout>
        }
      />
      <Route
        path="/productos"
        element={
          <MainLayout>
            <CatalogPage />
          </MainLayout>
        }
      />
      <Route
        path="/productos/:id"
        element={
          <MainLayout>
            <ProductDetailPage />
          </MainLayout>
        }
      />
      <Route
        path="/subastas"
        element={
          <MainLayout>
            <AuctionsPage />
          </MainLayout>
        }
      />
      <Route
        path="/subastas/:id"
        element={
          <MainLayout>
            <AuctionRoomPage />
          </MainLayout>
        }
      />
      <Route
        path="/carrito"
        element={
          <MainLayout>
            <CartPage />
          </MainLayout>
        }
      />
      <Route
        path="/checkout"
        element={
          <MainLayout>
            <CheckoutPage />
          </MainLayout>
        }
      />
      <Route
        path="/perfil"
        element={
          <RequireAuth>
            <UserProfilePage />
          </RequireAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminDashboardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <LoginPage />
          </MainLayout>
        }
      />
      <Route
        path="/registro"
        element={
          <MainLayout>
            <RegisterPage />
          </MainLayout>
        }
      />
      {/* Wildcard redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
