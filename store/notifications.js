import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useNotificationStore = defineStore({
  id: 'Notification-store',
  state: () => {
    return {
      rolesNotification: null,
      sponsorsNotification: null,
      transactionsNotification: null,
      chatsNotification: null,
      postsNotification: null,
    };
  },
  actions: {
    async requestRolesNotification() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/notifications/get/roles`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.rolesNotification = response.data;
      } catch (e) {
        return e;
      }
    },
    async requestSponsorsNotification() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/notifications/get/sponsors`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.sponsorsNotification = response.data;
      } catch (e) {
        return e;
      }
    },
    async requestTransNotification() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/notifications/get/transactions`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.transactionsNotification = response.data;
      } catch (e) {
        return e;
      }
    },
    async requestChatsNotifications() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/notifications/get/chats`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.chatsNotification = response.data;
      } catch (e) {
        return e;
      }
    },
    async requestPostsNotification() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/notifications/get/posts`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.postsNotification = response?.data;
      } catch (e) {
        return e;
      }
    },
    async requestOtherNotification() {
      await this.requestRolesNotification();
      await this.requestTransNotification();
      await this.requestSponsorsNotification();
    },

    async deletePostsNotification() {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/notifications/delete/posts`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.requestPostsNotification();
        return response.status;
      } catch (e) {
        return e;
      }
    },
    async deleteChatsNotification(formData) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/notifications/delete/chats`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestChatsNotifications();
        return response.status;
      } catch (e) {
        return e;
      }
    },
    async deleteSponsorsNotification() {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/notifications/delete/sponsors`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response.status;
      } catch (e) {
        return e;
      }
    },
    async deleteTransNotification() {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/notifications/delete/transactions`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response.status;
      } catch (e) {
        return e;
      }
    },
    async deleteRolesNotification() {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/notifications/delete/roles`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response.status;
      } catch (e) {
        return e;
      }
    },
    async deleteOtherNotification() {
      await this.deleteRolesNotification();
      await this.deleteTransNotification();
      await this.deleteSponsorsNotification();
    }
  },
  getters: {
    getChatNotification: (state) =>
      state.chatsNotification?.chatsNotifications.map((item) => item.messageCount).reduce((a, b) => a + b, 0),
    getOtherNotification: (state) =>
      state.rolesNotification?.length +
      state.transactionsNotification?.length +
      state.sponsorsNotification?.sponsor?.length +
      state.sponsorsNotification?.student?.length,
    getPostsNotification: (state) => state.postsNotification?.length,
  },
});
