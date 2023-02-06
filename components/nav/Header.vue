<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
// PINIA
import { useSidebarStore } from '~/stores/SidebarStore'

// Router
const router = useRouter()

const sidebarStore = useSidebarStore()

// access an state/getters from the store
const auth = useFirebaseAuth()
const user = useCurrentUser()

// access an action/mutations from the store
const toggleSidebar = () => sidebarStore.toggleSidebar()

const closeSession = async () => {
  await auth?.signOut().then(() => {
    router.push({ name: 'auth' })
  })
}

// store.dispatch("attendance/fetchAllAttends")
// store.dispatch("users/fetchAllUsers");
</script>

<template>
  <header
    :class="user ? 'justify-between' : 'justify-end'"
    class="flex p-2 z-10 absolute top-0"
  >
    <!-- PROFILE ICON FOR OPEN/CLOSE SIDEBAR -->
    <div
      data-cy="sidebarBtn"
      class="flex items-center"
      @click="toggleSidebar"
    >
      <BtnPrimary v-if="user" id="sidebarBtn" aria-label="Open Menu">
        <Icon name="ic:outline-menu" class="w-5 h-5 text-primary" />
      </BtnPrimary>
    </div>
    <NavThemeToggler
     />
    <div class="flex justify-end items-center">

      <BtnPrimary v-if="user" id="btnLogout" @click.prevent="closeSession">
        <Icon name="material-symbols:logout" class="w-5 h-5" />
      </BtnPrimary>
    </div>

  </header>
</template>
