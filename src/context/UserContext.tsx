import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { getUserById } from "../services/userService";
import { decodeToken } from "../services/tokenService";
import { User } from "../interfaces/users/User";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserFromToken: (token: string | null) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  console.log("UserProvider rendered");

  const [user, setUser] = useState<User | null>(null);

  const updateUserFromToken = useCallback(async (token: string | null) => {
    if (token) {
      try {
        const decodedToken = decodeToken(token) as { _id: string };
        const userData = await getUserById(decodedToken._id);
        setUser(userData.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, updateUserFromToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
