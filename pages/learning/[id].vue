<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import CoursetEdit from '@/components/course/CoursetEdit.vue'
import SelectListLesson from "@/components/course/SelectListLesson.vue";
import ListLesson from "@/components/course/ListLesson.vue";
import { useAuthStore } from '@/store/auth'
import { CourseStore } from '@/store/course'
import { LessonStore } from '@/store/lesson'
   import { useToast } from "vue-toastification";
import ApiService  from "../../services/api.service";
import { useI18n } from "vue-i18n";
import Loading from 'vue-loading-overlay';import 'vue-loading-overlay/dist/css/index.css';
import Swal from 'sweetalert2';
import { useVuelidate } from "@vuelidate/core";
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
   const router = useRouter();
    const toast = useToast();
store.formDataCourse.user_id = auth.user_id
store.formDataEditCourse.user_id = auth.user_id
store.formDatalesson.user_id = auth.user_id
store.formDataeditlesson.user_id = auth.user_id
store.user_id = auth.user_id
storelesson.item = [];
storelesson.formsearchlesson.per_page = 5
storelesson.formsearchlesson.page = 1
storelesson.formsearchlesson.search = "";
await store.fetchCourseId(router.currentRoute.value.params.id);
await store.fetchLessonInCourseId();
const lessonlist = await storelesson.fetchLessonlist();
if (lessonlist === false) {
  await toast.error("Error Data Contact Admin", {
    timeout: 30000,
  });
}


const { FormDataCourse } = storeToRefs(store);
const { FormDataEditCourse } = storeToRefs(store);
const { Images } = storeToRefs(store);
const { SaveCourse } = CourseStore();
const { UpdateCourse } = CourseStore();
const { SaveLesson } = CourseStore();
const { ResetForm } = CourseStore();
const { UploadfileCourse } = CourseStore();
const { deletelesson } = CourseStore();
const { Adlesson } = CourseStore();
const { uploadfilecourse } = CourseStore();
const { SaveLessoncluster } = CourseStore();
const { ClearLessoncluster } = CourseStore();


const rules = computed(() => {
  return {
    course_code: {
      required: helpers.withMessage(
        "The Course Code field is required",
        required
      ),
      minLength: minLength(6),
    },
    course_name: {
      required: helpers.withMessage(
        "The Course Name is required",
        required
      ),
      minLength: minLength(6),
    },
    course_cover: {
      required: helpers.withMessage(
        "Course Image is required",
        required
      ),
      minLength: minLength(6),
    },

    course_description: {
      required: helpers.withMessage(
        "The Course cover is required",
        required
      ),
      minLength: minLength(6),
    },
  };
});

const v$ = useVuelidate(rules, FormDataEditCourse);
const save = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    store.isLoaddingsave = true;
    try {
      let updatefile = await UploadfileCourse()
      let updatedata = await UpdateCourse();
      let clearlesson = await ClearLessoncluster();
      let savelesson = await SaveLessoncluster();

      if(updatedata === true){
        await setTimeout(() => {
        toast.success("ແກ້ໄຂສຳເລັດແລ້ວ");
      }, 500);
      store.isLoaddingsave = false;
      await router.push('/learning');
      }
    } catch (error) {
      await toast.error("ແກ້ໄຂບໍ່ສຳເລັດ");
    }

  }
};






const removeImage = async () => {
 
    store.formDataEditCourse.course_cover = null
  const input = document.querySelector('input[type="file"]');
  input.value = "";
};




const onFileChangeBack = async (event) => {
  var input = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag

    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formDataEditCourse.course_cover = reader.result;
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

            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">

                        <div class="widget-content widget-content-area br-8 p-3">
                         

                            <div class="row mb-4 g-3">
    <div id="form_grid_layouts" class="col-lg-9">
      <div class="seperator-header">
        <h4 class=""> {{ $t("menu_couse_p_edit_title") }} </h4>
      </div>
    </div>
    <div class="col-md-6">
      <label for="inputEmail4" class="form-label">  {{ $t("menu_couse_f_title_code") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputEmail4" v-model="store.formDataEditCourse.course_code" :class="{
        'border-red-500 focus:border-red-500': v$.course_code.$error,
        'border-[#42d392] ': !v$.course_code.$invalid,
      }" @change="v$.course_code.$touch"
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
    <div class="col-md-6">
      <label for="inputPassword4" class="form-label">  {{ $t("menu_couse_f_title_name") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputPassword4" v-model="store.formDataEditCourse.course_name" :class="{
        'border-red-500 focus:border-red-500': v$.course_name.$error,
        'border-[#42d392] ': !v$.course_name.$invalid,
      }" @change="v$.course_name.$touch" 
       maxlength="30"
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
    <div class="col-12">
      <label for="inputAddress" class="form-label">  {{ $t("menu_couse_f_title_detail") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" :class="{
        'border-red-500 focus:border-red-500': v$.course_description.$error,
        'border-[#42d392] ': !v$.course_description.$invalid,
      }" @change="v$.course_description.$touch" v-model="store.formDataEditCourse.course_description" maxlength="200">
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

    <div></div>
  </div>
                        </div>
                    </div>

                </div>

                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">

                        <div class="widget-content widget-content-area br-8 p-3">
                            <SelectListLesson></SelectListLesson>
                        </div>
                    </div>

                </div>

                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
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
</template>

<style></style>