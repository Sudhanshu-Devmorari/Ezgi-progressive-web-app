import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import bow_dark from "../../assets/target-arrow.3.png";
import bow_Selected from "../../assets/target-arrow.svg";
import bow_light from "../../assets/target-arrow_light.svg";
import user_check_dark from "../../assets/user-check.svg";
import user_check_light from "../../assets/user-check_light.png";
import user_check_selected from "../../assets/user-check.png";
import walletSelected from "../../assets/walletSelected.png";
import starSelected from "../../assets/starSelected.png";
import bellSelected from "../../assets/bell-ringing_selected.png";
import wallet from "../../assets/wallet.svg";
import walletlight from "../../assets/wallet.png";
import starlight from "../../assets/star-1.svg";
import stardark from "../../assets/star.svg";
import bell from "../../assets/bell-ringing-1.svg";
import bell_1 from "../../assets/bell-ringing.png";
import lifebuoydark from "../../assets/lifebuoydark.png";
import lifebuoy from "../../assets/lifebuoy.png";
import lifebuoySelected from "../../assets/lifebuoySelected.png";

const CommentatorIcons = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <div
        className={`row my-2 g-0 gap-1 ${
          props.user !== "commentator" && "mx-4"
        }`}
      >
        {props.user === "commentator" && (
          <>
            <div
              onClick={() => props.setContent("home")}
              className={`${
                currentTheme === "dark" ? "dark-mode" : "light-mode"
              } col d-flex justify-content-center p-1 py-2`}
            >
              <img
                src={
                  props.content === "home"
                    ? bow_Selected
                    : currentTheme === "dark"
                    ? bow_dark
                    : bow_light
                }
                alt=""
                height={40}
                width={40}
              />
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
            src={
              props.content === "subscribers"
                ? user_check_selected
                : currentTheme === "dark"
                ? user_check_dark
                : user_check_light
            }
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
            src={
              props.content === "wallet"
                ? walletSelected
                : currentTheme === "dark"
                ? wallet
                : walletlight
            }
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
            src={
              props.content === "fav"
                ? starSelected
                : currentTheme === "dark"
                ? stardark
                : starlight
            }
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
            src={
              props.content === "notifications"
                ? bellSelected
                : currentTheme === "dark"
                ? bell
                : bell_1
            }
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
            src={
              props.content === "support"
                ? lifebuoySelected
                : currentTheme === "dark"
                ? lifebuoydark
                : lifebuoy
            }
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
