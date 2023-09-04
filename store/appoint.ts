import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';
import ApiService from '../services/api.service';




export const AppointStore = defineStore('appoint', {
  state: () => ({
    locale: true,
    load: true,
    isOpen: false,
    searchData:"",
  }

  ),


  getters: {

    Ismodal(state) {
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

  
    setCurrentPage(page) {
      this.page = page
      this.selected = [];
      this.isAllSelected = false
    },

    sortLists(sortBy) {
      if (this.sortedbyASC) {
        this.posts.data.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedbyASC = false;
      } else {
        this.posts.data.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedbyASC = true;
      }
    },

    selectentires(data_entires) {
      this.per_page = data_entires;
      this.page = 1;
    },

  
  
    async search() {
      
    },

    async ResetForm() {   ////reset Form
    
    },

    async Zipcode() {
    
    },
    async Country() {
    
    },

    async UploadfileProfile() {
     
 
    },

 
  },

});
