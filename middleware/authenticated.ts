
export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser()
  console.log(user);

  if (
    user.value
  ) {
    return;
  }

  return navigateTo(`/auth?redirectTo=${to.path}`);
})
