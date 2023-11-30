import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useCountryStore = defineStore({
  id: 'country-store',
  state: () => {
    return {
      countries: [],
    };
  },
  actions: {
    async get(list = false) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/countries`,
          params: {
            list: list,
          },
        });
        this.countries = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestCreate(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/countries/country/create`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.get();
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async updateCountry(formData, id) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/countries/country/${id}`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.get();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteCountry(formData) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/countries/country`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.get();
      } catch (error) {
        console.error(error);
      }
    },
    async addFromExcel(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/countries/excel`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.get();
        return response;
      } catch (error) {
        console.error(error);
        return error?.response;
      }
    },
  },
  getters: {
    all: (state) => state.countries,
  },
});
