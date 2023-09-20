import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
import { ref } from 'vue';




export const ExamHistoryStore = defineStore('examhistory', {
  state: () => ({
    em_id:null,
    history:[],
    formsearchexam: {
      page: 1,
      per_page: 10,
      search: '',
    },

  }

  ),




  getters: {
   


  },

  actions: {
    async fetchExamlistByEm() {

      const getid = await ApiService.post('/exam/history/' + this.em_id, this.formsearchexam).then(response => {
  
        console.log(response);
        this.history = response.data.data;
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

      this.formsearchexam.per_page = data_entires;
      this.formsearchexam.page = 1;
    },
    setCurrentPage(page) {
      this.formsearchexam.page = page
    },









  },



});
