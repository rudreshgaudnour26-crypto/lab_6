import { Link } from "react-router-dom";
import styles from "./OrderConfirmation.module.css";

function OrderConfirmation() {
  const savedOrder = localStorage.getItem("lastOrder");
  const order = savedOrder ? JSON.parse(savedOrder) : null;

  if (!order) {
    return (
      <div className={styles.noOrder}>
        <h1>No Order Found</h1>
        <p>You haven't placed an order yet.</p>

        <Link to="/products" className={styles.shopButton}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.success}>
        <div className={styles.checkmark}>✓</div>

        <h1>Order Confirmed!</h1>

        <p>
          Thank you for your order. Your order has been placed
          successfully.
        </p>

        <p className={styles.orderId}>
          Order ID: #{order.id}
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Order Details</h2>

          {order.items.map((item) => (
            <div key={item.id} className={styles.item}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.image}
              />

              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>

              <p className={styles.itemTotal}>
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className={styles.total}>
            <span>Order Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Shipping Information</h2>

          <div className={styles.shipping}>
            <p>
              <strong>Name:</strong> {order.shipping.name}
            </p>

            <p>
              <strong>Phone:</strong> {order.shipping.phone}
            </p>

            <p>
              <strong>Address:</strong> {order.shipping.address}
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Payment Information</h2>

          <p>
            <strong>Payment Method:</strong>{" "}
            {order.paymentMethod === "cod"
              ? "Cash on Delivery"
              : "Card Payment"}
          </p>

          <p>
            <strong>Order Date:</strong> {order.date}
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <Link to="/products" className={styles.shopButton}>
          Continue Shopping
        </Link>

        <Link to="/profile" className={styles.profileButton}>
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;