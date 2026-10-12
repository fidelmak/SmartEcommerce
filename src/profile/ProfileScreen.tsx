import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../components/saveView/AppSaveView";
import HomeHeader from "../components/header/HomeHeader";
import ProfileSectionButton from "../components/buttons/ProfileSectionButton";
import { sharedHorizontalPadding } from "../constants/SharedStyles";
import ProfileDetails from "./ProfileDetails";
import { useNavigation } from "@react-navigation/native";
import OrderScreen from "../screens/order/OrderScreen";
import { SheetManager } from "react-native-actions-sheet";
import LanguageBottomSheet from "../components/language/LanguageBottomSheet";
import { useTranslation } from "react-i18next";
import AppText from "../components/text/AppText";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleLogout = async (link: string) => {
    try {
      await AsyncStorage.removeItem("USER_DATA");
      navigation.navigate(link);
    } catch (e) {}
  };
  return (
    <AppSaveView>
      <ProfileDetails />

      <View style={{ paddingHorizontal: sharedHorizontalPadding }}>
        <ProfileSectionButton
          title={t("profileMyOrders")}
          onPress={() => navigation.navigate(OrderScreen)}
        />
        <ProfileSectionButton
          title={t("profileLanguage")}
          onPress={() => SheetManager.show("LANG_SHEET")}
        />
        <ProfileSectionButton
          title={t("profileLogout")}
          onPress={() => handleLogout("AuthStack")}
        />
      </View>
      <LanguageBottomSheet />
    </AppSaveView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
