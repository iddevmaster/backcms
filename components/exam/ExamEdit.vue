<template>
 
     
  <div v-if="GetopenModalEdit" class="modal">
 
 <div class="modal-content modal-dialog modal-xl" id="deleteConformationLabel">
                                 <div class="modal-header">
                                 
                                     <h5 class="modal-title" id="exampleModalLabel">{{ $t("menu_exam_all_bt_edit_exam") }}</h5>
                                   
                                 </div>
                                 <div class="modal-body">
         <form>
           
           <div class="mb-3">
             <label for="recipient-name" class="col-form-label">{{ $t("menu_exam_all_code") }}:</label>  <span class="text-xs text-red-500" style="color:red" v-if="v$.em_code.$error">{{
             v$.em_code.$errors[0].$message
           }}</span>
             <input type="text" class="form-control" id="recipient-name" v-model="store.formexamedit.em_code">
           </div>
          
           <div class="mb-3">
             <label for="message-text" class="col-form-label">{{ $t("menu_exam_all_name") }}::</label> <span class="text-xs text-red-500" style="color:red" v-if="v$.em_name.$error">{{
             v$.em_name.$errors[0].$message
           }}</span>
             <input type="text" class="form-control" id="recipient-name" v-model="store.formexamedit.em_name">
           </div>
          
           <div class="mb-3">
             <label for="message-text" class="col-form-label">{{ $t("menu_exam_all_detail") }}:</label>  <span class="text-xs text-red-500" style="color:red" v-if="v$.em_description.$error">{{
             v$.em_description.$errors[0].$message
           }}</span>
             <input type="text" class="form-control" id="recipient-name"  v-model="store.formexamedit.em_description">
           </div>
          
           <div class="mb-3">
             <label for="message-text" class="col-form-label">{{ $t("menu_exam_all_total_random") }}:</label> <span class="text-xs text-red-500" style="color:red" v-if="v$.em_random_amount.$error">{{
             v$.em_random_amount.$errors[0].$message
           }}</span>
             <input type="number" class="form-control" id="recipient-name" v-model="store.formexamedit.em_random_amount" min="50">
           </div>
           
           <div class="mb-3">
             <label for="message-text" class="col-form-label">{{ $t("menu_exam_all_time_test") }}</label>  <span class="text-xs text-red-500" style="color:red" v-if="v$.em_time.$error">{{
             v$.em_time.$errors[0].$message
           }}</span>
             <VueDatePicker v-model="store.formexamedit.em_time" time-picker  enable-seconds  placeholder="Select Time" />
           </div>


           
             <div class="mb-3">
            <label for="message-text" class="col-form-label">DTL</label>  
              <div class="col-sm-12">
  
    <select class="form-control" v-if="store.dtl" v-model="store.formexamedit.dlt_code">
       
    <option   v-for="(item, index) in store.dtl" :key="item.dlt_code" :value="item.dlt_code" >
      
          <span v-if="locale == 'la'" >{{item.dlt_description_loas}}</span>
      <span v-if="locale == 'en'" >{{item.dlt_description_english}}</span>
      <span v-if="locale == 'th'" >{{item.dlt_description}}</span>
      
      </option>
    </select>
   
    </div>
          
          </div>
         
          
  
           <div class="mb-3">
             <label for="message-text" class="col-form-label">{{ $t("menu_exam_all_pic") }}:</label><span class="text-xs text-red-500" style="color:red" v-if="store.imageReq == true"> Invalid file selected</span>
              <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChange" ref="fileupload">
           </div>
            <div class="border p-2 mt-3">
             <p>{{ $t("menu_exam_display_p") }}:</p>

             <template v-if="store.image">
               <div class="row">
               <div class="col-3">
               <img  :src="coverimage(store.image)"  class="img-fluid" />
               <button @click="removeImage()">{{ $t("menu_exam_display_del") }}</button>
             </div>
              </div>
             </template>   
           </div>
         </form>
       </div>
       <div class="modal-footer">
                 <button class="btn btn btn-light-dark" data-bs-dismiss="modal"  @click="closeModal">
                   <i class="flaticon-cancel-12"></i> {{ $t("menu_exam_modal_close") }}</button>
                 <button type="button" class="btn btn-primary" @click="Updatedata()">{{ $t("menu_exam_modal_save") }}</button>
             </div>
                            
           
           
           </div>
   </div>
 
 
                    
     
 </template>
 
 
 
 
 <script setup lang="ts">

import { storeToRefs } from 'pinia';
 import { defineComponent } from 'vue';
 import { ExamStore } from '@/store/exam'
 import { useToast } from 'vue-toastification';
 import { useVuelidate } from '@vuelidate/core';
 import { required, email, sameAs, minLength, helpers, } from '@vuelidate/validators';
 import VueDatePicker from '@vuepic/vue-datepicker';
 import '@vuepic/vue-datepicker/dist/main.css'
 import { ref } from 'vue';
 import ApiService  from "../../services/api.service";
 import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();
 
 
 const toast = useToast()
 const store = ExamStore()

 const { GetopenModalEdit } = storeToRefs(store); //Get Getter
 const { OpenFormInser } = ExamStore();//Action
 const { UpdateExam } = ExamStore();//Action
 const { UploadfileExam } = ExamStore();//Action
 const { FormExamEdit } = storeToRefs(store);
 const { ResetForm } = ExamStore();//Action
 

 
 const loginPattern = helpers.regex('alpha', /^(?:[01]\d|2[0-3]):[0-5]\d$/);
 
 
 
 
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
       minLength: minLength(1),
     },
     em_name: {
       required: helpers.withMessage('Exam Name field is required', required),
       minLength: minLength(1),
     },
     em_description: {
       required: helpers.withMessage('Exam Description field is required', required),
       minLength: minLength(1),
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
 const v$ = useVuelidate(rules, FormExamEdit);
 const Updatedata = async () => {
  if(!store.image){/////////////////// req image  ใช้ rules ไม่ได้ 
store.imageReq = true;
return false;
}
   v$.value.$validate();
     if (!v$.value.$error) {
 await store.UploadfileExam()
 await store.UpdateExam()
 await toast.success('Save Data')
 await store.fetchExamlist();
 
     }
  };
 
 
 
 
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
 
 const removeImage = async () => {
 
 store.image = null;
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

function coverimage(i) {
  let result = i.slice(0, 6);
if (result === 'static') {
  let im =  ApiService.image(i);
  return im;
}else {
  return i;
}
 }

 
 
 </script>
 
 