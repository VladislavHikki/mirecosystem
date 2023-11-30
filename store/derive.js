import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useDeriveStore = defineStore({
  id: 'derive-store',
  state: () => {
    return {
      derives: null,
    };
  },
  actions: {
    async getAllDerive(limit = null, showCount = false, type = '') {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/currency/all`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          params: {
            limit: limit,
            count: showCount,
            type: type,
          },
        });
        this.derives = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async createDerive(form) {
      try {
        const response = await axios({
          method: 'post',
          url: `${url}/api/currency/create`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: form,
        });
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async editDerive(form, id) {
      try {
        const response = await axios({
          method: 'put',
          url: `${url}/api/currency/edit/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: form,
        });
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async deleteDerive(id) {
      try {
        const response = await axios({
          method: 'delete',
          url: `${url}/api/currency/delete/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response;
      } catch (e) {
        return e.response;
      }
    },
  },
});
