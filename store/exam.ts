import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
import { ref } from 'vue';




export const ExamStore = defineStore('exam', {
  state: () => ({
    isOpen: false,
    isOpenCreate: false,
    isOpenEdit: false,
    image: null,
    sortedbyASC: true,
    user_id:null,
    imageReq: false,
    imagelist: null,
    total_page: null,
    limit_page: null,
    current_page: null,
    total_filter: null,
    total: null,
    path: "",
    examlist: [],
    exam: null,
    formexam: {
      em_code: "",
      em_name: "",
      em_cover: "",
      em_description: "",
      em_random_amount: 50,
      dlt_code:"A",
      em_time: ref({
        hours: '00',
        minutes: '59',
        seconds: '00'
      }),
      user_id: null
    },
    formexamedit: {
      em_id: "",
      em_code: "",
      em_name: "",
      em_cover: "",
      em_description: "",
      em_random_amount: null,
      dlt_code:null,
      em_time: ref({
        hours: '00',
        minutes: '59',
        seconds: '00'
      }),
      user_id: null
    },
    formsearchexam: {
      page: 1,
      per_page: 10,
      search: '',
    },
     dtl:[
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
    GetopenModal(state) {
      return state.isOpen;
    },
    GetopenModalCreate(state) {
      return state.isOpenCreate;
    },
    GetopenModalEdit(state) {
      return state.isOpenEdit;
    },
    FormExam(state) {
      return state.formexam;
    },
    FormExamEdit(state) {
      return state.formexamedit;
    },
    GetExamDelId(state) {
      return state.exam;
    },


  },

  actions: {
    async fetchExamlist() {

      await this.ResetForm();
      try {
        const data = await ApiService.post('/exam/main/list', this.formsearchexam).then(response => {
          this.examlist = response.data.data
          this.total_page = response.data.total_page
          this.limit_page = response.data.limit_page
          this.current_page = response.data.current_page
          this.total_filter = response.data.total_filter
          this.total = response.data.total
        });

        return true

      } catch (error) {
        console.log('error');
        return false;
      } finally {

      }

    },

    sortLists(sortBy) {
      if (this.sortedbyASC) {
        this.examlist.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedbyASC = false;
      } else {
        this.examlist.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedbyASC = true;
      }
    },

    async selectentires(data_entires) {

      this.formsearchexam.per_page = data_entires;
      this.formsearchexam.page = 1;
    },
    setCurrentPage(page) {
      this.formsearchexam.page = page
    },
    async SaveExam() {
      this.ChangeFormateTime('add');
      try {
        const data = await ApiService.post('/exam/main/create', this.formexam).then(response => {
          return true;
        });
      } catch (error) {
        return false
      } finally {
        this.closeModal();
      }
    },

    async UpdateExam() {
      this.isOpenEdit = false;
      await this.ChangeFormateTime('edit');
      try {
        const updateexam = await ApiService.put('/exam/main/update/' + this.formexamedit.em_id, this.formexamedit);
        return true;
      } catch (error) {
        return false;
      } finally {
        this.closeModal();
      }
    },

    async deleteExam(item) {
      try {
        await this.deleteImage(item.em_cover);
        const del = await ApiService.delete('/exam/main/delete/' + item.em_id);
        this.isOpen = false;
        return true;
      } catch (error) {
        return false;
      }

    },

    async deleteImage(image) {
      const del = await ApiService.delete('/media_file/file/?f=' + image);
      return true;
    },

    async ResetForm() {

      this.image = null;
      this.imagelist = null;
      this.path = "";
      this.formexam = {
        em_code: '',
        em_name: '',
        em_cover: '',
        em_description: '',
        em_random_amount: 50,
        dlt_code:"A",
        em_time: ref({
          hours: '00',
          minutes: '59',
          seconds: '00'
        }),
        user_id:this.user_id
      };

    },



    async OpenFormInser() {
      this.image = null;
      this.isOpenCreate = true;
    },
    async OpenEditItem(item) {

      const timeedit = this.getDateFromHours(item.em_time);
      this.formexamedit.em_id = item.em_id
      this.formexamedit.em_code = item.em_code
      this.formexamedit.em_name = item.em_name
      this.formexamedit.em_description = item.em_description
      this.formexamedit.em_cover = item.em_cover
      this.formexamedit.em_time = timeedit
      this.formexamedit.em_random_amount = item.em_random_amount
      this.formexamedit.dlt_code = item.dlt_code,
      this.formexamedit.user_id = this.user_id,
        this.image = item.em_cover
      this.isOpenEdit = true;
    },

    async Openmodaldelete(item) {

      this.isOpen = true;
      this.exam = item;
    },

    closeModal() {
      this.isOpenCreate = false;
      this.isOpenEdit = false;

    },

    getDateFromHours(time) {

      const timed = time.split(':');
      const timeedit = ref({
        hours: timed[0],
        minutes: timed[1],
        seconds: timed[2]
      })
      return timeedit;

    },

    async UploadfileExam() {
      let formData = new FormData();
      formData.append('files', this.imagelist);
      if (this.imagelist) {
        try {
          const data = await ApiService.upload('/media_file/upload/file', formData);
          //  this.path = data.data[0].path
          this.formexam.em_cover = data.data[0].path
          this.formexamedit.em_cover = data.data[0].path
          return true;
        } catch (error) {
          return false;
        }
      }
    },

    async ChangeFormateTime(item) {


      if (item == 'add') {
        const time = this.formexam.em_time.hours + ':' + this.formexam.em_time.minutes + ':' + this.formexam.em_time.seconds
        this.formexam.em_time = time;

      } else {
        const time = this.formexamedit.em_time.hours + ':' + this.formexamedit.em_time.minutes + ':' + this.formexamedit.em_time.seconds
        this.formexamedit.em_time = time;

      }
    },
  },



});
