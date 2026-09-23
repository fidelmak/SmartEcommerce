import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../components/saveView/AppSaveView";
import HomeHeader from "../components/header/HomeHeader";
import ProfileSectionButton from "../components/buttons/ProfileSectionButton";
import { sharedHorizontalPadding } from "../constants/SharedStyles";
import ProfileDetails from "./ProfileDetails";
import { useNavigation } from "@react-navigation/native";
import OrderScreen from "../screens/order/OrderScreen";

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <AppSaveView>
      <ProfileDetails />
      <View style={{ paddingHorizontal: sharedHorizontalPadding }}>
        <ProfileSectionButton
          title={"My Orders"}
          onPress={() => navigation.navigate(OrderScreen)}
        />
        <ProfileSectionButton title={"Settings"} />
        <ProfileSectionButton title={"Log out"} />
      </View>
    </AppSaveView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
