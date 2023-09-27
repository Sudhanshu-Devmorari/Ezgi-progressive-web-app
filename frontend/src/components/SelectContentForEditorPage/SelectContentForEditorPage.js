import React, { useContext, useState } from "react";
import publicIcon from "../../assets/world-check.png";
import CurrentTheme from "../../context/CurrentTheme";
import "./SelectContentForEditorPage.css";
import { CommentFilter } from "../CommentFilter/CommentFilter";
import world_check from "../../assets/world-check.svg";
import darkGrp from "../../assets/Group 712.png";
import lighGrp from "../../assets/Group 721.png";
import EditorFilter from "../EditorFilter/EditorFilter";
import CommentsPageModal from "../CommentsPageModal/CommentsPageModal";
import publicSelectedIcon from "../../assets/Public Content Radio Button Selected.svg";
import lighGrpSelected from "../../assets/Group 312.png";

const SelectContentForEditorPage = (props) => {
  const { handleOnlyPublicData } = props;
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [modalShow, setModalShow] = React.useState(false);

  const filterData = (e) => {
    props.setPublicSelected && props?.setPublicSelected(false);
    if (props.editor == true) {
      const val = e.target.value;
      if (val !== "") {
        const filteredArray = props.data.filter(
          (obj) =>
            obj?.value?.user?.username
              ?.toLowerCase()
              .startsWith(val.toLowerCase()) ||
            obj?.value?.user?.username
              ?.toLowerCase()
              .includes(val.toLowerCase())
        );
        props.setFilterData(filteredArray);
      } else {
        props.setFilterData(props.data);
      }
    } else {
      const val = e.target.value;
      if (val !== "") {
        const filteredArray = props.data.filter(
          (obj) =>
            obj?.value?.commentator_user?.username
              ?.toLowerCase()
              .startsWith(val.toLowerCase()) ||
            obj?.value?.user?.username
              ?.toLowerCase()
              .includes(val.toLowerCase()) ||
            obj?.value?.match_detail
              ?.toLowerCase()
              .startsWith(val.toLowerCase()) ||
            obj?.value?.match_detail?.toLowerCase().includes(val.toLowerCase())
        );
        props?.setFilterCommentData(filteredArray);
      } else {
        props?.setFilterCommentData(props.data);
      }
    }
  };

  return (
    <>
      <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } d-flex g-0 my-2 align-items-center p-1 responsive-font`}
      >
        <div className="input-group flex-nowrap" style={{ width: "38%" }}>
          <span
            className={`input-group-text ${
              currentTheme === "dark" ? "search-icon-dark" : "search-icon-light"
            }`}
            id="basic-addon1"
          >
            <i
              className={`fa-solid fa-magnifying-glass`}
              style={{
                color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
              }}
            ></i>
          </span>
          <input
            onChange={filterData}
            type="text"
            className={` ${
              currentTheme === "dark" ? "input-field-dark" : "input-field-light"
            }`}
          />
        </div>
        <div className={`${props?.editor && "ms-auto"}`}>
          <button
            onClick={() => setModalShow(true)}
            className="px-3 py-1"
            style={{
              border:
                currentTheme === "dark"
                  ? "1px solid #E6E6E6"
                  : "1px solid #0D2A53",
              color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
              backgroundColor: "transparent",
              borderRadius: "2px",
            }}
          >
            Filtre
          </button>
        </div>
        {props.comments && (
          <div className="ms-auto d-flex align-items-center px-2">
            <img
              onContextMenu={(e) => e.preventDefault()}
              src={currentTheme === "dark" ? world_check : publicIcon}
              alt=""
              style={{ color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6" }}
              height={32}
              width={32}
            />
            <span className="pe-2" style={{ width: "max-content" }}>
              Only Public
            </span>
            <div
              onClick={() => {
                handleOnlyPublicData(props.publicSelected);
                props.setPublicSelected(!props.publicSelected);
                props.publicSelected == true
                  ? props.setOnlyPublic("")
                  : props.setOnlyPublic("only public");
              }}
            >
              <img
                onContextMenu={(e) => e.preventDefault()}
                // src={currentTheme === "dark" ? darkGrp : lighGrp}
                src={
                  currentTheme === "dark"
                    ? props.publicSelected
                      ? publicSelectedIcon
                      : darkGrp
                    : props.publicSelected
                    ? lighGrpSelected
                    : lighGrp
                }
                alt=""
                height={28}
                width={28}
              />
            </div>
          </div>
        )}
      </div>

      {props?.editor && (
        <EditorFilter
          show={modalShow}
          onHide={() => setModalShow(false)}
          setFilterData={props.setFilterData}
        />
      )}
      {props?.comments && (
        <CommentsPageModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          setFilterCommentData={props.setFilterCommentData}
        />
      )}
    </>
  );
};

export default SelectContentForEditorPage;
