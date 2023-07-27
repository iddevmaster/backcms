import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
const user_id = useCookie('user_id');


export const ExamStore = defineStore('exam', {  
  state: () => ({
    isOpen:false,
    isOpenCreate:false,
    formexam: {
      em_code: "",
      em_name: "",
      em_cover: "",
      em_description: "",
      em_random_amount: null,
      em_time:null,
      user_id: user_id.value
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



  async fetchCourslist() {


  },
  async fetchCourseId(id){

  },



  async selectentires(data_entires) {

  },
  setCurrentPage(page) {
    this.formsearchcourse.page = page
  },
  async SaveLesson(id) {



    
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
    console.log('update UpdateLesson');
   // const del = await ApiService.delete('/course/lesson/delete/' + course_id);


  },


  async ResetForm() {   ////reset Form
    this.formDataCourse = {
      course_cover: '',
      course_code: '',
      course_name: '',
      course_description: '',
      user_id: user_id.value,
    };
    this.image = ""
    this.imagelist = ""
    this.path = ""
    this.lessonlist = [];

  },



  async OpenFormInser() {

    this.isOpenCreate = true;
  //  this.news_id = id;
  },


  async deleteItem(id) {
    console.log('deleteItem',id);
    this.isOpen = true;
  //  this.news_id = id;
  },

  closeModal() {
    this.isOpen = false;
  },

  async uploadfilecourse(x){
    const data = await ApiService.upload('/media_file/upload/file',x);
    return data;

  },

  async uploadf(x){
    const data = await ApiService.upload('/media_file/upload/file',x);
   return data;
  },
  },


  
});
