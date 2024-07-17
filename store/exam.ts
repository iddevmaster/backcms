import { defineStore } from 'pinia';
import ApiService from '@/services/api.service';
import axios from "axios";
import { ref } from 'vue';




export const ExamStore = defineStore('exam', {
  state: () => ({
    isOpen: false,
    isLoading:true,
    isOpenCreate: false,
    isOpenEdit: false,
    image: null,
    sortedbyASC: true,
    user_id:null,
    imageReq: false,
    imagelist: null,
    total_page: null,
    limit_page: null,
    current_page: null,
    total_filter: null,
    total: null,
    path: "",
    examlist: [],
    exam: null,
    formexam: {
      em_code: "",
      em_name_lo: "",
      em_name_eng: "",
      em_cover: "",
      em_description: "",
      em_random_amount: "50",
      em_measure:"47",
      dlt_code:"A",
      em_time: ref({
        hours: '00',
        minutes: '59',
        seconds: '00'
      }),
      user_id: null
    },
    formexamedit: {
      em_id: "",
      em_code: "",
      em_name: "",
      em_cover: "",
      em_description: "",
      em_measure:47,
      em_random_amount: 0,
      dlt_code:null,
      em_time: ref({
        hours: '00',
        minutes: '59',
        seconds: '00'
      }),
      user_id: null
    },
    formsearchexam: {
      page: 1,
      per_page: 10,
      search: '',
    },
     dlt:[
      {
          "dlt_code": "A",
          "dlt_name_lo": "ລົດຈັກສອງລໍ້ ຄວາມແຮງບໍ່ເກີນ 125 cc",
          "dlt_name_eng": "Two-wheels motocycle engine not exceed 125 cc"
      },
      {
          "dlt_code": "A1",
          "dlt_name_lo": "ລົດຈັກສອງລໍ້ ຄວາມແຮງ ແຕ່ 125 cc ຂື້ນໄປ",
          "dlt_name_eng": "Two-wheels motorcycle engine 125 cc and above"
      },
      {
          "dlt_code": "A2",
          "dlt_name_lo": "ລົດຈັກສາມລໍ້ສ່ວນຕົວ, ລົດສອງລໍ້ ແລະ ສາມລໍ້ໂດຍສານ",
          "dlt_name_eng": "Private three-wheels vehicle, Passenger vehicle with two-wheels and three-wheels"
      },
      {
          "dlt_code": "A3",
          "dlt_name_lo": "ລົດໄຖນາທີ່ແກ່ລໍ້ ແລະ ລົດຕ໋ອກໆ",
          "dlt_name_eng": "Two-wheels tractor with trailer and Walk-behide Tractor"
      },
      {
          "dlt_code": "B",
          "dlt_name_lo": "ລົດເບົາ ສີ່ລໍ້ ທີ່ມີນ້ຳໜັກລວມບໍ່ເກີນ 3.500 ກິໂລກຣາມ ແລະ ບໍ່ເກີນ 9 ບ່ອນນັ່ງ ລວມທັງຜູ້ຂັບຂີ່",
          "dlt_name_eng": "Car with four-wheels, total weight not exceed 3,500 kilograms, and not more than 9 seats including driver"
      },
      {
          "dlt_code": "C",
          "dlt_name_lo": "ລົດຂົນສົ່ງສິນຄ້ານ້ຳໜັກລວມ ແຕ່ 3.500 ກິໂລກຣາມ ຫາ 7.500 ກິໂລກຣາມ",
          "dlt_name_eng": "Cargo truck, total weight from 3,500 to 7,500 kilograms"
      },
      {
          "dlt_code": "C1",
          "dlt_name_lo": "ລົດຂົນສົ່ງສິນຄ້ານ້ຳໜັກລວມ ເກີນກວ່າ 7.500ກິໂລກຣາມ ຫາ 15.000 ກິໂລກຣາມ",
          "dlt_name_eng": "Cargo truck, total weight exceed 7,500 kilogram up to 15,000 kilograms"
      },
      {
          "dlt_code": "C2",
          "dlt_name_lo": "ລົດຂົນສົ່ງສິນຄ້ານ້ຳໜັກລວມ ເກີນກວ່າ 15.000 ກິໂລກຣາມ",
          "dlt_name_eng": "Cargo truck, total weight exceed 15,000 kilograms"
      },
      {
          "dlt_code": "D",
          "dlt_name_lo": "ລົດຂົນສົ່ງຜູ້ໂດຍສານປະເພດ 4 ລໍ້ ຂຶ້ນໄປ, ບໍ່ເກີນ ສິບຫ້າ ບ່ອນນັ່ງ",
          "dlt_name_eng": "Passenger vehicle with 4 wheels or more, not more than 15 seats"
      },
      {
          "dlt_code": "D1",
          "dlt_name_lo": "ລົດຂົນສົ່ງຜູ້ໂດຍສານ ແຕ່ ສິບຫົກ ຫາ ສາມສິບຫ້າ ບ່ອນນັ່ງ",
          "dlt_name_eng": "Passenger vehicle from 16 seats to 35 seats"
      },
      {
          "dlt_code": "D2",
          "dlt_name_lo": "ລົດຂົນສົ່ງຜູ້ໂດຍສານ ແຕ່ ສາມສິບຫົກ ບ່ອນນັ່ງ ຂຶ້ນໄປ",
          "dlt_name_eng": "Passenger vehicle from 36 seats or more"
      },
      {
          "dlt_code": "E",
          "dlt_name_lo": "ລົດເບົາ (B), ລົດຂົນສົ່ງສິນຄ້າ (C) ແລະ ລົດຂົນສົ່ງຜູ້ໂດຍສານ (D) ທີ່ແກ່ຫາງລາກນ້ຳໜັກລວມບໍ່ເກີນ 750 ກິໂລກຣາມ",
          "dlt_name_eng": "Car (B), Cargo truck (C) and Passenger vehicle (D), having trailer total weight not exceed 750 kilograms"
      },
      {
          "dlt_code": "E1",
          "dlt_name_lo": "ລົດຂົນສົ່ງສິນຄ້າ (C2) ແກ່ຫາງລາກນ້ຳໜັກລວມເກີນກວ່າ 750 ກິໂລກຣາມ",
          "dlt_name_eng": "Cargo truck (C2) having trailer total weight exceed 750 kilograms"
      }
  ]
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

    async ResetFetch() {
this.formsearchexam.page = 1
this.formsearchexam.per_page = 10
this.formsearchexam.search = ''

    },
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
        this.isLoading = false;
        return true

      } catch (error) {
        console.log('error');
        return false;
      } finally {

      }

    },


    async fetchExamId(id) {
      try {
        const data = await ApiService.get('/exam/main/get/'+id).then(response => {
        
          if(response.status == 204){
            console.log(response.status);
            this.status_exam = 'insert';
          }
          if(response.status == 200){
            const timeedit = this.getDateFromHours(response.data.em_time);
            this.formexam.em_code = response.data.em_code
            this.formexam.em_name_eng = response.data.em_name_eng
            this.formexam.em_name_lo = response.data.em_name_lo
            this.formexam.em_description = response.data.em_description
            this.formexam.em_measure = response.data.em_measure
            this.formexam.em_time = timeedit
            this.status_exam = 'update';
         
          }
          
    
        });
        this.isLoading = false;
        return true

      } catch (error) {
        console.log('error');
        return false;
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

    async UpdateExam() {
      this.isOpenEdit = false;
      await this.ChangeFormateTime('edit');
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

    async SaveExamNewFormate(id) {


      if(this.status_exam == 'insert'){

        console.log('insert',this.formexam.em_time);


        // formexam: {
        //   em_code: "",
        //   em_name_lo: "",
        //   em_name_eng: "",
        //   em_cover: "",
        //   em_description: "",
        //   em_random_amount: "50",
        //   em_measure:"47",
        //   dlt_code:"A",
        //   em_time: ref({
        //     hours: '00',
        //     minutes: '59',
        //     seconds: '00'
        //   }),
        //   user_id: null

  await this.ChangeFormateTime('add');
        const saveexame = await {em_code:this.formexam.em_code,
          em_name_lo:this.formexam.em_name_lo,
          em_name_eng:this.formexam.em_name_eng,
          em_cover:this.formexam.em_cover,
          em_description:this.formexam.em_description,
          em_random_amount:0,
          em_time:this.formexam.em_time,
          em_measure:this.formexam.em_measure,
          dlt_code:this.formexam.dlt_code,
          user_id:this.formexam.user_id,
        }

              try {
        const data = await ApiService.post('/exam/main/create/'+id, saveexame).then(response => {
          console.log(response.status);
          return true;
        });
      } catch (error) {
        return false
      } 

      }else {
        console.log('update');
      }
      // try {
      //   const data = await ApiService.post('/exam/main/create', this.formexam).then(response => {
      //     return true;
      //   });
      // } catch (error) {
      //   return false
      // } 
    },

    async ResetForm() {

      this.image = null;
      this.imagelist = null;
      this.path = "";
      this.formexam = {
        em_code: '',
        em_name: '',
        em_cover: '',
        em_description: '',
        em_random_amount: 50,
        em_measure: 47,
        dlt_code:"A",
        em_time: ref({
          hours: '00',
          minutes: '59',
          seconds: '00'
        }),
        user_id:this.user_id
      };

    },



    async OpenFormInser() {
      this.image = null;
      this.isOpenCreate = true;
    },
    async OpenEditItem(item) {

      const timeedit = this.getDateFromHours(item.em_time);
      this.formexamedit.em_id = item.em_id
      this.formexamedit.em_code = item.em_code
      this.formexamedit.em_name = item.em_name
      this.formexamedit.em_description = item.em_description
      this.formexamedit.em_cover = item.em_cover
      this.formexamedit.em_measure = item.em_measure
      this.formexamedit.em_time = timeedit
      this.formexamedit.em_random_amount = item.em_random_amount
      this.formexamedit.dlt_code = item.dlt_code,
      this.formexamedit.user_id = this.user_id,
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
console.log(time);
      const timed = time.split(':');
      const timeedit = ref({
        hours: timed[0],
        minutes: timed[1],
        seconds: timed[2]
      })
      return timeedit;

    },

    async UploadfileExam() {
      let formData = new FormData();
      formData.append('files', this.imagelist);
      if (this.imagelist) {
        try {
          const data = await ApiService.upload('/media_file/upload/file', formData);
          //  this.path = data.data[0].path
          this.formexam.em_cover = data.data[0].path
          // this.formexamedit.em_cover = data.data[0].path
          return true;
        } catch (error) {
          return false;
        }
      }
    },

    async ChangeFormateTime(item) {


      if (item == 'add') {
        const time = this.formexam.em_time.hours + ':' + this.formexam.em_time.minutes + ':' + this.formexam.em_time.seconds
        this.formexam.em_time = time;

      } else {
        const time = this.formexamedit.em_time.hours + ':' + this.formexamedit.em_time.minutes + ':' + this.formexamedit.em_time.seconds
        this.formexamedit.em_time = time;

      }
    },
  },



});
