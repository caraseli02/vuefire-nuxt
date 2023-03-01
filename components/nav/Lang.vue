<template>
  <Listbox v-model="locale">
    <div class="relative mr-4">
      <ListboxButton class="w-32">
        <BtnPrimary>
          <Icon name="material-symbols:translate" class="h-5 w-5" />
        </BtnPrimary>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="lang in langs"
            :key="lang.id"
            :value="lang.id"
            as="template"
          >
            <li
              :class="[
                active ? 'opacity-100 text-accent' : 'text-primary opacity-75',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
                >{{ lang.label }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600"
              >
                <Icon name="material-symbols:check" class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);

const smAndLarger = breakpoints.smallerOrEqual("sm"); // sm and larger

const { locale } = useI18n();

const langs = [
  { id: "en", label: "English" },
  { id: "es", label: "Español" },
];

const getLoacaleLabel = computed(
  () => langs.find((lang) => lang.id === locale.value)?.label
);
</script>

<style lang="postcss">
.listBtn {
  @apply relative block disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none text-left cursor-default text-xs px-1.5 py-3 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 bg-transparent text-primary border border-primary rounded-lg shadow-sm focus:ring-offset-white dark:focus:ring-offset-black font-semibold mr-7;
}
</style>
