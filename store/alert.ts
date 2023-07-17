import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';




export const AlertStore = defineStore('alert', {
  state: () => ({
    show:false,
    message:'',
    typeclass:''


  }    
),


  getters: {

    AlertShow(state){
        return state.show;
    },
    MessageShow(state){
        return state.message;
    },
    TypeclassShow(state){
        return state.typeclass;
    },

  },
  
  actions: {

    AlertSuccess(){
        this.show = true;
        this.message = 'Save success'
        this.typeclass = 'alert-light-success';
    },
    Clear(){
        this.show = false;
        this.message = ''
        this.typeclass = '';
    },
    AlertError(){
        this.show = true;
        this.message = 'Fail Save Data'
        this.typeclass = 'alert-light-danger';
    },




  

  },
});
