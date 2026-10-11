import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/saveView/AppSaveView";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/AppColors";
import AppTextInput from "../../components/inputs/AppTextInput";
import { sharedHorizontalPadding } from "../../constants/SharedStyles";
import AppButton from "../../components/buttons/AppButton";
import {
  IS_ANDROID,
  IS_IOS,
  SHIPPING_FEE,
  TAX,
} from "../../constants/constant";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import showMess from "../../components/notification/ShowMessage";
import { useNavigation } from "@react-navigation/native";
import { emptyCart, removeTotalItem } from "../../store/reducer/cartSlice";
import EmptyCart from "./EmptyCart";
import { useTranslation } from "react-i18next";
import i18n from "../../localization/i18n";

const schema = yup
  .object({
    fullName: yup
      .string()
      .required(() => i18n.t("nameRequired"))
      .min(3, () => i18n.t("fullNameMin")),
    phoneNumber: yup
      .string()
      .required(() => i18n.t("phoneNumberRequired"))
      .matches(/^[0-9]+$/, () => i18n.t("phoneNumberDigit"))
      .min(10, () => i18n.t("phoneNumberMin")),
    address: yup
      .string()
      .required(() => i18n.t("addressRequired"))
      .min(15, () => i18n.t("addressMin")),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const CheckoutScreen = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const { t } = useTranslation();

  // to access the userdata
  const { userData } = useSelector((state: RootState) => state.userSlice);
  const { items } = useSelector((state: RootState) => state.cartSlice);
  const dispatch = useDispatch();
  const totalProductItemSum = items.reduce((acc, item) => acc + item.sum, 0);
  const orderTotal = totalProductItemSum + SHIPPING_FEE + TAX;

  const navigation = useNavigation();

  const saveOrder = async (formData: FormData) => {
    try {
      const data = {
        ...formData,
        items,
        totalProductItemSum,
        orderTotal,
        createdAt: new Date().toISOString(),
      };
      const userOrderRef = collection(doc(db, "users", userData.uid), "orders");
      await addDoc(userOrderRef, data);
      const orderRef = collection(db, "orders");
      await addDoc(orderRef, data);

      showMess(t("orderPlacedSuccess"), "green");

      navigation.goBack();
      dispatch(emptyCart());
    } catch (e) {
      showMess(t("orderPlacedFailed"), "red");
      console.error("Error placing order: ", e);
    }
  };

  const PlaceOrder = () => {};

  return (
    <AppSaveView>
      <View style={{ paddingHorizontal: s(12) }}>
        <View style={styles.inputContainer}>
          <AppTextInputController
            control={control}
            name={"fullName"}
            placeHolder={t("fullNamePlaceholder")}
          />
          <AppTextInputController
            control={control}
            name={"phoneNumber"}
            placeHolder={t("phoneNumberPlaceholder")}
            keyboardType={"numeric"}
          />
          <AppTextInputController
            control={control}
            name={"address"}
            placeHolder={t("addressPlaceholder")}
          />
        </View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <AppButton title={t("confirm")} onPress={handleSubmit(saveOrder)} />
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
    marginTop: IS_IOS ? vs(12) : vs(8),
    paddingTop: vs(8),
  },
});
