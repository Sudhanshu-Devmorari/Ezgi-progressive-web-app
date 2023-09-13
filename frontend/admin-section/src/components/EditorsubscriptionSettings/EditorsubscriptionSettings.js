import React, { useEffect, useState } from "react";
import SalesSubscriptionSettings from "../SalesSubscriptionSettings/SalesSubscriptionSettings";
import axios from "axios";
import config from "../../config";

const EditorsubscriptionSettings = () => {
  const [selectLevel, setSelectLevel] = useState("Journeyman");

  return (
    <>
      <div className="my-2 mt-3">
        <span
          className="p-2 ps-0 cursor"
          style={{ color: selectLevel === "Journeyman" && "#4DD5FF" }}
          onClick={() => {
            setSelectLevel("Journeyman");
          }}
        >
          Journeyman
        </span>
        <span
          className="p-2 cursor"
          style={{ color: selectLevel === "master" && "#4DD5FF" }}
          onClick={() => {
            setSelectLevel("master");
          }}
        >
          Expert
        </span>
        <span
          className="p-2 cursor"
          style={{ color: selectLevel === "Grandmaster" && "#4DD5FF" }}
          onClick={() => {
            setSelectLevel("Grandmaster");
          }}
        >
          Grandmaster
        </span>
      </div>
      <SalesSubscriptionSettings selectLevel={selectLevel} />
    </>
  );
};

export default EditorsubscriptionSettings;
