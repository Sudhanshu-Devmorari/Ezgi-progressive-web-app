export const CustomDropDownForCommentsCreatetion = ({
  label,
  options,
  selectedOption,
  onSelectOption,
  isOpen,
  toggleDropdown,
}) => {
  return (
    <div className="my-2" style={{ cursor: "pointer" }}>
      <span>{label}</span>
      <div
        className={`${"customDropdown-dark-mode"} p-1 text-center`}
        onClick={toggleDropdown}
      >
        {label == "Duration" ? (
          <span>
            {selectedOption == "Select"
              ? selectedOption
              : selectedOption?.join(", ")}
          </span>
        ) : (
          <span>{selectedOption}</span>
        )}
      </div>
      <div
        className={`customDropdown-content-dark-mode p-2 flex-column d-flex text-center ${
          isOpen ? "d-block" : "d-none"
        }`}
        style={{
          width: (label === "Prediction" && "29.1%") || "19%",
        }}
      >
        {options &&
          options.map((option, index) => (
            <span
              className="dpcontent-dark-mode my-1 p-2 d-flex gap-2 justify-content-center"
              key={index}
              onClick={() => {
                onSelectOption(option);
                toggleDropdown();
              }}
            >
              {label == "Duration" && (
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOption && selectedOption?.includes(option)}
                  onChange={() => onSelectOption(option)}
                />
              )}
              {option}
            </span>
          ))}
      </div>
    </div>
  );
};
