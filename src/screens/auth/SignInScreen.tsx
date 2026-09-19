import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import AppSaveView from "../../components/saveView/AppSaveView";
import AppText from "../../components/text/AppText";
import AppTextInput from "../../components/inputs/AppTextInput";
import { s, vs } from "react-native-size-matters";
import { showMessage } from "react-native-flash-message";
import AppButton from "../../components/buttons/AppButton";
import { sharedHorizontalPadding } from "../../constants/SharedStyles";
import { IMAGES } from "../../constants/image-paths";
import { AppColors } from "../../styles/AppColors";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const nav = useNavigation();

  function showMess(message: string) {
    return showMessage({
      message: message,

      backgroundColor: "purple", // background color
      color: "#fff",
    });
  }
  return (
    <AppSaveView>
      <ScrollView>
        <View style={styles.container}>
          <Image source={IMAGES.appLogo} style={styles.logo} />
          <AppText style={{ alignSelf: "center" }} variant="bold">
            Login to Account
          </AppText>
          <View style={{ height: vs(20) }}></View>

          <AppTextInput
            values={email}
            onChangeText={setEmail}
            placeholder={"email"}
            secureTextEntry={false}
            keyboardType={"email-address"}
            style={{}}
          />

          <AppTextInput
            values={password}
            onChangeText={setPassword}
            placeholder={"password"}
            secureTextEntry={true}
            keyboardType={"default"}
            style={{}}
          />
          <AppButton
            disabled={false}
            onPress={() => nav.navigate("MainAppBottomTab")}
            title="Continue"
            style={{}}
            styleTitle={{}}
          />
          <View style={{ height: vs(20) }}></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <AppText>New here?</AppText>
            <AppText
              style={{ color: AppColors.blue }}
              onPress={() => nav.navigate("SignUpScreen")}
            >
              create account
            </AppText>
          </View>
        </View>
      </ScrollView>
    </AppSaveView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: vs(80),
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: sharedHorizontalPadding,
  },
  logo: {
    width: s(80),
    height: vs(80),
    borderRadius: s(20),
    marginBottom: s(16),
  },
});
