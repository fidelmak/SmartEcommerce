import { StyleSheet, View, Image, ScrollView } from "react-native";
import React from "react";
import AppSaveView from "../../components/saveView/AppSaveView";
import AppText from "../../components/text/AppText";
import AppButton from "../../components/buttons/AppButton";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/AppColors";
import { sharedHorizontalPadding } from "../../constants/SharedStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addItemToCart } from "../../store/reducer/cartSlice";
import showMess from "../../components/notification/ShowMessage";
import { useTranslation } from "react-i18next";

interface Product {
  id: number | string;
  title?: string;
  price: number;
  imageURL?: string;
}

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items } = useSelector((state: RootState) => state.cartSlice);

  const product = (route.params as { product?: Product } | undefined)?.product;

  if (!product) {
    return (
      <AppSaveView>
        <View style={styles.center}>
          <AppText>{t("productNotFound")}</AppText>
        </View>
      </AppSaveView>
    );
  }

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
    showMess(t("addedToCart", { title: product.title }), "green");
  };

  const handleCheckout = () => {
    const exists = items.some((item) => item.id === product.id);
    if (!exists) {
      dispatch(addItemToCart(product));
    }
    navigation.navigate("CheckoutScreen");
  };

  return (
    <AppSaveView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: product.imageURL }}
            resizeMode="contain"
          />
        </View>

        <AppText variant="bold" style={styles.title}>
          {product.title}
        </AppText>

        <AppText variant="bold" style={styles.price}>
          ${product.price}
        </AppText>

        <View style={styles.buttonContainer}>
          <AppButton
            title={t("addToCart")}
            onPress={handleAddToCart}
            style={styles.button}
            styleTitle={{}}
            disabled={false}
            backgroundColor={AppColors.primary}
          />
          <AppButton
            title={t("checkout")}
            onPress={handleCheckout}
            style={styles.button}
            styleTitle={{}}
            disabled={false}
          />
        </View>
      </ScrollView>
    </AppSaveView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: sharedHorizontalPadding,
    paddingBottom: vs(30),
  },
  imageContainer: {
    height: vs(300),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.lightGrey,
    borderRadius: s(18),
    marginTop: vs(12),
    marginBottom: vs(20),
  },
  image: {
    height: "80%",
    width: "80%",
  },
  title: {
    fontSize: s(22),
    marginBottom: vs(10),
  },
  price: {
    fontSize: s(26),
    color: AppColors.primary,
    marginBottom: vs(24),
  },
  buttonContainer: {
    gap: vs(12),
  },
  button: {
    backgroundColor: AppColors.primary,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
