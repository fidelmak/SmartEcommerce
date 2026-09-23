import { StyleSheet, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../text/AppText";
import { AppFonts } from "../../styles/AppFonts";
import { AppColors } from "../../styles/AppColors";
import AppButton from "../buttons/AppButton";

interface TotalViewProps {
  itemPrice: number | string;
  shippingFee: number | string;
  tax: number | string;
  orderTotal: number | string;
  onCheckoutPress: () => void;
}

const TotalView: React.FC<TotalViewProps> = ({
  itemPrice,
  shippingFee,
  tax,
  orderTotal,
  onCheckoutPress,
}) => {
  const formatPrice = (price: number | string) => {
    const amount = Number(price);

    if (Number.isNaN(amount)) {
      return `$${price}`;
    }

    return `$${amount.toFixed(2)}`;
  };

  return (
    <View style={styles.container}>
      {/* Item Price */}
      <View style={styles.row}>
        <AppText style={styles.label}>Item(s) Price</AppText>
        <AppText style={styles.value}>{formatPrice(itemPrice)}</AppText>
      </View>

      {/* Tax */}
      <View style={styles.row}>
        <AppText style={styles.label}>Taxes</AppText>
        <AppText style={styles.value}>{formatPrice(tax)}</AppText>
      </View>

      {/* Shipping */}
      <View style={styles.row}>
        <AppText style={styles.label}>Shipping Fee</AppText>
        <AppText style={styles.value}>{formatPrice(shippingFee)}</AppText>
      </View>

      {/* Order Total */}
      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <AppText style={styles.totalLabel}>Order Total</AppText>
        <AppText style={styles.totalValue}>{formatPrice(orderTotal)}</AppText>
      </View>

      <View style={styles.divider} />

      <AppButton
        onPress={onCheckoutPress}
        style={styles.button}
        title="Checkout"
      />
    </View>
  );
};

export default TotalView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(12),
    marginBottom: vs(20),
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vs(8),
  },

  label: {
    fontFamily: AppFonts.Medium,
    fontSize: s(15),
    color: AppColors.darkGrey,
  },

  value: {
    fontFamily: AppFonts.Medium,
    fontSize: s(15),
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: vs(12),
  },

  totalLabel: {
    fontFamily: AppFonts.Bold,
    fontSize: s(17),
  },

  totalValue: {
    fontFamily: AppFonts.Bold,
    fontSize: s(18),
    color: AppColors.primary,
  },

  divider: {
    height: s(1),
    backgroundColor: AppColors.darkGrey,
    opacity: 0.3,
  },

  button: {
    marginTop: vs(14),
    marginBottom: vs(12),
    alignItems: "center",
    backgroundColor: AppColors.primary,
  },
});
