import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import upload from "../../assets/upload.svg";
import config from "../../config";
import { useFormik } from "formik";
import * as Yup from "yup";

const SalesHighlightSettings = (props) => {
  const [previewIcon, setPreviewIcon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    week_1: Yup.number()
      .required("1 Week is required")
      .min(0, "1 Week must be at least 0")
      .typeError("1 Week must be a number")
      .positive("1 Week must be positive"),
    week_2: Yup.number()
      .required("2 Week is required")
      .min(0, "2 Week must be at least 0")
      .typeError("2 Week must be a number")
      .positive("1 Week must be positive"),
    month_1: Yup.number()
      .required("1 Month is required")
      .min(0, "1 Month must be at least 0")
      .typeError("1 Month must be a number")
      .positive("1 Month must be positive"),
    highlight_icon: Yup.mixed().required("Highlight icon is required"),
  });

  const initialValues = {
    week_1: "",
    week_2: "",
    month_1: "",
    highlight_icon: null,
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${
            config?.apiUrl
          }/highlight-setting/?commentator_level=${props?.selectLevel?.toLowerCase()}`
        );
        const data = res.data[0];
        console.log(data);
        setIsLoading(false);
        if (res.status === 200) {
          formik.setValues({
            week_1: data?.week_1,
            week_2: data?.week_2,
            month_1: data?.month_1,
            highlight_icon: data?.highlight_icon ? data?.highlight_icon : "",
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          formik.resetForm();
        }
      }
    }
    getData();
  }, [props?.selectLevel]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        if (previewIcon) {
          formData.append("highlight_icon", values.highlight_icon);
        }
        for (const key in values) {
          if (key !== "highlight_icon") {
            formData.append(key, values[key]);
          }
        }
        setIsLoading(true);
        const res = await axios.post(
          `${
            config?.apiUrl
          }/highlight-setting/?commentator_level=${props?.selectLevel?.toLowerCase()}`,
          formData
        );
        setIsLoading(false);
        if (res.status === 201) {
          Swal.fire({
            title: "Success",
            text: "Highlight Setting Updated!",
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
                <span className="p-1 ps-0">1 Week</span>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  className="darkMode-input form-control text-center"
                  value={formik.values.week_1}
                  name="week_1"
                />
                {formik.touched.week_1 && formik.errors.week_1 && (
                  <div className="text-danger">{formik.errors.week_1}</div>
                )}
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">2 Week</span>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  className="darkMode-input form-control text-center"
                  value={formik.values.week_2}
                  name="week_2"
                />
                {formik.touched.week_2 && formik.errors.week_2 && (
                  <div className="text-danger">{formik.errors.week_2}</div>
                )}
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">1 Month</span>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  className="darkMode-input form-control text-center"
                  value={formik.values.month_1}
                  name="month_1"
                />
                {formik.touched.month_1 && formik.errors.month_1 && (
                  <div className="text-danger">{formik.errors.month_1}</div>
                )}
              </div>
            </div>
          </div>
          <div className="my-2 mt-3 d-flex gap-3">
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Highlight Icon & Color</span>
                <label
                  className="p-1 text-center cursor"
                  htmlFor="level-icon"
                  style={{ backgroundColor: "#0B2447", borderRadius: "4px" }}
                >
                  {(previewIcon || formik.values.highlight_icon) && (
                    <span className="pe-2">
                      {" "}
                      <img
                        src={
                          previewIcon
                            ? previewIcon
                            : `${config?.apiUrl}${formik.values.highlight_icon}`
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
                        formik.setFieldValue("highlight_icon", selectedFile);
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
                {formik.touched.highlight_icon &&
                  formik.errors.highlight_icon && (
                    <div className="text-danger">
                      {formik.errors.highlight_icon}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div
            class="fixed-bottom  d-flex justify-content-center"
            style={{ marginBottom: "200px" }}
          >
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
              {isLoading ? "Loading" : "Save"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default SalesHighlightSettings;
