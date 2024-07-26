<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { CourseStore } from "@/store/course";
import { LessonStore } from "@/store/lesson";
import { useAuthStore } from '@/store/auth';
import CourseCreate from "@/components/course/CourseCreate.vue";

import ErrorUpload from "@/components/course/ErrorUpload.vue";

import { useVuelidate } from "@vuelidate/core";
import { useToast } from "vue-toastification";
import ApiService  from "../../services/api.service";
import { useI18n } from "vue-i18n";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import Swal from 'sweetalert2';

import { ref, computed, watch, onMounted } from 'vue'


import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";




definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1],
})

const { locale, setLocale } = useI18n();

const auth = useAuthStore()
const store = CourseStore();
store.formDataCourse.user_id = auth.user_id
store.isLoading = false;
const toast = useToast();
const router = useRouter();

const storelesson = LessonStore();
const { FormDataCourse } = storeToRefs(store);
const { SaveCourse } = CourseStore();
const { UploadfileCourse } = CourseStore();
const { Savepdf } = CourseStore();
const { UploadfileCoursePdf } = CourseStore();


// fetchdata();

const rules = computed(() => {
  return {
    course_code: {
      required: helpers.withMessage(
        "The Course Code field is required",
        required
      ),
      minLength: minLength(1),
    },
    course_name_lo: {
      required: helpers.withMessage(
        "The Course Name is required",
        required
      ),
      minLength: minLength(1),
    },
    course_name_eng: {
      required: helpers.withMessage(
        "The Course Name is required",
        required
      ),
      minLength: minLength(1),
    },
     course_cover: {
      required: helpers.withMessage(
        "The  Image  field is required",
        required
      ),
      minLength: minLength(1),
    },

    course_description: {
      required: helpers.withMessage(
        "The Course Description is required",
        required
      ),
      minLength: minLength(1),
    },
    course_remark_b: {
      required: helpers.withMessage(
        "The Course Description is required",
        required
      ),
      minLength: minLength(1),
    },
  };
});

const v$ = useVuelidate(rules, FormDataCourse);




const backtoLean = async () => {
  await router.push('/learning');
}

const fileInputRef = ref(null);
const openFileInput = async () => {
  // fileInputRef.value.click();
  if (fileInputRef.value) {
    fileInputRef.value.click();

  }

}



const save = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
      Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
  });

    let uploadfile = await UploadfileCourse();
    try {
      store.isLoaddingsave = true;
      let uploadfile = await UploadfileCourse();
      let updateCourse = await SaveCourse();
     let uploadpdf = await UploadfileCoursePdf();
      let savepdf = await Savepdf();

      if(updateCourse === true){
              store.isLoaddingsave = false;
            const input = document.querySelector('input[type="file"]');
      input.value = "";
     setTimeout(() => Swal.close(), 500);
      v$.value.$reset();
        await setTimeout(() => {
        toast.success("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ");
         store.ResetForm();

        router.push('/learning');
      }, 500);

      }
      if(updateCourse === false){
        await toast.error("ຂໍ້ມູນບໍ່ໄດ້ບັນທຶກສຳເລັດ.");
      }

    } catch (error) {
      await toast.error("ຂໍ້ມູນບໍ່ໄດ້ບັນທຶກສຳເລັດ.");
    }
  } else {
    Swal.fire({
          text: "ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຄົບຖ້ວນ.!",
          icon: "error",
        });
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


function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}


const filterInputCourse = async (event) => {
  const key = event.data;
      store.formDataCourse.course_name = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};

const filterInputCourseCourse = async (event) => {
  const key = event.data;
      if (event.data === ' ') {
        store.formDataCourse.course_code = store.formDataCourse.course_code.substring(0, store.formDataCourse.course_code.length - 1);
        return;
      }
      store.formDataCourse.course_code = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};

const filterInputCourseremarkA = async (event) => {

      store.formDataCourse.course_remark_a = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};

