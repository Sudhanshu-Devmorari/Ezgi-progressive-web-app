import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import camera from "../../assets/camera-plus.svg";
import cross from "../../assets/Group 81.svg";
import upload from "../../assets/upload.svg";
import selectedRadio from "../../assets/Group 312.svg";
import backarrow from "../../assets/Group 271.svg";
import user1 from "../../assets/user3.png";
import user2 from "../../assets/user1.png";
import circle_check from "../../assets/circle-check-1.png";
import circle_x from "../../assets/circle-x.png";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Dropdownmodal } from "../Dropdownmodal";
import radio from "../../assets/Group 314.svg";
import sqr from "../../assets/Rectangle 2682.svg";
import SelectedSqr from "../../assets/Group 317.svg";
import Swal from "sweetalert2";
import "./CreateSubUser.css";
import config from "../../config";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateSubUser = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransactionSelected, setIsTransactionSelected] = useState(true);
  const [isOnlyViewSelected, setIsOnlyViewSelected] = useState(false);
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const authTypeOptions = ["Option A", "Option B", "Option C"];
  const departmentOptions = [
    "Support",
    "Financial",
    "Technical",
    "IT Supervisor",
    "Ads Manager",
    "Director Manager",
  ];

  // const [authTypeDropDown, setAuthTypeDropDown] = useState(false);
  const [departmentDropDown, setDepartmentDropDown] = useState(false);

  // const [selectedAuthType, setSelectedAuthType] = useState("Select");
  const [selectedDepartment, setSelectedDepartment] = useState("Support");

  // const handleAuthTypeSelection = (authType) => {
  //   setSelectedAuthType(authType);
  // };

  const handleDepartmentSelection = (department) => {
    setSelectedDepartment(department);
    // setDepartmentError("");
  };

  // const toggleAuthTypeDropdown = () => {
  //   setAuthTypeDropDown(!authTypeDropDown);
  //   setDepartmentDropDown(false);
  // };

  const toggleDepartmentDropdown = () => {
    setDepartmentDropDown(!departmentDropDown);
    // setAuthTypeDropDown(false);
  };
  const [isWithdrawalRequestsSelected, setIsWithdrawalRequestsSelected] =
    useState(false);
  const [isWithdrawalExportSelected, setIsWithdrawalExportSelected] =
    useState(false);
  const [isRulesUpdateSelected, setIsRulesUpdateSelected] = useState(false);
  const [isSalesExportSelected, setIsSalesExportSelected] = useState(false);
  const [isPriceUpdateSelected, setIsPriceUpdateSelected] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(true);

  // Upload Profile
  const [preveiwProfilePic, setPreveiwProfilePic] = useState(null);
  // const [displaySelectedImg, setdisplaySelectedImg] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);

  function handleAddProfile(e) {
    try {
      const imageFile = e.target.files[0];
      if (imageFile) {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (allowedTypes.includes(imageFile.type)) {
          setPreveiwProfilePic(URL.createObjectURL(imageFile));
          setSelectedImage(imageFile);
          formik.setFieldValue("profile", imageFile);
        } else {
          Swal.fire({
            title: "Error",
            text: "Invalid file type. Please select a valid image file.",
            icon: "error",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
        }
      }
    } catch (error) {}
  }

  console.log(props?.editUser,"=>>>edit")

  // // Edit Sub User Profile
  const [userProfile, setuserProfile] = useState(null);

  const resetFields = () => {
    setSelectedDepartment("Support")
    setIsTransactionSelected(true);
    setIsOnlyViewSelected(false);
    setIsWithdrawalRequestsSelected(false);
    setIsWithdrawalExportSelected(false);
    setIsRulesUpdateSelected(false);
    setIsSalesExportSelected(false);
    setIsPriceUpdateSelected(false);
    setIsAllSelected(true);
  };

  useEffect(() => {
    if (props?.editProfileModal === 2 && props?.editUser) {
      formik.setValues({
        profile: props?.editUser?.profile_pic,
        Name: props?.editUser?.name,
        Phone: props?.editUser?.phone,
        password: props?.editUser?.password,
        AuthorizationType: props?.editUser?.authorization_type,
      });
      if (props?.editUser?.is_transaction) {
        if (props?.editUser?.is_all_permission) {
          setIsAllSelected(props?.editUser?.is_all_permission);
        } else {
          setIsAllSelected(false);
          setIsWithdrawalRequestsSelected(
            props?.editUser?.is_process_withdrawal_request
          );
          setIsWithdrawalExportSelected(props?.editUser?.is_withdrawal_export);
          setIsRulesUpdateSelected(props?.editUser?.is_rule_update);
          setIsSalesExportSelected(props?.editUser?.is_sales_export);
          setIsPriceUpdateSelected(props?.editUser?.is_price_update);
          setSelectedDepartment(props?.editUser?.department)
        }
      } else if (props?.editUser?.is_view_only) {
        setIsOnlyViewSelected(true);
      }
      setuserProfile(`${props.editUser.profile_pic}`);
    }
  }, [props?.editProfileModal, props?.editUser]);

  const validationSchema = Yup.object().shape({
    profile: Yup.mixed().required("Profile is required"),
    Name: Yup.string().required("Name is required"),
    Phone: Yup.string()
      .required("Phone is required")
      .matches(/^5\d*$/, "Phone must start with '5' and contain only digits")
      .min(10, "Phone must be 10 digits")
      .max(10, "Phone must be 10 digits"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    AuthorizationType: Yup.string().required("Authorization Type is required"),
  });

  const formik = useFormik({
    initialValues: {
      profile: null,
      Name: "",
      Phone: "",
      password: "",
      AuthorizationType: "Staff",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      // Append image file to FormData
      formData.append("file", values.profile);

      // Append other data to FormData
      formData.append("name", values.Name);
      formData.append("phone", values.Phone);
      formData.append("password", values.password);
      formData.append("authorization_type", values.AuthorizationType);
      formData.append("department", selectedDepartment);
      formData.append(
        "permission",
        (isTransactionSelected && "transaction") ||
          (isOnlyViewSelected && "only_view")
      );
      if (isTransactionSelected) {
        if (isAllSelected) {
          formData.append("all_permission", true);
        } else {
          if (isWithdrawalRequestsSelected) {
            formData.append("process_withdrawal", true);
          }
          if (isWithdrawalExportSelected) {
            formData.append("withdrawal_export", true);
          }
          if (isRulesUpdateSelected) {
            formData.append("rule_update", true);
          }
          if (isSalesExportSelected) {
            formData.append("sales_export", true);
          }
          if (isPriceUpdateSelected) {
            formData.append("price_update", true);
          }
        }
      }
      if (props?.editProfileModal === 2 && props?.editUser) {
        try {
          setIsLoading(true);
          const res = await axios.patch(
            `${config?.apiUrl}/subuser-management/${props.editUser?.id}/`,
            formData
          );
          if (res.data.status === 200) {
            // props.getSubUsers();
            setIsLoading(false);
            Swal.fire({
              title: "Success",
              text: "Sub User Updated!",
              icon: "success",
              backdrop: false,
              customClass: `${"dark-mode-alert"}`,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        } catch (error) {
          console.log(error);
          if (error.response.status === 400) {
            setIsLoading(false);
            Swal.fire({
              title: "Error",
              text: error.response.data.data,
              icon: "error",
              backdrop: false,
              customClass: `${"dark-mode-alert"}`,
            });
          }
        }
      } else {
        setIsLoading(true);
        try {
          const res = await axios.post(
            `${config?.apiUrl}/subuser-management/`,
            formData
          );
          // console.log(res);
          if (res.status === 200) {
            setIsLoading(false);
            // props?.getSubUsers();
            Swal.fire({
              title: "Success",
              text: "Sub User Created successfully!!",
              icon: "success",
              backdrop: false,
              customClass: `${"dark-mode-alert"}`,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        } catch (error) {
          console.log(error);
          if (error.response.status === 400) {
            setIsLoading(false);
            Swal.fire({
              title: "Error",
              text: error.response.data.data,
              icon: "error",
              backdrop: false,
              customClass: `${"dark-mode-alert"}`,
            });
          }
        }
      }
    },
  });

  return (
    <>
      <div
        class="modal fade"
        id="create-sub-user"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="create-sub-userLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div
              className="modal-body dark-mode p-3"
              style={{ fontSize: ".9rem" }}
            >
              <form onSubmit={formik.handleSubmit}>
                <div className="d-flex position-relative my-2 gap-2">
                  {props?.editProfileModal === 2 ? (
                    <>
                      <div
                        className="my-1 cursor"
                        style={{
                          backgroundColor: "#E6E6E6",
                          borderRadius: "50%",
                          height: "8rem",
                          width: "8rem",
                          display: userProfile === null ? "block" : "none",
                        }}
                      >
                        <img
                          style={{
                            position: "absolute",
                            top: "2.34rem",
                            left: "2.4rem",
                          }}
                          src={camera}
                          alt=""
                        />
                      </div>
                      <img
                        src={
                          preveiwProfilePic === null
                            ? `${config?.apiUrl}${userProfile}`
                            : preveiwProfilePic
                        }
                        alt=""
                        height={135}
                        width={135}
                        style={{
                          objectFit: "cover",
                          borderRadius: "50%  ",
                          display: userProfile !== null ? "block" : "none",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <div
                        className="my-1 cursor"
                        style={{
                          backgroundColor: "#E6E6E6",
                          borderRadius: "50%",
                          height: "8rem",
                          width: "8rem",
                          display:
                            preveiwProfilePic === null ? "block" : "none",
                        }}
                      >
                        <img
                          style={{
                            position: "absolute",
                            top: "2.34rem",
                            left: "2.4rem",
                          }}
                          src={camera}
                          alt=""
                        />
                      </div>
                      <img
                        src={
                          preveiwProfilePic === null
                            ? `${config?.apiUrl}${formik.values.profile}`
                            : preveiwProfilePic
                        }
                        alt=""
                        height={135}
                        width={135}
                        style={{
                          objectFit: "cover",
                          borderRadius: "50%  ",
                          display:
                            preveiwProfilePic !== null ? "block" : "none",
                        }}
                      />
                    </>
                  )}
                  <div className="d-flex justify-content-center align-items-center flex-column gap-2">
                    {selectedDepartment !== "Select" &&
                      props?.seteditProfileModal === 2 && (
                        <button
                          className="px-3"
                          style={{
                            backgroundColor: "transparent",
                            borderRadius: "3px",
                            border: "1px solid #58DEAA",
                            color: "#58DEAA",
                          }}
                        >
                          {selectedDepartment}
                        </button>
                      )}
                    <label htmlFor="camera">
                      <span
                        className="px-3 py-1"
                        style={{
                          backgroundColor: "#0B2447",
                          borderRadius: "2px",
                        }}
                      >
                        <img
                          className="mb-1"
                          src={upload}
                          alt=""
                          height={20}
                          width={20}
                        />
                        <span className="ps-1 cursor">Upload</span>
                      </span>
                      <input
                        accept=".jpg, .jpeg, .png"
                        type="file"
                        className="d-none"
                        id="camera"
                        onChange={(e) => handleAddProfile(e)}
                      />
                    </label>
                    {props?.editProfileModal === 2 && (
                      <span
                        data-bs-toggle="modal"
                        data-bs-target="#transactions"
                        className="cursor"
                      >
                        Transaction History
                      </span>
                    )}
                    {formik.errors.profile && formik.touched.profile && (
                      <div className="error-message text-danger">
                        {formik.errors.profile}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row my-2 g-0 py-2 gap-2">
                  <div className="col d-flex flex-column">
                    <span>Name Surname</span>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      className="darkMode-input form-control text-center"
                      name="Name"
                      value={formik.values.Name}
                    />
                    {formik.touched.Name && formik.errors.Name ? (
                      <span
                        className="text-danger"
                        style={{ color: "#FF5757" }}
                      >
                        {formik.errors.Name}
                      </span>
                    ) : null}
                  </div>
                  <div className="col d-flex flex-column">
                    <span>Phone</span>
                    <div className="input-group">
                      <span
                        className="input-group-text darkMode-input"
                        id="basic-addon1"
                        style={{ padding: "0.375rem 0.375rem .375rem 4rem" }}
                      >
                        +90
                      </span>
                      <input
                        value={formik.values.Phone}
                        onChange={formik.handleChange}
                        style={{ paddingLeft: "0.4rem" }}
                        type="text"
                        className="form-control darkMode-input"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="Phone"
                      />
                    </div>
                    {formik.touched.Phone && formik.errors.Phone ? (
                      <span
                        className="text-danger"
                        style={{ color: "#FF5757" }}
                      >
                        {formik.errors.Phone}
                      </span>
                    ) : null}
                  </div>
                  <div className="col d-flex flex-column">
                    <span>Password</span>
                    <div className="input-group">
                      <input
                        className="darkMode-input form-control text-center"
                        type={showPassword ? "text" : "password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="password"
                      />
                      <span
                        className="input-group-text darkMode-input cursor"
                        id="basic-addon2"
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible
                            fontSize={"1.5rem"}
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <AiOutlineEye
                            fontSize={"1.5rem"}
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        )}
                      </span>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <span
                        className="text-danger"
                        style={{ color: "#FF5757" }}
                      >
                        {formik.errors.password}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="row g-0 gap-2">
                  <div className="col d-flex flex-column">
                    <span>Authorization Type</span>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      className="darkMode-input form-control text-center"
                      name="AuthorizationType"
                      value={formik.values.AuthorizationType}
                    />
                    {formik.touched.AuthorizationType &&
                    formik.errors.AuthorizationType ? (
                      <span
                        className="text-danger"
                        style={{ color: "#FF5757" }}
                      >
                        {formik.errors.AuthorizationType}
                      </span>
                    ) : null}
                  </div>
                  <div className="col d-flex flex-column">
                    <Dropdownmodal
                      label="Department"
                      options={departmentOptions}
                      selectedOption={selectedDepartment}
                      onSelectOption={handleDepartmentSelection}
                      isOpen={departmentDropDown}
                      toggleDropdown={toggleDepartmentDropdown}
                    />
                  </div>
                  <div className="col"></div>
                  <div className="my-2">
                    <div className="my-2">Authorization</div>
                    <div className="d-flex gap-2">
                      <div className="">
                        <img
                          className="cursor"
                          onClick={() => {
                            setIsTransactionSelected(!isTransactionSelected);
                            setIsOnlyViewSelected(false);
                          }}
                          src={isTransactionSelected ? selectedRadio : radio}
                          alt=""
                          height={30}
                          width={30}
                        />
                        <span className="ps-1">Tranaction</span>
                      </div>
                      <div className="">
                        <img
                          className="cursor"
                          onClick={() => {
                            setIsOnlyViewSelected(!isOnlyViewSelected);
                            setIsTransactionSelected(false);
                          }}
                          src={isOnlyViewSelected ? selectedRadio : radio}
                          alt=""
                          height={30}
                          width={30}
                        />
                        <span className="ps-1">Only View</span>
                      </div>
                    </div>
                  </div>
                  {isTransactionSelected && (
                    <>
                      <div className="my-2">
                        <div className="d-flex justify-content-between">
                          <div className="">
                            <img
                              onClick={() => {
                                setIsAllSelected(false);
                                setIsWithdrawalRequestsSelected(
                                  !isWithdrawalRequestsSelected
                                );
                              }}
                              src={
                                isWithdrawalRequestsSelected ? SelectedSqr : sqr
                              }
                              alt=""
                              style={{ cursor: "pointer" }}
                              height={30}
                              width={30}
                            />
                            <span className="px-2">
                              Process Withdrawal Requests
                            </span>
                          </div>
                          <div className="">
                            <span className="px-2">Withdrawal Export</span>
                            <img
                              onClick={() => {
                                setIsAllSelected(false);
                                setIsWithdrawalExportSelected(
                                  !isWithdrawalExportSelected
                                );
                              }}
                              src={
                                isWithdrawalExportSelected ? SelectedSqr : sqr
                              }
                              alt=""
                              style={{ cursor: "pointer" }}
                              height={30}
                              width={30}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-between my-2">
                          <div className="">
                            <img
                              onClick={() => {
                                setIsAllSelected(false);
                                setIsRulesUpdateSelected(
                                  !isRulesUpdateSelected
                                );
                              }}
                              src={isRulesUpdateSelected ? SelectedSqr : sqr}
                              alt=""
                              style={{ cursor: "pointer" }}
                              height={30}
                              width={30}
                            />
                            <span className="px-2">Rules Update</span>
                          </div>
                          <div className="">
                            <span className="px-2">Sales Export</span>
                            <img
                              onClick={() => {
                                setIsSalesExportSelected(
                                  !isSalesExportSelected
                                );
                                setIsAllSelected(false);
                              }}
                              src={isSalesExportSelected ? SelectedSqr : sqr}
                              alt=""
                              style={{ cursor: "pointer" }}
                              height={30}
                              width={30}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-between my-2">
                          <div className="">
                            <img
                              onClick={() => {
                                setIsAllSelected(false);
                                setIsPriceUpdateSelected(
                                  !isPriceUpdateSelected
                                );
                              }}
                              src={isPriceUpdateSelected ? SelectedSqr : sqr}
                              alt=""
                              style={{ cursor: "pointer" }}
                              height={30}
                              width={30}
                            />
                            <span className="px-2">Price Update</span>
                          </div>
                          <div className="">
                            <span className="px-2">All</span>
                            <img
                              onClick={() => {
                                setIsPriceUpdateSelected(false);
                                setIsSalesExportSelected(false);
                                setIsRulesUpdateSelected(false);
                                setIsWithdrawalExportSelected(false);
                                setIsWithdrawalRequestsSelected(false);
                                setIsAllSelected(!isAllSelected);
                              }}
                              src={isAllSelected ? SelectedSqr : sqr}
                              alt=""
                              style={{ cursor: "pointer" }}
                              height={30}
                              width={30}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="my-3 justify-content-center align-items-center d-flex py-2">
                    {props?.editProfileModal === 2 && (
                      <>
                        <button
                          data-bs-dismiss="modal"
                          className="py-1 px-2"
                          style={{
                            backgroundColor: "transparent",
                            borderRadius: "4px",
                            border: "1px solid #FF5757",
                            color: "#FF5757",
                          }}
                        >
                          Remove
                        </button>
                        <button
                          data-bs-dismiss="modal"
                          onClick={() =>
                            props?.handleDeleteUser(
                              props?.editUser?.id,
                              "deactive"
                            )
                          }
                          className="py-1 px-2 mx-3"
                          style={{
                            backgroundColor: "transparent",
                            borderRadius: "4px",
                            border: "1px solid #FF9100",
                            color: "#FF9100",
                          }}
                        >
                          Deactive
                        </button>
                        <button
                          onClick={formik.handleSubmit}
                          className="py-1 px-2"
                          style={{
                            backgroundColor: "transparent",
                            borderRadius: "4px",
                            border: "1px solid #D2DB08",
                            color: "#D2DB08",
                          }}
                        >
                          {isLoading ? "Loading..." : "Update"}
                        </button>
                      </>
                    )}
                    {props?.editProfileModal === 1 && (
                      <button
                        className="py-1 px-2"
                        style={{
                          backgroundColor: "transparent",
                          borderRadius: "4px",
                          border: "1px solid #D2DB08",
                          color: "#D2DB08",
                        }}
                      >
                        {isLoading ? "Loading..." : "Create"}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <img
              onClick={() => {
                resetFields();
                formik.resetForm();
                setDepartmentDropDown(false);
              }}
              data-bs-dismiss="modal"
              src={cross}
              alt=""
              style={{
                position: "absolute",
                top: "-1rem",
                right: "-1.1rem",
                cursor: "pointer",
              }}
              height={45}
              width={45}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSubUser;
