import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
import moment from "moment";

export const LogStore = defineStore('result', {
  state: () => ({
    datacollection: {
      labels: ['ມັງກອນ', 'ກຸມພາ', 'ມີເຄື່ອງໝາຍ.','ເດືອນເມສາ','ອາດ','ເດືອນມິຖຸນາ','ກໍລະກົດ','ສິງຫາ','ກັນຍາ','ຕຸລາ','ພະຈິກ','ທັນວາ'],
      datasets: [{
        label: 'Report E-learning',
        backgroundColor: '#f87979',
        data: [0, 0, 0,0,0,0,0,0,0,0,0,0]
      }]
    },
    datacollectionreserve: {
      labels: ['ມັງກອນ', 'ກຸມພາ', 'ມີເຄື່ອງໝາຍ.','ເດືອນເມສາ','ອາດ','ເດືອນມິຖຸນາ','ກໍລະກົດ','ສິງຫາ','ກັນຍາ','ຕຸລາ','ພະຈິກ','ທັນວາ'],
      datasets: [{
        label: 'Report Reserve',
        backgroundColor: '#f87979',
        data: [0, 0, 0,0,0,0,0,0,0,0,0,0]
      }]
    },
    datacollectionexam: {
      labels: ['ມັງກອນ', 'ກຸມພາ', 'ມີເຄື່ອງໝາຍ.','ເດືອນເມສາ','ອາດ','ເດືອນມິຖຸນາ','ກໍລະກົດ','ສິງຫາ','ກັນຍາ','ຕຸລາ','ພະຈິກ','ທັນວາ'],
      datasets: [{
        label: 'Report Exam',
        backgroundColor: '#f87979',
        data: [0, 0, 0,0,0,0,0,0,0,0,0,0]
      }]
    },
    type:'all',
    user_id: null,
    modaldelete:false,
    mr_id:null,
    identification_number:null,
    courselist: [],
    lessonlist:[],
    reportlog:[],
    reportrev:[],
    reportexam:[],
    users: [],
    user:[],
    userall:[],
    formuser: {
      page: 1,
      per_page: 5,
      search: ""
    },
    formfitter:{
      course_id:null,
      cs_id:null,
      user_id:null,
      year:null,
      type:1
    },
    formrev:{
      year:null,
      dlt_code:null
    },
    formexam:{
      year:null,
      dlt_code:null
    },
    formsearchcourse: {
      page: 1,
      per_page: 50,
      search: '',
    },
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

    async fetchUsers() {
        const data = await ApiService.post('/user/list?user_type=3', this.formuser).then(response => {
          this.user = response.data.data;
       
        });

      let a =  await this.checkuser();
     
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
   async checkuser() {
     this.userall = [];
      for (var i = 0; i < this.user.length; i++) {
        const data = ApiService.get('/user/get/'+this.user[i].user_id).then(response => {
       const b = {user_id:response.data.user_id,user_firstname:response.data.user_firstname,user_lastname:response.data.user_lastname,user_phone:response.data.user_phone,detail:response.data.detail?.verify_account,identification_number:response.data.detail?.identification_number}
          this.userall.push(b)
        });
      }
      return this.userall;
  
    },


    async fetchCourslist() {
      try {
        const data = await ApiService.post('/course/list', this.formsearchcourse).then(response => {
          this.courselist = response.data.data
        });

        return true;
      } catch (error) {
       
        return false;
      } finally {
        this.loading = false
        this.pending = false
      }
    },

    async fetchLesson() {
      try {
        const data = await ApiService.post('/course/lesson/list/'+this.formfitter.course_id, this.formsearchcourse).then(response => {
          this.lessonlist = response.data.data;
        });
        return true;
      } catch (error) {
        return false;
      }
    },

    async fetchReport() {

      
      if(this.formfitter.type == '1'){
        
        const report = [];
        const data = await ApiService.get('/course/log/lesson/'+this.formfitter.cs_id+'/'+this.formfitter.year).then(response => {
          for (var i = 0; i < response.data.length; i++) {
            report.push(response.data[i].total);
          }
          this.reportlog = report
        }); 
      }

      if(this.formfitter.type == '2'){
   
        const report = [];
        const data = await ApiService.get('/course/log/course/'+this.formfitter.course_id+'/'+this.formfitter.year).then(response => {
          for (var i = 0; i < response.data.length; i++) {
            report.push(response.data[i].total);
          }
          this.reportlog = report
        }); 
      }

      if(this.formfitter.type == '3'){
      
        const report = [];
        const data = await ApiService.get('course/log/course/'+this.formfitter.course_id+'/'+this.formfitter.year+'?user_id='+ this.formfitter.user_id).then(response => {
          for (var i = 0; i < response.data.length; i++) {
            report.push(response.data[i].total);
          }
          this.reportlog = report
        }); 
      }
    //  this.datacollection.datasets[0].data = [Math.random() * 50, Math.random() * 50, Math.random() * 50];

    },

    async fetchLogReserve() {
      const reserv = [];
      const data = await ApiService.get('log/appointment/reserve/'+this.formrev.dlt_code+'/'+this.formrev.year).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          reserv.push(response.data[i].total);
        }
       this.reportrev = reserv
      }); 
    },
    
    async fetchLogExam() {
      const exam = [];
      const data = await ApiService.get('log/exam/'+this.formexam.dlt_code+'/'+this.formexam.year).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          exam.push(response.data[i].total);
        }
       this.reportexam = exam
       
      }); 
    },


    async FillterType() {
    
      console.log(this.type);
    
    }
   
   
   


  },

});
