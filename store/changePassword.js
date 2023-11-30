import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const changePassword = defineStore({
  id: 'change-password-store',
  state: () => {
    return {
      linkForChangePassword: null,
    };
  },
  actions: {
    async sendLinkForChangePassword(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/mail/resetpass`,
          data: formData,
        });
      } catch (e) {
        return e.response.status;
      }
    },
    async changePassword(formData, code) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/mail/updatepass/${code}`,
          data: formData,
        });
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
  },
});
