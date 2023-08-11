import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LevelRules = (props) => {

  const getRuleForLevel = props?.getRuleForLevel || {};

  const [levelRules, setLevelRules] = useState({
    daily_match_limit: getRuleForLevel.daily_match_limit || "",
    monthly_min_limit: getRuleForLevel.monthly_min_limit || "",
    ods_limit: getRuleForLevel.ods_limit || "",
    winning_limit: getRuleForLevel.winning_limit || "",
    sucess_rate: getRuleForLevel.sucess_rate || "",
    subscriber_limit: getRuleForLevel.subscriber_limit || "",
    level_icon: getRuleForLevel.level_icon || "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setLevelRules((prevRules) => ({
      ...prevRules,
      [name]: value,
    }));
  };
  console.log("Initialized State:", levelRules);
  console.log("getRuleForLevel=====>>>", getRuleForLevel);
  console.log(
    "getRuleForLevel.daily_match_limit=====>>>",
    getRuleForLevel.daily_match_limit
  );
  //   Update Level - Rule
  const updateRule = async () => {
    const res = await axios.post(
      `http://127.0.0.1:8000/level-rule/?commentator_level=${props?.selectLevel.toLowerCase()}`,
      levelRules
    );
  };
  return (
    <>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Daily Match Limit</span>
            <input
              onChange={handleChangeInput}
              name="daily_match_limit"
              type="text"
              className="darkMode-input form-control text-center"
              value={levelRules.daily_match_limit}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Monthly Min.Content</span>
            <input
              onChange={handleChangeInput}
              name="monthly_min_limit"
              type="text"
              className="darkMode-input form-control text-center"
              value={levelRules.monthly_min_limit}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Odds Limit</span>
            <input
              onChange={handleChangeInput}
              name="ods_limit"
              type="text"
              className="darkMode-input form-control text-center"
              value={levelRules.ods_limit}
            />
          </div>
        </div>
      </div>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Winning Limit</span>
            <input
              onChange={handleChangeInput}
              name="winning_limit"
              type="text"
              className="darkMode-input form-control text-center"
              value={levelRules.winning_limit}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Success Rate</span>
            <input
              onChange={handleChangeInput}
              name="sucess_rate"
              type="text"
              className="darkMode-input form-control text-center"
              value={levelRules.sucess_rate}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Subscriber Limit</span>
            <input
              onChange={handleChangeInput}
              name="subscriber_limit"
              type="text"
              className="darkMode-input form-control text-center"
              value={levelRules.subscriber_limit}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Level Icon & Color</span>
            <input
              onChange={handleChangeInput}
              name="level_icon"
              type="text"
              className="darkMode-input form-control text-center"
              value={levelRules.level_icon}
            />
          </div>
        </div>
      </div>
      <div lassName="my-3 d-flex justify-content-center">
        <div
          class="fixed-bottom  d-flex justify-content-center"
          style={{ marginBottom: "200px" }}
        >
          <button
            className="py-1 px-3"
            style={{
              color: "#D2DB08",
              border: "1px solid #D2DB08",
              borderRadius: "3px",
              backgroundColor: "transparent",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default LevelRules;
