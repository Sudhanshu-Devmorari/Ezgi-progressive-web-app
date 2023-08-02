import React from "react";
import "./Requests.css";

const Requests = (props) => {
  const array = props.rqstArray;
  const handleRqst = (e) => {
    if (e === "Verification Requests"){
      props.setverifyRqst(!props.verifyRqst)
      props.setDeactiveRqst(false)
    } else if (e === "Deactivation Requests") {
      props.setDeactiveRqst(!props.deactiveRqst)
      props.setverifyRqst(false)
    }
  }
  return (
    <>
      {array.map((res, index) => (
        <>
          <div
            onClick={() => handleRqst(res.name)}
            className="cursor dark-mode d-flex justify-content-center flex-column align-items-center reqsts-block-height text-center"
            style={{ height: "32vh" }}
          >
            {res.img && (
              <img
                className="user-icon"
                src={res.img}
                alt=""
                height={45}
                width={45}
              />
            )}
            <span style={{ fontSize: "1.2rem" }}>{res.name}</span>
            <span style={{ fontSize: "1.6rem" }}>{res.count}</span>
          </div>
        </>
      ))}
    </>
  );
};

export default Requests;
