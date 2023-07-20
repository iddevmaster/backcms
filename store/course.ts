import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
const user_id = useCookie('user_id');


export const CourseStore = defineStore('course', {
  state: () => ({
courselist:[],
image:null,
imagelist:null,
path:"",
formDataCourse: {
  course_cover: "xxx1",
  course_code: "xxxxx2",
  course_name: "x3xxxx",
  course_description: "xxxxx4",
  user_id: user_id.value
},
formsearchcourse: {
  page: 1,
  per_page: 20,
  search: '',
},
  }
     
),


  getters: {
    Courselist(state) {
      return state.courselist;
    },
    FormDataCourse(state) {
      return state.formDataCourse;
    },
    Images(state) {
      return state.image;
    },

  },
  
  actions: {



  async fetchCourslist() {
    try {
      const data = await ApiService.post('/course/list', this.formsearchcourse).then(response => {
       this.courselist = response.data.data   
      });

    } catch (error) {
      console.log('error');
      return false;
    } finally {
      this.loading = false
      this.pending = false
    }
  },

  async SaveCourse() {
    try {
      const data = await ApiService.post('/course/create', this.formDataCourse).then(response => {
        return true;
      });
    } catch (error) {
      return false;
   
    } finally {
    }
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


  },
  async UploadfileCourse() {   ////reset Form
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
