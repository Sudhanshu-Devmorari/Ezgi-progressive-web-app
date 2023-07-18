import React from "react";
import selectedHomeIcon from "../../assets/homeSelected.png";
import HomeIcon from "../../assets/home.png";
import EditorIcon from "../../assets/EditorIcon.png";
import SelectedEditorIcon from "../../assets/SelectedEditorIcon.png";
import BowIcon from "../../assets/target-arrow.3.png";
import SelectedBow from "../../assets/target-arrow.svg";
import startFooter from "../../assets/star.svg";
import selectedFav from "../../assets/starSelected.png";

export const Footer = (props) => {
  return (
    <>
      <nav
        className="navbar fixed-bottom py-0"
        style={{ backgroundColor: "#00659D" }}
      >
        <div className="container-fluid py-1">
          <div className="col text-center">
            <img
              onClick={() => props.setSelectContent("home")}
              src={props.selectContent === "home" ? selectedHomeIcon : HomeIcon}
              alt=""
              height={45}
              width={45}
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
              height={45}
              width={45}
            />
          </div>
          <div className="col text-center">
            <img
              onClick={() => {props.setSelectContent("comments");props.setDashboardSUser(false);}}
              src={props.selectContent === "comments" ? SelectedBow : BowIcon}
              alt=""
              height={40}
              width={40}
            />
          </div>
          <div className="col text-center">
            <img
              src={props.selectContent === "fav" ? selectedFav : startFooter}
              alt=""
              height={39}
              width={39}
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
