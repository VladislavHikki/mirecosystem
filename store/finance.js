import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useFinanceStore = defineStore({
  id: 'finance-store',
  state: () => {
    return {
      allTransactions: null,
      myTransactions: null,
      recipient: null,
      error: null,
    };
  },
  actions: {
    async requestAllTransactions(page, params) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/allpoints/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          params: {
            strsearch: params.strsearch,
            type: params?.type,
            entityId: params?.entityId,
          },
        });
        this.allTransactions = response.data;
      } catch (e) {
        return e.response;
      }
    },
    async requestTransactions(page, type, role, entityId = 1, search = null) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/mypoints/${role}/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          params: {
            type: type,
            entityId: entityId,
            strsearch: search,
          },
        });
        this.myTransactions = response.data;
      } catch (e) {
        return e.response;
      }
    },
    async sendPoints(formData, idempotency) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/users/sendpoints`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
            'idempotency-key': idempotency,
          },
          data: formData,
        });
        return response;
      } catch (e) {
        this.error = e.response.data;
        return e.response;
      }
    },
  },
});
