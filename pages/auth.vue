<script setup>
import { ref } from 'vue'
const submitted = ref(false)
const submitHandler = async () => {
  // Let's pretend this is an ajax request:
  await new Promise((r) => setTimeout(r, 1000))
  submitted.value = true
}
</script>

<template>
  <div class="form h-screen flex justify-center items-center">
  <FormKit
    type="form"
    id="registration-example"
    :form-class="submitted ? 'hide' : 'show'"
    submit-label="Register"
    @submit="submitHandler"
    :actions="false"
    #default="{ value }"
  >
    <h1 class="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">Register!</h1>
    <FormKit
      type="text"
      name="name"
      label="Your name"
      placeholder="Jane Doe"
      help="What do people call you?"
      validation="required"
      class="test"
    />
    <FormKit
      type="text"
      name="email"
      label="Your email"
      placeholder="jane@example.com"
      help="What email should we use?"
      validation="required|email"
    />
      <FormKit
        type="password"
        name="password"
        label="Password"
        validation="required|length:6|matches:/[^a-zA-Z]/"
        :validation-messages="{
          matches: 'Please include at least one symbol',
        }"
        placeholder="Your password"
        help="Choose a password"
      />
      <FormKit
        type="password"
        name="password_confirm"
        label="Confirm password"
        placeholder="Confirm password"
        validation="required|confirm"
        help="Confirm your password"
      />

    <FormKit
      type="submit"
      label="Register"
    />
  </FormKit>
  <div v-if="submitted">
    <h2>Submission successful!</h2>
  </div>
</div>
</template>

<style scoped lang="postcss">
.form :deep(.formkit-form){
  @apply w-full h-[80vh] bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl
}
.form :deep(.formkit-outer){
  @apply mb-2 mt-4
}
.form :deep(.formkit-label){
    @apply block mb-2 font-medium text-white
}
.form :deep(.formkit-input){
    @apply bg-slate-50 border border-slate-300 text-slate-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
}
.form :deep(button.formkit-input){
  @apply mt-10 text-white
}
.form :deep(.formkit-messages ){
    @apply text-white
}
.form :deep(.formkit-help ){
    @apply mt-2 text-slate-500
}
</style>
