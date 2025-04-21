import { defineStore } from 'pinia'
type Modals="edit"|"create"|"delete"|"settings"|"none"
type Theme = "light" | "dark"
export interface State {
  openedModal: Modals,
  theme: Theme,
  lng: string,
  todos: Array<{ date: number, title: string, completed: boolean }>
}
export const useStore= defineStore('main', {
  state: ():State => {
    return {
    openedModal: "none",
    theme: (localStorage.getItem("theme") as Theme) || "light",
    lng: localStorage.getItem("lng") || "en",
    todos: [],
  }
  },
  actions: {
    openModal(a:Modals) {
      this.openedModal = a;
    },
    closeModal() {
      this.openedModal = "none";
    },
  
    setTheme(theme: Theme) {
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
    },
},
persist:{
  omit:['openedModal'],
  storage: localStorage,
}
})