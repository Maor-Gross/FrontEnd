import { FunctionComponent, useState, useEffect } from "react";
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
  const isAdmin = user?.isAdmin;

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(card.likes?.includes(user?._id || "") || false);
  }, [card.likes, user?._id]);

  const { token } = useToken();
  const cardCreator = user && user._id && card?.user_id === user._id;

  const navigate = useNavigate();

  const handleFavoriteClick = async () => {
    if (!user || !token || !card?._id) {
      console.error("Missing user, token, or card ID for like operation.");
      errorMessage("Must be logged in to like a card."); // הודעה למשתמש
      return;
    }

    try {
      await updateCardLikes(card._id, token);
      setLiked(!liked);
      updateCards();
    } catch (error) {
      if (isAxiosError(error)) {
        errorMessage(error.response?.data?.message || "שגיאה בעדכון לייק");
      } else {
        errorMessage("משהו השתבש בעדכון לייק");
      }
      console.error("Error updating likes:", error);
    }
  };

  const handleDeleteClick = async () => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק את הכרטיס?")) {
      return;
    }

    if (!user || !token || !card?._id || !card?.bizNumber) {
      console.error(
        "Missing user, token, card ID, or bizNumber for delete operation."
      );
      errorMessage("שגיאה במחיקת הכרטיס: חסרים פרטים.");
      return;
    }

    try {
      await updateCardDeleted(card._id, card.bizNumber, token);
      sucessMassage(`הכרטיס שלך נמחק בהצלחה!`);
      updateCards();
    } catch (err) {
      if (isAxiosError(err)) {
        errorMessage(err.response?.data?.message || "שגיאה במחיקת הכרטיס.");
      } else {
        errorMessage("משהו השתבש במהלך מחיקת הכרטיס");
      }
      console.error("Error deleting card:", err);
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
          <span>טלפון: </span>
          <span>{card.phone}</span>
          <br />
          <span>כתובת: </span>
          <span>{`${card.address.street} ${card.address.houseNumber}, ${card.address.city}`}</span>
          <br />
          <span>מספר כרטיס: </span>
          <span>{card.bizNumber}</span> <br />
        </li>
      </ul>
      <i
        className="bi bi-info-circle-fill"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/card-info/${card._id}`)}>
        &nbsp; More Info
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
              onClick={handleDeleteClick}></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bcard;
