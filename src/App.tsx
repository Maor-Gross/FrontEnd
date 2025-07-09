import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cards from "./components/Cards";
import NavBars from "./components/NavBars";
import Register from "./components/Register";
import Login from "./components/Login";
import MyCards from "./components/MyCards";
import FavCards from "./components/FavCards";
import { UserProvider } from "./context/UserContext";
import { TokenProvider } from "./context/TokenContext";
import { CardsProvider } from "./context/CardsContext";
import "./App.css";
import NewCard from "./components/NewCard";
import { Card } from "./interfaces/cards/Cards";
import EditCard from "./components/EditCard";
import About from "./components/About";
import CardInfo from "./components/CardInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SandBox from "./components/SandBox";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <TokenProvider>
      <UserProvider>
        <CardsProvider>
          <BrowserRouter>
            <ToastContainer />
            <div className="container">
              <NavBars
                setFilteredCards={setFilteredCards}
                setSearchTerm={setSearchTerm}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Cards
                      filteredCards={filteredCards}
                      searchTerm={searchTerm}
                    />
                  }
                />
                <Route
                  path="/fav-cards"
                  element={<FavCards searchTerm={searchTerm} />}
                />
                <Route
                  path="/my-cards"
                  element={<MyCards searchTerm={searchTerm} />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/new-card" element={<NewCard />} />
                <Route path="/edit-card" element={<EditCard />} />
                <Route path="/about" element={<About />} />
                <Route path="//sand-box" element={<SandBox />} />
                <Route path="/card-info/:cardId" element={<CardInfo />} />
              </Routes>
            </div>
          </BrowserRouter>
        </CardsProvider>
      </UserProvider>
    </TokenProvider>
  );
}

export default App;
