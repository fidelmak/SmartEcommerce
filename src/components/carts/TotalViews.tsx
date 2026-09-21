import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../text/AppText";
import { AppFonts } from "../../styles/AppFonts";
import { AppColors } from "../../styles/AppColors";
import AppButton from "../buttons/AppButton";
interface totalViewProps {
  itemPrice: number | string;
  shippingFee: number | string;
  tax: number | string;
  orderTotal: number | string;
  onCheckoutPress: () => void;
}
const TotalViews: React.FC<totalViewProps> = ({
  itemPrice,
  shippingFee,
  tax,
  orderTotal,
  onCheckoutPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AppText style={styles.textStyle}>Item(s) Price</AppText>
        <AppText style={styles.textStyle}>${itemPrice}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textStyle}>Taxes</AppText>
        <AppText style={styles.textStyle}>${shippingFee}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textStyle}>Shipping Fee</AppText>
        <AppText style={styles.textStyle}>${tax}</AppText>
      </View>
      <View style={styles.margin} />
      <View style={styles.row}>
        <AppText style={styles.textStyle}>Order Total</AppText>
        <AppText style={styles.textStyle}>${orderTotal}</AppText>
      </View>
      <View style={{ borderColor: AppColors.darkGrey, borderWidth: s(1) }} />
      <AppButton
        onPress={onCheckoutPress}
        style={styles.button}
        title="Checkout"
      />
    </View>
  );
};

export default TotalViews;

const styles = StyleSheet.create({
  button: {
    marginTop: vs(12),
    alignItems: "center",
    marginBottom: vs(12),

    backgroundColor: AppColors.primary,
  },
  margin: { borderColor: AppColors.darkGrey, borderWidth: s(1) },
  container: {
    paddingHorizontal: s(12),

    marginBottom: s(20),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: s(5),
  },
  textStyle: { fontFamily: AppFonts.Bold, fontSize: s(16) },
});
