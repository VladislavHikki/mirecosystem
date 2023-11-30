import { defineStore } from 'pinia';
import url from '@/store/config.js';

import axios from 'axios';

export const useTriadsStore = defineStore('triads', {
  state: () => ({
    triads: null,
  }),
  actions: {
    async requestTriads(page, parameters) {
      try {
        const response = await axios({
          method: 'get',
          url: `${url}/api/categories/triads/all/${page}`,
          params: {
            limit: parameters?.limit || 30,
            list: parameters?.list,
            type: parameters?.type,
          },
        });
        this.triads = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async requestOneTriad(id, params) {
      try {
        const response = await axios({
          method: 'get',
          url: `${url}/api/categories/triads/one/${id}`,
          params,
        });
        return response?.data;
      } catch (error) {
        console.log(error);
      }
    },
    async requestOneTriads(page, parameters) {
      try {
        const response = await axios({
          method: 'get',
          url: `${url}/api/categories/triads/all/${page}`,
          params: {
            limit: parameters?.limit || 25,
            list: parameters?.list,
          },
        });
        this.triads = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createTriad(form) {
      try {
        const response = await axios({
          method: 'post',
          url: `${url}/api/categories/triads/create`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: form,
        });
        await this.requestTriads(1, { list: true });
        return response?.status;
      } catch (error) {
        return error?.status;
      }
    },
    async deleteTriad(id) {
      try {
        const response = await axios({
          method: 'delete',
          url: `${url}/api/categories/triads/delete/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.requestTriads(1, { list: true });
        return response?.status;
      } catch (error) {
        return error?.status;
      }
    },
    async editTriad(id, form) {
      try {
        const response = await axios({
          method: 'put',
          url: `${url}/api/categories/triads/update/${id}`,
          data: form,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.requestTriads(1, { list: true });
        return response.status;
      } catch (error) {
        return error?.status;
      }
    },
  },
  getters: {
    getTriads: (state) => state.triads?.triads,
  },
});
