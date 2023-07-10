import React, { useContext, useEffect, useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";
import { PiBellRingingBold } from "react-icons/pi";
import "./NavBar.css";
import SignUpModal from "../SignUpModal/SignUpModal";
import AddCommentModal from "../AddCommentModal/AddCommentModal";
import CurrentTheme from "../../context/CurrentTheme";

const NavBar = (props) => {
  const [ShowModal, setShowModal] = useState(1);
  const {currentTheme, setCurrentTheme} = useContext(CurrentTheme);

  const [signUpModalShow, setSignUpModalShow] = React.useState(false);
  const [addCommentShow, setAddCommentShow] = React.useState(false);

  const [currentThemeMode, setCurrentThemeMode] = useState("light");

  const handleTheme = (e) => {
    if (e === "dark") {
      localStorage.setItem("CurrentTheme", "dark")
      document.body.classList.remove("body-light-mode")
      document.body.classList.add("body-dark-mode")
      setCurrentThemeMode("dark");
      setCurrentTheme("dark");
    } else {
      localStorage.setItem("CurrentTheme", "light")
      document.body.classList.remove("body-dark-mode")
      document.body.classList.add("body-light-mode")
      setCurrentThemeMode("light");
      setCurrentTheme("light");
    }
  };
  
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
      >
        <div className="container-fluid justify-content-end">
          <div className="">
            {currentTheme === "light" ? (
              <span className="p-2">
                <CiDark fontSize={"2rem"} onClick={() => handleTheme("dark")} />
              </span>
            ) : (
              <span className="p-2">
                <CiLight onClick={() => handleTheme("light")} fontSize={"2rem"}/>
              </span>
            )}
            <span className="px-0 py-2">
              <PiBellRingingBold fontSize={"2rem"} />
            </span>
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
          </div>
        </div>
      </nav>
      {/* <button onClick={() => setAddCommentShow(true)}>add comment</button> */}

      <SignUpModal
        show={signUpModalShow}
        onHide={() => setSignUpModalShow(false)}
        ShowModal={ShowModal}
        setShowModal={setShowModal}
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
