import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { AppColors } from "../../styles/AppColors";
import { s, vs } from "react-native-size-matters";
import { IMAGES } from "../../constants/image-paths";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: s(5),
  },
  logo: {
    height: vs(40),
    width: s(40),
    borderRadius: s(12),
  },
});
