import { defineStore } from "pinia"


export const useChecklistStore = defineStore({
    id: 'tasks',
    state: () => ({
        checklist: JSON.parse(localStorage.getItem('tasks')) || [],
    }),

    getters:{
        getItens(){
            return this.checklist;
        }
    },

    actions: {
        addItem(item) {
            this.checklist.push(item);
            localStorage.setItem("tasks", JSON.stringify(this.checklist))
        },

        deleteItem(item) {
            const task  = this.checklist.indexOf(item)
            this.checklist.splice(task, 1)
            localStorage.setItem("tasks", JSON.stringify(this.checklist))
        },
        editItem(item){
            const task = thie.checklist.find((task) => task.id === id)
            Object.assign(task,)
        }
    },

    watch: {
       checklist(){
        localStorage.setItem('tasks', JSON.stringify(this.checklist))
       }
    }

})