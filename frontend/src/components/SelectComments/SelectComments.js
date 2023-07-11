import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import "./SelectComments.css"

const SelectComments = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } g-0 my-2 px-2 py-3 d-flex justify-content-between select-comment`}
      >
        <div style={{color: props.SelectComment === "activeComments" ? "#D2DB08" : ""}} onClick={()=>props.setSelectComment("activeComments")}>Active Comments</div>
        <div style={{color: props.SelectComment === "resolvedComments" ? "#D2DB08" : ""}} onClick={()=>props.setSelectComment("resolvedComments")}>Resolved Comments</div>
        <div style={{color: props.SelectComment === "statistics" ? "#D2DB08" : ""}} onClick={()=>props.setSelectComment("statistics")}>Statistics</div>
      </div>
    </>
  );
};

export default SelectComments;
