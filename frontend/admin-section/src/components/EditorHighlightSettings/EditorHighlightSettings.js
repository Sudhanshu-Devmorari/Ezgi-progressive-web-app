import React from 'react'

const EditorHighlightSettings = () => {
  return (
   <>
    <div className="my-2 mt-3">
        <span className="p-2 ps-0" style={{ color: "#4DD5FF" }}>Journeyman</span>
        <span className="p-2">Expert</span>
        <span className="p-2">Grandmaster</span>
      </div>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">1 Week</span>
            <input type="text" className="darkMode-input form-control" />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">2 Week</span>
            <input type="text" className="darkMode-input form-control" />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">1 Month</span>
            <input type="text" className="darkMode-input form-control" />
          </div>
        </div>
      </div>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Highlight Icon & Color</span>
            <input type="text" className="darkMode-input form-control" />
          </div>
        </div>
      </div>
   </>
  )
}

export default EditorHighlightSettings