import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";
import moment from 'moment';

export const DltStore = defineStore('dlt', {
  state: () => ({
    user_id: null,
    dlt_code: "",
    isDelete:false,
    isAdd:true,
    isEdit:false,
    front_img: null,
    back_img: null,
    image: null,
    user_firstname:null,
    user_lastname:null,
    image_url:null,
    imagelist: null,
    imagelistFront: null,
    imagelistBack: null,
    time:8640000,
    disabledDates: { ////f
      from: null,
    },
    disabledDatesEnd: {
      to: null,
    },
  
    name: null,
    id: null,
    ap_id:null,
    formdtl: {
      front_img: "",
      back_img: "",
      dlt_code: 'A',
      issue_date: "",
      expiry_date: "",
      user_id: null
    },

    formadddtl: {
      front_img: "",
      back_img: "",
      dlt_code: 'A',
      issue_date: "",
      expiry_date: "",
      user_id: null
    },
    dtlall: [],
    mydtla: [],
    dtla: [
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
    ]
  }
  ),

  getters: {
    FormDlt(state) {
      return state.formdtl;
    },
    FormDLTadd(state) {
      return state.formadddtl;
    },

  },

  actions: {
    async fetchUser() {
      try {
        const data = await ApiService.post('/user/get/85').then(response => {

        });

        return true

      } catch (error) {
      
        return false;
      } finally {

      }

    },
    async fetchDlt(id) {
      this.user_id = id
      this.formdtl.user_id = id
      try {
        const data = await ApiService.get('/user/get/' + id).then(response => {
          if (response.data) {
         
            this.name = response.data.user_name;
            this.user_firstname = response.data.user_firstname;
            this.user_lastname = response.data.user_lastname;
           this.image_url = response.data.detail?.user_img;
     
            this.getDLT();
            return true;
          } else {
            return false;
          }

        });

        return data

      } catch (error) {

        return false;
      }

    },

    async getDLT() {
      const mydlt = [];
      try {
        const data = await ApiService.get('/dlt_card/list/?user_id=' + this.user_id).then(response => {
          this.dtlall = response.data;
          if (response.data.length > 0) {
            for (let i = 0; i < response.data.length; i++) {
              let a = this.dtla.find(x => x.dlt_code === response.data[i].dlt_code)
              mydlt.push(a);
            }
            this.mydtla = mydlt;
          }

        });
        return data
      } catch (error) {
        return false;
      }

    },
    async SelectgetDLT(item) {

      this.imagelistFront = null
      this.imagelistBack = null

      let a = this.dtlall[item];
      this.formdtl.front_img = a.front_img
      this.formdtl.back_img = a.back_img
      this.formdtl.dlt_code = a.dlt_code
      this.formdtl.issue_date = moment(a.issue_date).format("YYYY-MM-DD");
      this.formdtl.expiry_date = moment(a.expiry_date).format("YYYY-MM-DD");
//       console.log(this.formdtl.issue_date);
// this.disabledDates.from = this.formdtl.issue_date;
// this.disabledDatesEnd.to = this.formdtl.expiry_date;

this.disabledDatesEnd.to = new Date(this.formdtl.issue_date);
this.disabledDates.from = new Date(this.formdtl.expiry_date);

      this.formdtl.user_id = this.user_id;
      this.id = a.id;


      this.formadddtl.front_img = ""
      this.formadddtl.back_img = ""
      this.formadddtl.dlt_code = 'A1'
      this.formadddtl.user_id = this.user_id;

     
    },

    async SaveFormDlt() {
      let upload = await this.UploadfileAddImage();
      try {
        const data = await ApiService.post('/dlt_card/create/', this.formadddtl).then(response => {
          
        });

        return true

      } catch (error) {
        return false;
      }


    },
    async fetchDltid() {

    },
    async Updatedtl() {
     
      let upload = await this.UploadfileImage();
      //  const data = await ApiService.put('/dlt_card/update/' + this.user_id,this.formdtl).then(response => {
      // });
      this.formdtl.expiry_date = moment(this.formdtl.expiry_date).format("YYYY-MM-DD");
      this.formdtl.issue_date = moment(this.formdtl.issue_date).format("YYYY-MM-DD");
     
      try {
        const data = await ApiService.put('/dlt_card/update/' + this.id, this.formdtl).then(response => {
          
        });

        return true;
      } catch (error) {
        return false
      }


    },
    async Delete() {

    },

    async CheckForm() {
      this.formadddtl.issue_date = ""
      this.formadddtl.expiry_date = ""
      this.isAdd = true;
      this.isEdit = false;
      this.isDelete = false;


    },

    async ResetForm() {
this.formadddtl.front_img = "";
this.formadddtl.back_img = "";
this.formadddtl.issue_date = "";
this.formadddtl.expiry_date = "";

    },

    async UploadfileImage() {
      if (this.imagelistFront) {
        let formData = new FormData();
        formData.append('files', this.imagelistFront);
        const data = await ApiService.upload('/media_file/upload/file', formData);
        this.formdtl.front_img = data.data[0].path
      }
      if (this.imagelistBack) {
        let formData = new FormData();
        formData.append('files', this.imagelistBack);
        const data = await ApiService.upload('/media_file/upload/file', formData);
        this.formdtl.back_img = data.data[0].path
        return true
      }
    },

    async UploadfileAddImage() {
      if (this.imagelistFront) {
        let formData = new FormData();
        formData.append('files', this.imagelistFront);
        const data = await ApiService.upload('/media_file/upload/file', formData);
        this.formadddtl.front_img = data.data[0].path
      }
      if (this.imagelistBack) {
        let formData = new FormData();
        formData.append('files', this.imagelistBack);
        const data = await ApiService.upload('/media_file/upload/file', formData);
        this.formadddtl.back_img = data.data[0].path
        return true
      }
    },

    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
   async delete(){
      try {
        const data = await ApiService.delete('/dlt_card/delete/' + this.id).then(response => {
          this.isAdd = false;
          this.isEdit = false;
          this.isDelete = true;
          return true;
        });
        return data;
      } catch (error) {
        return false
      }
    },



  },

});
