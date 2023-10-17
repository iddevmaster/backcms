import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
import moment from "moment";

export const LogStore = defineStore('result', {
  state: () => ({
    datacollection: {
      labels: ['ມັງກອນ', 'ກຸມພາ', 'ມີເຄື່ອງໝາຍ.','ເດືອນເມສາ','ອາດ','ເດືອນມິຖຸນາ','ກໍລະກົດ','ສິງຫາ','ກັນຍາ','ຕຸລາ','ພະຈິກ','ທັນວາ'],
      datasets: [{
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [0, 0, 0,0,0,0,0,0,0,0,0,0]
      }]
    },
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
    //  this.datacollection.datasets[0].data = [Math.random() * 50, Math.random() * 50, Math.random() * 50];
      const data = await ApiService.get('/course/log/lesson/'+this.formfitter.cs_id+'/'+this.formfitter.year).then(response => {
        const report = [];
        for (var i = 0; i < response.data.length; i++) {
          report.push(response.data[i].total);
        }
        
        this.reportlog = report
   

      });
    }
    
   
   
   


  },

});
