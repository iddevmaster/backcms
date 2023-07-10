import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';




export const usersStore = defineStore('users', {
  state: () => ({
    locale:true,
    load:true,
    posts:{},
    pending:false,
    selected: [],
    checkboxes: [], // Array to store checkbox values
    isAllSelected: false,
    count: 0,
    formDataregister:{
      user_name: null,
      user_password: null,
      user_firstname: null,
      user_lastname: null,
      user_email: null,
      user_phone:null,
      user_type: 3,
    }
  }
     
),


  getters: {
    data(state) {
   
    },
    getForm(state){
      return state.formDataregister;
    },
    Pending(state){
      return state.pending;
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
    async fetchUsers() {

 try {
  this.pending = true
  const { pending , error, data } = await useFetch('/user/list?user_type=3', {
    method: 'post',
    baseURL:useEnvStore().apidev,
    headers: new Headers({
      'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
      'Content-Type': 'application/json'
  }), 
  body: {
    "page" : 1,
    "per_page" : 3,
    "search" :""
},
  });



  if (data.value.data) {
    this.posts = data.value
  }
  
 
} catch (error) {
  this.error = error
} finally {
  this.loading = false
  this.pending = false
}
    },

    async deleteItem(x) {
      const index = this.posts.products.findIndex(item => item.id === x)
      if (index !== -1) {
        this.posts.products.splice(index, 1)
      }
     // this.posts = this.items.filter((item) => item.id !== itemId)
    //  console.log(this.posts.products.filter((item) => item.id !== x ));
     // this.posts = this.posts.products.filter(post => post.id !== x);

      // try {
      //   this.posts = this.posts.filter(posts => console.log(posts.id) !== x);
      //  console.log(this.posts);
      // } catch (error) {
       
      // } finally {
       
      // }
      
    },
    async selectall() {

      this.selected = [];
  
      if (!this.isAllSelected) {
        this.posts.data.forEach((value, index) => {
          console.log(value);
          this.selected.push(value);
      });
      
      }

      this.isAllSelected = !this.isAllSelected;


      
    },

    async selectone(x) {

    
      const index = this.selected.indexOf(x);

      if (index !== -1) {
        console.log('if');
        this.selected.splice(index, 1); // Remove value if already present
      } else {
        console.log('else');
        this.selected.push(x); // Add value if not present
      }
    },

    cance() {
      this.isAllSelected = false;
    },
    async SaveForm(){
      try {
        this.pending = true
        const { error, data } = await useFetch('/user/create', {
          method: 'post',
          baseURL:useEnvStore().apidev,
          headers: new Headers({
            'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
            'Content-Type': 'application/json'
        }), 
        body:this.formDataregister,
        });
      
       
      } catch (error) {
       
      } finally {
        this.pending = false;
      }
this.formDataregister = {
  user_name:'',
  user_password:'',
  user_firstname:'',
  user_lastname:'',
  user_email:'',
  user_phone:'',
  user_type:3,
};

    }
    



  },
});

// {"__v_isShallow":false,"__v_isRef":true,"_rawValue":null,"_value":null}