<script setup lang="ts">

const links = [
  {
    iconName: 'material-symbols:home',
    path: '/',
    name: 'Inicio',
  },
  {
    iconName: 'material-symbols:nest-clock-farsight-analog-outline-rounded',
    path: '/dashboard',
    name: 'Dashboard',
  },
  {
    iconName: 'gridicons:stats',
    path: '/info',
    name: 'Info',
  },
  {
    iconName: 'iconoir:profile-circle',
    path: '/perfil',
    name: 'Perfil',

  },
]
</script>

<template>
  <div
    class="flex lg:flex-col items-center justify-center h-full space-x-4 lg:space-x-0 lg:space-y-4 py-2 lg:py-4 lg:rouded-xl"
  >
    <router-link
      v-for="link in links"
      :key="link.name"
      :to="link.path"
      class="group"
    >
      <div
        :class="
          $route.path === link.path
            ? 'transform -translate-y-8 lg:-translate-y-0 lg:translate-x-8 duration-300 w-36'
            : 'opacity-50 border-2 border-blue-500 duration-300 w-10'
        "
        class="flex justify-center items-center h-10 lg:w-14 lg:h-14 rounded-xl bg-secondary text-primary transform shadow-xl"
      >
        <Icon :name="link.iconName" class="w-6 h-6" />
        <span v-show="$route.path === link.path" class="ml-2 md:hidden">
          {{ link.name }}
        </span>
      </div>
    </router-link>
  </div>
</template>
