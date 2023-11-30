import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useLetterStore = defineStore({
  id: 'letter-store',
  state: () => {
    return {
      letters: null,
    };
  },
  actions: {
    async requestLetters(page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/letters/${page}`,
        });
        this.letters = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async createLetter(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/letters/create`,
          data: formData,
        });
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async deleteLetter(formData) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/letters/delete`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.letters.letters.rows = this.letters.letters.rows.filter((item) => item.id != formData.get('ids'));
        --this.letters.letters.count;
        if (this.letters.pages != Math.ceil(this.letters.letters.count / 25)) {
          this.letters.pages = Math.ceil(this.letters.letters.count / 25);
          await this.requestLetters(this.letters.pages);
        }
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
  },
  getters: {
    getLetters: (state) => state.letters,
  },
});
