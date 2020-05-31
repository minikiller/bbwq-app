import Vue from "vue";
import VueI18n from "vue-i18n";
import LangStorage from "./lang";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";

Vue.use(VueI18n);
const DEFAULT_LANG = "zh";
const LOCALE_KEY = "localeLanguage";
const locales = {
  zh: Object.assign(require("./zh.json"), zhLocale),
  en: Object.assign(require("./en.json"), enLocale)
};
const i18n = new VueI18n({
  locale: LangStorage.getLang("zh"),
  messages: locales
});
export const setup = lang => {
  if (lang === undefined) {
    lang = window.localStorage.getItem(LOCALE_KEY);
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG;
    }
  }
  console.log(lang);
  window.localStorage.setItem(LOCALE_KEY, lang);
  Object.keys(locales).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`);
  });
  document.body.classList.add(`lang-${lang}`);
  document.body.setAttribute("lang", lang);
  Vue.config.lang = lang;
  i18n.locale = lang;
};
window.i18n = i18n;
export default i18n;
