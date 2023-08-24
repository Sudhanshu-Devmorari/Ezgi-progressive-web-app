import axios from "axios";
import React, { useEffect, useState } from "react";
import WithdrawalSettings from "../WithdrawalSettings/WithdrawalSettings";
import config from "../../config";

const EditorWithdrawalSettings = () => {
  const [selectLevel, setSelectLevel] = useState("Journeyman");

  // Withdrawal Settings API
  const [WithdrawalSettingData, setWithdrawalSettingData] = useState();
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `${config?.apiUrl}/highlight-setting/?commentator_level=${selectLevel.toLowerCase()}`
        );
        // console.log("res==>>", res.data[0]);
        setWithdrawalSettingData(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    // getData();
  }, [selectLevel]);
  return (
    <>
      <div className="p-2 m-2 fonts-block">
        <div className="m-3" style={{ fontSize: "1.1rem" }}>
          Withdrawal Settings
        </div>
        <div className="m-3">
          <div className="my-2 mt-3">
            <span
              className="p-2 ps-0 cursor"
              style={{ color: selectLevel === "Journeyman" && "#4DD5FF" }}
              onClick={() => setSelectLevel("Journeyman")}
            >
              Journeyman
            </span>
            <span
              className="p-2 cursor"
              style={{ color: selectLevel === "Expert" && "#4DD5FF" }}
              onClick={() => setSelectLevel("Expert")}
            >
              Expert
            </span>
            <span
              className="p-2 cursor"
              style={{ color: selectLevel === "Grandmaster" && "#4DD5FF" }}
              onClick={() => setSelectLevel("Grandmaster")}
            >
              Grandmaster
            </span>
          </div>
          <WithdrawalSettings
            WithdrawalSettingData={WithdrawalSettingData}
            setWithdrawalSettingData={setWithdrawalSettingData}
            selectLevel={selectLevel}
          />
        </div>
      </div>
    </>
  );
};

export default EditorWithdrawalSettings;
