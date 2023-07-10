import React, { useState } from "react";
import CurrentTheme from "./CurrentTheme";

const ContextProvider = (props) => {
  const [currentTheme, setCurrentTheme] = useState("light");
  return (
    <CurrentTheme.Provider value={{ currentTheme, setCurrentTheme }}>
      {props.children}
    </CurrentTheme.Provider>
  );
};

export default ContextProvider;