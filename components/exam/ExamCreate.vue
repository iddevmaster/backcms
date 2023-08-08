<template>
 
     
 <div v-if="GetopenModalCreate" class="modal">

<div class="modal-content modal-dialog modal-xl" id="deleteConformationLabel">
                                <div class="modal-header">                 
                                    <h5 class="modal-title" id="exampleModalLabel">Create Exam </h5>
                                </div>
                                <div class="modal-body">
        <form>
        {{store.formexam}}
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Exam code:</label>  <span class="text-xs text-red-500" style="color:red" v-if="v$.em_code.$error">{{
            v$.em_code.$errors[0].$message
          }}</span>
            <input type="text" class="form-control" id="recipient-name" v-model="store.formexam.em_code">
          </div>
         
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Exam name:</label> <span class="text-xs text-red-500" style="color:red" v-if="v$.em_name.$error">{{
            v$.em_name.$errors[0].$message
          }}</span>
            <input type="text" class="form-control" id="recipient-name" v-model="store.formexam.em_name">
          </div>
         
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Exam Description:</label>  <span class="text-xs text-red-500" style="color:red" v-if="v$.em_description.$error">{{
            v$.em_description.$errors[0].$message
          }}</span>
            <input type="text" class="form-control" id="recipient-name"  v-model="store.formexam.em_description">
          </div>
         
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Exam Random:</label> <span class="text-xs text-red-500" style="color:red" v-if="v$.em_random_amount.$error">{{
            v$.em_random_amount.$errors[0].$message
          }}</span>
            <input type="number" class="form-control" id="recipient-name" v-model="store.formexam.em_random_amount" min="50">
          </div>
          
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Exam Time</label>  <span class="text-xs text-red-500" style="color:red" v-if="v$.em_time.$error">{{
            v$.em_time.$errors[0].$message
          }}</span>
            <VueDatePicker v-model="store.formexam.em_time" time-picker  enable-seconds  placeholder="Select Time" />
          </div>
         
 
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Exam cover:</label> <span class="text-xs text-red-500" style="color:red" v-if="store.imageReq == true">error</span>
             <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChange" ref="fileupload">
          </div>
                                                  <div class="border p-2 mt-3">
            <p>Preview Here:{{store.image}}</p>

            <template v-if="store.image">
              <div class="row">
              <div class="col-3">
              <img :src="store.image" class="img-fluid" />
              <button @click="removeImage()">Remove image</button>
            </div>
             </div>
            </template>
          </div>
        </form>
      </div>
      <div class="modal-footer">
                <button class="btn btn btn-light-dark" data-bs-dismiss="modal"  @click="closeModal">
                  <i class="flaticon-cancel-12"></i> Cancel</button>
                <button type="button" class="btn btn-primary" @click="save()">Save</button>
            </div>
                           
          
          
          </div>
  </div>


                   
    
</template>




<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { ExamStore } from '@/store/exam'
import ExamList from '@/components/exam/ExamList.vue'
import { useToast } from 'vue-toastification';
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers, } from '@vuelidate/validators';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';




const toast = useToast()
const store = ExamStore()
const { GetopenModal } = storeToRefs(store); //Get Getter
const { GetopenModalCreate } = storeToRefs(store); //Get Getter
const { OpenFormInser } = ExamStore();//Action
const { SaveExam } = ExamStore();//Action
const { UploadfileExam } = ExamStore();//Action
const { FormExam } = storeToRefs(store);
const { ResetForm } = ExamStore();//Action


const OpenFormInsert = async () => {
await store.OpenFormInser()
 };

const closeModal = async () => {
await store.closeModal()
 };


 const rules = computed(() => {
  return {
    em_code: {
      required: helpers.withMessage('Exam code field is required', required),
      minLength: minLength(6),
    },
    em_name: {
      required: helpers.withMessage('Exam Name field is required', required),
      minLength: minLength(6),
    },
    em_description: {
      required: helpers.withMessage('Exam Description field is required', required),
      minLength: minLength(6),
    },
    em_random_amount: {
      required: helpers.withMessage('Exam Amount field is required', required),
      minLength: minLength(1),
    },
    em_time: {
      pattern: /^(2[0-3]|[0-1]?[\d]):[0-5][\d]:[0-5][\d]$/,
      required: helpers.withMessage('em_time', required),
    },
   
  };
});
const v$ = useVuelidate(rules, FormExam);
const save = async () => {///////////// บันทึก
if(!store.image){/////////////////// req image  ใช้ rules ไม่ได้ 
store.imageReq = true;
return false;
}
  v$.value.$validate();  ///////////ดัก req
    if (!v$.value.$error) {
    await removeImage();
    let uploadfile = await UploadfileExam();   ///////////upload รูป
    let save = await SaveExam();  ///////////save 
    await store.fetchExamlist();
       if(save === false){
         await toast.error('Fall Save Data')
      }else {
      await toast.success('Save Data')
      await ResetForm();
      v$.value.$reset();
    
      }

    }
 };




 const onFileChange = async (event) => {
  var input = event.target;
      if (input.files) {
        store.imageReq = false;
        var reader = new FileReader();
        reader.onload = (e) => {
          store.image = e.target.result;
        }
        store.imagelist=input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
}

const removeImage = async () => {
store.image = null;
store.imageReq = false;
const input = document.querySelector('input[type="file"]');
  input.value = '';
}



    const formatTime = async () => {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      
      if (store.formexam.em_time && !timeRegex.test(store.formexam.em_time)) {
        // If the entered time doesn't match the format, clear the input
      //  this.time = '';
      }

 };


</script>

