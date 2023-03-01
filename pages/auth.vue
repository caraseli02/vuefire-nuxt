<script setup lang="ts">
import { ref } from 'vue'
// PINIA import
import { useAuthStore } from '~/stores/AuthStore'
import type { IForm } from '~/stores/AuthStore'
//GSAP
import { gsap } from 'gsap'
const tl = gsap.timeline();

const useGSAP = () => {
  tl.to(".form", { display:"block", duration: 0.5, ease: "power3.inOut" });
  tl.from(".formkit-outer", { opacity: 0, y: 30, stagger: 0.3 });
  tl.from(".authproviders", { opacity: 0, scale: 0.5 });
 }

onMounted(() => {
  useGSAP()
})

const openSignUp = () => {
  registrationMode.value = !registrationMode.value
  tl.from(".form", { opacity: '0', x: 50, duration: 0.8, ease: "power3.inOut" });
}

// PINIA Stores
const { signInWithEmailAndPassword, createUserWithEmailAndPassword, } = useAuthStore()
const auth = useFirebaseAuth()! // only exists on client side
const submitted = ref(false)
const registrationMode = ref(false)
const submitHandler = async (userCredential: IForm) => {
  // Let's pretend this is an ajax request:
  submitted.value = true
  if (userCredential.password_confirm && userCredential.name) {
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
  <div class="form hidden h-screen  flex-col justify-start items-start mt-24">
    <div class="w-full flex justify-between items-center mb-4 ">
      <h1 class="inline-block text-2xl sm:text-3xl font-extrabold text-primary tracking-tight dark:text-slate-200">
        {{ registrationMode ? $t('signUp') : $t('enter') }}</h1>
      <button class="text-accent underlin underline-offset-4" @click="openSignUp">Go to
        {{ registrationMode ? $t('enter') : $t('signUp')  }}</button>
    </div>
    <FormKit type="form" id="registration-example" :form-class="submitted ? 'hide' : 'show'" submit-label="Register"
      @submit="submitHandler" :actions="false">
      <FormKit type="text" name="name" :label="$t('yourName')" prefix-icon="name" placeholder="Jane Doe"
        :help="$t('nameHelp')" validation="required" class="test" v-if="registrationMode" />
      <FormKit type="text" name="email" prefix-icon="email" :label="$t('yourEmail')" placeholder="jane@example.com"
        :help="registrationMode ? $t('emailHelp') : ''" validation="required|email" />
      <FormKit type="password" name="password" :label="$t('yourPassword')" prefix-icon="password"
        validation="required|length:6|matches:/[^a-zA-Z]/" :validation-messages="{
          matches: 'Please include at least one symbol',
        }" :placeholder="$t('password')" :help="registrationMode ? $t('passwordHelp') : ''" />
      <FormKit type="password" name="password_confirm" :label="$t('confirmPassword')" prefix-icon="password"
        :placeholder="$t('confirmPassword')" validation="required|confirm" :help="$t('confirmPasswordHelp')"
        v-if="registrationMode" />
      <FormKit outer-class="primaryBtn w-full flex justify-center" type="submit" :label="registrationMode ? $t('signUp') : $t('enter')" />
    </FormKit>
    <AuthProvider class="authproviders" :show-movil-sign-in="showMovilSignIn" @toggleMovilSignIn="showMovilSignIn = !showMovilSignIn" />
  </div>
</template>

<style scoped lang="postcss">
.form :deep(.formkit-form) {
  @apply w-full bg-primary rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl
}

.form :deep(.formkit-outer) {
  @apply mb-2 mt-4
}

.form :deep(.formkit-inner) {
  @apply flex items-center border border-slate-300 rounded-lg overflow-hidden relative
}

.form :deep(.formkit-label) {
  @apply block mb-2 font-medium text-primary
}

.form :deep(.formkit-input) {
  @apply text-slate-400 text-sm block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 outline-none pr-9
}

.form :deep(button.formkit-input) {
  background-color: transparent !important;
  padding: 2px !important;
}

.form :deep(.formkit-messages) {
  @apply text-white
}

.form :deep(.formkit-help) {
  @apply mt-2 text-secondary
}

.form :deep(.formkit-icon svg) {
  @apply w-4 absolute right-3 bottom-3
}
</style>
