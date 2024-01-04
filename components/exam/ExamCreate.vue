<template>
  <div v-if="GetopenModalCreate" class="modal">

    <div class="modal-content modal-dialog modal-xl" id="deleteConformationLabel">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{ $t("menu_exam_create") }}</h5>
      </div>
      <div class="modal-body">
        <form>

          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">{{ $t("menu_exam_all_code") }}:</label>


            <div v-if="locale == 'la'">
              <span v-if="v$.em_code.$error" class="text-xs text-red-500" style="color: red">
                ຕ້ອງລະບຸລະຫັດຫຼັກສູດ.</span>
            </div>

            <div v-if="locale == 'en'">
              <span v-if="v$.em_code.$error" class="text-xs text-red-500" style="color: red">
                The Exam Code field is required.</span>
            </div>

            <div v-if="locale == 'th'">
              <span v-if="v$.em_code.$error" class="text-xs text-red-500"
                style="color: red">ต้องระบุฟิลด์รหัสหลักสูตร</span>
            </div>

            <input type="text" class="form-control" id="recipient-name" v-model="store.formexam.em_code">
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label">{{ $t("menu_exam_all_name") }}:</label>


            <div v-if="locale == 'la'">
              <span v-if="v$.em_name.$error" class="text-xs text-red-500" style="color: red">
                ຕ້ອງມີຊ່ອງໃສ່ຊື່ສອບເສັງ.</span>
            </div>

            <div v-if="locale == 'en'">
              <span v-if="v$.em_name.$error" class="text-xs text-red-500" style="color: red">
                The Exam Name field is required.</span>
            </div>

            <div v-if="locale == 'th'">
              <span v-if="v$.em_name.$error" class="text-xs text-red-500" style="color: red">ต้องระบุฟิลด์ชื่อ</span>
            </div>
            <input type="text" class="form-control" id="recipient-name" v-model="store.formexam.em_name">
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label">{{ $t("menu_exam_all_detail") }}:</label>

            <div v-if="locale == 'la'">
              <span v-if="v$.em_description.$error" class="text-xs text-red-500" style="color: red">
                ຕ້ອງມີຊ່ອງລາຍລະອຽດການສອບເສັງ.</span>
            </div>

            <div v-if="locale == 'en'">
              <span v-if="v$.em_description.$error" class="text-xs text-red-500" style="color: red">
                The Exam Description field is required.</span>
            </div>

            <div v-if="locale == 'th'">
              <span v-if="v$.em_description.$error" class="text-xs text-red-500"
                style="color: red">ต้องระบุฟิลด์รายละเอียด</span>
            </div>

            <input type="text" class="form-control" id="recipient-name" v-model="store.formexam.em_description">
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label">{{ $t("menu_exam_all_total_random") }}:</label> <span
              class="text-xs text-red-500" style="color:red" v-if="v$.em_random_amount.$error">{{
                v$.em_random_amount.$errors[0].$message
              }}</span>
            <input type="number" class="form-control" id="recipient-name" v-model="store.formexam.em_random_amount"
              min="50">
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label">{{ $t("menu_exam_all_time_test") }}</label> <span
              class="text-xs text-red-500" style="color:red" v-if="v$.em_time.$error">{{
                v$.em_time.$errors[0].$message
              }}</span>
            <VueDatePicker v-model="store.formexam.em_time" time-picker enable-seconds placeholder="Select Time" />
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label">DLT </label>
            <div class="col-sm-12">

              <select class="form-control" v-if="store.dtl" v-model="store.formexam.dlt_code">

                <option v-for="(item, index) in store.dtl" :key="item.dlt_code" :value="item.dlt_code">

                  <span v-if="locale == 'la'">{{ item.dlt_description_loas }}</span>
                  <span v-if="locale == 'en'">{{ item.dlt_description_english }}</span>
                  <span v-if="locale == 'th'">{{ item.dlt_description }}</span>
                </option>
              </select>

            </div>

          </div>



          <div class="mb-3">
            <label for="message-text" class="col-form-label">{{ $t("menu_exam_all_pic") }}:</label>


            <div v-if="locale == 'la'">
              <span v-if="v$.em_cover.$error" class="text-xs text-red-500" style="color: red">
                ອັບໂຫຼດຮູບ.</span>
            </div>

            <div v-if="locale == 'en'">
              <span v-if="v$.em_cover.$error" class="text-xs text-red-500" style="color: red">
                Upload photo.</span>
            </div>

            <div v-if="locale == 'th'">
              <span v-if="v$.em_cover.$error" class="text-xs text-red-500" style="color: red">อัพโหลดรูปภาพ</span>
            </div>

            <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChange"
              ref="fileupload">
          </div>
          <div class="border p-2 mt-3">
            <p>{{ $t("menu_exam_display_p") }}:</p>

            <template v-if="store.formexam.em_cover">
              <div class="row">
                <div class="col-3">
                  <img :src="store.formexam.em_cover" class="img-fluid" />
                  <button @click="removeImage()">{{ $t("menu_exam_display_del") }}</button>
                </div>
              </div>
            </template>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn btn-light-dark" data-bs-dismiss="modal" @click="closeModal">
          <i class="flaticon-cancel-12"></i> {{ $t("menu_exam_modal_close") }}</button>
        <button type="button" class="btn btn-primary" @click="save()">{{ $t("menu_exam_modal_save") }}</button>
      </div>
    </div>
  </div>
