import { FunctionComponent, useState } from "react";
import { Card } from "../interfaces/cards/Cards";
import { useUser } from "../context/UserContext";
import { updateCardDeleted, updateCardLikes } from "../services/cardsService";
import { useToken } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { errorMessage, sucessMassage } from "../services/feedbackService";
import logo from "../../images/Bcard-icon.png";
import { isAxiosError } from "axios";

interface BcardProps {
  card: Card;
  updateCards: () => void;
}

const Bcard: FunctionComponent<BcardProps> = ({ card, updateCards }) => {
  const { user } = useUser();
  const userLoggedIn = !!user;
  const isAdmin = user && user.isAdmin;
  const [liked, setLiked] = useState(card.likes?.includes(user?._id) || false);
  const { token } = useToken();
  const cardCreator = card?.user_id === user?._id ? true : false;
  const navigate = useNavigate();

  const handleFavoriteClick = async () => {
    if (user && token) {
      try {
        if (card._id) {
          await updateCardLikes(card?._id, token);
          setLiked(!liked);
          updateCards();
        } else {
          console.error("Card ID is undefined.");
        }
      } catch (error) {
        console.error("Error updating likes:", error);
      }
    }
  };

  const handelDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete the card?")) {
      if (user && token && card?._id && card?.bizNumber) {
        try {
          await updateCardDeleted(card?._id, card?.bizNumber, token);
          sucessMassage(`Your card delete successfully!`);

          updateCards();
        } catch (err) {
          if (isAxiosError(err)) errorMessage(err.response?.data);
          else errorMessage("Unknown error occured");
        }
      } else {
        console.error("Missing user, token, card ID, or bizNumber");
      }
    }
  };
  const handleEditClick = () => {
    navigate("/edit-card", { state: { card } });
  };

  return (
    <div
      className="card m-2 p-0 rounded-5"
      style={{ width: "18rem", height: "40rem" }}>
      <img
        className="card-img-top object-fit-cover height-50rem rounded-top-5"
        src={card.image.url}
        alt={card.image.alt}
        style={{ height: "18rem" }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = logo;
        }}
      />
      <div className="card-body" style={{ height: "8rem" }}>
        <h2 className="card-title">{card.title}</h2>
        <h6 className="card-subtitle mb-2 text-muted">{card.subtitle}</h6>
      </div>
      <ul className="list-group list-group-flush" style={{ height: "10rem" }}>
        <li className="list-group-item">
          <span>Phone: </span>
          <span>{card.phone}</span>
          <br />
          <span>Adress: </span>
          <span>{`${card.address.street} ${card.address.houseNumber}, ${card.address.city}`}</span>
          <br />
          <span>Card Number: </span>
          <span>{card.bizNumber}</span> <br />
        </li>
      </ul>
      <i
        className="bi bi-info-circle-fill"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/card-info/${card._id}`)}>
        &nbsp; More info
      </i>
      <div
        className="card-body d-flex justify-content-between"
        style={{ height: "3rem" }}
        dir="rtl">
        <div className="d-flex gap-3">
          {userLoggedIn &&
            (liked ? (
              <i
                className="bi bi-heart-fill text-danger"
                style={{ cursor: "pointer" }}
                onClick={handleFavoriteClick}></i>
            ) : (
              <i
                className="bi bi-heart text-danger"
                style={{ cursor: "pointer" }}
                onClick={handleFavoriteClick}></i>
            ))}
          <a href={`tel:${card.phone}`}>
            <i className="fa-solid fa-phone text-success"></i>
          </a>
        </div>
        {(isAdmin || cardCreator) && (
          <div className="d-flex gap-3">
            <i
              className="bi bi-pencil-square text-warning"
              style={{ cursor: "pointer" }}
              onClick={handleEditClick}></i>
            <i
              className="bi bi-trash3-fill text-primary"
              style={{ cursor: "pointer" }}
              onClick={handelDeleteClick}></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bcard;
