import React, { useState } from "react";
import CurrentTheme from "./CurrentTheme";

const ContextProvider = (props) => {
  const currentThemeLocal = localStorage.getItem("CurrentTheme");
  const [currentTheme, setCurrentTheme] = useState(
    currentThemeLocal ? currentThemeLocal : "light"
  );
  const [ShowModal, setShowModal] = useState(1);

  return (
    <CurrentTheme.Provider
      value={{ currentTheme, setCurrentTheme, ShowModal, setShowModal }}
    >
      {props.children}
    </CurrentTheme.Provider>
  );
};

export default ContextProvider;