</template>




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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import { useI18n } from "vue-i18n";
import Swal from 'sweetalert2';
const { locale, setLocale } = useI18n();





const toast = useToast()
const store = ExamStore()
const { GetopenModal } = storeToRefs(store); //Get Getter
const { GetopenModalCreate } = storeToRefs(store); //Get Getter
const { OpenFormInser } = ExamStore();//Action
const { SaveExam } = ExamStore();//Action
const { UploadfileExam } = ExamStore();//Action
const { FormExam } = storeToRefs(store);
const { ResetForm } = ExamStore();//Action


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
      minLength: minLength(1),
    },
    em_name: {
      required: helpers.withMessage('Exam Name field is required', required),
      minLength: minLength(1),
    },
    em_description: {
      required: helpers.withMessage('Exam Description field is required', required),
      minLength: minLength(1),
    },
    em_random_amount: {
      required: helpers.withMessage('Exam Amount field is required', required),
      minLength: minLength(1),
    },
    em_time: {
      pattern: /^(2[0-3]|[0-1]?[\d]):[0-5][\d]:[0-5][\d]$/,
      required: helpers.withMessage('em_time', required),
    },
    em_cover: {
      required: helpers.withMessage(
        "The  Image  field is required",
        required
      ),
      minLength: minLength(1),
    },

  };
});
const v$ = useVuelidate(rules, FormExam);
const save = async () => {///////////// บันทึก
  // if(!store.image){/////////////////// req image  ใช้ rules ไม่ได้ 
  // store.imageReq = true;
  // return false;
  // }
  v$.value.$validate();  ///////////ดัก req
  if (!v$.value.$error) {
    await removeImage();
    let uploadfile = await UploadfileExam();   ///////////upload รูป
    let save = await SaveExam();  ///////////save 
    await store.fetchExamlist();
    if (save === false) {
      await toast.error('Fail Save Data')
    } else {
      await toast.success('Save Data')
      await ResetForm();
      v$.value.$reset();

    }

  }
};




// const onFileChange = async (event) => {
//   var input = event.target;
//   if (input.files) {
//     store.imageReq = false;
//     var reader = new FileReader();
//     reader.onload = (e) => {
//       store.formexam.em_cover = e.target.result;
//     }
//     store.imagelist = input.files[0];
//     reader.readAsDataURL(input.files[0]);
//   }
// }


const onFileChange = async (event) => {
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
};

const removeImage = async () => {
  store.formexam.em_cover = null;
  store.imageReq = false;
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

