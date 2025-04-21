import { add } from 'date-fns'
import { t } from 'i18next'
import { defineStore } from 'pinia'
type Modals="edit"|"create"|"delete"|"settings"|"none"
type Theme = "light" | "dark"
export type Task={ date: number, title: string, completed: boolean }
export interface State {
  openedModal: Modals,
  theme: Theme,
  lng: string,
  todos: Array<Task>
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
    addTask(title: string) {
      const date = Date.now();
      this.todos.push({
        date: date,
        title: title,
        completed: false,
      });
    },
    deleteTask(id:number) {
      this.todos = this.todos.filter((task) => task.date !== id);
    },
    editTask(id:number,data:Task){
this.deleteTask(id)
this.todos.push(data)
  }},
persist:{
  omit:['openedModal'],
  storage: localStorage,
}
})