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
      per_page: 50,
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
