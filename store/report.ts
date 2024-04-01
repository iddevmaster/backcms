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
    dlt: [
      {
        dlt_code: "A",
        dlt_description_loas:
          "ລົດຈັກສອງລໍ້ ຄວາມແຮງບໍ່ເກີນ 125 cc",
        dlt_description_english:
          "Two-wheeled motorcycle, not too strong", 
      },
      {
        dlt_code: "A1",
        dlt_description_loas:
          "ລົດຈັກສອງລໍ້ ຄວາມແຮງ ແຕ່ 125 cc ຂື້ນໄປ",
        dlt_description_english:
          "Two-wheeled motorcycle with a capacity of 125 cc ",    
      },
      {
        dlt_code: "A2",
          dlt_description_loas:
          "ລົດຈັກສາມລໍ້ສ່ວນຕົວ, ລົດສອງລໍ້ ແລະ ສາມລໍ້ໂດຍສານ",
        dlt_description_english:
          "Private tricycles, two-wheelers and passenger tricycles",   
      },
      {
        dlt_code: "A3",
          dlt_description_loas:
          "ລົດໄຖນາທີ່ແກ່ລໍ້ ແລະ ລົດຕ໋ອກໆ",
        dlt_description_english:
          "Old wheeled tractors and trucks",   
      },
      {
        dlt_code: "B",
          dlt_description_loas:
          "ລົດເບົາ ສີ່ລໍ້ ທີ່ມີນ້ຳໜັກລວມບໍ່ເກີນ 3.500 ກິໂລກຣາມ ແລະ ບໍ່ເກີນ 9 ບ່ອນນັ່ງ ລວມທັງຜູ້ຂັບຂີ່",
        dlt_description_english:
          "less than 3,500 kilograms, not more than 9 seats, including the driver",   
      },
      {
        dlt_code: "C",
          dlt_description_loas:
          "ລົດຂົນສົ່ງສິນຄ້ານ້ຳໜັກລວມ ແຕ່ 3.500 ກິໂລກຣາມ ຫາ 7.500 ກິໂລກຣາມ",
        dlt_description_english:
          "Heavy goods vehiclesa= total of 3,500 to 7.500 kilograms",
      },
      {
        dlt_code: "C1",
          dlt_description_loas:
          "ລົດຂົນສົ່ງສິນຄ້ານ້ຳໜັກລວມ ເກີນກວ່າ 7.500ກິໂລກຣາມ ຫາ 15.000 ກິໂລກຣາມ",
        dlt_description_english:
          "Weight of the truck exceeds a total of 7,500 to 15,000 kilograms",   
      },
      {
        dlt_code: "C2",
          dlt_description_loas:
          "ລົດຂົນສົ່ງສິນຄ້ານ້ຳໜັກລວມ ເກີນກວ່າ 15.000 ກິໂລກຣາມ.",
        dlt_description_english:
          "Transportation vehicles, weighing 15,000 kilograms or more",   
      },
      {
        dlt_code: "D",
          dlt_description_loas:
          "ລົດຂົນສົ່ງຜູ້ໂດຍສານປະເພດ 4 ລໍ້ ຂຶ້ນໄປ, ບໍ່ເກີນ ສິບຫ້າ ບ່ອນນັ່ງ",
        dlt_description_english:
          "Passenger car type 4 wheels and above, no more than fifteen seats",   
      },
      {
        dlt_code: "D1",
          dlt_description_loas:
          "ລົດຂົນສົ່ງຜູ້ໂດຍສານ ແຕ່ ສິບຫົກ ຫາ ສາມສິບຫ້າ ບ່ອນນັ່ງ",
        dlt_description_english:
          "Passenger cars from sixteen to thirty-five seats",   
      },
      {
        dlt_code: "D2",
          dlt_description_loas:
          "ລົດຂົນສົ່ງຜູ້ໂດຍສານ ແຕ່ ສາມສິບຫົກ ບ່ອນນັ່ງ ຂຶ້ນໄປ",
        dlt_description_english:
          "Passenger cars with thirty-six seats or more",   
      },
      {
        dlt_code: "E",
          dlt_description_loas:
          "ລົດເບົາ (B), ລົດຂົນສົ່ງສິນຄ້າ (C) ແລະ ລົດຂົນສົ່ງຜູ້ໂດຍສານ (D) ທີ່ແກ່ຫາງລາກນ້ຳໜັກລວມບໍ່ເກີນ 750 ກິໂລກຣາມ",
        dlt_description_english:
          "Light vehicles (B), cargo vehicles (C) and passenger vehicles (D) with a total weight of not more than 750 kg",   
      },
      {
        dlt_code: "E1",
          dlt_description_loas:
          "ລົດຂົນສົ່ງສິນຄ້າ (C2) ແກ່ຫາງລາກນ້ຳໜັກລວມເກີນກວ່າ 750 ກິໂລກຣາມ",
        dlt_description_english:
          " Cargo vehicles (C2) with a total weight exceeding 750 kg",   
      },
    ],

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
