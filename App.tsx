// import { Button, StyleSheet, Text, View } from "react-native";
// import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const App = () => {
//   const [counter, setCounter] = useState(0);
//   // to store data
//   const storeData = async (value) => {
//     try {
//       await AsyncStorage.setItem("my-key", value);
//     } catch (e) {}
//   };

//   // to get data

//   const getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem("my-key");
//       if (value != null) {
//         console.log(`the value is ${value}`);
//         setCounter(+value);
//       }
//     } catch (e) {}
//   };

//   const removeData = async () => {
//     try {
//       await AsyncStorage.removeItem("my-key");
//     } catch (e) {}
//   };

//   const increaseCounterAndSave = () => {
//     const newValue = counter + 10;
//     setCounter(newValue);
//     storeData(newValue.toString());
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Counter {counter}</Text>
//       <View style={{ height: 10 }} />
//       <Text onPress={() => increaseCounterAndSave()}>Increase by 10 </Text>
//       <Button title="Remove data " onPress={removeData} />
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});

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
import { persistor, store } from "./src/store/store";

import i18n, { loadSavedLanguage } from "./src/localization/i18n";
import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Medium": require("./src/assets/fonts/Nunito-Medium.ttf"),
  });

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} />;
  }
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <NavigationContainer>
              <FlashMessage position={"bottom"} />
              <MainStackScreen />
            </NavigationContainer>
          </I18nextProvider>
        </PersistGate>
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
