import styles from "./CheckoutForm.module.css";

function CheckoutForm({
  formData,
  errors,
  onChange,
}) {
  return (
    <div className={styles.form}>
      <h2>Shipping Information</h2>

      <div className={styles.field}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
        />
        {errors.name && (
          <p className={styles.error}>{errors.name}</p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
        />
        {errors.phone && (
          <p className={styles.error}>{errors.phone}</p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="address">Delivery Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={onChange}
          rows="4"
        />
        {errors.address && (
          <p className={styles.error}>{errors.address}</p>
        )}
      </div>

      <h2>Payment Method</h2>

      <div className={styles.payment}>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={formData.paymentMethod === "cod"}
            onChange={onChange}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={formData.paymentMethod === "card"}
            onChange={onChange}
          />
          Card Payment
        </label>
      </div>

      {errors.paymentMethod && (
        <p className={styles.error}>
          {errors.paymentMethod}
        </p>
      )}
    </div>
  );
}

export default CheckoutForm;