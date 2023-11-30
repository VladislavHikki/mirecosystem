import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore({
  id: 'global-store',
  state: () => {
    return {};
  },
  actions: {
    async sendText(txt) {
      try {
        const response = await axios({
          method: 'get',
          url: `${url}/api/global/search`,
          params: {
            search: txt,
          },
        });
        return response?.data;
      } catch (e) {
        return e;
      }
    },
  },
});
