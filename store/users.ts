import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';
import ApiService from '@/services/api.service';

import moment from "moment";



export const usersStore = defineStore('users', {
  state: () => ({
    locale: true,
    loc:0,
    lng:'static/upload/2023/11/files-jQHyakITaP.png',
    load: true,
    isOpen: false,
    ModalApp: false,
    status_app:null,
    AlertText: null,
    posts: {},
    posts_statff:{},
    pending: false,
    pending_form: false,
    modal_update_status: false,
    sortedbyASC: true,
    selected: [],
    imagelist: null,
    Idcard:false,
    checkboxes: [], // Array to store checkbox values
    isAllSelected: false,
    appr:[],
    userapprove:null,
    checkuserotp:null,
    type:0,
    count: 0,
    page: 1,
    per_page: 10,
    searchDa: '',
    comment_details:'',
    total_page: null,
    limit_page: null,
    current_page: null,
    total_filter: null,
    total: null,
    itemsPerPage: 3,
    user_id_del: null,
    user_id:null,
    location_id:1,
    country_id:1,
    comment:[],
    formsearch: {
      page: 1,
      per_page: 20,
      search: '',
      verify_account:''
    },
    formapprove: {
      page: 1,
      per_page: 1000,
      search: '',
      user_id: '',
    },
    formsearchUserlog:{
      user_id: '',
    },
    formszipcode: {
      page: 1,
      per_page: 200,
      search: '',
    },
    formsearchUser: {
      user_admin_id:null,
      user_search_id:null
    },
    formscount: {
      page: 1,
      per_page: 200,
      search: '',
    },
    display_user:null,
    formDataregister: {
      user_prefrix: null,
      user_name: null,
      user_password: null,
      user_firstname: null,
      user_lastname: null,
      user_email: null,
      user_phone: null,
      user_type: null,
      user_address: null,
      user_birthday: null,
      user_img: null,
      location_id: 1,
      country_id: 1,
      verify_account:"unactive",
      active:null
    },
    formDataEdit: {
      user_prefrix: null,
      user_name: null,
      user_password: null,
      user_firstname: null,
      user_lastname: null,
      user_email: null,
      user_phone: "",
      user_type: null,
      active:null
    },
    formDetailEdit: {
      identification_number:null,
      verify_account:"unactive",
      user_img: null,
      user_birthday: "1993-03-19",
      user_address: null,
      location_id: null,
      country_id: null,
      user_id: null,
      user_village: "",
    },
    zipcode:null,
    country:null,
    user_img:null,
    lan:[
      '../../assets/images/loas.png','static/upload/2023/11/files-QrkYdiAou9.png','static/upload/2023/9/files-JWOxjtiwsQ.png',
     ],
     formapeple: {
      user_id:null,
      username: '',
      user_phone: '',
      full_name: '',
      first_name: '',
      last_name: '',
      user_prefrix: '',
      identification_number: '',
      user_birthday: '',
      expire: '',
      user_village: '',
      user_address: '',
      location_id: null,
      country_id: null,
      passpost_image:'',
      real_image:'',
      user_password:'',
      user_email:'',
      verify_account:"system_active",
      user_type:"3",
      active:1
    },
    formeditapeple: {
      user_id:null,
      username: '',
      user_phone: '',
      full_name: '',
      first_name: '',
      last_name: '',
      user_prefrix: '',
      identification_number: '',
      user_birthday: '',
      expire: '',
      user_village: '',
      user_address: '',
      location_id: null,
      country_id: 33,
      passpost_image:'',
      real_image:'',
      user_password:'',
      user_email:'',
      user_type:"3",
      active:1
    },
    passpost_image:'',
    image_pas:'',
    real_image:'',
    image_real:'',
    email:'',
    checkIden: false,
checkemail: false,
checkphone: false,
checkusername: false,
log_user :[],
log_admin :[],
formlog:{
  user_id:null,
  user_admin:null,
  des:null,
  type:1
},

formupdatestatus:{
  verify_account:'',
  comment_details:null,
  user_id:null,
  user_admin:null
},

  }

  ),


  getters: {
    data(state) {

    },
    getFormPeple(state) {
      return state.formapeple;
    },

    EditFormPeple(state) {
      return state.formeditapeple;
    },

    FormEdit(state) {
      return state.formDataEdit;
    },
    GetopenModal(state) {
      return state.isOpen;
    },
    GetopenModal_ID(state) {
      return state.user_id_del;
    },
    getForm(state) {
      return state.formDataregister;
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
    FormEditDetail(state) {
      return state.formDetailEdit;
    },
  },

  actions: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },

    async ResetFetch() {
      this.formsearch.page = 1;
      this.formsearch.per_page = 10;
      this.formsearch.search = '';
      this.searchDa = '';
    },
 
    async fetchUsers() {
      this.selected = [];
      this.isAllSelected = false;

      this.formsearch.per_page = this.per_page;
      this.formsearch.search = this.searchDa;
      this.formsearch.user_id = this.user_id;

    if(this.type == 0){
      try {
        this.pending = true
        const data = await ApiService.post('/user/list?', this.formsearch).then(response => {
         
          this.posts_statff = response.data
          this.total_page = response.data.total_page
          this.limit_page = response.data.limit_page
          this.current_page = response.data.current_page
          this.total_filter = response.data.total_filter
          this.total = response.data.total
        });

      } catch (error) {
       return false
      } finally {
        this.loading = false
        this.pending = false
      }
    }
    if(this.type == 1){
      try {
        this.pending = true
        const data = await ApiService.post('/user/list?user_type='+this.type, this.formsearch).then(response => {
          this.posts_statff = response.data
          this.total_page = response.data.total_page
          this.limit_page = response.data.limit_page
          this.current_page = response.data.current_page
          this.total_filter = response.data.total_filter
          this.total = response.data.total
        });

      } catch (error) {
       return false
      } finally {
        this.loading = false
        this.pending = false
      }
    }
    if(this.type == 2){
      try {
        this.pending = true
        const data = await ApiService.post('/user/list?user_type='+this.type, this.formsearch).then(response => {
         
          this.posts_statff = response.data

      
          this.total_page = response.data.total_page
          this.limit_page = response.data.limit_page
          this.current_page = response.data.current_page
          this.total_filter = response.data.total_filter
          this.total = response.data.total
        });

      } catch (error) {
       return false
      } finally {
        this.loading = false
        this.pending = false
      }
    }
    if(this.type == 3){
      try {
        this.pending = true
        const data = await ApiService.post('/user/list?user_type='+this.type, this.formsearch).then(response => {
         
          this.posts_statff = response.data
          this.total_page = response.data.total_page
          this.limit_page = response.data.limit_page
          this.current_page = response.data.current_page
          this.total_filter = response.data.total_filter
          this.total = response.data.total
        });

      } catch (error) {
       return false
      } finally {
        this.loading = false
        this.pending = false
      }
    }
  
    },


    async fetchUsersStaff() {
      this.selected = [];
      this.isAllSelected = false;

      this.formsearch.per_page = this.per_page;
      this.formsearch.search = this.searchDa;
      this.formsearch.user_id = this.user_id;


      console.log(this.formsearch);

    
      try {
        this.pending = true
        const data = await ApiService.post('/user/list?user_type='+this.type, this.formsearch).then(response => {
         
          this.posts_statff = response.data

      
          this.total_page = response.data.total_page
          this.limit_page = response.data.limit_page
          this.current_page = response.data.current_page
          this.total_filter = response.data.total_filter
          this.total = response.data.total
        });

      } catch (error) {
       return false
      } finally {
        this.loading = false
        this.pending = false
      }
    },


    async fetchUsersId(user_id) {
  
      try {
        const data = await ApiService.get('/user/get/' + user_id).then(response => {
          this.formDataEdit = response.data;
          this.formDataEdit.user_password = "";
          this.formDetailEdit.verify_account = "unactive";
          this.image = null;
          if(Object.keys(response.data.detail).length === 0){
            this.formDetailEdit.identification_number = ""
            this.formDetailEdit.user_birthday = ""
            this.formDetailEdit.user_address = ""
            this.formDetailEdit.user_img = ""
            this.formDetailEdit.verify_account = "unactive"
            this.image = null
            this.formDetailEdit.location_id = null
            this.formDetailEdit.country_id = null
            this.formDetailEdit.user_id = user_id

          
          }else {
       
            this.formDetailEdit.identification_number = this.formDataEdit.detail.identification_number
            this.formDetailEdit.user_birthday = this.formDataEdit.detail.user_birthday
            this.formDetailEdit.user_address = this.formDataEdit.detail.user_address
            this.formDetailEdit.location_id = this.formDataEdit.detail.location_id
            this.formDetailEdit.country_id = this.formDataEdit.detail.country_id
            this.formDetailEdit.user_village = this.formDataEdit.detail.user_village
            this.image = this.formDataEdit.detail.user_img
            this.formDetailEdit.user_img = this.formDataEdit.detail.user_img
            this.formDetailEdit.verify_account = this.formDataEdit.detail.verify_account
            this.formDetailEdit.user_id = parseInt(user_id)

       //     this.formDetailEdit.location = this.formDataEdit.detail.location
            this.formDetailEdit.country = this.formDataEdit.detail.country
            this.formDetailEdit.location = this.formDataEdit.detail.location
            this.formDetailEdit.location.id = response.data.detail.location_id
            this.formDetailEdit.country.country_id = response.data.detail.country_id
          
            
          }
        
        });
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
        this.pending = false
      }

    },

    async deleteItem_id(user_id) {
      const index = this.posts_statff.data.findIndex(item => item.user_id === user_id)
      if (index !== -1) {
        this.posts_statff.data.splice(index, 1)
      }
      try {
        const del = await ApiService.delete('/user/delete/' + user_id);
        this.isOpen = false;
        return 200;
      } catch (error) {
        return error;
      }
    },

    async Update(user_id) {
      try {
        const response = await ApiService.put('/user/update/' + user_id, this.formDataEdit);
        return response.data
      } catch (error) {
       return false;
      }
    },

    async UpdateDetails() {
      await this.UploadfileProfile()
     const savedetail = await this.SaveDetails()
  
      return savedetail;
    },

  
    async deleteItem(user_id) {
      this.isOpen = true;
      this.user_id_del = user_id;
    },
    async selectall() {
      this.selected = [];
      if (!this.isAllSelected) {
        this.posts_statff.data.forEach((value, index) => {
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
    async SaveForm() {
      this.pending = true;

      try {
        const register = await ApiService.post('/user/create', this.formDataregister).then(response => {
       if(response.data == ""){
        return false;
       }else {
return true;
       }
          //  this.pending_form = true;
        });
  
     return register;
      } catch (error) {
        return false;
      } finally {
        this.pending = false;
      }

    },

   async SaveFoamdetails() {
 await this.UploadfileProfile()
 await this.SaveDetails()
  return true;
    },

    async SaveDetails() {

const a = {verify_account:this.formDetailEdit.verify_account,identification_number:this.formDetailEdit.identification_number,
user_img:this.formDetailEdit.user_img,user_birthday:this.formDetailEdit.user_birthday,
user_address:this.formDetailEdit.user_address,
location_id:this.formDetailEdit.location.id,
country_id:this.formDetailEdit.country.country_id,
user_id:this.formDetailEdit.user_id,user_village:this.formDetailEdit.user_village};


      try {
        const updatedetails = await ApiService.post('/user/detail/create', a).then(response => {

      
        });
     
  
        return true;
      } catch (error) {
        return false;
      }
      
    },

    setCurrentPage(page) {
      this.page = page
      this.selected = [];
      this.isAllSelected = false
    },

    sortLists(sortBy) {
    
      if (this.sortedbyASC) {
        this.posts_statff.data.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedbyASC = false;
      } else {
        this.posts_statff.data.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedbyASC = true;
      }
    },

    sortListsApp(sortBy) {
  
      if (this.sortedbyASC) {
        this.appr.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedbyASC = false;
      } else {
        this.appr.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedbyASC = true;
      }
    },

    selectentires(data_entires) {
      this.per_page = data_entires;
      this.page = 1;
    },

    selecttypes(item) {

 this.type = item
     
    },


    async selectstatus(item) {

    
     console.log(item);
    },

  
    async search() {
      this.fetchUsers();
    },

    async ResetForm() {   ////reset Form
      this.formDataregister = {
        user_prefrix: null,
        user_name: '',
        user_password: '',
        user_firstname: '',
        user_lastname: '',
        user_email: '',
        user_phone: '',
        user_type: 3,
        active:1
      };
    },

    async Zipcode() {
      const zipcode = await ApiService.post('/master_data/zipcode', this.formszipcode)
      if(zipcode.data.data){
      this.zipcode = zipcode.data.data
      }else {
        this.zipcode = []
      }
    },
    async Country() {
      const country = await ApiService.post('/master_data/contry', this.formscount)
      if(country.data.data){
this.country = country.data.data
      }else {
        this.country = []
      }
    },

   

    async UploadfileProfile() {
      let formData = new FormData();
      formData.append('files', this.imagelist);
      if (this.imagelist) {
        try {
          const data = await ApiService.upload('/media_file/upload/file', formData);
          this.formDetailEdit.user_img = data.data[0].path
          return true;
        } catch (error) {
          return false;
        }
      }
    },

    async selectLan() {
      this.lng = this.lan[this.loc]
    },
    async fetchUsersApprove() {
    await this.fetchUsersforApprove();
    await this.ManageUserApprove();
    await this.FitterUserApprove();
    
    },
    async fetchUsersforApprove() {
      const data = await ApiService.post('/user/list?user_type=3', this.formapprove).then(response => {
        this.appr = response.data.data
      });
    },
    async ManageUserApprove() {
      const user_app = [];
      if(this.appr){
        for (var i = 0; i < this.appr.length; i++) { 
          const data = await ApiService.get('/user/only/detail/'+this.appr[i].user_id).then(response => {
            if(response.status === 200){
              let obj2 = { identification_number: response.data[0].identification_number,verify_account:response.data[0].verify_account,
                user_lastname:response.data[0].user_lastname,
                user_firstname:response.data[0].user_firstname,
                user_email:response.data[0].user_email,
                user_phone:response.data[0].user_phone,
                user_id:response.data[0].user_id,
               };
              user_app.push(obj2);
            }
          });
        }
      }
      this.checkuserotp = user_app;
    },
    async FitterUserApprove() {
   const filteredHomes = this.checkuserotp.filter(x => 
    x.verify_account == 'phone_active' 
  );

  this.userapprove = filteredHomes;
    },

    async Approve(item) {
        const data = await ApiService.get('/user/only/detail/' + item).then(response => {

const a = {verify_account:'system_active',identification_number:response.data[0].identification_number,
  user_img:response.data[0].user_img,user_birthday:response.data[0].user_birthday,
  user_address:response.data[0].user_address,
  location_id:response.data[0].location_id,
  country_id:response.data[0].country_id,
  user_village:response.data[0].user_village,
  user_id:response.data[0].user_id};

  try {
    const updatedetails = ApiService.post('/user/detail/create', a).then(response => {

      //  this.pending_form = true;
      return true
    });
 

    return updatedetails;
  } catch (error) {
    return false;
  }

        })


     
    },
    async Notapprove(item) {
      const data = await ApiService.get('/user/only/detail/' + item).then(response => {
        const a = {verify_account:'system_unactive',identification_number:response.data[0].identification_number,
          user_img:response.data[0].user_img,user_birthday:response.data[0].user_birthday,
          user_address:response.data[0].user_address,
          location_id:response.data[0].location_id,
          country_id:response.data[0].country_id,
          user_village:response.data[0].user_village,
          user_id:response.data[0].user_id};
  
          try {
            const updatedetails = ApiService.post('/user/detail/create', a).then(response => {
              //  this.pending_form = true;
              return true
            });
            return updatedetails;
          } catch (error) {
            return false;
          }
                })
        
     
    },

    async fetchUsersIdDisplay(user_id) {
      try {
        const data = await ApiService.get('/user/get/' + user_id).then(response => {
          this.display_user = response.data;
        });
      } catch (error) {
        return false;
      }
    },

    async fetchUsersApprovePedding() {
      const data = await ApiService.post('/user/approve/list', this.formapprove).then(response => {
        this.appr = response.data.data

      });
      },

      async fetchUsersApprovePeddingstaff() {
        const data = await ApiService.post('/user/approvestaff/list', this.formapprove).then(response => {
          this.appr = response.data.data
      });
        },  

      async fetchUsersByOne(item) {
        this.formsearchUser.user_admin_id = this.user_id;
        this.formsearchUser.user_search_id = item;
      
  
      
        const data = await ApiService.post('/user/list/get', this.formsearchUser).then(response => {
         
     this.profile_by_one = response.data;
  
      });
    }, 
    
    async fetchUsersByOneAdminProfile(item) {
      this.formsearchUser.user_admin_id = this.user_id;
      this.formsearchUser.user_search_id = item;

  
      const data = await ApiService.post('/user/list/getone/profile', this.formsearchUser).then(response => {
        this.profile_by_one = response.data;

    });
  },  


  async fetchUsersLog(id) {
    this.formsearchUserlog.user_id = id
    this.formsearchUserlog.type = 2

    try {
      const data = await ApiService.post('/user/log/updatedata/', this.formsearchUserlog).then(response => {
        this.log_user = response.data;    
  });
      return data;
    } catch (error) {
      return false;
    }

  },
  async fetchUsersLogApporv(id) {
    this.formsearchUserlog.user_id = id
    this.formsearchUserlog.type = 1

   try {
      const data = await ApiService.post('/user/log/updatedata/', this.formsearchUserlog).then(response => {
        this.log_admin = response.data;    
      
  });
      return data;
    } catch (error) {
      return false;
    }

  },
    async fetchUsersByOneAdmin(item) {
      this.formsearchUser.user_admin_id = this.user_id;
      this.formsearchUser.user_search_id = item;

  
      const data = await ApiService.post('/user/list/getone/profile', this.formsearchUser).then(response => {

        this.formeditapeple.user_id = response.data[0].user_id
this.formeditapeple.username = response.data[0].user_name
this.formeditapeple.user_phone = response.data[0].user_phone
this.formeditapeple.full_name = response.data[0].user_full_name
this.formeditapeple.first_name = response.data[0].user_firstname
this.formeditapeple.last_name = response.data[0].user_lastname
this.formeditapeple.user_prefrix = response.data[0].user_prefrix
this.formeditapeple.identification_number = response.data[0].identification_number
this.formeditapeple.user_birthday = response.data[0].user_birthday
this.formeditapeple.expire = response.data[0].exp_date
this.formeditapeple.user_village = response.data[0].user_village
this.formeditapeple.user_address = response.data[0].user_address
this.formeditapeple.passpost_image = response.data[0].passpost_image
this.formeditapeple.real_image = response.data[0].real_image
this.formeditapeple.location_id = response.data[0].location_id
this.formeditapeple.user_type = response.data[0].user_type
this.formeditapeple.active = response.data[0].active
this.formeditapeple.verify_account = response.data[0].verify_account
this.formeditapeple.user_email = response.data[0].user_email
this.formeditapeple.user_img = response.data[0].user_img


    });
  },  

  async UpdateUsersByOneAdmin() {



    const currentDate = new Date(this.formeditapeple.user_birthday);
    
    const currentEnd = new Date(this.formeditapeple.expire);

    const birth = await this.changeFormate(currentDate)
    const exp = await this.changeFormate(currentEnd)

    this.formeditapeple.expire = exp
    this.formeditapeple.user_birthday = birth

     this.formeditapeple.user_admin = this.user_id;


    try {
      const data = await ApiService.put('/user/update/renew/'+this.formeditapeple.user_id, this.formeditapeple).then(response => {
       
        if(response.status == 200){
          return true
        }else {
          return false;
        }
        
  });
 
      return data;
    } catch (error) {
      return false;
    }


  },

    async fetchUsersByOneComment() {
      const data = await ApiService.post('/user/list/get/comment', this.formsearchUser).then(response => {
   this.comment = response.data.data;
    });
  }, 

  async UpdatePeddingByOneComment() {
  
    this.formsearchUser.approve = this.status_app;
    this.formsearchUser.comment_details = this.comment_details;
    
    const data = await ApiService.post('/user/update/approve/pedding', this.formsearchUser).then(response => {

  });

return true;
}, 

async UpdateLogDataInsert() {

  this.formlog.user_admin = this.user_id;
  this.formlog.type = 1;
  

  try {
    const data = await ApiService.post('/user/updatedata/log',this.formlog).then(response => {
    });
  return data;
  } catch (error) {
    return false;
  }

},


async UpdateUserByAdmin() {
  
  const data = await ApiService.put('/user/update/renew'+this.formeditapeple.user_id, this.formeditapeple).then(response => {
    console.log(response);
});



return true;
}, 

async UploadImage() {

  if (this.formapeple.passpost_image) {
   let formData = new FormData();
   formData.append('files', this.formapeple.passpost_image);
   try {
     const data = await ApiService.upload('/media_file/upload/file', formData);
     this.formapeple.passpost_image = data.data[0].path

     return true;
   } catch (error) {
     return false;
   }
 }

 if (this.formeditapeple.passpost_image) {
  let formData = new FormData();
  formData.append('files', this.formeditapeple.passpost_image);
  try {
    const data = await ApiService.upload('/media_file/upload/file', formData);
    this.formeditapeple.passpost_image = data.data[0].path

    return true;
  } catch (error) {
    return false;
  }
}


   },


   
   async UploadImage2() {


    if (this.formapeple.real_image) {
   
      let formDatas = new FormData();
      formDatas.append('files', this.formapeple.real_image);
      try {
        const data = await ApiService.upload('/media_file/upload/file', formDatas);
        this.formapeple.real_image = data.data[0].path
        return true;
      } catch (error) {
        return false;
      }
    }

    if (this.formeditapeple.real_image) {
   
      let formDatas = new FormData();
      formDatas.append('files', this.formeditapeple.real_image);
      try {
        const data = await ApiService.upload('/media_file/upload/file', formDatas);
        this.formeditapeple.real_image = data.data[0].path
        return true;
      } catch (error) {
        return false;
      }
    }
   
      },
      async CheckPeople() {
        try {
          const data = await ApiService.post('/user/checkuserpopulation',this.formapeple).then(response => {
            this.checkIden = response.data.checkIden
            this.checkemail = response.data.checkemail
            this.checkphone = response.data.checkphone
            this.checkusername = response.data.checkusername

   

  
          });
        } catch (error) {
          return false;
        }
        
      },

      async CheckPeopleEdit() {
        try {
          const data = await ApiService.post('/user/checkuserpopulation',this.formeditapeple).then(response => {
            this.checkIden = response.data.checkIden
            this.checkemail = response.data.checkemail
            this.checkphone = response.data.checkphone
            this.checkusername = response.data.checkusername

        

  
          });
        } catch (error) {
          return false;
        }
        
      },
      async SavePeople() {
    


        const currentDate = new Date(this.formapeple.user_birthday);
        const currentEnd = new Date(this.formapeple.expire);
        const birth = await this.changeFormate(currentDate)
        const exp = await this.changeFormate(currentEnd)

        this.formapeple.expire = exp
        this.formapeple.user_birthday = birth

       
        try {
          
          const data = await ApiService.post('/user/createuserpopulation',this.formapeple).then(response => {
    if(response.status == 200){
return true;
    }
    return data
  
          });
        } catch (error) {
          return false;
        }
      },
      async ResetFormStaff() {
        this.formapeple = {
          user_id: null,
          username: '',
          user_phone: '',
          full_name: '',
          first_name: '',
          last_name: '',
          user_prefrix: '',
          identification_number: '',
          user_birthday: '',
          expire: '',
          user_village: '',
          user_address: '',
          location_id: null,
          country_id: 33,
          passpost_image:'',
          real_image:'',
          user_password:'',
          user_email:'',
          verify_account:'system_active',
          user_type:'3',
          active:1,
      
          
        },

        this.formeditapeple = {
          user_id: null,
          username: '',
          user_phone: '',
          full_name: '',
          first_name: '',
          last_name: '',
          user_prefrix: '',
          identification_number: '',
          user_birthday: '',
          expire: '',
          user_village: '',
          user_address: '',
          location_id: null,
          country_id: 33,
          passpost_image:'',
          real_image:'',
          user_password:'',
          user_email:'',
          verify_account:'system_active',
          user_type:'3',
          active:1,
      
          
        },
        this.email ='',
        this.checkIden = false,
        this.checkemail = false,
        this.checkphone = false,
        this.checkusername = false


        
      },

      async ResetFormAdmin() {   ////reset Form
        this.formapeple = {
          user_id: null,
          username: '',
          user_phone: '',
          full_name: '',
          first_name: '',
          last_name: '',
          user_prefrix: '',
          identification_number: '',
          user_birthday: '',
          expire: '',
          user_village: '',
          user_address: '',
          location_id: null,
          country_id: null,
          passpost_image:'',
          real_image:'',
          user_password:'',
          user_email:'',
          verify_account:'system_active',
          user_type:'3',
          active:1,
      
          
        },
        this.email ='',
        this.checkIden = false,
        this.checkemail = false,
        this.checkphone = false,
        this.checkusername = false


        
      },

      async changeFormate(a) {

        if (a) {
        
          return moment(a).format("YYYY-MM-DD");
         }
      },

      async UpdateStatus() {
        this.formupdatestatus.user_admin = this.user_id
        this.formupdatestatus.user_id = this.formsearchUser.user_search_id
        this.formupdatestatus.comment_details = this.comment_details
     


             
        try {
          
          const data = await ApiService.post('/user/update/status',this.formupdatestatus).then(response => {
            
    if(response.status == 200){
return true;
    }
    return data
  
          });
        } catch (error) {
          return false;
        }

        
      },

      
      async UpdateStatusLog() {
this.formlog.user_admin = this.user_id
this.formlog.user_id = this.formsearchUser.user_search_id
this.formlog.des = 'Approve';

console.log(this.formlog);
             
        try {
          
          const data = await ApiService.post('/user/updatedata/log',this.formlog).then(response => {
            


  
          });
        } catch (error) {
          return false;
        }

        
      },


  


  },

});
