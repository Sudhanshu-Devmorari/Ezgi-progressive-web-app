import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import config from "../../config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomDropDownForCommentsCreatetion } from "../CustomDropDownForCommentsCreatetion";
import AxiosInstance from "../AxiosInstance";

const SalesSubscriptionSettings = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const durationOptions = ["1 Months", "3 Months", "6 Months", "1 Year"];
  const [editorDropDown, setEditorDropDown] = useState(false);
  const [selectedEditors, setSelectedEditors] = useState("Select");

  const formik = useFormik({
    initialValues: {
      duration: ["Select"],
    },
    validationSchema: Yup.object().shape({
      "1 Months":
        selectedEditors !== "Select" &&
        selectedEditors.includes("1 Months") &&
        Yup.number()
          .required(`This field is required.`)
          .positive("Please enter a positive number."),
      "3 Months":
        selectedEditors !== "Select" &&
        selectedEditors.includes("3 Months") &&
        Yup.number()
          .required(`This field is required.`)
          .positive("Please enter a positive number."),
      "6 Months":
        selectedEditors !== "Select" &&
        selectedEditors.includes("6 Months") &&
        Yup.number()
          .required(`This field is required.`)
          .positive("Please enter a positive number."),
      "1 Year":
        selectedEditors !== "Select" &&
        selectedEditors.includes("1 Year") &&
        Yup.number()
          .required(`This field is required.`)
          .positive("Please enter a positive number."),
    }),
    onSubmit: async (values) => {
      const data = {
        duration: values.duration,
        month_1: Number(values["1 Months"]) || 0,
        month_3: Number(values["3 Months"]) || 0,
        month_6: Number(values["6 Months"]) || 0,
        year_1: Number(values["1 Year"]) || 0,
      };
      try {
        setIsLoading(true);
        const res = await AxiosInstance.post(
          `${
            config?.apiUrl
          }/subscription-setting/?commentator_level=${props?.selectLevel?.toLowerCase()}`,
          data
        );
        setIsLoading(false);
        if (res.status === 201) {
          Swal.fire({
            title: "Success",
            text: "Subscription Setting Updated!",
            icon: "success",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
          getData();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  async function getData() {
    try {
      const res = await AxiosInstance.get(
        `${
          config?.apiUrl
        }/subscription-setting/?commentator_level=${props?.selectLevel?.toLowerCase()}`
      );
      if (res.status === 200) {
        const data = res?.data[0];
        const formValues = {
          duration: data?.duration,
          "1 Months": data?.month_1,
          "3 Months": data?.month_3,
          "6 Months": data?.month_6,
          "1 Year": data?.year_1,
        };
        setSelectedEditors(data.duration);

        formik.setValues(formValues);
        setIsDataLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        formik.resetForm();
      }
      setIsDataLoading(false);
    }
  }
  useEffect(() => {
    props?.selectLevel && getData();
  }, [props?.selectLevel]);

  const handleEditorSelection = (editor) => {
    if (selectedEditors.includes(editor)) {
      const staticdata = selectedEditors.filter((item) => item !== editor);
      setSelectedEditors(staticdata);
      formik.setFieldValue("duration", staticdata);
      staticdata.length == 0 && setSelectedEditors("Select");
      staticdata.length == 0 && formik.setFieldValue("duration", ["Select"]);
    } else {
      if (formik.values.duration[0] == "Select") {
        formik.setFieldValue("duration", [editor]);
        setSelectedEditors([editor]);
      } else {
        formik.setFieldValue("duration", [...formik.values.duration, editor]);
        setSelectedEditors([...formik.values.duration, editor]);
      }
    }
  };

  const toggleEditorDropdown = () => {
    setEditorDropDown(!editorDropDown);
  };

  return (
    <>
      {isDataLoading ? (
        <div className="d-flex gap-1 h-100 my-2 pb-2 align-items-center justify-content-center">
          Loading...
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="my-2 mt-3 row gap-3">
            <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-12">
              <div className="d-flex flex-column">
                {/* <span className="p-1 ps-0">Duration</span> */}
                <CustomDropDownForCommentsCreatetion
                  label="Duration"
                  options={durationOptions}
                  selectedOption={formik.values.duration}
                  onSelectOption={handleEditorSelection}
                  isOpen={editorDropDown}
                  toggleDropdown={toggleEditorDropdown}
                />
              </div>
            </div>
            {formik.values.duration[0] !== "Select" && (
              <>
                {formik.values.duration.map((res, index) => {
                  return (
                    <div
                      className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-12"
                      key={index}
                    >
                      <div className="d-flex flex-column">
                        <span className="p-1 ps-0">{res}</span>
                        <input
                          type="number"
                          className="darkMode-input form-control text-center"
                          name={res}
                          id={res}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values[res]}
                        />
                        {(formik.errors[res] || formik.touched[res]) && (
                          <div className="error-message text-danger">
                            {formik.errors[res]}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {formik.values.duration[0] !== "Select" && (
            <div className="my-3 d-flex justify-content-center">
              <div
                className="fixed-bottom  d-flex justify-content-center"
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
                  {isLoading ? "Loading..." : "Save"}
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default SalesSubscriptionSettings;
