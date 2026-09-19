import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/saveView/AppSaveView";
import HomeHeader from "../../components/header/HomeHeader";

const CartScreen = () => {
  return (
    <AppSaveView>
      <HomeHeader />
    </AppSaveView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
