import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AppText from "../text/AppText";
import { sharedHorizontalPadding } from "../../constants/SharedStyles";
import { s, vs } from "react-native-size-matters";
import { AppFonts } from "../../styles/AppFonts";
import { AppColors } from "../../styles/AppColors";
interface orderCardProps {
  trackingId: string;
  orderStatus: string;
  address: string;
  orderDate: string;
  color: string;
  color2: string;
  onPress: () => void;
}

const OrderCard: React.FC<orderCardProps> = ({
  trackingId,
  orderStatus,
  address,
  orderDate,
  color,
  color2,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* order Progress */}
      <View style={styles.trackingId}>
        <View style={{ flexDirection: "column" }}>
          <AppText
            style={{ fontSize: s(10), color: AppColors.grey }}
            variant="medium"
          >
            TRACKING ID
          </AppText>
          <AppText style={{ fontSize: s(16) }} variant="bold">
            {trackingId}
          </AppText>
        </View>
        <View
          style={{
            backgroundColor: color,
            padding: s(5),
            borderRadius: s(8),
          }}
        >
          <AppText
            style={{
              fontSize: s(10),
              color: color2,
              fontFamily: AppFonts.Bold,
            }}
          >
            {orderStatus}
          </AppText>
        </View>
      </View>
      {/* order address */}
      <View style={{ flexDirection: "column" }}>
        <AppText
          style={{ fontSize: s(10), color: AppColors.grey }}
          variant="medium"
        >
          Destination
        </AppText>
        <AppText style={{ fontSize: s(12) }} variant="bold">
          {address}
        </AppText>
      </View>
      {/* date time  */}

      <View style={{ flexDirection: "column" }}>
        <AppText
          style={{ fontSize: s(10), color: AppColors.grey }}
          variant="medium"
        >
          Delivery Date
        </AppText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <AppText style={{ fontSize: s(12) }} variant="bold">
            {orderDate}
          </AppText>
          <AppText style={styles.details}>details</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  details: {
    fontSize: s(12),
    color: "#055A8F",
    fontFamily: AppFonts.Bold,
  },
  trackingId: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  container: {
    paddingHorizontal: sharedHorizontalPadding,
    marginTop: vs(20),
    borderRadius: s(12),
    borderWidth: s(2.3),
    padding: s(8),
    borderColor: AppColors.lightGrey,
  },
});
