import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';




export const newCivilStore = defineStore('newcivil', {
  state: () => ({
    locale:true,
    load:true,
    isOpen: false,
    AlertText:null,
    posts:{},
    pending:false,
   
  }
     
),


  getters: {


  },
  
  actions: {




  

  },
});
