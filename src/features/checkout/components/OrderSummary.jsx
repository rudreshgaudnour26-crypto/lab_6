import { useCart } from "../../cart/context/CartContext";
import styles from "./OrderSummary.module.css";

function OrderSummary() {
  const { cartItems, cartItemCount, cartTotal } = useCart();

  return (
    <div className={styles.summary}>
      <h2>Order Summary</h2>

      <div className={styles.items}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.item}>
            <div>
              <p className={styles.name}>{item.name}</p>
              <span>Qty: {item.quantity}</span>
            </div>

            <span>
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.row}>
        <span>Total Items</span>
        <span>{cartItemCount}</span>
      </div>

      <div className={`${styles.row} ${styles.total}`}>
        <span>Total</span>
        <span>₹{cartTotal}</span>
      </div>
    </div>
  );
}

export default OrderSummary;