import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
import { ref } from 'vue';




export const ExamHistoryStore = defineStore('examhistory', {
  state: () => ({
    em_id:null,
    history:[],
    formsearchexamhistory: {
      page: 1,
      per_page: 5,
      search: '',
    },
    total_page:null,
    limit_page:null,
    current_page:null,
    total_filter:null,
    total:null
  }

  ),




  getters: {
   


  },

  actions: {
    async fetchExamlistByEm() {
      const getid = await ApiService.post('/exam/history/' + this.em_id, this.formsearchexamhistory).then(response => {
        console.log(response.data);
        this.history = response.data.data;
        this.total_page = response.data.total_page
        this.limit_page = response.data.limit_page
        this.current_page = response.data.current_page
        this.total_filter = response.data.total_filter
        this.total = response.data.total

     
        
      });

    },

    sortLists(sortBy) {
      if (this.sortedbyASC) {
        this.examlist.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedbyASC = false;
      } else {
        this.examlist.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedbyASC = true;
      }
    },

    async selectentires(data_entires) {
      this.formsearchexamhistory.per_page = data_entires;
      this.formsearchexamhistory.page = 1;
    },
    setCurrentPage(page) {
      this.formsearchexamhistory.page = page
    },

    









  },



});
