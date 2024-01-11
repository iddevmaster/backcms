import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';
import ApiService from '@/services/api.service';
import moment from 'moment';




export const AppointStore = defineStore('appoint', {
  state: () => ({
    isOpen: false,
    isDelAP: false,
    isDelUser: false,
    searchData: "",
    event: [],
    user: [],
    userall: [],
    total_page_user: 0,
    start_date: '',
    reservebyap: [],
    app_present: [],
    app_user: [],
    users: [],
    usersall: [],
    user_id: null,
    end_date: '',
    dlt_code: 'A',
    myChoose: null,
    ap_id: null,
    user_id_fitter: null,
    isShowModal: false,
    total_page: null,
    limit_page: null,
    current_page: null,
    total_filter: null,
    total: null,
    itemsPerPage: 3,
    del_ap: null,
    deluser_id: null,
    ardel_id: null,
    form: {
      ap_learn_type: "1",
      date_event: 0,
      dlt_code: "A1",
    },
    myValue: null,
    formuser: {
      page: 1,
      per_page: 5,
      search: ""
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
      ap_learn_type: 1,
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
    dtl: [
      {
        dlt_code: "A",
        dlt_description:
          "ใบอนุญาตขับรถประเภท A รถจักรยานยนต์สองล้อ เครื่องยนต์ไม่เกิน 125 cc.",
        dlt_description_loas:
          "ໃບຂັບຂີ່ປະເພດ A, ລົດຈັກສອງລໍ້ ເຄື່ອງຈັກບໍ່ເກີນ 125 ຊີຊີ.",
        dlt_description_english:
          "Driving license, type A, two -wheel motorcycle Engine not more than 125 cc.",

      },
      {
        dlt_code: "A1",
        dlt_description:
          "ใบอนุญาตขับรถประเภท A1 รถจักรยานยนต์สองล้อ เครื่องยนต์ 125 cc. ขึ้นไป",
        dlt_description_loas:
          "ໃບຂັບຂີ່ປະເພດ A1, ລົດຈັກສອງລໍ້, ເຄື່ອງຈັກ 125 ຊີຊີ ຫຼື ຫຼາຍກວ່ານັ້ນ.",
        dlt_description_english:
          "Driving license, type A1, two -wheel motorcycle, 125 cc.",
      },
      {
        dlt_code: "A2",
        dlt_description:
          "ใบอนุญาตขับรถประเภท A2 รถสามล้อส่วนตัว, รถสองล้อ และรถสามล้อโดยสาร",
        dlt_description_loas:
          "ໃບອະນຸຍາດຂັບຂີ່ປະເພດ A2 ສາມລໍ້ເອກະຊົນ, ພາຫະນະສອງລໍ້, ແລະສາມລໍ້ຜູ້ໂດຍສານ.",
        dlt_description_english:
          "Driving license, type A2, private tricycle, two -wheeled vehicles and tricycle",
      },
      {
        dlt_code: "A3",
        dlt_description:
          "ใบอนุญาตขับรถประเภท A3 รถแทรกเตอร์แบบมีล้อ และรถปราบดิน",
        dlt_description_loas:
          "ໃບ​ອະ​ນຸ​ຍາດ​ໃຫ້​ຂັບ Class A3​, ລົດ​ໄຖ​ນາ​ລໍ້​ແລະ bulldozers​.",
        dlt_description_english:
          "A3 driving license with wheel tractor and soil suppression vehicles",
      },
      {
        dlt_code: "B",
        dlt_description:
          "ใบอนุญาตขับรถประเภท B รถยนต์ที่น้าหนักรวมน้อยกว่า 3,500 กิโลกรัม ไม่เกิน 9 ที่นั่ง รวมผู้ขับรถ",
        dlt_description_loas:
          "ໃບຂັບຂີ່ປະເພດ B: ພາຫະນະທີ່ມີນໍ້າໜັກທັງໝົດບໍ່ເກີນ 3,500 ກິໂລກຣາມ, ບໍ່ເກີນ 9 ບ່ອນນັ່ງ ລວມທັງຜູ້ຂັບຂີ່.",
        dlt_description_english:
          "Driving license B type, a car with a heavy water, less than 3,500 kilograms, not more than 9 seats, including the driver",
      },
      {
        dlt_code: "C",
        dlt_description:
          "ใบอนุญาตขับรถประเภท C รถขนส่งสินค้าน้าหนักรวมตั้งแต่ 3,500 ถึง 7,500 กิโลกรัม",
        dlt_description_loas:
          "ປະເພດໃບຂັບຂີ່ C, ພາຫະນະຂົນສົ່ງສິນຄ້າທີ່ມີນໍ້າໜັກລວມແຕ່ 3,500 – 15,000 ກິໂລກຣາມ.",
        dlt_description_english:
          "Driving license C, a total of 3,500 to 15,000 kilograms",
      },
      {
        dlt_code: "C1",
        dlt_description:
          "ใบอนุญาตขับรถประเภท C1 รถขนส่งสินค้าน้าหนักรวมตั้งแต่ 7,500 ถึง 15,000 กิโลกรัม",
        dlt_description_loas:
          "ປະເພດໃບຂັບຂີ່ C1, ພາຫະນະຂົນສົ່ງສິນຄ້າທີ່ມີນໍ້າໜັກລວມແຕ່ 7,500 – 15,000 ກິໂລກຣາມ.",
        dlt_description_english:
          "Driving license C1, a total of 7,500 to 15,000 kilograms",
      },
      {
        dlt_code: "C2",
        dlt_description:
          "ใบอนุญาตขับรถประเภท C2 รถขนส่งสินค้า น้าหนักรวม 15,000 กิโลกรัม ขึ้นไป",
        dlt_description_loas:
          "ໃບຂັບຂີ່ປະເພດ C2, ພາຫະນະຂົນສົ່ງສິນຄ້າ, ນ້ຳໜັກທັງໝົດ 15,000 ກິໂລກຣາມຂຶ້ນໄປ.",
        dlt_description_english:
          "Driving license, C2, transportation vehicles, weighing 15,000 kilograms or more",
      },
      {
        dlt_code: "D",
        dlt_description:
          "ใบอนุญาตขับรถประเภท D รถขนส่งผู้โดยสาร ประเภท 4 ล้อขึ้นไป ไม่เกิน 15 ที่นั่ง",
        dlt_description_loas:
          "ໃບຂັບຂີ່ປະເພດ D, ພາຫະນະຂົນສົ່ງຜູ້ໂດຍສານ, 4 ລໍ້ຂຶ້ນໄປ, ບໍ່ເກີນ 15 ບ່ອນນັ່ງ.",
        dlt_description_english:
          "Driving license, type D, a 4 -wheel passenger car, no more than 15 seats",
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

    async ResetFetch() {

      this.forminsert.ap_learn_type = 1
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


        });
        return true
      } catch (error) {
        return false;
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
      await this.checkuser();
    },


    async fetchUsers() {
      this.userall = [];
      const data = await ApiService.post('/user/list?user_type=3', this.formuser).then(response => {
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
          return true
        });
        return data;
      } catch (error) {

        return false
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

    }






  },

});
