import { useCart } from "../context/CartContext";
import styles from "./CartItem.module.css";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className={styles.item}>
      <img
        src={item.image}
        alt={item.name}
        className={styles.image}
      />

      <div className={styles.details}>
        <h3 className={styles.name}>{item.name}</h3>

        <p className={styles.price}>
          ₹{item.price}
        </p>

        <div className={styles.quantity}>
          <button
            type="button"
            onClick={handleDecrease}
            disabled={item.quantity === 1}
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>

        <p className={styles.subtotal}>
          Subtotal: ₹{item.price * item.quantity}
        </p>

        <button
          type="button"
          className={styles.removeButton}
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;