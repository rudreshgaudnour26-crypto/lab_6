import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "./CartSummary.module.css";

function CartSummary() {
  const { cartItemCount, cartTotal } = useCart();

  return (
    <div className={styles.summary}>
      <h2>Cart Summary</h2>

      <div className={styles.row}>
        <span>Items</span>
        <span>{cartItemCount}</span>
      </div>

      <div className={styles.row}>
        <span>Total</span>
        <span>₹{cartTotal}</span>
      </div>

      <Link to="/checkout" className={styles.checkoutButton}>
        Proceed to Checkout
      </Link>
    </div>
  );
}

export default CartSummary;