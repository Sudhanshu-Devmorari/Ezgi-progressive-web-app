import React from "react";
import home from "../../assets/apps.svg";
import users from "../../assets/users.svg";
import target from "../../assets/target-arrow.svg";
import Group from "../../assets/Group 95.svg";
import wallet from "../../assets/wallet.svg";
import basket from "../../assets/basket.svg";
import lifebuoydark from "../../assets/lifebuoy.svg";
import usercode from "../../assets/user-code.svg";
import bell from "../../assets/bell.svg";
import ad2 from "../../assets/ad-2.svg";
import chartpie from "../../assets/chart-pie.svg";
import adjustments from "../../assets/adjustments.svg";
import logout from "../../assets/logout.svg";
import "./SideBar.css";

const SideBar = () => {
  return (
    <>
      <div className="dark-mode d-flex flex-column p-3 justify-content-between align-items-center me-2 h-100 icons-gap gap-3">
        <div className="d-flex flex-column gap-3 ">
          <img
            className="icons-sidebar"
            src={home}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar"
            src={users}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar"
            src={target}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar"
            src={Group}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar"
            src={wallet}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar"
            src={basket}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar"
            src={lifebuoydark}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar"
            src={usercode}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar"
            src={bell}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar"
            src={ad2}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar"
            src={chartpie}
            alt=""
            height={32}
            width={32}
          />
          <img
            className="icons-sidebar"
            src={adjustments}
            alt=""
            height={32}
            width={32}
          />
        </div>
        <div className="">
          <img
            className="icons-sidebar"
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
