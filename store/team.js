import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useTeamStore = defineStore({
  id: 'team-store',
  state: () => {
    return {
      teams: null,
      userTeam: null,
      subsTeams: null,
    };
  },
  actions: {
    async requestTeams(page = 1) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/teams/${page}`,
        });
        this.teams = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestUsersTeam(page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/teaminfo/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.userTeam = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestTeamsSubsection(id) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/substeams/${id}`,
        });
        this.subsTeams = response.data;
        return response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async updateTeam(id, formData, page) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/users/team/update/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestTeams(page || 1);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async searchTeam(params, page) {
      try {
        const response = await axios({
          method:"GET",
          url: `${url}/api/users/teams/search/${page}`,
          params: {
            strsearch: params.text,
            amount: params?.amount || 25,
            type: params?.type,
          }, 
        })
        this.teams = response.data;
      } catch (error) {
        console.error(error.response);
      }
    },
    async deleteTeam(formData, page = 1) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/users/team/delete`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        // await this.requestTeams(this.teams.pages || 1)
        this.teams.teams.rows = this.teams.teams.rows.filter((item) => item.id != formData.get('ids'));
        --this.teams.teams.count;
        if (this.teams.pages != Math.ceil(this.teams.teams.count / 25)) {
          this.teams.pages = Math.ceil(this.teams.teams.count / 25);
          await this.requestTeams(page);
        }
        return response.status;
      } catch (e) {
        return e.response;
      }
    },
    async createTeam(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/users/createteam`,
          // headers: {
          //     Authorization: `Bearer ${useCookie('l').value}`,
          // },
          data: formData,
        });
        await this.requestTeams(1);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async searchTeams(page, parameters) {
      try {
        const response = await axios({
          url: `${url}/api/users/teams/${page}`,
          method: 'GET',
          params: {
            search: parameters.txt,
            amount: 25 || parameters?.amount,
          },
        });
        this.teams = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    getTeams: (state) => state.teams,
  },
});
