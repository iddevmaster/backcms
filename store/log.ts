import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";
import moment from "moment";

export const LogStore = defineStore('log', {
  state: () => ({
   
    datacollectionreserve: {
      labels: ['ມັງກອນ', 'ກຸມພາ', 'ມີນາ.','ເມສາ','ພຶດສະພາ','ມິຖຸນາ','ກໍລະກົດ','ສິງຫາ','ກັນຍາ','ຕຸລາ','ພະຈິກ','ທັນວາ'],
      datasets: [{
        label: 'Report Reserve',
        backgroundColor: '#79f8791',
        data: [0, 0, 0,0,0,0,0,0,0,0,0,0]
      }]
    },
    datacollection: {
      labels: ['ມັງກອນ', 'ກຸມພາ', 'ມີນາ.','ເມສາ','ພຶດສະພາ','ມິຖຸນາ','ກໍລະກົດ','ສິງຫາ','ກັນຍາ','ຕຸລາ','ພະຈິກ','ທັນວາ'],
      datasets: [{
        label: 'Report E-learning',
        backgroundColor: '#79f879',
        data: [0, 0, 0,0,0,0,0,0,0,0,0,0]
      }]
    },
    datacollectionexam: {
      labels: ['ມັງກອນ', 'ກຸມພາ', 'ມີນາ.','ເມສາ','ພຶດສະພາ','ມິຖຸນາ','ກໍລະກົດ','ສິງຫາ','ກັນຍາ','ຕຸລາ','ພະຈິກ','ທັນວາ'],
      datasets: [{
        label: 'Report Exam',
        backgroundColor: '#7979f8',
        data: [0, 0, 0,0,0,0,0,0,0,0,0,0]
      }]
    },
    type:'all',
    user_id: null,
    modaldelete:false,
    mr_id:null,
    identification_number:null,
    courselist: [],
    lessonlist:[],
    reportlog:[],
    reportrev:[],
    reportexam:[],
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
      year:new Date().getFullYear(),
      type:1
    },
    formrev:{
      year:new Date().getFullYear(),
      dlt_code:'A'
    },
    formexam:{
      year:new Date().getFullYear(),
      dlt_code:'A'
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


    async fetchCourslistLog() {
      try {
        const data = await ApiService.post('/course/list', this.formsearchcourse).then(response => {
          this.courselist = response.data.data
        });

        return true;
      } catch (error) {
       
        return false;
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

      
      if(this.formfitter.type == '1'){
        
        const report = [];
        const data = await ApiService.get('/log/lesson/'+this.formfitter.cs_id+'/'+this.formfitter.year).then(response => {
          for (var i = 0; i < response.data.length; i++) {
            report.push(response.data[i].total);
          }
          this.reportlog = report
        }); 
      }

      if(this.formfitter.type == '2'){
   
        const report = [];
        const data = await ApiService.get('/log/course/'+this.formfitter.course_id+'/'+this.formfitter.year).then(response => {
          for (var i = 0; i < response.data.length; i++) {
            report.push(response.data[i].total);
          }
          this.reportlog = report
        }); 
      }

      if(this.formfitter.type == '3'){
      
        const report = [];
        const data = await ApiService.get('/log/course/'+this.formfitter.course_id+'/'+this.formfitter.year+'?user_id='+ this.formfitter.user_id).then(response => {
          for (var i = 0; i < response.data.length; i++) {
            report.push(response.data[i].total);
          }
          this.reportlog = report
        }); 
      }
    //  this.datacollection.datasets[0].data = [Math.random() * 50, Math.random() * 50, Math.random() * 50];

    },

    async fetchLogReserve() {
      const reserv = [];
      const data = await ApiService.get('log/appointment/reserve/'+this.formrev.dlt_code+'/'+this.formrev.year).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          reserv.push(response.data[i].total);
        }
       this.reportrev = reserv
      
      }); 
    },
    
    async fetchLogExam() {
      const exam = [];
      const data = await ApiService.get('log/exam/'+this.formexam.dlt_code+'/'+this.formexam.year).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          exam.push(response.data[i].total);
        }
       this.reportexam = exam
  
       
      }); 
    },


    async FillterType() {
    
   
    
    }
   
   
   


  },

});
