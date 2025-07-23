import { FunctionComponent, useEffect, useState } from "react";

const DarkMode: FunctionComponent<object> = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode === "true";
  });

  useEffect(() => {
    const body = document.querySelector("body");
    const footer = document.querySelector("footer");
    const toggler = document.querySelector(".navbar-toggler") as HTMLElement;

    if (body) {
      body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
    }
    if (footer) {
      footer.style.backgroundColor = darkMode ? "black" : "white";
    }
    if (toggler) {
      toggler.style.backgroundColor = darkMode ? "black" : "white";
    }

    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const changeMode = () => {
    setDarkMode(!darkMode);
  };

  return darkMode ? (
    <i
      className="bi bi-sun-fill text-warning light-mode"
      style={{ cursor: "pointer" }}
      onClick={changeMode}></i>
  ) : (
    <i
      className="bi bi-moon-fill text-light dark-mode"
      style={{ cursor: "pointer" }}
      onClick={changeMode}></i>
  );
};

export default DarkMode;
