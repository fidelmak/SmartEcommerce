import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../components/saveView/AppSaveView";
import HomeHeader from "../components/header/HomeHeader";

const ProfileScreen = () => {
  return (
    <AppSaveView>
      <HomeHeader />
    </AppSaveView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
