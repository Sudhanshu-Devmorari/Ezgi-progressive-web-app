import React from "react";
import CommentsSettings from "../CommentsSettings/CommentsSettings";

const EditorCommentsSettings = () => {

  return (
    <>
      <div className="p-2 m-2 fonts-block">
        <div className="m-3" style={{ fontSize: "1.1rem" }}>
          Comment Settings
        </div>
        <div className="m-3">
          <div className="my-2 mt-3">
            <span className="p-2 ps-0" style={{ color: "#D2DB08" }}>
              Create Comment
            </span>
          </div>
          <CommentsSettings />
        </div>
      </div>
    </>
  );
};

export default EditorCommentsSettings;
