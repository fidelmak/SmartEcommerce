import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AppColors } from "../../styles/AppColors";
import { s, vs } from "react-native-size-matters";
import AppText from "../text/AppText";
import { AppFonts } from "../../styles/AppFonts";
import { Ionicons } from "@expo/vector-icons";

interface productCardProps {
  price: number;
  title: string;
  imageUrl: string;
  onPress: () => void;
}

const ProductCard: React.FC<productCardProps> = ({
  price,
  title,
  imageUrl,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.addToCartButtonContainer}
      >
        <Ionicons name="cart" size={s(15)} color={AppColors.white} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {/* image Ui section  */}
        <Image
          style={styles.image}
          source={{
            uri: imageUrl,
          }}
        />
      </View>

      {/* details section  */}
      <View style={styles.detailsContainer}>
        <AppText>{title}</AppText>
        <View>
          <AppText
            variant="bold"
            style={{
              fontSize: 24,
            }}
          >
            £{price}
          </AppText>
          <AppText
            variant="bold"
            style={{
              color: AppColors.darkGrey,
              fontSize: 18,
              textShadowColor: AppColors.darkGrey,
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 10,
            }}
          >
            20% OFF
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  addToCartButtonContainer: {
    position: "absolute",
    backgroundColor: AppColors.primary,
    borderRadius: s(14),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    height: vs(28),
    width: s(28),
    left: s(5),
    top: s(5),
  },
  detailsContainer: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: s(10),
    paddingBottom: vs(15),
  },
  image: {
    height: "80%",
    width: "80%",
    resizeMode: "contain",
  },
  imageContainer: {
    overflow: "hidden",
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
    height: vs(130),
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  container: {
    height: vs(210),
    width: s(160),
    backgroundColor: AppColors.white,
    borderRadius: s(18),
    borderWidth: s(1),
    borderColor: AppColors.darkGrey,
    shadowColor: AppColors.grey,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Android
  },
});
