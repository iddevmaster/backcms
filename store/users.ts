import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';




export const usersStore = defineStore('users', {
  state: () => ({
    locale:true,
    load:true,
    posts:[],
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
      // this.desserts.filter((item) => item.id !== x )
      // console.log(this.desserts);

      const index = this.posts.products.findIndex(item => item.id === x)
      if (index !== -1) {
        this.posts.products.splice(index, 1)
      }

      console.log(this.posts.products);
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
    

  },
});

// {"__v_isShallow":false,"__v_isRef":true,"_rawValue":null,"_value":null}