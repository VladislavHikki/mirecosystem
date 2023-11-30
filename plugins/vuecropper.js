import { defineNuxtPlugin } from '#app';
import VueCropper from 'vue-cropperjs';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("VueCropper", VueCropper);
});