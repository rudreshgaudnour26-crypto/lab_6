import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AppRoutes from "./routes";
import { UserProvider } from "../features/user/context/UserContext";
import { CartProvider } from "../features/cart/context/CartContext";
import styles from "./App.module.css";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className={styles.app}>
          <Header />

          <main className={styles.main}>
            <AppRoutes />
          </main>

          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;