import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';




export const usersStore = defineStore('users', {
  state: () => ({
    locale:true,
    load:true,
    posts:[],
    selected: [],
    checkboxes: [], // Array to store checkbox values
    isAllSelected: false,
    count: 0,
    desserts: [
      {
        id: 1,
        name: '518',
        position: "System Architect",
        salary: "$320,800",
        start_date: "2011/04/25",
        office: 'Edinburgh',
        extn: 518,
      },
      {
        id: 2,
        name: '2',
        position: "System Architect",
        salary: "$320,800",
        start_date: "2011/04/25",
        office: 'Edinburgh',
        extn: 518,
      },
    ],
  }
),


  getters: {
    data(state) {
      console.log(state.desserts)
      return state.desserts;
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
      // useFetch from nuxt 3
 this.posts = []

 try {
  const response = await apiClient.get('/products');
  this.posts = response.data;
  console.log(this.posts);
 
} catch (error) {
  this.error = error
} finally {
  this.loading = false
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
        this.posts.products.forEach((value, index) => {
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
    }
    


  },
});

// {"__v_isShallow":false,"__v_isRef":true,"_rawValue":null,"_value":null}