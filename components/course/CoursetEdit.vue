<template>
  <div class="row mb-4 g-3">
    <div id="form_grid_layouts" class="col-lg-9">
      <div class="seperator-header">
        <h4 class="">ฟอร์ม แก้ไขคอร์ส</h4>
      </div>
    </div>
    <div class="col-md-6">
      <label for="inputEmail4" class="form-label">รหัสคอร์ส</label>
      <input type="text" class="form-control" id="inputEmail4" v-model="store.formDataEditCourse.course_code" :class="{
        'border-red-500 focus:border-red-500': v$.course_code.$error,
        'border-[#42d392] ': !v$.course_code.$invalid,
      }" @change="v$.course_code.$touch" />
      <span class="text-xs text-red-500" style="color: red" v-if="v$.course_code.$error">{{
        v$.course_code.$errors[0].$message }}</span>
    </div>
    <div class="col-md-6">
      <label for="inputPassword4" class="form-label">ชื่อคอร์ส</label>
      <input type="text" class="form-control" id="inputPassword4" v-model="store.formDataEditCourse.course_name" :class="{
        'border-red-500 focus:border-red-500': v$.course_name.$error,
        'border-[#42d392] ': !v$.course_name.$invalid,
      }" @change="v$.course_name.$touch" />
      <span class="text-xs text-red-500" style="color: red" v-if="v$.course_name.$error">{{
        v$.course_name.$errors[0].$message }}</span>
    </div>
    <div class="col-12">
      <label for="inputAddress" class="form-label">รายละเอียดคอร์ส</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" :class="{
        'border-red-500 focus:border-red-500': v$.course_description.$error,
        'border-[#42d392] ': !v$.course_description.$invalid,
      }" @change="v$.course_description.$touch" v-model="store.formDataEditCourse.course_description">
      </textarea>
      <span class="text-xs text-red-500" style="color: red" v-if="v$.course_description.$error">{{
        v$.course_description.$errors[0].$message }}</span>
    </div>

    <div class="form-group mb-4 mt-3">
      <label for="exampleFormControlFile1">รูปภาพคอร์ส</label>
      <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChange" ref="fileupload" />
    </div>


    <div class="border p-2 mt-3">
      <p>แสดงรูปตรงนี้:</p>
      <template v-if="store.image">
        <div class="row">
          <div id="image-container" class="col-md-3 col-sm-4 col-6" >
            <div class="image-wrapper">
              <img :src="coverimage(store.image)" class="img-fluid" />
              <button @click="removeImage()" class="delete-button"><i class="bi bi-x-lg"></i></button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div></div>
  </div>

  <button class="btn btn-dark additem _effect--ripple waves-effect waves-light" @click="addlesson()">
    เพิ่มบทเรียน
  </button>
  <div class="invoice-detail-items">
    <div class="table-responsive">
      <table class="table item-table">
        <thead>
          <tr>
            <th class=""></th>
            <th>ชื่อ && รายละเอียดคอร์ส</th>
            <th class="">รูปภาพ</th>
            <th class="">วีดีโอ</th>
          </tr>
          <tr aria-hidden="true" class="mt-3 d-block table-row-hidden"></tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in store.lessonlist" :key="index">
            <td class="delete-item-row">
              <ul class="table-controls">
                <li>
                  <a href="javascript:void(0);" @click="removelesson(item.cs_id)" class="delete-item"
                    data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"><svg
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-x-circle">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg></a>
                </li>
              </ul>
            </td>
            <td class="description">
              <input type="text" class="form-control form-control-sm" placeholder="Item Description"
                v-model="item.cs_name" />
              <textarea class="form-control" placeholder="cs_Description"
                v-model="item.cs_description">{{ item.cs_description }}</textarea>
            </td>
            <td class="rate">
              <input type="file" id="input" @change="handleFiles($event, index)" />
              <img :src="image(item.cs_cover)" class="img-fluid" width="40" height="40" />
            </td>
            <td class="text-right qty">
              <input type="file" id="input" @change="handleFiles($event, index)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="col-xl-12 col-md-12">
    <button type="button" class="btn btn-success" @click="save()">
      บันทึก
    </button>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { CourseStore } from "@/store/course"; // import the auth store we just created
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import ApiService  from "../../services/api.service";
const toast = useToast();
const router = useRouter();
const store = CourseStore();

await store.fetchCourslist();
await store.fetchCourseId(router.currentRoute.value.params.id);

// const { Clear } = AlertStore(); // use  action
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

// store.ClearData();
// storealert.Clear()

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
    await toast.warning("Wait Save Data", {
      timeout: 2000,
    });

    try {
      let updatefile = await UploadfileCourse()
      let updatedata = await UpdateCourse();
      await store.fetchCourslist()
      await setTimeout(() => {
        store.fetchCourseId(router.currentRoute.value.params.id);
      }, 500);

      await setTimeout(() => {
        toast.success("Save Data");
      }, 500);

    } catch (error) {
      await toast.error("Fail Save Data");
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
  store.image = null;
  const input = document.querySelector('input[type="file"]');
  input.value = "";
};

const handleFiles = async (event, x) => {
  let formData = new FormData();
  formData.append("files", event.target.files[0]);
  const image = await uploadfilecourse(formData);
  const index = store.lessonlist;

  index[x].cs_cover = image.data[0].path;

};

const handleFilesVideo = async (event, x) => {
  let formData = new FormData();
  formData.append("files", event.target.files[0]);
  const video = await uploadfilecourse(formData);

  const index = store.lessonlist;
  index[x].cs_video = video.data[0].path;
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

function image(i) {
  var x = null;
  if (i) {
    const usingSplit = i.split(",");
    var x = usingSplit[0];
  } else {
    var x = "static/upload/2023/7/files-1689561047889.jpg";
  }
  let im =  ApiService.image(x);
  return im;
}

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
<style>
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

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
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
 