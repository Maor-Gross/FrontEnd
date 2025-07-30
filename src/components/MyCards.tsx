// src/components/MyCards.tsx
import { FunctionComponent, useEffect, useState, useCallback } from "react";
import { Card } from "../interfaces/cards/Cards";
import { getAllCards } from "../services/cardsService";
import { useUser } from "../context/UserContext";
import Bcard from "./Bcard";
import { errorMessage } from "../services/feedbackService";

interface MyCardsProps {
  searchTerm: string;
}

const MyCards: FunctionComponent<MyCardsProps> = ({ searchTerm }) => {
  console.log("MyCards component rendered");

  const { user } = useUser();
  const [myCards, setMyCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateCards = useCallback(() => {
    console.log("updateCards called in MyCards component");
    // ---- שינוי: הוספנו בדיקה מפורשת ל-user ו-user._id ----
    if (user && user._id) {
      // ודא ש-user קיים וש-user._id קיים
      const userId = user._id; // כעת userId בטוח הוא string
      getAllCards()
        .then((res) => {
          const createdCards = res?.data.filter(
            (card: Card) =>
              // ודא ש-card.user_id קיים לפני קריאה ל-includes
              card.user_id && card.user_id.includes(userId)
          );
          setMyCards(createdCards);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            errorMessage(err.response.data);
          } else {
            errorMessage("An unexpected error occurred.");
          }
          setIsLoading(false);
        });
    } else {
      // אם אין user או user._id, אין כרטיסים להציג והטעינה מסתיימת.
      setMyCards([]);
      setIsLoading(false);
    }
  }, [user]); // התלות היא ב-user, הפונקציה תשתנה רק אם אובייקט ה-user משתנה

  useEffect(() => {
    console.log("MyCards useEffect triggered");
    updateCards();
  }, [updateCards]); // התלות בפונקציה היציבה updateCards

  const filteredMyCards = myCards.filter(
    (card) =>
      // ודא ש-card.title קיים לפני קריאה ל-toLowerCase
      card.title && card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div>
        <center className="spinner">
          <div className="spinner-border text-primary" role="status"></div>
          <h2>Loading...</h2>
        </center>
      </div>
    );
  } else {
    return (
      <div className="mb-5 py-3 d-flex flex-column justify-content-center gap-4 ">
        <a
          href="/new-card"
          type="button"
          className="btn btn-dark fs-5 rounded-4 mx-auto ">
          +Create a new card
        </a>

        <div className="row justify-content-center gap-4 container-cards text-center">
          {filteredMyCards.length > 0 ? (
            <>
              <h1 className="display-1 ">My cards</h1>
              {filteredMyCards.map((card: Card) => (
                <Bcard
                  key={String(card._id)} // אם _id יכול להיות undefined, כדאי לטפל בזה
                  card={card}
                  updateCards={updateCards}
                />
              ))}
            </>
          ) : (
            <p>No cards found.</p>
          )}
        </div>
      </div>
    );
  }
};

export default MyCards;
