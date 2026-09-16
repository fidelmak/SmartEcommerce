import { StyleSheet, Text, TextInput, TextStyle, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/AppColors";

interface AppTextInputProps {
  values: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry: boolean;
  keyboardType: "default" | "email-address" | "numeric";
  style: TextStyle;
}
const AppTextInput: React.FC<AppTextInputProps> = ({
  values,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  style,
}) => {
  return (
    <TextInput
      value={values}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={[styles.input, style]}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: AppColors.white,
    borderRadius: s(20),
    height: vs(40),
    paddingLeft: s(20),
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    fontSize: s(16),
    marginVertical: vs(8),
  },
});
