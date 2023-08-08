import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
const user_id = useCookie('user_id');


export const CourseStore = defineStore('course', {
  state: () => ({
    courselist: [],
    image: null,
    imagelist: null,
    path: "",
    course_id: null,
    pending: false,
    isOpen: false,
    lessonlist: [],
    del_lesson: [],
    get_lesson_id: [],
    lessoneditlist: [],
    total_page: null,
    limit_page: null,
    current_page: null,
    total_filter: null,
    total: null,
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
    vdo: "/assets/images/sample-5.mp4"
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
    Pending(state) {
      return state.pending;
    },

  },

  actions: {



    async fetchCourslist() {
      try {
        const data = await ApiService.post('/course/list', this.formsearchcourse).then(response => {
          this.courselist = response.data.data
          this.total_page = response.data.total_page
          this.limit_page = response.data.limit_page
          this.current_page = response.data.current_page
          this.total_filter = response.data.total_filter
          this.total = response.data.total
        });

      } catch (error) {
      
        return false;
      } finally {
        this.loading = false
        this.pending = false
      }
    },
    async fetchCourseId(id) {
      this.course_id = id;

      let item = this.courselist.filter(actor => actor.course_id == id);
      this.formDataEditCourse.course_cover = item[0].course_cover
      this.formDataEditCourse.course_code = item[0].course_code
      this.formDataEditCourse.course_name = item[0].course_name
      this.formDataEditCourse.course_description = item[0].course_description
      this.formDataEditCourse.user_id = user_id.value
      this.image = item[0].course_cover

      const data = await ApiService.post('/course/lesson/list/' + id, this.formsearchcourse).then(response => {
        if (response.data.data) {
          this.lessonlist = [];
          this.del_lesson = [];
          const sortedArray = response.data.data;
          // Sort the array based on the 'id' property in ascending order
          sortedArray.sort((a, b) => a.cs_id - b.cs_id
          );
          for (var i = 0; i < sortedArray.length; i++) {
            this.lessonlist.push(sortedArray[i]);
            this.del_lesson.push(sortedArray[i].cs_id);
          }

        }


        //this.lessoneditlist.response.data.data =
      });
    },

    async SaveCourse() {
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

    async selectentires(data_entires) {
      //  console.log('data_entires',data_entires);
      this.formsearchcourse.per_page = data_entires;
      this.formsearchcourse.page = 1;
    },
    setCurrentPage(page) {
      this.formsearchcourse.page = page
    },
    async SaveLesson(id) {
  
      for (var i = 0; i < this.lessonlist.length; i++) {
        this.formDatalesson.cs_cover = this.lessonlist[i].cs_cover
        this.formDatalesson.cs_name = this.lessonlist[i].cs_name
        this.formDatalesson.cs_video = this.lessonlist[i].cs_video
        this.formDatalesson.cs_description = this.lessonlist[i].cs_description
        this.formDatalesson.course_id = id
        this.formDatalesson.user_id = user_id.value
        console.log('SaveLesson Form', this.formDatalesson);
        await this.delay(1000);
        const data = ApiService.post('/course/lesson/create', this.formDatalesson)

        {


        }

      }

      await this.ResetForm()



    },
    async UpdateCourse() {
      try {
        const updatecourse = await ApiService.put('/course/update/' + this.course_id, this.formDataEditCourse);
        await this.Dellessons(this.course_id);
        await this.SaveLesson(this.course_id);
        //    return response.data
      } catch (error) {
        return false;
      }
    },
    async UpdateLesson() {

      // const del = await ApiService.delete('/course/lesson/delete/' + course_id);


    },
    async GetLesson(id) {
      this.get_lesson_id = []
      const getid = await ApiService.post('/course/lesson/list/' + id, this.formsearchcourse).then(response => {

        if (response.data.data) {
          for (var i = 0; i < response.data.data.length; i++) {
            this.get_lesson_id.push(response.data.data[i].cs_id);

          }
        }

      });



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
    // async UploadfileCourse() {
    //   let formData = new FormData();
    //   formData.append('files', this.imagelist);
    //   try {
    //     const data = await ApiService.upload('/media_file/upload/file', formData);
    //     this.path = data.data[0].path
    //     return true;
    //   } catch (error) {
    //     return false;
    //   }
    // },
    async UploadfileCourse() {  
  
      let formData = new FormData();
      formData.append('files', this.imagelist);
      if(this.imagelist){
        try {
          const data = await ApiService.upload('/media_file/upload/file',formData);
        //  this.path = data.data[0].path
        this.formDataCourse.course_cover = data.data[0].path
          this.formDataEditCourse.course_cover = data.data[0].path
          return true;
          } catch (error) {
            return false;
          } 
      }
    },
    async deleteItem(course) {
      this.isOpen = true;
      this.course_id = course.course_id;
    },
    async deleteItem_id(course_id) {

      try {
        const getlesson = await this.Dellessons(course_id);
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
    async deletelesson(item) {

      const index = this.lessonlist[item]
      if (index !== -1) {
        this.lessonlist.splice(index, 1)
      }


    },
    async Dellessons(id) {

      const getid = await ApiService.post('/course/lesson/list/' + id, this.formsearchcourse).then(response => {
        if (response.data.data) {
          for (var i = 0; i < response.data.data.length; i++) {
            const del = ApiService.delete('/course/lesson/delete/' + response.data.data[i].cs_id);
          }
        }
      });
    },


    async Adlesson() {
      this.lessonlist
      const daa = {
        cs_cover: "-",
        cs_name: "-",
        cs_video: "-",
        cs_description: "-",
        crt_date: "2023-07-19T10:24:10.000Z",
        udp_date: "2023-07-19T10:24:10.000Z",
        user_create: "เจน เป็นมงคล",
        user_update: "เจน เป็นมงคล",
      }
      this.lessonlist.push(daa);
    },




    closeModal() {
      this.isOpen = false;
    },

    async uploadfilecourse(x) {
      const data = await ApiService.upload('/media_file/upload/file', x);
      return data;

    },

    async uploadf(x) {

      const data = await ApiService.upload('/media_file/upload/file', x);
      return data;
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },



});
