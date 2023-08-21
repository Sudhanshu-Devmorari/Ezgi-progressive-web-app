import axios from "axios";
import React, { useEffect, useState } from "react";
import SalesHighlightSettings from "../SalesHighlightSettings/SalesHighlightSettings";

const EditorHighlightSettings = () => {
  const [selectLevel, setSelectLevel] = useState("Journeyman");

  // Highlights Settings API
  const [highlightssettingData, setHighlightssettingData] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/highlight-setting/?commentator_level=${selectLevel.toLowerCase()}`
        );
        // console.log("res==>>", res.data[0]);
        setHighlightssettingData(res.data[0]);
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
      <SalesHighlightSettings
        highlightssettingData={highlightssettingData}
        setHighlightssettingData={setHighlightssettingData}
        selectLevel={selectLevel}
      />
    </>
  );
};

export default EditorHighlightSettings;
