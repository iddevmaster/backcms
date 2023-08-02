import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
const user_id = useCookie('user_id');


export const ExamStore = defineStore('exam', {  
  state: () => ({
    isOpen:false,
    isOpenCreate:false,
    image:null,
    imagelist:null,
    path:"",
    examlist:[],
    formexam: {
      em_code: "",
      em_name: "",
      em_cover: "",
      em_description: "",
      em_random_amount: null,
      em_time:"00:59:00",
      user_id: user_id.value
    },
    formsearchexam: {
      page: 1,
      per_page: 10,
      search: '',
    },
}
     
),




  getters: {
    GetopenModal(state) {
      return state.isOpen;
    },
    GetopenModalCreate(state) {
      return state.isOpenCreate;
    },
    FormExam(state) {
      return state.formexam;
    },


  },
  
  actions: {



  async fetchExamlist() {

    try {
      const data = await ApiService.post('/exam/main/list', this.formsearchexam).then(response => {
       this.examlist = response.data.data   
       console.log(this.examlist);
      });

    } catch (error) {
      console.log('error');
      return false;
    } finally {

    }


  },
  async fetchCourseId(id){

  },



  async selectentires(data_entires) {

  },
  setCurrentPage(page) {
    this.formsearchcourse.page = page
  },
  async SaveExam() {
    this.formexam.em_cover = this.path

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
  async UpdateCourse(){
    try {
      const updatecourse = await ApiService.put('/course/update/' + this.course_id, this.formDataEditCourse);
      await this.Dellessons(this.course_id);
      await this.SaveLesson(this.course_id);
  //    return response.data
    } catch (error) {
      return [];
    }
  },
  async UpdateLesson(){

   // const del = await ApiService.delete('/course/lesson/delete/' + course_id);


  },


  async ResetForm() {   ////reset Form
    this.formexam = {
      em_code: '',
      em_name: '',
      em_cover: '',
      em_description: '',
      em_random_amount: null,
      em_time: "00:59:00",
      user_id: user_id.value,
    };

  },



  async OpenFormInser() {

    this.isOpenCreate = true;
  //  this.news_id = id;
  },


  async deleteItem(id) {
  
    this.isOpen = true;
  //  this.news_id = id;
  },

  closeModal() {
    this.isOpenCreate = false;
  },

  async UploadfileExam() {  
    let formData = new FormData();
    formData.append('files', this.imagelist);
    try {
    const data = await ApiService.upload('/media_file/upload/file',formData);
    this.path = data.data[0].path
    return true;
    } catch (error) {
      return false;
    } 
  },


  },


  
});
