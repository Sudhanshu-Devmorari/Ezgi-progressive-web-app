
export const ref = () => {
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);

  const ref_no = queryParams.get("ref");
  return ref_no
};
