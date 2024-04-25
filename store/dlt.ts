import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";
import moment from 'moment';

export const DltStore = defineStore('dlt', {
  state: () => ({
    user_id: null,
    dlt_code: "",
    isDelete:false,
    isAdd:true,
    isEdit:false,
    front_img: null,
    back_img: null,
    image: null,
    user_firstname:null,
    user_lastname:null,
    image_url:null,
    imagelist: null,
    imagelistFront: null,
    imagelistBack: null,
    time:8640000,
    disabledDates: { ////f
      from: null,
    },
    disabledDatesEnd: {
      to: null,
    },
  
    name: null,
    id: null,
    ap_id:null,
    formdtl: {
      front_img: "",
      back_img: "",
      dlt_code: 'A',
      issue_date: "",
      expiry_date: "",
      user_id: null
    },

    formadddtl: {
      front_img: "",
      back_img: "",
      dlt_code: 'A',
      issue_date: "",
      expiry_date: "",
      user_id: null
    },
    dtlall: [],
    mydtla: [],

  }
  ),

  getters: {
    FormDlt(state) {
      return state.formdtl;
    },
    FormDLTadd(state) {
      return state.formadddtl;
    },

  },

  actions: {
    async fetchUser() {
      try {
        const data = await ApiService.post('/user/get/85').then(response => {

        });

        return true

      } catch (error) {
      
        return false;
      } finally {

      }

    },
    async fetchDlt(id) {
      this.user_id = id
      this.formdtl.user_id = id
      try {
        const data = await ApiService.get('/user/get/' + id).then(response => {
          if (response.data) {
         
            this.name = response.data.user_name;
            this.user_firstname = response.data.user_firstname;
            this.user_lastname = response.data.user_lastname;
           this.image_url = response.data.detail?.user_img;
     
            this.getDLT();
            return true;
          } else {
            return false;
          }

        });

        return data

      } catch (error) {

        return false;
      }

    },

    async getDLT() {
      const mydlt = [];
      try {
        const data = await ApiService.get('/dlt_card/list/?user_id=' + this.user_id).then(response => {
          this.dtlall = response.data;
        
       
          if (response.data.length > 0) {
            const sto = AppointStore();
             
            for (let i = 0; i < response.data.length; i++) {
              let a = sto.dlt.find(x => x.dlt_code === response.data[i].dlt_code)
             
              mydlt.push(a);
            }
            this.mydtla = mydlt;
          }

        });
        return data
      } catch (error) {
        return false;
      }

    },
    async SelectgetDLT(item) {

      this.imagelistFront = null
      this.imagelistBack = null

      let a = this.dtlall[item];
      this.formdtl.front_img = a.front_img
      this.formdtl.back_img = a.back_img
      this.formdtl.dlt_code = a.dlt_code
      this.formdtl.issue_date = moment(a.issue_date).format("YYYY-MM-DD");
      this.formdtl.expiry_date = moment(a.expiry_date).format("YYYY-MM-DD");
//       console.log(this.formdtl.issue_date);
// this.disabledDates.from = this.formdtl.issue_date;
// this.disabledDatesEnd.to = this.formdtl.expiry_date;

this.disabledDatesEnd.to = new Date(this.formdtl.issue_date);
this.disabledDates.from = new Date(this.formdtl.expiry_date);

      this.formdtl.user_id = this.user_id;
      this.id = a.id;


      this.formadddtl.front_img = ""
      this.formadddtl.back_img = ""
      this.formadddtl.dlt_code = 'A1'
      this.formadddtl.user_id = this.user_id;

     
    },

    async SaveFormDlt() {
      let upload = await this.UploadfileAddImage();
      try {
        const data = await ApiService.post('/dlt_card/create/', this.formadddtl).then(response => {
          
        });

        return true

      } catch (error) {
        return false;
      }


    },
    async fetchDltid() {

    },
    async Updatedtl() {
     
      let upload = await this.UploadfileImage();
      //  const data = await ApiService.put('/dlt_card/update/' + this.user_id,this.formdtl).then(response => {
      // });
      this.formdtl.expiry_date = moment(this.formdtl.expiry_date).format("YYYY-MM-DD");
      this.formdtl.issue_date = moment(this.formdtl.issue_date).format("YYYY-MM-DD");
     
      try {
        const data = await ApiService.put('/dlt_card/update/' + this.id, this.formdtl).then(response => {
          
        });

        return true;
      } catch (error) {
        return false
      }


    },
    async Delete() {

    },

    async CheckForm() {
      this.formadddtl.issue_date = ""
      this.formadddtl.expiry_date = ""
      this.isAdd = true;
      this.isEdit = false;
      this.isDelete = false;


    },

    async ResetForm() {
this.formadddtl.front_img = "";
this.formadddtl.back_img = "";
this.formadddtl.issue_date = "";
this.formadddtl.expiry_date = "";

    },

    async UploadfileImage() {
      if (this.imagelistFront) {
        let formData = new FormData();
        formData.append('files', this.imagelistFront);
        const data = await ApiService.upload('/media_file/upload/file', formData);
        this.formdtl.front_img = data.data[0].path
      }
      if (this.imagelistBack) {
        let formData = new FormData();
        formData.append('files', this.imagelistBack);
        const data = await ApiService.upload('/media_file/upload/file', formData);
        this.formdtl.back_img = data.data[0].path
        return true
      }
    },

    async UploadfileAddImage() {
      if (this.imagelistFront) {
        let formData = new FormData();
        formData.append('files', this.imagelistFront);
        const data = await ApiService.upload('/media_file/upload/file', formData);
        this.formadddtl.front_img = data.data[0].path
      }
      if (this.imagelistBack) {
        let formData = new FormData();
        formData.append('files', this.imagelistBack);
        const data = await ApiService.upload('/media_file/upload/file', formData);
        this.formadddtl.back_img = data.data[0].path
        return true
      }
    },

    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
   async delete(){
      try {
        const data = await ApiService.delete('/dlt_card/delete/' + this.id).then(response => {
          this.isAdd = false;
          this.isEdit = false;
          this.isDelete = true;
          return true;
        });
        return data;
      } catch (error) {
        return false
      }
    },



  },

});
