import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
  }),

  getters: {
    GetopenModal(state) {
    
      return state.isOpen;
    },

  },
  actions: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
  },
});