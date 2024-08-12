import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";
import { ref } from 'vue';
import { fail } from 'assert';




export const ExamquestionStore = defineStore('examquestion', {
  state: () => ({
    quest_Id: 1,
    pending:false,
    isOpen: false,
    isOpenCreate: false,
    isOpenEdit: false,
    image: null,
    examqlist: [],
    user_id:null,
    deletechoice:[],
    em_id: 0,
    examqlisttotal: null,
    sortedbyASC: true,
    imageReq: false,
    imagelist: null,
    total_page: null,
    limit_page: null,
    current_page: null,
    total_filter: null,
    total: null,
    choicelist: [],
    formExamq: {
      eq_name_lo: "",
      eq_name_eng: "",
      eq_answer: 1,
    },
    isLoading:true,
    formExamqedit: {
      eq_name_lo: "",
      eq_name_eng: "",
      eq_answer: null,
    },

    formChoice: {
      ec_index: null,
      ec_name: "",
      ec_image: "",
      eq_id: null,
    },
    formsearchexam: {
      page: 1,
      per_page: 50,
      search: '',
    },
    path: "",
    examlist: [],
    exam: [],
    group:[],
    formsearchexamquestion: {
      page: 1,
      per_page: 1,
      search: '',
    },
    formsearchgroup: {
      page: 1,
      per_page: 50,
      search: '',
      active_include: [
        0,
        1
    ]
    },
    formExam: {
      eq_name: "",
      eq_image: "",
      eq_answer: null,
      em_id: 0,
      id: 0,
    },
    cg_id:"",
    formEditExamq: {
      eq_name: "",
      eq_image: "",
      eq_answer: null,
      em_id: 0,
      id: 0,
    },
    eq: null,
    modaldelete: false,
    rows: [
      {ec_id:0,eq_id:0,ec_in:'ກ',ec_index: 0, ec_name_lo: '',ec_name_eng: '',ec_image:''},
      {ec_id:0,eq_id:0,ec_in:'ຂ',ec_index: 1, ec_name_lo: '',ec_name_eng: '',ec_image:''},
      {ec_id:0,eq_id:0,ec_in:'ຄ',ec_index: 2, ec_name_lo: '',ec_name_eng: '',ec_image:''},
      {ec_id:0,eq_id:0,ec_in:'ງ',ec_index: 3, ec_name_lo: '',ec_name_eng: '',ec_image:''},
  ]
  }

  ),


  getters: {
    FormExamq(state) {
      return state.formExamq;
    },
    FormExamqEdit(state) {
      return state.formExamqedit;
    },
    FormEditExamq(state) {
      return state.formEditExamq;
    },

    GetopenModalDelete(state) {
      return state.modaldelete;
    },
    Pending(state) {
      return state.pending;
    },

    


  },

  actions: {
    async fetchExamquestionlist() {
      this.examqlist = [];
      try {
        const data = await ApiService.post('/exam/question/' + this.em_id + '/list', this.formsearchexamquestion).then(response => {
          this.examqlist = response.data.data
          this.examqlisttotal = response.data.data.length
          this.total_page = response.data.total
          this.choicelist = response.data.data[0].choices
          this.eq = response.data.data[0];


          const examdata = ApiService.post('/exam/main/list', this.formsearchexam).then(exam => {  /////////////ดึง หลักสูตร
            this.examlist = exam.data.data
            this.exam = this.examlist.filter(item => item.em_id == this.em_id);
            this.formExamq.em_id = this.exam[0].em_id
          });

          return true;
        // this.questionlist();
        });
        return data;

      } catch (error) {
       
        return false;
      } 


    },

    async fetchExamquestionlistEdit(id) {
      

      try {
        const data = await ApiService.get('/exam/question/get/'+ id).then(response => {
         this.cg_id = response.data.cg_id
         this.eq = response.data.eq_id;
         this.formExamqedit.eq_answer = response.data.eq_answer
         this.formExamqedit.eq_name_eng = response.data.eq_name_eng
         this.formExamqedit.eq_name_lo = response.data.eq_name_lo
         this.formExamqedit.eq_image = response.data.eq_image
         this.choicelist = response.data.choices
        
        return true;
        });
    
      } catch (error) {
        console.log(error);
      } 
      // formExamqedit
    },



    async ExamquestionlistEditUpdate() {
      

const upda = {eq_name_lo:this.formExamqedit.eq_name_lo,eq_name_eng:this.formExamqedit.eq_name_eng,eq_image:this.formExamqedit.eq_image,eq_answer:this.formExamqedit.eq_answer,cg_id:this.cg_id}

try {
        const data = await ApiService.put('/exam/question/update/'+ this.eq,upda).then(response => {
        
        return true;
        });

        return data;
    
      } catch (error) {
        return false;
      } 
      // formExamqedit
    },
    
    async ResetFormChoice() {


      this.rows = [
        {ec_id:0,eq_id:0,ec_in:'ກ',ec_index: 0, ec_name_lo: '',ec_name_eng: '',ec_image:''},
        {ec_id:0,eq_id:0,ec_in:'ຂ',ec_index: 1, ec_name_lo: '',ec_name_eng: '',ec_image:''},
        {ec_id:0,eq_id:0,ec_in:'ຄ',ec_index: 2, ec_name_lo: '',ec_name_eng: '',ec_image:''},
        {ec_id:0,eq_id:0,ec_in:'ງ',ec_index: 3, ec_name_lo: '',ec_name_eng: '',ec_image:''},
    ]

    },
    async RemoveChoice() {
    
      for (var i = 0; i < this.choicelist.length; i++) {
        // let a = this.rows.find(item => item.ec_index === this.choicelist[i].ec_index);
        const ch = ['ກ','ຂ','ຄ','ງ'];
        let targetId = this.choicelist[i].ec_index;
   
        const index = this.rows.findIndex(item => item.ec_index === targetId);
        const newItem =   {ec_id:this.choicelist[i].ec_id,eq_id:this.eq,ec_in:ch[targetId],ec_index: this.choicelist[i].ec_index, ec_name_lo:this.choicelist[i].ec_name_lo,ec_name_eng: this.choicelist[i].ec_name_eng,ec_image:''};
        // ถ้าพบวัตถุที่ต้องการแทนที่ ให้แทนที่วัตถุที่ตำแหน่งนั้น
        // if (index !== -1) {
        //   this.rows.splice(index, 1);
      
        //   console.log('Item',this.rows);
        // } else {
        //     console.log('Item not found');
        // }

   
   
       

        if (index !== -1) {
          this.rows[index] = newItem
        }
        
        
      }

      this.rows.sort((a, b) => a.ec_index - b.ec_index);
    },

    async ManageChoice() {

      const ch = ['ກ','ຂ','ຄ','ງ'];
      
 
    
      for (var i = 0; i < this.choicelist.length; i++) {
        // let a = this.rows.find(item => item.ec_index === this.choicelist[i].ec_index);
        const newItem =   {ec_id:this.choicelist[i].ec_id,eq_id:this.eq,ec_in:ch[i],ec_index: this.choicelist[i].ec_index, ec_name_lo:this.choicelist[i].ec_name_lo,ec_name_eng: this.choicelist[i].ec_name_eng,ec_image:''};
    //    this.rows.push(newItem);


      }
   //   this.rows.sort((a, b) => a.ec_index - b.ec_index);


    },


    async fetchExamquUpdateChoice() {
      for (var i = 0; i < this.rows.length; i++) {
        // if(this.rows[i].ec_id != 0){
        //   // this.fetchExamquSaveUpChoice(this.rows[i]);
        // }else {
        //   // this.fetchExamquSaveChoice(this.rows[i]);
        // }
        if(this.rows[i].ec_id != 0 && this.rows[i].ec_name_lo == ''){

this.fetchExamquDelChoice(this.rows[i]);
        }
        if(this.rows[i].ec_id != 0 && this.rows[i].ec_name_lo != ''){
          this.fetchExamquSaveUpChoice(this.rows[i]);
        }

        if(this.rows[i].ec_id == 0 && this.rows[i].ec_name_lo != ''){
       
          this.fetchExamquSaveChoice(this.rows[i]);
        }
      }
      return true;
      

    },

    async fetchExamquSaveChoice(item) {
  

     const save = {ec_index:item.ec_index,ec_name_lo:item.ec_name_lo,ec_name_eng:item.ec_name_eng,ec_image:item.ec_image,eq_id:this.eq}



 
   
         const data = await ApiService.post('/exam/choice/create', save).then(response => { 
          const ch = ['ກ','ຂ','ຄ','ງ'];
        
          const index = this.rows.findIndex(items => items.ec_index === item.ec_index);
          const newItem =   {ec_id:response.data.insertId,eq_id:this.eq,ec_in:ch[item.ec_index],ec_index: item.ec_index, ec_name_lo: item.ec_name_lo,ec_name_eng:item.ec_name_eng,ec_image:item.ec_image};
         
          if (index !== -1) {
            this.rows[index] = newItem
          }

       
      });
    },


    async fetchExamquSaveUpChoice(item) {
     
      const data = await ApiService.put('/exam/choice/update/'+item.ec_id, item).then(response => { 
      
      });
      
    },

    async fetchExamquDelChoice(item) {

     
  const index = this.rows.findIndex(items => items.ec_index === item.ec_index);

  const ch = ['ກ','ຂ','ຄ','ງ'];


  const newItem =   {ec_id:0,eq_id:0,ec_in:ch[item.ec_index],ec_index: item.ec_index, ec_name_lo: '',ec_name_eng: '',ec_image:''};
      const data = await ApiService.delete('/exam/choice/delete/'+ item.ec_id).then(response => {
     
      });

      if (index !== -1) {
        this.rows[index] = newItem
      }
    },
    

    sortLists(sortBy) {

    },

    async selecttypes(item) {
      this.cg_id = item
     },

    async questionlist() {
      this.eq = [];
      if (this.examqlist.length == 0) {    //////////เช็ค ก่อนว่า มี ข้อสอบไหม  if คือ ไม่มี
        this.eq = [];
      } else {//////////เช็ค ก่อนว่า มี ข้อสอบไหม else  คือมี
        if (this.quest_Id > this.examqlist.length) {
          let numx = 0
          this.quest_Id = 1
          const newItem = { eq_answer: this.examqlist[0]?.eq_answer, eq_image: this.examqlist[0]?.eq_image, eq_name: this.examqlist[0]?.eq_name, id: this.examqlist[0]?.eq_id, em_id: this.examqlist[0]?.em_id };
          this.choicelist = this.examqlist[numx]?.choices
          this.eq.push(newItem);
          this.choicelist = this.examqlist[0]?.choices
        } else { 
          if (this.quest_Id == 1) {
            let numx = this.quest_Id - 1
            const newItem = { eq_answer: this.examqlist[numx]?.eq_answer, eq_image: this.examqlist[numx]?.eq_image, eq_name: this.examqlist[numx]?.eq_name, id: this.examqlist[numx]?.eq_id, em_id: this.examqlist[0]?.em_id };
            this.choicelist = this.examqlist[numx]?.choices
            this.eq.push(newItem);
          } else {
            let numx = this.quest_Id - 1
            const newItem = { eq_answer: this.examqlist[numx]?.eq_answer, eq_image: this.examqlist[numx]?.eq_image, eq_name: this.examqlist[numx]?.eq_name, id: this.examqlist[numx]?.eq_id };
            this.choicelist = this.examqlist[numx]?.choices
            this.eq.push(newItem);
          }
        }
      }
      
    },
    async fetchGrouplist() {
      try {
        const data = await ApiService.post('/course/group/all', this.formsearchgroup).then(response => {
          this.group = response.data.data
          this.group_total_page = response.data.total_page
          this.group_limit_page = response.data.limit_page
          this.group_current_page = response.data.current_page
          this.group_total_filter = response.data.total_filter
          this.group_total = response.data.total

          this.cg_id = response.data.data[0].cg_id
        });
        this.isLoading = false;
        return true;
      } catch (error) {
       // return navigateTo('/maintenance');
      }
    },

    async questionlisChoice() {

      try {
        const data = await ApiService.post('/exam/question/' + this.em_id + '/list', this.formsearchexamquestion).then(response => {
        
        
    
      
        });

      } catch (error) {
       
        return false;
      } 
     
      
    },

    async selectentires(data_entires) {


    },
    setCurrentPage(page) {
      this.formsearchexam.page = page
    },


    async SaveExamq() {

      try {
        const data = await ApiService.post('/exam/question/create', this.formExamq).then(response => {

          if(response.status == 204){
            return false;
          }else {
            let choice = this.SaveChoice(response.data.insertId)
 
        this.delay(500);
            return choice
          }
    
        });
        return data;
      } catch (error) {
        return false;
      }
    },


    async SaveExamquest() {

     this.formExamq.cg_ig = this.cg_id 

     ///  จัด data form ใหม่
     const savedata = {eq_name_lo:this.formExamq.eq_name_lo,eq_name_eng:this.formExamq.eq_name_eng,eq_answer:this.formExamq.eq_answer,eq_image:this.formExamq.eq_image,cg_id:this.formExamq.cg_ig}
   
      try {
        const data = await ApiService.post('/exam/question/create', savedata).then(response => {
         
          this.eq_id = response.data.insertId
          return true;
        });
        return data;
      } catch (error) {
        return false;
      }
    },
    async SaveExamquestChoice() {
      for (var i = 0; i < this.rows.length; i++) {
        const newItem =   {ec_index:i,eq_id:this.eq_id,ec_name_lo:this.rows[i].ec_name_lo,ec_name_eng:this.rows[i].ec_name_lo, ec_image:''};
        
        if(this.rows[i].ec_name_lo != ''){
       
          const data = await ApiService.post('/exam/choice/create', newItem).then(response => { 
      
          });
        }
      }

    },
    async SaveChoice(id) {
      for (var i = 0; i < this.choicelist.length; i++) {
     
        const x = i + 1;
        this.formChoice.ec_index = x;
        this.formChoice.ec_name = this.choicelist[i].ec_name
        this.formChoice.ec_image = this.choicelist[i].ec_image
        this.formChoice.eq_id = id
    
     
        const data = await ApiService.post('/exam/choice/create', this.formChoice);
       
      }
      await this.ResetForm();


      return await true;
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    async edit() {
      this.choicelist = [];
      this.deletechoice = [];

      const cachedData = localStorage.getItem('cachedData');
      const choice = localStorage.getItem('choice');
      const emid = localStorage.getItem('em_id');
      
let x = JSON.parse(cachedData);
let c = JSON.parse(choice);




for (var i = 0; i < c.length; i++) {
 this.deletechoice.push(c[i].ec_id)
     this.choicelist.push({ id:i+1, ec_id: c[i].ec_id, ec_image: c[i].ec_image, ec_index:c[i].ec_index, ec_name:c[i].ec_name, em_id:c[i].em_id,eq_id:c[i].eq_id });
}




this.formEditExamq = {
  eq_name: x.eq_name,
  eq_image: x.eq_image,
  eq_answer: x.eq_answer,
  em_id: emid,
  id: x.eq_id,
};

 this.image = x.eq_image;




    },
    async UpdateExa() {
   await this.UploadfileExamq();
      await this.deleteChoiceCall();
     await this.UpdateExamq()
    await this.UpdateChoice()
      return true;

    },

    async UpdateExamq() {
   

      if(this.image == null){
        this.formEditExamq.eq_image = "";
      }/////////////clear image 
const data = await ApiService.put('/exam/question/update/' + this.formEditExamq.id, this.formEditExamq).then(response => {
return true;
});
    },

    async UpdateChoice() {
      for (var i = 0; i < this.choicelist.length; i++) {
        const x = i + 1;
        this.formChoice.ec_index = x;
        this.formChoice.ec_name = this.choicelist[i].ec_name
        this.formChoice.ec_image = this.choicelist[i].ec_image
        this.formChoice.eq_id = this.formEditExamq.id
        const data = await ApiService.post('/exam/choice/create', this.formChoice);
      }
    //  await this.ResetForm();


      return true;
    },



    async deleteExamq(item) {
      try {
        const data = await ApiService.delete('/exam/question/delete/' + item.eq_id).then(response => {
          return true;
          });
          return data;
      } catch (error) {
        return false;
      }
    },

    async deleteImage(image) {

    },


    async ResetFormAdd() {

      this.formExamq.eq_name = ""
      this.formExamq.eq_image = ""
      this.formExamq.eq_answer = null

  
    },

    async ResetForm() {


      this.choicelist = [];
      this.image = null,
        this.imageReq = false,
        this.imagelist = null,
        this.formExamq = {
          eq_name: "",
          eq_image: "",
          eq_answer: null,
          em_id: 40,
          id: 0,
        };

    },

    async AdChoice() {
      var x = this.choicelist.length + 1
      const daa = {
        id: x,
        ec_index: null,
        ec_name: "-",
        ec_image: "",
        eq_id: "",
      }
      this.choicelist.push(daa);

    },

    async deleteChoice(x) {
      //  const index = this.choicelist[item]
      const index = this.choicelist.findIndex(item => item.id === x)
      if (index !== -1) {
        this.choicelist.splice(index, 1)
      }
    },

    async deleteChoiceCall() {
   //   console.log('1');
      for (var i = 0; i < this.deletechoice.length; i++) {
      
      const del = await ApiService.delete('/exam/choice/delete/' + this.deletechoice[i]);
      {
  }
}
    },


    async OpenFormInser() {

    },
    async OpenEditItem() {


    },


    closeModal() {
      this.isOpenCreate = false;
      this.isOpenEdit = false;

    },

    async UploadfileExamq() {
      let formData = new FormData();
      formData.append('files', this.imagelist);
      if (this.imagelist) {
        try {
          const data = await ApiService.upload('/media_file/upload/file', formData);
          //  this.path = data.data[0].path

          this.formExamq.eq_image = data.data[0].path
          this.formExamqedit.eq_image = data.data[0].path
          return true;
        } catch (error) {
          return false;
        }
      }else {
        this.formExamq.eq_image = ""
      }

    },

    async uploadfileexam(x) {
      const data = await ApiService.upload('/media_file/upload/file', x);
      return data;
    },

    async ChangeFormateTime() {



    },
    async ClearLocal() {
 // localStorage.clear();

  
  return true;


    },

  },



});
