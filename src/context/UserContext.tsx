import React, { createContext, useState, useContext } from "react";
import { getUserById } from "../services/userService";
import { decodeToken } from "../services/tokenService";

interface UserContextType {
  user: any;
  setUser: (user: any | null) => void;
  updateUserFromToken: (token: string | null) => Promise<void>; // הוספנו את updateUserFromToken
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  updateUserFromToken: async () => {}, // הוספנו את updateUserFromToken
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  const updateUserFromToken = async (token: string | null) => {
    if (token) {
      try {
        const decodedToken: any = decodeToken(token);
        const userData = await getUserById(decodedToken._id);
        setUser(userData.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUserFromToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
