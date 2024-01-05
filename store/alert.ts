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
        this.message = 'ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ'
        this.typeclass = 'alert-light-success';
    },
    Clear(){
        this.show = false;
        this.message = ''
        this.typeclass = '';
    },
    AlertError(){
        this.show = true;
        this.message = 'ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ'
        this.typeclass = 'alert-light-danger';
    },




  

  },
});
