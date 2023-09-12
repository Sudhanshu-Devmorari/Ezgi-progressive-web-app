import React, { useState, useEffect } from "react";
import "./EditorsSettings.css";
import LevelRules from "../LevelRules/LevelRules";
import axios from "axios";
import config from "../../config";

const EditorsSettings = () => {
  const [selectLevel, setSelectLevel] = useState("Apprentice");

  return (
    <>
      <div className="p-2 m-2 fonts-block">
        <div className="m-3" style={{ fontSize: "1.1rem" }}>
          Level Rules Settings
        </div>
        <div className="m-3">
          <div className="my-2 mt-3">
            <span
              className="p-2 cursor ps-0"
              style={{ color: selectLevel === "Apprentice" && "#FFEE7D" }}
              onClick={() => setSelectLevel("Apprentice")}
            >
              Apprentice
            </span>
            <span
              className="p-2 cursor"
              style={{ color: selectLevel === "Journeyman" && "#FFEE7D" }}
              onClick={() => setSelectLevel("Journeyman")}
            >
              Journeyman
            </span>
            <span
              className="p-2 cursor"
              style={{ color: selectLevel === "Expert" && "#FFEE7D" }}
              onClick={() => setSelectLevel("Expert")}
            >
              Expert
            </span>
            <span
              className="p-2 cursor"
              style={{ color: selectLevel === "Grandmaster" && "#FFEE7D" }}
              onClick={() => setSelectLevel("Grandmaster")}
            >
              Grandmaster
            </span>
          </div>
          <LevelRules selectLevel={selectLevel} />
        </div>
      </div>
    </>
  );
};

export default EditorsSettings;
