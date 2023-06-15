<template>
  <div class="px-20 py-10">
    <h1 class="text-xl font-bold pb-10">Today</h1>
    <ul>
      <li v-for="item in checklist" :key="item.id" class="flex border-b-2 border-black/[.05] py-3"
        v-if="checklist.length > 0">
        <div class="w-8/12">
          <input type="checkbox" :id="`item-${item.id}`" class="mr-2">
          <label :for="`item-${item.id}`" class="break-words">{{ item.text }}</label>
          <p class="pl-[25px] text-[10px] break-words">{{ item.description }}</p>
        </div>
        <div class="w-2/12 self-center align-right float-right flex h-5 gap-5">
          <img @click="editItem(item)" class="opacity-20 hover:opacity-100" src="../components/icons/edit.png" />
          <img @click="deleteItem(item)" class="opacity-20 hover:opacity-100" src="../components/icons/delete.png" />
        </div>
        <div class="w-2/12 self-center align-right">
          <p class="float-right w-24 text-right text-black/[.5] text-xs">{{ item.category }}</p>
        </div>
      </li>
      <div v-else>
        <h3 class="font-bold text-[13px]">
          No Task Today
        </h3>
      </div>
    </ul>

    <div class="pt-5 flex">
      <button @click="showDialog" class="flex" v-show='btnActive'>
        <span class="text-xl text-theme-red/[.5]">&#65291;</span>
        <span class="text-black/[0.4] self-center ml-1">Add task</span>
      </button>
      <div class="textarea w-full " v-if="isActive">
        <div class="fields border-2 p-2 rounded-md">
          <input class="w-full font-semibold" type="text" placeholder="Task name" v-model="taskName" />
          <textarea class="description w-full mt-2 text-xs" placeholder="Descrição" v-model="description"></textarea>
          <select class="bg-transparent border border-2 p-1 rounded text-black/[.5]" v-model="category">
            <option>Personal</option>
            <option>Work</option>
          </select>
        </div>
        <div class="flex gap-3 font-bold pt-2 ">
          <button class="float-right bg-black/[.13] px-4 py-2 rounded opacity-50 hover:opacity-100 linear duration-200"
            @click="cancelItem">Cancel</button>
          <button
            class="float-right bg-theme-red text-white px-4 rounded opacity-50 hover:opacity-100 linear duration-200"
            @click="addItem">Add task</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { useChecklistStore } from '../stores/store.js'
import { defineComponent, ref } from 'vue'
import NewTask from './newTask/newTask.vue'



export default defineComponent({

  components:{
    NewTask
  },

  setup() {
    const checklistStore = useChecklistStore()
    const taskName = ref('')
    const description = ref('')
    const category = ref('')
    var btnActive = ref(true)
    var isActive = ref(false)


    //Funções CRUD
    function addItem() {
      if (this.taskName && this.description && this.category) {
        checklistStore.addItem({
          id: checklistStore.checklist.length + 1,
          text: this.taskName,
          description: this.description,
          category: this.category
        })
        this.taskName = ''
        this.description = ''
        this.category = ''
        this.isActive = false
        this.btnActive = true
      } else {
        alert('Please, fill in all fields')
      }
    }

    function deleteItem(item) {
      if (confirm('Deseja realmente excluir nota?')) {
        checklistStore.deleteItem(item)
      }
    }



    //Funções componentes
    function showDialog() {
      this.btnActive = false;
      this.isActive = true;
    }
    function cancelItem() {
      this.taskName = ''
      this.description = ''
      this.category = ''
      this.isActive = false
      this.btnActive = true
    }


    return {
      checklist: checklistStore.checklist,
      addItem,
      taskName: '',
      description: '',
      category: '',
      deleteItem,
      btnActive,
      showDialog,
      cancelItem
    }
  }

})
</script>
<style>
:focus-visible {
  outline: none;
}

textarea {
  resize: none
}

img {
  transition: .2s;
}

.active {
  display: initial !important;
}

input[type="checkbox"] {
  width: 1.3em;
  height: 1.3em;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 2px solid #ddd;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  background-color: #bdbdbd;
}
</style>