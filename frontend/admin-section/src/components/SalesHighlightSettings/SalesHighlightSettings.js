import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import upload from "../../assets/upload.svg";

const SalesHighlightSettings = (props) => {
  const highlightssettingData = props?.highlightssettingData || {};

  const [previewIcon, setPreviewIcon] = useState(null);

  const handleChange = (e) => {
    props?.setHighlightssettingData({
      ...highlightssettingData,
      [e.target.name]: e.target.value,
    });
  };

  //  Update Highlight Setting
  const UpdateHighlightSettings = async () => {
    const formData = new FormData();
    if (previewIcon) {
      formData.append("highlight_icon", highlightssettingData.level_icon);
    }
    for (const key in highlightssettingData) {
      if (key !== "highlight_icon") {
        formData.append(key, highlightssettingData[key]);
      }
    }
    const res = await axios.post(
      `http://127.0.0.1:8000/highlight-setting/?commentator_level=${props?.selectLevel.toLowerCase()}`,
      formData
    );
    // console.log("res========>>>", res);
    if (res.status === 201) {
      Swal.fire({
        title: "Success",
        text: "Highlight Setting Updated!",
        icon: "success",
        backdrop: false,
        customClass: "dark-mode-alert",
      });
    }
  };
  return (
    <>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">1 Week</span>
            <input
              onChange={handleChange}
              type="text"
              className="darkMode-input form-control text-center"
              value={highlightssettingData.week_1}
              name="week_1"
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">2 Week</span>
            <input
              onChange={handleChange}
              type="text"
              className="darkMode-input form-control text-center"
              value={highlightssettingData.week_2}
              name="week_2"
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">1 Month</span>
            <input
              onChange={handleChange}
              type="text"
              className="darkMode-input form-control text-center"
              value={highlightssettingData.month_1}
              name="month_1"
            />
          </div>
        </div>
      </div>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Highlight Icon & Color</span>
            {/* <input onChange={handleChange} type="text" className="darkMode-input form-control text-center" value={''}/> */}
            <label
              className="p-1 text-center cursor"
              htmlFor="level-icon"
              style={{ backgroundColor: "#0B2447", borderRadius: "4px" }}
            >
              {(previewIcon || highlightssettingData.highlight_icon) && (
                <span className="pe-2">
                  {" "}
                  <img
                    src={
                      previewIcon
                        ? previewIcon
                        : `http://127.0.0.1:8000${highlightssettingData.highlight_icon}`
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
                    props?.setHighlightssettingData({
                      ...highlightssettingData,
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
        <div
          class="fixed-bottom  d-flex justify-content-center"
          style={{ marginBottom: "200px" }}
        >
          <button
            onClick={UpdateHighlightSettings}
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

export default SalesHighlightSettings;
