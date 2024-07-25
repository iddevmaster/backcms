<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import CoursetEdit from '@/components/course/CoursetEdit.vue'

import ErrorUpload from "@/components/course/ErrorUpload.vue";
import { useAuthStore } from '@/store/auth'
import { CourseStore } from '@/store/course'
import { LessonStore } from '@/store/lesson'
   import { useToast } from "vue-toastification";
import ApiService  from "../../../services/api.service";
import { useI18n } from "vue-i18n";
import Loading from 'vue-loading-overlay';import 'vue-loading-overlay/dist/css/index.css';
import Swal from 'sweetalert2';
import { useVuelidate } from "@vuelidate/core";
import { onMounted } from 'vue'
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
const { locale, setLocale } = useI18n();
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2],
})

const auth = useAuthStore()
const store = CourseStore()

const storelesson = LessonStore()
store.isLoading = true;
   const router = useRouter();
    const toast = useToast();
    
store.formDataEditCourse.user_id = auth.user_id
store.user_id = auth.user_id


await store.fetchCourseId(router.currentRoute.value.params.id);




onMounted(async()  => {
    store.isLoading = false;
    })



const { FormDataCourse } = storeToRefs(store);
const { FormDataEditCourse } = storeToRefs(store);
const { Images } = storeToRefs(store);
const { SaveCourse } = CourseStore();
const { UpdateCourse } = CourseStore();

const { UploadfileCourse } = CourseStore();


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

const v$ = useVuelidate(rules, FormDataEditCourse);
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
    store.isLoaddingsave = true;
    try {
      let updatefile = await UploadfileCourse()
      let updatedata = await UpdateCourse();
      if(updatedata === true){
         setTimeout(() => Swal.close(), 500);
        await setTimeout(() => {
        toast.success("ແກ້ໄຂສຳເລັດແລ້ວ");
      }, 500);
   
      await router.push('/learning');
      }
      if(updatedata === false){
         setTimeout(() => Swal.close(), 500);
        await setTimeout(() => {
           toast.error("ແກ້ໄຂບໍ່ສຳເລັດ");
      }, 500);
      store.isLoaddingsave = false;
      await router.push('/learning');
      }
    } catch (error) {
      await toast.error("ແກ້ໄຂບໍ່ສຳເລັດ");
    }

  } else {
    Swal.fire({
          text: "ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຄົບຖ້ວນ.!",
          icon: "error",
        });
  }
};



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

const filterInputCourse_lo = async (event) => {
  const key = event.data;
      store.formDataEditCourse.course_name_lo = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};

const filterInputCourse_eng = async (event) => {
  const key = event.data;
      store.formDataEditCourse.course_name_eng = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};

const filterInputCourseCourse = async (event) => {
  const key = event.data;
      if (event.data === ' ') {
        store.formDataEditCourse.course_code = store.formDataEditCourse.course_code.substring(0, store.formDataEditCourse.course_code.length - 1);
        return;
      }
      store.formDataEditCourse.course_code = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};

const filterInputCourseremarkA = async (event) => {

store.formDataEditCourse.course_remark_a = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};

const filterInputCourseremarkB = async (event) => {

store.formDataEditCourse.course_remark_b = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};




const removeImage = async () => {
 
    store.formDataEditCourse.course_cover = null
  const input = document.querySelector('input[type="file"]');
  input.value = "";
};


const onFileChangeBackPdf = async (event) => {
  var input = event.target;
          Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
  });

  if(event.target.files.length > 0){
    for (var i = 0; i < event.target.files.length; i++) {
    const file = event.target.files[i];
      if (file && file.type.startsWith('application/pdf')) {
   store.selectedFiles.push(event.target.files[i])


      }else {
        
 store.selectedFilesError.push(event.target.files[i])
      }
    }

await store.UploadfileCoursePdfEdit();
 input.value = "";
await store.Savepdf();
await store.fetchGetPdf(router.currentRoute.value.params.id);


  }

    setTimeout(() => Swal.close(), 500);

  if(store.selectedFilesError.length > 0){
    store.openModalError = true;
  }
  


};



const onFileChangeBack = async (event) => {

  
  var input = event.target;
  const file = event.target.files[0];
  const idxDot = file.name.lastIndexOf(".") + 1;
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
const extFile = file.name.substr(idxDot, file.name.length).toLowerCase();

                    Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
  });

if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            //TO DO
 
            const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formDataEditCourse.course_cover = reader.result;
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

 setTimeout(() => Swal.close(), 500);

};


const remove = async (e,id) => {
 store.selectedEditFiles.splice(e, 1); // Remove the file at the specified index
 store.selectedFiles.splice(e, 1); // Remove the file at the specified index
 store.deletepdf(id);
};



function coverimage(i) {
   
  let result = i.slice(0, 6);
  if (result === 'static') {
    let im =  ApiService.image(i);
    return im;
  } else {
 
    return i;
  }
}

</script>

