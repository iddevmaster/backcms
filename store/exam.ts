import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
import { ref } from 'vue';
const user_id = useCookie('user_id');



export const ExamStore = defineStore('exam', {  
  state: () => ({
    isOpen:false,
    isOpenCreate:false,
    isOpenEdit:false,
    image:null,
    sortedbyASC: true,
    imageReq:false,
    imagelist:null,
    total_page:null,
limit_page:null,
current_page:null,
total_filter:null,
total:null,
    path:"",
    examlist:[],
    exam:null,
    formexam: {
      em_code: "",
      em_name: "",
      em_cover: "",
      em_description: "",
      em_random_amount: null,
      em_time:ref({
        hours: '00',
        minutes: '59',
        seconds:'00'
      }),
      user_id: user_id.value
    },
    formexamedit: {
      em_id:"",
      em_code: "",
      em_name: "",
      em_cover: "",
      em_description: "",
      em_random_amount: null,
      em_time:ref({
        hours: '00',
        minutes: '59',
        seconds:'00'
      }),
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
    GetopenModalEdit(state) {
      return state.isOpenEdit;
    },
    FormExam(state) {
      return state.formexam;
    },
    FormExamEdit(state) {
      return state.formexamedit;
    },
    GetExamDelId(state) {
      return state.exam;
    },


  },
  
  actions: {
  async fetchExamlist() {

await this.ResetForm();
    try {
      const data = await ApiService.post('/exam/main/list', this.formsearchexam).then(response => {
       this.examlist = response.data.data   
       this.total_page = response.data.total_page
       this.limit_page = response.data.limit_page
       this.current_page = response.data.current_page
       this.total_filter = response.data.total_filter
       this.total = response.data.total
      });

    } catch (error) {
      console.log('error');
      return false;
    } finally {

    }

  },

  sortLists(sortBy) {
    if (this.sortedbyASC) {
      this.examlist.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
      this.sortedbyASC = false;
    } else {
      this.examlist.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
      this.sortedbyASC = true;
    }
  },

  async selectentires(data_entires) {

    this.formsearchexam.per_page = data_entires;
    this.formsearchexam.page = 1;
    },
  setCurrentPage(page) {
    this.formsearchexam.page = page
  },
  async SaveExam() {
  
this.ChangeFormateTime('add');
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

  async UpdateExam(){
    this.isOpenEdit = false;
     await this.ChangeFormateTime('edit');
     console.log(this.formexamedit);
    try {
      const updateexam = await ApiService.put('/exam/main/update/' + this.formexamedit.em_id, this.formexamedit);
      return true;
    } catch (error) {
      return false;
    } finally {
      this.closeModal();
    }
  },

  async deleteExam(item) {
    try {
      await this.deleteImage(item.em_cover);
      const del = await ApiService.delete('/exam/main/delete/' + item.em_id);
      this.isOpen = false;
      return true;
    } catch (error) {
      return false;
    }

  },

  async deleteImage(image) {
    const del = await ApiService.delete('/media_file/file/?f=' + image);
    return true;
  },

  async ResetForm() {   ////reset Form
this.imageReq = false;
this.image = null;
this.imagelist = null;
this.path = "";
    this.formexam = {
      em_code: '',
      em_name: '',
      em_cover: '',
      em_description: '',
      em_random_amount: null,
      em_time:ref({
        hours: '00',
        minutes: '59',
        seconds:'00'
      }),
      user_id: user_id.value,
    };

  },



  async OpenFormInser() {
    this.isOpenCreate = true;
  },
  async OpenEditItem(item) {
   
    const timeedit = this.getDateFromHours(item.em_time);
this.formexamedit.em_id = item.em_id
this.formexamedit.em_code = item.em_code
this.formexamedit.em_name = item.em_name
this.formexamedit.em_description = item.em_description
this.formexamedit.em_cover = item.em_cover
this.formexamedit.em_time = timeedit
this.formexamedit.em_random_amount = item.em_random_amount
this.formexamedit.user_id = user_id.value,
this.image = item.em_cover
this.isOpenEdit = true;
  },

  async Openmodaldelete(item) {
  
    this.isOpen = true;
    this.exam = item;
  },

  closeModal() {
    this.isOpenCreate = false;
    this.isOpenEdit = false;
    
  },

  getDateFromHours(time) {
  
  const timed = time.split(':');
  const timeedit = ref({hours: timed[0],
  minutes: timed[1],
  seconds:timed[2]
  })
  return timeedit;

},

  async UploadfileExam() {  
  
    let formData = new FormData();
    formData.append('files', this.imagelist);


    if(this.imagelist){
      try {
        const data = await ApiService.upload('/media_file/upload/file',formData);
      //  this.path = data.data[0].path
      this.formexam.em_cover = data.data[0].path
        this.formexamedit.em_cover = data.data[0].path
        return true;
        } catch (error) {
          return false;
        } 
    
    }
   
  },

  async ChangeFormateTime(item) {
    
  
    if(item == 'add'){
      const time =   this.formexam.em_time.hours + ':' + this.formexam.em_time.minutes + ':' + this.formexam.em_time.seconds
      this.formexam.em_time = time;

    }else{
      const time = this.formexamedit.em_time.hours + ':' + this.formexamedit.em_time.minutes + ':' + this.formexamedit.em_time.seconds
      this.formexamedit.em_time = time;
      
    }
  },
  },


  
});
