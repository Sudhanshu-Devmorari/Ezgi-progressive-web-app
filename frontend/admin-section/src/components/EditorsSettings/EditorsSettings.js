import React, { useState, useEffect } from "react";
import "./EditorsSettings.css";
import LevelRules from "../LevelRules/LevelRules";
import axios from "axios";
import config from "../../config";
import FaqSettingSection from "../FaqSettingSection/FaqSettingSection";

const EditorsSettings = () => {
  const [selectLevel, setSelectLevel] = useState("Apprentice");
  const [activeTab, setActiveTab] = useState("levelRule");

  return (
    <>
      <div className="p-2 m-2 fonts-block">
        <div
          className="d-flex gap-3 align-items-center"
          role="group"
          aria-label=""
        >
          <div
            className="m-3"
            style={{
              fontSize: "1.1rem",
              color: activeTab == "levelRule" ? "#D2DB08" : "#FFF",
              cursor: "pointer",
            }}
            onClick={() => setActiveTab("levelRule")}
          >
            Level Rules Settings
          </div>
          <div
            className="m-3"
            style={{
              fontSize: "1.1rem",
              color: activeTab !== "levelRule" ? "#D2DB08" : "#FFF",
              cursor: "pointer",
            }}
            onClick={() => setActiveTab("faqSetting")}
          >
            FAQ Settings
          </div>
        </div>
        {activeTab == "faqSetting" && <FaqSettingSection />}
        {activeTab !== "faqSetting" && (
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
                style={{ color: selectLevel === "master" && "#FFEE7D" }}
                onClick={() => setSelectLevel("master")}
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
        )}
      </div>
    </>
  );
};

export default EditorsSettings;
