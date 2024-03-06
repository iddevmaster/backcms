<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { CourseStore } from "@/store/course";
import { LessonStore } from "@/store/lesson";
import { useAuthStore } from '@/store/auth';
import CourseCreate from "@/components/course/CourseCreate.vue";
import ListLesson from "@/components/course/ListLesson.vue";
import SelectListLesson from "@/components/course/SelectListLesson.vue";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from "vue-toastification";
import ApiService  from "../../services/api.service";
import { useI18n } from "vue-i18n";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import Swal from 'sweetalert2';

import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { onMounted } from 'vue'

definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2],
})
const { locale, setLocale } = useI18n();

const auth = useAuthStore()
const store = CourseStore();



const storelesson = LessonStore();
const { FormDataCourse } = storeToRefs(store);
const { SaveCourse } = CourseStore();
const { SaveLessoncluster } = CourseStore();
const { SaveLesson } = CourseStore();
const { ResetForm } = CourseStore();
const { UploadfileCourse } = CourseStore();
const { deletelesson } = CourseStore();
const { Adlesson } = CourseStore();
const { uploadfilecourse } = CourseStore();

store.formDataCourse.user_id = auth.user_id
store.formDataEditCourse.user_id = auth.user_id
store.formDatalesson.user_id = auth.user_id
store.formDataeditlesson.user_id = auth.user_id
store.user_id = auth.user_id
storelesson.item = [];
store.ResetForm()

const { Pending } = storeToRefs(store); //Get Getter


store.isLoading = true;
const toast = useToast();
const router = useRouter();
storelesson.formcreatelesson.user_id = auth.user_id
storelesson.user_id = auth.user_id


storelesson.formsearchlesson.per_page = 5
storelesson.formsearchlesson.page = 1
storelesson.formsearchlesson.search = "";

storelesson.formselect.per_page = 5
storelesson.formselect.page = 1
storelesson.formselect.total_page = 0;

storelesson.selectlesson_form_menu_course.page = 1;
storelesson.selectlesson_form_menu_course.per_page = 5;
storelesson.selectlesson_form_menu_course.search = "";

const grouplist = await storelesson.fetchGrouplist();


 onMounted(async()  => {
      // Fetch items when the component is mounted
      
      const lessonlist = await storelesson.fetchLessonlist();
     await storelesson.paginatedItemsCourse();

    store.isLoading = false;
    })
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
    course_name: {
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
  };
});

const v$ = useVuelidate(rules, FormDataCourse);




const backtoLean = async () => {
  await router.push('/learning');
}

