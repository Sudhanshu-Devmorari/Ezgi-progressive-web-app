import React from "react";
import selectedHomeIcon from "../../assets/Main Page Selected.svg";
import HomeIcon from "../../assets/Main Page.svg";
import EditorIcon from "../../assets/Editors Page (1).svg";
import SelectedEditorIcon from "../../assets/Menu Icon.svg";
import BowIcon from "../../assets/Comments Page.svg";
import SelectedBow from "../../assets/Menu Icon (1).svg";
import startFooter from "../../assets/Favorite Page (1).svg";
import selectedFav from "../../assets/Sub Header Favorite Selected.svg";

export const Footer = (props) => {
  return (
    <>
      <nav
        className="navbar fixed-bottom py-0"
        style={{ backgroundColor: "#00659D" }}
      >
        <div className="container-fluid py-2">
          <div className="col text-center">
            <img
              onClick={() => props.setSelectContent("home")}
              src={props.selectContent === "home" ? selectedHomeIcon : HomeIcon}
              alt=""
              height={38}
              width={38}
            />
          </div>
          <div className="col text-center">
            <img
              onClick={() => {props.setSelectContent("editor");props.setDashboardSUser(false);}}
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
              onClick={() => {props.setSelectContent("comments");props.setDashboardSUser(false);}}
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
                props.setSelectContent("fav");
                props.setDashboardSUser(true);
              }}
            />
          </div>
        </div>
      </nav>
    </>
  );
};
