import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
import moment from "moment";

export const ReportStore = defineStore('report', {
  state: () => ({
    user_id: null,
    startDate: '',
    endDate: '',
    selectedDate: null,
    fromDate: null,
    toDate: null,
    disabledDates: [],
    minEndDate: '',
    formuser: {
      page: 1,
      per_page: 5,
      search: ""
    },

  }
  ),

  getters: {
  
  },

  actions: {

    async Reportresult() {
     

     
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },


    FitterResult(){
      console.log('FitterResult');
    }

  },

});
