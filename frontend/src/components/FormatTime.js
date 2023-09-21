import moment from "moment";

export const formatTimeDifference = (timestamp) => {
  const now = moment();
  const diff = moment(timestamp);

  if (now.diff(diff, "years") >= 1) {
    return diff.fromNow();
  } else if (now.diff(diff, "months") >= 1) {
    return diff.fromNow();
  } else if (now.diff(diff, "days") >= 1) {
    return diff.fromNow();
  } else {
    return diff.fromNow();
  }
};
