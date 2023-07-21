import React from 'react'

const WithdrawalRequests = () => {
    const levelArray = [
        {
          name: "Apprentice",
          count: "127",
        },
        {
          name: "Journeyman",
          count: "127",
        },
        {
          name: "Expert",
          count: "127",
        },
        {
          name: "Grandmaster",
          count: "127",
        },
      ];
  return (
    <>
    <div
        className={`${"dark-mode h-100 d-flex justify-content-center me-3 gap-ceown"} `}
      >
        {levelArray.map((res, index) => (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <span className="level-font" style={{ fontSize: "1.5rem" }}>
              {res.name}
            </span>
            <span className="level-count-font" style={{ fontSize: "2.7rem" }}>
              {res.count}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

export default WithdrawalRequests