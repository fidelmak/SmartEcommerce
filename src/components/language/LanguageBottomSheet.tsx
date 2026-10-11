import { StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useTranslation } from "react-i18next";
import AppText from "../text/AppText";
import AppButton from "../buttons/AppButton";
import { s } from "react-native-size-matters";
import RadioWithTitle from "../radiotitle/RadioWithTitle";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

const LanguageBottomSheet = () => {
  const { t, i18n } = useTranslation();
  const sheetRef = useRef<ActionSheetRef>(null);
  const [selectLanguage, setSelectLanguage] = useState(
    i18n.language?.split("-")[0] ?? "en",
  );

  const handleConfirm = () => {
    i18n.changeLanguage(selectLanguage);
    sheetRef.current?.hide();
  };

  return (
    <ActionSheet id="LANG_SHEET" ref={sheetRef}>
      <View style={styles.container}>
        <AppText style={styles.title}>{t("changeLanguageTitle")}</AppText>

        {LANGUAGES.map((language) => (
          <RadioWithTitle
            key={language.code}
            title={language.label}
            selected={selectLanguage === language.code}
            onPress={() => setSelectLanguage(language.code)}
          />
        ))}

        <AppButton
          title={t("confirm")}
          onPress={handleConfirm}
          style={{}}
          styleTitle={{}}
          disabled={false}
        />
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
