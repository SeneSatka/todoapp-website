import { defineStore } from 'pinia'
export const useStore= defineStore('main', {
  state: () => ({
    isSettingsOpen: false,
    theme: localStorage.getItem("theme") || "light",
    lng: localStorage.getItem("lng") || "en",
  }),
  actions: {
    openSetting() {
      this.isSettingsOpen = true;
    },
    closeSetting() {
      this.isSettingsOpen = false;
    },
    setTheme(theme: string) {
      this.theme = theme;
      localStorage.setItem("theme", theme);
      if (theme == "dark") {
        document.documentElement.classList.add("dark");
      }
      else {
        document.documentElement.classList.remove("dark");
      }
    },
    setLng(lng: string) {
      this.lng = lng;
},},
persist:true
})