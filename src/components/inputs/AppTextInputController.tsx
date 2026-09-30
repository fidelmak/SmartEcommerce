import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import { AppColors } from "../../styles/AppColors";
import AppText from "../text/AppText";
import { s } from "react-native-size-matters";

interface AppTextInputContollerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: Object;
  secureTextEntry?: boolean;

  placeHolder: string;
  keyboardType: string;
}

const AppTextInputController = <T extends FieldValues>({
  control,
  name,
  rules,
  secureTextEntry,

  placeHolder,
  keyboardType,
}: AppTextInputContollerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <AppTextInput
            values={value}
            onChangeText={onChange}
            placeholder={placeHolder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={error && styles.errorInput}
          />
          {error && <AppText style={styles.textError}>{error.message}</AppText>}
        </>
      )}
    />
  );
};

export default AppTextInputController;

const styles = StyleSheet.create({
  errorInput: {
    borderColor: AppColors.red,
  },
  textError: {
    color: AppColors.red,
    fontSize: s(12),
  },
});
