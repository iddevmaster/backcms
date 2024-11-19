import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";
import moment from "moment";

export const HistoryStore = defineStore('history', {
  state: () => ({
    user_id: null,
    profile:[],
    formhistory: {
      page: 1,
      per_page: 100,
      search: ""
    },
    learn:[],
    result:[],
  }
  ),

  getters: {
  
  },

  actions: {
    async getUser() {
      try {
        const data = await ApiService.get('/user/get/'+this.user_id).then(response => {
          this.profile = [];
          if(response.data){
            this.profile.push(response.data);
          }
        });
        return true
      } catch (error) {
        return false;
      } 

    },

    async getLeanning() {
      try {
        const data = await ApiService.post('/course/learn/history/' + this.user_id, this.formhistory).then(rep => {
      if(rep.data){
        this.learn.push(rep.data.data);
      }
        });
        return data;
      } catch (error) {
        return false;
      }
    },

    async ResultEx() {
      try {
        const data = await ApiService.get('/main_result/listprat/?user_id=' + this.user_id).then(rep => {
     
      if(rep.data){
        this.result.push(rep.data);
      }

      console.log(this.result);
        });
        return data;
      } catch (error) {
        return false;
      }
    }
  }


});
