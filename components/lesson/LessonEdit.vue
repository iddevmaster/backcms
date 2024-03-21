<template>
  <div v-if="store.GetopenModalEdit" class="modal">
    <div
      class="modal-content modal-dialog modal-xl"
      id="deleteConformationLabel"
    >
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
          {{ $t("lesson_head") }}
        </h5>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label"
              >{{ $t("lesson_qui") }}:</label
            >
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="ຄໍາຖາມ *"
              :class="{
                'border-red-500 focus:border-red-500': v$.cs_name.$error,
                'border-[#42d392] ': !v$.cs_name.$invalid,
              }"
              @change="v$.cs_name.$touch"
              v-model="store.formcreatelessonedit.cs_name"
              maxlength="200"
            >
            </textarea>

            <span
              v-if="v$.cs_name.$error"
              class="text-xs text-red-500"
              style="color: red"
            >
              ຕ້ອງລະບຸລະຫັດຫຼັກສູດ.</span
            >
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label"
              >{{ $t("lesson_ans") }}:</label
            >

            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="ຄໍາຕອບ *"
              :class="{
                'border-red-500 focus:border-red-500': v$.cs_description.$error,
                'border-[#42d392] ': !v$.cs_description.$invalid,
              }"
              @change="v$.cs_description.$touch"
              v-model="store.formcreatelessonedit.cs_description"
              maxlength="500"
            >
            </textarea>

            <span
              v-if="v$.cs_description.$error"
              class="text-xs text-red-500"
              style="color: red"
            >
              ຕ້ອງລະບຸລະຫັດຫຼັກສູດ.</span
            >
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label"
              >{{ $t("lesson_yout") }}:</label
            >

            <input
              type="text"
              class="form-control"
              id="recipient-name"
              v-model="store.formcreatelessonedit.cs_video"
              placeholder="https://youtu.be/DCh2jlZzC1g *"
              maxlength="100"
            />
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label">{{ $t("lesson_group") }}:</label>

           <v-select
  v-model="store.myselect_group"
    :options="store.group"
    label="cg_name"
     placeholder="ເລືອກ"
         @change="changedLabelCounrt($event)"
  ></v-select>

 <span v-if="v$.cg_id.$error" class="text-xs text-red-500" style="color: red">
              ຕ້ອງໃສ່ຂໍ້ຄວາມ.</span>
            
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label"
              >{{ $t("lesson_pic") }}:</label
            >
            <input
              type="file"
              class="form-control-file"
              id="exampleFormControlFile1"
              @change="onFileChange"
              ref="fileupload"
            />
          </div>
          <div class="border p-2 mt-3">
            <p>{{ $t("menu_exam_display_p") }}:</p>

            <template v-if="store.formcreatelessonedit.cs_cover">
              <div class="row">
                <div class="col-3">
                  <img
                    :src="image(store.formcreatelessonedit.cs_cover)"
                    class="img-fluid"
                  />
                  <button @click="removeImage()">
                    {{ $t("menu_exam_display_del") }}
                  </button>
                </div>
              </div>
            </template>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn btn-light-dark"
          data-bs-dismiss="modal"
          @click="closeModal()"
        >
          <i class="flaticon-cancel-12"></i> {{ $t("menu_exam_modal_close") }}
        </button>
        <button type="button" class="btn btn-primary" @click="update()">
          {{ $t("menu_exam_modal_save") }}
        </button>
      </div>
    </div>
  </div>
</template>




<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { LessonStore } from "@/store/lesson";
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select';
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import ApiService from "../../services/api.service";
const { locale, setLocale } = useI18n();

const toast = useToast();
const store = LessonStore();
const router = useRouter();

const { FormEditLesson } = storeToRefs(store);

const closeModal = async () => {
  store.GetopenModalEdit = false;
};

const rules = computed(() => {
  return {
    cs_name: {
      required: helpers.withMessage("Exam code field is required", required),
      minLength: minLength(1),
    },
    cs_description: {
      required: helpers.withMessage("Exam code field is required", required),
      minLength: minLength(1),
    },
    cg_id: {
      required: helpers.withMessage('Exam code field is required', required),
      minLength: minLength(1),
    },
  };
});
const v$ = useVuelidate(rules, FormEditLesson);
const update = async () => {
  ///////////// บันทึก


if(store.myselect_group){
if(store.myselect_group.length == 1){
  store.formcreatelessonedit.cg_id = store.myselect_group[0].cg_id;
}
else {
  store.formcreatelessonedit.cg_id = store.myselect_group.cg_id;
}
}
if(store.myselect_group == null){
  store.formcreatelessonedit.cg_id = null;
}


   v$.value.$validate(); 
  if (!v$.value.$error) {
    let uploadfile = await store.UploadfileLesson(); ///////////upload รูป
    let updatelesson = await store.updateformLesson();

    if (updatelesson === false) {
      await toast.error("ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ");
    } else {
      await toast.success("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ");
    const lessonlist = await store.fetchLessonlist();
    await store.paginatedItems() 
   store.GetopenModalEdit = false;
      router.push('/lesson');
     
    }
  }
};

const onFileChange = async (event) => {
  var input = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith("image/")) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag
    store.imageReq = false;
    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formcreatelessonedit.cs_cover = reader.result;
    };
    store.imagelist = input.files[0];
    reader.readAsDataURL(file);
  } else {
    // Reset the image URL if the selected file is not an image
    //   this.imageUrl = null;
    const input = document.querySelector('input[type="file"]');
    input.value = "";
    Swal.fire({
      text: "Upload File Image Only!",
      icon: "error",
    });
  }
};

const removeImage = async () => {
  store.formcreatelessonedit.cs_cover = "";
  store.imageReq = false;
  store.imagelist = null
  const input = document.querySelector('input[type="file"]');
  input.value = "";
};


const changedLabelCounrt = async (event) => {

console.log(event.target.value);

}
function image(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}
</script>

