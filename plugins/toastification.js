import { defineNuxtPlugin } from "#app";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
  hideProgressBar: true,
};
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options);
});
