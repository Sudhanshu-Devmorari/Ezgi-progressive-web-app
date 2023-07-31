import React, { useState } from "react";
import EditorMembershipSettings from "../EditorMembershipSettings/EditorMembershipSettings";
import EditorsubscriptionSettings from "../EditorsubscriptionSettings/EditorsubscriptionSettings";
import EditorHighlightSettings from "../EditorHighlightSettings/EditorHighlightSettings";

const EditorSalesSettings = () => {
  const [selectSetting, setSelectSetting] = useState("membership");
  return (
    <>
      <div className="p-2 m-2 fonts-block">
        <div className="m-3" style={{ fontSize: "1.1rem" }}>
          <span
            onClick={() => setSelectSetting("membership")}
            className="cursor p-2 ps-0"
            style={{ color: selectSetting === "membership" && "#D2DB08" }}
          >
            Membership Settings
          </span>
          <span
            onClick={() => setSelectSetting("subscription")}
            className="cursor p-2"
            style={{ color: selectSetting === "subscription" && "#D2DB08" }}
          >
            Subscription Settings
          </span>
          <span
            onClick={() => setSelectSetting("highlight")}
            className="cursor p-2"
            style={{ color: selectSetting === "highlight" && "#D2DB08" }}
          >
            Highlights Settings
          </span>
        </div>
        <div className="m-3">
          {selectSetting === "membership" && <EditorMembershipSettings />}
          {selectSetting === "subscription" && <EditorsubscriptionSettings />}
          {selectSetting === "highlight" && <EditorHighlightSettings />}
        </div>
      </div>
    </>
  );
};

export default EditorSalesSettings;
