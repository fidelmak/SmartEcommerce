import { showMessage } from "react-native-flash-message";

function showMess(message: string, color: string) {
  return showMessage({
    message: message,

    backgroundColor: color, // background color
    color: "#fff",
  });
}

export default showMess;
