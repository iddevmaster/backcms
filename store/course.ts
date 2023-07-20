import { defineStore } from 'pinia';
import ApiService from '../services/api.service';



export const CourseStore = defineStore('course', {
  state: () => ({
courselist:[],
formsearchcourse: {
  page: 1,
  per_page: 20,
  search: '',
},
  }
     
),


  getters: {
    Courselist(state) {
      return state.courselist;
    },

  },
  
  actions: {



  async fetchCourslist() {
 


    console.log(this.formsearchcourse);
    try {
      const data = await ApiService.post('/course/list', this.formsearchcourse).then(response => {
     
       this.courselist = response.data.data
       console.log(this.courselist);
        // this.total_page = response.data.total_page
        // this.limit_page = response.data.limit_page
        // this.current_page = response.data.current_page
        // this.total_filter = response.data.total_filter
        // this.total = response.data.total
       
      });

    } catch (error) {
      console.log('error');
      return false;
    } finally {
      this.loading = false
      this.pending = false
    }
  },



  },
});
