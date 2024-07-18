<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { ExamStore } from "@/store/exam";

import { useAuthStore } from '@/store/auth';




import { useVuelidate } from "@vuelidate/core";
import { useToast } from "vue-toastification";
import ApiService from "../../../services/api.service";
import { useI18n } from "vue-i18n";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import Swal from 'sweetalert2';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, computed, watch, onMounted } from 'vue'


import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";




definePageMeta({
  middleware: ['auth', 'roles'],
  allowedRoles: [1, 2],
})

const { locale, setLocale } = useI18n();

const auth = useAuthStore()
const store = ExamStore();

store.isLoading = false;
const toast = useToast();
const router = useRouter();

await store.fetchExamId(router.currentRoute.value.params.id);
store.formexam.user_id = auth.user_id;

const { FormExam } = storeToRefs(store);





// fetchdata();

const rules = computed(() => {
  return {
    em_code: {
      required: helpers.withMessage('Exam code field is required', required),
      minLength: minLength(1),
    },
    em_name_eng: {
      required: helpers.withMessage('Exam Name field is required', required),
      minLength: minLength(1),
    },
    em_name_lo: {
      required: helpers.withMessage('Exam Name field is required', required),
      minLength: minLength(1),
    },
    em_description: {
      required: helpers.withMessage('Exam Description field is required', required),
      minLength: minLength(1),
    },
    em_random_amount: {
      required: helpers.withMessage('ສອບເສັງແບບສຸ່ມ ຕ້ອງມີຢ່າງໜ້ອຍ 1 ຕົວອັກສອນ', required),
      minLength: minLength(1),
    },
    
    em_time: {
      pattern: /^(2[0-3]|[0-1]?[\d]):[0-5][\d]:[0-5][\d]$/,
      required: helpers.withMessage('ໃສ່ເວລາທີ່ຖືກຕ້ອງ', required),
    },
    em_measure: {
      required: helpers.withMessage('ຄະແນນທີ່ຄາດໄວ້ ຕ້ອງມີຢ່າງໜ້ອຍ 1 ຕົວອັກສອນ', required),
      minLength: minLength(1),
    },
  };
});

const v$ = useVuelidate(rules, FormExam);




const backtoLean = async () => {
  await router.push('/learning/view/'+router.currentRoute.value.params.id);
  // /learning/view/13
}

const fileInputRef = ref(null);
const openFileInput = async () => {
  // fileInputRef.value.click();
  if (fileInputRef.value) {
    fileInputRef.value.click();

  }

}


const onFileChange = async (event) => {

Swal.fire({
allowEscapeKey: false,
allowOutsideClick: false,
didOpen: () => {
Swal.showLoading()
},
});
var input = event.target;
const file = event.target.files[0];

if (file && file.type.startsWith('image/')) {
// Use FileReader to read the selected image and set it as the source for the <img> tag
store.imageReq = false;
const reader = new FileReader();
reader.onload = () => {
//  this.imageUrl = reader.result;
store.formexam.em_cover = reader.result;
};
store.imagelist = input.files[0];
reader.readAsDataURL(file);
} else {
// Reset the image URL if the selected file is not an image
//   this.imageUrl = null;
const input = document.querySelector('input[type="file"]');
input.value = "";
Swal.fire({
text: 'Upload File Image Only!',
icon: 'error',
});
}
setTimeout(() => Swal.close(), 500);
};


const save = async () => {
  v$.value.$validate();



  if (!v$.value.$error) {
await store.UploadfileExam();   ///////////upload รูป
let save = await store.SaveExamNewFormate(router.currentRoute.value.params.id);
console.log(save);

//await router.push('/learning/view/'+router.currentRoute.value.params.id);
// /learning/view/13
   
  }

};

const removeImage = async () => {
  store.formDataCourse.course_cover = null
  const input = document.querySelector('input[type="file"]');
  input.value = "";
};

