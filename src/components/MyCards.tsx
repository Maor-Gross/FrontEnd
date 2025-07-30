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
    if (user && user._id) {
      const userId = user._id;
      getAllCards()
        .then((res) => {
          const createdCards = res?.data.filter(
            (card: Card) => card.user_id && card.user_id.includes(userId)
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
      setMyCards([]);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    console.log("MyCards useEffect triggered");
    updateCards();
  }, [updateCards]);

  const filteredMyCards = myCards.filter(
    (card) =>
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
                  key={String(card._id)}
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
