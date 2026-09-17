import React, { createContext, useContext, useState, useEffect } from "react";
import { ItemCarrito, Producto } from "../types";
import { useNotification } from "./NotificationContext";

interface CartContextType {
  items: ItemCarrito[];
  totalCantidad: number;
  subtotal: number;
  costoEnvio: number;
  total: number;
  agregarProducto: (producto: Producto, cantidad?: number) => void;
  removerProducto: (productoId: string) => void;
  actualizarCantidad: (productoId: string, cantidad: number) => void;
  limpiarCarrito: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ItemCarrito[]>(() => {
    const guardado = localStorage.getItem("cafeorbe_cart");
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch {
        // fallback
      }
    }
    return [];
  });

  const { mostrarToast } = useNotification();

  useEffect(() => {
    localStorage.setItem("cafeorbe_cart", JSON.stringify(items));
  }, [items]);

  const agregarProducto = (producto: Producto, cantidad = 1) => {
    setItems((prev) => {
      const index = prev.findIndex((i) => i.producto.id === producto.id);
      if (index > -1) {
        const nuevos = [...prev];
        const nuevaCant = nuevos[index].cantidad + cantidad;
        nuevos[index] = {
          ...nuevos[index],
          cantidad: nuevaCant,
          subtotal: nuevaCant * producto.precio,
        };
        return nuevos;
      } else {
        return [...prev, { producto, cantidad, subtotal: cantidad * producto.precio }];
      }
    });

    mostrarToast(
      "PUJA_EXITOSA",
      "Producto agregado al carrito",
      `${producto.lote.nombre} (${cantidad} un.) listo para ordenar.`
    );
  };

  const removerProducto = (productoId: string) => {
    setItems((prev) => prev.filter((i) => i.producto.id !== productoId));
    mostrarToast("INFO", "Producto eliminado", "El producto se retiró del carrito de compras.");
  };

  const actualizarCantidad = (productoId: string, cantidad: number) => {
    if (cantidad <= 0) {
      removerProducto(productoId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.producto.id === productoId
          ? { ...i, cantidad, subtotal: cantidad * i.producto.precio }
          : i
      )
    );
  };

  const limpiarCarrito = () => {
    setItems([]);
  };

  const subtotal = items.reduce((acc, i) => acc + i.subtotal, 0);
  const costoEnvio = items.length > 0 ? 12000 : 0; // Envío estándar nacional desde el Eje Cafetero
  const total = subtotal + costoEnvio;
  const totalCantidad = items.reduce((acc, i) => acc + i.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCantidad,
        subtotal,
        costoEnvio,
        total,
        agregarProducto,
        removerProducto,
        actualizarCantidad,
        limpiarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
