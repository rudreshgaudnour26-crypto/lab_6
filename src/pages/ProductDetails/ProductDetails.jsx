import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../../features/products/data/products";
import { useCart } from "../../features/cart/context/CartContext";
import styles from "./ProductDetails.module.css";

function ProductDetails() {
  const { productId } = useParams();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (product) => product.id === Number(productId)
  );

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product Not Found</h1>

        <p>
          The product you are looking for does not exist.
        </p>

        <Link to="/products" className={styles.backButton}>
          Back to Products
        </Link>
      </div>
    );
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.product}>
        <div className={styles.imageSection}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </div>

        <div className={styles.details}>
          <p className={styles.category}>
            {product.category}
          </p>

          <h1 className={styles.name}>
            {product.name}
          </h1>

          <p className={styles.price}>
            ₹{product.price}
          </p>

          <p className={styles.description}>
            {product.description}
          </p>

          <div className={styles.quantity}>
            <span>Quantity</span>

            <div className={styles.quantityControls}>
              <button
                type="button"
                onClick={handleDecrease}
                disabled={quantity === 1}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            className={styles.cartButton}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;