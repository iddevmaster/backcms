<template>
  <div class="row mb-4 g-3">
    <!-- <div id="form_grid_layouts" class="col-lg-2">
      <div class="seperator-header">
        <h4 class="">แก้ไข้ข้อสอบ</h4>
      </div>
    </div> -->
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">หลักสูตร : {{ name  }}</h4>
      </div>
    </div>
    <div id="form_grid_layouts" class="col-lg-2">
      <div class="seperator-header" style="text-align: center;"  @click="backToquestion()">
        <button class="btn btn-primary additem _effect--ripple waves-effect waves-light">{{ $t("menu_exam_back") }}</button>
      </div>
    </div>
    <div class="col-md-12">
      <label for="inputEmail4" class="form-label">{{ $t("menu_exam_proposition") }}</label>
      <input type="text" class="form-control" id="inputEmail4" v-model="store.formEditExamq.eq_name" :class="{
        'border-red-500 focus:border-red-500': v$.eq_name.$error,
        'border-[#42d392] ': !v$.eq_name.$invalid,
      }" @change="v$.eq_name.$touch">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.eq_name.$error">{{
        v$.eq_name.$errors[0].$message
      }}</span>
    </div>
    <div class="col-md-12">
      <label for="inputPassword4" class="form-label">{{ $t("menu_exam_answer") }}</label>
      <input type="text" class="form-control" id="inputPassword4" v-model="store.formEditExamq.eq_answer" :class="{
        'border-red-500 focus:border-red-500': v$.eq_answer.$error,
        'border-[#42d392] ': !v$.eq_answer.$invalid,
      }" @change="v$.eq_answer.$touch" min="1"    @keypress="validatePNumber($event)" minlength="1" maxlength="1">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.eq_answer.$error">{{
        v$.eq_answer.$errors[0].$message
      }}</span>
    </div>

    <div class="form-group mb-4 mt-3">
      <label for="exampleFormControlFile1">{{ $t("menu_exam_picture") }}</label> <span class="text-xs text-red-500" style="color:red" v-if="store.imageReq == true"> Invalid file selected</span>
      <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChange" ref="fileupload">
    </div>
    <div class="border p-2 mt-3">
      <p>{{ $t("menu_exam_dis_image") }}</p>
      <template v-if="store.image">
        <div class="row">
          <div class="col-3">
            <img  :src="coverimage(store.image)" class="img-fluid" />
            <button @click="removeImage()">{{ $t("menu_exam_display_del") }}</button>
          </div>
        </div>
      </template>
    </div>
    <div>
    </div>
  </div>


  <button class="btn btn-dark additem _effect--ripple waves-effect waves-light" @click="addChoice()">{{ $t("menu_exam_add_answer") }}</button>
  <div class="invoice-detail-items">
    <div class="table-responsive">
      <table class="table item-table">
        <thead>
          <tr>
            <th class="">{{ $t("menu_exam_index") }}</th>
            <th>{{ $t("menu_exam_content") }}</th>
            <th class="">{{ $t("menu_exam_picture") }}</th>
          </tr>
          <tr aria-hidden="true" class="mt-3 d-block table-row-hidden"></tr>
        </thead>
       
        <tbody>
       
          <tr v-for="(item, index) in store.choicelist" :key="index">
    
            <td class="delete-item-row">
              <ul class="table-controls">
                <li><a href="javascript:void(0);" @click="removeChoice(item.id)" class="delete-item"
                    data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"><svg
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-x-circle">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg></a></li>
              </ul>
            </td>
            <td class="description">
              <input type="text" class="form-control form-control-sm" placeholder="Item Description"
                v-model="item.ec_name">
            </td>
            <td class="rate">
              <input type="file" id="input" @change="handleFiles($event, index)">
              <div class="video-container">
                <img :src="image(item.ec_image)" class="img-fluid" width="40" height="40" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="col-xl-12 col-md-12">
    <button type="button" class="btn btn-success" @click="save()">{{ $t("menu_exam_save") }}</button>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { ExamquestionStore } from '@/store/examquestion'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers, maxLength } from '@vuelidate/validators';
import { useToast } from 'vue-toastification'


const toast = useToast()
const router = useRouter();
const store = ExamquestionStore()
const { FormEditExamq } = storeToRefs(store);
const { UpdateExa } = ExamquestionStore();//Action
const { AdChoice } = ExamquestionStore();//Action
const { deleteChoice } = ExamquestionStore();//Action
const { UploadfileExamq } = ExamquestionStore();//Action
const { uploadfileexam } = ExamquestionStore();//Action
const { ResetForm } = ExamquestionStore();//Action
const { ClearLocal } = ExamquestionStore();//Action


let em_id = localStorage.getItem('em_id');
let name = localStorage.getItem('em_name');




await store.edit();



const rules = computed(() => {
  return {
    eq_name: {
      required: helpers.withMessage('The Question field is required', required),
      minLength: minLength(1),
    },
    eq_answer: {
      required: helpers.withMessage('The Answer is required', required),
      minLength: maxLength(1),
    },
  };
});






const validatePNumber = async (evt) => {

  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const keyPressed: string = evt.key;
    if (!keysAllowed.includes(keyPressed)) {
           evt.preventDefault()
    }
  }

const backToquestion = async () => {
  router.go(-1);
}  

const v$ = useVuelidate(rules, FormEditExamq);
const save = async () => {
  v$.value.$validate();
// if(!store.image){/////////////////// req image  ใช้ rules ไม่ได้ 
// store.imageReq = true;
// return false;
// }
  if (!v$.value.$error) {
   // let upload = await UploadfileExamq();
    try {
      let save = await UpdateExa();  ///////////save 
      let clear = await ClearLocal();  ///////////save 
      if(save == true){
      toast.success('Save Data')
      }
      setTimeout(() => {
      router.go(-1);
    }, 500);
  
    } catch (error) {
      toast.error('Fail Save Data')
    }

  }
}

const addChoice = async () => {
  await AdChoice();
}
const removeChoice = async (x) => {
  await deleteChoice(x);
}
const removeImage = async () => {

  store.image = null;
  const input = document.querySelector('input[type="file"]');
  input.value = '';
}

const onFileChange = async (event) => {
  var input = event.target;
  store.imageReq = false;
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e) => {
      store.image = e.target.result;
    }
    store.imagelist = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
}

const handleFiles = async (event,x) => {

  let formData = new FormData();
  formData.append('files', event.target.files[0]);
 const image = await uploadfileexam(formData);
const index = store.choicelist;
  index[x].ec_image = image.data[0].path;
}


function image(i) {
  var x = null;
  if (i) {
    const usingSplit = i.split(",");
    var x = usingSplit[0];
  } else {
    var x = "static/upload/2023/8/files-BuxyK5Sy7I.png";
  }
  return "http://oasapi.iddriver.com/media_file/file/?f=" + x;
}

function coverimage(i) {
let result = i.slice(0, 6);
if (result === 'static') {
  return "http://oasapi.iddriver.com/media_file/file/?f="+i;
}else {
  return i;
}
 }

</script>
<style>
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
}


.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 10.25%;
  /* 16:9 aspect ratio (change this value as per your video's aspect ratio) */
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
