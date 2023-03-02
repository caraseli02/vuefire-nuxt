<script setup lang="ts">
import { useAlertsStore } from '~/stores/AlertsStore'
const alerts = useAlertsStore()
</script>

<template>
  <div class="fixed flex flex-col bottom-4 right-4">
    <TransitionGroup name="alerts">
      <div v-for="alert in alerts.items" :key="alert.id"
        class="flex items-center relative p-4 mb-4 ml-4 mr-2 text-sm text-primary border border-blue-300 rounded-lg bg-secondary  dark:border-blue-800"
        :class="alert.style"
        role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Info</span>
        <p>
          {{ alert.message }}
        </p>
        <div class="w-[20px] flex h-full justify-center items-center">
          <button class="absolute -right-4 -top-4 bg-primary rounded-full" @click="alerts.remove(alert.id)">
            <Icon name="prime:times-circle" class="h-8 w-8" />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="postcss">
.alerts-enter-active,
.alerts-leave-active {
  transition: all 0.5s ease;
}

.alerts-enter-from,
.alerts-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.success{
  @apply border-green-300 dark:border-green-800 border-2

}

.error{
  @apply border-red-300 dark:border-red-800 border-2

}

.warning{
  @apply border-yellow-300 dark:border-yellow-800 border-2
}

.info{
  @apply border-blue-300 dark:border-blue-800 border-2
}
</style>
