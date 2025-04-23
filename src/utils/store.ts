import { defineStore } from 'pinia'
type Modals="edit"|"create"|"delete"|"settings"|"none"
type Theme = "light" | "dark"
export type Task={ date: number, title: string, completed: boolean }
export interface State {
  editingTaskId: number,
  openedModal: Modals,
  theme: Theme,
  lng: string,
  todos: Array<Task>
}
export const useStore= defineStore('main', {
  state: ():State => {
    return {
    editingTaskId: 0,
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
    refreshTasks() {
      this.todos = [...this.todos.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return a.date - b.date;
      })];
    },
    setEditingTaskId(id: number) {
      this.editingTaskId = id;
    },
    getTask(id:number) {
      const task = this.todos.find((task) => task.date === id);
      return task;
    },
    addTask(data:Task) {
      this.todos.push(data);
      this.refreshTasks();
    },
    deleteTask(id:number) {
      this.todos = this.todos.filter((task) => task.date !== id);
      this.refreshTasks();
    },
    editTask(id: number, data: Task) {
      const index = this.todos.findIndex((task) => task.date === id);
      if (index !== -1) {
        this.todos[index] = { ...this.todos[index], ...data };
        this.refreshTasks();
      }
    }
  },
persist:{
  omit:['openedModal',"editingTaskId"],
  storage: localStorage,
}
})