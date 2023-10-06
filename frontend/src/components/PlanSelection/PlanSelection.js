import React, { useContext, useState } from "react";
import lightradio from "../../assets/Ellipse 217.svg";
import lightradioSelected from "../../assets/Ellipse 58.svg";
import darkradioSelected from "../../assets/Ellipse 217 (1).svg";
import darkradio from "../../assets/Ellipse 216.svg";
import CurrentTheme from "../../context/CurrentTheme";

function PlanSelection(props) {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const { subscriptionPlan, renewPlan, commentatorUser } = props;

  const handlePlanClick = (plan) => {
    props?.setSelectedPlan(plan);
  };

  const isPlanSelected = (plan) => {
    return `${props?.selectedPlan}` === plan;
  };

  const renderPlan = (plan, price, discountText, backgroundColor) => (
    <div className="d-flex mb-2" key={plan}>
      <img
        onContextMenu={(e) => e.preventDefault()}
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
              {discountText} off
            </span>
          )}
          {price}
        </span>
      </div>
    </div>
  );

  return (
    <div className="my-2" style={{ fontSize: "14px" }}>
      <div className="my-2">
        {props?.text === "renew" ? "Membership" : "Subscription"} Plans
      </div>
      {props?.isSubscriptionLoading ? (
        <div className="text-center py-3">Loading...</div>
      ) : props?.text === "renew" ? (
        <>
          {renderPlan(
            `${renewPlan?.promotion_duration}`,
            `${renewPlan?.plan_price}₺`,
            renewPlan?.promotion_rate != 0 && `${renewPlan?.promotion_rate}%`,
            currentTheme === "dark" ? "#0B2447" : "#F6F6F6"
          )}
        </>
      ) : (
        subscriptionPlan &&
        subscriptionPlan?.duration?.map((res) => {
          return (
            <>
              {renderPlan(
                res,
                res == "1 Months"
                  ? `${subscriptionPlan?.month_1}₺`
                  : res == "3 Months"
                  ? `${subscriptionPlan?.month_3}₺`
                  : res == "6 Months"
                  ? `${subscriptionPlan?.month_6}₺`
                  : `${subscriptionPlan?.year_1}₺`,
                null,
                currentTheme === "dark" ? "#0B2447" : "#F6F6F6"
              )}
            </>
          );
        })
      )}
    </div>
  );
}

export default PlanSelection;
