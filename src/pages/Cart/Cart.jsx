import { Link } from "react-router-dom";
import { useCart } from "../../features/cart/context/CartContext";
import CartItem from "../../features/cart/components/CartItem";
import CartSummary from "../../features/cart/components/CartSummary";
import styles from "./Cart.module.css";

function Cart() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className={styles.empty}>
        <h1>Your Cart is Empty</h1>

        <p>
          You haven't added any products to your cart yet.
        </p>

        <Link to="/products" className={styles.shopButton}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Shopping Cart</h1>

      <div className={styles.content}>
        <div className={styles.items}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}
        </div>

        <CartSummary />
      </div>
    </div>
  );
}

export default Cart;