// src/components/Cards.tsx
import { FunctionComponent, useEffect, useState, useCallback } from "react"; // הוספנו useCallback
import { Card } from "../interfaces/cards/Cards";
import { getAllCards } from "../services/cardsService";
import Bcard from "./Bcard";
import { useCards } from "../context/CardsContext";

interface CardsProps {
  filteredCards: Card[];
  searchTerm: string;
}

const Cards: FunctionComponent<CardsProps> = ({
  filteredCards,
  searchTerm,
}) => {
  // ---- שינוי: הוספת console.log לבדיקת רינדור ----
  console.log("Cards component rendered");

  const { cards, setCards } = useCards();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ---- שינוי: עוטפים את updateCards ב-useCallback ----
  const updateCards = useCallback(() => {
    // ---- שינוי: הוספת console.log לבדיקת הפעלת updateCards ----
    console.log("updateCards called in Cards component");
    getAllCards()
      .then((res) => {
        if (res && res?.data) {
          setCards(res?.data);
        } else {
          setError("Failed to load cards. Please try again.");
        }
        setIsLoading(false); // יש לוודא ש-setIsLoading מופעל גם במקרה של הצלחה
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load cards. Please try again.");
        setIsLoading(false); // יש לוודא ש-setIsLoading מופעל גם במקרה של שגיאה
      });
  }, [setCards]); // תלות: setCards הוא פונקציה יציבה מ-useState, לכן היא לא תגרום ללולאה

  useEffect(() => {
    // ---- שינוי: הוספת console.log לבדיקת הפעלת useEffect ----
    console.log("Cards useEffect triggered");
    updateCards(); // נקרא ל-updateCards היציבה
  }, [updateCards]); // תלות: הפונקציה updateCards שנעטפה ב-useCallback

  if (isLoading) {
    return (
      <div>
        <center className="spinner">
          <div className="spinner-border text-primary" role="status"></div>
          <h2>Loading...</h2>
        </center>
      </div>
    );
  } else if (error) {
    return <div>{error}</div>;
  } else {
    const cardsToDisplay = searchTerm ? filteredCards : cards;

    return (
      <div className=" text-center mb-5 py-3">
        <h1 className="display-1">Wellcome to Bcard</h1>
        <p className="display-6">
          the new home for your digital business card! In today's fast-paced
          digital world, building professional and social connections has never
          been more important. At Bcard, we believe that everyone should be able
          to present themselves in the best way possible — easily and with
          style. <br />
          <span className="fw-bold">
            We invite you to join our community and start building new
            connections today!
          </span>
        </p>
        <div className="row justify-content-center gap-4 mb-5 py-3 container-cards">
          {cardsToDisplay.length > 0 ? (
            cardsToDisplay.map((card) => (
              <Bcard
                key={String(card._id)}
                card={card}
                updateCards={updateCards}
              />
            ))
          ) : (
            <h1 className="text-center display-1">No results found.</h1>
          )}
        </div>
      </div>
    );
  }
};

export default Cards;
