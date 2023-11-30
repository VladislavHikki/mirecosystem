<template>
  <div>
    <Dropdown
          filter
          empty-filter-message="Нет результатов"
          :options="getSortWhereLabel(userListStore?.users)"
          optionLabel="label"
          placeholder="Пользователи"
        />
        <Dropdown
          filter
          empty-filter-message="Нет результатов"
          :options="getSortWhereLabel(userListStore?.users)"
          optionLabel="label"
          placeholder="Выбрать роль"
        />
  </div>
</template>

<script setup>
import { getSortWhereLabel } from '@/store/sort';
import { useUserStore } from '~~/store/user';

const userListStore = useUserStore();
await userListStore.requestUserList();

</script>

<style lang="scss">

</style>