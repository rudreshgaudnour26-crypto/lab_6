import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>

        {/* Brand */}
        <div className={styles.brand}>
          <h2>MyStore</h2>
          <p>
            Your one-stop shop for quality products.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.links}>
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Profile</Link>
        </div>

        {/* Contact */}
        <div className={styles.contact}>
          <h3>Contact</h3>

          <p>Email: support@mystore.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>© 2026 MyStore. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
