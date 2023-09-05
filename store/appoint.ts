import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';
import ApiService from '../services/api.service';
import moment from 'moment';




export const AppointStore = defineStore('appoint', {
  state: () => ({
    isOpen: false,
    searchData:"",
    start_date:'',
    end_date:'',
    dtl_code:'A',
    user_id:null,
    ap_id:null,
    isShowModal:false,
    form:{
      ap_learn_type:"1",
      date_event:"",
      dtl_code:"A1",
    },
    selectedTimeZone: 'Asia/Bangkok',
    locale: 'en',
    dateFormat: 'yyyy-MM-dd HH:mm:ss',
    forminsert:{
      ap_learn_type:1,
      ap_quota:"",
      ap_date_start:null,
      ap_date_end:null,
      ap_remark:"",
      user_id:"",
      dtl_code:"A1",
    },
    group:[],
    // end_date:moment(String(null)).format('YYYY-mm-dd'),
    dtl:[
      {
        dlt_code: "A",
        dlt_description:
          "ใบอนุญาตขับรถประเภท A รถจักรยานยนต์สองล้อ เครื่องยนต์ไม่เกิน 125 cc.",
      },
      {
        dlt_code: "A1",
        dlt_description:
          "ใบอนุญาตขับรถประเภท A1 รถจักรยานยนต์สองล้อ เครื่องยนต์ 125 cc. ขึ้นไป",
      },
      {
        dlt_code: "A2",
        dlt_description:
          "ใบอนุญาตขับรถประเภท A2 รถสามล้อส่วนตัว, รถสองล้อ และรถสามล้อโดยสาร",
      },
      {
        dlt_code: "A3",
        dlt_description:
          "ใบอนุญาตขับรถประเภท A3 รถแทรกเตอร์แบบมีล้อ และรถปราบดิน",
      },
      {
        dlt_code: "B",
        dlt_description:
          "ใบอนุญาตขับรถประเภท B รถยนต์ที่น้าหนักรวมน้อยกว่า 3,500 กิโลกรัม ไม่เกิน 9 ที่นั่ง รวมผู้ขับรถ",
      },
      {
        dlt_code: "C",
        dlt_description:
          "ใบอนุญาตขับรถประเภท C รถขนส่งสินค้าน้าหนักรวมตั้งแต่ 3,500 ถึง 7,500 กิโลกรัม",
      },
      {
        dlt_code: "C1",
        dlt_description:
          "ใบอนุญาตขับรถประเภท C1 รถขนส่งสินค้าน้าหนักรวมตั้งแต่ 7,500 ถึง 15,000 กิโลกรัม",
      },
      {
        dlt_code: "C2",
        dlt_description:
          "ใบอนุญาตขับรถประเภท C2 รถขนส่งสินค้า น้าหนักรวม 15,000 กิโลกรัม ขึ้นไป",
      },
      {
        dlt_code: "D",
        dlt_description:
          "ใบอนุญาตขับรถประเภท D รถขนส่งผู้โดยสาร ประเภท 4 ล้อขึ้นไป ไม่เกิน 15 ที่นั่ง",
      },
    ]
  }

  ),


  getters: {

    Ismodal(state) {
      return state.isOpen;
    },
  
    FormInsert(state) {
      return state.forminsert;
    },
  },

  actions: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isShowModal = false;
    },

  
    setCurrentPage(page) {
      this.page = page
      this.selected = [];
      this.isAllSelected = false
    },

    sortLists(sortBy) {
      if (this.sortedbyASC) {
        this.posts.data.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedbyASC = false;
      } else {
        this.posts.data.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedbyASC = true;
      }
    },

    selectentires(data_entires) {
      this.per_page = data_entires;
      this.page = 1;
    },

    async fetchAppointment() {

      const a = {
        date_event:this.form.date_event,
        ap_learn_type:this.form.ap_learn_type,
        dlt_code:this.form.dtl_code
      }
   
      try {
        const data = await ApiService.post('/appointment/list',a).then(response => {
       this.group = response.data
        });
        return true

      } catch (error) {
        console.log('error');
        return false;
      }

    },



    async SaveFormAPP() {
     this.forminsert.ap_date_start = await this.changeFormate(this.forminsert.ap_date_start);
     this.forminsert.ap_date_end = await this.changeFormate(this.forminsert.ap_date_end);
     const savet = {ap_learn_type:this.forminsert.ap_learn_type,ap_quota:this.forminsert.ap_quota,ap_date_start:this.forminsert.ap_date_start,ap_date_end:this.forminsert.ap_date_end,ap_remark:"Test",
     dlt_code:this.forminsert.dtl_code,user_id:this.forminsert.user_id
    }

      try {
        const data = await ApiService.post('/appointment/create',savet).then(response => {
        });
        return true
      } catch (error) {
        return false;
      }

     
    },
  
    async search() {
      
    },
    async deleteItem(item) {
      this.ap_id = item.ap_id
      this.isShowModal = true;
    },
    async deleteApp() {
      this.isShowModal = false;
      return true;
   
    },

    async ResetForm() {   ////reset Form
    
    },

    async Zipcode() {
    
    },
    async Country() {
    
    },

    async UploadfileProfile() {
     
 
    },
    async changeFormate(a) {
      return a.toISOString().slice(0, -5);
    }

 
  },

});
