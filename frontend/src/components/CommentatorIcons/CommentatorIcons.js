import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import bowIcon from "../../assets/target-arrow.svg";
import user_check from "../../assets/user-check.svg";
import wallet from "../../assets/wallet.svg";
import starlight from "../../assets/star-1.svg";
import stardark from "../../assets/star.svg";
import bell from "../../assets/bell-ringing-1.svg";
import lifebuoy from "../../assets/lifebuoy.svg";

const CommentatorIcons = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <div className="row my-2 g-0 gap-1">
        <div
          onClick={() => props.setHome("home")}
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } col d-flex justify-content-center p-1 py-2`}
        >
          <img src={bowIcon} alt="" height={40} width={40} />
        </div>
        <div
          onClick={() => props.setHome("subscribers")}
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } col d-flex justify-content-center p-1 py-2`}
        >
          <img
            src={currentTheme === "dark" ? user_check : bowIcon}
            alt=""
            height={40}
            width={40}
          />
        </div>
        <div
          onClick={() => props.setHome("home")}
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } col d-flex justify-content-center p-1 py-2`}
        >
          <img
            src={currentTheme === "dark" ? wallet : bowIcon}
            alt=""
            height={40}
            width={40}
          />
        </div>
        <div
          onClick={() => props.setHome("home")}
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } col d-flex justify-content-center p-1 py-2`}
        >
          <img
            src={currentTheme === "dark" ? stardark : starlight}
            alt=""
            height={40}
            width={40}
          />
        </div>
        <div
          onClick={() => props.setHome("home")}
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } col d-flex justify-content-center p-1 py-2`}
        >
          <img
            src={currentTheme === "dark" ? bell : starlight}
            alt=""
            height={40}
            width={40}
          />
        </div>
        <div
          onClick={() => props.setHome("home")}
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } col d-flex justify-content-center p-1 py-2`}
        >
          <img
            src={currentTheme === "dark" ? lifebuoy : starlight}
            alt=""
            height={40}
            width={40}
          />
        </div>
      </div>
    </>
  );
};

export default CommentatorIcons;
