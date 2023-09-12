export const CustomDropDownForCommentsCreatetion = ({
  label,
  options,
  selectedOption,
  onSelectOption,
  isOpen,
  toggleDropdown,
}) => {
  return (
    <div className="my-2">
      <span>{label}</span>
      <div
        className={`${"customDropdown-dark-mode"} p-1 text-center`}
        onClick={toggleDropdown}
      >
        <span>{selectedOption}</span>
      </div>
      <div
        className={`customDropdown-content-dark-mode p-2 flex-column d-flex text-center ${
          isOpen ? "d-block" : "d-none"
        }`}
        style={{
          width: (label === 'Prediction' && '29.1%') || "19%",
        }}
      >
        {options.map((option, index) => (
          <span
            className="dpcontent-dark-mode my-1 p-2"
            key={index}
            onClick={() => {
              onSelectOption(option);
              toggleDropdown();
            }}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};