import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "../text/AppText";
import { AppColors } from "../../styles/AppColors";
import { s, vs } from "react-native-size-matters";
import { AppFonts } from "../../styles/AppFonts";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileSectionButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.textView}>
        <AppText style={styles.textStyle}>{title}</AppText>
      </View>
      <View>
        <MaterialIcons name="arrow-forward-ios" size={s(14)} />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileSectionButton;

const styles = StyleSheet.create({
  textView: {
    flex: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: s(8),
  },
  container: {
    width: "100%",
    borderBottomColor: AppColors.lightGrey,
    paddingBottom: vs(10),
    marginTop: vs(14),
    flexDirection: "row",
    borderBottomWidth: s(1),
  },
  textStyle: {
    fontSize: s(16),
    fontFamily: AppFonts.Medium,
    color: AppColors.primary,
  },
});
