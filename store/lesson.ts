import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";



export const LessonStore = defineStore('lesson', {
  state: () => ({
    isLoading:false,
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
    course_del:null,
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
    selectlesson_form_menu_less: {
      per_page: 5,
      total_page: 0,
      page: 1,
      search: '',
      cg_id: 0,
    },
    selectlesson_form_menu_course: {
      per_page: 5,
      total_page: 0,
      page: 1,
      search: '',
      cg_id: 0,
    },
    formselect: {
      per_page: 5,
      total_page: 0,
      page: 1,
      cg_id:0,
      search:''
    },
    formselectdelete: {
      per_page: 5,
      total_page: 0,
      page: 1,
    },
    formcreatelesson: {
      cs_cover:"",
      cs_name: "",
      cs_video: "",
      cs_description: "",
      user_id: null,
      cg_id:null,
    },
    formcreatelessonedit: {
      cs_cover: "",
      cs_name: "",
      cs_video: "",
      cs_description: "",
      user_id: null,
      cg_id:null
    },
    formsearchlesson: {
      page: 1,
      per_page: 50,
      search: '',
      exclude:[]
    },
    formsearchlessongroup:{
      page: 1,
      per_page: 50,
      search: '',
    },
    selected: [],
    lesson_item:[],
    myselect_group:null,
    item:[],
    itemselect:[],
    group:[],
    cg_id:0,
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
      this.lessonlist = [];

      try {
        const data = await ApiService.post('/course/lesson/all?cg_id='+this.cg_id, this.formsearchlesson).then(response => {
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
        const del = await ApiService.delete('course/cluster/delete?course_id='+this.course_del+'&cs_id='+this.cs_id+'').then(response => {
          return true
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
       
          this.myselect_group = null
    
          return true
        });
        return true

      } catch (error) {

        return false;
      }

    },

    async updateformLesson() { 
      console.log(this.myselect_group);


      if(this.myselect_group == null){
return false;
      }

      this.formcreatelessonedit.cg_id = this.myselect_group.cg_id;
    
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

    async fetchLessonIdedit(item){
          this.myselect_group = null
          this.cs_id = item.cs_id
          this.formcreatelessonedit.cs_cover = item.cs_cover
          this.formcreatelessonedit.cs_name = item.cs_name
          this.formcreatelessonedit.cs_video = item.cs_video
          this.formcreatelessonedit.cs_description = item.cs_description
     
     //   this.myselect_group = this.group.filter(x => x.cg_id === item.cg_id);
     if(item.cg_id != 0){
      const a = this.group.find(items => items.cg_id === item.cg_id);
      this.myselect_group = [a];
     }else {
      this.myselect_group = null
     }
       

     // this.cs_id = cs_id;
      // try {
      //   const data = await ApiService.get('/course/lesson/get/'+this.cs_id).then(response => {

      //     this.formcreatelessonedit.cs_cover = response.data.cs_cover
      //     this.formcreatelessonedit.cs_name = response.data.cs_name
      //     this.formcreatelessonedit.cs_video = response.data.cs_video
      //     this.formcreatelessonedit.cs_description = response.data.cs_description
      //     console.log(response.data);

          
      //     return true
      //   });
      //   return true

      // } catch (error) {

      //   return false;
      // }
      
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

     this.itemselect = this.item
    },

    async SelectOneessonlist() {

 

this.itemselect = this.item
       
    },

    async CheckSelectRemove() {
      console.log('2');
for (var i = 0; i < this.item.length; i++) { 
  const objWithIdIndex = this.lessonlist.findIndex((obj) => obj.cs_id === this.item[i].cs_id);

if (objWithIdIndex > -1) {
  this.lessonlist.splice(objWithIdIndex, 1);
}

}

// console.log(this.lesson_item);

    },

    async UnSeleectAllLessonlist() {
      for (var i = 0; i < this.lessonlist.length; i++) { 
        if (this.item.some(item => item.cs_id === this.lessonlist[i].cs_id)) {
          this.item = this.item.filter((e)=>e.cs_id !== this.lessonlist[i].cs_id )
        }
      }
    },

    async fetchGrouplist() {
      this.group = [];
      const checkpag =  await ApiService.post('/course/group/all',this.formsearchlessongroup)


    if(checkpag){
      if(checkpag.data.total_page > 1){
        for(let i = 0; i < checkpag.data.total_page; i++){
          this.formsearchlessongroup.page = i + 1;
          const data =  await ApiService.post('/course/group/all',this.formsearchlessongroup)
          // const Storage = LessonStore();
          for(let i = 0; i < data.data.data.length; i++){
            this.group.push(data.data.data[i]);
          }
      }
  
      }else {
        const data =  await ApiService.post('/course/group/all',this.formsearchlessongroup)
        this.group = data.data.data
      }

    }
  
      
    },

    async paginatedItems() {


      if(this.selectlesson_form_menu_less.search != ""){
        this.lesson_item = this.lessonlist.filter(item => item.cs_name.includes(this.selectlesson_form_menu_less.search));
      }
      if(this.selectlesson_form_menu_less.search == ""){
        this.lesson_item = this.lessonlist.filter(item => item.cs_name.includes(this.selectlesson_form_menu_less.search));
      }

      if(this.selectlesson_form_menu_less.cg_id != 0){
        this.lesson_item = this.lesson_item.filter(item => item.cg_id == this.selectlesson_form_menu_less.cg_id);
      }
      if(this.selectlesson_form_menu_less.cg_id == 0){
      
       
      }

      const startIndex = (this.selectlesson_form_menu_less.page - 1) * this.selectlesson_form_menu_less.per_page;
      const endIndex = startIndex + this.selectlesson_form_menu_less.per_page;
      this.selectlesson_form_menu_less.total_page = Math.ceil(this.lesson_item.length / this.selectlesson_form_menu_less.per_page);
      this.lesson_item = this.lesson_item.slice(startIndex, endIndex);
      this.max = endIndex;
    },

    async paginatedItemsClear() {
   
    },


    async paginatedItemsCourse() {

      this.lesson_item = this.lessonlist;
     
      if(this.selectlesson_form_menu_course.search != ""){
        this.lesson_item = this.lesson_item.filter(item => item.cs_name.includes(this.selectlesson_form_menu_course.search));
      }
      // if(this.selectlesson_form_menu_course.search == ""){
      //   this.lesson_item = this.lesson_item.filter(item => item.cs_name.includes(this.selectlesson_form_menu_course.search));
      // }

      if(this.selectlesson_form_menu_course.cg_id != 0){
        this.lesson_item = this.lesson_item.filter(item => item.cg_id == this.selectlesson_form_menu_course.cg_id);
      }
      if(this.selectlesson_form_menu_course.cg_id == 0){
      
       
      }

      const startIndex = (this.selectlesson_form_menu_course.page - 1) * this.selectlesson_form_menu_course.per_page;
      const endIndex = startIndex + this.selectlesson_form_menu_course.per_page;
      this.selectlesson_form_menu_course.total_page = Math.ceil(this.lesson_item.length / this.selectlesson_form_menu_course.per_page);
      this.lesson_item = this.lesson_item.slice(startIndex, endIndex);
      this.max = endIndex;
   
 
    },

    async paginatedItemsSelete() {

      this.formselect.total_page = Math.ceil(this.item.length / this.formselect.per_page);
      if(this.formselect.total_page == 1){
        this.formselect.page = 1
      }
      const startIndex = (this.formselect.page - 1) * this.formselect.per_page;
     
  
      const endIndex = startIndex + this.formselect.per_page;
   
   


   
      this.selected = this.item.slice(startIndex, endIndex);
      this.max_selc = endIndex
    //  this.item = [];
    },


    async paginatedItemsSeleteFitter() {
      this.selected = this.item

      if(this.formselect.search != ""){
      this.selected = this.selected.filter(item => item.cs_name.includes(this.formselect.search));
    
      }
      if(this.formselect.search == ""){
       this.selected = this.selected.filter(item => item.cs_name.includes(this.formselect.search));
      }
      if(this.formselect.cg_id != 0){
        this.selected = this.selected.filter(item => item.cg_id == this.formselect.cg_id);
      }
      if(this.formselect.cg_id == 0){
      
       
      }
   
      const startIndex = (this.formselect.page - 1) * this.formselect.per_page;
      const endIndex = startIndex + this.formselect.per_page;
      this.formselect.total_page = Math.ceil(this.selected.length / this.formselect.per_page);
   
      this.selected = this.selected.slice(startIndex, endIndex);
      this.max_selc = endIndex
    //  this.item = [];
    },


    async RemoveSelect(items) {
    
      const objWithIdIndex = this.item.findIndex((obj) => obj.cs_id === items.cs_id);
   if (objWithIdIndex > -1) {
    this.item.splice(objWithIdIndex, 1);
  }
 // this.lessonlist.push(this.items);
    },


    async RemoveLesson() {
      for (var i = 0; i < this.selected.length; i++) { 
        if (this.lessonlist.some(item => item.cs_id === this.selected[i].cs_id)) {
          this.lessonlist = this.lessonlist.filter((e)=>e.cs_id !== this.selected[i].cs_id )
        }
      }
    },

    async ManageSelectRemove() {
      this.formsearchlesson.exclude = []
for (var i = 0; i < this.item.length; i++) { 
this.formsearchlesson.exclude.push(this.item[i].cs_id)
}

this.itemselect = [];

    },

    async ManageSelectRemoveEdit() {
      this.formsearchlesson.exclude = []
for (var i = 0; i < this.item.length; i++) { 
this.formsearchlesson.exclude.push(this.item[i].cs_id)
}

this.itemselect = [];

    },
    async deleteSelecte() {
      const startIndex = (this.formselect.page - 1) * this.formselect.per_page;
      const endIndex = startIndex + this.formselect.per_page;
      this.selected = this.item.slice(startIndex, endIndex);

    
     

      for (var i = 0; i < this.selected.length; i++) { 
     const objWithIdIndex = this.item.findIndex((obj) => obj.cs_id === this.selected[i].cs_id);
     if (objWithIdIndex > -1) {
      this.item.splice(objWithIdIndex, 1);
    }
      }
      this.formselect.page = 1

    }

  },


  
});
