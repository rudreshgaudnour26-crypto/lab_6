import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const register = (userData) => {
    const savedUsers = localStorage.getItem("users");

    const users = savedUsers ? JSON.parse(savedUsers) : [];

    const existingUser = users.find(
      (existingUser) => existingUser.email === userData.email
    );

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    users.push(userData);

    localStorage.setItem("users", JSON.stringify(users));

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  const login = (email, password) => {
    const savedUsers = localStorage.getItem("users");

    const users = savedUsers ? JSON.parse(savedUsers) : [];

    const existingUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!existingUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    setUser(existingUser);
    localStorage.setItem("user", JSON.stringify(existingUser));

    return {
      success: true,
      message: "Login successful.",
    };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const isLoggedIn = user !== null;

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        register,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export default UserContext;