import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "../../components/text/AppText";
import { AppFonts } from "../../styles/AppFonts";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/AppColors";
import AppButton from "../../components/buttons/AppButton";
import { sharedHorizontalPadding } from "../../constants/SharedStyles";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const EmptyCart = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="shopping-outline"
        size={s(100)}
        color={AppColors.primary}
        style={styles.icons}
      />
      <AppText style={styles.title}>{t("cartEmptyTitle")}</AppText>
      <AppText style={styles.subTitle}>{t("cartEmptySubtitle")}</AppText>
      <AppButton
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
        title={t("startShopping")}
      />
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: AppFonts.Bold,
    fontSize: s(20),
    marginBottom: vs(10),
    color: AppColors.primary,
  },
  subTitle: {
    fontFamily: AppFonts.Medium,
    fontSize: s(16),
    color: AppColors.darkGrey,
    marginBottom: vs(10),
    justifyContent: "center",
    textAlign: "center",
  },
  button: {
    width: "80%",
    backgroundColor: AppColors.primary,
  },
  icons: {
    marginBottom: vs(20),
    opacity: 0.5,
  },
});
