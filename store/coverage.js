import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useCoverageStore = defineStore({
  id: 'coverage-store',
  state: () => {
    return {
      coverages: null,
    };
  },
  actions: {
    async requestCoverage() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/cova/list`,
        });
        this.coverages = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
  },
});
