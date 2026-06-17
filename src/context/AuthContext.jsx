import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem("sweetDelightsUsers");
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("sweetDelightsUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "sweetDelightsUsers",
      JSON.stringify(users)
    );
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "sweetDelightsUser",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("sweetDelightsUser");
    }
  }, [user]);

  const register = ({
    name,
    email,
    phone,
    password,
  }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      return {
        success: false,
        message: "An account already exists with this email.",
      };
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password,
    };

    setUsers((currentUsers) => [
      ...currentUsers,
      newUser,
    ]);

    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    };

    setUser(safeUser);

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const matchedUser = users.find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail &&
        item.password === password
    );

    if (!matchedUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const safeUser = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      phone: matchedUser.phone,
    };

    setUser(safeUser);

    return {
      success: true,
      message: "Login successful.",
    };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        user,
        register,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}