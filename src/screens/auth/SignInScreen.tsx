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
import showMess from "../../components/notification/ShowMessage";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducer/userReducer";
import { useTranslation } from "react-i18next";
import i18n from "../../localization/i18n";

// schema
const schema = yup
  .object({
    email: yup
      .string()
      .lowercase()
      .required(() => i18n.t("emailRequired"))
      .email(() => i18n.t("invalidEmail")),

    password: yup
      .string()
      .min(6, () => i18n.t("passwordMin6"))
      .max(32, () => i18n.t("passwordMax32"))

      .required(() => i18n.t("passwordRequired")),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
//

const SignInScreen = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const { t } = useTranslation();

  const nav = useNavigation();

  const dispatch = useDispatch();
  const login = async (formData: FormData, link: string) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      showMess(t("loginSuccess"), "green");
      const userDataObject = {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
      };

      dispatch(setUserData(userDataObject));

      nav.navigate(link);
    } catch (e) {
      if (e.code === "auth/user-not-found") {
        showMess(t("userNotFound"), "red");
      } else if (e.code === "auth/invalid-credential") {
        showMess(t("invalidCredentials"), "red");
      } else {
        showMess(t("genericError"), "red");
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
            {t("loginTitle")}
          </AppText>
          <View style={{ height: vs(20) }}></View>

          <AppTextInputController
            control={control}
            name={"email"}
            placeHolder={t("emailPlaceholder")}
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
            onPress={
              handleSubmit((formData) => login(formData, "MainAppBottomTab"))
              //
            }
            title={t("continue")}
            style={{}}
            styleTitle={{}}
          />
          <View style={{ height: vs(20) }}></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <AppText>{t("newHere")}</AppText>
            <AppText
              style={{ color: AppColors.blue }}
              onPress={() => nav.navigate("SignUpScreen")}
            >
              {t("createAccountLink")}
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
