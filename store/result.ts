import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";
import moment from "moment";

export const ResultStore = defineStore('result', {
  state: () => ({
    user_id: null,
    modaldelete:false,
    ShowNodataResult:false,
    mr_id:null,
    identification_number:null,
    myChoose:[],
    total_page:0,
    users: [],
    user:[],
    userall:[],
    result:[],
    resultUser:[],
    PopupDelete:false,
    IsCardInsert:false,
    IsCardEdit:false,
    IsCardListByUser:false,
    IsCardNoInsert:false,
    selectedValue: null,
    formuser: {
      page: 1,
      per_page: 5,
      search: ""
    },
    ap_learn_type: "2",
    date_event: "",
    dlt_code: "A",
    formresult: {
      mr_score: null,
      mr_learn_type: 1,
      mr_status: 'pass',
      dlt_code: "A",
      identification_number: null
    },
    formeditresult: {
      mr_score: null,
      mr_learn_type: null,
      mr_status: null,
      dlt_code: null,
      identification_number: null
    },
    myValue: '',
  }
  ),

  getters: {
    FormResult(state) {
      return state.formresult;
    },
    FormUpdateResult(state){
      return state.formeditresult;
    }
  },

  actions: {

    async ResetFetch() {
      this.formuser.page = 1
      this.formuser.per_page = 5
      this.formuser.search = ''

this.formresult.mr_score = null
this.formresult.mr_learn_type = 1
this.formresult.mr_status = 'pass'
this.formresult.dlt_code = "A"
this.formresult.identification_number = null

this.formeditresult.mr_score = null
this.formeditresult.mr_learn_type = null
this.formeditresult.mr_status = null
this.formeditresult.dlt_code = null
this.formeditresult.identification_number = null

    },
    async fetchUsers() {

     

        const data = await ApiService.post('/user/list?user_type=3', this.formuser).then(response => {
          this.user = response.data.data;
this.total_page = response.data.total_page

         

          
       
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
       //   this.result = response.data;
     //  console.log(response.data.user_id);
       const b = {user_prefrix:response.data.user_prefrix,user_id:response.data.user_id,user_firstname:response.data.user_firstname,user_lastname:response.data.user_lastname,user_phone:response.data.user_phone,detail:response.data.detail?.verify_account,identification_number:response.data.detail?.identification_number}
          this.userall.push(b);
          this.userall.sort((a, b) => a.user_id - b.user_id).map(item => item.user_id);
        });
      }
     
     // console.log(this.userall.sort());
      return this.userall;
  
   
    },
    async fetchResultByUser() {
      this.resultUser = [];

      try {
        const data = await ApiService.get('/main_result/list/?user_id='+this.user_id).then(response => {

          if(response.data.length > 0){
            this.resultUser = response.data;
            this.IsCardListByUser = true;
            this.ShowNodataResult = false;
          }else {
            this.ShowNodataResult = true;
     
         
          }
        });
        return data;
      } catch (error) {
        return false
      }
  },

    
    async fetchResult() {
   
      try {
        const data = await ApiService.get('/main_result/list/option/?dlt_code='+this.dlt_code+'&mr_learn_type='+ this.ap_learn_type +'&present_day='+this.date_event+'').then(response => {
          this.result = response.data;
         
        });
        return data;
      } catch (error) {
        return false
      }
    },


    async fetchDlt() {
      try {
        const data = await ApiService.get('/master_data/drivinglicense_type').then(response => {
        //  this.dlt = response.data;
        });
        return data;
      } catch (error) {
        return false
      }
    },
    setSelectedValue(value) {
      this.selectedValue = this.dtla;
    },
    async fetchUser() {
      try {
        const data = await ApiService.post('/user/list?user_type=3', this.formuser).then(response => {
          const user = [];
          for (var i = 0; i < response.data.data.length; i++) {
            const lt = { id: response.data.data[i].user_id, text: response.data.data[i].user_firstname + '-' + response.data.data[i].user_lastname }
            user.push(lt)
          }
          this.users = user;

        });
        return data;
      } catch (error) {
     
        return false
      }

    },
    async saveResult() {
this.formresult.user_id = parseInt(this.formresult.user_id);
this.formresult.mr_score = parseInt(this.formresult.mr_score);
this.formresult.mr_learn_type = parseInt(this.formresult.mr_learn_type);
      try {
        const data = await ApiService.post('/main_result/create',this.formresult).then(response => {
    
return true;
        });
        return true;
      } catch (error) {
      
        return false
      }

    },

    async updateResult(){
      const upd = {dlt_code:this.formeditresult.dlt_code,mr_learn_type:parseInt(this.formeditresult.mr_learn_type),mr_score:this.formeditresult.mr_score
        ,mr_status:this.formeditresult.mr_status,identification_number:this.formeditresult.identification_number}

      // return true;


      try {
        const data = await ApiService.put('/main_result/update/'+this.mr_id,upd).then(response => {
    
return true;
        });
        return true;
      } catch (error) {
      
        return false
      }

    },

    async DeleteResult() {
      try {
        const del = await ApiService.delete('/main_result/delete/' + this.mr_id);

        return true;
      
      } catch (error) {
        return error;
      }

    }


  },

});
