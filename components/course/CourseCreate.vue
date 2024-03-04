<template>

<loading v-model:active="store.isLoaddingsave" :can-cancel="true" 
                />
  <div class="row mb-4 g-3">
    <div id="form_grid_layouts" class="col-lg-9">
      <div class="seperator-header">
        <h4 class="">{{ $t("menu_couse_p_title") }}</h4>
      </div>
    </div>
  
    <div class="col-md-6">
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
    <div class="col-md-6">
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
        maxlength="200"
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

    <div>

    </div>
  </div>


  


  <div class="col-xl-12 col-md-12">
    <button type="button" class="btn btn-success" @click="save()">
      {{ $t("menu_couse_f_save") }}
    </button>
  </div>

    <!-- <button
    class="btn btn-dark additem _effect--ripple waves-effect waves-light"
    @click="addlesson()"
  >
  {{ $t("menu_couse_f_add_lesson") }}
  </button> -->
  <!-- <div class="invoice-detail-items">
    <div class="table-responsive">
      <table class="table item-table">
        <thead>
          <tr>
            <th class=""></th>
            <th>{{ $t("menu_lesson_name_and_detail") }}</th>
            <th class="">{{ $t("menu_lesson_f_title_picture") }}</th>
            <th class="">{{ $t("menu_lesson_f_video") }}</th>
          </tr>
          <tr aria-hidden="true" class="mt-3 d-block table-row-hidden"></tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in store.lessonlist" :key="index">
            <td class="delete-item-row">
              <ul class="table-controls">
                <li>
                  <a
                    href="javascript:void(0);"
                    @click="removelesson(index)"
                    class="delete-item"
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Delete"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-x-circle"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line></svg
                  ></a>
                </li>
              </ul>
            </td>
            <td class="description">
              <input
                type="text"
                class="form-control form-control-sm"
                placeholder="ຄໍາຖາມ"
                v-model="item.cs_name"
              />
              <textarea
                class="form-control"
                placeholder="ຄໍາຕອບ"
                v-model="item.cs_description"
                >{{ item.cs_description }}</textarea
              >
            </td>
            <td class="rate">
              <input
                type="file"
                id="input"
                @change="handleFiles($event, index)"
              />
              <div class="video-container">
                <img
                  :src="image(item.cs_cover)"
                  class="img-fluid"
                  width="40"
                  height="40"
                />
              </div>
            </td>
            <td>
                 <input
                type="text"
                class="form-control form-control-sm"
                placeholder="ລິ້ງວິດີໂອ"
                v-model="item.cs_id"
              />

           
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div> -->


  
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { CourseStore } from "@/store/course"; // import the auth store we just created
import { useVuelidate } from "@vuelidate/core";
import ApiService  from "../../services/api.service";
import Swal from 'sweetalert2';
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import Loading from 'vue-loading-overlay';import 'vue-loading-overlay/dist/css/index.css';
const { locale, setLocale } = useI18n();

const toast = useToast();
const router = useRouter();
const store = CourseStore();

// const { Clear } = AlertStore(); // use  action
const { FormDataCourse } = storeToRefs(store);
const { Images } = storeToRefs(store);
const { SaveCourse } = CourseStore();
const { SaveLesson } = CourseStore();
const { ResetForm } = CourseStore();
const { UploadfileCourse } = CourseStore();
const { deletelesson } = CourseStore();
const { Adlesson } = CourseStore();
const { uploadfilecourse } = CourseStore();

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
      minLength: minLength(6),
    },
  };
});

const v$ = useVuelidate(rules, FormDataCourse);


const save = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    try {
      store.isLoaddingsave = true;
      let uploadfile = await UploadfileCourse();
      let updateCourse = await SaveCourse();

  
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

    } catch (error) {
      await toast.error("ຂໍ້ມູນບໍ່ໄດ້ບັນທຶກສຳເລັດ.");
    }
  }
};


const addlesson = async () => {
  await Adlesson();
};
const removelesson = async (x) => {
  await deletelesson(x);
};
const removeImage = async () => {
  store.formDataCourse.course_cover = null
  const input = document.querySelector('input[type="file"]');
  input.value = "";
};
const handleFiles = async (event, x) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    let formData = new FormData();
  formData.append("files", event.target.files[0]);
  const image = await uploadfilecourse(formData);

  const index = store.lessonlist;

  index[x].cs_cover = image.data[0].path;

  }else {
    Swal.fire({
      text: 'Upload File Image Only!',
      icon: 'error',
    });

  }

};

const handleFilesVideo = async (event, x) => {
  let formData = new FormData();
  formData.append("files", event.target.files[0]);
  const video = await uploadfilecourse(formData);
  const index = store.lessonlist.findIndex((item) => item.cs_id === x);

  if (index !== -1) {
    // แทนค่า name ใน object ที่มี id เป็น 2 เป็น 'Alice'
    store.lessonlist[index].cs_video = video.data[0].path;
  }
};

const onFileChange = async (event) => {
  var input = event.target;
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e) => {
      store.image = e.target.result;
    };
    store.imagelist = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
};




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


function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}

function image(i) {
  var x = null;
  if (i) {
    const usingSplit = i.split(",");
    var x = usingSplit[0];
  } else {
    var x = "static/upload/2023/9/files-riRE6hEnHI.jpg";
  }
  let im =  ApiService.image(x);
  return im;
}


</script>
<style>


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

