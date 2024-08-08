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
    sortedbyASC: true,
    cg_id:1,
    myValue: null,
    formgroup:{
    },
    formsearchgroup: {
      page: 1,
      per_page: 50,
      search: '',
      active_include: [
        0,
        1
    ]
    },
    formcreategroup: {
      cg_name:"",
      user_id:null,
    },
    formclustersingle: {
      cg_amount_random:"",
      cg_id:"",
    },
    formeditgroup: {
      cg_name:"",
      user_id:null,
      cg_id:null
    },
    GetopenModalDe:false,
    group:[],
    total_group:"",
    clus:[],
    clustercourse:[],
    cct_id:null,
    GetopenModalGEdit:false,
    cg_amount_random:""
  }
  ),

  getters: {
    FormGroup(state) {
      return state.formcreategroup;
    },
    FormEditGroup(state) {
      return state.formeditgroup;
    },
    FormGroupCluster(state) {
      return state.formclustersingle;
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


    async SaveGroupCluster() {
   
      try {
        const data = await ApiService.post('/course/cluster/create/single/', this.formclustersingle).then(response => {
          return true;
        });
       
        return true;
      } catch (error) {
       // return navigateTo('/maintenance');
       return false;
      }
    },

    async fetchCourseCgIdGroup(id) {
      const data = await ApiService.get('/course/cluster/get/' + id).then(response => {
        this.clustercourse = response.data;

       
      });
    },

    async CheckdupicateGroup() {

      const index = await this.clustercourse.findIndex(item => item.cg_id === this.formclustersingle.cg_id)
      if (index > -1) {
        return false
      }
      return true
    },

    async SaveClusterSingle(id) {
      try {
        const data = await ApiService.post('/course/cluster/create/single/'+id, this.formclustersingle).then(response => {
          return true;
        });
       
        return true;
      } catch (error) {
       // return navigateTo('/maintenance');
       return false;
      }
 
    },

    async SaveClusterGroup(id) {
  
      try {
        const data = await ApiService.post('/course/cluster/create/'+id, this.clustercourse).then(response => {
          return true;
        });
       
        return true;
      } catch (error) {
       // return navigateTo('/maintenance');
       return false;
      }
 
    },

    async fetchCourseCgIdGroupUpdate(){

      const cg_random = {cg_amount_random:this.cg_amount_random}
      const cg = this.cct_id;

      try {
        const data = await ApiService.put('/course/cluster/view/'+cg,cg_random).then(response => {
   
return true;
        });
        return true;
      } catch (error) {
      
        return false
      }
   
    },

    async fetchCourseCgIdGroupEmtry(id){

  

      try {
        const data = await ApiService.delete('/course/cluster/empty/' + id).then(response => {
          return true;
          });
          return data;
      } catch (error) {
        return false;
      }
   
    },

    async DeleClusterSingle() {


      try {
        const data = await ApiService.delete('/course/cluster/view/' + this.cct_id).then(response => {
         
          return true;
          });
          return data;
      } catch (error) {
        return false;
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

    async ActiveGroup(item) {
 

      try {
        const data = await ApiService.get('/course/group/active/'+ item.active +'/'+item.cg_id).then(response => {
   return true
        });
        return data
      } catch (error) {
        return false;
      }

    },

    setCurrentPage(page) {
      this.formsearchgroup.page = page
    },

    async selectentires(data_entires) {
      this.formsearchgroup.per_page = data_entires;
      this.formsearchgroup.page = 1;
    },

    async fitter() {

    },

    sortLists(sortBy) {
 
      if (this.sortedbyASC) {
        this.group.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedbyASC = false;
      } else {
        this.group.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedbyASC = true;
      }
    },



  },

});
