<template>
 
     
 <div class="row mb-4">
  <div id="form_grid_layouts" class="col-lg-12">
                            <div class="seperator-header">
                                <h4 class="">Form Add News</h4>
                            </div>
                        </div>
   




         <div class="form-group mb-4">
                                            <label for="formGroupExampleInput">Example label</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="News Title *" v-model="store.formDataNews.news_title"
                                                 :class="{
                'border-red-500 focus:border-red-500': v$.news_title.$error,
                'border-[#42d392] ': !v$.news_title.$invalid,
              }"
              @change="v$.news_title.$touch"
              autocomplete="off">
              <span class="text-xs text-red-500" style="color:red" v-if="v$.news_title.$error">{{
            v$.news_title.$errors[0].$message
          }}</span>
                                        </div>
                                        <div class="form-group mb-4">
                                            <label for="formGroupExampleInput2">Another label</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input">
                                        </div>

                                         <div class="form-group mb-4">
                                            <label for="exampleFormControlTextarea1">Example textarea</label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"  
                                            :class="{
                'border-red-500 focus:border-red-500': v$.news_description.$error,
                'border-[#42d392] ': !v$.news_description.$invalid,
              }"
              @change="v$.news_description.$touch"
              autocomplete="off"
              v-model="store.formDataNews.news_description" ></textarea>


                                            <span class="text-xs text-red-500" style="color:red" v-if="v$.news_description.$error">{{
            v$.news_description.$errors[0].$message
          }}</span>
                                        </div>

                                        <div class="form-group mb-4 mt-3">
                                            <label for="exampleFormControlFile1">Example file input</label>
                                            <input type="file" class="form-control-file" id="exampleFormControlFile1" multiple>
                                        </div>
                                        <div>

  </div>
                                        


    </div>
   
   
    <button type="button" class="btn btn-primary" @click="save()">บันทึก</button>      
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { newTransportStore } from '@/store/newstransport'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';

const router = useRouter();
const store = newTransportStore()


const { SaveFormNews } = newTransportStore(); // use authenticateUser action from  auth store
const { getFormNews } = storeToRefs(store);


const formDataNews = reactive({
    title: store.formDataNews.title,
    news_description: store.formDataNews.news_description,
});



const rules = computed(() => {
  return {
    news_title: {
      required: helpers.withMessage('The User name field is required', required),
      minLength: minLength(6),
    },
    news_description: {
      required: helpers.withMessage('The Description is required', required),
      minLength: minLength(6),
    },

  };
});






const v$ = useVuelidate(rules, getFormNews);

const save = async () => {
    v$.value.$validate();
    if (!v$.value.$error) {
    
 await SaveFormNews(); //save form  ส่งไป Store User
 //v$.value.$reset();


  }
}

</script>