const remove = async (e) => {
  store.selectedFiles.splice(e, 1); // Remove the file at the specified index
};


const onInputmeasure = async (event) => {
 if (event.data === ' ') {
        store.formexam.em_measure = store.formexam.em_measure.substring(0, store.formexam.em_measure.length - 1);
        return;
      }
      if (store.formexam.em_measure.charAt(0) == '0') {
        store.formexam.em_measure = "";
        return;
      } 
  store.formexam.em_measure = event.target.value.replace(/\D/g, "");
}

const filterInputCode = async (event) => {
 
      store.formexam.em_code = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};

const filterInputName = async (event) => {
 
      store.formexam.em_name = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};
const filterInputDes = async (event) => {
 
      store.formexam.em_description = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};




function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}






function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}



const onFileChangeBack = async (event) => {
  var input = event.target;
  const file = event.target.files[0];
  const idxDot = file.name.lastIndexOf(".") + 1;
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const extFile = file.name.substr(idxDot, file.name.length).toLowerCase();

  if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
    //TO DO
    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formDataCourse.course_cover = reader.result;
    };
    store.imagelist = input.files[0];
    reader.readAsDataURL(file);
  } else {

    const input = document.querySelector('input[type="file"]');
    input.value = "";
    Swal.fire({
      text: 'Upload File Image PNG JPG!',
      icon: 'error',
    });
  }

};


const onFileChangeBackPdf = async (event) => {

  Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
  });
  var input = event.target;


  if (event.target.files.length > 0) {
    for (var i = 0; i < event.target.files.length; i++) {

      const file = event.target.files[i];
      if (file && file.type.startsWith('application/pdf')) {
        store.selectedFiles.push(event.target.files[i])
      } else {

        store.selectedFilesError.push(event.target.files[i])
      }
    }
  }

  setTimeout(() => Swal.close(), 500);

  if (store.selectedFilesError.length > 0) {
    store.openModalError = true;
  }



};




</script>

<template>

  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">{{ $t("menu_couse") }} </a></li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ $t("menu_couse_p_title") }}
            </li>
          </ol>
        </nav>
      </div>


      <loading v-model:active="store.isLoading" :can-cancel="true" />




      <div class="middle-content container-xxl p-0 mb-4">
        <div class="row layout-top-spacing">
          <div class="doc-container">

            <div class="row">

              <div class="col-xl-12">
                <div class="widget-content widget-content-area br-8 p-4">
                  <div class="widget-header">
                    <div class="row">
                      <div class="col-xl-10 col-sm-12 col-10">
                        <h4>
                          {{ store.status_exam == "insert" ?  $t("menu_couse_p_title") :  $t("menu_couse_p_title_update") }}
                        </h4>
                      </div>
                      <div class="col-xl-2 col-sm-12 col-12" style="text-align: center;">
                        <button type="button"
                          class="btn btn-primary additem _effect--ripple waves-effect waves-light bt-back-mo"
                          @click="backtoLean()">
                          {{ $t("backto_lean") }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <br>

                  <div class="row">

                    <div class="col-xl-4 col-md-4 mt-3">
                      <label for="inputEmail4" class="form-label">{{ $t("menu_exam_all_code") }}:</label><span
                        class="text-xs text-red-500" style="color:red"> * </span>
                      <input type="text" class="form-control" id="inputEmail4" placeholder="Em Code"
                        v-model="store.formexam.em_code" :class="{
              'border-red-500 focus:border-red-500': v$.em_code.$error,
              'border-[#42d392] ': !v$.em_code.$invalid,
            }" @change="v$.em_code.$touch" maxlength="20"  @input="filterInputCode"/>

                      <div v-if="locale == 'la'">
                        <span v-if="v$.em_code.$error" class="text-xs text-red-500"
                          style="color: red">ຕ້ອງມີຊ່ອງຂໍ້ມູນລະຫັດຫຼັກສູດ</span>
                      </div>

                      <div v-if="locale == 'en'">
                        <span v-if="v$.em_code.$error" class="text-xs text-red-500" style="color: red">The Course Code
                          field is required</span>
                      </div>

                      <div v-if="locale == 'th'">
                        <span v-if="v$.em_code.$error" class="text-xs text-red-500"
                          style="color: red">ต้องระบุฟิลด์รหัสหลักสูตร</span>
                      </div>

                    </div>


                    <div class="col-xl-8 col-md-8 mt-3">
                      <label for="inputEmail4" class="form-label">{{ $t("menu_exam_all_code") }}:</label><span
                        class="text-xs text-red-500" style="color:red"> * </span>
              
