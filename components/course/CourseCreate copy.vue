<template>
 
     
 <div class="row mb-4 g-3">
  <div id="form_grid_layouts" class="col-lg-12">
                            <div class="seperator-header">
                                <h4 class="">Form Add News</h4>
                            </div>
    </div>
    <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Course code</label>
        <input type="text" class="form-control" id="inputEmail4" v-model="store.formDataCourse.course_code"
        :class="{
                'border-red-500 focus:border-red-500': v$.course_code.$error,
                'border-[#42d392] ': !v$.course_code.$invalid,
              }"
              @change="v$.course_code.$touch"
        >
        <span class="text-xs text-red-500" style="color:red" v-if="v$.course_code.$error">{{
            v$.course_code.$errors[0].$message
          }}</span>
    </div>
    <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Course Name</label>
        <input type="text" class="form-control" id="inputPassword4" v-model="store.formDataCourse.course_name"
        :class="{
                'border-red-500 focus:border-red-500': v$.course_name.$error,
                'border-[#42d392] ': !v$.course_name.$invalid,
              }"
              @change="v$.course_name.$touch"
             
        >
        <span class="text-xs text-red-500" style="color:red" v-if="v$.course_name.$error">{{
            v$.course_name.$errors[0].$message
          }}</span>
    </div>
    <div class="col-12">
        <label for="inputAddress" class="form-label">Course Description</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
            :class="{
                'border-red-500 focus:border-red-500': v$.course_description.$error,
                'border-[#42d392] ': !v$.course_description.$invalid,
              }"
              @change="v$.course_description.$touch"
              v-model="store.formDataCourse.course_description">
              </textarea>
              <span class="text-xs text-red-500" style="color:red" v-if="v$.course_description.$error">{{
            v$.course_description.$errors[0].$message
          }}</span>
    </div>
    
   
          <div class="form-group mb-4 mt-3">
                                            <label for="exampleFormControlFile1">Example file input</label>
                                            <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChange" ref="fileupload">
                                        </div>
                                        <div class="border p-2 mt-3">
            <p>Preview Here:</p>

            <template v-if="store.image">
              <div class="row">
              <div class="col-3">
              <img :src="store.image" class="img-fluid" />
              <button @click="removeImage()">Remove image</button>
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
import { CourseStore } from '@/store/course'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useToast } from 'vue-toastification'


const toast = useToast()
const router = useRouter();
const store = CourseStore()




// const { Clear } = AlertStore(); // use  action
const { FormDataCourse } = storeToRefs(store);
const { Images } = storeToRefs(store);
const { SaveCourse } = CourseStore(); 
const { ResetForm } = CourseStore(); 
const { UploadfileCourse } = CourseStore(); 


// store.ClearData();
// storealert.Clear()

const rules = computed(() => {
  return {
    course_code: {
      required: helpers.withMessage('The News Title field is required', required),
      minLength: minLength(6),
    },
    course_name: {
      required: helpers.withMessage('The News Description is required', required),
      minLength: minLength(6),
    },
  
    course_description: {
      required: helpers.withMessage('The News Description is required', required),
      minLength: minLength(6),
    },
  

  };
});






const v$ = useVuelidate(rules, FormDataCourse);

const save = async () => {
  

    v$.value.$validate();
    if (!v$.value.$error) {
    let uploadfile = await UploadfileCourse();    
      if(uploadfile === false){
        await toast.error('Fall Save Data')
      }else {
        let save = await SaveCourse();
        await toast.success('Save Data')
        await ResetForm();
        const input = document.querySelector('input[type="file"]');
        input.value = '';
        v$.value.$reset();
        
      }
  }
}

const removeImage = async () => {

store.image = null;
const input = document.querySelector('input[type="file"]');
  input.value = '';
}
const onFileChange = async (event) => {
  var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          store.image = e.target.result;
        }
        store.imagelist=input.files[0];
        reader.readAsDataURL(input.files[0]);
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
