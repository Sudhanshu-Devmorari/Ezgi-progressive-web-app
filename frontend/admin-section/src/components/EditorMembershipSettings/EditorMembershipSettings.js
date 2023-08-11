import React, { useEffect, useState } from "react";
import SalesMembershipSettings from "../SalesMembershipSettings/SalesMembershipSettings";
import axios from "axios";

const EditorMembershipSettings = () => {
  const [selectLevel, setSelectLevel] = useState("Apprentice");

  const [getMembershipData, setGetMembershipData] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/membership-setting/?commentator_level=${selectLevel.toLowerCase()}`
        );
        setGetMembershipData(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [selectLevel]);
  return (
    <>
      <div className="my-2 mt-3">
        <span
          className="p-2 cursor ps-0"
          style={{ color: selectLevel === "Apprentice" && "#FFEE7D" }}
          onClick={() => setSelectLevel("Apprentice")}
        >
          Apprentice
        </span>
        <span
          className="p-2 cursor"
          style={{ color: selectLevel === "Journeyman" && "#FFEE7D" }}
          onClick={() => setSelectLevel("Journeyman")}
        >
          Journeyman
        </span>
        <span
          className="p-2 cursor"
          style={{ color: selectLevel === "Expert" && "#FFEE7D" }}
          onClick={() => setSelectLevel("Expert")}
        >
          Expert
        </span>
        <span
          className="p-2 cursor"
          style={{ color: selectLevel === "Grandmaster" && "#FFEE7D" }}
          onClick={() => setSelectLevel("Grandmaster")}
        >
          Grandmaster
        </span>
      </div>
      <SalesMembershipSettings
        getMembershipData={getMembershipData}
        setGetMembershipData={setGetMembershipData}
        selectLevel={selectLevel}
      />
    </>
  );
};

export default EditorMembershipSettings;
