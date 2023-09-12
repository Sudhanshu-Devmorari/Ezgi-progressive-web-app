import axios from "axios";
import React, { useEffect, useState } from "react";
import SalesHighlightSettings from "../SalesHighlightSettings/SalesHighlightSettings";
import config from "../../config";

const EditorHighlightSettings = () => {
  const [selectLevel, setSelectLevel] = useState("Journeyman");

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
      <SalesHighlightSettings selectLevel={selectLevel} />
    </>
  );
};

export default EditorHighlightSettings;
