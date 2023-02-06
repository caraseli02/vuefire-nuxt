<script setup lang="ts">
import { useColorMode, useCycleList } from "@vueuse/core";

const mode = useColorMode({
  emitAuto: true,
});
const { next } = useCycleList(["dark", "light", "auto"], {
  initialValue: mode,
});
</script>

<template>
  <BtnPrimary
    :color="mode === 'dark' ? 'purpleBlue' : 'redYellow'"
    @click="next()"
  >
    <TransitionGroup name="slide-fade" mode="out-in">
      <Icon
        name="ph:moon-stars"
        key="dark"
        v-if="mode === 'dark'"
        class="h-5 w-5 MoonIcon"
      />
      <Icon
        name="ph:sun-light"
        key="light"
        v-if="mode === 'light'"
        class="h-5 w-5 SunIcon"
      />
      <Icon
        name="material-symbols:desktop-mac-outline"
        key="auto"
        v-if="mode === 'auto'"
        class="h-5 w-5 DesktopComputerIcon"
      />
    </TransitionGroup>
  </BtnPrimary>
</template>

<style></style>
