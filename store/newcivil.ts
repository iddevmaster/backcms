import { defineStore } from 'pinia';
import axios from "axios";
import ApiService from '../services/api.service';
import { join } from 'path/posix';
const user_id = useCookie('user_id');
export const newCivilStore = defineStore('newscivil', {
  state: () => ({
    locale: true,
    load: true,
    isOpen: false,
    imageReq:false,
    AlertNewsTransport: null,
    datanewstransport: {},
    pending: false,
    AlertText: '',
    pending_form: false,
    sortedbyASC: true,
    getFile: false,
    selected: [],
    samefile: [],
    checkboxes: [], // Array to store checkbox values
    isAllSelected: false,
    count: 0,
    page: 1,
    per_page: 5,
    total_page: null,
    limit_page: null,
    current_page: null,
    total_filter: null,
    total: null,
    itemsPerPage: 3,
    news_id: null,
    form: {},
    formDataNews: {
      news_cover: "",
      news_title: "",
      news_description: "",
      news_type: "2",
      images_list: [],
      user_id: user_id.value
    },
    formDataNewsEdit: {
      news_cover: "",
      news_title: "",
      news_description: "",
      news_type: "2",
      images_list: [],
      user_id: user_id.value
    },
    formNewsImage: {
      ni_path_file: "",
      ni_name_file: "",
      news_id: "",
    },
    formsearchnews: {
      page: 1,
      per_page: 10,
      search: '',
    },
    imageedit: null,


  }

  ),




  getters: {
    data(state) {

    },
    FormEdit(state) {
      return state.formDataEdit;
    },
    getAlertFile(state) {
      return state.getFile;
    },
    GetopenModal(state) {
      return state.isOpen;
    },
    GetopenModal_ID(state) {
      return state.news_id;
    },
    getFormNews(state) {
      return state.formDataNews;
    },
    getFormEditNews(state) {
      return state.formDataNewsEdit;
    },
    Pending(state) {
      return state.pending;
    },
    PendingForm(state) {
      return state.pending_form;
    },
    AlertTextForm(state) {
      return state.AlertText;
    },
    doubleCount(state) {
      return state.count * 2
    },
    getSelect(state) {
      return state.selected;
    },
    getSelectALL(state) {
      return state.isAllSelected;
    },


  },

  actions: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },



    async fetchNewTransport() {
      this.selected = [];
      this.isAllSelected = false;
      this.formsearchnews.page = this.page;
      this.formsearchnews.per_page = this.per_page;

      try {
        this.pending = true
        const response = await ApiService.post('/news/list?news_type=2', this.formsearchnews).then(response => {
          if (response) {
            this.datanewstransport = response.data
            this.total_page = response.data.total_page
            this.limit_page = response.data.limit_page
            this.current_page = response.data.current_page
            this.total_filter = response.data.total_filter
            this.total = response.data.total
          }
        });

      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
        this.pending = false
      }

    },


    async deleteItem_id(id) {
      const index = this.datanewstransport.data.findIndex(item => item.id === id.news_id)
      if (index !== -1) {
        this.datanewstransport.data.splice(index, 1)
      }
      //  this.GetPathImage(id.news_id);
      await this.DelImage(id.news_id);
      try {
        this.pending = true
        const response = await ApiService.delete('/news/delete/' + id.news_id).then(response => {
          this.isOpen = false;
          if (response.status == 200) {

            return response;
          } else {
            console.log('error');
            return response;
          }


        });

      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
        this.pending = false
      }
    },



    async GetPathImage(id) {


      await ApiService.get('/news/get/' + id).then(response => {
        if (response.data.images_list?.length > 0) {
          ///////////// วนลูป ลบรูปภาพก่อน 
          for (let i = 0; i < response.data.images_list.length; i++) {
            console.log('newsdata', response.data.images_list[i]);
            const delimage = ApiService.delete('media_file/file/?f=' + response.data.images_list[i].ni_path_file).then(delimage => {
              console.log('del', delimage);
            });

          }
        }
      });

    },

    async DelImage(id) {
      ApiService.delete('/news/image/delete/' + id).then(response => {
        console.log('response', response);
      });
    },

    async deleteItem(id) {
      this.isOpen = true;
      this.news_id = id;
    },

    async deleteImage(path) {


      if (path) {
        try {
          this.pending = true
          const { pending, error, data } = await useFetch('/media_file/file/?f=' + path, {
            method: 'DELETE',
            baseURL: useEnvStore().apidev,
            headers: new Headers({
              'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p',
              'Content-Type': 'application/json'
            }),
          });


        } catch (error) {

        } finally {

        }


      }

    },



    async SaveImageData(x) {

      if (x.length > 0) {
        for (var i = 0; i < x.length; i++) {
          this.formNewsImage.ni_path_file = x[i].path
          this.formNewsImage.ni_name_file = x[i].filename
          const { pending, error, data } = await useFetch('/news/image/create', {
            method: 'post',
            baseURL: useEnvStore().apidev,
            headers: new Headers({
              'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p',
              'Content-Type': 'application/json'
            }),
            body: this.formNewsImage,
          });

          console.log(data);

        }



        //console.log(this.formNewsImage);
      }




    },

    async SaveDataNew() {
      try {
        const { pending, error, data } = await useFetch('/news/create', {
          method: 'post',
          baseURL: useEnvStore().apidev,
          headers: new Headers({
            'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p',
            'Content-Type': 'application/json'
          }),
          body: this.formDataNews,
        });
        const TransportStorage = newTransportStore();
        await TransportStorage.ResetForm();

        const Alert = AlertStore();
        await Alert.AlertSuccess();


        this.pending_form = true;
      } catch (error) {
        const Alert = AlertStore();
        Alert.AlertError();
      } finally {
        this.pending = false;
      }
    },



    async SaveData(x) {

      this.formDataNews.news_cover = x[0].path;
      const savedata = await ApiService.post('/news/create', this.formDataNews).then(response => {
        this.formNewsImage.news_id = response.data.insertId;
      });

      for (let i = 0; i < x.length; i++) {
        const { pending, error, data } = useFetch('/news/image/create', {
          method: 'post',
          baseURL: useEnvStore().apidev,
          headers: new Headers({
            'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p',
            'Content-Type': 'application/json'
          }),
          body: {
            "ni_path_file": x[i].path,
            "ni_name_file": x[i].filename,
            "news_id": this.formNewsImage.news_id
          }
        });
      }

    },
    async SaveSubmitForm() {
      const counterStorage = UploadStore();
      counterStorage.formi
      if (counterStorage.formi.length === 0) {
        const saveNewsCivil = await ApiService.post('/news/create', this.formDataNews).then(response => {
          this.news_id = response.data.insertId;
        });
      } else {

        /////////////////////////////////// Upload ไปก่อนแล้วจัดเข้า object
        const arrimage = [];
        const formData = new FormData();
        for (const i of Object.keys(counterStorage.formi)) {
          formData.append('files', counterStorage.formi[i])
          const data = await ApiService.upload('media_file/upload/file', formData).then(response => {
            let obj2 = { ni_name_file: response.data[i].filename, ni_path_file: response.data[i].path, ni_id: 0, news_id: 0 };
            arrimage.push(obj2);
          });
          await this.delay(2000);
        }
        //////////////////////จัด Data ก่อน Insert//////////////////////
        this.formDataNews.news_cover = arrimage[0].ni_path_file
        /////////////////////// Insert New //////////////////////////////
        const saveNewsCivil = await ApiService.post('/news/create', this.formDataNews).then(response => {
          this.news_id = response.data.insertId;
        });
        /////////////////////// Insert New Images //////////////////////////////
        for (var x = 0; x < arrimage.length; x++) {
          this.formNewsImage.news_id = this.news_id
          this.formNewsImage.ni_name_file = arrimage[x].ni_name_file
          this.formNewsImage.ni_path_file = arrimage[x].ni_path_file
          const SaveImage = await ApiService.post('/news/image/create', this.formNewsImage)
        }

        await this.ResetForm();
        await this.ClearData()
      }


    },

    async fetchNewsId(id) {
      this.news_id = id;
      try {
        const dat = await ApiService.get('/news/get/' + id);

        this.formDataNewsEdit.news_cover = dat.data.news_cover
        this.formDataNewsEdit.news_title = dat.data.news_title
        this.formDataNewsEdit.news_description = dat.data.news_description
        this.formDataNewsEdit.news_type = dat.data.news_type
        this.formDataNewsEdit.user_id = user_id.value
        this.formDataNewsEdit.images_list = dat.data?.images_list


        const ImageUpload = UploadStore();
        ImageUpload.imagedisplay(this.formDataNewsEdit.images_list);


      } catch (error) {

      } finally {

      }
    },

    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },


    async UpdateFormNews() {
      const counterStorage = UploadStore();
      counterStorage.formi
      if (counterStorage.formi.length === 0) {
        // File is empty
        await this.UpdateFormNewsNoUpload();
      } else {
        const ar = [];
        //////////////////////////////////////// ลบ ////////////////// อันเก่าออก
        if (counterStorage.data_list_image_same) {
          for (var i = 0; i < counterStorage.data_list_image_same.length; i++) {
            const item_image = counterStorage.data_list_image_same[i].ni_id;
            const response = await ApiService.delete('/news/image/delete/' + item_image)
          }
        }
        //////////////////////////////////////// Upload File /////////////////////////
        const formData = new FormData();
        for (const i of Object.keys(counterStorage.formi)) {
          formData.append('files', counterStorage.formi[i])
          const data = await ApiService.upload('media_file/upload/file', formData).then(response => {
            let obj2 = { ni_name_file: response.data[i].filename, ni_path_file: response.data[i].path, ni_id: 0, news_id: 5 };
            ar.push(obj2);
          });
          await this.delay(1000);
        }

        //////////////////////////////////////// จัดไฟล์ object /////////////////////////
        const d = [];
        for (var j = 0; j < counterStorage.data_list_image.length; j++) {
          let result = counterStorage.data_list_image[j].ni_path_file.slice(0, 6);
          if (result === 'static') {
            let obj2 = { ni_name_file: counterStorage.data_list_image[j].ni_name_file, ni_path_file: counterStorage.data_list_image[j].ni_path_file, ni_id: 0, news_id: 5 };
            d.push(obj2);
          } else {

          }

          await this.delay(1000);
        }
        const mergedArray = d.concat(ar)



        ////////////////////////////////// Inser อันไหม//////////////////////////////
     
        if (mergedArray) {
          for (var i = 0; i < mergedArray.length; i++) {
            this.formNewsImage.news_id = this.news_id
            this.formNewsImage.ni_name_file = mergedArray[i].ni_name_file
            this.formNewsImage.ni_path_file = mergedArray[i].ni_path_file
            const savedata = await ApiService.post('/news/image/create', this.formNewsImage);
          }
          this.formDataNewsEdit.news_cover = mergedArray[0].ni_path_file
        }
        //////////////////////////Update////////////// New
        const data = await ApiService.put('/news/update/' + this.news_id, this.formDataNewsEdit)
      }

      await this.ClearData()

    },
 
    async InsertImageNews(obj1) {
      setTimeout(function () {
        console.log(obj1);
        const SaveDataImage = ApiService.post('/news/image/create', obj1).then(response => {
          if (response.status == 200) {
            console.log(response.data);
          }
        });

      }, 3000);
    },
    async UpdateFormNewsNoUpload() {
      ////////////////ลบ อันเดิมก่อนน/////////////////////////
      const UploadImage = UploadStore();
      console.log(UploadImage.data_list_image_same)
      if (UploadImage.data_list_image_same) {
        for (var i = 0; i < UploadImage.data_list_image_same.length; i++) {
          const item_image = UploadImage.data_list_image_same[i].ni_id;
          const response = await ApiService.delete('/news/image/delete/' + item_image)

        }
      }
      /////////////////// insert //////////////// Data ใหม่

      if (UploadImage.data_list_image) {
        for (var i = 0; i < UploadImage.data_list_image.length; i++) {
          this.formNewsImage.news_id = this.news_id
          this.formNewsImage.ni_name_file = UploadImage.data_list_image[i].ni_name_file
          this.formNewsImage.ni_path_file = UploadImage.data_list_image[i].ni_path_file
          const savedata = await ApiService.post('/news/image/create', this.formNewsImage);
        }
        this.formDataNewsEdit.news_cover = UploadImage.data_list_image[0].ni_path_file
      }

      //////////////////////////Update////////////// New


      const data = await ApiService.put('/news/update/' + this.news_id, this.formDataNewsEdit)

      await this.ClearData()


    },
    // async UpdateFormNewsUpload() {

    //   const counterStorage = UploadStore();
    //   counterStorage.formi

    //   const formData = new FormData();
    //   for (const i of Object.keys(counterStorage.formi)) {
    //     formData.append('files', counterStorage.formi[i])
    //   }

    //   axios.post('https://oasapi.iddriver.com/media_file/upload/file',
    //     formData, {
    //     headers: {
    //       'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p',
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    //   ).then(function (response) {


    //     const counterStorage = UploadStore();
    //     counterStorage.preview_list.length


    //     for (var i = 0; i < counterStorage.preview_list.length; i++) {
    //       console.log(counterStorage.preview_list[i]);
    //       //Do something
    //     }
    //   })
    //     .catch(function () {
    //       console.log('FAILURE!!');
    //     });

    // },
    // async UpdateFormNewsDataUpload(data) {
    //   this.formDataNewsEdit.news_cover
    //   const x = this.formDataNewsEdit.news_cover.split(',');
    //   for (var i = 0; i < data.length; i++) {

    //   }
    //   const string = x.join(',');
    //   this.formDataNewsEdit.news_cover = string;



    // },



    ResetForm() {

      this.formDataNews = {
        news_cover: '',
        news_title: '',
        news_description: '',
        news_type: "1",
        user_id: user_id.value,
      };



      const UploadStorage = UploadStore();

      UploadStorage.preview = null,
        UploadStorage.image = null,
        UploadStorage.preview_list = [],
        UploadStorage.image_list = [],
        UploadStorage.formi = []

      console.log('reset upload');
    },


    setCurrentPage(page) {
      this.page = page
      this.selected = [];
      this.isAllSelected = false
    },

    sortLists(sortBy) {
      if (this.sortedbyASC) {
        this.posts.data.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedbyASC = false;
      } else {
        this.posts.data.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedbyASC = true;
      }
    },

    selectentires(data_entires) {
      this.per_page = data_entires;
      this.page = 1;
    },
    async UploadImage(image) {
      console.log(image);

    },

    async ClearData() {

      const UpStorage = UploadStore();
      UpStorage.formi = []
      UpStorage.preview_list = [];

      UpStorage.preview = null;
      UpStorage.image = null;
      UpStorage.image_list = [];
      UpStorage.preview_list_same = [];
      UpStorage.data_list_image = [];
      UpStorage.data_list_image_same = [];
    },






  },






});


