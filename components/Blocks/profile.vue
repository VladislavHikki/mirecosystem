<template>
  <div class="personalArea" v-if="props?.data?.user">
    <NuxtLink :to="`/profile/${data?.user?.id}`">
      <div class="avatar_container">
        <BlocksUserAvatar
          size="default"
          :status="data?.user?.status"
          :img="data?.user?.avatar"
          :roleId="checkRoles(data?.user.roles, 2)"
        />
      </div>
    </NuxtLink>
    <div class="userInfo">
      <div class="userName">{{ props?.data?.user?.name }}</div>
      <div class="userLocation">
        <img loading="lazy" src="~/assets/images/location.svg" />{{
          props?.data?.user?.city?.region?.country?.label ? `${props?.data?.user?.city?.region?.country?.label},` : ''
        }}
        {{ checkRegion(props?.data?.user?.city?.region?.label, props?.data?.user?.city?.label) }}
      </div>
      <div class="data">
        <img loading="lazy" src="~/assets/images/calendar.svg" />{{
          props?.data?.user?.createdAt ? new Date(props?.data?.user?.createdAt).toLocaleDateString() : ''
        }}
      </div>

      <Button
        v-if="userStore.user?.id != null && userStore.user?.id != props?.data?.user?.id"
        @click="navigate_to_chat"
        class="profile_connect_button"
        >Связаться</Button
      >
    </div>
    <div class="cpds">
      <div class="cpd">
        <span class="text_ucpd">{{ data?.user?.ucpd }}%</span>
        <img height="30" src="../../assets/images/ucpd.png" />
      </div>
      <div class="cpd">
        <span class="text_cpd">{{ data?.user?.cpd }}%</span>
        <img height="30" src="../../assets/images/cpd.png" />
      </div>
    </div>
  </div>
  <div class="personalArea" v-else>
    <NuxtLink class="avatar_container" :to="`/profile/${data?.id}`">
      <BlocksUserAvatar
        size="default"
        :status="data?.status"
        :img="data?.avatar"
        :roleId="data?.roleId"
      />
    </NuxtLink>
    <div class="userInfo">
      <NuxtLink :to="`/profile/${data?.id}`">
        <div class="userName">{{ props?.data?.name }}</div>
      </NuxtLink>
      <div class="userLocation"><img loading="lazy" src="~/assets/images/location.svg" />{{ props?.data?.label }}</div>
      <div class="data">
        <img loading="lazy" src="~/assets/images/calendar.svg" />{{
          props?.data?.createdAt ? new Date(props?.data?.createdAt).toLocaleDateString() : ''
        }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useChatsStore } from '~/store/chats';
import url from '~/store/config';
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
const chatStore = useChatsStore();

const props = defineProps(['data']);

const navigate_to_chat = async () => {
  let user_info = props.data.user;
  let chat = await chatStore.getChatByProfile(user_info?.id);

  if (!chat?.chatId) {
    let data = new FormData();
    data.append('ids', user_info?.id);
    await chatStore.createChat(data);
    chat = await chatStore.getChatByProfile(user_info?.id);
  }
  chatStore.selected_chat.id = chat?.chatId;
  chatStore.selected_chat.user_info = {
    avatar: user_info?.avatar,
    status: user_info?.status,
    roleId: checkRoles(user_info?.roles, 2),
    name: user_info?.name,
    userId: user_info?.id,
    is_new_chat: false,
  };

  navigateTo('/profile/chat');
};
</script>

<style lang="scss">
.personalArea {
  display: flex;
  justify-content: flex-start;
  // align-items: center;
  gap: 35px;
  background: #0089cf;
  color: white;
  padding: 19px 15px;
  font-size: 20px;
  @media screen and (max-width: $x-small) {
    flex-direction: column;
    height: auto;
    align-items: flex-start;
  }
  .cpds {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 7px;
    .cpd {
      display: flex;
      gap: 7px;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .avatar {
    border: none;
  }
  .userInfo {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    gap: 10px;
    & > a > .userName {
      color: white;
    }
    .userLocation,
    .data {
      display: flex;
      gap: 15px;
      flex-wrap: nowrap;
    }
    .profile_connect_button {
      width: fit-content;
      padding: 5px 10px;
      color: white;
      box-shadow: none !important;
      background: #18af10;
      border-radius: 7px;
      font-size: 16px;
    }
  }
}
</style>
