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

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import showMess from "../../components/notification/ShowMessage";
import { auth } from "../../config/firebase";
import { Auth, createUserWithEmailAndPassword } from "firebase/auth";

// schema
const schema = yup
  .object({
    name: yup.string().lowercase().required("Name is required"),
    phone: yup.string().lowercase().required("Phone is required"),
    email: yup
      .string()
      .lowercase()
      .required("Email is required")
      .email("Invalid email address"),

    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password cannot exceed 32 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      )
      .required("Password is required"),
  })
  .required();

//
type FormData = yup.InferType<typeof schema>;
const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigation();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const register = async (formData: FormData, link: string) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      showMess("Registration  successful", "green");
      nav.navigate(link);
      console.log(formData);
      return userCredentials.user;
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        showMess("Email already in use. Please use a different email.", "red");
      } else if (e.code === "auth/invalid-email") {
        showMess("Invalid email address. Please check your email.", "red");
      } else {
        showMess(
          "An error occurred during registration. Please try again.",
          "red",
        );
      }
    }
  };

  return (
    <AppSaveView>
      <ScrollView>
        <View style={styles.container}>
          <Image source={IMAGES.appLogo} style={styles.logo} />
          <AppText style={{ alignSelf: "center" }} variant="bold">
            Create Account
          </AppText>
          <View style={{ height: vs(20) }}></View>
          <AppTextInputController
            control={control}
            name={"name"}
            placeHolder={"name"}
            secureTextEntry={false}
          />

          <AppTextInputController
            control={control}
            name={"email"}
            placeHolder={"email"}
            secureTextEntry={false}
          />
          <AppTextInputController
            control={control}
            name={"phone"}
            placeHolder={"phone"}
            keyboardType="numeric"
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
            onPress={handleSubmit((formData) =>
              register(formData, "MainAppBottomTab"),
            )}
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
function signUpWithEmailAndPassword(
  auth: Auth,
  email: string,
  password: string,
) {
  throw new Error("Function not implemented.");
}
