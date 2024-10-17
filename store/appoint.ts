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
    remark: "ເຫດຜົນທີ່ຍົກເລີກໃຫ້ຂຽນໃສ່ບ່ອນນີ້",
    event: [],
    user: [],
    course:null,
    userall: [],
    total_page_user: 0,
    start_date: '',
    reservebyap: [],
    selectedRow: {
      user_id: null
    },
    app_present: [],
    app_user: [],
    users: [],
    usersall: [],
    user_id: null,
    end_date: '',
    dlt_code: ["A", "A1", "A2", "A3", "B", "C1", "C", "C2"],
    myChoose: null,
    ap_id: null,
    user_id_fitter: null,
    isShowModal: false,
    total_page: null,
    limit_page: null,
    current_page: null,
    total_filter: null,
    history_user: 0,
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
    history: null,
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
    dlt: [],
    dlt_select: [],
    dlt_today: {
      A_1: [],
      A_2: [],
      A1_1: [],
      A1_2: [],
      A2_1: [],
      A2_2: [],
      A3_1: [],
      A3_2: [],
      B_1: [],
      B_2: [],
      C_1: [],
      C_2: [],
      C1_1: [],
      C1_2: [],
      C2_1: [],
      C2_2: [],
      D_1: [],
      D_2: [],
      D1_1: [],
      D1_2: [],
      D2_1: [],
      D2_2: [],
      E_1: [],
      E_2: [],
      E1_1: [],
      E1_2: [],
    },
    cancelapp: false,
    verify: false,
    theoryscore: false,
    practicalscore: false,
    formselectapp: {
      user_id: null,
      user_full_name: "",
      identification_number: null,
      ap_id: null,
      st_id: ""
    },
    searchapp: {
      ap_number: null
    },
    dataapp: {

    },
    score: [],
    totalscore: 0,
    formhistory: {
      page: 1,
      per_page: 100,
      search: ""
    },
    formscorefull: {
      course_code: '',
    },
    formscoreT: {
      score: "",
      mr_status: "fail",
      ref_number: null,
      remark: null,
    },
    formscoreP: {
      score: "",
      mr_status: "fail",
      ref_number: null,
      remark: null,
    },
    formver: {
      division: "1",
      remarkcheck: []
    },
    veggies: [
      { id: 1, name: "ຂໍ້ມູນທີ່ປ້ອນໃນລະບົບ ແລະ ເອກະສານທີ່ຍື່ນ ກົງກັນ", selected: false },
      { id: 2, name: "ຮູບ ແລະ ຕົວຈິງ ແມ່ນຄົນດຽວກັນ", selected: false },
      { id: 3, name: "ມີເອກະສານ ຜ່ານການຮຽນ ຈາກໂຮງຮຽນການຂັບຂີ່ (ສຳລັບ ປະເພດ B ຂື້ນໄປ)", selected: false },
      { id: 4, name: "ຜ່ານເກນ ແລະ ເງື່ອນໄຂ (ເຊັ່ນ: ອາຍຸ, ອ່ານອອກຂຽນໄດ້, ກວດການແນມເຫັນ, ບອດສີ, ບໍ່ຖືກຍຶດຫຼືໂຈະໃບຂັບຂີ່ ...)", selected: false }
    ],
    ScoreReqTh: false,
    status_score: "create",
    status_scoreP: "create",
    status_status: "",
    status_statusP: "",
    dlt_score: [],
    formresult: {
      mr_score: null,
      mr_learn_type: 1,
      mr_status: 'pass',
      dlt_code: "A",
      identification_number: null,
      user_id_staff: null,
      ref_number: null,
      remark: null,
    },

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
          if (!response) {
            return 204
          } else {
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

          const b = { user_prefrix: response.data.user_prefrix, user_id: response.data.user_id, user_email: response.data.user_email, user_firstname: response.data.user_firstname, user_lastname: response.data.user_lastname, user_phone: response.data.user_phone, detail: response.data.detail?.verify_account, identification_number: response.data.detail?.identification_number }
          this.userall.push(b)

          this.userall.sort((a, b) => a.user_id - b.user_id).map(item => item.user_id);
        });
      }



    },



    async deleteRerve() {
      const del = { user_id: this.deluser_id, ap_id: this.del_ap }
      try {
        const data = await ApiService.delete('appointment/reserve/delete/' + this.ardel_id, del).then(response => {
          if (response.status == 200) {
            return 200
          }
          if (response.status == 204) {
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

    async fetchAppPresentTodayReset() {

      this.dlt_today.A_1 = []
      this.dlt_today.A_2 = []
      this.dlt_today.A1_1 = []
      this.dlt_today.A1_2 = []
      this.dlt_today.A2_1 = []
      this.dlt_today.A2_2 = []
      this.dlt_today.A3_1 = []
      this.dlt_today.A3_2 = []
      this.dlt_today.B_1 = []
      this.dlt_today.B_2 = []
      this.dlt_today.C_1 = []
      this.dlt_today.C_2 = []
      this.dlt_today.C1_1 = []
      this.dlt_today.C1_2 = []
      this.dlt_today.C2_1 = []
      this.dlt_today.C2_2 = []
      this.dlt_today.D_1 = []
      this.dlt_today.D_2 = []
      this.dlt_today.D1_1 = []
      this.dlt_today.D1_2 = []
      this.dlt_today.D2_1 = []
      this.dlt_today.D2_2 = []
      this.dlt_today.E_1 = []
      this.dlt_today.E_2 = []
      this.dlt_today.E1_1 = []
      this.dlt_today.E1_2 = []



    },
    async fetchAppCourse() {

      try {
        const data = await ApiService.get('/course/coursetotalquest').then(response => {

     this.course = response.data;
     console.log(this.course);
        });
        return true
      } catch (error) {
        return false;
      }

    },

    async fetchAppPresentToday() {


      try {
        const data = await ApiService.post('/appointment/dateappointment').then(response => {

          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].dlt_code == 'A' && response.data[i].type == 1) {
              this.dlt_today.A_1.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'A' && response.data[i].type == 2) {
              this.dlt_today.A1_2.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'A1' && response.data[i].type == 1) {
              this.dlt_today.A1_1.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'A1' && response.data[i].type == 2) {
              this.dlt_today.A1_2.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'A2' && response.data[i].type == 1) {
              this.dlt_today.A2_1.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'A2' && response.data[i].type == 2) {
              this.dlt_today.A2_2.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'A3' && response.data[i].type == 1) {
              this.dlt_today.A3_1.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'A3' && response.data[i].type == 2) {
              this.dlt_today.A3_2.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'B' && response.data[i].type == 1) {
              this.dlt_today.B_1.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'B' && response.data[i].type == 2) {
              this.dlt_today.B_2.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'C' && response.data[i].type == 1) {
              this.dlt_today.C_1.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'C' && response.data[i].type == 2) {
              this.dlt_today.C_2.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'C1' && response.data[i].type == 1) {
              this.dlt_today.C1_1.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'C1' && response.data[i].type == 2) {
              this.dlt_today.C1_2.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'C2' && response.data[i].type == 1) {
              this.dlt_today.C2_1.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'C2' && response.data[i].type == 2) {
              this.dlt_today.C2_2.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'D' && response.data[i].type == 1) {
              this.dlt_today.D_1.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'D' && response.data[i].type == 2) {
              this.dlt_today.D_2.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'D1' && response.data[i].type == 1) {
              this.dlt_today.D_1.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'D1' && response.data[i].type == 2) {
              this.dlt_today.D1_2.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'D2' && response.data[i].type == 1) {
              this.dlt_today.D2_1.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'D2' && response.data[i].type == 2) {
              this.dlt_today.D2_2.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'E' && response.data[i].type == 1) {
              this.dlt_today.E_1.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'E' && response.data[i].type == 2) {
              this.dlt_today.E_2.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'E1' && response.data[i].type == 1) {
              this.dlt_today.E1_1.push(response.data[i])
            }
            if (response.data[i].dlt_code == 'E1' && response.data[i].type == 2) {
              this.dlt_today.E1_2.push(response.data[i])
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


    async fetchAppNumber() {
      try {
        const data = await ApiService.post('/appointment/dateappointment/appbyuser', this.searchapp).then(rep => {

          this.dataapp = rep.data;
       
          this.history_user = rep.data[0].user_id
          this.select_dlt_app = rep.data[0].dlt_code;
          if(JSON.parse(this.dataapp[0].remark_verify)){
            this.veggies = JSON.parse(this.dataapp[0].remark_verify)
          }

        });
        return data;
      } catch (error) {
        return false;
      }


    },
    async fetchHistoryCourse() {
      if (this.history_user != 0) {
        try {
          const data = await ApiService.post('/course/learn/history/' + this.history_user, this.formhistory).then(rep => {

            let d = rep.data.data;

            let hist = d.find(obj => obj.course_code == this.select_dlt_app);

            this.history = hist;



          });
          return data;
        } catch (error) {
          return false;
        }
      }
    },


    async fetchHistoryExam() {
 
      if (this.history_user != 0) {
       
        try {
          const data = await ApiService.get('/exam/history/?course_id=' + this.history.course_id + '&user_id=' + this.history_user).then(reps => {
          
            this.score = reps.data
            

          });
          return data;
        } catch (error) {
          return false;
        }
      }
    },

    async fetchDlt() {
      try {
        const data = await ApiService.get('/master_data/drivinglicense_type').then(reps => {

          this.dlt = reps.data;
          this.dlt_select = this.dlt.find(obj => obj.dlt_code == this.select_dlt_app);

        });
        return data;
      } catch (error) {
        return false;
      }
    },


    async fetchExamScore() {
      this.formscorefull.course_code = this.select_dlt_app
     
      try {
        const data = await ApiService.post('/exam/main/get/one', this.formscorefull).then(reps => {
          this.totalscore = reps.data[0];
        });
        return data;
      } catch (error) {
        return false;
      }
    },

    async fetchResultScore() {
      try {
        const data = await ApiService.get('/main_result/list/?user_id=' + this.history_user).then(reps => {

          if (reps.data.length > 0) {

            this.dlt_score = reps.data.find((obj => obj.dlt_code == "A1") && (obj => obj.mr_learn_type == 1));
            this.dlt_scoreP = reps.data.find((obj => obj.dlt_code == "A1") && (obj => obj.mr_learn_type == 2));



            if (this.dlt_score) {
              this.status_score = 'update';
              this.formscoreT.score = this.dlt_score.mr_score
              this.formscoreT.mr_status = this.dlt_score.mr_status
              this.status_status = this.dlt_score.mr_status;


              this.formscoreT.ref_number = this.dlt_score.ref_number;
              this.formscoreT.remark = this.dlt_score.remark;
            }

            if (this.dlt_scoreP) {
              this.status_scoreP = 'update';
              this.formscoreP.score = this.dlt_scoreP.mr_score
              this.formscoreP.mr_status = this.dlt_scoreP.mr_status
              this.status_statusP = this.dlt_scoreP.mr_status;

              this.formscoreP.ref_number = this.dlt_scoreP.ref_number;
              this.formscoreP.remark = this.dlt_scoreP.remark;
            }
          } else {
            this.status_score = 'create';
            this.status_scoreP = 'create';
          }
        });
        return data;
      } catch (error) {
        return false;
      }
    },


    async fetchResultScorePra() {
      try {
        const data = await ApiService.get('/main_result/list/?user_id=' + this.history_user).then(reps => {
          if (reps.data.length > 0) {
            this.dlt_score = reps.data
            this.dlt_score = this.dlt_score.find(obj => obj.dlt_code == "A1");

            if (this.dlt_score) {
              this.status_score = 'update';
              this.formscore.score = this.dlt_score.mr_score
              this.formscore.mr_status = this.dlt_score.mr_status
              this.status_status = this.dlt_score.mr_status;

              this.formscore.ref_number = this.dlt_score.ref_number;
              this.formscore.remark = this.dlt_score.remark;

            }
          } else {
            this.status_score = 'create';
          }
        });
        return data;
      } catch (error) {
        return false;
      }
    },


    async SaveResultScore() {
      if (this.status_score == 'update') {
        this.formresult.mr_score = parseInt(this.formscoreT.score);
        this.formresult.mr_status = this.formscoreT.mr_status
        this.formresult.identification_number = this.dataapp[0].identification_number
        this.formresult.dlt_code = this.dataapp[0].dlt_code
        this.formresult.user_id_staff = this.user_id;
        this.formresult.ref_number = this.formscoreT.ref_number;
        this.formresult.remark = this.formscoreT.remark;

        try {
          const data = await ApiService.put('/main_result/update/' + this.dlt_score.mr_id, this.formresult).then(response => {

            if (response.status == 200) {
              return true;
            }
          });
          return data;
        } catch (error) {
          return false
        }

      }
      if (this.status_score == 'create') {
        this.formresult.mr_score = parseInt(this.formscoreT.score);
        this.formresult.mr_status = this.formscoreT.mr_status
        this.formresult.identification_number = this.dataapp[0].identification_number
        this.formresult.dlt_code = this.dataapp[0].dlt_code
        this.formresult.user_id_staff = this.user_id;
        this.formresult.ref_number = this.formscoreT.ref_number;
        this.formresult.remark = this.formscoreT.remark;

        try {
          const data = await ApiService.post('/main_result/create', this.formresult).then(response => {
            if (response.status == 200) {
              return true;
            }
          });
          return data;
        } catch (error) {
          return false
        }
      }
    },


    async SaveResultScorePra() {
      if (this.status_scoreP == 'update') {
        this.formresult.mr_score = parseInt(this.formscoreP.score);
        this.formresult.mr_status = this.formscoreP.mr_status
        this.formresult.identification_number = this.dataapp[0].identification_number
        this.formresult.dlt_code = this.dataapp[0].dlt_code
        this.formresult.user_id_staff = this.user_id;
        this.formresult.ref_number = this.formscoreP.ref_number;
        this.formresult.remark = this.formscoreP.remark;

        // try {
        //   const data = await ApiService.put('/main_result/update/' + this.dlt_score.mr_id, this.formresult).then(response => {

        //     if (response.status == 200) {
        //       return true;
        //     }
        //   });
        //   return data;
        // } catch (error) {
        //   return false
        // }

      }
      if (this.status_scoreP == 'create') {
        this.formresult.mr_score = parseInt(this.formscoreP.score);
        this.formresult.mr_status = this.formscoreP.mr_status
        this.formresult.identification_number = this.dataapp[0].identification_number
        this.formresult.dlt_code = this.dataapp[0].dlt_code
        this.formresult.user_id_staff = this.user_id;
        this.formresult.ref_number = this.formscoreP.ref_number;
        this.formresult.remark = this.formscoreP.remark;



        try {
          const data = await ApiService.post('/main_result/create', this.formresult).then(response => {
            if (response.status == 200) {
              return true;
            }
          });
          return data;
        } catch (error) {
          return false
        }
      }
    },



    async CancelAppointment() {
      this.searchapp.remark = this.remark;
   
      try {
        const data = await ApiService.post('/appointment/cancelapp', this.searchapp).then(reps => {

          this.remark = "";
        });
        return data;
      } catch (error) {
        return false;
      }
    },
    async UpdateStatusApp() {

      this.formver.remarkcheck = JSON.stringify(this.veggies);
      this.formver.ap_number = this.searchapp.ap_number;
   
      try {
        const data = await ApiService.post('/appointment/veri', this.formver).then(reps => {

        });
        return data;
      } catch (error) {
        return false;
      }
    
    },







  },

});
