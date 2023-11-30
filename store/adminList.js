import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';
import { useUserStore } from './user.js';
import { useSocketStore } from './socket.js';

export const useAdminListStore = defineStore({
  id: 'adminList-store',
  state: () => {
    return {
      adminList: null,
      deleteToken: null,
    };
  },
  actions: {
    async requestAdminList() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/adminlist`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.adminList = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestAdmins(page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/admins/page/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.adminList = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async createAdmin(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/users/newadmin`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        // await this.requestAdminList();
      } catch (e) {
        console.error(e);
      }
    },
    async createSponsor(sponsorId, userId) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/users/createsponsor/${sponsorId}/${userId}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        const socket_store = useSocketStore();
        socket_store.ws.send(JSON.stringify({ event: 'sponsor', userId: sponsorId}));
        socket_store.ws.send(JSON.stringify({ event: 'student', userId: userId}));
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async deleteAdmin(formData) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/users/delete`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async createDelToken() {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/users/gen/deltoken`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });

        const userStore = useUserStore();

        await userStore.check(useCookie('l').value);
        await this.requestDelToken();
      } catch (e) {
        console.error(e);
      }
    },
    async requestDelToken() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/deltoken`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.deleteToken = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async toHelper(id) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/users/tohelper/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response.status;
      } catch (e) {
        console.error(e);
      }
    },
    async delHelper(id) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/users/delhelper/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response.status;
      } catch (e) {
        console.error(e);
      }
    },
    async delRole(id, role) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/users/del/role/${role}/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        const socket_store = useSocketStore();
        socket_store.ws.send(JSON.stringify({ event: 'changeRole', userId: id, role: 1 }));
        return response.status;
      } catch (e) {
        console.error(e);
      }
    },
    async getAllUsers() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/all`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response;
      } catch (e) {
        console.error(e);
      }
    },
    async getAllSponsors(page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/allsponsors/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response;
        this.adminList = response.data;
      } catch (e) {
        console.error(e);
      }
    },
    async getAllSponsorsByAdmin(page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/admsponsors/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response;
      } catch (e) {
        console.error(e);
      }
    },
    async studentsBySponsor(id, page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/admstudents/${id}/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response;
      } catch (e) {
        console.error(e);
      }
    },
    async searchAdmin(page, params) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/search/${page}`,
          params: {
            strsearch: params.text,
            role: params.role,
          },
        });
        this.adminList = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
  },
});
