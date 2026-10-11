import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json"
import es from "./es.json"
import fr from "./fr.json"

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


export default i18n