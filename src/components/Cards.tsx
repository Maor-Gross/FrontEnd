import { FunctionComponent, useEffect, useState } from "react";
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
  const { cards, setCards } = useCards();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllCards()
      .then((res) => {
        if (res && res?.data) {
          setCards(res?.data);
        } else {
          setError("Failed to load cards. Please try again.");
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load cards. Please try again.");
        setIsLoading(false);
      });
  }, []);

  const updateCards = () => {
    getAllCards()
      .then((res) => {
        setCards(res?.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load cards. Please try again.");
      });
  };

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
