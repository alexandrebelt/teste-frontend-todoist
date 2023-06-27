import { defineStore } from "pinia"


export const useChecklistStore = defineStore({
    id: 'tasks',
    state: () => ({
        checklist: JSON.parse(localStorage.getItem('tasks')) || [],
    }),

    getters: {
        getItens() {
            return this.checklist;
        }
    },

    actions: {
        addItem(item) {
            this.checklist.push(item);
            localStorage.setItem("tasks", JSON.stringify(this.checklist))
        },

        deleteItem(item) {
            const task = this.checklist.indexOf(item)
            this.checklist.splice(task, 1)
            localStorage.setItem("tasks", JSON.stringify(this.checklist))
        },

        editItem(editedItem) {
            const index = this.checklist.findIndex(item => item.id === editedItem.id)
            console.log(index)
            this.checklist[index] = editedItem
            localStorage.setItem("tasks", JSON.stringify(this.checklist))
        }
    },

    watch: {
        checklist() {
            localStorage.setItem('tasks', JSON.stringify(this.checklist))
        }
    }

})