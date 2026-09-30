import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/saveView/AppSaveView";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/AppColors";
import AppTextInput from "../../components/inputs/AppTextInput";
import { sharedHorizontalPadding } from "../../constants/SharedStyles";
import AppButton from "../../components/buttons/AppButton";
import { IS_ANDROID, IS_IOS } from "../../constants/constant";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 character"),
    phoneNumber: yup
      .string()
      .required("Phone Number  is required")
      .matches(/^[0-9]+$/, " must be only didgit")
      .min(10, "phone number must be at least 10 digits"),
    address: yup
      .string()
      .required("Address is required")
      .min(15, "Address must be at least 15 character"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const CheckoutScreen = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const saveOrder = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <AppSaveView>
      <View style={{ paddingHorizontal: s(12) }}>
        <View style={styles.inputContainer}>
          <AppTextInputController
            control={control}
            name={"fullName"}
            placeHolder={"Full Name"}
          />
          <AppTextInputController
            control={control}
            name={"phoneNumber"}
            placeHolder={"Phone Number"}
            keyboardType={"numeric"}
          />
          <AppTextInputController
            control={control}
            name={"address"}
            placeHolder={"Address"}
          />
        </View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <AppButton title="Confirm" onPress={handleSubmit(saveOrder)} />
      </View>
    </AppSaveView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  bottomButtonContainer: {
    paddingHorizontal: sharedHorizontalPadding,
    position: "absolute",
    width: "100%",
    bottom: IS_ANDROID ? vs(16) : 0,
    borderTopWidth: 1,
    backgroundColor: AppColors.lightGrey,
    paddingTop: vs(10),
  },
  inputContainer: {
    padding: s(8),
    borderRadius: s(8),
    backgroundColor: AppColors.white,
    marginTop: IS_IOS ? vs(12) : undefined,
    paddingTop: vs(8),
  },
});
