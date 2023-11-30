import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useFranchiseStore = defineStore({
  id: 'franchise-store',
  state: () => {
    return {
      franchises: null,
      oneFranchise: null,
    };
  },
  actions: {
    async requestOneFranchise(id, page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/onefran/${id}/${page}`,
        });
        this.oneFranchise = response.data;
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestFranchises(page = 1) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/fran/${page}`,
        });
        this.franchises = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async updateFranchise(id, formData, page) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/categories/update/fran/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestFranchises(page || 1);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async deleteFranchise(formData, page) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/categories/delete/fran`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        this.franchises.franchises.rows = this.franchises.franchises.rows.filter((item) => item.id != formData.get('ids'));
        --this.franchises.franchises.count;
        if (this.franchises.pages != Math.ceil(this.franchises.franchises.count / 25)) {
          this.franchises.pages = Math.ceil(this.franchises.franchises.count / 25);
          await this.requestFranchises(page);
        }
        // await this.requestFranchises(page || 1)
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async restoreFranchise(formData) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/categories/restore/fran`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
  },
  getters: {
    getFranchises: (state) => state.franchises,
  },
});
