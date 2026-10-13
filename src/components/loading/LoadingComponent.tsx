import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../../styles/AppColors";

const LoadingComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color="AppColors.black" />
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({});
