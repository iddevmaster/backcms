import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';
import ApiService from '@/services/api.service';
import moment from 'moment';




export const AppointStore = defineStore('appoint', {
  state: () => ({
    isOpen: false,
    isDelAP: false,
    AlertEndtime: false,
    isDelUser: false,
    ChooseBefore: false,
    searchData: "",
    event: [],
    user: [],
    userall: [],
    total_page_user: 0,
    start_date: '',
    reservebyap: [],
    selectedRow: {
      user_id:null
    },
    app_present: [],
    app_user: [],
    users: [],
    usersall: [],
    user_id: null,
    end_date: '',
    dlt_code: [ "A", "A1", "A2", "A3", "B", "C1", "C", "C2" ],
    myChoose: null,
    ap_id: null,
    user_id_fitter: null,
    isShowModal: false,
    total_page: null,
    limit_page: null,
    current_page: null,
    total_filter: null,
    total: null,
    disabledDates: new Date(), 
    disabledDatesEnd: new Date(), 
    itemsPerPage: 3,
    del_ap: null,
    deluser_id: null,
    ardel_id: null,
    form: {
      ap_learn_type: "2",
      date_event: 0,
      dlt_code: "A1",
    },
    myValue: null,
    formuser: {
      page: 1,
      per_page: 5,
      search: "",
      verify_account: "",
      user_id: "",
    },
    formsearch: {
      page: 1,
      per_page: 5,
      search: ""
    },
    formreserve: {
      dlt_code: 'A1',
      ap_learn_type: 1,
      present_day: ''
    },


    formedit: {
      ap_learn_type: null,
      ap_quota: null,
      ap_date_start: null,
      ap_date_end: null,
      ap_remark: null,
      user_id: null,
      dlt_code: null,
    },
    selectedTimeZone: 'Asia/Bangkok',
    locale: 'en',
    dateFormat: 'yyyy-MM-dd HH:mm:ss',
    forminsert: {
      ap_learn_type: '2',
      ap_quota: "",
      ap_date_start: null,
      ap_date_end: null,
      ap_remark: "",
      user_id: "",
      dlt_code: "A1",
    },
    formserchrreserve: {
      page: 1,
      per_per: 3,
      search: ""
    },
    group: [],
    // end_date:moment(String(null)).format('YYYY-mm-dd'),
    dlt: [
      {
          "dlt_code": "A",
          "dlt_name_lo": "ລົດຈັກສອງລໍ້ ຄວາມແຮງບໍ່ເກີນ 125 cc",
          "dlt_name_eng": "Two-wheels motocycle engine not exceed 125 cc"
      },
      {
          "dlt_code": "A1",
          "dlt_name_lo": "ລົດຈັກສອງລໍ້ ຄວາມແຮງ ແຕ່ 125 cc ຂື້ນໄປ",
          "dlt_name_eng": "Two-wheels motorcycle engine 125 cc and above"
      },
      {
          "dlt_code": "A2",
          "dlt_name_lo": "ລົດຈັກສາມລໍ້ສ່ວນຕົວ, ລົດສອງລໍ້ ແລະ ສາມລໍ້ໂດຍສານ",
          "dlt_name_eng": "Private three-wheels vehicle, Passenger vehicle with two-wheels and three-wheels"
      },
      {
          "dlt_code": "A3",
          "dlt_name_lo": "ລົດໄຖນາທີ່ແກ່ລໍ້ ແລະ ລົດຕ໋ອກໆ",
          "dlt_name_eng": "Two-wheels tractor with trailer and Walk-behide Tractor"
      },
      {
          "dlt_code": "B",
          "dlt_name_lo": "ລົດເບົາ ສີ່ລໍ້ ທີ່ມີນ້ຳໜັກລວມບໍ່ເກີນ 3.500 ກິໂລກຣາມ ແລະ ບໍ່ເກີນ 9 ບ່ອນນັ່ງ ລວມທັງຜູ້ຂັບຂີ່",
          "dlt_name_eng": "Car with four-wheels, total weight not exceed 3,500 kilograms, and not more than 9 seats including driver"
      },
      {
          "dlt_code": "C",
          "dlt_name_lo": "ລົດຂົນສົ່ງສິນຄ້ານ້ຳໜັກລວມ ແຕ່ 3.500 ກິໂລກຣາມ ຫາ 7.500 ກິໂລກຣາມ",
          "dlt_name_eng": "Cargo truck, total weight from 3,500 to 7,500 kilograms"
      },
      {
          "dlt_code": "C1",
          "dlt_name_lo": "ລົດຂົນສົ່ງສິນຄ້ານ້ຳໜັກລວມ ເກີນກວ່າ 7.500ກິໂລກຣາມ ຫາ 15.000 ກິໂລກຣາມ",
          "dlt_name_eng": "Cargo truck, total weight exceed 7,500 kilogram up to 15,000 kilograms"
      },
      {
          "dlt_code": "C2",
          "dlt_name_lo": "ລົດຂົນສົ່ງສິນຄ້ານ້ຳໜັກລວມ ເກີນກວ່າ 15.000 ກິໂລກຣາມ",
          "dlt_name_eng": "Cargo truck, total weight exceed 15,000 kilograms"
      },
      {
          "dlt_code": "D",
          "dlt_name_lo": "ລົດຂົນສົ່ງຜູ້ໂດຍສານປະເພດ 4 ລໍ້ ຂຶ້ນໄປ, ບໍ່ເກີນ ສິບຫ້າ ບ່ອນນັ່ງ",
          "dlt_name_eng": "Passenger vehicle with 4 wheels or more, not more than 15 seats"
      },
      {
          "dlt_code": "D1",
          "dlt_name_lo": "ລົດຂົນສົ່ງຜູ້ໂດຍສານ ແຕ່ ສິບຫົກ ຫາ ສາມສິບຫ້າ ບ່ອນນັ່ງ",
          "dlt_name_eng": "Passenger vehicle from 16 seats to 35 seats"
      },
      {
          "dlt_code": "D2",
          "dlt_name_lo": "ລົດຂົນສົ່ງຜູ້ໂດຍສານ ແຕ່ ສາມສິບຫົກ ບ່ອນນັ່ງ ຂຶ້ນໄປ",
          "dlt_name_eng": "Passenger vehicle from 36 seats or more"
      },
      {
          "dlt_code": "E",
          "dlt_name_lo": "ລົດເບົາ (B), ລົດຂົນສົ່ງສິນຄ້າ (C) ແລະ ລົດຂົນສົ່ງຜູ້ໂດຍສານ (D) ທີ່ແກ່ຫາງລາກນ້ຳໜັກລວມບໍ່ເກີນ 750 ກິໂລກຣາມ",
          "dlt_name_eng": "Car (B), Cargo truck (C) and Passenger vehicle (D), having trailer total weight not exceed 750 kilograms"
      },
      {
          "dlt_code": "E1",
          "dlt_name_lo": "ລົດຂົນສົ່ງສິນຄ້າ (C2) ແກ່ຫາງລາກນ້ຳໜັກລວມເກີນກວ່າ 750 ກິໂລກຣາມ",
          "dlt_name_eng": "Cargo truck (C2) having trailer total weight exceed 750 kilograms"
      }
    ],
    dlt_today:{
      A_1:[],
      A_2:[],
      A1_1:[],
      A1_2:[],
      A2_1:[],
      A2_2:[],
      A3_1:[],
      A3_2:[],
      B_1:[],
      B_2:[],
      C_1:[],
      C_2:[],
      C1_1:[],
      C1_2:[],
      C2_1:[],
      C2_2:[],
      D_1:[],
      D_2:[],
      D1_1:[],
      D1_2:[],
      D2_1:[],
      D2_2:[],
      E_1:[],
      E_2:[],
      E1_1:[],
      E1_2:[],
    },
    cancelapp:false,
    verify:true,
    theoryscore:false,
    practicalscore :false,
    formselectapp:{
      user_id:null,
      user_full_name:"",
      identification_number:null,
      ap_id: null,
      st_id:""
    },
    searchapp:{
      ap_number:null
    }
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

    async ResetFetch() {

      this.forminsert.ap_learn_type = 2
      this.forminsert.ap_quota = ""
      this.forminsert.ap_date_start = null
      this.forminsert.ap_date_end = null
      this.forminsert.ap_remark = ""
      this.forminsert.dlt_code = "A1"

    },

    async fetchAppointment() {

      this.form.date_event = 0;
      const appdata = {
        ap_learn_type: this.form.ap_learn_type,
        dlt_code: this.form.dlt_code
      }
      this.group = []

      try {
        this.event = []
        const data = await ApiService.get('/appointment/event/?ap_learn_type=' + parseInt(this.form.ap_learn_type) + '&dlt_code=' + this.form.dlt_code + '').then(response => {

          if (response.data.length > 0) {
            this.event = response.data
            //  this.form.date_event = response.data[0].event
          }


          //this.form.date_event = response.data[0].event
        });


      } catch (error) {
        return navigateTo('/maintenance');
      }

    },


    async fetchAppointmentEvent() {
      const appdata = {
        date_event: this.form.date_event,
        ap_learn_type: this.form.ap_learn_type,
        dlt_code: this.form.dlt_code
      }
      this.group = []

      try {
        const data = await ApiService.post('/appointment/list', appdata).then(response => {
          this.group = response.data

        });
        return true

      } catch (error) {

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
            this.formedit.dlt_code = response.data.dlt_code


            // const date_start = this.changeTypeTimeZonebefore(response.data.ap_date_start);
            // const date_end = this.changeTypeTimeZonebefore(response.data.ap_date_end);



            this.formedit.ap_date_start = response.data.ap_date_start;
            this.formedit.ap_date_end = response.data.ap_date_end

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
      // const date_start = await this.changeTypeTimeZonebefore(this.forminsert.ap_date_start);
      // console.log(date_start)
      // console.log(this.forminsert.ap_date_start)

      // const date = ref(new Date(this.forminsert.ap_date_start).toString());



      const currentDate = new Date(this.forminsert.ap_date_start);
      const currentDateEnd = new Date(this.forminsert.ap_date_end);

      currentDate.setHours(currentDate.getHours() + 7);
      currentDateEnd.setHours(currentDateEnd.getHours() + 7);
      const date_start = await this.changeFormate(currentDate)
      const date_end = await this.changeFormate(currentDateEnd)




      const savet = {
        ap_learn_type: parseInt(this.forminsert.ap_learn_type), ap_quota: this.forminsert.ap_quota, ap_date_start: date_start, ap_date_end: date_end, ap_remark: this.forminsert.ap_remark,
        dlt_code: this.forminsert.dlt_code, user_id: this.forminsert.user_id
      }


      try {
        const data = await ApiService.post('/appointment/create', savet).then(response => {
if(!response){
  return 204
}else {
  return 200
}

        });
        return data
      } catch (error) {
        return 502;
      }


    },

    async Update() {


      //   const date_start = await this.changeTypeTimeZoneafter(this.formedit.ap_date_start);
      //   const date_end = await this.changeTypeTimeZoneafter(this.formedit.ap_date_end);
      const learn_type = parseInt(this.formedit.ap_learn_type);
      //  const date_end =  await this.changeTypeTimeZone(this.formedit.ap_date_end);

      // this.formedit.ap_date_end = await this.changeFormate(this.formedit.ap_date_end);
      const upd = {
        ap_learn_type: learn_type, ap_quota: this.formedit.ap_quota, ap_date_start: this.formedit.ap_date_start, ap_date_end: this.formedit.ap_date_end, ap_remark: this.formedit.ap_remark,
        dlt_code: this.formedit.dlt_code, user_id: this.formedit.user_id
      }
     
      try {
        const data = await ApiService.put('/appointment/update/' + this.ap_id, upd).then(response => {
          // console.log(response);
          if (response.data == '') {
            return false;
          }
          return true;
        });
        return data
      } catch (error) {
        return false;
      }

      //   return true;
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

      this.forminsert.ap_quota = "";
      this.forminsert.ap_remark = "";
      this.forminsert.ap_date_start = null;
      this.forminsert.ap_date_end = null;


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
      this.formuser.user_id = this.user_id;
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

    async FetchAPUser() {

      try {
        const data = await ApiService.get('/appointment/reserve/get/' + this.user_id_fitter).then(response => {
          this.app_user = response.data

        });
        return data;
      } catch (error) {
        return false
      }
    },



    async fetchUse() {
      await this.fetchUsers();
    },


    async fetchUsers() {
      this.userall = [];
      this.formuser.user_id = this.user_id;
      this.formuser.verify_account = 'system_active';
      

      const data = await ApiService.post('/user/list?user_type=3', this.formuser).then(response => {
        console.log(response);
        this.user = response.data.data;
   
        this.total_page_user = response.data.total_page

      });



    },

    async checkuser() {

      for (var i = 0; i < this.user.length; i++) {
        const data = ApiService.get('/user/get/' + this.user[i].user_id).then(response => {


          //   this.result = response.data;

          const b = { user_prefrix:response.data.user_prefrix,user_id: response.data.user_id, user_email: response.data.user_email, user_firstname: response.data.user_firstname, user_lastname: response.data.user_lastname, user_phone: response.data.user_phone, detail: response.data.detail?.verify_account, identification_number: response.data.detail?.identification_number }
          this.userall.push(b)

          this.userall.sort((a, b) => a.user_id - b.user_id).map(item => item.user_id);
        });
      }



    },



    async deleteRerve() {
      const del = { user_id: this.deluser_id, ap_id: this.del_ap }
      try {
        const data = await ApiService.delete('appointment/reserve/delete/' + this.ardel_id, del).then(response => {
          if(response.status == 200){
            return 200
          }
          if(response.status == 204){
            return 204
          }
        });
        return data;
      } catch (error) {

        return 500
      }
    },

    async SaveFormreserve() {
      const savereser = { user_id: this.myChoose.user_id, ap_id: this.ap_id }
      try {
        const data = await ApiService.post('/appointment/reserve/create', savereser).then(x => {



          if (x === undefined) {
            return 404;
          }

          return 200;
        });
        return data;
      } catch (error) {
        return 502;
      }

    },

    async CheckVerify(item) {
      try {
        const data = await ApiService.get('/user/get/' + item.user_id).then(response => {
          if (Object.keys(response.data.detail).length === 0) {
            return false;
          } else {
            if (response.data.detail.verify_account == 'system_active') {
              return true;
            } else {
              return false;
            }
          }
        });
        return data;
      } catch (error) {

      }
    },

    async fetchAppPresent() {
      try {
        const data = await ApiService.get('/appointment/reserve/list/?dlt_code=' + this.formreserve.dlt_code + '&ap_learn_type=' + this.formreserve.ap_learn_type + '&present_day=' + this.formreserve.present_day + '').then(response => {
          this.app_present = response.data
        
        });
        return true
      } catch (error) {

        return false;
      }

    },

    async fetchAppPresentToday() {

      console.log(this.dlt_today);
      try {
        const data = await ApiService.post('/appointment/dateappointment').then(response => {
   
        for  (let i = 0; i < response.data.length; i++) {
          if(response.data[i].dlt_code == 'A'){
            this.dlt_today.A_1.push(response.data[i])
          }
          if(response.data[i].dlt_code == 'A1'){
            this.dlt_today.A_1.push(response.data[i])
          }
          if(response.data[i].dlt_code == 'A2'){
            this.dlt_today.A_1.push(response.data[i])
          }
          if(response.data[i].dlt_code == 'A3'){
            this.dlt_today.A_1.push(response.data[i])
          }
          if(response.data[i].dlt_code == 'B'){
            this.dlt_today.B_1.push(response.data[i])
          }
          if(response.data[i].dlt_code == 'C'){
            this.dlt_today.C_1.push(response.data[i])
          }
          if(response.data[i].dlt_code == 'C1'){
            this.dlt_today.C1_1.push(response.data[i])
          }
          if(response.data[i].dlt_code == 'C2'){
            this.dlt_today.C2_1.push(response.data[i])
          }
          if(response.data[i].dlt_code == 'D'){
            this.dlt_today.D_1.push(response.data[i])
          }
          if(response.data[i].dlt_code == 'D1'){
            this.dlt_today.D_1.push(response.data[i])
          }
          if(response.data[i].dlt_code == 'D2'){
            this.dlt_today.D2_1.push(response.data[i])
          }
          if(response.data[i].dlt_code == 'E'){
            this.dlt_today.E_1.push(response.data[i])
          }
          if(response.data[i].dlt_code == 'E1'){
            this.dlt_today.E1_1.push(response.data[i])
          }
        }
   
        
        });
        return true
      } catch (error) {
        return false;
      }

    },

    async SelectUserByApp(item) {



this.formselectapp.user_full_name = item.user_full_name;
this.formselectapp.identification_number = item.identification_number;
this.formselectapp.user_id = item.user_id;
this.formselectapp.st_id = item.user_id;
console.log(this.formselectapp);
    },

    async SaveUserRerv() {

      this.formselectapp.ap_id = 238;
      try {
        const data = await ApiService.post('/appointment/reserve/new/create', this.formselectapp).then(x => {


        });
        return data;
      } catch (error) {
        return 502;
      }


    },



    


  },

});
