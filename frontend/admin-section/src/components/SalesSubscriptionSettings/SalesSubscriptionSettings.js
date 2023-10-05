import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import config from "../../config";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { CustomDropDownForCommentsCreatetion } from "../CustomDropDownForCommentsCreatetion";

const SalesSubscriptionSettings = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const durationOptions = ["1 Months", "3 Months", "6 Months", "1 Year"];
  const [editorDropDown, setEditorDropDown] = useState(false);
  const [selectedEditors, setSelectedEditors] = useState("Select");

  // const validationSchema = Yup.object({
  //   // duration: Yup.string().required("Duration is required"),
  //   month_1: Yup.number()
  //     .required("1 Month is required")
  //     .positive("1 Month must be positive"),
  //   month_3: Yup.number()
  //     .required("3 Months is required")
  //     .positive("3 Months must be positive"),
  //   month_6: Yup.number()
  //     .required("6 Months is required")
  //     .positive("6 Months must be positive"),
  //   year_1: Yup.number()
  //     .required("1 Year is required")
  //     .positive("1 Year must be positive"),
  // });

  const formik = useFormik({
    initialValues: {
      duration: ["Select"],
    },
    // validationSchema: Yup.object().shape(
    //    .values.duration.reduce((schema, duration) => {
    //     console.log(
    //       "schema::::::::::::",
    //       schema,
    //       "duration::::::::::::",
    //       duration
    //     );
    //     schema[duration] = Yup.number().required(`${duration} is required`);
    //     // .matches(/^\d+$/, `${duration} must be a valid number`)
    //     return schema;
    //   }, {})
    // ),
    // validationSchema: ArrayOfCarsSchema,
    onSubmit: async (values) => {
      console.log(values);

      const data = {
        duration: values.duration,
        month_1: parseFloat(values["1 Month"]),
        month_3: parseFloat(values["3 Month"]),
        month_6: parseFloat(values["6 Month"]),
        year_1: parseFloat(values["1 Year"]),
      };
      try {
        setIsLoading(true);
        const res = await axios.post(
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

  // Create a validation schema for each selected duration
  // const validationSchema =
  //   formik.values.duration[0] !== "Select" &&
  //   Yup.object().shape(
  //     formik.values.duration.reduce((schema, duration) => {
  //       console.log(
  //         "schema::::::::::::",
  //         schema,
  //         "duration::::::::::::",
  //         duration
  //       );
  //       schema[duration] = Yup.number().required(`${duration} is required`);
  //       // .matches(/^\d+$/, `${duration} must be a valid number`)
  //       return schema;
  //     }, {})
  //   );

  // Initialize Formik values for each selected duration
  const initialValues =
    selectedEditors !== "Select" &&
    selectedEditors?.reduce((values, duration) => {
      console.log(
        "values::::::::::::",
        values,
        "duration::::::::::::",
        duration
      );
      values[duration] = "";
      return values;
    }, {});

  // const formik = useFormik({
  //   initialValues,
  //   // validationSchema, // Combine all validation schemas
  //   onSubmit: async (values) => {
  //     console.log("values::::::::::::::", values);
  //     const data = {
  //       duration: selectedEditors,
  //       month_1: parseFloat(values["1 Month"]),
  //       month_3: parseFloat(values["3 Month"]),
  //       month_6: parseFloat(values["6 Month"]),
  //       year_1: parseFloat(values["1 Year"]),
  //     };
  //     console.log("data:::::::::::::::", data);
  //     // try {
  //     //   setIsLoading(true);
  //     //   const res = await axios.post(
  //     //     `${
  //     //       config?.apiUrl
  //     //     }/subscription-setting/?commentator_level=${props?.selectLevel?.toLowerCase()}`,
  //     //     data
  //     //   );
  //     //   setIsLoading(false);
  //     //   if (res.status === 201) {
  //     //     Swal.fire({
  //     //       title: "Success",
  //     //       text: "Subscription Setting Updated!",
  //     //       icon: "success",
  //     //       backdrop: false,
  //     //       customClass: "dark-mode-alert",
  //     //     });
  //     //     getData();
  //     //   }
  //     // } catch (error) {
  //     //   console.log(error);
  //     // }
  //   },
  // });

  async function getData() {
    try {
      const res = await axios.get(
        `${
          config?.apiUrl
        }/subscription-setting/?commentator_level=${props?.selectLevel?.toLowerCase()}`
      );
      if (res.status === 200) {
        const data = res?.data[0];
        console.log("data:::::::::::", data);
        const formValues = {
          "1 Month": data?.month_1,
          "3 Month": data?.month_3,
          "6 Month": data?.month_6,
          "1 Year": data?.year_1,
        };
        setSelectedEditors(data.duration);

        formik.setValues(formValues);
        // formik.setValues({
        //   duration: data.duration,
        //   month_1: data.month_1,
        //   month_3: data.month_3,
        //   month_6: data.month_6,
        //   year_1: data.year_1,
        // });
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
      staticdata.length == 0 && setSelectedEditors("Select");
    } else {
      formik.values.duration[0] == "Select"
        ? formik.setFieldValue("duration", [editor])
        : formik.setFieldValue("duration", [...formik.values.duration, editor]);
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
                {/* <input
                  type="text"
                  className="darkMode-input form-control text-center"
                  name="duration"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.duration}
                />
                {formik.errors.duration && formik.touched.duration && (
                  <div className="error-message text-danger">
                    {formik.errors.duration}
                  </div>
                )} */}
              </div>
            </div>
            {formik.values.duration[0] !== "Select" && (
              <>
                {formik.values.duration.map((res, index) => {
                  // if (res == "1 Month" || res == "3 Month")
                  console.log("res:::::::::::", res);
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
                          required
                        />
                        {formik.errors[res] && formik.touched[res] && (
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
            {/* <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">3 Months</span>
                <input
                  type="text"
                  className="darkMode-input form-control text-center"
                  name="month_3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.month_3}
                />
                {formik.errors.month_3 && formik.touched.month_3 && (
                  <div className="error-message text-danger">
                    {formik.errors.month_3}
                  </div>
                )}
              </div>
            </div> */}
          </div>
          {/* <div className="my-2 mt-3 d-flex gap-3">
            {selectedEditors !== "Select" && (
              <>
                {selectedEditors &&
                  selectedEditors.map((res, index) => {
                    if (res == "6 Month" || res == "1 Year")
                      return (
                        <div className="col-2" key={index}>
                          <div className="col d-flex flex-column">
                            <span className="p-1 ps-0">{res}</span>
                            <input
                              type="text"
                              className="darkMode-input form-control text-center"
                              name="month_6"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.month_6}
                            />
                            {formik.errors.month_6 &&
                              formik.touched.month_6 && (
                                <div className="error-message text-danger">
                                  {formik.errors.month_6}
                                </div>
                              )}
                          </div>
                        </div>
                      );
                  })}
              </>
            )} */}
          {/* <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">1 Year</span>
                <input
                  type="text"
                  className="darkMode-input form-control text-center"
                  name="year_1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.year_1}
                />
                {formik.errors.year_1 && formik.touched.year_1 && (
                  <div className="error-message text-danger">
                    {formik.errors.year_1}
                  </div>
                )}
              </div>
            </div> */}
          {/* </div> */}
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
