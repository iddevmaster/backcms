<template>
 
     
 <div class="row mb-4">
  <div id="form_grid_layouts" class="col-lg-12">
                            <div class="seperator-header">
                                <h4 class="">Form Add News</h4>
                            </div>
    </div>
        <div class="form-group mb-4">
          <label for="formGroupExampleInput">News Title</label>
          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="News Title *" v-model="store.formDataNews.news_title"
          :class="{
                'border-red-500 focus:border-red-500': v$.news_title.$error,
                'border-[#42d392] ': !v$.news_title.$invalid,
              }"
              @change="v$.news_title.$touch"
             >
              <span class="text-xs text-red-500" style="color:red" v-if="v$.news_title.$error">{{
            v$.news_title.$errors[0].$message
          }}</span>
          </div>
          <div class="form-group mb-4"> 
            <label for="exampleFormControlTextarea1">News Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
            :class="{
                'border-red-500 focus:border-red-500': v$.news_description.$error,
                'border-[#42d392] ': !v$.news_description.$invalid,
              }"
              @change="v$.news_description.$touch"
              v-model="store.formDataNews.news_description">
              </textarea>
              <span class="text-xs text-red-500" style="color:red" v-if="v$.news_description.$error">{{
            v$.news_description.$errors[0].$message
          }}</span>
          </div> 
          <div class="form-group mb-4 mt-3">
                                            <label for="exampleFormControlFile1">Example file input</label>
                                            <input type="file" class="form-control-file" id="exampleFormControlFile1" multiple @change="onFileChange" ref="fileupload">
                                        </div>
                                        <div class="border p-2 mt-3">
            <p>Preview Here:</p>
            <template v-if="storeupload.preview_list.length">
              <div class="row">
              <div class="col-3" v-for="item, index in storeupload.preview_list" :key="index">
              <img :src="item" class="img-fluid" />
               <button @click="removeImage(index)">Remove image</button>
             </div>
             </div>
              
            </template>
          </div>

                                        
                                        
                                        <div>

  </div>
                                        


    </div>
   
   
    <button type="button" class="btn btn-primary" @click="save()">บันทึก</button>      
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { newCivilStore } from '@/store/newcivil'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { UploadStore } from '@/store/upload'; // import the auth store we just created
import { AlertStore } from '@/store/alert'; // import the auth store we just created
import { ref } from "vue";
 import { useToast } from 'vue-toastification'


const toast = useToast()
const router = useRouter();
const store = newCivilStore()
const storeupload = UploadStore()
const storealert = AlertStore()



const { Clear } = AlertStore(); // use  action
const { SaveDataNew } = newCivilStore(); // use  action
const { SaveSubmitForm } = newCivilStore(); // use  action from   store
const { SaveDataNewImage } = newCivilStore(); // use  action from   store
const { getFormNews } = storeToRefs(store);
const { Saveimages } = UploadStore(); // use authenticateUser action from  auth store

store.ClearData();
storealert.Clear()

const rules = computed(() => {
  return {
    news_title: {
      required: helpers.withMessage('The News Title field is required', required),
      minLength: minLength(6),
    },
    news_description: {
      required: helpers.withMessage('The News Description is required', required),
      minLength: minLength(6),
    },

  };
});






const v$ = useVuelidate(rules, getFormNews);

const save = async () => {
    v$.value.$validate();
    if (!v$.value.$error) {
      await toast.warning("Wait Save Data", {
        timeout: 2000,
      });
    try {
    await  SaveSubmitForm(); //save form  ส่งไป Store User
    await toast.success('Save Data')
    } catch (e) {
     await toast.error('Fall Save Data')
   }
  
v$.value.$reset();

   const input = document.querySelector('input[type="file"]');
  input.value = '';

  


  //  const input = document.querySelector('input[type="file"]');
  //     input.value = '';

  }
}

const removeImage = async (remove) => {
  storeupload.preview_list.splice(remove, 1)
  storeupload.formi.splice(remove, 1)

}
const onFileChange = async (event) => {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      	for(let i = 0; i<count; i++)
	  {
		storeupload.formi.push(event.target.files[i]);
    }


      //const formData = new FormData();
      const formData = new FormData();
          for (const i of Object.keys(storeupload.formi)) {
            const aaaa = storeupload.formi[i];
            formData.append('files', storeupload.formi[i])   
           
          }
          

      if (input.files) {
        while(count --) {
          var reader = new FileReader();
          reader.onload = (e) => {
            storeupload.preview_list.push(e.target.result);
          }
          storeupload.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index ++;
        }
      }
}



</script>
<style>
 .preview{
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  height: 100px;
		  width: 100px;
		}

</style>
