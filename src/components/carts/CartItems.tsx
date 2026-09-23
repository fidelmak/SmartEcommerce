import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../text/AppText";
import { AppFonts } from "../../styles/AppFonts";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { AppColors } from "../../styles/AppColors";

interface cartItemsProps {
  imageURL: string;
  title: string;
  price: string | number;
  onDeletePress: () => void;
  onIncreasePress: () => void;
  onDecreasePress: () => void;
  qty: number;
}

const CartItems: React.FC<cartItemsProps> = ({
  imageURL,
  title,
  price,
  onDeletePress,
  onIncreasePress,
  onDecreasePress,
  qty,
}) => {
  return (
    <View style={styles.container}>
      {/* image container */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageURL }} />
      </View>

      {/* details container  */}
      <View style={styles.detailsContainer}>
        <AppText style={styles.titleText}>{title}</AppText>
        <AppText style={styles.titlePrice}>${price}</AppText>
        <View style={styles.coreBtn}>
          <Pressable
            onPress={onIncreasePress}
            style={styles.btIncreaseDecrease}
          >
            <FontAwesome name={"plus"} size={s(8)} />
          </Pressable>
          <AppText
            style={{
              fontFamily: AppFonts.Bold,
              color: AppColors.primary,
              fontSize: s(14),
            }}
          >
            {qty}
          </AppText>
          <Pressable
            onPress={onDecreasePress}
            style={styles.btIncreaseDecrease}
          >
            <FontAwesome name={"minus"} size={s(8)} />
          </Pressable>
        </View>
      </View>
      {/* delete container  */}
      <View style={styles.deleteContainer}>
        <Pressable onPress={onDeletePress} style={styles.deleteButton}>
          <AntDesign name={"delete"} size={s(14)} color={AppColors.red} />
          <AppText style={styles.deleteItem}>Delete</AppText>
        </Pressable>
      </View>
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
  coreBtn: {
    backgroundColor: AppColors.white,
    borderWidth: s(2),

    borderColor: AppColors.lightGrey,
    borderRadius: s(12),
    width: "50%",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: s(2),
  },
  btIncreaseDecrease: {
    backgroundColor: AppColors.lightGrey,
    borderWidth: 1,
    borderColor: AppColors.darkGrey,
    borderRadius: s(12),
    width: "25%",
    justifyContent: "center",
    alignItems: "center",

    padding: s(2),
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  deleteItem: {
    marginLeft: 7,
    fontFamily: AppFonts.Medium,
    marginTop: 3,
    color: AppColors.darkGrey,
    fontSize: s(14),
  },
  titlePrice: {
    fontFamily: AppFonts.Bold,
    marginVertical: vs(5),
    fontSize: s(16),
  },
  titleText: {
    fontFamily: AppFonts.Medium,
    marginTop: vs(5),
    fontSize: s(14),
  },
  imageContainer: {
    flex: 2.5,

    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 3.5,
  },
  deleteContainer: {
    flex: 1.5,
    justifyContent: "flex-end",
    paddingEnd: s(12),
  },
  container: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    borderBottomWidth: s(3),
    paddingBottom: vs(2),
    borderColor: AppColors.lightGrey,
  },
  image: {
    height: vs(80),
    width: s(80),
    borderRadius: s(5),
  },
});
