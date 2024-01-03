import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";
import moment from "moment";

export const ResultStore = defineStore('result', {
  state: () => ({
    user_id: null,
    modaldelete:false,
    mr_id:null,
    identification_number:null,
    myChoose:[],
    total_page:0,
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
    users: [],
    user:[],
    userall:[],
    result:[],
    resultUser:[],
    PopupDelete:false,
    IsCardInsert:false,
    IsCardEdit:false,
    IsCardListByUser:false,
    IsCardNoInsert:false,
    selectedValue: null,
    formuser: {
      page: 1,
      per_page: 5,
      search: ""
    },
    ap_learn_type: "2",
    date_event: "",
    dlt_code: "A",
    formresult: {
      mr_score: null,
      mr_learn_type: 1,
      mr_status: 'pass',
      dlt_code: "A",
      identification_number: null
    },
    formeditresult: {
      mr_score: null,
      mr_learn_type: null,
      mr_status: null,
      dlt_code: null,
      identification_number: null
    },

    myValue: '',

    dtla: [
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
    FormResult(state) {
      return state.formresult;
    },
    FormUpdateResult(state){
      return state.formeditresult;
    }
  },

  actions: {

    async fetchUsers() {

     

        const data = await ApiService.post('/user/list?user_type=3', this.formuser).then(response => {
          this.user = response.data.data;
this.total_page = response.data.total_page

         

          
       
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
       //   this.result = response.data;
     //  console.log(response.data.user_id);
       const b = {user_id:response.data.user_id,user_firstname:response.data.user_firstname,user_lastname:response.data.user_lastname,user_phone:response.data.user_phone,detail:response.data.detail?.verify_account,identification_number:response.data.detail?.identification_number}
          this.userall.push(b);
          this.userall.sort((a, b) => a.user_id - b.user_id).map(item => item.user_id);
        });
      }
     
     // console.log(this.userall.sort());
      return this.userall;
  
   
    },
    async fetchResultByUser() {
      this.resultUser = [];
      try {
        const data = await ApiService.get('/main_result/list/?user_id='+this.user_id).then(response => {
     
          if(response.data.length > 0){
            this.resultUser = response.data;
            this.IsCardListByUser = true;
          }
        });
        return data;
      } catch (error) {
        return false
      }
  },

    
    async fetchResult() {
   
      try {
        const data = await ApiService.get('/main_result/list/option/?dlt_code='+this.dlt_code+'&mr_learn_type='+ this.ap_learn_type +'&present_day='+this.date_event+'').then(response => {
          this.result = response.data;
          console.log(this.result);
        });
        return data;
      } catch (error) {
        return false
      }
    },


    async fetchDlt() {
      try {
        const data = await ApiService.get('/master_data/drivinglicense_type').then(response => {
        //  this.dlt = response.data;
        });
        return data;
      } catch (error) {
        return false
      }
    },
    setSelectedValue(value) {
      this.selectedValue = this.dtla;
    },
    async fetchUser() {
      try {
        const data = await ApiService.post('/user/list?', this.formuser).then(response => {
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
    async saveResult() {
this.formresult.user_id = parseInt(this.formresult.user_id);
this.formresult.mr_score = parseInt(this.formresult.mr_score);
this.formresult.mr_learn_type = parseInt(this.formresult.mr_learn_type);
      try {
        const data = await ApiService.post('/main_result/create',this.formresult).then(response => {
    
return true;
        });
        return true;
      } catch (error) {
      
        return false
      }

    },

    async updateResult(){
      const upd = {dlt_code:this.formeditresult.dlt_code,mr_learn_type:parseInt(this.formeditresult.mr_learn_type),mr_score:this.formeditresult.mr_score
        ,mr_status:this.formeditresult.mr_status,identification_number:this.formeditresult.identification_number}

      // return true;


      try {
        const data = await ApiService.put('/main_result/update/'+this.mr_id,upd).then(response => {
    
return true;
        });
        return true;
      } catch (error) {
      
        return false
      }

    },

    async DeleteResult() {
      try {
        const del = await ApiService.delete('/main_result/delete/' + this.mr_id);

        return true;
      
      } catch (error) {
        return error;
      }

    }


  },

});
