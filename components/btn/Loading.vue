<script setup lang="ts">

defineProps<{
  loading: boolean
}>()
</script>

<template>
  <BtnPrimary class="mt-4">
    <button
      id="loginBtn"
      type="submit"
      class="w-40 flex justify-center"
    >
      <slot />
      <Icon 
        :name="loading ? 'tabler:loader-3' : 'material-symbols:arrow-circle-right-outline-rounded'" 
        :class="[{'animate-spin' : loading}, 'ml-4 h-5 w-5 text-white']" 
      />
    </button>
  </BtnPrimary>
</template>
