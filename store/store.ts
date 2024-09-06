import { defineStore } from "pinia";
export const useStore = defineStore("store", () => {
  const createPostModal = ref<boolean>(false);
  return { createPostModal };
});
