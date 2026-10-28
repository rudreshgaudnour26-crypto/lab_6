import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../features/user/context/UserContext";
import { useCart } from "../../features/cart/context/CartContext";
import styles from "./Header.module.css";
import products from "../../features/products/data/products";

function Header() {
  const { isLoggedIn } = useUser();
  const { cartItemCount } = useCart();

  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const categories = [...new Set(products.map((product) => product.category))];

  const handleSearch = (event) => {
    event.preventDefault();

    const searchText = search.trim();

    if (!searchText) {
      navigate("/products");
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(searchText)}`
    );
  };

  return (
    <>
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
  <img src="/logo.jpg" alt="MyStore logo" />
</Link>

      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>

        <Link to="/products" className={styles.navLink}>
          <i className="fa-solid fa-box"></i>
          Products
        </Link>

        <Link to="/cart" className={styles.navLink}>
          <i className="fa-solid fa-cart-shopping"></i>
          Cart

          {cartItemCount > 0 && (
            <span className={styles.cartCount}>
              {cartItemCount}
            </span>
          )}
        </Link>

        {isLoggedIn ? (
          <Link to="/profile" className={styles.navLink}>
            Profile
          </Link>
        ) : (
          <Link to="/login" className={styles.navLink}>
            Login
          </Link>
        )}
      </nav>

      {/* Hide search on Login page */}
      {location.pathname !== "/login" && (
        <form
          className={styles.search}
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <button type="submit" aria-label="Search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      )}
    </header>
    {location.pathname === "/" && (
  <nav className={styles.subHeader}>
    <div className={styles.categories}>
      {categories.map((category) => (
        <Link
          key={category}
          to={`/products?category=${encodeURIComponent(category)}`}
          className={styles.category}
        >
          {category}
        </Link>
      ))}
    </div>
  </nav>
)}
</>

  );
}

export default Header;