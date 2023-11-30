import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

import { useFranchiseStore } from '~/store/franchise';

export const useCategoryStore = defineStore({
  id: 'categories-store',
  state: () => {
    return {
      lastFran: null,
      projects: null,
      categories: null,
      subsections: null,
      subsectionsList: null,
      links: null,
      rubrics: null,
    };
  },
  actions: {
    async requestLastFran() {
      try {
        const franchises = await axios({
          method: 'GET',
          url: `${url}/api/categories/lastfran`,
        });
        this.lastFran = franchises.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async createFranchise(formData, page = 1) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/categories/create/fran`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        const franchiseStore = useFranchiseStore();
        await franchiseStore.requestFranchises(page);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestProjects(i) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/proj/${i}`,
        });
        this.projects = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async updateProject(id, formData, page = 1) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/categories/update/proj/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestProjects(page);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async deleteProject(formData, page = 1) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/categories/delete/proj`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        this.projects.projects.rows = this.projects.projects.rows.filter((item) => item.id != formData.get('ids'));
        --this.projects.projects.count;
        if (this.projects.pages != Math.ceil(this.projects.projects.count / 25)) {
          this.projects.pages = Math.ceil(this.projects.projects.count / 25);
          await this.requestProjects(page);
        }
        // await this.requestProjects(this.projects.pages || 1)
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async restoreProject(formData, page = 1) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/categories/restore/proj`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestProjects(page);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestCategories(params, page = 1) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/subcat/page/${page}`,
          params: {
            paranoid: params?.value?.paranoid,
          },
        });
        this.categories = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestLastSubsection() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/subs/lastsubs`,
        });
        return response.data;
      } catch (e) {
        return e.response;
      }
    },
    async createCategory(formData, page = 1) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/categories/create/subcat`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestCategories();
        return response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async createSubcategory(formData, page = 1) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/categories/create/cata`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestCategories();
        return response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async deleteCategory(formData, page = 1) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/categories/delete/subcat`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        // await this.requestCategories(this.categories.pages || 1)
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async updateSubcategory(id, formData, page = 1) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/categories/update/cata/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestCategories();
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async updateCategory(id, formData, page = 1) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/categories/update/subcat/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestCategories();
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async deleteSubCategory(formData, page = 1) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/categories/delete/cata`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        // this.categories.categories.rows = this.categories.categories.rows.filter(item => item.id != formData.get('ids'));
        // --this.categories.categories.count
        // if (this.categories.pages != Math.ceil(this.categories.categories.count / 25)){
        //     this.categories.pages = Math.ceil(this.categories.categories.count / 25)
        //     await this.requestCategories(page)
        // }
        // await this.requestCategories(this.categories.pages || 1)
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async restoreSubcategory(formData, page = 1) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/categories/restore/cata`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestCategories(page);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },

    async requestResourcesBySubcategory(id, page = 1, parameters) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/by/subcategory/${id}/${page}`,
          params: {
            search: parameters,
          },
        });
        return response.data;
      } catch (e) {
        return e.response.status;
      }
    },

    async restoreCategory(formData, page = 1) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/categories/restore/subcat`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestCategories(page);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async createProject(formData, page = 1) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/categories/create/proj`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestProjects(page);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestListSubsections() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/subs/list`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.subsectionsList = response.data;
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestSubsections(page, params = {}) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/subs/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          params: {
            search: params?.search,
            deleted: params?.deleted,
            amount: params?.amount,
          },
        });
        this.subsections = response.data;
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async createSubsection(formData, page = 1) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/categories/create/subs`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestSubsections(page);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async updateSubsection(id, formData, page = 1) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/categories/update/subs/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestSubsections(page);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async deleteSubsection(formData, page = 1) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/categories/delete/subs`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        this.subsections.subsections.rows = this.subsections.subsections.rows.filter(
          (item) => item.id != formData.get('ids')
        );
        --this.subsections.subsections.count;
        if (this.subsections.pages != Math.ceil(this.subsections.subsections.count / 25)) {
          this.subsections.pages = Math.ceil(this.subsections.subsections.count / 25);
          await this.requestSubsections(page);
        }
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestOneSubsection(id) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/subs/one/${id}`,
        });
        return response;
      } catch (e) {
        return e.response.status;
      }
    },
    async createCoverage(formData, page = 1) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/categories/create/cova`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestCoverage(page);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestCoverage(page = 1) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/cova/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.subsections = response.data;
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async getAllLinks(type) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/links/all`,
          params: type,
        });
        this.links = response?.data;
      } catch (e) {
        console.error(e);
      }
    },
    async createLink(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/categories/create/link`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        // await this.getAllLinks();
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async editLink(id, formData) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/categories/update/link/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async deleteLink(id) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/categories/delete/link/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async getAllRubrics(page) {
      try {
        const response = await axios({
          url: `${url}/api/categories/rubrics/all/${page}?list=1`,
          method: 'GET',
        });
        this.rubrics = response?.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async getAllRubricsAdmin(page) {
      try {
        const response = await axios({
          url: `${url}/api/categories/rubrics/all/${page}?list=0`,
          method: 'GET',
        });
        this.rubrics = response?.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async createRubrics(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/categories/create/rubric`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.getAllRubricsAdmin(1);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async deleteRubrics(id, params) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/categories/delete/rubric/${id}`,
          params,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.getAllRubricsAdmin(1);
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async editRubrics(id, formData) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/categories/update/rubric/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.getAllRubricsAdmin(1);
        return response;
      } catch (e) {
        return e.response;
      }
    },
  },
});
