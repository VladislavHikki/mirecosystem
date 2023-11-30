import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';
import { useSocketStore } from './socket';

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => {
    return {
      user: {},
      profile: null,
      authorized: false,
      referrals: null,
      referees: null,
      lastReferrals: null,
      leaderReferrals: null,
      lastTeams: null,
      team: null,
      franleaders: null,
      userList: null,
      trainers: null,
      users: null,
      sponsors: null,
      leadersSponsors: null,
      tutors: null,
      students: null,
    };
  },
  actions: {
    async register(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/users/reg`,
          data: formData,
        });
        this.user = response.data.user;
        // setCookie('l', response.data.accessToken, { 'max-age': 360000 });
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async sendEmailForReg(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/mail/regcontinue`,
          data: formData,
        });
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestUsers(page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/page/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.userList = response.data;
        return true;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestUserList() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/list`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.users = response.data;
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async searchUsers(page, params) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/search/${page}`,
          params: {
            strsearch: params.text,
            role: params.role,
          },
        });
        this.userList = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async checkVerify(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/users/verifycheck`,
          data: formData,
        });
        this.authorized = true;
        setCookie('l', response.data.accessToken, { 'max-age': 360000 });
        return response.data;
      } catch (e) {
        navigateTo('/auth?page=reg');
      }
    },
    async verify(formData) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/users/verify`,
          data: formData,
        });
        this.authorized = true;
        setCookie('l', response.data.accessToken, { 'max-age': 360000 });
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async login(formData) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/users/auth`,
          data: formData,
        });
        this.user = response.data.user;
        setCookie('l', response.data.accessToken, { 'max-age': 360000 });
        this.authorized = true;
        return true;
      } catch (e) {
        return e.response.status;
      }
    },
    async check(token) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/users/checktoken`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data;
        this.authorized = true;
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async changeRole(userId, formData) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/users/changerole/${userId}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        const socket_store = useSocketStore();
        socket_store.ws.send(JSON.stringify({ event: 'changeRole', userId: userId, role: 1 }));
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async deleteRole(role, id) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/users/del/role/${role}/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response.status;
      } catch (error) {
        return error.status;
      }
    },
    async requestProfile(userId) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/profile/${userId}`,
        });
        this.profile = response.data;
      } catch (e) {
        this.profile = e.response.status;
        return e.response.status;
      }
    },
    async requestLastReferrals() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/lastreferrals`,
        });
        this.lastReferrals = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestLeaderReferrals(parameters) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/refleaders`,
          params: {
            amount: parameters?.amount,
            order: parameters?.order,
            startedAt: parameters?.startedAt,
            finishedAt: parameters?.finishedAt,
          },
        });
        this.leaderReferrals = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestFranchiseLeaders() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/franleaders`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.franleaders = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestLastTeams(limit = 6) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/lastteams`,
          params: {
            limit: limit,
          },
        });
        this.lastTeams = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestOneTeam(id) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/team/${id}`,
        });
        this.team = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestReferralCode() {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/users/refgen`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        await this.check(useCookie('l').value);
        return response.status;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestReferrals(id, parameters) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/refprofile/${id}`,
          params: {
            level: parameters?.level,
            limit: parameters?.limit || 30,
            page: parameters?.page,
          },
        });
        this.referrals = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async requestReferees(id, parameters) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/referrers/${id}`,
          params: {
            page: parameters?.page,
          },
        });
        this.referees = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async deleteUser(formData, page) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/users/delete`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestUsers(page || 1);
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async requestTrainerList() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/trainerlist`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.trainers = response.data;
      } catch (e) {
        console.error(e);
      }
    },
    async updateProfile(formData, userId) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/users/update`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        await this.requestProfile(userId);
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async getLastSponsors() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/lastsponsors`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async getAllStudents(params) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/students/`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          params: {
            strsearch: params.text,
            page: params.page,
          },
        });
        this.students = response.data;
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async getAllSponsorsByAdmin(page, params = null) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/admsponsors/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          params: {
            strsearch: params?.text,
          },
        });
        this.sponsors = response.data;
        return response;
      } catch (e) {
        console.error(e);
      }
    },
    async getLeadersSponsors() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/sponsorleaders`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.leadersSponsors = response.data;
      } catch (e) {
        return e.response;
      }
    },
    async getAllSponsors(page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/allsponsors/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.sponsors = response.data;
        return response;
      } catch (e) {
        console.error(e);
      }
    },
    async getMySponsors(id) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/sponsor/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async searchSponsors(page, params) {
      try {
        const response = await axios({
          url: `${url}/api/users/admsponsors/${page}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          params: {
            strsearch: params.text,
          },
        });
        this.sponsors = response?.data;
      } catch (e) {
        return e.response;
      }
    },
    async getUserById(id) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/one/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response.data;
      } catch (e) {
        return e.response;
      }
    },
    async getTutorsList() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/curators/list`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async getAllTutors(page, params) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/users/curators/all/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          params: {
            strsearch: params.text,
          },
        });
        this.tutors = response.data;
      } catch (e) {
        return e.response;
      }
    },
    async deletePost(id) {
      try {
        const response = await axios({
          method: 'delete',
          url: `${url}/api/posts/delete/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async editPost(id, formData) {
      try {
        const response = await axios({
          method: 'put',
          url: `${url}/api/posts/edit/${id}`,
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
    async createPost(formData) {
      try {
        const response = await axios({
          method: 'post',
          url: `${url}/api/posts/create`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        const socket_store = useSocketStore();
        await socket_store.ws.send(JSON.stringify({ event: 'post', postId: response.data?.id}));
        return response;
      } catch (e) {
        return e.response;
      }
    },
    async setSettings(formData) {
      try {
        const response = await axios({
          method: 'post',
          url: `${url}/api/users/back/create`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        return response;
      } catch (error) {
        return error.response;
      }
    },
    async getSettings() {
      try {
        const response = await axios({
          method: 'get',
          url: `${url}/api/users/back/all`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response.data;
      } catch (error) {
        return error;
      }
    },
    async deleteBack(ids) {
      try {
        const response = await axios({
          method: 'delete',
          url: `${url}/api/users/back/delete`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: ids,
        });
        return response.data;
      } catch (error) {
        return error.response;
      }
    },
    async deleteSpo(formData) {
      try {
        const response = await axios({
          method: 'delete',
          url: `${url}/api/users/sponsors/delete`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: formData,
        });
        return response.status;
      } catch (error) {
        return error.status;
      }
    },
    async changeBack(id) {
      try {
        const response = await axios({
          method: 'put',
          url: `${url}/api/users/back/update`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: id,
        });
        return response.data;
      } catch (error) {
        return error.response;
      }
    },
    async editTheme(id, form) {
      try {
        const response = await axios({
          method: 'put',
          url: `${url}/api/users/back/update/one/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: form,
        });
        return response.data;
      } catch (error) {
        return response.error;
      }
    },
  },
  getters: {
    data: (state) => state.user,
    isAuthorized: (state) => state.authorized,
    getFranchises: (state) => state.profile?.franchises,
    getTeams: (state) => state.profile?.teams,
    getMyTeams: (state) => state.profile?.userTeams,
    getTeamsReferrals: (state) => state.profile.teamsReferrals,
    getStudents: (state) => state.students,
    getProfile: (state) => state.profile,
    getProfileTotal: (state) => state.profile.total,
    getProfileResources: (state) => state.profile.resources,
    getProfileChats: (state) => state?.profile?.resources?.filter((r) => r.restypeId == 1),
    getProfileBots: (state) => state?.profile?.resources?.filter((r) => r.restypeId == 2),
    getProfileChannels: (state) => state?.profile?.resources?.filter((r) => r.restypeId == 3),
  },
});