const filterInputCourseremarkB = async (event) => {

      store.formDataCourse.course_remark_b = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};




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


  if(event.target.files.length > 0){
    for (var i = 0; i < event.target.files.length; i++) {
    
    const file = event.target.files[i];
      if (file && file.type.startsWith('application/pdf')) {
        store.selectedFiles.push(event.target.files[i])
      }else {
        
 store.selectedFilesError.push(event.target.files[i])
      }
    }
  }

  setTimeout(() => Swal.close(), 500);

  if(store.selectedFilesError.length > 0){
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


      <loading v-model:active="store.isLoading" :can-cancel="true"
                />



            
      <div class="middle-content container-xxl p-0 mb-4">
        <div class="row layout-top-spacing">
          <div class="doc-container">
            
            <div class="row">
              
              <div class="col-xl-12">
                <div class="widget-content widget-content-area br-8 p-4">
                  <div class="widget-header">                                
                                    <div class="row">
                                        <div class="col-xl-10 col-sm-12 col-10">
                                            <h4>{{ $t("menu_couse_p_title") }}</h4>
                                        </div>
                                        <div class="col-xl-2 col-sm-12 col-12" style="text-align: center;">
                                          <button type="button" class="btn btn-primary additem _effect--ripple waves-effect waves-light bt-back-mo" @click="backtoLean()">
      {{ $t("backto_lean") }}
    </button>   
   </div> 
  </div>
                                </div>
                                <br>
             
                  <div class="row">



    <div class="col-md-12 mt-3">
      <label for="inputEmail4" class="form-label"> {{ $t("menu_couse_f_title_code") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input
        type="text"
        class="form-control"
        id="inputEmail4"
        placeholder="ລະຫັດຫຼັກສູດ"
        v-model="store.formDataCourse.course_code"
        :class="{
          'border-red-500 focus:border-red-500': v$.course_code.$error,
          'border-[#42d392] ': !v$.course_code.$invalid,
        }"
        @change="v$.course_code.$touch"
        maxlength="20"
        @input="filterInputCourseCourse"
  
      />

  <div v-if="locale == 'la'" >
      <span v-if="v$.course_code.$error" class="text-xs text-red-500"
        style="color: red" >ຕ້ອງມີຊ່ອງຂໍ້ມູນລະຫັດຫຼັກສູດ</span>
  </div>

  <div v-if="locale == 'en'" >
      <span v-if="v$.course_code.$error" class="text-xs text-red-500"
        style="color: red" >The Course Code field is required</span>
  </div>

  <div v-if="locale == 'th'" >
      <span v-if="v$.course_code.$error" class="text-xs text-red-500"
        style="color: red" >ต้องระบุฟิลด์รหัสหลักสูตร</span>
  </div>

    </div>


    <div class="col-md-12 mt-3">
      <label for="inputPassword4" class="form-label">{{ $t("menu_couse_f_title_name_lo") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input
        type="text"
        class="form-control"
        id="inputPassword4"
        placeholder="ຊື່ຫຼັກສູດ"
        v-model="store.formDataCourse.course_name_lo"
        :class="{
          'border-red-500 focus:border-red-500': v$.course_name_lo.$error,
          'border-[#42d392] ': !v$.course_name_lo.$invalid,
        }"
        @change="v$.course_name_lo.$touch"
        maxlength="100"
        @input="filterInputCourse"
      />
   <div v-if="locale == 'la'" >
      <span v-if="v$.course_name_lo.$error" class="text-xs text-red-500"
        style="color: red" >ຕ້ອງມີຊ່ອງໃສ່ຊື່ຫຼັກສູດ.</span>
  </div>

  <div v-if="locale == 'en'" >
      <span v-if="v$.course_name_lo.$error" class="text-xs text-red-500"
        style="color: red" >
The Course Name field is required.</span>
  </div>

  <div v-if="locale == 'th'" >
      <span v-if="v$.course_name_lo.$error" class="text-xs text-red-500"
        style="color: red" >ต้องระบุฟิลด์ชื่อหลักสูตร</span>
  </div>
    </div>
    <div class="col-md-12 mt-3">
      <label for="inputPassword4" class="form-label">{{ $t("menu_couse_f_title_name_eng") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input
        type="text"
        class="form-control"
        id="inputPassword4"
        placeholder="ຊື່ຫຼັກສູດ"
        v-model="store.formDataCourse.course_name_eng"
        :class="{
          'border-red-500 focus:border-red-500': v$.course_name_eng.$error,
          'border-[#42d392] ': !v$.course_name_eng.$invalid,
        }"
        @change="v$.course_name_eng.$touch"
        maxlength="100"
        @input="filterInputCourse"
      />
   <div v-if="locale == 'la'" >
      <span v-if="v$.course_name_eng.$error" class="text-xs text-red-500"
        style="color: red" >ຕ້ອງມີຊ່ອງໃສ່ຊື່ຫຼັກສູດ.</span>
  </div>

  <div v-if="locale == 'en'" >
      <span v-if="v$.course_name_eng.$error" class="text-xs text-red-500"
        style="color: red" >
The Course Name field is required.</span>
  </div>

  <div v-if="locale == 'th'" >
      <span v-if="v$.course_name_eng.$error" class="text-xs text-red-500"
        style="color: red" >ต้องระบุฟิลด์ชื่อหลักสูตร</span>
  </div>

  

    </div>

    <!-- <div class="col-md-12 mt-3">
      <label for="inputPassword4" class="form-label">  {{ $t('course_title') }} </label><span class="text-xs text-red-500" style="color:red">  </span>
      <input type="text" class="form-control" id="inputPassword4"  :placeholder="$t('course_title')" v-model="store.formDataCourse.course_remark_a" @input="filterInputCourseremarkA"
      maxlength="200" 
      />
      <span v-if="v$.course_remark_a.$error" class="text-xs text-red-500"
        style="color: red" >ຕ້ອງມີຊ່ອງຂໍ້ມູນ</span>
    </div> -->

    <div class="col-md-12 mt-3">
      <label for="inputPassword4" class="form-label">  {{ $t('exam_condition') }} </label>
      <input type="text" class="form-control" id="inputPassword4"  :placeholder=" $t('exam_condition')" v-model="store.formDataCourse.course_remark_b"    @input="filterInputCourseremarkB"
         maxlength="200"   
      />
      <span v-if="v$.course_remark_b.$error" class="text-xs text-red-500"
        style="color: red" >ຕ້ອງມີຊ່ອງຂໍ້ມູນ</span>
    </div>

    <div class="col-12 mt-3">
      <label for="inputAddress" class="form-label">{{ $t("menu_couse_f_title_detail") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        placeholder="ຄຳອະທິບາຍຫຼັກສູດ"
        :class="{
          'border-red-500 focus:border-red-500': v$.course_description.$error,
          'border-[#42d392] ': !v$.course_description.$invalid,
        }"
        @change="v$.course_description.$touch"
        v-model="store.formDataCourse.course_description"
        maxlength="1000"
   
      >
      </textarea>

      <div v-if="locale == 'la'" >
      <span v-if="v$.course_description.$error" class="text-xs text-red-500"
        style="color: red" >
ລາຍລະອຽດຂອງຫຼັກສູດແມ່ນຕ້ອງການ.</span>
  </div>

  <div v-if="locale == 'en'" >
      <span v-if="v$.course_description.$error" class="text-xs text-red-500"
        style="color: red" >
        The Course Description is required.</span>
  </div>

  <div v-if="locale == 'th'" >
      <span v-if="v$.course_description.$error" class="text-xs text-red-500"
        style="color: red" >ต้องระบุฟิลด์รายละเอียด</span>
  </div>

    </div>

    <div class="form-group mb-4 mt-3">
      <label for="exampleFormControlFile1">{{ $t("menu_couse_f_title_picture") }}</label>
      <input
        type="file"
        class="form-control-file"
        id="exampleFormControlFile1"
        @change="onFileChangeBack"
        ref="fileupload"
        accept="image/png, image/jpeg" 
      />
    </div>

 <div v-if="locale == 'la'" >
      <span v-if="v$.course_cover.$error" class="text-xs text-red-500"
        style="color: red" >
        ອັບໂຫຼດຮູບ.</span>
  </div>

  <div v-if="locale == 'en'" >
      <span v-if="v$.course_cover.$error" class="text-xs text-red-500"
        style="color: red" >
        Upload photo.</span>
  </div>

  <div v-if="locale == 'th'" >
      <span v-if="v$.course_cover.$error" class="text-xs text-red-500"
        style="color: red" >อัพโหลดรูปภาพ</span>
  </div>

   
  <div class="border p-2 mt-3">
        <p>{{ $t("menu_couse_f_title_display_picture") }}:</p>
        <template v-if="store.formDataCourse.course_cover">
          <div class="row">
            <div id="image-container" class="col-md-3 col-sm-4 col-6">
              <div class="image-wrapper">
                <img  :src="coverimage(store.formDataCourse.course_cover)" class="img-fluid" />
                <button @click="removeImage()" class="delete-button"><i class="bi bi-x-lg"></i></button>
              </div>
            </div>
          </div>
        </template>
      </div>
   

    
  <br>
   
    <div class="form-group" >
  
  <input  
    type="file"
    title=" - "
    class="form-control-file"
    id="exampleFormControlFilePdf"
    @change="onFileChangeBackPdf"
    ref="fileInputRef"
    multiple
    style="display: none;"
    accept=".pdf"
  />
 

</div>

<div class="form-group p-2 mt-3" >
  <button class="btn btn-warning" @click="openFileInput">{{ $t("menu_couse_f_title_pdf") }}</button>
</div>
 

<div class="row mb-4 g-3" v-if="store.selectedFiles.length > 0">
    <div class="table-responsive">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th class="checkbox-area" scope="col">
              <div class="form-check form-check-primary">{{ $t("lesson_select_record") }}</div>
            </th>
             <th>File Name</th>
          <!-- <th>File Size</th>
          <th>Type</th> -->
 <th>Manage</th>
          </tr>
        </thead>

      
         <tbody>
          <tr v-for="(file, index) in store.selectedFiles" :key="index">
         
          <td>{{ index + 1 }}</td>
          <td>{{ file.name }}</td>
          <!-- <td>{{ formatBytes(file.size) }}</td>
          <td>{{ file.type }}</td> -->
          <td>
               <div class="action-btns">


    <a
      href="javascript:void(0);"
      class="action-btn btn-delete bs-tooltip"
      @click="remove(index)"
      data-toggle="tooltip"
      data-placement="top"
      aria-label="Delete"
      data-bs-original-title="Delete"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-trash-2"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        ></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </a>
  </div>
          </td>
          </tr>
         
         </tbody>
      </table>
    </div>
     </div>
    

    <div class="col-md-12 mt-3">
      <button type="button" class="btn btn-success" @click="save()">
      {{ $t("menu_couse_f_save") }}
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
    
     <ErrorUpload></ErrorUpload>
  </div>


</template>

<style>


#exampleFormControlFilePdf{
  opacity:0    
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
  .bt-back-mo{
  width: 100%;
}
}
</style>