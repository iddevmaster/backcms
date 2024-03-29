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
      em_name: "",
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
     dtl:[
      {
        dlt_code: "A",
        dlt_description_loas:
          "ລົດຈັກສອງລໍ້ ຄວາມແຮງບໍ່ເກີນ 125 cc",
        dlt_description_english:
          "Two-wheeled motorcycle, not too strong", 
      },
      {
        dlt_code: "A1",
        dlt_description_loas:
          "ລົດຈັກສອງລໍ້ ຄວາມແຮງ ແຕ່ 125 cc ຂື້ນໄປ",
        dlt_description_english:
          "Two-wheeled motorcycle with a capacity of 125 cc ",    
      },
      {
        dlt_code: "A2",
          dlt_description_loas:
          "ລົດຈັກສາມລໍ້ສ່ວນຕົວ, ລົດສອງລໍ້ ແລະ ສາມລໍ້ໂດຍສານ",
        dlt_description_english:
          "Private tricycles, two-wheelers and passenger tricycles",   
      },
      {
        dlt_code: "A3",
          dlt_description_loas:
          "ລົດໄຖນາທີ່ແກ່ລໍ້ ແລະ ລົດຕ໋ອກໆ",
        dlt_description_english:
          "Old wheeled tractors and trucks",   
      },
      {
        dlt_code: "B",
          dlt_description_loas:
          "ລົດເບົາ ສີ່ລໍ້ ທີ່ມີນ້ຳໜັກລວມບໍ່ເກີນ 3.500 ກິໂລກຣາມ ແລະ ບໍ່ເກີນ 9 ບ່ອນນັ່ງ ລວມທັງຜູ້ຂັບຂີ່",
        dlt_description_english:
          "less than 3,500 kilograms, not more than 9 seats, including the driver",   
      },
      {
        dlt_code: "C",
          dlt_description_loas:
          "ລົດຂົນສົ່ງສິນຄ້ານ້ຳໜັກລວມ ແຕ່ 3.500 ກິໂລກຣາມ ຫາ 7.500 ກິໂລກຣາມ",
        dlt_description_english:
          "Heavy goods vehiclesa= total of 3,500 to 7.500 kilograms",
      },
      {
        dlt_code: "C1",
          dlt_description_loas:
          "ລົດຂົນສົ່ງສິນຄ້ານ້ຳໜັກລວມ ເກີນກວ່າ 7.500ກິໂລກຣາມ ຫາ 15.000 ກິໂລກຣາມ",
        dlt_description_english:
          "Weight of the truck exceeds a total of 7,500 to 15,000 kilograms",   
      },
      {
        dlt_code: "C2",
          dlt_description_loas:
          "ລົດຂົນສົ່ງສິນຄ້ານ້ຳໜັກລວມ ເກີນກວ່າ 15.000 ກິໂລກຣາມ.",
        dlt_description_english:
          "Transportation vehicles, weighing 15,000 kilograms or more",   
      },
      {
        dlt_code: "D",
          dlt_description_loas:
          "ລົດຂົນສົ່ງຜູ້ໂດຍສານປະເພດ 4 ລໍ້ ຂຶ້ນໄປ, ບໍ່ເກີນ ສິບຫ້າ ບ່ອນນັ່ງ",
        dlt_description_english:
          "Passenger car type 4 wheels and above, no more than fifteen seats",   
      },
      {
        dlt_code: "D1",
          dlt_description_loas:
          "ລົດຂົນສົ່ງຜູ້ໂດຍສານ ແຕ່ ສິບຫົກ ຫາ ສາມສິບຫ້າ ບ່ອນນັ່ງ",
        dlt_description_english:
          "Passenger cars from sixteen to thirty-five seats",   
      },
      {
        dlt_code: "D2",
          dlt_description_loas:
          "ລົດຂົນສົ່ງຜູ້ໂດຍສານ ແຕ່ ສາມສິບຫົກ ບ່ອນນັ່ງ ຂຶ້ນໄປ",
        dlt_description_english:
          "Passenger cars with thirty-six seats or more",   
      },
      {
        dlt_code: "E",
          dlt_description_loas:
          "ລົດເບົາ (B), ລົດຂົນສົ່ງສິນຄ້າ (C) ແລະ ລົດຂົນສົ່ງຜູ້ໂດຍສານ (D) ທີ່ແກ່ຫາງລາກນ້ຳໜັກລວມບໍ່ເກີນ 750 ກິໂລກຣາມ",
        dlt_description_english:
          "Light vehicles (B), cargo vehicles (C) and passenger vehicles (D) with a total weight of not more than 750 kg",   
      },
      {
        dlt_code: "E1",
          dlt_description_loas:
          "ລົດຂົນສົ່ງສິນຄ້າ (C2) ແກ່ຫາງລາກນ້ຳໜັກລວມເກີນກວ່າ 750 ກິໂລກຣາມ",
        dlt_description_english:
          " Cargo vehicles (C2) with a total weight exceeding 750 kg",   
      },
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
          this.formexamedit.em_cover = data.data[0].path
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
