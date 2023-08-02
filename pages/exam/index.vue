


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



const toast = useToast()
const store = ExamStore()
const { GetopenModal } = storeToRefs(store); //Get Getter
const { GetopenModalCreate } = storeToRefs(store); //Get Getter
const { OpenFormInser } = ExamStore();//Action
const { SaveExam } = ExamStore();//Action
const { UploadfileExam } = ExamStore();//Action
const { FormExam } = storeToRefs(store);
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
const save = async () => {

  v$.value.$validate();
  
    if (!v$.value.$error) {
          await removeImage();
    let uploadfile = await UploadfileExam();  
    let save = await SaveExam();
   
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


</script>

<template>

  <div id="content" class="main-content">
            <div class="layout-px-spacing">
              <div class="page-meta">
                        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Exam </a></li>
                                <li class="breadcrumb-item active" aria-current="page">Exam List</li>
                            </ol>
                        </nav>
                    </div>
      

            <div class="middle-content container-xxl p-0">
              
                    <div class="row layout-top-spacing">
                      
                        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                          
                            <div class="widget-content widget-content-area br-8 p-3">
                              <div class="widget-header">
                                    <div class="row">
                                        <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                          <button class="btn btn-primary mb-2 me-4" @click="OpenFormInsert()">เพิ่มหลักสูตร</button>
                                        </div>                 
                                    </div>
                                </div>
                              <ExamList></ExamList>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

    
            <div v-if="GetopenModal" class="modal">
<div class="modal-content" id="deleteConformationLabel">
                                <div class="modal-header">
                                    <div class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </div>
                                    <h5 class="modal-title" id="exampleModalLabel">Delete the task?</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p class="">If you delete the task it will be gone forever. Are you sure you want to proceed?</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn" data-bs-dismiss="modal"  @click="closeModal">Cancel</button>
                                    <button type="button" class="btn btn-danger" data-remove="task">Delete</button>
                                </div>
                            </div>
  </div>

  <div v-if="GetopenModalCreate" class="modal">

<div class="modal-content modal-dialog modal-xl" id="deleteConformationLabel">
                                <div class="modal-header">
                                
                                    <h5 class="modal-title" id="exampleModalLabel">Create Exam</h5>
                                  
                                </div>
                                <div class="modal-body">
        <form>
          
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Exam code:</label>
            <input type="text" class="form-control" id="recipient-name" v-model="store.formexam.em_code">
          </div>
          <span class="text-xs text-red-500" style="color:red" v-if="v$.em_code.$error">{{
            v$.em_code.$errors[0].$message
          }}</span>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Exam name:</label>
            <input type="text" class="form-control" id="recipient-name" v-model="store.formexam.em_name">
          </div>
          <span class="text-xs text-red-500" style="color:red" v-if="v$.em_name.$error">{{
            v$.em_name.$errors[0].$message
          }}</span>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Exam Description:</label>
            <input type="text" class="form-control" id="recipient-name"  v-model="store.formexam.em_description">
          </div>
          <span class="text-xs text-red-500" style="color:red" v-if="v$.em_description.$error">{{
            v$.em_description.$errors[0].$message
          }}</span>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Exam Random:</label>
            <input type="number" class="form-control" id="recipient-name" v-model="store.formexam.em_random_amount" min="50">
          </div>
          <span class="text-xs text-red-500" style="color:red" v-if="v$.em_random_amount.$error">{{
            v$.em_random_amount.$errors[0].$message
          }}</span>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Exam Time</label>
            <input type="time" class="form-control" id="recipient-name" v-model="store.formexam.em_time"   pattern="[0-9]*" 
 data-date-format="HH:mm:ss" step="1"
            >
          </div>
          <span class="text-xs text-red-500" style="color:red" v-if="v$.em_time.$error">{{
            v$.em_time.$errors[0].$message
          }}</span>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Exam cover:</label>
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

<style>







</style>