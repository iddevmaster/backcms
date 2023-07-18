import { defineStore } from 'pinia';
import axios from "axios";
import { OrdersService } from "../services/orders.service";
import ApiService from '../services/api.service';
const user_id = useCookie('user_id');



export const newTransportStore = defineStore('newstransport', {
  state: () => ({
    locale:true,
    load:true,
    isOpen: false,
    AlertNewsTransport:null,
    datanewstransport:{},
    pending:false,
    AlertText:'',
    pending_form:false,
    sortedbyASC: true,
    selected: [],
    checkboxes: [], // Array to store checkbox values
    isAllSelected: false,
    count: 0,
    page:1,
    per_page:5,
    total_page:null,
    limit_page:null,
    current_page:null,
    total_filter:null,
    total:null,
    itemsPerPage: 3,
    news_id:null,
    form:{},
    formDataNews:{
      news_cover: "",
      news_title: "",
      news_description: "",
      news_type: "2",
      images_list:[],
      user_id:user_id.value
  },
  formNewsImage:{
    ni_path_file: "",
    ni_name_file: "",
    news_id: "",
  }

  
  }
     
),




  getters: {
    data(state) {
   
    },
    FormEdit(state) {
      return state.formDataEdit;
    },
    GetopenModal(state) {
      return state.isOpen;
    },
    GetopenModal_ID(state) {
      return state.news_id;
    },
    getFormNews(state){
      return state.formDataNews;
    },
    Pending(state){
      return state.pending;
    },
    PendingForm(state){
      return state.pending_form;
    },
    AlertTextForm(state){
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
      this.form.page = this.page;
      this.form.per_page = this.per_page;
      this.form.search = "";

  

     try {
  this.pending = true
  const response = await ApiService.post('/news/list',this.form).then(response => {
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
      try {
        this.pending = true
        const response = await ApiService.delete('/news/delete/'+id.news_id).then(response => {
          this.isOpen = false;
        });

      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
        this.pending = false
      }
    },

  //   async Update(id) {
  //   try {
  //     this.pending = true
  //     const { pending , error, data } = await useFetch('/news/update/' + id, {
  //       method: 'PUT',
  //       baseURL:useEnvStore().apidev,
  //       headers: new Headers({
  //         'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
  //         'Content-Type': 'application/json'
  //     }), 
  //     body:this.formDataEdit,
  //     });

  //     if(data.value){
  //       this.AlertText = 'success';
  //     }else {
  //       this.AlertText = 'danger';
  //     }
  //     this.pending_form = true;
  //   } catch (error) {
  //     this.AlertText = 'danger';
  //   } finally {
  //     this.pending = false;
  //   }

  // },

    async deleteItem(id) {

      this.isOpen = true;
      this.news_id = id;

    },

    async deleteImage(path) {


      if(path){
        try {
          this.pending = true
          const { pending , error, data } = await useFetch('/media_file/file/?f=' + path, {
            method: 'DELETE',
            baseURL:useEnvStore().apidev,
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


    
  async SaveImageData (x){
   
if(x.length > 0){
  for (var i = 0; i < x.length; i++) {
   
    this.formNewsImage.ni_path_file = x[i].path
    this.formNewsImage.ni_name_file = x[i].filename


    const { pending,error, data } = await useFetch('/news/image/create', {
      method: 'post',
      baseURL:useEnvStore().apidev,
      headers: new Headers({
        'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
        'Content-Type': 'application/json'
    }), 
    body:this.formNewsImage,
    });

    console.log(data);

  }
  


//console.log(this.formNewsImage);
}




  },
 
  async SaveDataNew (){
      try {
        const { pending,error, data } = await useFetch('/news/create', {
          method: 'post',
          baseURL:useEnvStore().apidev,
          headers: new Headers({
            'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
            'Content-Type': 'application/json'
        }), 
        body:this.formDataNews,
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



    async SaveData (x){
    
    this.formDataNews.news_cover = x[0].path;
      try {
        const savedata = await ApiService.post('/news/create',this.formDataNews).then(response => {
          this.formNewsImage.news_id = response.data.insertId;
        });
        console.log(this.formNewsImage.news_id);
     //   this.formNewsImage.news_id = data.value.insertId;
     const TransportStorage = newTransportStore();
   
       await TransportStorage.SaveImageData(x);
     //   await TransportStorage.ResetForm();

        const Alert = AlertStore();
        await Alert.AlertSuccess();
      } catch (error) {
        const Alert = AlertStore();
        Alert.AlertError();
      } finally {
        this.pending = false;
      }
    },
    async SaveSubmitForm(){
          const counterStorage = UploadStore();
            counterStorage.formi
            if (counterStorage.formi.length === 0) {
              // File is empty
              console.log("File is empty");

            const TransportStorage = newTransportStore();
            await TransportStorage.SaveDataNew();
            } else {
              // File has content
           
              const formData = new FormData();
              for (const i of Object.keys(counterStorage.formi)) {
                formData.append('files', counterStorage.formi[i]) 
                console.log("File has content",counterStorage.formi[i]);
              }

      axios.post('https://oasapi.iddriver.com/media_file/upload/file',
      formData, {
       headers: {
        'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
         'Content-Type': 'multipart/form-data'
       }
     }
   ).then(function (response) {
    console.log('pic',response.data);
        const TransportStorage = newTransportStore();
       TransportStorage.SaveData(response.data);
         
          //  TransportStorage.ResetForm();
   })
   .catch(function () {
     console.log('FAILURE!!');
   });

  
            }

    },

  async fetchNewsId(id){

    this.news_id = id;
try {
        
  const { pending , error, data } = await useFetch('/news/get/' + id, {
    method: 'GET',
    baseURL:useEnvStore().apidev,
    headers: new Headers({
      'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
      'Content-Type': 'application/json'
  }), 
  });
 



this.formDataNews.news_cover = data.value.news_cover
this.formDataNews.news_title = data.value.news_title
this.formDataNews.news_description = data.value.news_description
this.formDataNews.news_type = data.value.news_type
this.formDataNews.user_id = user_id.value
this.formDataNews.images_list = data.value.images_list






} catch (error) {
  
} finally {

}
    },
     
    async UpdateFormNews(){

      const counterStorage = UploadStore();
      counterStorage.formi

      if (counterStorage.formi.length === 0) {
        // File is empty
     this.UpdateFormNewsNoUpload();
        console.log("Edit File is empty");
      } else {
        console.log("Edit Hash file");
        this.UpdateFormNewsUpload();

      }
 
     
    },
    async UpdateFormNewsNoUpload(){

       try {
        const { pending,error, data } = await useFetch('/news/update/'+ this.news_id, {
          method: 'PUT',
          baseURL:useEnvStore().apidev,
          headers: new Headers({
            'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
            'Content-Type': 'application/json'
        }), 
        body:this.formDataNews,
        });
        const TransportStorage = newTransportStore();
    

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
    async UpdateFormNewsUpload(){

      const counterStorage = UploadStore();
      counterStorage.formi

const formData = new FormData();
for (const i of Object.keys(counterStorage.formi)) {
  formData.append('files', counterStorage.formi[i])
 
}

axios.post('https://oasapi.iddriver.com/media_file/upload/file',
formData, {
headers: {
'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
'Content-Type': 'multipart/form-data'
}
}
).then(function (response) {

const TransportStorage = newTransportStore();
TransportStorage.UpdateFormNewsDataUpload(response.data);

//  TransportStorage.ResetForm();
})
.catch(function () {
console.log('FAILURE!!');
});

    },
    async UpdateFormNewsDataUpload(data){
     this.formDataNews.news_cover
     const x = this.formDataNews.news_cover.split(',');
       for (var i = 0; i < data.length; i++) {
 console.log(x.push(data[i].path));
        }
      const string = x.join(',');
      this.formDataNews.news_cover = string;

  


      // try {
      //   const { pending,error, data } = await useFetch('/news/update/'+ this.news_id, {
      //     method: 'PUT',
      //     baseURL:useEnvStore().apidev,
      //     headers: new Headers({
      //       'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
      //       'Content-Type': 'application/json'
      //   }), 
      //   body:this.formDataNews,
      //   });
      
       
       
      // } catch (error) {
      //   const Alert = AlertStore();
      //   Alert.AlertError();
      // } finally {
      //   this.pending = false;
      // }

 

    
    },



    ResetForm(){

      this.formDataNews = {
        news_cover:'',
        news_title:'',
        news_description:'',
        news_type:"2",
        user_id:user_id.value,
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

    sortLists(sortBy){
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

//     viewupload(i) {
// const UpdtStorage = UploadStore();
// UpdtStorage.Viewimage(i);
//     },

//     changeimagetoarry(i) {

// const usingSplit = i.split(',');

// if(usingSplit == ''){
//   // const usingSplit = [];
//   // usingSplit.length == 0;
//   // return usingSplit = [];

//   return [];
// }else{
 
//   return usingSplit;
// }


 
//     // const string = array.join(',');
//     // this.formDataNews.news_cover = string;

//     },
    
  },



});


