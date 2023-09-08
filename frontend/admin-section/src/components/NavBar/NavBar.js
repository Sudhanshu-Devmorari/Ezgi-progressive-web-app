import React from "react";
import "./NavBar.css";
import profile from "../../assets/profile.png";
import bell from "../../assets/bell-ringing-1.svg";
import NotificationModel from "../NotificationModel/NotificationModel";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg p-0">
        <div
          className="container-fluid justify-content-end dark-mode"
          style={{ fontSize: "1rem" }}
        >
          <button
            className="px-3 py-1"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
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
            <img
              className="cursor"
              onClick={() => navigate("/notification/")}
              src={bell}
              alt=""
              height={33}
              width={33}
            />
          </span>
          <span
            className="py-1 px-4"
            style={{
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

      {/* <!-- Modal --> */}
      <NotificationModel />
    </>
  );
};

export default NavBar;
