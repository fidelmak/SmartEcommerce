import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import AppText from "../text/AppText";
import AppButton from "../buttons/AppButton";
import { s } from "react-native-size-matters";
import RadioWithTitle from "../radiotitle/RadioWithTitle";

const LanguageBottomSheet = () => {
  const [selectLanguage, setSelectLanguage] = useState("English");

  const languages = ["English", "Spanish", "Espanyol"];

  const setLang = (value) => {
    setSelectLanguage(value);
  };

  const handleConfirm = () => {
    console.log("Selected language:", selectLanguage);

    // Apply or save the selected language here.
  };

  return (
    <ActionSheet id="LANG_SHEET">
      <View style={styles.container}>
        <AppText style={styles.title}>Change Language</AppText>

        {languages.map((language) => (
          <RadioWithTitle
            key={language}
            title={language}
            selected={selectLanguage === language}
            onPress={() => setLang(language)}
          />
        ))}

        <AppButton title="Confirm" onPress={handleConfirm} />
      </View>
    </ActionSheet>
  );
};

export default LanguageBottomSheet;

const styles = StyleSheet.create({
  container: {
    padding: s(16),
  },
  title: {
    marginBottom: s(20),
    textAlign: "center",
  },
});
