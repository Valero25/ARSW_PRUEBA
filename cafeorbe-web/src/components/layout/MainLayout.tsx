import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-coffee-950">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
};
