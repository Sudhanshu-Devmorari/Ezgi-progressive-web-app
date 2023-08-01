import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import camera from "../../assets/camera-plus.svg";
import cross from "../../assets/Group 81.svg";
import upload from "../../assets/upload.svg";
import selectedRadio from "../../assets/Group 312.svg";
import backarrow from "../../assets/Group 271.svg";
import radio from "../../assets/Group 314.svg";
import sqr from "../../assets/Rectangle 2682.svg";
import SelectedSqr from "../../assets/Group 317.svg";
import user1 from "../../assets/user3.png";
import user2 from "../../assets/user1.png";
import circle_check from "../../assets/circle-check-1.png";
import circle_x from "../../assets/circle-x.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Dropdownmodal } from "../Dropdownmodal";

const SubUserManagementFilter = () => {
  const [isTransactionSelected, setIsTransactionSelected] = useState(false);
  const [isOnlyViewSelected, setIsOnlyViewSelected] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const authTypeOptions = ["Option A", "Option B", "Option C"];
  const departmentOptions = ["Department X", "Department Y", "Department Z"];

  const [authTypeDropDown, setAuthTypeDropDown] = useState(false);
  const [departmentDropDown, setDepartmentDropDown] = useState(false);

  const [selectedAuthType, setSelectedAuthType] = useState("Select");
  const [selectedDepartment, setSelectedDepartment] = useState("Select");

  const handleAuthTypeSelection = (authType) => {
    setSelectedAuthType(authType);
  };

  const handleDepartmentSelection = (department) => {
    setSelectedDepartment(department);
  };

  const toggleAuthTypeDropdown = () => {
    setAuthTypeDropDown(!authTypeDropDown);
    setDepartmentDropDown(false);
  };

  const toggleDepartmentDropdown = () => {
    setDepartmentDropDown(!departmentDropDown);
    setAuthTypeDropDown(false);
  };
  const [isWithdrawalRequestsSelected, setIsWithdrawalRequestsSelected] =
    useState(false);
  const [isWithdrawalExportSelected, setIsWithdrawalExportSelected] =
    useState(false);
  const [isRulesUpdateSelected, setIsRulesUpdateSelected] = useState(false);
  const [isSalesExportSelected, setIsSalesExportSelected] = useState(false);
  const [isPriceUpdateSelected, setIsPriceUpdateSelected] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const transactions = [
    {
      name: "Subscription 1 Month",
      btn: "Price Update",
      sym: circle_check,
      acc: "239.90",
    },
    {
      name: "Highlights 1 week",
      btn: "Price Update",
      acc: "239.90",
      sym: circle_check,
    },
    {
      name: "johndoe",
      profile: user1,
      btn: "Withdrawal",
      sym: circle_check,
      acc: "239.90",
    },
    {
      name: "Expert Membership",
      btn: "Price Update",
      sym: circle_check,
      acc: "239.90",
    },
    {
      name: "johndoe",
      profile: user2,
      btn: "Withdrawal",
      sym: circle_x,
      acc: "239.90",
    },
    {
      name: "johndoe",
      profile: user2,
      btn: "Update Iban",
      sym: circle_x,
      acc: "TR76 0009 2545 15478",
    },
  ];
  return (
    <>
      <div className="d-flex p-2">
        <div className="p-2 flex-grow-1">
          <div class="input-group w-50">
            <span class="input-group-text search-icon-dark" id="basic-addon1">
              <GoSearch style={{ color: "#FFFFFF" }} />
            </span>
            <input type="text" className="input-field-dark" />
          </div>
        </div>

        <div className="p-2">
          <button
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            className="px-3"
            style={{
              backgroundColor: "transparent",
              borderRadius: "4px",
              border: "1px solid #0CC6FF",
              color: "#0CC6FF",
            }}
          >
            Create Sub User
          </button>
        </div>
      </div>
      {/* Modal */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-body dark-mode p-3" style={{ fontSize: ".9rem" }}>
              <div className="d-flex position-relative my-2 gap-2">
                <label htmlFor="camera">
                  <div
                    className="my-1 cursor"
                    style={{
                      backgroundColor: "#E6E6E6",
                      borderRadius: "50%",
                      height: "8rem",
                      width: "8rem",
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
                </label>
                <input type="file" className="d-none" id="camera" />
                <div className="d-flex justify-content-center align-items-center flex-column gap-2">
                  {isTransactionSelected && (
                    <button
                      className="px-3"
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: "3px",
                        border: "1px solid #58DEAA",
                        color: "#58DEAA",
                      }}
                    >
                      Financial
                    </button>
                  )}
                  <span
                    className="px-3 py-1"
                    style={{ backgroundColor: "#0B2447", borderRadius: "2px" }}
                  >
                    <img
                      className="mb-1"
                      src={upload}
                      alt=""
                      height={20}
                      width={20}
                    />
                    <span className="ps-1">Upload</span>
                  </span>
                  {(isWithdrawalRequestsSelected ||
                    isPriceUpdateSelected ||
                    isTransactionSelected) && (
                    <span
                      data-bs-toggle="modal"
                      data-bs-target="#transactions"
                      className="cursor"
                    >
                      Transaction History
                    </span>
                  )}
                </div>
              </div>
              <div className="row my-2 g-0 p-2 gap-2">
                <div className="col d-flex flex-column">
                  <span>Name Surname</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
                <div className="col d-flex flex-column">
                  <span>Phone</span>
                  <div class="input-group">
                    <span
                      class="input-group-text darkMode-input"
                      id="basic-addon1"
                      style={{ padding: ".375rem 1rem .375rem .1rem" }}
                    >
                      +90
                    </span>
                    <input
                      type="text"
                      class="form-control darkMode-input"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="col d-flex flex-column">
                  <span>Password</span>
                  <input
                    className="darkMode-input form-control"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <AiOutlineEyeInvisible
                      fontSize={"1.5rem"}
                      style={{
                        position: "absolute",
                        right: "2rem",
                        top: "12.6rem",
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <AiOutlineEye
                      fontSize={"1.5rem"}
                      style={{
                        position: "absolute",
                        right: "2rem",
                        top: "12.6rem",
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>
              <div className="row g-0 gap-2">
                <div className="col d-flex flex-column">
                  <Dropdownmodal
                    label="Authorization Type"
                    options={authTypeOptions}
                    selectedOption={selectedAuthType}
                    onSelectOption={handleAuthTypeSelection}
                    isOpen={authTypeDropDown}
                    toggleDropdown={toggleAuthTypeDropdown}
                  />
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
              </div>
              <div className="my-2">
                <div className="my-2">Authorization</div>
                <div className="d-flex gap-2">
                  <div className="">
                    <img
                      className="cursor"
                      onClick={() =>
                        setIsTransactionSelected(!isTransactionSelected)
                      }
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
                      onClick={() => setIsOnlyViewSelected(!isOnlyViewSelected)}
                      src={isOnlyViewSelected ? selectedRadio : radio}
                      alt=""
                      height={30}
                      width={30}
                    />
                    <span className="ps-1">Only View</span>
                  </div>
                </div>
              </div>
              {(isTransactionSelected || isOnlyViewSelected) && (
                <>
                  <div className="my-2">
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <img
                          onClick={() =>
                            setIsWithdrawalRequestsSelected(
                              !isWithdrawalRequestsSelected
                            )
                          }
                          src={isWithdrawalRequestsSelected ? SelectedSqr : sqr}
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
                          onClick={() =>
                            setIsWithdrawalExportSelected(
                              !isWithdrawalExportSelected
                            )
                          }
                          src={isWithdrawalExportSelected ? SelectedSqr : sqr}
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
                          onClick={() =>
                            setIsRulesUpdateSelected(!isRulesUpdateSelected)
                          }
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
                          onClick={() =>
                            setIsSalesExportSelected(!isSalesExportSelected)
                          }
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
                          onClick={() =>
                            setIsPriceUpdateSelected(!isPriceUpdateSelected)
                          }
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
                          onClick={() => setIsAllSelected(!isAllSelected)}
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
              <div className="my-3 justify-content-center align-items-center d-flex">
                {isOnlyViewSelected ||
                isWithdrawalRequestsSelected ||
                isPriceUpdateSelected ? (
                  <>
                    <button
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
                      className="py-1 px-2"
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: "4px",
                        border: "1px solid #D2DB08",
                        color: "#D2DB08",
                      }}
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <button
                    className="py-1 px-2"
                    style={{
                      backgroundColor: "transparent",
                      borderRadius: "4px",
                      border: "1px solid #D2DB08",
                      color: "#D2DB08",
                    }}
                  >
                    Create
                  </button>
                )}
              </div>
            </div>
            <img
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
      {/* Transaction History modal */}
      <div
        class="modal fade"
        id="transactions"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="transactionsLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-body dark-mode p-3" style={{ fontSize: ".9rem" }}>
              <div className="d-flex position-relative my-2 gap-2">
                <label htmlFor="camera">
                  <div
                    className="my-1 cursor"
                    style={{
                      backgroundColor: "#E6E6E6",
                      borderRadius: "50%",
                      height: "8rem",
                      width: "8rem",
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
                </label>
                <input type="file" className="d-none" id="camera" />
                <div className="d-flex justify-content-center align-items-center flex-column gap-2">
                  <button
                    className="px-3"
                    style={{
                      backgroundColor: "transparent",
                      borderRadius: "3px",
                      border: "1px solid #58DEAA",
                      color: "#58DEAA",
                    }}
                  >
                    Financial
                  </button>
                  <span
                    className="px-3 py-1"
                    style={{ backgroundColor: "#0B2447", borderRadius: "2px" }}
                  >
                    <img
                      className="mb-1"
                      src={upload}
                      alt=""
                      height={20}
                      width={20}
                    />
                    <span className="ps-1">Update</span>
                  </span>
                  <span
                    data-bs-toggle="modal"
                    data-bs-target="#transactions"
                    className="cursor"
                  >
                    Transaction History
                  </span>
                </div>
              </div>
              <div className="my-2">
                <img src={backarrow} alt="" height={21} width={21} />
              </div>
              <div className="my-2" style={{ overflowY: "auto" }}>
                {transactions.map((res, index) => (
                  <div
                    className="row g-0 dark-mode px-2 my-2"
                    style={{ backgroundColor: "#0B2447" }}
                  >
                    <div
                      className="col-4 d-flex align-items-center gap-2"
                      style={{ height: res.profile ? "" : "45px" }}
                    >
                      <div>#0001</div>
                      {res.profile && (
                        <img
                          src={res.profile}
                          alt=""
                          srcset=""
                          height={45}
                          width={45}
                        />
                      )}
                      <div>{res.name}</div>
                    </div>
                    <div className="col-2 d-flex align-items-center">
                      <button
                        style={{
                          backgroundColor: "transparent",
                          borderRadius: "2px",
                          border:
                            (res.btn === "Price Update" &&
                              "1px solid #0CC6FF") ||
                            (res.btn === "Withdrawal" && "1px solid #D2DB08") ||
                            (res.btn === "Update Iban" && "1px solid #5BDEAA"),
                          color:
                            (res.btn === "Price Update" && "#0CC6FF") ||
                            (res.btn === "Withdrawal" && "#D2DB08") ||
                            (res.btn === "Update Iban" && "#5BDEAA"),
                        }}
                      >
                        {res.btn}
                      </button>
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        <div className="" style={{width:"72%", overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{res.acc}</div>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center gap-3">
                      <div className="">15-06-2023 - 16:37</div>
                      <div className=""><img src={res.sym} alt="" height={23} width={23} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <img
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

export default SubUserManagementFilter;
