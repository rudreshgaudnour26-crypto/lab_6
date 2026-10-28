import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../features/user/context/UserContext";
import ProfileInfo from "../../features/user/components/ProfileInfo";
import OrderHistory from "./OrderHistory";
import styles from "./Profile.module.css";

function Profile() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    const allOrders = savedOrders
      ? JSON.parse(savedOrders)
      : [];

    const userOrders = allOrders.filter(
      (order) => order.userEmail === user.email
    );

    setOrders(userOrders);
  }, [user.email]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Profile</h1>

      <div className={styles.profileContent}>
      <ProfileInfo user={user} />

      <OrderHistory orders={orders} />
    </div>

     
    </div>
  );
}

export default Profile;