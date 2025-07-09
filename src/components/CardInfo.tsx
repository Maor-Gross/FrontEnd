import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardById, updateCardLikes } from "../services/cardsService";
import { Card } from "../interfaces/cards/Cards";
import { useUser } from "../context/UserContext";
import { useToken } from "../context/TokenContext";
import { errorMessage } from "../services/feedbackService";

interface CardInfoProps {}

const CardInfo: FunctionComponent<CardInfoProps> = () => {
  const { cardId } = useParams();
  const { user } = useUser();
  const { token } = useToken();
  const [Card, setCard] = useState<Card | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (cardId) {
      getCardById(cardId)
        .then((res) => {
          setCard(res.data);
          setLiked(res.data.likes?.includes(user._id) || false);
        })
        .catch((err) => {
          errorMessage(err.response.data);
        });
    }
  }, [cardId, user]);

  const handleFavoriteClick = async () => {
    if (user && token) {
      try {
        if (cardId && Card) {
          await updateCardLikes(Card._id as string, token);
          setLiked(!liked);
          await updateCards(cardId);
        } else {
          console.error("Card ID is undefined.");
        }
      } catch (error) {
        console.error("Error updating likes:", error);
      }
    }
  };

  const updateCards = async (id: string) => {
    try {
      const res = await getCardById(id);
      setCard(res.data);
      if (user) {
        setLiked(res.data.likes?.includes(user._id) || false);
      }
    } catch (error) {
      console.error("Error fetching updated card:", error);
    }
  };

  return (
    <>
      {Card ? (
        <div className="card-info-container d-flex justify-content-center align-items-center text-center mb-5 py-3">
          <div className="card text-center">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="true" href="#">
                    Card info
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={Card.web}>
                    Go to web site {">>"}
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body card-info-body d-flex gap-3 align-items-center ">
              <img
                src={Card.image.url}
                alt="card-image"
                className="rounded object-fit-cover col-4 "
              />

              <div className="text-center justify-content-center ">
                <h1 className="display-5 fw-bold">{Card.title}</h1>

                <h2 className="display-6">{Card.description}</h2>
                <h2 className="display-6">{Card.subtitle}</h2>
                {cardId &&
                  (liked ? (
                    <i
                      className="bi bi-heart-fill text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={handleFavoriteClick}>
                      <br /> {Card.likes?.length}
                    </i>
                  ) : (
                    <i
                      className="bi bi-heart text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={handleFavoriteClick}>
                      <br /> {Card.likes?.length}
                    </i>
                  ))}
              </div>
              <div className="d-flex flex-column gap-3">
                <a href={`mailto:${Card.email}`}>{Card.email}</a>
                <p>Biz Number: {Card.bizNumber}</p>
                <a>
                  Address: {Card.address.street}, {Card.address.city},
                  {Card.address.state} {Card.address.zip},{" "}
                  {Card.address.country}
                </a>
                <div>
                  <a
                    href={`tel:${Card.phone}`}
                    className="btn btn-success rounded-4 ">
                    {Card.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Card not found.</p>
      )}
    </>
  );
};

export default CardInfo;
