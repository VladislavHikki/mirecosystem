import {defineStore} from "pinia";
import url from "@/store/config";
import axios from "axios";

export const useServicesStore = defineStore("services", {
    state: () => ({
        services: null,
        savesServices: null,
        types: null,
    }),
    actions: {
        async requestServices(page = 1) {
            try {
                const response = await axios({
                    method: "get",
                    url: `${url}/api/services/page/${page}`
                });
                this.services = response?.data;
            } catch (error) {
                console.log(error);
            }
        },
        async requestServicesWithType() {
            try {
                const response = await axios({
                    method: "get",
                    url: `${url}/api/services/type`,
                    headers: {
                        Authorization: `Bearer ${useCookie('l').value}`,
                    },
                });
                this.services = response?.data;
            } catch (error) {
                console.log(error);
            }
        },
        async createService(form) {
            try {
                const response = await axios({
                    method: "post",
                    url: `${url}/api/services/create`,
                    headers: {
                        Authorization: `Bearer ${useCookie('l').value}`,
                    },
                    data: form,
                });
                this.requestServicesWithType();
                return response?.status;
            } catch (error) {
                return error?.status;
            }
        },
        async editService(id, form) {
            try {
                const response = await axios({
                    method: "put",
                    url: `${url}/api/services/update/${id}`,
                    data: form,
                    headers: {
                        Authorization: `Bearer ${useCookie('l').value}`,
                    },
                });
                this.requestServicesWithType();
                return response?.status;
            } catch (error) {
                return error?.status;
            }
        },
        async deleteService(id) {
            try {
                const response = await axios({
                    method: "delete",
                    url: `${url}/api/services/delete/${id}`,
                    headers: {
                        Authorization: `Bearer ${useCookie('l').value}`,
                    },
                });
                this.requestServicesWithType();
                return response?.status;
            } catch (error) {
                return error?.status;
            }
        },
        async requestTypes(page) {
            try {
                const response = await axios({
                    method: "get",
                    url: `${url}/api/services/type/${page}`
                });
                this.types = response?.data;
            } catch (error) {
                console.log(error);
            }
        },
        async createType(form) {
            try {
                const response = await axios({
                    method: "post",
                    url: `${url}/api/services/create/type`,
                    headers: {
                        Authorization: `Bearer ${useCookie('l').value}`,
                    },
                    data: form,
                });
                this.requestServicesWithType();
                return response?.status;
            } catch (error) {
                return error?.status;
            }
        },
        async editType(id, form) {
            try {
                const response = await axios({
                    method: "put",
                    url: `${url}/api/services/type/update/${id}`,
                    data: form,
                    headers: {
                        Authorization: `Bearer ${useCookie('l').value}`,
                    },
                });
                this.requestServicesWithType();
                return response.status;
            } catch (error) {
                return error?.status;
            }
        },
        async deleteType(id) {
            try {
                const response = await axios({
                    method: "delete",
                    url: `${url}/api/services/type/delete/${id}`,
                    headers: {
                        Authorization: `Bearer ${useCookie('l').value}`,
                    },
                });
                this.requestServicesWithType();
                return response?.status;
            } catch (error) {
                return error?.status;
            }
        },
        async requestSaveServices() {
            try {
                const response = await axios({
                    method: "get",
                    url: `${url}/api/services/save`,
                    headers: {
                        Authorization: `Bearer ${useCookie('l').value}`,
                    },
                });
                this.savesServices = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async saveService(form) {
            try {
                const response = await axios({
                    method: "post",
                    url: `${url}/api/services/save`,
                    headers: {
                        Authorization: `Bearer ${useCookie('l').value}`,
                    },
                    data: form,
                });
                this.requestSaveServices();
                this.requestServicesWithType(1);
                return response.data;
            } catch (error) {
                return error?.data;
            }
        }
    },
    getters: {

    }
})