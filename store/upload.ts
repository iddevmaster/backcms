import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';
import axios from "axios";




export const UploadStore = defineStore('upload', {
  state: () => ({
    preview: null,
    image: null,
    preview_list: [],
    image_list: [],
    formi:[],
  }
     
),


  getters: {
  

  },
  
  actions: {
    SaveData(x)
    {
alert('SaveData');
    },
    Saveimages(formData)
    {

      this.formi = formData;

    //   this.formi.forEach((value,key) => {
    // console.log('xxxx',key+value)
    //  });

  //    axios.post('http://oasapi.iddriver.com/media_file/upload/file',
  //    formData, {
  //      headers: {
  //       'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
  //        'Content-Type': 'multipart/form-data'
  //      }
  //    }
  //  ).then(function (response) {
  //    console.log('SUCCESS!!',response.data);
  //    this.SaveData(response.data);

  //    const counterStorage = UploadStore();
  //           counterStorage.SaveData(response.data);


    
  //  })
  //  .catch(function () {
  //    console.log('FAILURE!!');
  //  });



    }
  




  },
});
