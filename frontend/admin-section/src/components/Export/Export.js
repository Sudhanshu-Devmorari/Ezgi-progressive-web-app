import React, { useState } from "react";
import cross from "../../assets/Group 81.svg";
import jsPDF from "jspdf";
import "jspdf-autotable";
import config from "../../config";

const Export = (props) => {
  const [dateSelected, setDateSelected] = useState({
    fromDate: "",
    toDate: "",
  });

  const exportList = props?.exportList || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDateSelected((prevDateSelected) => ({
      ...prevDateSelected,
      [name]: value,
    }));
  };

  const fromDateObj = new Date(dateSelected.fromDate);
  const toDateObj = new Date(dateSelected.toDate);

  const filteredData = exportList.filter((entry) => {
    const createdDateString = entry.created.split(" - ")[0];
    const [day, month, year] = createdDateString.split(".");
    const formattedDate = `${year}-${month}-${day}`;

    const createdDate = new Date(formattedDate);

    const isInDateRange =
      createdDate >= fromDateObj && createdDate <= toDateObj;
    return isInDateRange;
  });

  const exportData = filteredData.length === 0 ? exportList : filteredData;

  const handleExport = () => {
    const doc = new jsPDF();

    if (props?.exportData === "Ads") {
      const tableData = exportData.map((entry, index) => [
        index + 1,
        entry.ads_space,
        entry.link,
        entry.company_name,
      ]);

      const headers = [["SR", "Ads Space", "Link", "Company"]];
      doc.autoTable({
        head: headers,
        body: tableData,
      });
    } else if (props?.exportData === "Support") {
      const tableData = exportData.map((entry, index) => [
        index + 1,
        entry.user.name,
        entry.department,
        entry.subject,
        entry.message,
        entry.status.charAt(0).toUpperCase() + entry.status.slice(1),
      ]);

      const headers = [
        ["SR", "Name", "Department", "Subject", "Message", "Status"],
      ];
      doc.autoTable({
        head: headers,
        body: tableData,
      });
    }

    doc.save("exported_data.pdf");
  };

  return (
    <>
      <div
        className="modal fade"
        id="exportModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="exportModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body dark-mode">
              <div className="row g-0 gap-3 p-3">
                <div className="col d-flex flex-column">
                  <span>From</span>
                  <input
                    onChange={handleChange}
                    type="date"
                    name="fromDate"
                    className="darkMode-input form-control text-center cursor"
                  />
                </div>
                <div className="col d-flex flex-column">
                  <span>To</span>
                  <input
                    onChange={handleChange}
                    type="date"
                    name="toDate"
                    className="darkMode-input form-control text-center cursor"
                  />
                </div>
              </div>
              <div className="my-4 d-flex justify-content-center">
                <button
                  data-bs-dismiss="modal"
                  onClick={handleExport}
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

export default Export;
