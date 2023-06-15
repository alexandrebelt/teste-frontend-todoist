<script setup lang="ts">
import type { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

// const btn = document.getElementById('menu-btn');
//   const side = document.getElementById('side-menu');
//   btn?.addEventListener('click', () => {
//     side?.classList.add('slide')
//   })
</script>

<template>
  <header>

    <div class="wrapper bg-theme-red text-white w-full px-10">

      <nav class="flex">
        <div class="w-1/2 flex gap-x-5">
          <div id="menu-btn" class=" cursor-pointer h-6 w-4 flex flex-wrap content-center gap-1.5">
            <span class="h-px w-full bg-white"></span>
            <span class="h-px w-full bg-white"></span>
            <span class="h-px w-full bg-white"></span>
          </div>
          <RouterLink class="self-center" to="/">
            <img class="h-5 invert-[.99]" src="./components/icons/botao-de-inicio.png" />
          </RouterLink>
          <input type="search" placeholder="Search" class="bg-white/[.4] bg-search-icon bg-[length:20px] bg-[0.4rem] bg-left bg-no-repeat rounded px-2 pl-8 placeholder-white" />

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
    <div id="side-menu" class="bg-slate-200 fixed mt-">
      Tsteetsetes
    </div>

  </header>

  <RouterView />
</template>


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

  nav {
    text-align: left;
    font-size: 14pxrem;
    padding: 1rem 0;

  }
}

#side-menu {
  transform: translateX(-90%);
  transition: .2s;
}

.slide {
  transform: translateX(0%) !important;
}
</style>
