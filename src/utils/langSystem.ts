import i18next from "i18next";
import i18NextVue from "i18next-vue";
import { type Plugin } from "vue";
import * as tr from "../locales/tr.json";
import * as en from "../locales/en.json";
import { useStore } from "./store";
const plugin: Plugin = {
  install(app) {
    const {setLng,lng} = useStore();
    i18next.init({
      lng: lng,
      interpolation: {
        escapeValue: false,
      },
      fallbackLng: false,
      resources: {
        tr: { translation: tr },
        en: { translation: en },
      },
    });
    app.use(i18NextVue, { i18next: i18next });
  },
};

export default plugin;