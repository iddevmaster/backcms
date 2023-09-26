import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';
import ApiService from '../services/api.service';
import moment from 'moment';




export const AppointStore = defineStore('appoint', {
  state: () => ({
    isOpen: false,
    isDelAP: false,
    searchData: "",
    start_date: '',
    reservebyap: [],
    users: [],
    usersall:[],
    user_id:null,
    end_date: '',
    dtl_code: 'A',
    myChoose:null,
    ap_id: null,
    isShowModal: false,
    total_page: null,
    limit_page: null,
    current_page: null,
    total_filter: null,
    total: null,
    itemsPerPage: 3,
    del_ap:null,
    deluser_id:null,
    ardel_id:null,
    form: {
      ap_learn_type: "1",
      date_event: "",
      dtl_code: "A1",
    },
    myValue:null,
    formuser: {
      page: 1,
      per_page: 250,
      search: ""
    },
    formsearch: {
      page: 1,
      per_page: 5,
      search: ""
    },
    formedit: {
      ap_learn_type: null,
      ap_quota: null,
      ap_date_start: null,
      ap_date_end: null,
      ap_remark: null,
      user_id: null,
      dtl_code: null,
    },
    selectedTimeZone: 'Asia/Bangkok',
    locale: 'en',
    dateFormat: 'yyyy-MM-dd HH:mm:ss',
    forminsert: {
      ap_learn_type: 1,
      ap_quota: "",
      ap_date_start: null,
      ap_date_end: null,
      ap_remark: "",
      user_id: "",
      dtl_code: "A1",
    },
    formserchrreserve: {
      page: 1,
      per_per: 3,
      search: ""
    },
    group: [],
    // end_date:moment(String(null)).format('YYYY-mm-dd'),
    dtl: [
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
    FormEdit(state) {
      return state.formedit;
    },
  },

  actions: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isShowModal = false;
      this.isDelAP = false;
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
      const appdata = {
        date_event: this.form.date_event,
        ap_learn_type: this.form.ap_learn_type,
        dlt_code: this.form.dtl_code,
        user_id: parseInt(this.form.user_id)
      }

      try {
        const data = await ApiService.post('/appointment/list', appdata).then(response => {
          this.group = response.data
        });
        return true

      } catch (error) {
        console.log('error');
        return false;
      }
    },



    async fetchAppointmentId() {
      try {
        const data = await ApiService.get('/appointment/get/' + this.ap_id).then(response => {
          if (response.data) {
            this.formedit.ap_quota = response.data.ap_quota
            this.formedit.ap_remark = response.data.ap_remark
            this.formedit.ap_learn_type = response.data.ap_learn_type
            this.formedit.dtl_code = response.data.dlt_code

console.log(response.data.ap_date_start);
            const date_start = this.changeTypeTimeZonebefore(response.data.ap_date_start);
            const date_end = this.changeTypeTimeZonebefore(response.data.ap_date_end);

          

            this.formedit.ap_date_start = date_start;
            this.formedit.ap_date_end = date_end

            return true
          } else {
            return false;
          }
        });
        return data
      } catch (error) {
        return false;
      }
    },




    async SaveFormAPP() {
const date_start = await this.changeTypeTimeZonebefore(this.forminsert.ap_date_start);
console.log(date_start)
      
      const savet = {
        ap_learn_type: parseInt(this.forminsert.ap_learn_type), ap_quota: this.forminsert.ap_quota, ap_date_start: this.forminsert.ap_date_start, ap_date_end: this.forminsert.ap_date_end, ap_remark: this.forminsert.ap_remark,
        dlt_code: this.forminsert.dtl_code, user_id: this.forminsert.user_id
      }

      // try {
      //   const data = await ApiService.post('/appointment/create', savet).then(response => {
      //     console.log(response);
      //   });
      //   return true
      // } catch (error) {
      //   return false;
      // }


    },

    async Update() {


      const date_start = await this.changeTypeTimeZoneafter(this.formedit.ap_date_start);
      const date_end = await this.changeTypeTimeZoneafter(this.formedit.ap_date_end);
      const learn_type = parseInt(this.formedit.ap_learn_type);
      //  const date_end =  await this.changeTypeTimeZone(this.formedit.ap_date_end);

      // this.formedit.ap_date_end = await this.changeFormate(this.formedit.ap_date_end);
      const upd = {
        ap_learn_type: learn_type, ap_quota: this.formedit.ap_quota, ap_date_start: date_start, ap_date_end: date_end, ap_remark: this.formedit.ap_remark,
        dlt_code: this.formedit.dtl_code, user_id: this.formedit.user_id
      }
console.log(upd);

      try {
        const data = await ApiService.put('/appointment/update/' + this.ap_id, upd).then(response => {
          console.log(response);
        });


        return true
      } catch (error) {
        return false;
      }

      return true;
    },

    async search() {

    },
    async deleteItem(item) {
      this.ap_id = item.ap_id
      this.isShowModal = true;
    },
    async deleteApp() {
      try {
        const del = await ApiService.delete('/appointment/delete/' + this.ap_id);
        this.isShowModal = false;
        return true;
      } catch (error) {
        return false;
      }
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
    },
    async changeTypeTimeZoneafter(item) {
      const date = ref(new Date(item));
      const startdate = item.toISOString().slice(0, -5) + '-14:00';  /////แปลงเวลา
      const aa = moment.utc(startdate).format().slice(0, -1)
      return aa;
    },
    changeTypeTimeZonebefore(time) {

      let a = time.slice(0, -5) + '+07:00';
      let b = moment.utc(a)
      const c = new Date(b);
      return c;
    },

    async FetchAP() {
      this.reservebyap = [];
      try {
        const data = await ApiService.post('/appointment/reserve/get/' + this.ap_id, this.formserchrreserve).then(response => {
          if (response.data) {
            this.reservebyap = response.data.data
            this.total_page = response.data.total_page
            this.limit_page = response.data.limit_page
            this.current_page = response.data.current_page
            this.total_filter = response.data.total_filter
            this.total = response.data.total
            return true;

          } else {
            return false;
          }

        });
        return data;
      } catch (error) {
        return false
      }
    },

    selectentiresap(data_entires) {
      this.formserchrreserve.per_page = data_entires;
      this.formserchrreserve.page = 1;
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

    async fetchUsers() {
      try {
        const data = await ApiService.post('/user/list?user_type=3', this.formsearch).then(response => {

          this.usersall = response.data.data;
        
        });
  
      } catch (error) {
        return false;
      }
 

    },



    async deleteRerve() {
const del = {user_id:this.deluser_id,ap_id:this.del_ap}
try {
  const data = await ApiService.delete('appointment/reserve/delete/'+this.ardel_id, del).then(response => {
return true
  });
  return data;
} catch (error) {
 
  return false
}
    },

    async SaveFormreserve() {
const savereser = {user_id:this.myChoose.user_id,ap_id:this.ap_id}
try {
  const data = await ApiService.post('/appointment/reserve/create', savereser).then(response => {
console.log(response);
return true;
  
  });
  return data;
} catch (error) {
  return false;
}

    },

    async CheckVerify(item) {
      try {
        const data = await ApiService.get('/user/get/' + item.user_id).then(response => {
          console.log(response);
        
    
          if(Object.keys(response.data.detail).length === 0){

            return false;
         
          }else {
          
            return true;
            
          }
        
        });
        return data;
      } catch (error) {
     
      } finally {
   
      }

    }






  },

});
