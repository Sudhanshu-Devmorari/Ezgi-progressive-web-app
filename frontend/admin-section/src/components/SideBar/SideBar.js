import React, { useState } from "react";
import homeSelected from "../../assets/apps.svg";
import SelectedUsers from "../../assets/SelectedUsers.svg";
import home from "../../assets/home.svg";
import users from "../../assets/users.svg";
import selectedComments from "../../assets/selectedComments.png";
import comment from "../../assets/comment.png";
// import Group from "../../assets/Group 95.svg"
import selectedEditor from "../../assets/Menu Icon.svg";
import Editor from "../../assets/Editors Page.svg";
import wallet from "../../assets/Sub Header Wallet Unselected.svg";
import Selectedwallet from "../../assets/Sub Header Wallet Selected.svg";
import basket from "../../assets/basket.svg";
import lifebuoydark from "../../assets/lifebuoy.svg";
import usercode from "../../assets/user-code.svg";
import bell from "../../assets/bell.svg";
import ad2 from "../../assets/ad-2.svg";
import chartpie from "../../assets/chart-pie.svg";
import adjustments from "../../assets/adjustments.svg";
import logout from "../../assets/logout.svg";
import "./SideBar.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const SideBar = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="dark-mode d-flex flex-column py-3 justify-content-between align-items-center me-3 h-100 icons-gap gap-3">
        <div className="d-flex flex-column img-gap">
          <img
            onClick={() => props.setshowDetails("home")}
            className="icons-sidebar cursor"
            src={props.showDetails === "home" ? homeSelected : home}
            alt=""
            height={32}
            width={32}
          />
          <img
            onClick={() => props.setshowDetails("users")}
            className="icons-sidebar cursor"
            src={props.showDetails === "users" ? SelectedUsers : users}
            alt=""
            height={32}
            width={32}
          />
          <img
            onClick={() => props.setshowDetails("comments")}
            className="icons-sidebar cursor"
            src={props.showDetails === "comments" ? selectedComments : comment}
            alt=""
            height={32}
            width={32}
          />
          <img
            onClick={() => props.setshowDetails("editor")}
            className="icons-sidebar cursor"
            src={props.showDetails === "editor" ? selectedEditor : Editor}
            alt=""
            height={32}
            width={32}
          />
          <img
            onClick={() => navigate("withdrawal/")}
            className="icons-sidebar cursor"
            src={props.showDetails === "wallet" ? Selectedwallet : wallet}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar cursor"
            src={basket}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar cursor"
            src={lifebuoydark}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar cursor"
            src={usercode}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar cursor"
            src={bell}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar cursor"
            src={ad2}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar cursor"
            src={chartpie}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar cursor"
            src={adjustments}
            alt=""
            height={32}
            width={32}
          />
        </div>
        <div className="">
          <img
            className="icons-sidebar cursor"
            src={logout}
            alt=""
            height={32}
            width={32}
          />
        </div>
      </div>
    </>
  );
};

export default SideBar;
