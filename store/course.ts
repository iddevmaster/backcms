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
course_id:null,
isOpen:false,
lessonlist:[],
del_lesson:[],
lessoneditlist:[],
formDataCourse: {
  course_cover: "",
  course_code: "",
  course_name: "",
  course_description: "",
  user_id: user_id.value
},
formDataEditCourse: {
  course_cover: "",
  course_code: "",
  course_name: "",
  course_description: "",
  user_id: user_id.value
},
formDatalesson: {
  cs_cover: "",
  cs_name: "",
  cs_video: "",
  cs_description: "",
  course_id: null,
  user_id: user_id.value
},
formDataeditlesson: {
  cs_cover: "",
  cs_name: "",
  cs_video: "",
  cs_description: "",
  course_id: null,
  user_id: user_id.value
},
formsearchcourse: {
  page: 1,
  per_page: 10,
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
    
    FormDataEditCourse(state) {
      return state.formDataEditCourse;
    },
    Images(state) {
      return state.image;
    },
    GetopenModal(state) {
      return state.isOpen;
    },
    GetopenModal_ID(state) {
      return state.course_id;
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
  async fetchCourseId(id){
this.course_id = id;
let item  = this.courselist.filter(actor => actor.course_id == id);
this.formDataEditCourse.course_cover = item[0].course_cover
this.formDataEditCourse.course_code = item[0].course_code
this.formDataEditCourse.course_name = item[0].course_name
this.formDataEditCourse.course_description = item[0].course_description
this.formDataEditCourse.user_id = user_id.value

const data = await ApiService.post('/course/lesson/list/'+id, this.formsearchcourse).then(response => {


if(response.data.data){
  for (var i = 0; i < response.data.data.length; i++) {

// this.formDataeditlesson.cs_cover = response.data.data[i]
// this.formDataeditlesson.cs_name = response.data.data[i]
// this.formDataeditlesson.cs_video = response.data.data[i]
// this.formDataeditlesson.cs_description = response.data.data[i]
// this.formDataeditlesson.course_id = response.data.data[i]
// this.formDataeditlesson.user_id = user_id.value

// console.log(i);
// console.log(response.data.data[i]);
this.lessonlist.push(response.data.data[i]);

this.del_lesson.push(response.data.data[i].cs_id);
  }

}


 //this.lessoneditlist.response.data.data =
  });
  },

  async SaveCourse() {
    this.formDataCourse.course_cover = this.path
 
    try {
      const data = await ApiService.post('/course/create', this.formDataCourse).then(response => {
      this.SaveLesson(response.data.insertId)
        return true;
      });
    } catch (error) {
      return false;
   
    } finally {
    }
  },
  async SaveLesson(id) {
    for (var i = 0; i < this.lessonlist.length; i++) {
     this.formDatalesson.cs_cover = this.lessonlist[i].cs_cover
     this.formDatalesson.cs_name = this.lessonlist[i].cs_name
     this.formDatalesson.cs_video = this.lessonlist[i].cs_video
     this.formDatalesson.cs_description = this.lessonlist[i].cs_description
     this.formDatalesson.course_id = id
     this.formDatalesson.user_id = user_id.value
     try {
      const data = await ApiService.post('/course/lesson/create', this.formDatalesson).then(response => {
        return true;
      });
    } catch (error) {
      return false;
    } finally {
    }
    
  {

     
    }
  
  }


    
  },
  async UpdateCourse(){
    try {
      const updatecourse = await ApiService.put('/course/update/' + this.course_id, this.formDataEditCourse);
      await this.Dellessons();
     // await this.UpdateLesson();
      return response.data
    } catch (error) {
      return [];
    }
  },
  async UpdateLesson(){
    ////
    const del = await ApiService.delete('/course/lesson/delete/' + course_id);


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
  async UploadfileCourse() {  
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
  async deleteItem(course) {
    this.isOpen = true;
   this.course_id = course.course_id;
  },
  async deleteItem_id(course_id){

    try {
      console.log('try');
      const del = await ApiService.delete('/course/delete/' + course_id);
      this.isOpen = false;
      const index = this.courselist.findIndex(item => item.course_id === course_id)
      if (index !== -1) {
        this.courselist.splice(index, 1)
      }
 
      return true;
    } catch (error) {
    
      return false;
    }

  },
  async deletelesson(cs_id){
    const index = this.lessonlist.findIndex(item => item.cs_id === cs_id)
    if (index !== -1) {
      this.lessonlist.splice(index, 1)
    }
  },
  async Dellessons(){
  //  const del = await ApiService.delete('/course/lesson/delete/' + course_id);
  },

  
  async Adlesson(){
this.lessonlist
const daa = {
  cs_cover:"007",
  cs_name:"007",
  cs_video:"007",
  cs_description:"007",
  crt_date:"2023-07-19T10:24:10.000Z",
  udp_date:"2023-07-19T10:24:10.000Z",
  user_create:"เจน เป็นมงคล",
  user_update:"เจน เป็นมงคล",
}
this.lessonlist.push(daa);
},




  closeModal() {
    this.isOpen = false;
  },

  async uploadfilecourse(x){
    const data = await ApiService.upload('/media_file/upload/file',x);
    return data;
 
  },

  async uploadf(x){

    // let formData = new FormData();
    // formData.append('files', this.imagelist);

    const data = await ApiService.upload('/media_file/upload/file',x);
   return data;
  },
  },


  
});
