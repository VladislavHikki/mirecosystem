<template>
  <div class="modal__container_info">
    <div class="modal__container_avatar">
      <div>
        <NuxtLink :to="`/profile/${data.id}`"  target="_blank">
            <img
            loading="lazy"
            width="130"
            height="130"
            style="border-radius: 50%; object-fit: contain;"
            :src="`${url}/api/public${data?.avatar}`"
            alt=""
            />
        </NuxtLink>
      </div>
      <div>
        <NuxtLink  style="color: #2c96ea" :to="`/profile/${data.id}`"  target="_blank">
            {{ data.name }}
        </NuxtLink>
    </div>
      <div>{{ data.email }}</div>
    </div>
    <div class="modal_container_fullinfo">
        <div class="modal_container_full">
            <b>ID: </b>
            {{ data.id }}
        </div>
        <div class="modal_container_full">
            <b>Роллары: </b>
            {{ data.points }}
        </div>
        <div class="modal_container_full">
            <b>Лимоны: </b>
            {{ data.lemons }}
        </div>
        <div class="modal_container_full">
            <b>Счет: </b>
            {{ data.account }}
        </div>
        <div class="modal_container_full">
            <b>Создан: </b>
            {{ new Date(data.createdAt).toLocaleString() ?? '' }}
        </div>
        <div class="modal_container_fulls">
            <b>Роли:</b>
            <div v-for="role in data.roles">
                {{role.label}}
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import url from '~~/store/config';

const props = defineProps(['data']);
</script>

<style lang="scss">
.modal__container_info {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.modal__container_avatar {
  display: grid;
  justify-items: center;
  gap: 20px;
}
.modal_container_fullinfo{
    display: grid;
    gap: 15px;
}
.modal_container_fulls{
    display: grid;
    gap: 5px;
}

</style>
