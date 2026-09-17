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

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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
            Create Account
          </AppText>
          <View style={{ height: vs(20) }}></View>
          <AppTextInput
            values={name}
            onChangeText={setName}
            placeholder={"name"}
            secureTextEntry={false}
            keyboardType={"default"}
            style={{}}
          />
          <AppTextInput
            values={email}
            onChangeText={setEmail}
            placeholder={"email"}
            secureTextEntry={false}
            keyboardType={"email-address"}
            style={{}}
          />
          <AppTextInput
            values={phone}
            onChangeText={setPhone}
            placeholder={"phone"}
            secureTextEntry={false}
            keyboardType={"numeric"}
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
            onPress={() => showMess("Redirecting to Dashboard")}
            title="Continue"
            style={{}}
            styleTitle={{}}
          />
          <View style={{ height: vs(20) }}></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <AppText>Already have account?</AppText>
            <AppText
              style={{ color: AppColors.blue }}
              onPress={() => nav.navigate("SignInScreen")}
            >
              login
            </AppText>
          </View>
        </View>
      </ScrollView>
    </AppSaveView>
  );
};

export default SignUpScreen;

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
