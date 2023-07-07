import React from "react";
import selectedHomeIcon from "../../assets/selectedHomeIcon.svg";
import HomeIcon from "../../assets/HomeIcon.svg";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import SelectedProfileIcon from "../../assets/SelectedProfileIcon.svg";
import BowIcon from "../../assets/BowIcon.svg";
import SelectedBow from "../../assets/SelectedBow.svg";
import startFooter from "../../assets/startFooter.svg";
import selectedStarFooter from "../../assets/selectedStarFooter.svg";

export const Footer = (props) => {
  return (
    <>
      <nav
        className="navbar fixed-bottom py-0"
        style={{ backgroundColor: "#00659D" }}
      >
        <div className="container-fluid">
          <div className="col text-center">
            {props.selectContent === "home" ? (
              <img
                onClick={() => props.setSelectContent("home")}
                src={selectedHomeIcon}
                alt=""
                height={55}
                width={55}
              />
            ) : (
              <img
                onClick={() => props.setSelectContent("home")}
                src={HomeIcon}
                alt=""
                height={55}
                width={55}
              />
            )}
          </div>
          <div className="col text-center">
            {props.selectContent === "editor" ? (
              <img
                onClick={() => props.setSelectContent("editor")}
                src={SelectedProfileIcon}
                alt=""
                height={55}
                width={55}
              />
            ) : (
              <img
                onClick={() => props.setSelectContent("editor")}
                src={ProfileIcon}
                alt=""
                height={55}
                width={55}
              />
            )}
          </div>
          <div className="col text-center">
            {props.selectContent === "comments" ? (
              <img
                onClick={() => props.setSelectContent("comments")}
                src={SelectedBow}
                alt=""
                height={55}
                width={55}
              />
            ) : (
              <img
                onClick={() => props.setSelectContent("comments")}
                src={BowIcon}
                alt=""
                height={55}
                width={55}
              />
            )}
          </div>
          <div className="col text-center">
            {props.selectContent === "Star" ? (
              <img src={selectedStarFooter} alt="" height={55} width={55} />
            ) : (
              <img src={startFooter} alt="" height={55} width={55} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
