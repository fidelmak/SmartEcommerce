import "./src/localization/i18n";
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
import { Provider } from "react-redux";
import { store } from "./src/store/store";

import i18n from "./src/localization/i18n";
import { I18nextProvider } from "react-i18next";

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
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            <FlashMessage position={"bottom"} />
            <MainStackScreen />
          </NavigationContainer>
        </I18nextProvider>
      </Provider>
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
