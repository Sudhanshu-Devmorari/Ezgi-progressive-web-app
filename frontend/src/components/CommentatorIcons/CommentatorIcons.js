import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import bowIcon from "../../assets/target-arrow.svg";
import user_check from "../../assets/user-check.svg";
import user_check_1 from "../../assets/user-check.png";
import wallet from "../../assets/wallet.svg";
import walletlight from "../../assets/wallet.png";
import starlight from "../../assets/star-1.svg";
import stardark from "../../assets/star.svg";
import bell from "../../assets/bell-ringing-1.svg";
import bell_1 from "../../assets/bell-ringing.png";
import lifebuoydark from "../../assets/lifebuoydark.png";
import lifebuoy from "../../assets/lifebuoy.png";

const CommentatorIcons = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <div className={`row my-2 g-0 gap-1 ${props.user !== "commentator" && "mx-4"}`}>
        {props.user === "commentator" && (
          <>
        <div
          onClick={() => props.setContent("home")}
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } col d-flex justify-content-center p-1 py-2`}
        >
          <img src={bowIcon} alt="" height={40} width={40} />
        </div>
          </>
        )}
        <div
          onClick={() => props.setContent("subscribers")}
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } col d-flex justify-content-center p-1 py-2`}
        >
          <img
            src={(currentTheme === "dark") ? user_check : user_check_1}
            alt=""
            height={40}
            width={40}
          />
        </div>
        <div
          onClick={() => props.setContent("wallet")}
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } col d-flex justify-content-center p-1 py-2`}
        >
          <img
            src={currentTheme === "dark" ? wallet : walletlight}
            alt=""
            height={40}
            width={40}
          />
        </div>
        <div
          onClick={() => props.setContent("fav")}
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
          onClick={() => props.setContent("notifications")}
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } col d-flex justify-content-center p-1 py-2`}
        >
          <img
            src={currentTheme === "dark" ? bell : bell_1}
            alt=""
            height={40}
            width={40}
          />
        </div>
        <div
          onClick={() => props.setContent("support")}
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } col d-flex justify-content-center p-1 py-2`}
        >
          <img
            src={currentTheme === "dark" ? lifebuoydark : lifebuoy}
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
