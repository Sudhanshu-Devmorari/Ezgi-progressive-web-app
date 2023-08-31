import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import SignUpModal from "../SignUpModal/SignUpModal";
import AddCommentModal from "../AddCommentModal/AddCommentModal";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import bell from "../../assets/Header Notification.svg";
import bellLight from "../../assets/Header Notification (1).svg";
import darkmode from "../../assets/brightness-up.png";
import moon from "../../assets/Header Dark Mode.svg";
import { userId } from "../GetUser";

const NavBar = (props) => {
  const { currentTheme, setCurrentTheme, ShowModal, setShowModal } =
    useContext(CurrentTheme);

  const [signUpModalShow, setSignUpModalShow] = React.useState(false);
  const [addCommentShow, setAddCommentShow] = React.useState(false);

  const handleTheme = (e) => {
    if (e === "dark") {
      localStorage.setItem("CurrentTheme", "dark");
      document.body.classList.remove("body-light-mode");
      document.body.classList.add("body-dark-mode");
      setCurrentTheme("dark");
    } else {
      localStorage.setItem("CurrentTheme", "light");
      document.body.classList.remove("body-dark-mode");
      document.body.classList.add("body-light-mode");
      setCurrentTheme("light");
    }
  };
  const userPhone = localStorage.getItem("user-role");

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } ${props?.selectContent === "become-editor" && "mx-2"}`}
      >
        <div className="container-fluid justify-content-end">
          <div className="">
            {currentTheme === "light" ? (
              <span className="p-2">
                <img
                  src={moon}
                  alt=""
                  height={35}
                  width={35}
                  onClick={() => handleTheme("dark")}
                />
              </span>
            ) : (
              <span className="p-2">
                <img
                  src={darkmode}
                  alt=""
                  height={35}
                  width={35}
                  onClick={() => {
                    handleTheme("light");
                  }}
                />
              </span>
            )}
            <span className="pe-2 ps-0 py-2">
              <img
                src={currentTheme === "dark" ? bell : bellLight}
                alt=""
                height={35}
                width={35}
                onClick={() => {
                  if (!userId) {
                    setSignUpModalShow(true);
                  } else {
                    props.setDashboardSUser(true);
                    props.setSelectContent("notifications");
                  }
                }}
              />
            </span>
            {userPhone ? (
              <>
                <span
                  onClick={() => {
                    props.setDashboardSUser(true);
                    props.setSelectContent("show-all-comments");
                  }}
                  className="py-2 px-3"
                  style={{
                    backgroundColor:
                      currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                  }}
                >
                  Dashboard
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
              </>
            ) : (
              <>
                <span
                  className="p-2 cursor"
                  onClick={() => {
                    setSignUpModalShow(true);
                    setShowModal(1);
                  }}
                >
                  Sign Up
                </span>
                <span
                  className="px-0 py-2 cursor"
                  onClick={() => {
                    setSignUpModalShow(true);
                    setShowModal(4);
                  }}
                >
                  Sign In
                </span>
              </>
            )}
          </div>
        </div>
      </nav>
      <SignUpModal
        show={signUpModalShow}
        onHide={() => setSignUpModalShow(false)}
        ShowModal={ShowModal}
      />
      <AddCommentModal
        show={addCommentShow}
        onHide={() => {
          setAddCommentShow(false);
        }}
      />
    </>
  );
};

export default NavBar;
