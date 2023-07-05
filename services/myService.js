import axios from 'axios';
import apiClient from '~/services/api.service';

export default {
    async fetchData() {
    //   try {
    //     const data = await fetch('https://jsonplaceholder.typicode.com/postsxx').then((response) => response.json()) ;
    //     return data;  
    //   } catch (error) {
    //     throw error;
    //   } finally {
    //     console.log('finally');
    //     this.loading = false
    //   }
      try {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json()) 

        const response = await apiClient.get('/posts');
        this.posts = response.data;
        // this.posts = await myService.fetchData();
        // data.error = error;
        // console.log(data);
        return data;  
      } catch (error) {
    
        this.error = error
        return this.error;
      } 
    },
  };