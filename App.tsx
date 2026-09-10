import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppText from "./src/components/text/AppText";
import AppSaveView from "./src/components/saveView/AppSaveView";
import FlashMessage, { showMessage } from "react-native-flash-message";
import AppButton from "./src/components/buttons/AppButton";

export default function App() {
  return (
    <>
      <FlashMessage position={"bottom"} />
      <AppSaveView>
        <View style={styles.container}>
          <AppText style={{ alignSelf: "center" }} variant="bold">
            New Development
          </AppText>
          <AppText
            onPress={() => {
              showMessage({
                message: "Started Successfully",
                //type: "default",
                backgroundColor: "purple", // background color
                color: "#fff",
              });
            }}
            style={{ alignSelf: "center", marginTop: 12 }}
            variant="medium"
          >
            Start
          </AppText>
          <AppButton disabled onPress={() => {}} title="Continue" />
        </View>
      </AppSaveView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
});
