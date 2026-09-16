import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { vs, s } from "react-native-size-matters";
import AppText from "../text/AppText";
import { AppColors } from "../../styles/AppColors";

interface AppButtonProps {
  onPress: () => void;
  title: string;
  style: ViewStyle;
  backgroundColor?: string;
  textColor?: string;
  styleTitle: TextStyle;
  disabled: boolean;
}
const AppButton: React.FC<AppButtonProps> = ({
  onPress,
  title,
  style,
  backgroundColor = AppColors.black,
  textColor = AppColors.white,
  styleTitle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? AppColors.darkGrey : backgroundColor },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <AppText
        style={[styles.title, { color: textColor }, styleTitle]}
        variant="bold"
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: vs(40),
    borderRadius: s(25),
  },
  title: {
    fontSize: s(16),
  },
});
