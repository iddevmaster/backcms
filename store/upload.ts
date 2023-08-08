import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';
import axios from "axios";




export const UploadStore = defineStore('upload', {
  state: () => ({
    preview: null,
    image: null,
    preview_list: [],
    samefile:[],
    image_list: [],
    formi:[],
    preview_list_same:[],
    data_list_image:[],
    data_list_image_same:[]
  }
     
),


  getters: {
  

  },
  
  actions: {
    SaveData(x)
    {
alert('SaveData');
    },
    Viewimage(a)
    {
     
 

      const x = a.split(',');
  

      if(x.length > 0){
        for (var i = 0; i < x.length; i++) {
    
     this.preview_list.push(x[i]);
        }
    }

   

    

    },
    imagedisplay(data)  {
 
      this.preview_list = [];
      this.data_list_image = [];
      this.samefile = [];
      if(data.length > 0){
        for (var i = 0; i < data.length; i++) {
          this.preview_list.push(data[i].ni_path_file);
          let obj2 = { ni_name_file: data[i].ni_name_file, ni_path_file: data[i].ni_path_file,ni_id: data[i].ni_id,news_id:data[i].news_id };
          this.data_list_image.push(obj2);
          this.data_list_image_same.push(obj2);
       
        }
    }
    this.preview_list_same = this.preview_list;

    },
    Saveimages(formData)
    {

     
 


    }
  
    // try {
    //   const data = await ApiService.upload('/media_file/upload/file',formData);
    //   this.path = data.data[0].path
    //   return true;
    //   } catch (error) {
    //     return false;
    //   } 



  },
});
