import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/saveView/AppSaveView";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/AppColors";
import AppTextInput from "../../components/inputs/AppTextInput";
import { sharedHorizontalPadding } from "../../constants/SharedStyles";
import AppButton from "../../components/buttons/AppButton";
import { IS_ANDROID, IS_IOS } from "../../constants/constant";

const CheckoutScreen = () => {
  return (
    <AppSaveView>
      <View style={{ paddingHorizontal: s(12) }}>
        <View style={styles.inputContainer}>
          <AppTextInput placeholder="Full Name" />
          <AppTextInput placeholder="Phone Number" />
          <AppTextInput placeholder="Address" />
        </View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <AppButton title="Confirm" />
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
