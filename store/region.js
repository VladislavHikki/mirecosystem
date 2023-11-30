import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useRegionStore = defineStore({
  id: 'region-store',
  state: () => {
    return {
      regions: [],
    };
  },
  actions: {
    async get(id) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/countries/regions/${id}`,
        });
        this.regions = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async requestCreate(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/countries/region/create`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.get(formData.get('countryId'));
      } catch (error) {
        console.error(error);
      }
    },
    async updateRegion(formData, id) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/countries/region/${id}`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.get(formData.get('countryId'));
      } catch (error) {
        console.error(error);
      }
    },
    async deleteRegion(formData) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/countries/region`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.get(formData.get('countryId'));
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    all: (state) => state.regions,
  },
});
