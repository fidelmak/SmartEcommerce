import moment from "moment";

export const getFirebaseDateStamp = (dateObject) => {
  return moment(dateObject).format("DD/MM/YYYY hh:mm A");
};