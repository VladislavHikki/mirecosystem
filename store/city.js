import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useCityStore = defineStore({
  id: 'city-store',
  state: () => {
    return {
      cities: [],
    };
  },
  actions: {
    async get(id) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/countries/cities/${id}`,
        });
        this.cities = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async requestCreate(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/countries/city/create`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.get(formData.get('regionId'));
      } catch (error) {
        console.error(error);
      }
    },
    async updateCity(formData, id) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/countries/city/${id}`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.get(formData.get('regionId'));
      } catch (error) {
        console.error(error);
      }
    },
    async deleteCity(formData) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/countries/city`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.get(formData.get('regionId'));
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    all: (state) => state.cities,
  },
});