const fetchdata = async () => {
console.log('data');
}
const save = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    try {
      store.isLoaddingsave = true;
      let uploadfile = await UploadfileCourse();
      let updateCourse = await SaveCourse();

      console.log(updateCourse);
      let savelesson = await SaveLessoncluster();
      
  
      if(updateCourse === true){
              store.isLoaddingsave = false;
            const input = document.querySelector('input[type="file"]');
      input.value = "";
     
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


function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}


const onFileChangeBack = async (event) => {
  var input = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag
   
    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formDataCourse.course_cover = reader.result;
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
                                        <div class="col-xl-10 col-md-10 col-sm-10 col-10">
                                            <h4>{{ $t("menu_couse_p_title") }}</h4>
                                        </div>
                                        <div class="col-xl-2 col-md-2 col-sm-12 col-2" style="text-align: center;">
                                          <button type="button" class="btn btn-primary additem _effect--ripple waves-effect waves-light" @click="backtoLean()">
      {{ $t("backto_lean") }}
    </button>   
   </div> 
  </div>
                                </div>
                                <br>
                  <!-- <CourseCreate></CourseCreate> -->
                  <div class="row">
    <!-- <div id="form_grid_layouts" class="col-lg-9">
      <div class="seperator-header">
        <h3 class="">{{ $t("menu_couse_p_title") }}</h3>
      </div>
    </div>

    <div id="form_grid_layouts" class="col-lg-3">
      <div class="seperator-header">
        <h3 class="">{{ $t("menu_couse_p_title") }}</h3>
      </div>
    </div> -->


    <div class="col-md-12">
      <label for="inputEmail4" class="form-label"> {{ $t("menu_couse_f_title_code") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input
        type="text"
        class="form-control"
        id="inputEmail4"
        placeholder="ລະຫັດສື່​ການ​ຮຽນ​ຮູ້"
        v-model="store.formDataCourse.course_code"
        :class="{
          'border-red-500 focus:border-red-500': v$.course_code.$error,
          'border-[#42d392] ': !v$.course_code.$invalid,
        }"
        @change="v$.course_code.$touch"
        maxlength="20"
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
    <div class="col-md-12">
      <label for="inputPassword4" class="form-label">{{ $t("menu_couse_f_title_name") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input
        type="text"
        class="form-control"
        id="inputPassword4"
        placeholder="ສື່​ການ​ຮຽນ​ຮູ້​"
        v-model="store.formDataCourse.course_name"
        :class="{
          'border-red-500 focus:border-red-500': v$.course_name.$error,
          'border-[#42d392] ': !v$.course_name.$invalid,
        }"
        @change="v$.course_name.$touch"
        maxlength="150"
      />
   <div v-if="locale == 'la'" >
      <span v-if="v$.course_name.$error" class="text-xs text-red-500"
        style="color: red" >ຕ້ອງມີຊ່ອງໃສ່ຊື່ຫຼັກສູດ.</span>
  </div>

  <div v-if="locale == 'en'" >
      <span v-if="v$.course_name.$error" class="text-xs text-red-500"
        style="color: red" >
The Course Name field is required.</span>
  </div>

  <div v-if="locale == 'th'" >
      <span v-if="v$.course_name.$error" class="text-xs text-red-500"
        style="color: red" >ต้องระบุฟิลด์ชื่อหลักสูตร</span>
  </div>

  

    </div>
    <div class="col-12 mt-3">
      <label for="inputAddress" class="form-label">{{ $t("menu_couse_f_title_detail") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        placeholder="ລາຍລະອຽດສື່​ການ​ຮຽນ​ຮູ້"
        :class="{
          'border-red-500 focus:border-red-500': v$.course_description.$error,
          'border-[#42d392] ': !v$.course_description.$invalid,
        }"
        @change="v$.course_description.$touch"
        v-model="store.formDataCourse.course_description"
        maxlength="500"
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

    <div class="col-12 ">
      <div class="border rounded p-2">
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
    </div>

    <div>

    </div>
  </div>
                </div>
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-xl-12">
                <div class="widget-content widget-content-area br-8 p-4">
                  <SelectListLesson></SelectListLesson>
                </div>
              </div>
            </div>
<br>
            <div class="row">
              <div class="col-xl-12">
                <div class="widget-content widget-content-area br-8 p-4">
                  <ListLesson></ListLesson>
                </div>
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-xl-12">
                <button type="button" class="btn btn-success" @click="save()">
      {{ $t("menu_couse_f_save") }}
    </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>


</template>

<style>

.loader {
  width: 50px;
  aspect-ratio: 1;
  background-color: #8d847f;
  border-radius: 50%;
  animation: l4 3s infinite;
}
@keyframes l4 {
  12.5% {background-image:radial-gradient(80% 65% at left, #0000 94%,#fff9)}
  25%   {background-image:linear-gradient(90deg,#0000 50%,#fff9 0)}
  37.5% {background-image:radial-gradient(80% 65% at right,#fff9 94%,#0000)}
  50%   {background-image:linear-gradient(#fff9 0 0)}
  62.5% {background-image:radial-gradient(80% 65% at left, #fff9 94%,#0000)}
  75%   {background-image:linear-gradient(-90deg,#0000 50%,#fff9 0)}
  87.5% {background-image:radial-gradient(80% 65% at right,#0000 94%,#fff9)}
}
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio (change this value as per your video's aspect ratio) */
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}


.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
}
#image-container img{
  width: 250px;
  height: 250px;
  object-fit: cover;
}
#image-container .delete-button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border: none;
  padding: 2.5px 5px;
  cursor: pointer;
}
#image-container .image-wrapper {
  position: relative;
  display: inline-block;
  margin: 10px;
  border: 1px solid;
}
#image-container {
  width: fit-content;
  min-width: 200px;
  min-height: 200px;
  max-width: 300px;
  max-height: 300px;
}

</style>