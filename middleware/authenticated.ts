export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser()
  if (!user) {
    return navigateTo({ path: '/auth', query: { redirect: to.fullPath } })
  }
})
