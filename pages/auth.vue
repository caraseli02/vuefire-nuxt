<script setup lang="ts">

import { ref } from 'vue'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = useFirebaseAuth()! // only exists on client side
const submitted = ref(false)
const registrationMode = ref(false)
const submitHandler = async ({email, password}) => {
  // Let's pretend this is an ajax request:
  submitted.value = true
  console.log(email, password);
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
</script>

<template>
  <div class="form h-screen flex flex-col justify-start items-start mt-24">
  <div class="w-full flex justify-between items-center mb-4 ">
    <h1 class="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">{{registrationMode ? 'Register' : 'Login'}}</h1>
    <button class="text-blue-600 hover:underline dark:text-blue-500" @click="registrationMode = !registrationMode" >Go to {{registrationMode ? 'Login' : 'Registration' }}</button>
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
      placeholder="Jane Doe"
      help="What do people call you?"
      validation="required"
      class="test"
      v-if="registrationMode"
    />
    <FormKit
      type="text"
      name="email"
      label="Your email"
      placeholder="jane@example.com"
      :help="registrationMode ? 'What email should we use?' : ''"
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
        :help="registrationMode ? 'Choose a password?' : ''"
      />
      <FormKit
        type="password"
        name="password_confirm"
        label="Confirm password"
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
  <div v-if="submitted">
    <h2>Submission successful!</h2>
  </div>
</div>
</template>

<style scoped lang="postcss">
.form :deep(.formkit-form){
  @apply w-full bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl
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
  @apply mt-10 text-slate-700 text-xl font-bold
}
.form :deep(.formkit-messages ){
    @apply text-white
}
.form :deep(.formkit-help ){
    @apply mt-2 text-slate-500
}
</style>
