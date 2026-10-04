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
import * as yup from "yup";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// schema
const schema = yup
  .object({
    email: yup
      .string()
      .lowercase()
      .required("Email is required")
      .email("Invalid email address"),

    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(32, "Password cannot exceed 32 characters")
      // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      // .matches(/[0-9]/, "Password must contain at least one number")
      // .matches(
      //   /[!@#$%^&*(),.?":{}|<>]/,
      //   "Password must contain at least one special character",
      //)
      .required("Password is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
//

const SignInScreen = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  function showMess(message: string) {
    return showMessage({
      message: message,

      backgroundColor: "purple", // background color
      color: "#fff",
    });
  }
  const nav = useNavigation();
  const login = async (formData: FormData, link: string) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      showMess("Login successful");
      console.log(userCredentials);
      nav.navigate(link);
    } catch (e) {
      if (e.code === "auth/user-not-found") {
        showMess("User not found. Please check your email or sign up.");
      } else if (e.code === "auth/invalid-credential") {
        showMess("Invalid email or password");
      } else {
        showMess("An error occurred. Please try again.");
      }
      console.error(e);
    }
  };

  return (
    <AppSaveView>
      <ScrollView>
        <View style={styles.container}>
          <Image source={IMAGES.appLogo} style={styles.logo} />
          <AppText style={{ alignSelf: "center" }} variant="bold">
            Login to Account
          </AppText>
          <View style={{ height: vs(20) }}></View>

          <AppTextInputController
            control={control}
            name={"email"}
            placeHolder={"email"}
            secureTextEntry={false}
          />

          <AppTextInputController
            control={control}
            name={"password"}
            placeHolder={"password"}
            secureTextEntry={true}
          />

          <AppButton
            disabled={false}
            onPress={
              handleSubmit((formData) => login(formData, "MainAppBottomTab"))
              //
            }
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