<template>
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">{{ $t("menu_couse") }}  </a></li>
                        <li class="breadcrumb-item active" aria-current="page"> {{ $t("menu_couse_edit") }}</li>
                    </ol>
                </nav>
            </div>
            <loading v-model:active="store.isLoading" :can-cancel="true"
                />
            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">

                        <div class="widget-content widget-content-area br-8 p-3">
                         
                          <div class="widget-header">                                
                                    <div class="row">
                                        <div class="col-xl-10 col-sm-12 col-10">
                                            <h4>{{ $t("menu_couse_e_title") }}</h4>
                                        </div>
                                        <div class="col-xl-2 col-sm-12 col-12" style="text-align: center;">
                                          <button type="button" class="btn btn-primary additem _effect--ripple waves-effect waves-light bt-back-mo" @click="backtoLean()">
      {{ $t("backto_lean") }}
    </button>   
   </div> 
  </div>
                                </div>

                             
                            <div class="row mb-4 g-3">
 
    <div class="col-md-12 mt-3">
      <label for="inputEmail4" class="form-label">  {{ $t("menu_couse_f_title_code") }} </label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputEmail4" v-model="store.formDataEditCourse.course_code" :class="{
        'border-red-500 focus:border-red-500': v$.course_code.$error,
        'border-[#42d392] ': !v$.course_code.$invalid,
      }" @change="v$.course_code.$touch"
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
      <label for="inputPassword4" class="form-label">  {{ $t("menu_couse_f_title_name_lo") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputPassword4" v-model="store.formDataEditCourse.course_name_lo" :class="{
        'border-red-500 focus:border-red-500': v$.course_name_lo.$error,
        'border-[#42d392] ': !v$.course_name_lo.$invalid,
      }" @change="v$.course_name_lo.$touch" 
         maxlength="128"
         @input="filterInputCourse_lo"
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
      <label for="inputPassword4" class="form-label">  {{ $t("menu_couse_f_title_name_eng") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputPassword4" v-model="store.formDataEditCourse.course_name_eng" :class="{
        'border-red-500 focus:border-red-500': v$.course_name_eng.$error,
        'border-[#42d392] ': !v$.course_name_eng.$invalid,
      }" @change="v$.course_name_eng.$touch" 
         maxlength="128"
         @input="filterInputCourse_eng"
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
      <label for="inputPassword4" class="form-label">  {{ $t('course_title') }}  </label><span class="text-xs text-red-500" style="color:red">  </span> 
      <input type="text" class="form-control" id="inputPassword4"  placeholder="ຊື່ຫຼັກສູດ" v-model="store.formDataEditCourse.course_remark_a"   @input="filterInputCourseremarkA"
      maxlength="200" 
      />
      <span v-if="v$.course_remark_a.$error" class="text-xs text-red-500"
        style="color: red" >ຕ້ອງມີຊ່ອງຂໍ້ມູນ</span>
    </div> -->

    <div class="col-md-12 mt-3">
      <label for="inputPassword4" class="form-label">  {{ $t('exam_condition') }}   </label>
      <input type="text" class="form-control" id="inputPassword4"  placeholder="ເງືອນໄຂສອບເສັງທິດສະດີ" v-model="store.formDataEditCourse.course_remark_b" @input="filterInputCourseremarkB"
         maxlength="200"   
      />
      <span v-if="v$.course_remark_b.$error" class="text-xs text-red-500"
        style="color: red" >ຕ້ອງມີຊ່ອງຂໍ້ມູນ</span>
    </div>
    <div class="col-12">
      <label for="inputAddress" class="form-label">  {{ $t("menu_couse_f_title_detail") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" :class="{
        'border-red-500 focus:border-red-500': v$.course_description.$error,
        'border-[#42d392] ': !v$.course_description.$invalid,
      }" @change="v$.course_description.$touch" v-model="store.formDataEditCourse.course_description"
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
      <label for="exampleFormControlFile1">  {{ $t("menu_couse_f_title_picture") }}</label>
      <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChangeBack" ref="fileupload" />
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
      <p>  {{ $t("menu_couse_f_title_display_picture") }}:</p>
     <template v-if="store.formDataEditCourse.course_cover">
        <div class="row">
          <div id="image-container" class="col-md-3 col-sm-4 col-6" >
            <div class="image-wrapper">
              <img :src="coverimage(store.formDataEditCourse.course_cover)" class="img-fluid" />
              <button @click="removeImage()" class="delete-button"><i class="bi bi-x-lg"></i></button>
            </div>
          </div>
        </div>
      </template>
    </div>


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

    <div class="form-group" >
      <button class="btn btn-warning" @click="openFileInput">{{ $t("menu_couse_f_title_pdf") }}</button>
    </div>
  
   
     <div class="row mb-4 g-3" v-if="store.selectedEditFiles.length > 0">
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
          <tr v-for="(file, index) in store.selectedEditFiles" :key="index">
         
          <td>{{ index + 1 }}</td>
          <td>{{ file.cd_name }}</td>
          <!-- <td>{{ formatBytes(file.size) }}</td>
          <td>{{ file.type }}</td> -->
          <td>
               <div class="action-btns">


    <a
      href="javascript:void(0);"
      class="action-btn btn-delete bs-tooltip"
      @click="remove(index,file.id)"
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

    <div></div>
  </div>
                        </div>
                    </div>

                </div>
                <!-- <div class="row layout-top-spacing">
                         <div class="row">
              <div class="col-xl-12">
                <div class="widget-content widget-content-area br-8 p-4">
                  <ConditionEditListLesson></ConditionEditListLesson>
                </div>
              </div>
            </div>
          </div> -->
                <!-- <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">

                        <div class="widget-content widget-content-area br-8 p-3">
                            <SelectListLesson></SelectListLesson>
                        </div>
                    </div>

                </div> -->

                <!-- <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <ListLesson></ListLesson>
                        </div>
                    </div>
                </div> -->
                <br>


            </div>
       
        </div>
        <!-- <ConditionCreateEdit></ConditionCreateEdit>
        <ConditionEditEdit></ConditionEditEdit> -->
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