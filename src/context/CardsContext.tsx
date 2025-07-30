// src/context/CardsContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Card } from "../interfaces/cards/Cards";

interface CardsContextType {
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ---- שינוי: הוספת console.log לבדיקת רינדור ----
  console.log("CardsProvider rendered");

  const [cards, setCards] = useState<Card[]>([]);

  // שים לב: תנאי זה 'if (!cards) { return null; }' הוא קצת מוזר ולא נחוץ.
  // cards תמיד תהיה מערך (ריק בהתחלה), ולעולם לא תהיה null.
  // ניתן להסירו. אם תצטרך לדעת למה השארתי אותו, שאל.
  if (!cards) {
    return null;
  }

  return (
    <CardsContext.Provider value={{ cards, setCards }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be used within a CardsProvider");
  }
  return context;
};