{{ store.formexam.dlt_code }}
                        <select class="form-control" v-if="store.dlt" v-model="store.formexam.dlt_code">

<option v-for="(item, index) in store.dlt" :key="item.dlt_code" :value="item.dlt_code">

  <span v-if="locale == 'la'">{{ item.dlt_name_lo }}</span>
  <span v-if="locale == 'en'">{{ item.dlt_name_eng }}</span>

</option>
</select>


                    </div>


                    <div class="col-md-12 mt-3">
                      <label for="inputPassword4" class="form-label">{{ $t("menu_exam_all_name") }}:</label><span
                        class="text-xs text-red-500" style="color:red"> * </span>
                      <input type="text" class="form-control" id="inputPassword4" placeholder="Em name Loa"
                        v-model="store.formexam.em_name_lo" :class="{
              'border-red-500 focus:border-red-500': v$.em_name_lo.$error,
              'border-[#42d392] ': !v$.em_name_lo.$invalid,
            }" @change="v$.em_name_lo.$touch" maxlength="100"  @input="filterInputName" />
                      <div v-if="locale == 'la'">
                        <span v-if="v$.em_name_lo.$error" class="text-xs text-red-500"
                          style="color: red">ຕ້ອງມີຊ່ອງໃສ່ຊື່ຫຼັກສູດ.</span>
                      </div>

                      <div v-if="locale == 'en'">
                        <span v-if="v$.em_name_lo.$error" class="text-xs text-red-500" style="color: red">
                          The Course Name field is required.</span>
                      </div>

                  
                    </div>
                    <div class="col-md-12 mt-3">
                      <label for="inputPassword4" class="form-label">{{ $t("menu_exam_all_name") }}:</label><span class="text-xs text-red-500" style="color:red"> * </span>
                      <input type="text" class="form-control" id="inputPassword4" placeholder="ຊື່ຫຼັກສູດ"
                        v-model="store.formexam.em_name_eng" :class="{
              'border-red-500 focus:border-red-500': v$.em_name_eng.$error,
              'border-[#42d392] ': !v$.em_name_eng.$invalid,
            }" @change="v$.em_name_eng.$touch" maxlength="100"  @input="filterInputName" />
                      <div v-if="locale == 'la'">
                        <span v-if="v$.em_name_eng.$error" class="text-xs text-red-500"
                          style="color: red">ຕ້ອງມີຊ່ອງໃສ່ຊື່ຫຼັກສູດ.</span>
                      </div>

                      <div v-if="locale == 'en'">
                        <span v-if="v$.em_name_eng.$error" class="text-xs text-red-500" style="color: red">
                          The Course Name field is required.</span>
                      </div>

                   
                    </div>
                    <div class="col-12 mt-3">
                      <label for="inputAddress" class="form-label">{{ $t("menu_exam_all_detail") }}:</label><span
                        class="text-xs text-red-500" style="color:red"> * </span>
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                        placeholder="ຄຳອະທິບາຍຫຼັກສູດ" :class="{
              'border-red-500 focus:border-red-500': v$.em_description.$error,
              'border-[#42d392] ': !v$.em_description.$invalid,
            }" @change="v$.em_description.$touch" v-model="store.formexam.em_description" maxlength="1000"  @input="filterInputDes">
      </textarea>

      <div v-if="locale == 'la'">
              <span v-if="v$.em_description.$error" class="text-xs text-red-500" style="color: red">
                ຕ້ອງມີຊ່ອງລາຍລະອຽດການສອບເສັງ.</span>
            </div>

            <div v-if="locale == 'en'">
              <span v-if="v$.em_description.$error" class="text-xs text-red-500" style="color: red">
                The Exam Description field is required.</span>
            </div>
                    </div>

                    <div class="col-md-12 mt-3">
                      <label for="inputPassword4" class="form-label">{{ $t("menu_exam_all_time_test") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
                      <VueDatePicker v-model="store.formexam.em_time" time-picker enable-seconds placeholder="Select Time"   @input="onInputmeasure"/>
                      <div v-if="locale == 'la'">
                        <span v-if="v$.em_time.$error" class="text-xs text-red-500"
                          style="color: red">ຕ້ອງມີຊ່ອງໃສ່ຊື່ຫຼັກສູດ.</span>
                      </div>

                      <div v-if="locale == 'en'">
                        <span v-if="v$.em_time.$error" class="text-xs text-red-500" style="color: red">
                          The Course Name field is required.</span>
                      </div>

                   
                    </div>


                    <div class="col-md-12 mt-3">
                      <label for="inputPassword4" class="form-label">{{ $t("menu_exam_all_total_pass") }}:</label><span class="text-xs text-red-500" style="color:red"> * </span>
                      <input type="text" class="form-control" id="inputPassword4" placeholder="ຊື່ຫຼັກສູດ"
                        v-model="store.formexam.em_measure" :class="{
              'border-red-500 focus:border-red-500': v$.em_measure.$error,
              'border-[#42d392] ': !v$.em_measure.$invalid,
            }" @change="v$.em_measure.$touch" maxlength="100" />
                      <div v-if="locale == 'la'">
                        <span v-if="v$.em_measure.$error" class="text-xs text-red-500"
                          style="color: red">ຕ້ອງມີຊ່ອງໃສ່ຊື່ຫຼັກສູດ.</span>
                      </div>

                      <div v-if="locale == 'en'">
                        <span v-if="v$.em_measure.$error" class="text-xs text-red-500" style="color: red">
                          The Course Name field is required.</span>
                      </div>

                   
                    </div>

                    <div class="form-group mb-4 mt-3">
                      <label for="exampleFormControlFile1">{{ $t("menu_couse_f_title_picture") }}</label>
                      <input type="file" class="form-control-file" id="exampleFormControlFile1"
                       ref="fileupload" accept="image/png, image/jpeg" @change="onFileChange" />
                    </div>


                    <div class="border p-2 mt-3">
                      <p>{{ $t("menu_couse_f_title_display_picture") }}:</p>
                      <template v-if="store.formexam.em_cover">
                        <div class="row">
                          <div id="image-container" class="col-md-3 col-sm-4 col-6">
                            <div class="image-wrapper">
                              <img :src="coverimage(store.formexam.em_cover)" class="img-fluid" />
                              <button @click="removeImage()" class="delete-button"><i class="bi bi-x-lg"></i></button>
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>



                    <br>

                    <div class="form-group">
                      <input type="file" title=" - " class="form-control-file" id="exampleFormControlFilePdf"
                        @change="onFileChangeBackPdf" ref="fileInputRef" multiple style="display: none;"
                        accept=".pdf" />
                    </div>




                    <div class="col-md-12 mt-3">
                      <button type="button" class="btn btn-success" @click="save()">
                        {{ $t("menu_exam_modal_save") }}
                      </button>

                    </div>


                  </div>
                </div>
              </div>
            </div>
            <br>


          </div>
        </div>
      </div>
    </div>


  </div>


</template>

<style>
#exampleFormControlFilePdf {
  opacity: 0
}



.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}

@media (min-width: 400px) {
  .bt-back-mo {
    width: 100%;
  }
}
</style>