import { useUserStore } from '@/store/user';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (to.name?.includes('admin') || to?.path == "/profile/blog") {
    if (useCookie('l').value) {
      const userStore = useUserStore();
      await userStore.check(useCookie('l').value);
      if (!userStore.isAuthorized) {
        return navigateTo('/auth');
      }
      if (!checkRoles(userStore?.user?.roles, 1)) {
        return navigateTo('/');
      }
    } else {
      return navigateTo('/auth');
    }
  }

  // if (to.name.includes('admin')) {
  //     // await userStore.check(useCookie('l').value)
  //     if (!userStore.isAuthorized) {
  //         return navigateTo('/auth')
  //     }
  // }
});
