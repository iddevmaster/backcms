import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";

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
    imagelist: null,
    imagelistFront: null,
    imagelistBack: null,
    name: null,
    id: null,
    ap_id:null,
    formdtl: {
      front_img: "",
      back_img: "",
      dlt_code: 'A1',
      issue_date: "",
      expiry_date: "",
      user_id: null
    },

    formadddtl: {
      front_img: "",
      back_img: "",
      dlt_code: 'A1',
      user_id: null
    },
    dtlall: [],
    mydtla: [],
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
        console.log('error');
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
            this.name = response.data.user_firstname;
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
      this.formdtl.user_id = this.user_id;
      this.id = a.id;


      this.formadddtl.front_img = ""
      this.formadddtl.back_img = ""
      this.formadddtl.dlt_code = 'A1'
      this.formadddtl.user_id = this.user_id;

     
    },

    async SaveFormDlt() {
      let upload = await this.UploadfileAddImage();
      
      console.log(this.formadddtl);
      try {
        const data = await ApiService.post('/dlt_card/create/', this.formadddtl).then(response => {
          console.log(response);
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
      try {
        const data = await ApiService.put('/dlt_card/update/' + this.id, this.formdtl).then(response => {
          console.log(response.data)
        });

        return true;
      } catch (error) {
        return false
      }


    },
    async Delete() {

    },

    async CheckForm() {
this.isAdd = true;
this.isEdit = false;
this.isDelete = false;
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
