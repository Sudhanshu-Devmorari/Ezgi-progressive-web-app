import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import cross from "../../assets/Group 81.svg";

const SalesManagementFilter = () => {
  const DateOptions = ["option 1", "option 2"];
  const TypeOptions = ["option 1", "option 2"];
  const StatusOptions = ["option 1", "option 2"];
  const DurationOptions = ["option 1", "option 2"];
  const [selectedDateFilter, setSelectedDateFilter] = useState("Select");
  const [dateDropDown, setDateDropDown] = useState(false);

  const handleDateSelection = (gender) => {
    setSelectedDateFilter(gender);
  };

  const toggleDateFilterDropdown = () => {
    setDateDropDown(!dateDropDown);
    setStatusDropDown(false);
    setDurationDropDown(false);
    setTypeDropDown(false)
  };
  const [selectedType, setSelectedType] = useState("Select");
  const [typeDropDown, setTypeDropDown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Select");
  const [statusDropDown, setStatusDropDown] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("Select");
  const [durationDropDown, setDurationDropDown] = useState(false);

  const handleTypeSelection = (selectedType) => {
    setSelectedType(selectedType);
  };

  const handleStatusSelection = (selectedStatus) => {
    setSelectedStatus(selectedStatus);
  };

  const handleDurationSelection = (selectedDuration) => {
    setSelectedDuration(selectedDuration);
  };

  const toggleTypeDropdown = () => {
    setTypeDropDown(!typeDropDown);
    setStatusDropDown(false);
    setDurationDropDown(false);
    setDateDropDown(false)
  };

  const toggleStatusDropdown = () => {
    setStatusDropDown(!statusDropDown);
    setTypeDropDown(false);
    setDurationDropDown(false);
    setDateDropDown(false)
  };

  const toggleDurationDropdown = () => {
    setDurationDropDown(!durationDropDown);
    setTypeDropDown(false);
    setStatusDropDown(false);
    setDateDropDown(false)
  };
  return (
    <>
      <div className="d-flex p-2" style={{ fontSize: "1.2rem" }}>
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
            data-bs-target="#filterModal"
            className="px-3"
            style={{
              backgroundColor: "transparent",
              borderRadius: "4px",
              border: "1px solid #E6E6E6",
              color: "#E6E6E6",
            }}
          >
            Filter
          </button>
        </div>
        <div className="p-2">
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            // onClick={() => setModalShow(true)}
            className="px-3"
            style={{
              backgroundColor: "transparent",
              borderRadius: "4px",
              border: "1px solid #58DEAA",
              color: "#58DEAA",
            }}
          >
            Export
          </button>
        </div>
      </div>

      {/* Filter modal */}
      <div
        class="modal fade"
        id="filterModal"
        tabindex="-1"
        aria-labelledby="filterModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body dark-mode position-relative">
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column cursor">
                  <CustomDropdown
                    label="Date"
                    options={DateOptions}
                    selectedOption={selectedDateFilter}
                    onSelectOption={handleDateSelection}
                    isOpen={dateDropDown}
                    toggleDropdown={toggleDateFilterDropdown}
                  />
                </div>
                <div className="col d-flex flex-column cursor">
                  <CustomDropdown
                    label="Type"
                    options={TypeOptions}
                    selectedOption={selectedType}
                    onSelectOption={handleTypeSelection}
                    isOpen={typeDropDown}
                    toggleDropdown={toggleTypeDropdown}
                  />
                </div>
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column cursor">
                  <CustomDropdown
                    label="Status"
                    options={StatusOptions}
                    selectedOption={selectedStatus}
                    onSelectOption={handleStatusSelection}
                    isOpen={statusDropDown}
                    toggleDropdown={toggleStatusDropdown}
                  />
                </div>
                <div className="col d-flex flex-column cursor">
                  <CustomDropdown
                    label="Duration"
                    options={DurationOptions}
                    selectedOption={selectedDuration}
                    onSelectOption={handleDurationSelection}
                    isOpen={durationDropDown}
                    toggleDropdown={toggleDurationDropdown}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center my-2">
                <button
                  className="px-3 py-1"
                  style={{
                    color: "#D2DB08",
                    backgroundColor: "transparent",
                    border: "1px solid #D2DB08",
                    borderRadius: "4px",
                  }}
                >
                  Show
                </button>
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

export default SalesManagementFilter;
