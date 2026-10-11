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
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducer/userReducer";
import { useTranslation } from "react-i18next";
import i18n from "../../localization/i18n";

// schema
const schema = yup
  .object({
    name: yup.string().lowercase().required(() => i18n.t("nameRequired")),
    phone: yup.string().lowercase().required(() => i18n.t("phoneRequired")),
    email: yup
      .string()
      .lowercase()
      .required(() => i18n.t("emailRequired"))
      .email(() => i18n.t("invalidEmail")),

    password: yup
      .string()
      .min(8, () => i18n.t("passwordMin8"))
      .max(32, () => i18n.t("passwordMax32"))
      .matches(/[a-z]/, () => i18n.t("passwordLower"))
      .matches(/[A-Z]/, () => i18n.t("passwordUpper"))
      .matches(/[0-9]/, () => i18n.t("passwordNumber"))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, () => i18n.t("passwordSpecial"))
      .required(() => i18n.t("passwordRequired")),
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
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const { t } = useTranslation();

  const register = async (formData: FormData, link: string) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      showMess(t("registrationSuccess"), "green");
      nav.navigate(link);
      console.log(formData);
      // return userCredentials.user;
      const userDataObject = {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
      };

      dispatch(setUserData(userDataObject));
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        showMess(t("emailInUse"), "red");
      } else if (e.code === "auth/invalid-email") {
        showMess(t("invalidEmailCheck"), "red");
      } else {
        showMess(t("registrationError"), "red");
      }
    }
  };

  return (
    <AppSaveView>
      <ScrollView>
        <View style={styles.container}>
          <Image source={IMAGES.appLogo} style={styles.logo} />
          <AppText style={{ alignSelf: "center" }} variant="bold">
            {t("signUpTitle")}
          </AppText>
          <View style={{ height: vs(20) }}></View>
          <AppTextInputController
            control={control}
            name={"name"}
            placeHolder={t("namePlaceholder")}
            secureTextEntry={false}
          />

          <AppTextInputController
            control={control}
            name={"email"}
            placeHolder={t("emailPlaceholder")}
            secureTextEntry={false}
          />
          <AppTextInputController
            control={control}
            name={"phone"}
            placeHolder={t("phonePlaceholder")}
            keyboardType="numeric"
            secureTextEntry={false}
          />
          <AppTextInputController
            control={control}
            name={"password"}
            placeHolder={t("passwordPlaceholder")}
            secureTextEntry={true}
          />

          <AppButton
            disabled={false}
            onPress={handleSubmit((formData) =>
              register(formData, "MainAppBottomTab"),
            )}
            title={t("continue")}
            style={{}}
            styleTitle={{}}
          />
          <View style={{ height: vs(20) }}></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <AppText>{t("alreadyHaveAccount")}</AppText>
            <AppText
              style={{ color: AppColors.blue }}
              onPress={() => nav.navigate("SignInScreen")}
            >
              {t("loginLink")}
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
