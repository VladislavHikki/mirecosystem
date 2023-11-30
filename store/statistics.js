import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useStatisticStore = defineStore({
  id: 'statistic-store',
  state: () => {
    return {
      statistic: null,
    };
  },
  actions: {
    async getStatistic() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/stats`,
        });
        this.statistic = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    getStats: (state) => state.statistic,
  },
});
