import { useState } from "react";
import { GoSearch } from "react-icons/go";
import gender_female from "../../assets/gender-female.png";
import gender_male from "../../assets/gender-male.png";
import profile from "../../assets/profile.png";
import userEdit from "../../assets/Profile Card Edit.svg";
import trash from "../../assets/trash.svg";
import user1 from "../../assets/user1.png";
import "./EditorManagemenetPage.css";
import CreateEditorModal from "../CreateEditorModal/CreateEditorModal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditorManagemenetPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const users = [
    {
      sr: "#0001",
      name: "John Doe",
      username: "johndoe",
      gender: gender_female,
      age: "25 - 34",
      country: "Ankara",
      date: "15-06-.2023 - 16:37",
      role: "Journeyman",
      profile: profile,
    },
    {
      sr: "#0002",
      name: "John Doe",
      username: "johndoe",
      gender: gender_male,
      age: "18 - 24",
      country: "İstanbul",
      date: "15-06-.2023 - 16:37",
      profile: user1,
    },
    {
      sr: "#0003",
      name: "John Doe",
      username: "johndoe",
      gender: gender_female,
      age: "35 - 44",
      country: "İzmir",
      date: "15-06-.2023 - 16:37",
      role: "Expert",
      profile: profile,
    },
    {
      sr: "#0004",
      name: "John Doe",
      username: "johndoe",
      gender: gender_male,
      age: "25 - 34",
      country: "Bursa",
      date: "15-06-.2023 - 16:37",
      role: "Apprentice",
      profile: profile,
    },
  ];
  return (
    <>
      <div className="dark-mode p-2 me-3 h-100">
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
              className="px-2"
              style={{
                backgroundColor: "transparent",
                borderRadius: "3px",
                border: "1px solid #E6E6E6",
                color: "#E6E6E6",
              }}
            >
              Filter
            </button>
          </div>
          <div className="p-2">
            <button
              onClick={handleShow}
              className="px-2"
              style={{
                backgroundColor: "transparent",
                borderRadius: "3px",
                border: "1px solid #5BDEAA",
                color: "#5BDEAA",
              }}
            >
              Create Editor
            </button>
          </div>
        </div>
        {users.map((res, index) => (
          <div
            className="row g-0 d-flex justify-content-between px-2 py-1 mb-2 editor-section-fonts"
            style={{ backgroundColor: "#0B2447", fontSize: "1rem" }}
          >
            <div className="col-3">
              <div className="">
                <span className="pe-1">{res.sr}</span>
                <img src={res.profile} alt="" height={37} width={37} />
                <span className="ps-1">{res.name}</span>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center col-1">
              <div>{res.username}</div>
            </div>
            <div
              className="d-flex align-items-center block-width col-3 gap-1"
              style={{ minWidth: "7.5rem" }}
            >
              <span style={{ color: "#D2DB0B", fontSize: "1rem" }}>%62</span>
              <img src={res.gender} alt="" height={28} width={28} />
              <span>{res.age}</span>
              <div className="">{res.country}</div>
            </div>
            <div className="d-flex align-items-center gap-2 edit-icon-gap col-3 justify-content-end">
              <span>{res.date}</span>
              <img
                className="icons-edit-eye"
                src={userEdit}
                alt=""
                height={35}
                width={35}
              />
              <img
                className="icons-edit-eye"
                src={trash}
                alt=""
                height={35}
                width={35}
              />
            </div>
          </div>
        ))}
      </div>
      {/* <CreateEditorModal show={modalShow} onHide={() => setModalShow(false)} /> */}
    </>
  );
};

export default EditorManagemenetPage;
