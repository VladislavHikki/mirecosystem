<template>
  <div class="services_all">
    <h2 class="page-subtitle">Все сервисы ({{get_count_services()}})</h2>
    <div class="services_all_container">
      <div class="services_all_type" v-for="services_type in servicesStore.services">
        <h2 class="page-subtitle">{{ services_type?.label }} ({{ services_type.services?.length }})</h2>
        <div class="services_all_type_content">
          <template v-if="services_type.services?.length">
            <CardsService v-for="service in services_type.services" :info="service" />
          </template>
          <h2 v-else class="page-subtitle">Нет сервисов</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useServicesStore } from '~/store/services';

const servicesStore = useServicesStore();

await servicesStore.requestServicesWithType(1);

const get_count_services = () => {
  let arr;
  if (arr = servicesStore.services?.map(item=>item?.serviceCount)?.reduce((a,b)=>a+b, 0))
    return arr;
  else return 0;
}
</script>

<style lang="scss" scoped>
.services_all {
    &_container {
        padding-top: 32px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    &_type_content {
        padding-top: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fill, 200px);
        gap: 20px;
        row-gap: 60px;
    } 
}
</style>
