<template>
  <div class="wrap-auth-reg container">
    <div class="auth">
      <div class="tab-buttons">
        <Button
          label="Вход"
          :class="{ active: route.query?.page == 'auth' || route.query?.page == null }"
          @click="setCurrentTab('auth')"
        />
        <Button :class="{ active: route.query?.page == 'reg' }" @click="setCurrentTab('reg')" label="Регистрация" />
      </div>
      <div>
        <keep-alive>
          <current_tab />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();

const current_tab = computed({
  get() {
    return route.query?.page
      ? defineAsyncComponent({
          loader: () => import(`../components/Blocks/${route.query.page}.vue`),
          timeout: 1000,
        })
      : defineAsyncComponent({
          loader: () => import(`../components/Blocks/auth.vue`),
          timeout: 1000,
        });
  },
});

function setCurrentTab(val) {
  router.push({
    path: route.path,
    query: { page: val },
  });
}
</script>
