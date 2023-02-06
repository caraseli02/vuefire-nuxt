
export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser()
  
  if (!user) {
    return navigateTo('/auth')
  }
  return navigateTo('/')
})
