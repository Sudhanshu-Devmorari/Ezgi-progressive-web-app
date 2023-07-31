import React, { useState } from "react";
import homeSelected from "../../assets/apps.svg";
import SelectedUsers from "../../assets/users.png";
import users from "../../assets/users30.png";
import selectedComments from "../../assets/Menu Icon (1).svg";
import comment from "../../assets/Comments Page.svg";
import selectedEditor from "../../assets/Menu Icon.svg";
import Editor from "../../assets/Group 58.svg";
import wallet from "../../assets/Sub Header Wallet Unselected.svg";
import Selectedwallet from "../../assets/Sub Header Wallet Selected.svg";
import sales from "../../assets/basket.svg";
import Selectedsales from "../../assets/SelectedSales.svg";
import support from "../../assets/lifebuoy.png";
import Selectedsupport from "../../assets/lifebuoy2.png";
import sub_user from "../../assets/user-code.svg";
import sub_user_selected from "../../assets/user-code (1).svg";
import bell from "../../assets/bell.svg";
import bellSelected from "../../assets/bell (1).svg";
import ad2 from "../../assets/ad-2.svg";
import Selected_ad2 from "../../assets/ad-2 (1).svg";
import chartpie from "../../assets/chart-pie.svg";
import Selectedchartpie from "../../assets/chart-pie (1).svg";
import adjustments from "../../assets/adjustments.svg";
import S_adjustments from "../../assets/adjustments (1).svg";

import home from "../../assets/home.svg";
// import Group from "../../assets/Group 95.svg"
import logout from "../../assets/logout.svg";
import "./SideBar.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const SideBar = (props) => {
  const navigate = useNavigate();
  const [showDetails, setshowDetails] = useState("home");

  return (
    <>
      {/* <div className="dark-mode d-flex flex-column py-3 justify-content-between align-items-center me-3 h-100 icons-gap gap-3">
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
      </div> */}

      <div className="dark-mode py-3 d-flex flex-column justify-content-between align-items-center sidebar-height">
        {/* <div className="dark-mode d-flex justify-content-between align-items-center p-3 sidebar-height" style={{width:"4%"}}> */}
        <div className="d-flex flex-column icons-block">
          <img
            className="cursor icons-responsive-size"
            src={showDetails === "home" ? homeSelected : home}
            alt=""
            height={32}
            width={32}
            onClick={() => {
              setshowDetails("home");
              navigate("/");
            }}
          />
          <img
            className="cursor icons-responsive-size"
            src={showDetails === "users" ? SelectedUsers : users}
            alt=""
            height={32}
            width={32}
            onClick={() => {
              setshowDetails("users");
              navigate("/users/");
            }}
          />
          <img
            className="cursor icons-responsive-size"
            src={showDetails === "comments" ? selectedComments : comment}
            alt=""
            height={32}
            width={32}
            onClick={() => {
              setshowDetails("comments");
              navigate("/comments/");
            }}
          />
          <img
            className="cursor icons-responsive-size"
            src={showDetails === "editor" ? selectedEditor : Editor}
            alt=""
            height={32}
            width={32}
            onClick={() => {
              setshowDetails("editor");
              navigate("/editors/");
            }}
          />
          <img
            className="cursor icons-responsive-size"
            src={showDetails === "wallet" ? Selectedwallet : wallet}
            alt=""
            height={32}
            width={32}
            onClick={() => {
              setshowDetails("wallet");
              navigate("/withdrawal/");
            }}
          />
          <img
            className="cursor icons-responsive-size"
            src={showDetails === "sales" ? Selectedsales : sales}
            alt=""
            height={32}
            width={32}
            onClick={() => {
              setshowDetails("sales");
              navigate("/sales/");
            }}
          />
          <img
            className="cursor icons-responsive-size"
            src={showDetails === "support" ? Selectedsupport : support}
            alt=""
            height={32}
            width={32}
            onClick={() => {
              setshowDetails("support");
              navigate("/support/");
            }}
          />
          <img
            className="cursor icons-responsive-size"
            src={showDetails === "sub_user" ? sub_user_selected : sub_user}
            alt=""
            height={32}
            width={32}
            onClick={() => {
              setshowDetails("sub_user");
              navigate("/subuser/");
            }}
          />
          <img
            className="cursor icons-responsive-size"
            src={showDetails === "notification" ? bellSelected : bell}
            alt=""
            height={32}
            width={32}
            onClick={() => {
              setshowDetails("notification");
              navigate("/notification/");
            }}
          />
          <img
            className="cursor icons-responsive-size"
            src={showDetails === "ads" ? Selected_ad2 : ad2}
            alt=""
            height={32}
            width={32}
            onClick={() => {
              setshowDetails("ads");
              navigate("");
            }}
          />
          <img
            className="cursor icons-responsive-size"
            src={showDetails === "settings" ? Selectedchartpie : chartpie}
            alt=""
            height={32}
            width={32}
            onClick={() => {
              setshowDetails("settings");
              navigate("");
            }}
          />
          <img
            className="cursor icons-responsive-size"
            src={
              showDetails === "settings-editor" ? S_adjustments : adjustments
            }
            alt=""
            height={32}
            width={32}
            onClick={() => {
              setshowDetails("settings-editor");
              navigate("");
            }}
          />
        </div>
        <div className="">
          <img
            className="cursor icons-responsive-size"
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
