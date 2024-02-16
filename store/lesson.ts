import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";



export const LessonStore = defineStore('lesson', {
  state: () => ({
    formlesson: {
      page: 1,
      per_page: 5,
      search: '',
    },
    items: [
      { age: 40, first_name: 'Dickerson', last_name: 'Macdonald', status: 'awesome' },
      { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
      { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
    ],
    pending: false,
    lessonlist: [],
    total_page:null,
    total:null,
    current_page:null,
    cs_id:null,
    user_id: null,
    lesson: [],
    selectlesson_form: {
      per_page: 5,
      total_page: 0,
      page: 1,
    },
    formcreatelesson: {
      cs_cover:"",
      cs_name: "",
      cs_video: "",
      cs_description: "",
      user_id: null
    },
    formcreatelessonedit: {
      cs_cover: "",
      cs_name: "",
      cs_video: "",
      cs_description: "",
      user_id: null
    },
    formsearchlesson: {
      page: 1,
      per_page: 5,
      search: '',
    },
    selected: [],
    item:[],
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

    async fetchLessonlist() {
  
      try {
        const data = await ApiService.post('/course/lesson/all', this.formsearchlesson).then(response => {
          this.lessonlist = response.data.data
          this.lesson_total_page = response.data.total_page
          this.lesson_limit_page = response.data.limit_page
          this.lesson_current_page = response.data.current_page
          this.lesson_total_filter = response.data.total_filter
          this.lesson_total = response.data.total
        });
        this.isLoading = false;
        return true;
      } catch (error) {
        return navigateTo('/maintenance');
      } finally {
        this.loading = false
        this.pending = false
      }
    },

    async fetchLessonId(course_id) {
      this.course_id = course_id
     
      try {
        const data = await ApiService.post('/course/lesson/list/' + course_id, this.formlesson).then(response => {
        
      this.lesson = response.data.data
      this.total_page = response.data.total_page
 
     
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
          if(response.status == 200){
            return true;
          }else {
            return false;
          }
        
        });
        return true

      } catch (error) {

        return false;
      }

    },

    async deletelesson() {
try {
  const data = await ApiService.delete('/course/lesson/delete/'+ this.cs_id).then(response => {
    if(response.status == 200){
      return true;
    }else {
      return false;
    }
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

    async selectentireslesson(data_entires) {
      //   this.formsearchlesson.per_page = data_entires;
         this.formsearchlesson.page = data_entires;
       },

       async selectentiresentires(data_entires) {
        this.formsearchlesson.per_page = parseInt(data_entires);
        this.formsearchlesson.page = 1;
      },

    
    setCurrentPage(page) {
      this.formlesson.page = page
    },
    async SeleectAllLessonlist() {
      for (var i = 0; i < this.lessonlist.length; i++) { 
if (!this.item.some(item => item.cs_id === this.lessonlist[i].cs_id)) {
  this.item.push(this.lessonlist[i]);
} 
      }
    },

    async UnSeleectAllLessonlist() {
      for (var i = 0; i < this.lessonlist.length; i++) { 
        if (this.item.some(item => item.cs_id === this.lessonlist[i].cs_id)) {
          this.item = this.item.filter((e)=>e.cs_id !== this.lessonlist[i].cs_id )
        }
      }
    }

  },
});
