import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";



export const LessonStore = defineStore('lesson', {
  state: () => ({
    formlesson: {
      page: 1,
      per_page: 200,
      search: '',
    },
    cs_id:null,
    user_id: null,
    lesson: [],
    formcreatelesson: {
      cs_cover: "",
      cs_name: "",
      cs_video: "",
      cs_description: "",
      course_id: "",
      user_id: null
    },
    formcreatelessonedit: {
      cs_cover: "",
      cs_name: "",
      cs_video: "",
      cs_description: "",
      course_id: "",
      user_id: null
    },
    imagelist: null,
    imageReq: false,
    GetopenModalCreate: false,
    GetopenModalEdit: false,
    GetopenModal: false
  }

  ),


  getters: {
    FormLesson(state) {
      return state.formcreatelesson;
    },
    FormEditLesson(state) {
      return state.formcreatelessonedit;
    },


    

  },

  actions: {

    async fetchCourse(course_id) {
      this.course_id = course_id
      try {
        const data = await ApiService.get('/course/get/' + course_id).then(response => {
          return response.status;
        });
        return data

      } catch (error) {

        return false;
      }
    },

    async fetchLessonId(course_id) {
      this.course_id = course_id
      try {
        const data = await ApiService.post('/course/lesson/list/' + course_id, this.formlesson).then(response => {
          console.log(response.data);
          this.lesson = response.data.data
        });
        return true

      } catch (error) {

        return false;
      }
    },

    async selectlessId(cs_id) {
      this.cs_id = cs_id
    },
    async deletelessId() {
   
      try {
        const data = await ApiService.delete('/course/lesson/delete/' + this.cs_id).then(response => {
        
        });
        return true

      } catch (error) {

        return false;
      }
    },

    async OpenFormInser() {
      this.GetopenModalCreate = true;
    },
    async saveformLesson() {
      this.formcreatelesson.course_id = this.course_id;
     
      try {
        const data = await ApiService.post('/course/lesson/create', this.formcreatelesson).then(response => {
         
          return true
        });
        return true

      } catch (error) {

        return false;
      }

    },

    async updateformLesson() { 
      this.formcreatelessonedit.user_id = this.user_id;

      try {
        const data = await ApiService.put('/course/lesson/update/'+ this.cs_id, this.formcreatelessonedit).then(response => {
      
         
          return true
        });
        return true

      } catch (error) {

        return false;
      }

    },

    async UploadfileLesson() {
      let formData = new FormData();
      formData.append('files', this.imagelist);
      if (this.imagelist) {
        try {
          const data = await ApiService.upload('/media_file/upload/file', formData);
          //  this.path = data.data[0].path
          this.formcreatelesson.cs_cover = data.data[0].path
          this.formcreatelessonedit.cs_cover = data.data[0].path
          // this.formexamedit.em_cover = data.data[0].path
          return true;
        } catch (error) {
          return false;
        }
      }
    },

    async fetchLessonIdedit(cs_id){
      this.cs_id = cs_id;
      try {
        const data = await ApiService.get('/course/lesson/get/'+this.cs_id).then(response => {

          this.formcreatelessonedit.cs_cover = response.data.cs_cover
          this.formcreatelessonedit.cs_name = response.data.cs_name
          this.formcreatelessonedit.cs_video = response.data.cs_video
          this.formcreatelessonedit.cs_description = response.data.cs_description
          this.formcreatelessonedit.course_id = response.data.course_id
          
          return true
        });
        return true

      } catch (error) {

        return false;
      }
      
    },
    async ResetForm() {

      this.image = null;
      this.imagelist = null;

      this.formcreatelesson.cs_cover = '',
        this.formcreatelesson.cs_name = '',
        this.formcreatelesson.cs_video = '',
        this.formcreatelesson.cs_description = ''
    },

  },
});
