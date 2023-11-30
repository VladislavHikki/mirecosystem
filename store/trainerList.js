import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useTrainerStore = defineStore({
  id: 'trainer-store',
  state: () => {
    return {
      trainerList: null,
    };
  },
  actions: {
    async requestTrainerList(page = 1) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/trainers/page/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.trainerList = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async searchTrainer(page, params) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/search/${page}`,
          params: {
            strsearch: params.text,
            role: params.role,
          },
        });
        this.trainerList = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
  },
});
