import React from "react";
import editorIcon from "../../assets/Group 67.svg";
import salesIcon from "../../assets/basket-1.svg";
import SubIcon from "../../assets/wallet (1).svg";
import commentsIcon from "../../assets/target-arrow-1.svg";

const EditorSettingsOptions = (props) => {
  const array = [
    { img: editorIcon, name: "Editors Settings" },
    { img: salesIcon, name: "Sales Settings" },
    { img: SubIcon, name: "Withdrawal Settings" },
    { img: commentsIcon, name: "Comment Settings" },
  ];
  return (
    <>
      {array.map((res, index) => (
        <div
          key={index}
          className={`col dark-mode d-flex justify-content-center align-items-center ${
            res.name === "Editors Settings" && "ms-2"
          }`}
        >
          <img src={res.img} alt="" height={45} width={45} />
          <span
            style={{
              color: props.selectEditorSetting === res.name && "#D2DB08",
            }}
            className="cursor"
            onClick={() => props.setSelectEditorSetting(res.name)}
          >
            {res.name}
          </span>
        </div>
      ))}
    </>
  );
};

export default EditorSettingsOptions;
