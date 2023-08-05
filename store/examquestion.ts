import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
import { ref } from 'vue';
const user_id = useCookie('user_id');



export const ExamquestionStore = defineStore('examquestion', {
  state: () => ({
    isOpen: false,
    isOpenCreate: false,
    isOpenEdit: false,
    image: null,
    examqlist:[],
    examqlisttotal:null,
    sortedbyASC: true,
    imageReq: false,
    imagelist: null,
    total_page: null,
    limit_page: null,
    current_page: null,
    total_filter: null,
    total: null,
    choicelist: [],
    formExamq: {
      eq_name: "",
      eq_image: "",
      eq_answer: null,
      em_id: 40,
      id: 0,
    },
    formChoice: {
      ec_index: null,
      ec_name: "",
      ec_image: "",
      eq_id: null,
    },
    path: "",
    examlist: [],
    exam: null,
    formsearchexamquestion: {
      page: 1,
      per_page: 10,
      search: '',
    },
  }

  ),


  getters: {
    FormExamq(state) {
      return state.formExamq;
    },


  },

  actions: {
    async fetchExamquestionlist() {

      try {
        const data = await ApiService.post('/exam/question/5/list', this.formsearchexamquestion).then(response => {
       console.log(response.data.data.length);
       this.examqlist = response.data.data
       this.examqlisttotal = response.data.data.length
        });

      } catch (error) {
        console.log('error');
        return false;
      } finally {

      }


    },

    sortLists(sortBy) {

    },

    async selectentires(data_entires) {


    },
    setCurrentPage(page) {
      this.formsearchexam.page = page
    },
    async SaveExamq() {

      try {
        const data = await ApiService.post('/exam/question/create', this.formExamq).then(response => {
          console.log(response.data.insertId);
          this.SaveChoice(response.data.insertId)
          return true;
        });
      } catch (error) {
        return false;

      } finally {
      }

    },
    async SaveChoice(id) {


      for (var i = 0; i < this.choicelist.length; i++) {
        const x = i + 1;
        this.formChoice.ec_index = x;
        this.formChoice.ec_name = this.choicelist[i].ec_name
        this.formChoice.ec_image = this.choicelist[i].ec_image
        this.formChoice.eq_id = id
        await this.delay(500);
        const data = await ApiService.post('/exam/choice/create', this.formChoice);
        {
        }
      }

      await this.ResetForm();

    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async UpdateExamq() {

    },



    async deleteExamq(item) {


    },

    async deleteImage(image) {

    },

    async ResetForm() {


      this.choicelist = [];
      this.image = null,
        this.imageReq = false,
        this.imagelist = null,
        this.formExamq = {
          eq_name: "",
          eq_image: "",
          eq_answer: null,
          em_id: 40,
          id: 0,
        };

    },

    async AdChoice() {
      var x = this.choicelist.length + 1
      const daa = {
        id: x,
        ec_index: null,
        ec_name: "-",
        ec_image: "",
        eq_id: null,
      }
      this.choicelist.push(daa);
    },

    async deleteChoice(x) {
      //  const index = this.choicelist[item]
      const index = this.choicelist.findIndex(item => item.id === x)
      if (index !== -1) {
        this.choicelist.splice(index, 1)
      }
    },


    async OpenFormInser() {

    },
    async OpenEditItem() {


    },


    closeModal() {
      this.isOpenCreate = false;
      this.isOpenEdit = false;

    },



    async UploadfileExamq() {
      let formData = new FormData();
      formData.append('files', this.imagelist);
      if (this.imagelist) {
        try {
          const data = await ApiService.upload('/media_file/upload/file', formData);
          //  this.path = data.data[0].path
          this.formExamq.eq_image = data.data[0].path
          return true;
        } catch (error) {
          return false;
        }
      }

    },

    async uploadfileexam(x) {
      const data = await ApiService.upload('/media_file/upload/file', x);
      return data;
    },

    async ChangeFormateTime() {



    },
  },



});
