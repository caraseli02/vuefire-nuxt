<script setup lang="ts">
const user = useCurrentUser()
const router = useRouter()
const route = useRoute()

// we don't need this watcher on server
onMounted(() => {
  watch(user, (user, prevUser) => {
    if (prevUser && !user) {
      // user logged out
      router.push('/auth')
    } else if (user) {
      if (typeof route.query.redirect === 'string') {
        return router.push(route.query.redirect)
      }
      router.push('/')
    }
  })
})
</script>

<template>
  <div class="w-screen box-border">
    <nav-header />
    <AppSidebar />
    <main class="max-w-md mx-auto px-4 pt-12" :class="{ 'lg:pl-24': user }">
      <NuxtPage />
    </main>
    <!-- <Footer /> -->
    <section v-if="user"
      class="glass-blue fixed bottom-0 w-full rounded-none rounded-t-lg lg:w-20 lg:h-full lg:rounded-r-lg lg:rounded-t-none">
      <nav-body />
    </section>
    <TheAlerts />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,700;1,100;1,400&display=swap");

* {
  font-family: "Poppins";
}

html {
  background: radial-gradient(circle at top left, #dad4cd 0%, #00c6fb 20%, #005bea 100%);
  width: 100%;
  height: 100%;
}

.dark {
  background: radial-gradient(circle at top right, #002552 0%, #060505 20%, #0f172a 100%);
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
