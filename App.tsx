import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AppText from "./src/components/text/AppText";
import AppSaveView from "./src/components/saveView/AppSaveView";
import FlashMessage, { showMessage } from "react-native-flash-message";
import AppButton from "./src/components/buttons/AppButton";
import { vs } from "react-native-size-matters";
import AppTextInput from "./src/components/inputs/AppTextInput";
import SignInScreen from "./src/screens/auth/SignInScreen";
import AuthStack from "./src/navigations/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import MainStackScreen from "./src/navigations/MainAppStack";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Medium": require("./src/assets/fonts/Nunito-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} />;
  }
  return (
    <>
      <NavigationContainer>
        <FlashMessage position={"bottom"} />
        <MainStackScreen />
      </NavigationContainer>
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
