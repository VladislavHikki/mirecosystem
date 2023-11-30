<template>
  <div class="structure container">
    <h2 class="page-title">Большая игра</h2>
    <div class="structure_btns">
      <h2
        class="page-subtitle structure_btns_item"
        :class="
          tab_active?.folder == 'triads' ? 'structure_btns_item_status--active' : 'structure_btns_item_status--disabled'
        "
        @click="(tab_active.file = 'all'), (tab_active.folder = 'triads')"
      >
        Структура
      </h2>
      <h2
        class="page-subtitle structure_btns_item"
        :class="
          tab_active?.folder == 'referals' ? 'structure_btns_item_status--active' : 'structure_btns_item_status--disabled'
        "
        @click="(tab_active.file = 'top'), (tab_active.folder = 'referals')"
      >
        Рефералка
      </h2>
      <h2
        class="page-subtitle structure_btns_item"
        :class="
          tab_active?.folder == 'sponsors' ? 'structure_btns_item_status--active' : 'structure_btns_item_status--disabled'
        "
        @click="(tab_active.file = 'all'), (tab_active.folder = 'sponsors')"
      >
        Спонсоры
      </h2>
    </div>
    <current_tab_component class_name_headline="page-subtitle" />
  </div>
</template>

<script setup>
import loading from '~/components/UI/loading.vue';
let tab_active = shallowReactive({
  folder: 'triads',
  file: 'all',
});
const current_tab_component = ref(
  defineAsyncComponent({
    loader: () => import(`../../../components/Blocks/${tab_active.folder}/${tab_active.file}.vue`),
    loadingComponent: loading,
  })
);

watch(tab_active, () => {
  current_tab_component.value = defineAsyncComponent({
    loader: () => import(`../../../components/Blocks/${tab_active.folder}/${tab_active.file}.vue`),
    loadingComponent: loading,
  });
});
</script>

<style lang="scss" scoped>
.structure {
  &_btns {
    display: flex;
    gap: 12px;
    &_item {
      cursor: pointer;
      &_status {
        &--active {
          color: black;
          transition: 0.3s;
        }
        &--disabled {
          color: #019ec3;
          transition: 0.3s;
        }
      }
    }
  }
  &_triads {
    &_cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
