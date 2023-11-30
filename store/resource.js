import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';
import { useUserStore } from '~/store/user';

export const useResourceStore = defineStore({
  id: 'resources-store',
  state: () => {
    return {
      resources: null,
      allResourcesByCity: null,
      selectResources: null,
      allResourcesByFranchise: null,
      allResourcesByTeam: null,
      categories: null,
      types: null,
      list: null,
      allChannelsByFranchise: null,
      allChatsByFranchise: null,
      lastResources: null,
      searchResources: null,
    };
  },
  actions: {
    async requestCreate(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/resources/create`,
          data: formData,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });

        await this.requestAllResources();
        await this.requestResources(this.resources?.pages || 1);
        const userStore = useUserStore();
        await userStore.requestProfile(userStore.data.id);
        return response.status;
      } catch (error) {
        return error.response.status;
      }
    },
    async updateResource(formData, id, page) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/resources/update/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestResources(page || 1);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async updateAnnounce(formData, id, page) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/resources/announce/update/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestAnnounces(page || 1);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestList(type) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/list`,
          params: {
            type: type,
          },
        });
        this.list = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestTypeResources() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/restypes`,
        });
        this.types = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestResources(page, amount) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/page/${page}`,
          params: {
            amount: amount ? amount : 25,
          },
        });
        this.resources = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestAnnounces(page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/announces/${page}`,
        });
        this.announces = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestOneAnnounce(id, page) {
      try {
        if (!id || !page) return false;
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/one/${id}/${page}`,
        });
        this.announces = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestLastResource(amount = 6) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/lastresources`,
          params: {
            amount: amount,
          },
        });
        this.lastResources = response.data;
      } catch (e) {}
    },
    async requestAllResources() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/all`,
        });
        this.selectResources = response.data?.resources;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestAllResourceByFranchiseId(id, page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/getFranResources/${id}/${page}`,
        });
        this.allResourcesByFranchise = response.data;
      } catch (e) {}
    },
    async requestOneResource(id, page) {
      try {
        if (!id || !page) {
          return false;
        }
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/one/${id}/${page}`,
        });
        this.resources = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestCategories() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/main`,
        });
        this.categories = response.data;
      } catch (e) {
        console.error(e);
      }
    },
    async createAnnounce(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/resources/announce/create`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestAnnounces(this.resources?.pages || 1);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },

    async searchResourceFromAdmin(page, parameters) {
      try {
        const response = await axios({
          url: `${url}/api/resources/page/${page}`,
          method: 'GET',
          params: {
            search: parameters.txt,
            amount: 25 || parameters?.amount,
          },
        });
        this.resources = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async searchResources(page, parameters) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/search/${page}`,
          params: {
            coverageId: parameters?.coverageId,
            strsearch: parameters.text,
            categoryId: parameters?.category,
            countryId: parameters?.country,
            regionId: parameters?.region,
            cityId: parameters?.city,
            amount: parameters?.amount || 25,
          },
        });

        this.resources = response.data;
      } catch (e) {
        console.error(e);
      }
    },
    async searchResourcesComp(page, parameters) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/search/${page}`,
          params: {
            strsearch: parameters.text,
            projectId: parameters.project?.value,
            franchiseId: parameters.franchise?.value,
            categoryId: parameters.category?.value,
            countryId: parameters.country?.id,
            regionId: parameters.region?.id,
            cityId: parameters.city?.id,
            teamId: parameters.team?.id,
            amount: parameters?.amount || 25,
          },
        });

        this.searchResources = response.data;
      } catch (e) {
        console.error(e);
      }
    },
    async requestResourcesByCategory(id, page = 1, parameters) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/by/category/${id}/${page}`,
          params: {
            search: parameters,
          },
        });
        this.resources = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestResourcesNational(page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/national/${page}`,
        });
        this.resources = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async deleteResource(formData) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/resources/delete`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestResources(this.list?.pages || 1);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async deleteAnnounce(formData, page) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/resources/announce/delete`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestAnnounces(page || 1);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestTeamResources(id, page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/getTeamResources/${id}/${page}`,
        });
        this.allResourcesByTeam = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestResourcesByCity(page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/cityres/${page}`,
        });
        this.allResourcesByCity = response.data;
        return true;
      } catch (e) {
        return e.response.status;
      }
    },
    async getChannelsByFranshiseId(id, page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/getFranChannels/${id}/${page}`,
        });
        this.allChannelsByFranchise = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async getResourceByCityId(type, id, page, parameters) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/by/location/${type}/${id}/${page}`,
          params: {
            search: parameters,
          },
        });
        this.resources = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async getChatsByFranshiseId(id, page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/resources/getFranChats/${id}/${page}`,
        });
        this.allChatsByFranchise = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
  },
  getters: {
    getCategories: (state) => state.categories,
    getTypes: (state) => state.types,
    getList: (state) => state.list,
    getAnnounces: (state) => state.announces,
    getResources: (state) => state.resources,
  },
});
