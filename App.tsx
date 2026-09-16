import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppText from "./src/components/text/AppText";
import AppSaveView from "./src/components/saveView/AppSaveView";
import FlashMessage, { showMessage } from "react-native-flash-message";
import AppButton from "./src/components/buttons/AppButton";
import { vs } from "react-native-size-matters";
import AppTextInput from "./src/components/inputs/AppTextInput";
import SignInScreen from "./src/screens/auth/SignInScreen";

export default function App() {
  return (
    <>
      <FlashMessage position={"bottom"} />
      <SignInScreen />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
});
