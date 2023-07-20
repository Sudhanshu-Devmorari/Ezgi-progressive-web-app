import React from "react";
import "./NavBar.css";
import profile from "../../assets/profile.png";
import bell from "../../assets/bell-ringing-1.svg";
import brightness from "../../assets/brightness-up.png";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid justify-content-end dark-mode" style={{fontSize: "0.8rem"}}>
          <button
          className="px-3 py-1"
            style={{
              color: "#D2DB08",
              border: "1px solid #D2DB08",
              borderRadius: "3px",
              backgroundColor: "transparent",
            }}
          >
            Send Notification
          </button>
          <span className="p-2">
            <img src={brightness} alt="" height={35} width={35} />
          </span>
          <span className="pe-2 ps-0 py-2">
            <img
              //   src={currentTheme === "dark" ? bell : bellLight}
              src={bell}
              alt=""
              height={33}
              width={33}
            />
          </span>
          <span
            className="py-1 px-4"
            style={{
              //   backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              backgroundColor: "#19376D",
            }}
          >
            Admin Panel
          </span>
          <span className="ps-2">
            <img
              src={profile}
              alt=""
              height={45}
              width={45}
              style={{ borderRadius: "50%" }}
            />
          </span>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
