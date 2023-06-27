<template>
  <div class="px-20 py-10">
    <div class="flex justify-between">
      <h1 class="text-xl font-bold pb-10">All tasks</h1>
      <input type="search" placeholder="Find tasks" class="self-end text-[10px] border border-0 border-b" v-model="filter" />
    </div>

    <ul>
      <li v-for="item in filteredTasks" :key="item.id" class="flex border-b border-black/[.05] py-3"
        v-if="filteredTasks.length > 0">
        <div class="w-8/12">
          <input type="checkbox" :id="`item-${item.id}`" class="mr-2">
          <label :for="`item-${item.id}`" class="break-words">{{ item.title }}</label>
          <p class="pl-[25px] text-[10px] break-words">{{ item.description }}</p>
        </div>
        <div class="w-2/12 self-center align-right float-right flex h-5 gap-5">
          <img @click="showEdit(item)" class="opacity-20 hover:opacity-100" src="../components/icons/edit.png" />
          
          <!--EDIT-->
          <div class="fixed z-10 inset-0 w-100 bg-[rgb(0,0,0,0.6)] place-content-center"
            v-if="editActive && item === selectedItem">
            <div
              class="bg-white max-w-[800px] fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] textarea w-full fields border-2 p-2 rounded-md">
              <input class="w-full font-semibold" type="text" v-model="editedItem.title">
              <textarea class="description w-full mt-2 text-xs" type="text" v-model="editedItem.description"></textarea>
              <select class="bg-transparent border border-2 p-1 rounded text-black/[.5]" v-model="editedItem.category">
                <option value="" disabled selected>Select category</option>
                <option>Personal</option>
                <option>Work</option>
              </select>
              <div class="flex float-right gap-3 font-bold pt-2 ">
                <button
                  class="float-right bg-theme-red text-white px-4 py-2  rounded opacity-50 hover:opacity-100 linear duration-200"
                  @click="editItem(editedItem)"> salvar</button>
                <button
                  class="float-right bg-black/[.13] px-4 py-2 rounded opacity-50 hover:opacity-100 linear duration-200"
                  @click="cancelEdit"> Cancelar</button>
              </div>
            </div>
          </div>

          <!--DELETE-->
          <img @click="deleteItem(item)" class="opacity-20 hover:opacity-100" src="../components/icons/delete.png" />
        </div>
        <div class="w-2/12 self-center align-right">
          <p class="float-right w-24 text-right text-black/[.5] text-xs">{{ item.category }}</p>
        </div>
      </li>
      <div v-else>
        <h3 class="font-bold text-[13px]">
          No tasks 😔
        </h3>
      </div>
    </ul>
    <!--ADD-->
    <div class="pt-5 flex">
      <button @click="showDialog" class="flex" v-show='btnActive'>
        <span class="text-xl text-theme-red/[.5]">&#65291;</span>
        <span class="text-black/[0.4] self-center ml-1">Add task</span>
      </button>
      <div class="textarea w-full " v-if="isActive">
        <div class="fields border-2 p-2 rounded-md">
          <input class="w-full font-semibold" type="text" placeholder="Task name" v-model="title" />
          <textarea class="description w-full mt-2 text-xs" placeholder="Descrição" v-model="description"></textarea>
          <select class="bg-transparent border border-2 np-1 rounded text-black/[.5]" v-model="category">
            <option value="" disabled selected>Select category</option>
            <option>Personal</option>
            <option>Work</option>
          </select>
        </div>
        <div class="flex gap-3 font-bold pt-2 ">
          <button class="float-right bg-black/[.13] px-4 py-2 rounded opacity-50 hover:opacity-100 linear duration-200"
            @click="cancelItem">Cancel</button>
          <button
            class="float-right bg-theme-red text-white px-4 py-2 rounded opacity-50 hover:opacity-100 linear duration-200"
            @click="addItem">Add task</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { useChecklistStore } from '../stores/store.js'
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({

  setup() {
    const checklistStore = useChecklistStore()
    const title = ref('')
    const description = ref('')
    const category = ref('')
    var btnActive = ref(true)
    var isActive = ref(false)
    var editActive = ref(false)
    const selectedItem = ref(null)
    const editedItem = ref({
      title: '',
      description: '',
      category: ''
    })
    const filter = ref('')


    //Funções CRUD
    function addItem() {
      if (this.title && this.description && this.category) {
        checklistStore.addItem({
          id: checklistStore.checklist.length + 1,
          title: this.title,
          description: this.description,
          category: this.category
        })
        this.title = ''
        this.description = ''
        this.category = ''
        this.isActive = false
        this.btnActive = true

        const selectedItemIndex = ref(-1);



      } else {
        alert('Please, fill in all fields')
      }
    }

    function deleteItem(item) {
      if (confirm('Deseja realmente excluir nota?')) {
        checklistStore.deleteItem(item)
      }
    }

    function editItem(item) {
      checklistStore.editItem(editedItem.value);
      editActive.value = false
      editedItem.value = null
    }


    //Funções componentes
    const filteredTasks = computed(()=>{
      const word = filter.value.toLowerCase().trim();
      if(word === ''){
        return checklistStore.checklist;
      }else{
        return checklistStore.checklist.filter(item => item.title.toLowerCase().includes(word))
      }
    })
    function showDialog() {
      this.btnActive = false;
      this.isActive = true;
    }
    function cancelItem() {
      this.title = ''
      this.description = ''
      this.category = ''
      this.isActive = false
      this.btnActive = true
    }
    function showEdit(item) {
      editedItem.value = { ...item };
      selectedItem.value = item;
      this.editActive = true
    }
    function cancelEdit() {
      this.editActive = false;
    }


    return {
      checklist: checklistStore.checklist,
      addItem,
      title: '',
      description: '',
      category: '',
      isActive,
      deleteItem,
      btnActive,
      showDialog,
      cancelItem,
      selectedItem,
      editActive,
      editItem,
      editedItem,
      showEdit,
      cancelEdit,
      filteredTasks,
      filter

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

select {
  -webkit-appearance: none;
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