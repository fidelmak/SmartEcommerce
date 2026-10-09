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

      showMess("Order placed successfully", "green");

      navigation.goBack();
      dispatch(emptyCart());
    } catch (e) {
      showMess("Failed to place order", "red");
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
