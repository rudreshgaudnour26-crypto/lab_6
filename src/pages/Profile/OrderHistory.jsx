import styles from "./OrderHistory.module.css";
import { Link } from "react-router-dom";

function OrderHistory({ orders }) {
  if (orders.length === 0) {
    return (
      <div className={styles.container}>
        <h2>Order History</h2>

        <p className={styles.empty}>
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Order History</h2>

      <div className={styles.orders}>
        {orders
          .slice()
          .reverse()
          .map((order) => (
            <div key={order.id} className={styles.order}>
              <div className={styles.header}>
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>{order.date}</p>
                </div>

                <span className={styles.status}>
                  Placed
                </span>
              </div>

              <div className={styles.items}>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className={styles.item}
                  >
                    <div className={styles.productInfo}>
  <img
    src={item.image}
    alt={item.name}
    className={styles.productImage}
  />

  <span>
    <Link
      to={`/products/${item.id}`}
      className={styles.productLink}
    >
      {item.name}
    </Link>{" "}
    × {item.quantity}
  </span>
</div>

                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.footer}>
                <span>
                  Payment:{" "}
                  {order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Card Payment"}
                </span>

                <strong>
                  Total: ₹{order.total}
                </strong>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default OrderHistory;