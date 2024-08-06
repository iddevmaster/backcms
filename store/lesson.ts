import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';



export const LessonStore = defineStore('lesson', {
  state: () => ({
    isLoading: false,
    formlesson: {
      page: 1,
      per_page: 5,
      search: '',
    },
    pdf:'',
    htmlContent: '',
    htmlContent2: '<p>-</p>',
    EdithtmlContent: '<p>-</p>',
    EdithtmlContent2: '<p>-</p>',
    course_del: null,
    pending: false,
    lessonlist: [],
    total_page: null,
    total: null,
    current_page: null,
    cs_id: null,
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
    reportcourse:[],
    formselect: {
      per_page: 5,
      total_page: 0,
      page: 1,
      cg_id: 0,
      cg_name: "",
      search: ''
    },
    formselectdelete: {
      per_page: 5,
      total_page: 0,
      page: 1,
    },
    formcreatelesson: {
      cs_name_eng: "",
      cs_name_lo: "",
      cs_description:"",
      cg_id: ""
    },
    formreport: {
      page: 1,
      per_page: 50,
      search: ''
    },
    formreportexam: {
      page: 1,
      per_page: 50,
      search: ''
    },
    formreportcourse: {
      page: 1,
      per_page: 50,
      search: '',
      active_include:[0,1]
    },
    cs_video:"",
    formcreatelessonedit: {
      cs_name_eng: "",
      cs_name_lo: "",
      cs_description:"",
      cg_id: ""
    },
    formsearchlesson: {
      page: 1,
      per_page: 50,
      search: '',
    },
    formsearchlessongroup: {
      page: 1,
      per_page: 50,
      search: '',
      active_include: [1]
    },
    selected: [],
    lesson_item: [],
    myselect_group: null,
    item: [],
    itemselect: [],
    group: [],
    cg_id: 0,
    group_id: null,
    imagelist: null,
    imageReq: false,
    GetopenModalCreate: false,
    GetopenModalEdit: false,
    GetopenModal: false,
    rules: {
      cs_name_lo: [(value) => !!value || 'ຕ້ອງໃສ່ຂໍ້ຄໍາຖາມ(Lo).'],
      cs_name_eng: [(value) => !!value || 'ຕ້ອງໃສ່ຂໍ້ຄໍາຖາມ(En)'],
      cs_description: [(value) => !!value || 'ຕ້ອງໃສ່ເນື້ອໃນ'],
      cg_id: [(value) => !!value || ' ຕ້ອງໃສ່ໝວດວິຊາ']
    },
    selectedFiles:[],
    selectedEditFiles:[],
    selectedFilesError:[],
    obgroup:null,
    reportexam:[],
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
  setHtmlContent(content) {
    this.htmlContent = content;
    this.formcreatelesson.cs_description = this.htmlContent
  },

  setHtmlEditContent(content) {
    this.htmlContent = content;
    this.formcreatelessonedit.cs_description = this.htmlContent
  },

  setHtmlContent2(content2) {
    console.log(content2);

  },

  getData(){
    console.log('getData');
  },

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

  
  async fetchGroupName() {
  this.obgroup = this.group.find(item => item.cg_id === parseInt(this.group_id))
  },
    async fetchLessonlist() {


    this.lessonlist = [];



    try {
      const data = await ApiService.post('course/lesson/all/' + this.group_id, this.formsearchlesson).then(response => {
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
      // return navigateTo('/maintenance');
    }
  },

  //   async fetchLessonId(course_id) {
  //   this.course_id = course_id
  //   try {
  //     const data = await ApiService.post('/course/lesson/list/' + course_id, this.formlesson).then(response => {

  //       this.lesson = response.data.data
  //       this.total_page = response.data.total_page


  //     });
  //     return true
  //   } catch (error) {
  //     return false;
  //   }
  // },


  async fetchLessonId(cs_id) {
    this.cs_id = cs_id
    try {
      const data = await ApiService.get('/course/lesson/get/' + this.cs_id).then(response => {
   
      this.formcreatelessonedit.cs_description = response.data.cs_description
      this.formcreatelessonedit.cs_name_eng = response.data.cs_name_eng
      this.formcreatelessonedit.cs_name_lo = response.data.cs_name_lo
      this.cs_cover = response.data.cs_cover
      this.cs_video = response.data.cs_video
      
      
      if(response.data.file_path != ''){
        this.selectedEditFiles = [response.data.file_path];
      }
  
    
      this.EdithtmlContent = this.decodeHTML(response.data.cs_description);
       this.formcreatelessonedit.cg_id = this.group.find(item => item.cg_id === response.data.cg_id);


    });
      return true
    } catch (error) {
      return false;
    }
  },

  decodeHTML(str) {
    const map = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&#x2F;': '/'
    };
    return str.replace(/&(amp|lt|gt|quot|#39|#x2F);/g, function(m) { return map[m]; });
  },


    // setCurrentPage(page) {
    //   this.formsearchlesson.page = page
    // },


    async selectlessId(cs_id) {
    this.cs_id = cs_id
  },
    async deletelessId() {
    try {
      const del = await ApiService.delete('course/cluster/delete?course_id=' + this.course_del + '&cs_id=' + this.cs_id + '').then(response => {
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

  async UploadfileLessonPdf() { 

    if(this.selectedFiles.length > 0){
      const formData = new FormData();
      Array.from(this.selectedFiles).forEach(file => {
        formData.append('files', file);
      });
      const pdf = await ApiService.upload('/media_file/upload/file',formData);
      this.pdf = pdf.data[0].path;
      }else {
        this.pdf = "";
      }
      
  },

  async UploadfileLessonEditPdf() { 

    if(this.selectedFiles.length > 0){
      const formData = new FormData();
      Array.from(this.selectedFiles).forEach(file => {
        formData.append('files', file);
      });
      const pdf = await ApiService.upload('/media_file/upload/file',formData);
      this.pdf = pdf.data[0].path;
      }else {
        
      }
      
  },

  encodeHTML(str) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
    };
    return str.replace(/[&<>"'/]/g, function(m) {
      return map[m];
    });
  },


  

    async saveformLesson() {
    
      const savelesson = {cs_cover:this.cs_cover,cs_name_lo:this.formcreatelesson.cs_name_lo,cs_name_eng:this.formcreatelesson.cs_name_eng,cs_description:this.encodeHTML(this.formcreatelesson.cs_description),cg_id:this.formcreatelesson.cg_id.cg_id,file_path:this.pdf,cs_video:this.cs_video,user_id:this.user_id }
    try {
      const data = await ApiService.post('/course/lesson/create', savelesson).then(response => {
  
        if(response){
          return true;
        }else {
          return false ;
        }
      });

      return data

    } catch (error) {

      return false;
    }

  },


  async updateformnewLesson() {

    
  const updated = {cs_cover:this.cs_cover,cs_name_lo:this.formcreatelessonedit.cs_name_lo,cs_name_eng:this.formcreatelessonedit.cs_name_eng,cs_description:this.encodeHTML(this.formcreatelessonedit.cs_description),cg_id:this.formcreatelessonedit.cg_id.cg_id,file_path:this.pdf,cs_video:this.cs_video,user_id:this.user_id }
  try {
    const data = await ApiService.put('/course/lesson/update/'+this.cs_id, updated).then(response => {
return true
    });

    return data

  } catch (error) {

    return false;
  }

},

    async updateformLesson() {



    if (this.formcreatelessonedit.cg_id == null) {
      return false;
    }

    //   this.formcreatelessonedit.cg_id = this.myselect_group.cg_id;
    //   console.log(this.formcreatelessonedit);


    try {
      const data = await ApiService.put('/course/lesson/update/' + this.cs_id, this.formcreatelessonedit).then(response => {

        if (response.status == 200) {
          return true;
        } else {
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
      const data = await ApiService.delete('/course/lesson/delete/' + this.cs_id).then(response => {
        if (response.status == 200) {
          return true;
        } else {
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
    this.cs_cover = ""
    if (this.imagelist) {
      try {
        const data = await ApiService.upload('/media_file/upload/file', formData);
        //  this.path = data.data[0].path
        this.cs_cover = data.data[0].path
        this.cs_cover = data.data[0].path
        // this.formexamedit.em_cover = data.data[0].path
        return true;
      } catch (error) {
        return false;
      }
    }else {
      this.cs_cover = ""
      this.cs_cover = ""
    }
  },

  async UploadfileLessonEdit() {
    let formData = new FormData();
    formData.append('files', this.imagelist);
   
    if (this.imagelist) {
      try {
        const data = await ApiService.upload('/media_file/upload/file', formData);
        //  this.path = data.data[0].path
        this.cs_cover = data.data[0].path
        this.cs_cover = data.data[0].path
        // this.formexamedit.em_cover = data.data[0].path
        return true;
      } catch (error) {
        return false;
      }
    }else {
      
    }
  },

    async fetchLessonIdedit(item){
    // this.myselect_group = null
    this.cs_id = item.cs_id
    // this.formcreatelessonedit.cs_cover = item.cs_cover
    // this.formcreatelessonedit.cs_name = item.cs_name
    // this.formcreatelessonedit.cs_video = item.cs_video
    // this.formcreatelessonedit.cs_description = item.cs_description

    // if (item.cg_id != 0) {
    //   const a = this.group.find(items => items.cg_id === item.cg_id);
    //   this.myselect_group = [a];
    // } else {
    //   this.myselect_group = null
    // }


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

    this.cs_cover = '',
      this.formcreatelesson.cs_name_lo = '',
      this.formcreatelesson.cs_name_eng = '',
      this.cs_video = '',
      this.formcreatelesson.cs_description = ''
      this.formcreatelesson.cg_id = ''
      
      this.content = '';
      this.htmlContent = '';
      this.selectedFiles = [];

      // this.rules = {
      //   cs_name_lo: [(value) => !!value || 'ຕ້ອງໃສ່ຂໍ້ຄໍາຖາມ(Lo).'],
      //   cs_name_eng: [(value) => !!value || 'ຕ້ອງໃສ່ຂໍ້ຄໍາຖາມ(En)'],
      //   cs_description: [(value) => !!value || 'ຕ້ອງໃສ່ເນື້ອໃນ'],
      //   cg_id: [(value) => !!value || ' ຕ້ອງໃສ່ໝວດວິຊາ']
      // }
   
  },

    async selectentireslesson(data_entires) {
    //   this.formsearchlesson.per_page = data_entires;
    this.formsearchlesson.page = data_entires;
  },

       async selectentiresentires(data_entires) {
    this.formsearchlesson.per_page = parseInt(data_entires);
    this.formsearchlesson.page = 1;
  },

    
    async setCurrentPage(page) {
    this.formsearchlesson.page = page
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
        this.item = this.item.filter((e) => e.cs_id !== this.lessonlist[i].cs_id)
      }
    }
  },

    async fetchGrouplist() {
    try {
      const data = await ApiService.post('/course/group/all', this.formsearchlessongroup).then(response => {
        this.group = response.data.data
        this.group_total_page = response.data.total_page
        this.group_limit_page = response.data.limit_page
        this.group_current_page = response.data.current_page
        this.group_total_filter = response.data.total_filter
        this.group_total = response.data.total
        this.group.sort((a, b) => a.cg_id - b.cg_id);

        if (this.group.length > 0) {
          this.group_id = this.group[0].cg_id
        }

      });
      this.isLoading = false;
      return true;
    } catch (error) {
      // return navigateTo('/maintenance');
    }
  },

    async paginatedItems() {


    if (this.selectlesson_form_menu_less.search != "") {
      this.lesson_item = this.lessonlist.filter(item => item.cs_name.includes(this.selectlesson_form_menu_less.search));
    }
    if (this.selectlesson_form_menu_less.search == "") {
      this.lesson_item = this.lessonlist.filter(item => item.cs_name.includes(this.selectlesson_form_menu_less.search));
    }

    if (this.selectlesson_form_menu_less.cg_id != 0) {
      this.lesson_item = this.lesson_item.filter(item => item.cg_id == this.selectlesson_form_menu_less.cg_id);
    }
    if (this.selectlesson_form_menu_less.cg_id == 0) {


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

    if (this.selectlesson_form_menu_course.search != "") {
      this.lesson_item = this.lesson_item.filter(item => item.cs_name.includes(this.selectlesson_form_menu_course.search));
    }
    // if(this.selectlesson_form_menu_course.search == ""){
    //   this.lesson_item = this.lesson_item.filter(item => item.cs_name.includes(this.selectlesson_form_menu_course.search));
    // }

    if (this.selectlesson_form_menu_course.cg_id != 0) {
      this.lesson_item = this.lesson_item.filter(item => item.cg_id == this.selectlesson_form_menu_course.cg_id);
    }
    if (this.selectlesson_form_menu_course.cg_id == 0) {


    }

    const startIndex = (this.selectlesson_form_menu_course.page - 1) * this.selectlesson_form_menu_course.per_page;
    const endIndex = startIndex + this.selectlesson_form_menu_course.per_page;
    this.selectlesson_form_menu_course.total_page = Math.ceil(this.lesson_item.length / this.selectlesson_form_menu_course.per_page);
    this.lesson_item = this.lesson_item.slice(startIndex, endIndex);
    this.max = endIndex;


  },

    async paginatedItemsSelete() {

    this.formselect.total_page = Math.ceil(this.item.length / this.formselect.per_page);
    if (this.formselect.total_page == 1) {
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

    if (this.formselect.search != "") {
      this.selected = this.selected.filter(item => item.cs_name.includes(this.formselect.search));

    }
    if (this.formselect.search == "") {
      this.selected = this.selected.filter(item => item.cs_name.includes(this.formselect.search));
    }
    if (this.formselect.cs_name != "") {
      this.selected = this.selected.filter(item => item.cg_name.includes(this.formselect.cg_name));
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

    this.selected = this.item;

    if (this.formselect.search != "") {
      this.selected = this.selected.filter(item => item.cs_name.includes(this.formselect.search));

    }
    if (this.formselect.search == "") {
      this.selected = this.selected.filter(item => item.cs_name.includes(this.formselect.search));
    }
    if (this.formselect.cs_name != "") {
      this.selected = this.selected.filter(item => item.cg_name.includes(this.formselect.cg_name));
    }


    const modPag = this.selected.length % 5 === 0 ? true : false
    if (modPag == true) {
      this.formselect.page -= 1
      if (this.formselect.page == 0) {
        this.formselect.page = 1
      }
    }

    // const startIndex = (this.formselect.page - 1) * this.formselect.per_page;
    // const endIndex = startIndex + this.formselect.per_page;
    // this.selected = this.selected.slice(startIndex, endIndex);



    // this.lessonlist.push(this.items);
  },


    async RemoveLesson() {
    for (var i = 0; i < this.selected.length; i++) {
      if (this.lessonlist.some(item => item.cs_id === this.selected[i].cs_id)) {
        this.lessonlist = this.lessonlist.filter((e) => e.cs_id !== this.selected[i].cs_id)
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
    this.selected = this.item
    if (this.formselect.search != "") {
      this.selected = this.selected.filter(item => item.cs_name.includes(this.formselect.search));

    }
    if (this.formselect.search == "") {
      this.selected = this.selected.filter(item => item.cs_name.includes(this.formselect.search));
    }
    if (this.formselect.cs_name != "") {
      this.selected = this.selected.filter(item => item.cg_name.includes(this.formselect.cg_name));
    }

    const startIndex = (this.formselect.page - 1) * this.formselect.per_page;
    const endIndex = startIndex + this.formselect.per_page;
    this.selected = this.selected.slice(startIndex, endIndex);

    for (var i = 0; i < this.selected.length; i++) {
      const objWithIdIndex = this.item.findIndex((obj) => obj.cs_id === this.selected[i].cs_id);
      if (objWithIdIndex > -1) {
        this.item.splice(objWithIdIndex, 1);
      }
    }
    this.formselect.page = 1

  },
  
  async ReportCourseExam() {
 
      try {
        const data = await ApiService.post('/report/exam/' + this.course_id,this.formreportexam).then(response => {
          this.reportexam = [];
        
  this.reportexam = response.data.data
  this.reportexam_total_page = response.data.total_page
  this.reportexam_limit_page = response.data.limit_page
  this.reportexam_current_page = response.data.current_page
  this.reportexam_total_filter = response.data.total_filter
  this.reportexam_total = response.data.total
          return true
        });
        return data
      } catch (error) {
  
     
  
    }
  },
  async ReportCourse() {
    try {
      const data = await ApiService.post('/report/course/' + this.course_id,this.formreport).then(response => {
this.reportcourse = response.data.data
this.reportcourse_total_page = response.data.total_page
this.reportcourse_limit_page = response.data.limit_page
this.reportcourse_current_page = response.data.current_page
this.reportcourse_total_filter = response.data.total_filter
this.reportcourse_total = response.data.total
        return true
      });
      return data

    } catch (error) {

      return false;
    }
  },

  async fetchCourseAll() {

    try {
      const data = await ApiService.post('/course/list/',this.formreportcourse).then(response => {
this.course = response.data.data

this.course_id = response.data.data[0].course_id


        return true
      });
      return data

    } catch (error) {

      return false;
    }

  },
  async selectentirescourse(value) {
    this.course_id = value
  },

  async setCurrentPageReport (value) {
    this.formreport.page = value
  },
  async setCurrentPageReportExam (value) {
    this.formreportexam.page = value
  }
},

});
