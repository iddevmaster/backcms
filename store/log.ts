import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
import moment from "moment";

export const LogStore = defineStore('result', {
  state: () => ({
    user_id: null,
    modaldelete:false,
    mr_id:null,
    identification_number:null,
    courselist: [],
    lessonlist:[],
    reportlog:[],
    users: [],
    user:[],
    userall:[],
    formuser: {
      page: 1,
      per_page: 5,
      search: ""
    },
    formfitter:{
      course_id:null,
      cs_id:null,
      user_id:null,
      year:null,
      type:1
    },
    formsearchcourse: {
      page: 1,
      per_page: 50,
      search: '',
    },
  }
  ),

  getters: {
  
  },

  actions: {

    async fetchUsers() {
        const data = await ApiService.post('/user/list?user_type=3', this.formuser).then(response => {
          this.user = response.data.data;
       
        });

      let a =  await this.checkuser();
     
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
   async checkuser() {
     this.userall = [];
      for (var i = 0; i < this.user.length; i++) {
        const data = ApiService.get('/user/get/'+this.user[i].user_id).then(response => {
       const b = {user_id:response.data.user_id,user_firstname:response.data.user_firstname,user_lastname:response.data.user_lastname,user_phone:response.data.user_phone,detail:response.data.detail?.verify_account,identification_number:response.data.detail?.identification_number}
          this.userall.push(b)
        });
      }
      return this.userall;
  
    },


    async fetchCourslist() {
      try {
        const data = await ApiService.post('/course/list', this.formsearchcourse).then(response => {
          this.courselist = response.data.data
        });

        return true;
      } catch (error) {
       
        return false;
      } finally {
        this.loading = false
        this.pending = false
      }
    },

    async fetchLesson() {
      try {
        const data = await ApiService.post('/course/lesson/list/'+this.formfitter.course_id, this.formsearchcourse).then(response => {
          this.lessonlist = response.data.data;
        });
        return true;
      } catch (error) {
        return false;
      }
    },

    async fetchReport() {
     
      const data = await ApiService.get('/course/log/lesson/'+this.formfitter.cs_id+'/'+this.formfitter.year).then(response => {
        this.reportlog = response.data.data
        console.log(response.data);
    
      });
    }
    
   
   
   


  },

});
