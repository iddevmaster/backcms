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
     
 console.log('fetchUsers');
 this.posts = []

 try {
  const response = await apiClient.get('/posts');
  this.posts = response.data;
 
} catch (error) {
  this.error = error
} finally {
  this.loading = false
}

    },

  },
});

// {"__v_isShallow":false,"__v_isRef":true,"_rawValue":null,"_value":null}