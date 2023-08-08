import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import bow_dark from "../../assets/Comments Page.svg";
import bow_Selected from "../../assets/Menu Icon (1).svg";
import bow_light from "../../assets/comment unselected.svg";
import user_check_dark from "../../assets/Sub Header Subscribers Unselected.svg";
import user_check_light from "../../assets/Sub Header Subscriber Unselected.svg";
import user_check_selected from "../../assets/Sub Header Subscriber Selected.svg";
import walletSelected from "../../assets/Sub Header Wallet Selected.svg";
import starSelected from "../../assets/Sub Header Favorite Selected.svg";
import bellSelected from "../../assets/bell-ringing_selected.png";
import wallet from "../../assets/Sub Header Wallet Unselected.svg";
import walletlight from "../../assets/Sub Header Wallet Unselected (1).svg";
import starlight from "../../assets/Favorite Page.svg";
import stardark from "../../assets/Favorite Page (1).svg";
import bell from "../../assets/Header Notification.svg";
import bell_1 from "../../assets/Header Notification (2).svg";
import lifebuoydark from "../../assets/Support.svg";
import lifebuoy from "../../assets/support unselected.svg";
import lifebuoySelected from "../../assets/support selected.svg";

const CommentatorIcons = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const user = localStorage.getItem("user-role");
  return (
    <>
      <div
        className={`row my-2 g-0 gap-1 ${
          user !== "commentator" && "mx-4"
        }`}
      >
        {user === "commentator" && (
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
