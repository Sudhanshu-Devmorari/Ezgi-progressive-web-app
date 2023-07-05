import React, { useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";
import { PiBellRingingBold } from "react-icons/pi";
import "./NavBar.css";
import SignUpModal from "../SignUpModal/SignUpModal";
import AddCommentModal from "../AddCommentModal/AddCommentModal";

const NavBar = (props) => {
  const [ShowModal, setShowModal] = useState(1);

  const [signUpModalShow, setSignUpModalShow] = React.useState(false);
  const [addCommentShow, setAddCommentShow] = React.useState(false);

  const [currentTheme, setCurrentTheme] = useState("light");
  const handleTheme = (e) => {
    console.log("e", e);
    if (e === "dark") {
      localStorage.setItem("CurrentTheme", "dark")
      setCurrentTheme("dark");
    } else {
      localStorage.setItem("CurrentTheme", "light")
      setCurrentTheme("light");
    }
  };
  
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-body-tertiary border ${
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
