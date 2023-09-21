import React, { useContext, useState } from "react";
import selectedHomeIcon from "../../assets/Main Page Selected.svg";
import HomeIcon from "../../assets/Main Page.svg";
import EditorIcon from "../../assets/Editors Page (1).svg";
import SelectedEditorIcon from "../../assets/Menu Icon.svg";
import BowIcon from "../../assets/Comments Page.svg";
import SelectedBow from "../../assets/Menu Icon (1).svg";
import startFooter from "../../assets/Favorite Page (1).svg";
import selectedFav from "../../assets/Sub Header Favorite Selected.svg";
import logout from "../../assets/logout icon (1).svg";
import { userId } from "../GetUser";
import SignUpModal from "../SignUpModal/SignUpModal";
import CurrentTheme from "../../context/CurrentTheme";

export const Footer = (props) => {
  const [showSignup, setShowSignup] = useState(false);
  const { setShowModal } = useContext(CurrentTheme);
  return (
    <>
      <nav
        className="navbar fixed-bottom py-0"
        style={{ backgroundColor: "#00659D" }}
      >
        <div className="container-fluid py-2">
          <div className="col text-center">
            <img
              onClick={() => {
                localStorage.setItem("dashboardShow", false);
                localStorage.setItem("currentpage", "home");
                props.setSelectContent("home");
                props.setDashboardSUser(false);
              }}
              src={props.selectContent === "home" ? selectedHomeIcon : HomeIcon}
              alt=""
              height={38}
              width={38}
            />
          </div>
          <div className="col text-center">
            <img
              onClick={() => {
                localStorage.setItem("dashboardShow", false);
                localStorage.setItem("priviouspage", props.selectContent);
                localStorage.setItem("currentpage", "editor");
                props.setSelectContent("editor");
                props.setDashboardSUser(false);
              }}
              src={
                props.selectContent === "editor"
                  ? SelectedEditorIcon
                  : EditorIcon
              }
              alt=""
              height={38}
              width={38}
            />
          </div>
          <div className="col text-center">
            <img
              onClick={() => {
                localStorage.setItem("dashboardShow", false);
                localStorage.setItem("priviouspage", props.selectContent);
                localStorage.setItem("currentpage", "comments");
                props.setSelectContent("comments");
                props.setDashboardSUser(false);
              }}
              src={props.selectContent === "comments" ? SelectedBow : BowIcon}
              alt=""
              height={38}
              width={38}
            />
          </div>
          <div className="col text-center">
            <img
              src={props.selectContent === "fav" ? selectedFav : startFooter}
              alt=""
              height={38}
              width={38}
              onClick={() => {
                if (!userId) {
                  setShowSignup(true);
                } else {
                  localStorage.setItem("dashboardShow", true);
                  localStorage.setItem("priviouspage", props.selectContent);
                  localStorage.setItem("currentpage", "fav");
                  localStorage.setItem("subcurrentpage", "fav");
                  props.setSelectContent("fav");
                  props.setDashboardSUser(true);
                }
                setShowModal(4);
              }}
            />
          </div>
          {userId && (
            <div className="col text-center">
              <img
                src={logout}
                alt=""
                height={38}
                width={38}
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              />
            </div>
          )}
        </div>
      </nav>
      <SignUpModal
        show={showSignup}
        onHide={() => setShowSignup(false)}
        // ShowModal={ShowModal}
      />
    </>
  );
};
