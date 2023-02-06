<script setup lang="ts">
import { ref } from 'vue'
// PINIA import
import { useAuthStore } from '~/stores/AuthStore'
import type { IForm } from '~/stores/AuthStore'

// PINIA Stores
const {signInWithEmailAndPassword , createUserWithEmailAndPassword, } = useAuthStore()
const auth = useFirebaseAuth()! // only exists on client side
const submitted = ref(false)
const registrationMode = ref(false)
const submitHandler = async (userCredential: IForm) => {
  // Let's pretend this is an ajax request:
  submitted.value = true
  if(userCredential.password_confirm && userCredential.name) {
    await signInWithEmailAndPassword(auth, userCredential)
  }
  signInWithEmailAndPassword(auth, userCredential)
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
const showMovilSignIn = ref(false)
</script>

<template>
  <div class="form h-screen flex flex-col justify-start items-start mt-24">
  <div class="w-full flex justify-between items-center mb-4 ">
    <h1 class="inline-block text-2xl sm:text-3xl font-extrabold text-primary tracking-tight dark:text-slate-200">{{registrationMode ? 'Register' : 'Login'}}</h1>
    <button class="text-accent underlin underline-offset-4" @click="registrationMode = !registrationMode" >Go to {{registrationMode ? 'Login' : 'Registration' }}</button>
  </div>
  <FormKit
    type="form"
    id="registration-example"
    :form-class="submitted ? 'hide' : 'show'"
    submit-label="Register"
    @submit="submitHandler"
    :actions="false"
  >
    <FormKit
      type="text"
      name="name"
      label="Your name"
      prefix-icon="name"
      placeholder="Jane Doe"
      help="What do people call you?"
      validation="required"
      class="test"
      v-if="registrationMode"
    />
    <FormKit
      type="text"
      name="email"
      prefix-icon="email"
      label="Your email"
      placeholder="jane@example.com"
      :help="registrationMode ? 'What email should we use?' : ''"
      validation="required|email"
    />
      <FormKit
        type="password"
        name="password"
        label="Password"
        prefix-icon="password"
        validation="required|length:6|matches:/[^a-zA-Z]/"
        :validation-messages="{
          matches: 'Please include at least one symbol',
        }"
        placeholder="Your password"
        :help="registrationMode ? 'Choose a password?' : ''"
      />
      <FormKit
        type="password"
        name="password_confirm"
        label="Confirm password"
        prefix-icon="password"
        placeholder="Confirm password"
        validation="required|confirm"
        help="Confirm your password"
      v-if="registrationMode"

      />

    <FormKit
      type="submit"
      :label="registrationMode ? 'Create accaunt' : 'Enter'"
    />
  </FormKit>
  <AuthProvider
      :show-movil-sign-in="showMovilSignIn"
      @toggleMovilSignIn="showMovilSignIn = !showMovilSignIn"
    />
</div>
</template>

<style scoped lang="postcss">
.form :deep(.formkit-form){
  @apply w-full bg-primary rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl
}
.form :deep(.formkit-outer){
  @apply mb-2 mt-4
}
.form :deep(.formkit-inner){
  @apply flex items-center border border-slate-300 rounded-lg overflow-hidden relative
}
.form :deep(.formkit-label){
    @apply block mb-2 font-medium text-primary
}
.form :deep(.formkit-input){
    @apply text-slate-400 text-sm block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 outline-none pr-9
}
.form :deep(button.formkit-input){
  @apply btn-form
}
.form :deep(.formkit-messages ){
    @apply text-white
}
.form :deep(.formkit-help ){
    @apply mt-2 text-secondary
}
.form :deep(.formkit-icon svg){
    @apply w-4 absolute right-3 bottom-3
}
</style>
