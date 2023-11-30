import url from '@/store/config.js';

import axios from 'axios';
import { defineStore } from 'pinia';

export const useBlogStore = defineStore({
  id: 'blog-store',
  state: () => {
    return {
      popularPosts: null,
      blogs: null,
      liked: null,
      likesCount: null,
      comments: null,
      rubric: null,
    };
  },
  actions: {
    async getPopularPosts() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/posts/popular`,
        });
        this.popularPosts = response.data;
      } catch (e) {
        return e.response.status;
      }
    },
    async allBlogsByRubricId(page, params) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/posts/all/${page}`,
          params,
        });
        this.blogs = response.data;
        this.rubric = response?.data?.rubric;
      } catch (e) {
        return e.response.status;
      }
    },
    async getAllRubric(page, list) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/categories/rubrics/all/${page}`,
          params: {
            list: list,
          },
        });
        return response?.data;
      } catch (e) {
        return e;
      }
    },
    async getPostById(id) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/posts/one/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        this.liked = response?.data.liked;
        this.likesCount = response.data.likesCount;
        return response?.data;
      } catch (e) {
        return e;
      }
    },

    //Активности

    async like(type, id) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/activities/like/${type}/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response;
      } catch (e) {
        return e;
      }
    },

    async addComment(type, id, form) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/activities/create/${type}/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: form,
        });
        return response;
      } catch (error) {
        return error?.response;
      }
    },

    async addComment(type, id, form) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${url}/api/activities/create/${type}/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: form,
        });
        return response;
      } catch (error) {
        return error?.response;
      }
    },

    async getComment(type, id, page) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${url}/api/activities/comments/${type}/${id}/${page}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response?.data;
      } catch (e) {
        return e;
      }
    },

    async editComment(id, form) {
      try {
        const response = await axios({
          method: 'PUT',
          url: `${url}/api/activities/edit/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
          data: form,
        });
        return response;
      } catch (error) {
        return error?.response;
      }
    },

    async deleteComment(id) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${url}/api/activities/delete/${id}`,
          headers: {
            Authorization: `Bearer ${useCookie('l').value}`,
          },
        });
        return response;
      } catch (error) {
        return error?.response;
      }
    },
  },
  getters: {
    getPopularPosts2: (state) => state.popularPosts,
  },
});
