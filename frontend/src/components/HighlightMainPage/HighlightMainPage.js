import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import { BsStar } from "react-icons/bs";

const HighlightMainPage = () => {
    const { currentTheme, setCurrentTheme } = useContext(CurrentTheme)
  return (
    <>
      <div
        className="py-3 d-flex justify-content-center  align-items-center"
        style={{
          backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
          color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
        }}
      >
        <span>
          <BsStar fontSize={"1.3rem"} />
        </span>
        <span className="p-1">
          <BsStar fontSize={"1.7rem"} />
        </span>
        <span>
          <BsStar fontSize={"2.1rem"} />
        </span>
        <span className="p-1 fs-5">Highlights </span>
        <span>
          <BsStar fontSize={"2.1rem"} />
        </span>
        <span className="p-1">
          <BsStar fontSize={"1.7rem"} />
        </span>
        <span>
          <BsStar fontSize={"1.3rem"} />
        </span>
      </div>
    </>
  );
};

export default HighlightMainPage;
