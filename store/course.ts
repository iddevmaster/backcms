import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";
import { ref } from 'vue';


export const CourseStore = defineStore('course', {
  state: () => ({
    courselist: [],
    openModalCreateCon:false,
    openModalError:false,
    openCreateConEdit:false,
    openEditConEdit:false,
    AlertB:false,
    AlertA:false,
    AlertCondition:false,
    condition_id:null,
    sortedbyASC: true,
    fileInputRef: ref(null),
    image: null,
    isLoading:true,
    isLoaddingsave:false,
    imagelist: null,
    imagelist_pdf: null,
    mycondition_group:null,
    path: "",
    pdf:null,
    course_id: null,
    pending: false,
    isOpen: false,
    cs_id:null,
    selectedFiles:[],
    selectedFilesError:[],
    selectedEditFiles:[],
    savepd:[],
    GetopenModalLesson:false,
    mycondition: [],
    editmycondition: [],
    lessonlist: [],
    user_id:null,
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
      course_name_lo: "",
      course_name_eng: "",
      course_description: "",
      course_remark_a:"",
      course_remark_b:"",
      user_id: null
    },
    formDataEditCourse: {
      course_cover: "",
      course_code: "",
      course_name_lo: "",
      course_name_eng: "",
      course_description: "",
      course_file_pdf:"",
      course_remark_a:"",
      course_remark_b:"",
      exam_desc:{},
      user_id: null
    },

    formDataCondit :{
      cc_value_a: "",
      cc_value_b: "",
      cg_id: "",
      cg_name: "",
    },
    formDatalesson: {
      cs_cover: "",
      cs_name: "",
      cs_video: "",
      cs_description: "",
      course_id: null,
      user_id: null
    },
    filepdf:[],
    formDataeditlesson: {
      cs_cover: "",
      cs_name: "",
      cs_video: "",
      cs_description: "",
      course_id: null,
      user_id: null
    },
    formsearchcourse: {
      page: 1,
      per_page: 5,
      search: '',
      active_include:[0,1],
    },
    formsearchlesson: {
      page: 1,
      per_page: 5,
      search: '',
    },
    formsearcheditlesson: {
      page: 1,
      per_page: 50,
      search: '',
    },
    clustercourse:{
     
    },
    savelesson: [],
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
    FormDataCondition(state) {
      return state.formDataCondit;
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

    async ResetFetch() {

      this.formsearchcourse.page = 1
      this.formsearchcourse.per_page = 5
      this.formsearchcourse.search = ''
      this.formsearchcourse.active_include = [0,1];


      
    },

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
        this.isLoading = false;
        return true;
      } catch (error) {
        return navigateTo('/maintenance');
      } finally {
        this.loading = false
        this.pending = false
      }
    },

    async fetchCoursActive(item) { 
      try {
        const data = await ApiService.get('/course/active/'+ item.active +'/'+ item.course_id).then(response => {
          if(response.status == 200) {
            return true;
          }
        return false;
        });
        return data;
      } catch (error) {
       
      } 

    },


    async fetchCourseId(id) {
      this.course_id = id;
      const data = await ApiService.get('/course/get/' + this.course_id).then(response => {
    
        this.formDataEditCourse.course_cover = response.data.course_cover
        this.formDataEditCourse.course_code = response.data.course_code
        this.formDataEditCourse.course_name_lo = response.data.course_name_lo
        this.formDataEditCourse.course_name_eng = response.data.course_name_eng
        this.formDataEditCourse.course_remark_a = response.data.course_remark_a
        this.formDataEditCourse.course_remark_b = response.data.course_remark_b
        this.formDataEditCourse.course_description = response.data.course_description
        this.formDataEditCourse.active = response.data.active

        
        this.formDataEditCourse.is_complete = response.data.is_complete
        this.formDataEditCourse.total_course_group = response.data.total_course_group
        this.formDataEditCourse.total_lesson = response.data.total_lesson
        this.formDataEditCourse.total_video = response.data.total_video
        this.formDataEditCourse.exam_desc = response.data.exam_desc
        this.image = response.data.course_cover
      });
    },


    
    async fetchCourseCgId(id) {
      const data = await ApiService.get('/course/cluster/get/' + id).then(response => {
        this.clustercourse = response.data;

      });
    },

    async fetchGetPdf(id) {
      this.course_id = id;
      const data = await ApiService.get('/course/document/get/' + this.course_id).then(response => {
this.selectedEditFiles = response.data;


      });
    },

    async fetchLessonInCourseId() {

      const checkpag =  await ApiService.post('/course/lesson/list/' + this.course_id,this.formsearcheditlesson)
   

      if(checkpag){
        if(checkpag.data.total_page > 1){
          for(let i = 0; i < checkpag.data.total_page; i++){
            this.formsearcheditlesson.page = i + 1;
            const data =  await ApiService.post('/course/lesson/list/' + this.course_id,this.formsearcheditlesson)
            const Storage = LessonStore();
            for(let i = 0; i < data.data.data.length; i++){
              Storage.item.push(data.data.data[i]);
            }
        }
        const Storage = LessonStore();
        Storage.formselect.total_page = checkpag.data.total_page
    
        
        }else {
          const Storage = LessonStore();

Storage.item = checkpag.data.data
//Storage.selected = checkpag.data.data
          
        }
        
      }


    },

    async SaveCourse() {
      this.formDataCourse.course_remark_a = '-';

      try {
        const data = await ApiService.post('/course/create', this.formDataCourse).then(response => {
          if(response.status == 200){
            this.course_id = response.data.insertId;
            return true
          }else {
            return false
          }
  

        });
        return data;
      } catch (error) {
        return false;
      } 

    },

    async paginatedItems() {
      const Storage = LessonStore();
      const startIndex = (Storage.selectlesson_form.page - 1) * Storage.selectlesson_form.per_page;
      const endIndex = startIndex + Storage.selectlesson_form.per_page;
      Storage.selectlesson_form.total_page = Math.ceil(Storage.item.length / Storage.selectlesson_form.per_page);
      Storage.selected = Storage.item.slice(startIndex, endIndex);
    },

    async paginatedItemsClear() {
      const Storage = LessonStore();
      Storage.selected = [];

    },

    async changePage() {
      const Storage = LessonStore();

   Storage.selected = Storage.selected.slice(0, 2);
      
    },

    async SaveLessoncluster() {
   
      this.savelesson = [];
     const Storage = LessonStore();

     if(Storage.item.length > 0){
      for (var i = 0; i < Storage.item.length; i++) { 
        const les = {cs_id:Storage.item[i].cs_id}
        this.savelesson.push(les);
      }
      try {
        const data = await ApiService.post('/course/cluster/create/'+this.course_id, this.savelesson).then(response => {
        });
        return true;
      } catch (error) {
        return false;
      } 

     }
    


    },

    async ClearLessoncluster() {

      try {
        const data = await ApiService.delete('/course/cluster/empty/'+this.course_id).then(response => {
          return true;

        });
        return true;
      } catch (error) {
        return false;
      } 


   

   },


  

    async selectentires(data_entires) {
      this.formsearchcourse.per_page = data_entires;
      this.formsearchcourse.page = 1;
    },



    setCurrentPage(page) {
      this.formsearchcourse.page = page
    },
    async SaveLesson() {
      for (var i = 0; i < this.lessonlist.length; i++) {

        this.formDatalesson.cs_cover = this.lessonlist[i].cs_cover
        this.formDatalesson.cs_name = this.lessonlist[i].cs_name
        this.formDatalesson.cs_video = this.lessonlist[i].cs_video
        this.formDatalesson.cs_description = this.lessonlist[i].cs_description
        this.formDatalesson.user_id = this.user_id
        this.formDatalesson.course_id = this.course_id;


      
      //  const data = ApiService.post('/course/lesson/create', this.formDatalesson)

       

      }

      await this.ResetForm()

return true;

    },
    async UpdateCourse() {
      this.formDataEditCourse.user_id = this.user_id
      try {
        const updatecourse = await ApiService.put('/course/update/' + this.course_id, this.formDataEditCourse);
    //  await this.Dellessons(this.course_id);
        // await this.SaveLesson(this.course_id);
        //    return response.data
        this.imagelist = null;
  
        return true;
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
        user_id:this.user_id
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
  
      if(this.imagelist){
        let formData = new FormData();
     formData.append('files', this.imagelist);
        const data = await ApiService.upload('/media_file/upload/file',formData);
        this.formDataCourse.course_cover = data.data[0].path
          this.formDataEditCourse.course_cover = data.data[0].path
      }

    },
    async UploadfileCoursePdf() { 
      console.log(this.selectedFiles);
      if(this.selectedFiles){
        const formData = new FormData();
        Array.from(this.selectedFiles).forEach(file => {
          formData.append('files', file);
        });
        const pdf = await ApiService.upload('/media_file/upload/file',formData);
        this.pdf = pdf.data;
        
        }
    },

    async UploadfileCoursePdfEdit() { 
  
      if(this.selectedFiles){
        const formData = new FormData();
        Array.from(this.selectedFiles).forEach(file => {
          formData.append('files', file);
        });
        const pdf = await ApiService.upload('/media_file/upload/file',formData);
        this.pdf = pdf.data
   
        this.selectedFiles = [];
       

        }
    },
    async Savepdf() { 
      this.filepdf = [];
      console.log(this.pdf);
      if(this.pdf.length > 0){
        
        for (var i = 0; i < this.pdf.length; i++) {
          const daa = {cd_name:this.pdf[i].originalname,cd_path:this.pdf[i].path,course_id:this.course_id}
          this.filepdf.push(daa);
          const savepdf = await ApiService.post('/course/document/create', daa)
       console.log(savepdf);
            }
      }

    },

    async deletepdf(id) {
      const deletepdf = await ApiService.delete('/course/document/delete/'+id)
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



      const getid = await ApiService.post('/course/lesson/list/' + id, this.formsearchcourse)
        if(getid){
          if(getid.data.total_page > 1){ 
            this.formsearchcourse.page = 1;
            this.delless = [];
            ////////////////// จัดdata //////////////////////
            for(let i = 0; i < getid.data.total_page; i++){
              this.formsearchcourse.page = i + 1;
              const data =  await ApiService.post('/course/lesson/list/' + id,this.formsearchcourse)
              for(let i = 0; i < data.data.data.length; i++){
                this.delless.push(data.data.data[i]);
              }
            
          }
          ///////////////del ต่อ///////////////////////
          for (var i = 0; i < this.delless.length; i++) {
            const del = ApiService.delete('/course/cluster/delete?course_id='+id+'&cs_id='+this.delless[i].cs_id+'');
            }
            this.formsearchcourse.page = 1;
          ///////////////del ต่อ///////////////////////
          }
          if(getid.data.total_page == 1){ 
            if(getid.data.data.length > 0){
            for (var i = 0; i < getid.data.data.length; i++) {
            const del = ApiService.delete('/course/cluster/delete?course_id='+id+'&cs_id='+getid.data.data[i].cs_id+'');
            }
            }
          }
     
        }else {
         
          return true;
        }
    },


    async Adlesson() {
      this.lessonlist
      const daa = {
        cs_cover: "",
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


    async deleteLesson() {


      try {

        const delcs_id = await ApiService.delete('/course/lesson/delete/' + this.cs_id).then(response => {
       

          return true
        });
    
        return true;
        } catch (error) {
          return false;
        } 


   
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

    setFileInputRef(ref) {
      this.fileInputRef = ref;
    },

    async ResetCondition() {
      this.formDataCondit.cg_name = "";
      this.formDataCondit.cg_id = "";
      this.formDataCondit.cc_value_a = "";
      this.formDataCondit.cc_value_b = "";
    },
    async AddCondition() {

      console.log(this.formDataCondit);
   //   this.mycondition.push(this.formDataCondit)


      const b = {cg_id:this.formDataCondit.cg_id,cg_name:this.formDataCondit.cg_name,cc_value_a:this.formDataCondit.cc_value_a,cc_value_b:this.formDataCondit.cc_value_b}
      this.mycondition.push(b)


    },

    async SaveCondition() {
let ax = [];
      for(let i = 0; i < this.mycondition.length; i++){
        const b = {cg_id:this.mycondition[i].cg_id,cg_name:this.mycondition[i].cg_name,cc_value_a:this.mycondition[i].cc_value_a,cc_value_b:this.mycondition[i].cc_value_b,course_id:this.course_id}
 const data = await ApiService.post('/course/condition/create', b).then(response => {
});

  }
},

async SaveConditionOne() {


  const b = {cg_id:this.formDataCondit.cg_id,cg_name:this.formDataCondit.cg_name,cc_value_a:this.formDataCondit.cc_value_a,cc_value_b:this.formDataCondit.cc_value_b,course_id:this.course_id}
  const data = await ApiService.post('/course/condition/create', b).then(response => {
  });
  
  },
  async FetchCondition(id) {
const data = await ApiService.get('/course/condition/list/?course_id=' + id).then(response => {
this.editmycondition = response.data.data;
});
  },

  async deleteCondition(id) {
    const data = await ApiService.delete('course/condition/delete/'+ id).then(response => {
      return true
    });
   },
  async UpdateCondition() {


this.formDataCondit.cg_id = this.mycondition_group.cg_id;
this.formDataCondit.course_id = this.course_id;

if(this.condition_id == null){
return false;
}
    const data = await ApiService.put('/course/condition/update/'+ this.condition_id, this.formDataCondit).then(response => {
 
    });
  
  }, 


  sortLists(sortBy) {
    
    if (this.sortedbyASC) {
      this.courselist.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
      this.sortedbyASC = false;
    } else {
      this.courselist.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
      this.sortedbyASC = true;
    }
  },
    

  },



});
