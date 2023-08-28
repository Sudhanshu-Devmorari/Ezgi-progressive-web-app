import React, { useEffect, useState } from "react";
import SalesSubscriptionSettings from "../SalesSubscriptionSettings/SalesSubscriptionSettings";
import axios from "axios";
import config from "../../config";

const EditorsubscriptionSettings = () => {
  const [selectLevel, setSelectLevel] = useState("Journeyman");

  // Subscription Settings API
  const [subscriptionSettingsData, setSubscriptionSettingsData] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `${config?.apiUrl}/subscription-setting/?commentator_level=${selectLevel.toLowerCase()}`
        );
        // console.log("res==>>", res.data[0]);
        setSubscriptionSettingsData(res.data[0]);
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
      <SalesSubscriptionSettings
        subscriptionSettingsData={subscriptionSettingsData}
        setSubscriptionSettingsData={setSubscriptionSettingsData}
        selectLevel={selectLevel}
      />
    </>
  );
};

export default EditorsubscriptionSettings;
