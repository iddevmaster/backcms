import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";

export const DltStore = defineStore('dlt', {
  state: () => ({
    user_id: null,
    front_img:null,
    back_img: null,
    image:null,
    imagelist:null,
    imagelistFront:null,
    imagelistBack:null,
    formdtl: {
      front_img: "",
      back_img: "",
      dlt_code: "",
      user_id: null
    },
  }
  ),

  getters: {
    FormDlt(state) {
      return state.formdtl;
    },
  },

  actions: {
    async fetchUser() {
      try {
        const data = await ApiService.post('/user/get/85').then(response => {
       
        });

        return true

      } catch (error) {
        console.log('error');
        return false;
      } finally {

      }
  
    },
    async fetchDlt(id) {
      
     
      return true
  
    },
    async SaveFormDlt() {
  
    },
    async fetchDltid() {
  
    },
    async Updatedtl() {
  
    },
    async Delete() {
  
    },

    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },

});
