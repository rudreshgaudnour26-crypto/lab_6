import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "../../features/products/data/products";
import styles from "./Home.module.css";

function Home() {
  const featuredProducts = products.slice(0, 6);

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ].slice(0, 4);

  const carouselProducts = products.slice(20, 28);

const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((previousSlide) =>
      previousSlide === carouselProducts.length - 1
        ? 0
        : previousSlide + 1
    );
  }, 3000);

  return () => clearInterval(interval);
}, [carouselProducts.length]);

  return (
    <div className={styles.container}>



      <section className={styles.hero}>
        <div
  className={styles.slides}
  style={{
    transform: `translateX(-${currentSlide * 100}%)`,
  }}
>
  {carouselProducts.map((product) => (
    <Link
      key={product.id}
      to={`/products/${product.id}`}
      className={styles.slide}
    >
      <img
        src={product.image}
        alt={product.name}
        className={styles.carouselImage}
      />

      <div className={styles.productInfo}>
        <h2>{product.name}</h2>
        <p>₹{product.price}</p>
      </div>
    </Link>
  ))}
</div>

<div className={styles.dots}>
  {carouselProducts.map((product, index) => (
    <button
      key={product.id}
      type="button"
      className={
        currentSlide === index
          ? styles.activeDot
          : styles.dot
      }
      onClick={() => setCurrentSlide(index)}
    />
  ))}
</div>
       
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Featured Products</h2>

          <Link to="/products" className={styles.viewAll}>
            View All
          </Link>
        </div>

        <div className={styles.products}>
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className={styles.product}
            >
              <img
                src={product.image}
                alt={product.name}
                className={styles.image}
              />

              <h3>{product.name}</h3>

              <p>₹{product.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;