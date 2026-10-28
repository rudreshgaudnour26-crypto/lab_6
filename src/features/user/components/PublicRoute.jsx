import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function PublicRoute({ children }) {
  const { isLoggedIn } = useUser();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;