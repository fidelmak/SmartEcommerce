import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import { AppColors } from "../../styles/AppColors";
import { IS_ANDROID } from "../../constants/constant";

interface AppSaveViewProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}
const AppSaveView: FC<AppSaveViewProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

export default AppSaveView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: AppColors.white,
    paddingTop: IS_ANDROID ? 25 : 0,
  },
  container: {
    flex: 1,
  },
});
