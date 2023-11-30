import { useUserStore } from '@/store/user';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const path = /^\/profile(?!\/\d+)/;
  if (to.name?.includes('profile') && to.name !== 'profile-id' && path.test(to.fullPath)) {
    if (useCookie('l').value) {
      const userStore = useUserStore();
      await userStore.check(useCookie('l').value);
      if (!userStore.isAuthorized) {
        return navigateTo('/auth');
      }
    } else {
      return navigateTo('/auth');
    }
  }
});
