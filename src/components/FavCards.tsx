// src/components/FavCards.tsx
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Card } from "../interfaces/cards/Cards";
import { getAllCards } from "../services/cardsService";
import { useUser } from "../context/UserContext";
import Bcard from "./Bcard";
import { errorMessage } from "../services/feedbackService";

interface FavCardsProps {
  searchTerm: string;
}

const FavCards: FunctionComponent<FavCardsProps> = ({ searchTerm }) => {
  console.log("FavCards component rendered");

  const { user } = useUser();
  const [favCards, setFavCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateCards = useCallback(() => {
    console.log("updateCards called in FavCards component");
    if (user && user._id) {
      const userId = user._id;

      getAllCards()
        .then((res) => {
          const likedCards = res.data.filter(
            (card: Card) => card.likes && card.likes.includes(userId)
          );
          setFavCards(likedCards);
          setIsLoading(false);
        })
        .catch((err) => {
          errorMessage(err.response?.data || "Something went wrong");
          setIsLoading(false);
        });
    } else {
      setFavCards([]);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    console.log("FavCards useEffect triggered");
    updateCards();
  }, [updateCards]);

  const filteredFavCards = favCards.filter(
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
  }

  return (
    <div className="row justify-content-center gap-4 mb-5 py-3 container-cards text-center">
      <h1 className="display-1">Favourites cards</h1>
      {filteredFavCards.length > 0 ? (
        filteredFavCards.map((card: Card) => (
          <Bcard key={String(card._id)} card={card} updateCards={updateCards} />
        ))
      ) : (
        <h1 className="display-1 mb-4">
          You don't have any cards you liked yet.
        </h1>
      )}
    </div>
  );
};

export default FavCards;
