<script setup lang="ts">

</script>

<template>
  <button data-cy="primaryBtn" class="primaryBtn">
    <span>
      <slot />
    </span>
  </button>
</template>

<style lang="postcss">
.primaryBtn {
  @apply font-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 focus:ring-offset-white dark:focus:ring-offset-black text-sm px-4 py-2 relative text-white gradient-border-2 border-gradient-br-gradient-gray-900 hover:border-gradient-br-gradient-black before:absolute before:transition before:duration-200 before:rounded-lg before:opacity-0 hover:before:opacity-75 before:-inset-0.5 before:bg-gradient-to-r before:from-green-400 before:via-teal-400 before:to-teal-600 before:blur-md before:z-[-1] inline-flex items-center rounded-lg focus-visible:ring-2
}
</style>
