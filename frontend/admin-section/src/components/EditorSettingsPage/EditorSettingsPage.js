import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import EditorSettingsOptions from "../EditorSettingsOptions/EditorSettingsOptions";
import EditorsSettings from "../EditorsSettings/EditorsSettings";
import EditorSalesSettings from "../EditorSalesSettings/EditorSalesSettings";
import EditorWithdrawalSettings from "../EditorWithdrawalSettings/EditorWithdrawalSettings";
import EditorCommentsSettings from "../EditorCommentsSettings/EditorCommentsSettings";
import './EditorSettingsPage.css'

const EditorSettingsPage = () => {
  const [selectEditorSetting, setSelectEditorSetting] =
    useState("Editors Settings");
  return (
    <>
      <div className="conatainer-fluid m-2">
        <NavBar />
        <div className="row g-0 mt-2">
          <div className="col-1" style={{ width: "5%" }}>
            <SideBar />
          </div>
          <div className="col-11" style={{ width: "95%" }}>
            <div className="row g-0 gap-2" style={{ height: "12vh" }}>
              <EditorSettingsOptions
                selectEditorSetting={selectEditorSetting}
                setSelectEditorSetting={setSelectEditorSetting}
              />
            </div>
            <div className="mt-2 dark-mode ms-2 setting">
              {selectEditorSetting === "Editors Settings" && (
                <EditorsSettings />
              )}
              {selectEditorSetting === "Sales Settings" && (
                <EditorSalesSettings />
              )}
              {selectEditorSetting === "Withdrawal Settings" && (
                <EditorWithdrawalSettings />
              )}
              {selectEditorSetting === "Comment Settings" && (
                <EditorCommentsSettings />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorSettingsPage;
