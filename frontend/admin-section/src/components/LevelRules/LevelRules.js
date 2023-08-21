import React, { useState } from "react";
import axios from "axios";
import upload from "../../assets/upload.svg";
import "./LevelRules.css";
import Swal from "sweetalert2";

const LevelRules = (props) => {
  const getRuleForLevel = props?.getRuleForLevel || {};

  const [previewIcon, setPreviewIcon] = useState(null);

  const handleChange = (e) => {
    props?.setGetRuleForLevel({
      ...getRuleForLevel,
      [e.target.name]: e.target.value,
    });
  };

  //   Update Level - Rule
  const updateRule = async () => {
    const formData = new FormData();
    if (previewIcon) {
      formData.append("level_icon", getRuleForLevel.level_icon);
    }
    for (const key in getRuleForLevel) {
      if (key !== "level_icon") {
        formData.append(key, getRuleForLevel[key]);
      }
    }
    const res = await axios.post(
      `http://127.0.0.1:8000/level-rule/?commentator_level=${props?.selectLevel.toLowerCase()}`,
      formData
    );
    // console.log("res========>>>", res);
    if (res.status === 201) {
      Swal.fire({
        title: "Success",
        text: "Level Rules setting Updated!",
        icon: "success",
        backdrop: false,
        customClass: "dark-mode-alert",
      });
    }
  };
  // console.log(getRuleForLevel, getRuleForLevel.level_icon);
  return (
    <>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Daily Match Limit</span>
            <input
              onChange={handleChange}
              name="daily_match_limit"
              type="text"
              className="darkMode-input form-control text-center"
              value={getRuleForLevel.daily_match_limit}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Monthly Min.Content</span>
            <input
              onChange={handleChange}
              name="monthly_min_limit"
              type="text"
              className="darkMode-input form-control text-center"
              value={getRuleForLevel.monthly_min_limit}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Odds Limit</span>
            <input
              onChange={handleChange}
              name="ods_limit"
              type="text"
              className="darkMode-input form-control text-center"
              value={getRuleForLevel.ods_limit}
            />
          </div>
        </div>
      </div>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Winning Limit</span>
            <input
              onChange={handleChange}
              name="winning_limit"
              type="text"
              className="darkMode-input form-control text-center"
              value={getRuleForLevel.winning_limit}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Success Rate</span>
            <input
              onChange={handleChange}
              name="sucess_rate"
              type="text"
              className="darkMode-input form-control text-center"
              value={getRuleForLevel.sucess_rate}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Subscriber Limit</span>
            <input
              onChange={handleChange}
              name="subscriber_limit"
              type="text"
              className="darkMode-input form-control text-center"
              value={getRuleForLevel.subscriber_limit}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Level Icon & Color</span>
            {/* <input
              onChange={handleChange}
              name="level_icon"
              type="text"
              className="darkMode-input form-control text-center"
              value={getRuleForLevel.level_icon}
            /> */}
            <label
              className="p-1 text-center cursor"
              htmlFor="level-icon"
              style={{ backgroundColor: "#0B2447", borderRadius: "4px" }}
            >
              {(previewIcon || getRuleForLevel.level_icon) && (
                <span className="pe-2">
                  {" "}
                  <img
                    src={
                      previewIcon
                        ? previewIcon
                        : `http://127.0.0.1:8000${getRuleForLevel.level_icon}`
                    }
                    alt=""
                    height={22}
                    width={22}
                  />
                </span>
              )}
              <img src={upload} alt="" height={22} width={22} />
              <input
                type="file"
                id="level-icon"
                className="d-none"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile) {
                    setPreviewIcon(URL.createObjectURL(selectedFile));
                    props?.setGetRuleForLevel({
                      ...getRuleForLevel,
                      level_icon: selectedFile,
                    });
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div lassName="my-3 d-flex justify-content-center">
        <div class="fixed-bottom  d-flex justify-content-center save-btn">
          <button
            onClick={updateRule}
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
