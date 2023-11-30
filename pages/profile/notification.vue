<template>
  <div class="notification container">
    <div v-if="notificationStore.rolesNotification?.length" class="notification_roles">
      <div class="notification_card" v-for="value in notificationStore.rolesNotification">
        <div v-if="value.roleId == 1" class="notification_card_role_admin">
          {{ value.isDel ? 'Вы лишились статуса Администратора сайта' : 'Ваш статус изменен на Администратора сайта.' }}
        </div>
        <NuxtLink v-else-if="value.roleId == 2" to="/profile/teams">
          <div class="notification_card_role_admin">
            {{
              value.isDel
                ? 'Вы лишились статуса владельца'
                : 'Ваш статус изменен на владельца. Теперь Вы можете создать свою команду.'
            }}
          </div>
        </NuxtLink>
        <div v-else-if="value.roleId == 4" class="notification_card_role_admin">
          {{ value.isDel ? 'Вы лишились статуса Куратора' : 'Ваш статус изменен на Куратора.' }}
        </div>
      </div>
    </div>
    <div
      class="notification_sponsor"
      v-if="notificationStore.sponsorsNotification?.sponsor.length || notificationStore.sponsorsNotification?.student.length"
    >
      <div
        v-if="notificationStore.sponsorsNotification.sponsor.length"
        class="notification_card"
        v-for="sponsor in notificationStore.sponsorsNotification.sponsor"
      >
        <div class="notification_card_info">
          Вы стали спонсором у
          <nuxt-link style="color: #2c96ea" :to="`/profile/${sponsor.userId}`">{{ sponsor.studentName }}</nuxt-link>
        </div>
      </div>
      <div
        v-if="notificationStore.sponsorsNotification.student.length"
        class="notification_card"
        v-for="student in notificationStore.sponsorsNotification.student"
      >
        <div class="notification_card_info" v-if="student.sponsorId == userStore.user.id">Вы стали Самоспонсируемым</div>
        <div class="notification_card_info" v-else>
          У вас появился спонсор
          <nuxt-link style="color: #2c96ea" :to="`/profile/${student.sponsorId}`">{{ student.sponsorName }}</nuxt-link>
        </div>
      </div>
    </div>
    <div class="notification_transaction" v-if="notificationStore.transactionsNotification?.length">
      <NuxtLink to="/profile/finances">
        <div class="notification_card" v-for="(transInfo, index) in notificationStore.transactionsNotification" :key="index">
          <div class="notification_card_info">
            {{ transInfo.senderName }} перевел(ла) {{ transInfo.amount }}
            {{ declOfNum(transInfo.amount, ['балл', 'балла', 'баллов']) }}
          </div>
        </div>
      </NuxtLink>
    </div>
    <div class="notification_chats" v-if="notificationStore.chatsNotification?.chatsNotifications?.length">
      <div
        style="cursor: pointer"
        class="notification_card"
        v-for="chatsInfo in notificationStore.chatsNotification.chatsNotifications"
      >
        <nuxt-link
          @click="setUserInfo(chatsInfo.userId, chatsInfo.userName)"
          :to="`/profile/chat`"
          style="display: flex; gap: 20px; align-items: center"
        >
          <div class="avatar_container">
            <img loading="lazy" class="avatar" :src="`${url}/api/public/${chatsInfo.userAvatar}`" alt="" />
          </div>
          <div class="notification_card_info">
            У вас {{ chatsInfo.messageCount }}
            {{
              declOfNum(chatsInfo.messageCount, ['пропущенное сообщение', 'пропущенный сообщения', 'пропущенных сообщений'])
            }}
            от
            <p style="color: #2c96ea">{{ chatsInfo.userName }}</p>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div
      v-if="
        !notificationStore.rolesNotification?.length &&
        !notificationStore.transactionsNotification?.length &&
        !notificationStore.chatsNotification?.chatsNotifications?.length &&
        !(notificationStore.sponsorsNotification?.sponsor.length || notificationStore.sponsorsNotification?.student.length)
      "
      class="notification_nothing"
    >
      <h2 class="page-title">У вас нет уведомлений</h2>
    </div>
  </div>
</template>

<script setup>
import { useNotificationStore } from '@/store/notifications';
import { useUserStore } from '@/store/user';
import { setUserInfo } from '~/sockets/chat';
import url from '@/store/config';

const userStore = useUserStore();
const notificationStore = useNotificationStore();
const nuxt = useNuxtApp();

onUnmounted(async () => {
  if (notificationStore.rolesNotification?.length) await notificationStore.deleteRolesNotification();
  if (notificationStore.sponsorsNotification?.sponsor.length || notificationStore.sponsorsNotification?.student.length)
    await notificationStore.deleteSponsorsNotification();
  if (notificationStore.transactionsNotification?.length) await notificationStore.deleteTransNotification();
});

onMounted(async () => {
  await notificationStore.requestRolesNotification();
  await notificationStore.requestSponsorsNotification();
  await notificationStore.requestTransNotification();
  // await notificationStore.requestChatsNotifications();
});
</script>
