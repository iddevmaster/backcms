import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";
import moment from 'moment';

export const GroupStore = defineStore('group', {
  state: () => ({
    user_id: null,
    isLoading:true,
    GetopenModalCreate:false,
    GetopenModalEdit:false,
    GetopenModal:false,
    cg_id:null,
    formgroup:{

    },
    formsearchgroup: {
      page: 1,
      per_page: 5,
      search: '',
    },
    formcreategroup: {
      cg_name:"",
      user_id:null,
    },
    formeditgroup: {
      cg_name:"",
      user_id:null,
      cg_id:null
    },
    group:[],

  }
  ),

  getters: {
    FormGroup(state) {
      return state.formcreategroup;
    },
    FormEditGroup(state) {
      return state.formeditgroup;
    },
  
  },

  actions: {


    async fetchGrouplist() {
      try {
        const data = await ApiService.post('/course/group/all', this.formsearchgroup).then(response => {

          this.group = response.data.data
          this.group_total_page = response.data.total_page
          this.group_limit_page = response.data.limit_page
          this.group_current_page = response.data.current_page
          this.group_total_filter = response.data.total_filter
          this.group_total = response.data.total
        });
        this.isLoading = false;
        return true;
      } catch (error) {
       // return navigateTo('/maintenance');
      }
    },


    async SaveGroup() {
   
      try {
        const data = await ApiService.post('/course/group/create', this.formcreategroup).then(response => {
          return true;
        });
       
        return true;
      } catch (error) {
       // return navigateTo('/maintenance');
      }
    },

    async UpdateGroup() {

      try {
        const data = await ApiService.put('/course/group/update/'+ this.formeditgroup.cg_id, this.formeditgroup).then(response => {
          if(response.status == 200){
            return true;
          }else {
            return false;
          }
        });
        return data
      } catch (error) {
        return false;
      }
  

    },
    async DeleteGroup() {
    
      try {
        const data = await ApiService.delete('/course/group/delete/'+ this.cg_id).then(response => {
          if(response.status == 200){
            return true;
          }else {
            return false;
          }
        });
        return data
      } catch (error) {
        return false;
      }

    },

    setCurrentPage(page) {
      this.formsearchgroup.page = page
    },


  },

});
