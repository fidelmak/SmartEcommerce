import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./en.json"
import es from "./es.json"
import fr from "./fr.json"

export const LANGUAGE_KEY = "USER_LANG";

const LANGUAGES = {
en: {
    translation:en
},
es: {
    translation:es
},
fr: {
    translation:fr
}
}
i18n.use(initReactI18next).init({
    resources: LANGUAGES,
    lng: "en",
    fallbackLng : "en",
    defaultNS: "translation",
    ns:["translation"],
    react:{
        useSuspense:false,
    },
    interpolation :{
        escapeValue:false,
    }
})

// Persist the language whenever it changes.
i18n.on("languageChanged", (lng) => {
    AsyncStorage.setItem(LANGUAGE_KEY, lng).catch((e) =>
        console.log("Error saving language:", e),
    );
});

// Restore the saved language on app startup.
export const loadSavedLanguage = async () => {
    try {
        const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (saved && saved !== i18n.language) {
            await i18n.changeLanguage(saved);
        }
    } catch (e) {
        console.log("Error loading saved language:", e);
    }
};

export default i18n
