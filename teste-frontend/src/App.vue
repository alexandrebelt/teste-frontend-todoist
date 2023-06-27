
<template>
  <header>
    <div class="wrapper bg-theme-red text-white w-full px-10">

      <nav class="flex">
        <div class="w-1/2 flex gap-x-5">
          <button @click="showMenu">
          <div  id="menu-btn" class=" cursor-pointer h-6 w-4 flex flex-wrap content-center gap-1.5">
            <span class="h-px w-full bg-white"></span>
            <span class="h-px w-full bg-white"></span>
            <span class="h-px w-full bg-white"></span>
          </div>
        </button>
          <RouterLink class="self-center" to="/">
            <img class="h-5 invert-[.99]" src="./components/icons/botao-de-inicio.png" />
          </RouterLink>
          <input type="search" placeholder="Search"
            class="bg-white/[.4] bg-search-icon bg-[length:20px] bg-[0.4rem] bg-left bg-no-repeat rounded px-2 pl-8 placeholder-white" />

        </div>
        <div class="w-1/2 text-right">

          <div class="flex float-right gap-x-5 invert-[.99]">
            <RouterLink to="/about">
              <img class="h-5" src="./components/icons/sinal-de-interrogacao.png" />
            </RouterLink>
            <img class="h-5" src="./components/icons/packard-bell.png" />
          </div>
        </div>
      </nav>
    </div>
  </header>
  <div class="flex">
    <div :class="{ slide: isMenuVisible }" id="side-menu" class="bg-[#f6f6f6] h-[100vh]">
        <div class="p-10">
          <ul>
            <li>Links 1</li>
            <li>Links 2</li>
            <li>Links 3</li>
            <li>Links 4</li>
          </ul>
        </div>
    </div>
    <RouterView class="mainView w-[100%]"/>
  </div>
</template>


<script>

import { RouterLink, RouterView } from 'vue-router'
import {ref} from 'vue'

export default {
  setup() {
    const isMenuVisible = ref(false)
    
    function showMenu() {
      if(isMenuVisible.value == false){
        isMenuVisible.value = true;
      }else{
        isMenuVisible.value = false;
      }
    }
    return{
      showMenu,
      isMenuVisible
    }
  }
}
</script> 
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  font-weight: 300;
  text-align: center;

  margin-left: 0px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  
}
nav {
    text-align: left;
    font-size: 14px;
    padding: 1rem 0;

  }

#side-menu {
  transform: translateX(-100%);
  width: 0;
  transition: .2s;
  opacity: 0;
}

.slide {
  transform: translateX(0%) !important;
  width: 300px !important;
  opacity: 1 !important;
}
</style>
