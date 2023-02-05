<script setup lang="ts">
import { useCurrentUser } from 'vuefire'
//const user = useCurrentUser()
const user = {}
</script>

<template>
  <div class="w-screen box-border">
    <nav-header />
    <AppSidebar />
    <main class="max-w-md mx-auto px-4" :class="{ 'lg:pl-24': user }">
      <NuxtPage />
    </main>
    <!-- <Footer /> -->
    <section
      v-if="user"
      class="glass-blue fixed bottom-0 w-full rounded-none rounded-t-lg lg:w-20 lg:h-full lg:rounded-r-lg lg:rounded-t-none"
    >
      <nav-body />
    </section>
    <TheAlerts />
  </div>
</template>

