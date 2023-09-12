import React, { useContext, useState } from "react";
import lightradio from "../../assets/Ellipse 217.svg";
import lightradioSelected from "../../assets/Ellipse 58.svg";
import darkradioSelected from "../../assets/Ellipse 217 (1).svg";
import darkradio from "../../assets/Ellipse 216.svg";
import CurrentTheme from "../../context/CurrentTheme";

function PromoteMeSubScription() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };

  const isPlanSelected = (plan) => {
    return selectedPlan === plan;
  };

  const renderPlan = (plan, price, discountText, backgroundColor) => (
    <div className="d-flex mb-2" key={plan}>
      <img
        onClick={() => handlePlanClick(plan)}
        src={
          isPlanSelected(plan)
            ? currentTheme === "dark"
              ? darkradioSelected
              : lightradio
            : currentTheme === "dark"
            ? darkradio
            : lightradioSelected
        }
        alt=""
        height={28}
        width={28}
      />
      <div
        className="d-flex justify-content-between w-100 px-2 py-1"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <span>{plan}</span>
        <span style={{ fontSize: "1rem" }}>
          {discountText && (
            <span className="pe-2" style={{ color: "#47FF8A" }}>
              {discountText}
            </span>
          )}
          {price}
        </span>
      </div>
    </div>
  );

  return (
    <div className="my-2" style={{ fontSize: "14px" }}>
      <div className="my-2">Highlights Plans</div>
      {renderPlan("1 Week", "69.90₺", null, currentTheme === "dark" ? "#0B2447" : "#F6F6F6")}
      {renderPlan("2 Week", "179.90₺", "%20 Save!", currentTheme === "dark" ? "#0B2447" : "#F6F6F6")}
      {renderPlan("1 Month", "329.90₺", "%30 Save!", currentTheme === "dark" ? "#0B2447" : "#F6F6F6")}
    </div>
  );
}

export default PromoteMeSubScription;
