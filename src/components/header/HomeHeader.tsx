import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { AppColors } from "../../styles/AppColors";
import { s, vs } from "react-native-size-matters";
import { IMAGES } from "../../constants/image-paths";
import { MaterialIcons } from "@expo/vector-icons";
import { sharedHorizontalPadding } from "../../constants/SharedStyles";
import AppText from "../text/AppText";
import { AppFonts } from "../../styles/AppFonts";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={IMAGES.appLogo} style={styles.logo} />
        <AppText
          style={{
            fontSize: s(20),
            fontFamily: AppFonts.Bold,
            color: "#41413D",
          }}
        >
          Elegads
        </AppText>
      </View>
      <MaterialIcons name="notifications" color={"#41413D"} size={s(20)} />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: sharedHorizontalPadding * 1.2,
    marginBottom: s(12),
  },
  logo: {
    height: vs(24),
    width: s(24),
    borderRadius: s(12),
  },
});
