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
    imagelistFull: null,
    imagelistAdd: null,
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
      full_name: "",
      address: "",
      front_img: "",
      back_img: "",
      dlt_code: [],
      issue_date: "",
      expiry_date: "",
    },
    user_create:null,
    dtlall: [],
    mydtla: [],
    StatusMethod:"",
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

      try {
        const data = await ApiService.get('/dlt_card/list/?user_id=' + this.user_id).then(response => {
       if(response.data.length > 0){
        this.StatusMethod = 'update';
        this.formadddtl.full_name = response.data[0].full_name
        this.formadddtl.address = response.data[0].address
        this.formadddtl.front_img = response.data[0].front_img
        this.formadddtl.back_img = response.data[0].back_img
        
        this.formadddtl.issue_date = response.data[0].issue_date
        this.formadddtl.expiry_date = response.data[0].expiry_date


for (var j = 0; j < response.data[0].dlt_types.length; j++) {
this.formadddtl.dlt_code.push(response.data[0].dlt_types[j].dlt_code);
}


       }else {
        this.StatusMethod = 'insert';
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

    async UpdateFormDlt() {

      const update = {
        full_name:this.formadddtl.full_name,
        address:this.formadddtl.address,
        front_img:this.formadddtl.front_img,
        back_img:this.formadddtl.back_img,
        dlt_code:this.formadddtl.dlt_code,
        issue_date: this.formadddtl.issue_date,
        expiry_date:this.formadddtl.issue_date,
        user_id:this.formadddtl.user_id,
        user_create:this.user_create,
      }
      console.log(update);

    },

    async SaveFormDlt() {

    const formsave = {
      full_name:this.formadddtl.full_name,
      address:this.formadddtl.address,
      front_img:this.formadddtl.front_img,
      back_img:this.formadddtl.back_img,
      dlt_code:this.formadddtl.dlt_code,
      issue_date: this.formadddtl.issue_date,
      expiry_date:this.formadddtl.issue_date,
      user_id:this.formadddtl.user_id,
      user_create:this.user_create,
    }
   
      try {
        const data = await ApiService.post('/dlt_card/create/', this.formadddtl).then(response => {
          console.log(response)
          
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

    // async UploadfileImage() {
    //   if (this.imagelistFront) {
    //     let formData = new FormData();
    //     formData.append('files', this.imagelistFront);
    //     const data = await ApiService.upload('/media_file/upload/file', formData);
    //     this.formdtl.front_img = data.data[0].path
    //   }
    //   if (this.imagelistBack) {
    //     let formData = new FormData();
    //     formData.append('files', this.imagelistBack);
    //     const data = await ApiService.upload('/media_file/upload/file', formData);
    //     this.formdtl.back_img = data.data[0].path
    //     return true
    //   }
    // },

    async UploadfileFullBack() {
      if (this.imagelistBack) {
        let formData = new FormData();
        formData.append('files', this.imagelistBack);
        const data = await ApiService.upload('/media_file/upload/file', formData);
        this.formadddtl.back_img = data.data[0].path
        return true
      }
    },

    async UploadfileFullFront() {
 
      if ( this.imagelistFront) {
        let formData = new FormData();
        formData.append('files', this.imagelistFront);
        const data = await ApiService.upload('/media_file/upload/file', formData);
        this.formadddtl.front_img = data.data[0].path
      }

 
    },
    async UploadfileAdd() {
      if (this.imagelistAdd) {
        let formData = new FormData();
        formData.append('files', this.imagelistAdd);
        const data = await ApiService.upload('/media_file/upload/file', formData);
        this.formadddtl.address = data.data[0].path
        return true
      }
   

    },
    async UploadfileFull() {
      if (this.imagelistFull) {
        console.log('Full');
        let formData = new FormData();
        formData.append('files', this.imagelistFull);
        const data = await ApiService.upload('/media_file/upload/file', formData);
        this.formadddtl.full_name = data.data[0].path
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
