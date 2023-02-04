<script setup lang="ts">
import PrimaryBtn from '~/components/buttons/PrimaryBtn.vue'
const user = useCurrentUser()

const links = [
  {
    text: 'Fichar',
    path: '/dashboard',
    iconName:'material-symbols:nest-clock-farsight-analog-outline-rounded',

  },
  {
    text: 'Asistencia',
    path: '/info',
    iconName: 'gridicons:stats',
  },
  {
    text: 'Mi perfil',
    path: '/perfil',
    iconName: 'iconoir:profile-circle',
  },
]
</script>

<template>
  <article class="max-h-screen flex flex-col justify-aroud items-center mt-8">
    <h1 v-if="user?.displayName" class="text-center mb-4 font-bold text-primary text-2xl">
      Hello {{ user?.displayName  }}
    </h1>
    <section data-cy="homeBtns">
      <router-link
        v-for="(link, index) in links"
        :key="index"
        :data-cy="link.text"
        :to="link.path"
        class="flex flex-col"
      >
        <PrimaryBtn class="mb-4">
          <span class="flex justify-center items-center w-32 text-xl">{{
            link.text
          }}</span>
          <Icon :name="link.iconName" class="w-10 h-10 ml-4" />
        </PrimaryBtn>
      </router-link>
    </section>
  </article>
</template>
