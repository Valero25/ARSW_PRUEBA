import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { CartProvider } from "./context/CartContext";
import { AuctionProvider } from "./context/AuctionContext";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <CartProvider>
            <AuctionProvider>
              <AppRoutes />
            </AuctionProvider>
          </CartProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
