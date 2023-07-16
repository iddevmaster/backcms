import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';
import axios from "axios";




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
    per_page:2,
    total_page:null,
    limit_page:null,
    current_page:null,
    total_filter:null,
    total:null,
    itemsPerPage: 3,
    news_id:null,
    formDataNews:{
      news_cover: "",
      news_title: "",
      news_description: "",
      news_type: "2",
      user_id: 1
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
 try {
  this.pending = true
  const { pending , error, data } = await useFetch('/news/list', {
    method: 'post',
    baseURL:useEnvStore().apidev,
    headers: new Headers({
      'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
      'Content-Type': 'application/json'
  }), 
  body: {
    "page" : this.page,
    "per_page" : this.per_page,
    "search" :""
},
  });


  if (data.value.data) {
    this.datanewstransport = data.value
    this.total_page = data.value.total_page
    this.limit_page = data.value.limit_page
    this.current_page = data.value.current_page
    this.total_filter = data.value.total_filter
    this.total = data.value.total
  }
  
 
} catch (error) {
  this.error = error
} finally {
  this.loading = false
   this.pending = false
}
    },

    async fetchUsersId(id) {


      try {
        
        const { pending , error, data } = await useFetch('/user/get/' + id, {
          method: 'GET',
          baseURL:useEnvStore().apidev,
          headers: new Headers({
            'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
            'Content-Type': 'application/json'
        }), 
        });
        this.formDataEdit.user_firstname = data.value.user_firstname
        this.formDataEdit.user_name = data.value.user_name
        this.formDataEdit.user_password = data.value.user_password
        this.formDataEdit.user_lastname = data.value.user_lastname
        this.formDataEdit.user_email = data.value.user_email
        this.formDataEdit.user_phone = data.value.user_phone
     
      
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
        this.pending = false
      }
    
    },

    async deleteItem_id(id) {
      console.log('id',id);
        const index = this.datanewstransport.data.findIndex(item => item.id === id)
      if (index !== -1) {
        this.datanewstransport.data.splice(index, 1)
      }
      try {
        this.pending = true
        const { pending , error, data } = await useFetch('/news/delete/' + id, {
          method: 'DELETE',
          baseURL:useEnvStore().apidev,
          headers: new Headers({
            'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
            'Content-Type': 'application/json'
        }), 
        });
      
        this.isOpen = false;
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
        this.pending = false
      }


    },

    async Update(id) {

    
    try {
      this.pending = true
      const { pending , error, data } = await useFetch('/news/update/' + id, {
        method: 'PUT',
        baseURL:useEnvStore().apidev,
        headers: new Headers({
          'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
          'Content-Type': 'application/json'
      }), 
      body:this.formDataEdit,
      });

      
    
      if(data.value){
        this.AlertText = 'success';
      }else {
        this.AlertText = 'danger';
      }
      this.pending_form = true;
    } catch (error) {
      this.AlertText = 'danger';
    } finally {
      this.pending = false;
    }

  },

    async deleteItem(id) {
console.log(id);
      this.isOpen = true;
      this.news_id = id;

    
      
    },
    async selectall() {

      this.selected = [];

      if (!this.isAllSelected) {
        this.posts.data.forEach((value, index) => {
   
          this.selected.push(value);
      });
      
      }

      this.isAllSelected = !this.isAllSelected;
    },

    async selectone(x) {

    
      const index = this.selected.indexOf(x);

      if (index !== -1) {
        this.selected.splice(index, 1); // Remove value if already present
      } else {
        this.selected.push(x); // Add value if not present
      }
    },

    cance() {
      this.isAllSelected = false;
    },

    SaveDataNew (){

      try {
        console.log('SaveDataNew');
        // const { pending,error, data } = useFetch('/news/create', {
        //   method: 'post',
        //   baseURL:useEnvStore().apidev,
        //   headers: new Headers({
        //     'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
        //     'Content-Type': 'application/json'
        // }), 
        
        // body:this.formDataNews,
        // });

 
        // this.pending_form = true;

        // if(data){
        //   this.AlertText = 'success';
        // }else {
        
        //   this.AlertText = 'danger';
        // }
      } catch (error) {
        this.AlertText = 'danger';
      } finally {
        this.AlertText = 'success';

      }
    },

    SaveDataNewImage (){

     
  //   const array = [];
  //    for (let obj of x) {
  //     array.push(obj.path)
  //  }

  //  const string = array.join(',');


  //  this.formDataNews.news_cover = string;

   

  try {
    console.log('SaveDataNewImage');
    this.AlertText = 'success';
        // const { pending,error, data } = useFetch('/news/create', {
        //   method: 'post',
        //   baseURL:useEnvStore().apidev,
        //   headers: new Headers({
        //     'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
        //     'Content-Type': 'application/json'
        // }), 
        
        // body:this.formDataNews,
        // });

 
        // this.pending_form = true;

        // if(data){
        //   this.AlertText = 'success';
        // }else {
        
        //   this.AlertText = 'danger';
        // }
      } catch (error) {
        this.AlertText = 'danger';
      } finally {
        this.AlertText = 'success';

      }
    },
    async SaveFormNews(){


          const counterStorage = UploadStore();
            counterStorage.formi

            if (counterStorage.formi.length === 0) {
              // File is empty
              console.log("File is empty");

            const TransportStorage = newTransportStore();
           await TransportStorage.SaveDataNew();
           await TransportStorage.ResetForm();
           




                 // try {
      //   const { pending,error, data } = await useFetch('/news/create', {
      //     method: 'post',
      //     baseURL:useEnvStore().apidev,
      //     headers: new Headers({
      //       'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
      //       'Content-Type': 'application/json'
      //   }), 
        
      //   body:this.formDataNews,
      //   });

 
      //   this.pending_form = true;

      //   if(data){
         

      //     this.AlertText = 'success';
      //   }else {
        
      //     this.AlertText = 'danger';
      //   }
      
    

      // } catch (error) {
      //   this.AlertText = 'danger';
      // } finally {
      //   this.AlertText = 'success';

      // }
            } else {
              // File has content
              console.log("File has content");
              const TransportStorage = newTransportStore();
              await TransportStorage.SaveDataNewImage();
              await TransportStorage.ResetForm();

  //                       axios.post('http://oasapi.iddriver.com/media_file/upload/file',
  //         counterStorage.formi, {
  //      headers: {
  //       'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
  //        'Content-Type': 'multipart/form-data'
  //      }
  //    }
  //  ).then(function (response) {
    
  //           const TransportStorage = newTransportStore();
  //           TransportStorage.SaveDataNewImage(response.data);
  //  })
  //  .catch(function () {
  //    console.log('FAILURE!!');
  //  });

            //       const TransportStorage = newTransportStore();
            // TransportStorage.SaveDataNewImage(1);
    
            }
            // counterStorage.formi.forEach((value,key) => {
            //   console.log('counterStorage',value);
            // });






     /////////  step 1 upload ////// 


  //         axios.post('http://oasapi.iddriver.com/media_file/upload/file',
  //         counterStorage.formi, {
  //      headers: {
  //       'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
  //        'Content-Type': 'multipart/form-data'
  //      }
  //    }
  //  ).then(function (response) {
  //    const counterStorage = newTransportStore();
  //           counterStorage.SaveDataNew(response.data);
  //  })
  //  .catch(function () {
  //    console.log('FAILURE!!');
  //  });

     //////// step 2 insert New //////
     


      // try {
      //   const { pending,error, data } = await useFetch('/news/create', {
      //     method: 'post',
      //     baseURL:useEnvStore().apidev,
      //     headers: new Headers({
      //       'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
      //       'Content-Type': 'application/json'
      //   }), 
        
      //   body:this.formDataNews,
      //   });

 
      //   this.pending_form = true;

      //   if(data){
         

      //     this.AlertText = 'success';
      //   }else {
        
      //     this.AlertText = 'danger';
      //   }
      
    

      // } catch (error) {
      //   this.AlertText = 'danger';
      // } finally {
      //   this.AlertText = 'success';

      // }
    },

    ResetForm(){

      this.formDataNews = {
        news_cover:'',
        news_title:'',
        news_description:''
      };


      
      const UploadStorage = UploadStore();

      UploadStorage.preview = null,
      UploadStorage.image = null,
      UploadStorage.preview_list = [],
      UploadStorage.image_list = [],
      UploadStorage.formi = []
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
    



  },
});


