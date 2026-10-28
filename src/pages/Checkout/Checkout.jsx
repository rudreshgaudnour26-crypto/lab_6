import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../features/cart/context/CartContext";
import { useUser } from "../../features/user/context/UserContext";
import CheckoutForm from "../../features/checkout/components/CheckoutForm";
import OrderSummary from "../../features/checkout/components/OrderSummary";
import { validateCheckout } from "../../features/checkout/utils/validation";
import styles from "./Checkout.module.css";

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    paymentMethod: "cod",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateCheckout(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const order = {
      id: Date.now(),
      items: cartItems,
      total: cartTotal,
      shipping: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      },
      paymentMethod: formData.paymentMethod,
      date: new Date().toLocaleDateString(),
    };

    // Get existing orders
    const savedOrders = localStorage.getItem("orders");
    const orders = savedOrders ? JSON.parse(savedOrders) : [];

    // Add the new order
    orders.push({
      ...order,
      userEmail: user.email,
    });

    // Save all orders
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    // Keep the latest order for the confirmation page
    localStorage.setItem(
      "lastOrder",
      JSON.stringify(order)
    );

    clearCart();

    navigate("/order-confirmation");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>

      <form
        className={styles.checkout}
        onSubmit={handleSubmit}
      >
        <CheckoutForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />

        <div>
          <OrderSummary />

          <button
            type="submit"
            className={styles.placeOrderButton}
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;