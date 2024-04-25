import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";
import moment from "moment";

export const ReportStore = defineStore('report', {
  state: () => ({
    user_id: null,
    startDate: '',
    search:"",
    date:null,
    endDate: '',
    dlt_code:"",
    ap_learn_type:"1",
    mr_status:"",
    mr_learn_type:"",
    selectedDate: null,
    fromDate: null,
    toDate: null,
    disabledDates: [],
    reportregister:[],
    reportappoint:[],
    reportexam:[],
    reportresult:[],
    minEndDate: '',
    formreport: {
      page: 1,
      per_page: 10,
      search: "",
      start_date: "",
      end_date: "",
      dlt_code:"",
      ap_learn_type:"",
      mr_status:"",
      mr_learn_type:"",
    },
    current_page:null,
    limit_page:null,
    total:null,
    total_filter:null,
    total_page:null,
  }
  ),

  getters: {
  
  },

  actions: {

    async Reportresult() {
     

     
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },


   async FitterResult(){
      const startdate = ref(new Date(this.date[0]).toISOString().slice(0, 10));
      const enddate = ref(new Date(this.date[1]).toISOString().slice(0, 10));
      this.formreport.start_date = startdate.value
      this.formreport.end_date = enddate.value
      this.formreport.mr_learn_type = this.mr_learn_type
      this.formreport.mr_status = this.mr_status
      this.formreport.dlt_code = this.dlt_code
     
      const data = await ApiService.post('/report/main_result', this.formreport).then(response => {
        
        this.reportresult = response.data.data
      });
    },

    async FitterRegister(){

      const changdaystart = this.date[0].toISOString().slice(0, -5) + '-07:00';  /////แปลงเวลา
      const startdate = moment.utc(changdaystart).format().slice(0, -10)

      const changdayend = this.date[1].toISOString().slice(0, -5) + '-07:00';  /////แปลงเวลา
      const enddate = moment.utc(changdayend).format().slice(0, -10)

      this.formreport.start_date = startdate
      this.formreport.end_date = enddate
      this.formreport.search = this.search

    

      const data = await ApiService.post('/report/register', this.formreport).then(response => {
        this.reportregister = response.data.data;
        this.current_page = response.data.current_page;
        this.limit_page = response.data.limit_page;
        this.total = response.data.total;
        this.total_filter = response.data.total_filter;
        this.total_page = response.data.total_page;
      });
    },

    async FitterAppoint(){
    
    //  const startdate = ref(new Date(this.date[0]).toISOString());


      const changdaystart = this.date[0].toISOString().slice(0, -5) + '-07:00';  /////แปลงเวลา
      const startdate = moment.utc(changdaystart).format().slice(0, -10)

      const changdayend = this.date[1].toISOString().slice(0, -5) + '-07:00';  /////แปลงเวลา
      const enddate = moment.utc(changdayend).format().slice(0, -10)

 
      this.formreport.start_date = startdate
      this.formreport.end_date = enddate
      this.formreport.dlt_code = this.dlt_code
      this.formreport.ap_learn_type = this.ap_learn_type
      this.formreport.search = this.search

      const data = await ApiService.post('/report/appointment/reserve', this.formreport).then(response => {
        this.reportappoint = response.data.data
        this.current_page = response.data.current_page;
        this.limit_page = response.data.limit_page;
        this.total = response.data.total;
        this.total_filter = response.data.total_filter;
        this.total_page = response.data.total_page;
   
      });
    },

    async FitterExam(){
      const startdate = ref(new Date(this.date[0]).toISOString().slice(0, 10));
      const enddate = ref(new Date(this.date[1]).toISOString().slice(0, 10));
      this.formreport.start_date = startdate.value
      this.formreport.end_date = enddate.value
      this.formreport.dlt_code = this.dlt_code
      this.formreport.search = this.search

      const data = await ApiService.post('/report/exam', this.formreport).then(response => {
        
        this.reportexam = response.data.data
        this.current_page = response.data.current_page;
        this.limit_page = response.data.limit_page;
        this.total = response.data.total;
        this.total_filter = response.data.total_filter;
        this.total_page = response.data.total_page;
      });
    },

    async ResetFormSearch(){
this.formreport.page = 1,
this.formreport.per_page = 20,
this.formreport.search = "",
this.formreport.start_date = "",
this.formreport.end_date = "",
this.formreport.dlt_code = "",
this.formreport.ap_learn_type = "",
this.formreport.mr_status = "",
this.formreport.mr_learn_type = ""

this.dlt_code = 'A';
this.mr_status = 'pass';
this.mr_learn_type = '1';


this.current_page = null;
this.limit_page = null;
this.total = null;
this.total_filter = null;
this.total_page = null;
    },
    setCurrentPage(page) {
      this.formreport.page = page
    },
    selectentires(data_entires) {

      this.formreport.per_page = parseInt(data_entires);
    },
  },

});
