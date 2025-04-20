import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import languageSystem from "./utils/langSystem";
import { t } from "i18next";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useStore } from './utils/store';
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(pinia);
app.use(languageSystem);
const theme = useStore().theme;
if (theme == "dark") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
} else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
}

app.mount('#app');
document.title = t("title");