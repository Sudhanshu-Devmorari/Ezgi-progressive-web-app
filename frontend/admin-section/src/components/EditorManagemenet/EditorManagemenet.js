import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import gender_female from "../../assets/gender-female.png";
import gender_male from "../../assets/gender-male.png";
import eye from "../../assets/eye.svg";
import "./EditorManagemenet.css";
import { BiSolidCrown } from "react-icons/bi";
import circle_check from "../../assets/circle-check-1.png";
import VerificationRequestsBtns from "../VerificationRequestsBtns/VerificationRequestsBtns";
import DeactivationRequestsBtns from "../DeactivationRequestsBtns/DeactivationRequestsBtns";
import moment from "moment";
import CreateAndUpdateEditor from "../CreateAndUpdateEditor/CreateAndUpdateEditor";
import EditorFilter from "../EditorFilter/EditorFilter";

const EditorManagemenet = (props) => {
  console.log("deactiveRqst----->: ", props?.deactiveRqst);
  console.log("deactivateUser----->: ", props?.deactivateUser);
  console.log("users----->: ", props?.users);
  const [displayUser, setDisplayUser] = useState(props?.users);
  console.log("displayUser----->: ", displayUser);

  useEffect(() => {
    if (props?.deactiveRqst) {
      setDisplayUser(props?.deactivateUser);
    } else {
      setDisplayUser(props?.users == undefined ? [] : props?.users);
    }
    // setDisplayUser(props?.users==undefined?[]:props?.users)
  }, [props]);

  const filteredData = (e) => {
    // props.setFilterData(null)
    const val = e.target.value;
    const filteredArray = props?.users.filter(
      (obj) =>
        obj?.editor_data?.username
          ?.toLowerCase()
          .startsWith(val.toLowerCase()) ||
        obj?.editor_data?.name?.toLowerCase().startsWith(val.toLowerCase())
    );
    setDisplayUser(filteredArray);
  };

  const server_url = "http://127.0.0.1:8000";
  return (
    <>
      <div className="dark-mode p-2 m-2 mb-0 home-height">
        <div className="d-flex p-2">
          <div className="p-2 flex-grow-1">
            <div class="input-group w-50">
              <span class="input-group-text search-icon-dark" id="basic-addon1">
                <GoSearch style={{ color: "#FFFFFF" }} />
              </span>
              <input
                onChange={filteredData}
                type="text"
                className="input-field-dark"
              />
            </div>
          </div>
          <div className="p-2">
            <button
              data-bs-toggle="modal"
              data-bs-target="#filterModal"
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
              onClick={() => props.setupdateProfile(1)}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
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
        {displayUser?.map((res, index) => (
          <div
            onClick={() => props.setupdateProfile(2)}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="px-2 py-1 mb-2 editor-section-fonts cursor"
            style={{ backgroundColor: "#0B2447", fontSize: "1rem" }}
          >
            <div className="row g-0 d-flex justify-content-between align-items-center">
              <div className="col-3">
                <div className="d-flex align-items-center">
                  <span className="pe-1">{`# ${res?.editor_data?.id
                    .toString()
                    .padStart(4, "0")}`}</span>
                  <div className="position-relative">
                    <img
                      className="rounded-circle profile-icon"
                      src={`${server_url + res?.editor_data?.profile_pic}`}
                      alt=""
                      height={42}
                      width={42}
                    />
                    <div
                      className="position-absolute d-flex justify-content-center align-items-center crown-position"
                      style={{
                        height: "14px",
                        width: "14px",
                        border: "2px solid #FF9100",
                        borderRadius: "50%",
                        backgroundColor: "#0B2447",
                        top: "0px",
                        left: "27px",
                      }}
                    >
                      <BiSolidCrown
                        fontSize={"0.49rem"}
                        style={{ color: "#FF9100" }}
                      />
                    </div>
                  </div>
                  <span className="ps-1">{res?.editor_data?.name}</span>
                </div>
              </div>
              <div className="d-flex gap-2 align-items-center col-1">
                <div>{res?.editor_data?.username}</div>
              </div>
              <div
                className="d-flex align-items-center block-width col-3 gap-1"
                style={{ minWidth: "7.5rem" }}
              >
                <span style={{ color: "#D2DB0B", fontSize: "1rem" }}>%62</span>
                {res?.editor_data?.gender == "Male" && (
                  <img src={gender_male} alt="" height={23} width={23} />
                )}
                {res?.editor_data?.gender == "Female" && (
                  <img src={gender_female} alt="" height={23} width={23} />
                )}
                <span>{res?.editor_data?.age}</span>
                <div className="">{res?.editor_data?.country}</div>
              </div>
              <div className="d-flex align-items-center gap-1 col-3 justify-content-end eye-gap">
                <span>
                  {moment(res?.editor_data?.created).format(
                    "DD-MM.YYYY - HH:mm"
                  )}
                </span>
                <img
                  className="icons-edit-eye"
                  src={circle_check}
                  alt=""
                  height={28}
                  width={28}
                />
                <img
                  className="icons-edit-eye"
                  src={eye}
                  alt=""
                  height={28}
                  width={28}
                />
              </div>
            </div>
            {props?.verifyRqst && <VerificationRequestsBtns />}
            {props?.deactiveRqst && (
              <DeactivationRequestsBtns
                id={res?.editor_data?.id}
                editorManagementApiData={props.editorManagementApiData}
              />
            )}
          </div>
        ))}
      </div>

      <CreateAndUpdateEditor updateProfile={props?.updateProfile} />

      <EditorFilter />
    </>
  );
};

export default EditorManagemenet;
