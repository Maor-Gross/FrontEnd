import { FunctionComponent, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useToken } from "../context/TokenContext";
import DarkMode from "./DarkMode";
import { useCards } from "../context/CardsContext";
import { Card } from "../interfaces/cards/Cards";

interface NavBarsProps {
  setFilteredCards: React.Dispatch<React.SetStateAction<Card[]>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const NavBars: FunctionComponent<NavBarsProps> = ({
  setFilteredCards,
  setSearchTerm,
}) => {
  console.log("NavBars rendered");

  const navigate = useNavigate();
  const { clearToken, token } = useToken();
  const { updateUserFromToken, user } = useUser();
  const { cards } = useCards();

  useEffect(() => {
    console.log("NavBars useEffect triggered. Current Token:", token);
    updateUserFromToken(token);
  }, [token, updateUserFromToken]);

  const userLoggedIn = !!user;
  const isBusiness = user?.isBusiness || false;
  const isAdmin = user?.isAdmin || false;

  const handleLogout = () => {
    const confirmLogout = window.confirm("האם אתה בטוח שברצונך להתנתק?");
    if (confirmLogout) {
      clearToken();
      navigate("/");
    }
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value.toLowerCase();
    setSearchTerm(word);

    if (word === "") {
      setFilteredCards(cards);
    } else {
      const cardFilter = cards.filter((card) => {
        const title = card.title.toLowerCase();
        return title.includes(word);
      });
      setFilteredCards(cardFilter);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg 
                           bg-dark 
                           sticky-top mx-auto
                           z-1 
                           rounded-4">
        <div className="container-fluid ">
          <a
            className="navbar-brand text-light fw-bold"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}>
            Bcard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                className="nav-item nav-link active text-light"
                aria-current="page"
                onClick={() => navigate("/about")}
                style={{ cursor: "pointer" }}>
                About
              </li>
              {userLoggedIn && (
                <li
                  className="nav-item nav-link text-light"
                  onClick={() => navigate("/fav-cards")}
                  style={{ cursor: "pointer" }}>
                  Fav Cards
                </li>
              )}
              {(isBusiness || isAdmin) && (
                <li
                  className="nav-item nav-link text-light"
                  onClick={() => navigate("/my-cards")}
                  style={{ cursor: "pointer" }}>
                  My Cards
                </li>
              )}
              {isAdmin && (
                <li
                  className="nav-item nav-link text-light"
                  onClick={() => navigate("/sand-box")}
                  style={{ cursor: "pointer" }}>
                  San Box
                </li>
              )}
            </ul>
            <div className="d-flex gap-3 align-items-center phone-navbar">
              <form className="d-flex form" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="חיפוש"
                  aria-label="Search"
                  onInput={search}
                />
              </form>
              <div className="user-actions">
                <DarkMode />
                {userLoggedIn ? (
                  <img
                    src={user?.image?.url}
                    alt={user?.image?.alt}
                    className="rounded-circle"
                    style={{ width: "2rem", height: "2rem", cursor: "pointer" }}
                    onClick={handleLogout}
                  />
                ) : (
                  <div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 sign-up-login">
                      <li className="nav-item">
                        <Link
                          className="nav-link active text-light sign-up-text"
                          aria-current="page"
                          to="/register">
                          Sign Up
                        </Link>
                        <Link
                          className="nav-link active text-light sign-up-icon"
                          aria-current="page"
                          to="/register">
                          <i className="bi bi-person-fill-add"></i>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link active text-light login-text"
                          aria-current="page"
                          to="/login">
                          Login
                        </Link>
                        <Link
                          className="nav-link active text-light login-icon"
                          aria-current="page"
                          to="/login">
                          <i className="bi bi-box-arrow-in-right "></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <footer className="text-center fixed-bottom mx-auto z-1 rounded-4 pt-2 pb-1 d-flex justify-content-center align-items-end gap-5 ">
        <div>
          <i
            className="bi bi-info-circle-fill text-warning"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/about")}>
            <br />
            About
          </i>
        </div>
        {userLoggedIn && (
          <div>
            <i
              className="bi bi-heart-fill text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/fav-cards")}>
              <br />
              Fav Cards
            </i>
          </div>
        )}

        {(isAdmin || isBusiness) && (
          <div>
            <i
              className="bi bi-person-square text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/my-cards")}>
              <br />
              My Cards
            </i>
          </div>
        )}
      </footer>
    </>
  );
};

export default NavBars;
