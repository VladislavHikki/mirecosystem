import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';
import { useSocketStore } from './socket';

export const useChatsStore = defineStore({
  id: 'chats-store',
  state: () => {
    return {
      messages: null,
      newMessages: null,
      chats: null,
      filterUser: null,
      selected_chat: {
        id: null,
        user_info: null,
      },
    };
  },
  actions: {
    async getChatByProfile(id) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/chats/byprofile/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestMessage(id, page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/chats/messages/${id}/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.messages = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestNewMessages() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/chats/newmessages`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.newMessages = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestChats(page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/chats/`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          params: {
            page: page,
          },
        });
        this.chats = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async searchUsers(page = 1, value = '') {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/chats/searchusers/${page}?strsearch=${value}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.filterUser = response.data;
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async createMessage(formData, chatId) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/chats/send`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        const socket_store = useSocketStore();
        socket_store.ws.send(JSON.stringify({ event: 'msg', chatId: chatId }));
      } catch (e) {
        return e.response.status;
      }
    },
    async createChat(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/chats/create`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestChats();
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
  },
  getters: {
    getMessages: (state) => state.messages?.messages?.rows.reverse(),
    getNewMessages: (state) => state.newMessages,
    getChats: (state) => state.chats?.chats?.rows,
  },
});
