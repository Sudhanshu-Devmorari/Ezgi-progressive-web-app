import React, { useEffect, useState } from "react";
import axios from "axios";
import upload from "../../assets/upload.svg";
import "./LevelRules.css";
import Swal from "sweetalert2";
import config from "../../config";
import { useFormik } from "formik";
import * as Yup from "yup";

const LevelRules = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewIcon, setPreviewIcon] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${
            config?.apiUrl
          }/level-rule/?commentator_level=${props?.selectLevel?.toLowerCase()}`
        );
        setIsLoading(false);
        if (res.status === 200) {
          const data = res.data[0];
          // console.log(data);
          formik.setValues({
            daily_match_limit: data?.daily_match_limit,
            monthly_min_limit: data?.monthly_min_limit,
            ods_limit: data?.ods_limit,
            winning_limit: data?.winning_limit,
            sucess_rate: data?.sucess_rate,
            subscriber_limit: data?.subscriber_limit,
            level_icon: data?.level_icon ? data?.level_icon : "",
          });
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false)
        if (error.response?.status === 404) {
          formik.resetForm();
        }
      }
    }
    getData();
  }, [props?.selectLevel]);

  const validationSchema = Yup.object({
    daily_match_limit: Yup.number()
      .required("Daily Match Limit is required")
      .positive("Daily Match Limit must be positive"),
    monthly_min_limit: Yup.number()
      .required("Monthly Min.Content is required")
      .positive("Monthly Min.Content must be positive"),
    ods_limit: Yup.string().required("Odds Limit is required"),
    winning_limit: Yup.number()
      .required("Winning Limit is required")
      .positive("Winning Limit must be positive"),
    sucess_rate: Yup.string().required("Success Rate is required"),
    subscriber_limit: Yup.string().required("Subscriber Limit is required"),
    level_icon: Yup.mixed().required("Level icon is required"),
  });

  const formik = useFormik({
    initialValues: {
      daily_match_limit: "",
      monthly_min_limit: "",
      ods_limit: "",
      winning_limit: "",
      sucess_rate: "",
      subscriber_limit: "",
      level_icon: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        if (previewIcon) {
          formData.append("level_icon", values.level_icon);
        }
        for (const key in values) {
          if (key !== "level_icon") {
            formData.append(key, values[key]);
          }
        }
        setIsLoading(true);
        const res = await axios.post(
          `${
            config?.apiUrl
          }/level-rule/?commentator_level=${props?.selectLevel.toLowerCase()}`,
          formData
        );
        setIsLoading(false);
        if (res.status === 201) {
          Swal.fire({
            title: "Success",
            text: "Level Rules setting Updated!",
            icon: "success",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="d-flex gap-1 h-100 my-2 pb-2 align-items-center justify-content-center">
          Loading...
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="my-2 mt-3 d-flex gap-3">
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Daily Match Limit</span>
                <input
                  onChange={formik.handleChange}
                  name="daily_match_limit"
                  type="text"
                  className="darkMode-input form-control text-center"
                  value={formik.values.daily_match_limit}
                />
                {formik.errors.daily_match_limit &&
                  formik.touched.daily_match_limit && (
                    <div className="error-message text-danger">
                      {formik.errors.daily_match_limit}
                    </div>
                  )}
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Monthly Min.Content</span>
                <input
                  onChange={formik.handleChange}
                  name="monthly_min_limit"
                  type="text"
                  className="darkMode-input form-control text-center"
                  value={formik.values.monthly_min_limit}
                />
                {formik.errors.monthly_min_limit &&
                  formik.touched.monthly_min_limit && (
                    <div className="error-message text-danger">
                      {formik.errors.monthly_min_limit}
                    </div>
                  )}
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Odds Limit</span>
                <input
                  onChange={formik.handleChange}
                  name="ods_limit"
                  type="text"
                  className="darkMode-input form-control text-center"
                  value={formik.values.ods_limit}
                />
                {formik.errors.ods_limit && formik.touched.ods_limit && (
                  <div className="error-message text-danger">
                    {formik.errors.ods_limit}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="my-2 mt-3 d-flex gap-3">
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Winning Limit</span>
                <input
                  onChange={formik.handleChange}
                  name="winning_limit"
                  type="text"
                  className="darkMode-input form-control text-center"
                  value={formik.values.winning_limit}
                />
                {formik.errors.winning_limit &&
                  formik.touched.winning_limit && (
                    <div className="error-message text-danger">
                      {formik.errors.winning_limit}
                    </div>
                  )}
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Success Rate</span>
                <input
                  onChange={formik.handleChange}
                  name="sucess_rate"
                  type="text"
                  className="darkMode-input form-control text-center"
                  value={formik.values.sucess_rate}
                />
                {formik.errors.sucess_rate && formik.touched.sucess_rate && (
                  <div className="error-message text-danger">
                    {formik.errors.sucess_rate}
                  </div>
                )}
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Subscriber Limit</span>
                <input
                  onChange={formik.handleChange}
                  name="subscriber_limit"
                  type="text"
                  className="darkMode-input form-control text-center"
                  value={formik.values.subscriber_limit}
                />
                {formik.errors.subscriber_limit &&
                  formik.touched.subscriber_limit && (
                    <div className="error-message text-danger">
                      {formik.errors.subscriber_limit}
                    </div>
                  )}
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Level Icon & Color</span>
                <label
                  className="p-1 text-center cursor"
                  htmlFor="level-icon"
                  style={{ backgroundColor: "#0B2447", borderRadius: "4px" }}
                >
                  {(previewIcon || formik.values.level_icon) && (
                    <span className="pe-2">
                      {" "}
                      <img
                        src={
                          previewIcon
                            ? previewIcon
                            : `${config?.apiUrl}${formik.values.level_icon}`
                        }
                        alt=""
                        height={22}
                        width={22}
                      />
                    </span>
                  )}
                  <img src={upload} alt="" height={22} width={22} />
                  <input
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    id="level-icon"
                    className="d-none"
                    onChange={(e) => {
                      const allowedTypes = ["image/jpeg", "image/png"];
                      const selectedFile = e.target.files[0];
                      if (allowedTypes.includes(selectedFile.type)) {
                        setPreviewIcon(URL.createObjectURL(selectedFile));
                        formik.setFieldValue("level_icon", selectedFile);
                      } else {
                        Swal.fire({
                          title: "Error",
                          text: "Invalid file type. Please select a valid image file.",
                          icon: "error",
                          backdrop: false,
                          customClass: "dark-mode-alert",
                        });
                        e.target.value = "";
                      }
                    }}
                  />
                </label>
              </div>
              {formik.errors.level_icon && formik.touched.level_icon && (
                <div className="error-message text-danger">
                  {formik.errors.level_icon}
                </div>
              )}
            </div>
          </div>

          <div className="my-3 d-flex justify-content-center">
            <div className="fixed-bottom  d-flex justify-content-center save-btn">
              <button
                type="submit"
                className="py-1 px-3"
                style={{
                  color: "#D2DB08",
                  border: "1px solid #D2DB08",
                  borderRadius: "3px",
                  backgroundColor: "transparent",
                }}
              >
                {isLoading ? "Loading..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default LevelRules;
