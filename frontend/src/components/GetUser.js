export const userId = localStorage.getItem("user-id");

export function truncateString(str, maxLength) {
  if (str && str?.length <= maxLength) {
    return str;
  } else {
    // Subtract 3 from maxLength to make room for the ellipsis.
    return str?.substring(0, maxLength - 1) + "...";
  }
}
