// src/context/TokenContext.tsx
import React, { createContext, useState, useContext } from "react";

export interface TokenContextType {
  token: string | null;
  updateToken: (newToken: string) => void;
  clearToken: () => void;
}

const TokenContext = createContext<TokenContextType | null>(null);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ---- שינוי: הוספת console.log כדי לראות אם הקומפוננטה מרנדרת ----
  console.log("TokenProvider rendered");

  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem("token");
  });

  const updateToken = (newToken: string) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const clearToken = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return (
    <TokenContext.Provider value={{ token, updateToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};

// ניתן להסיר שורה זו אם לא משתמשים בייצוא ברירת מחדל של הקונטקסט עצמו
// export default TokenContext;
