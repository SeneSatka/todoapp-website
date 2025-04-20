import { defineStore } from 'pinia'
export const useStore= defineStore('main', {
  state: () => ({
    theme: localStorage.getItem("theme") || "light",
    lng: localStorage.getItem("lng") || "en",
  }),
  actions: {
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