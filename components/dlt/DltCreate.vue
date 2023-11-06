<template>
  <div class="col-xl-7">
    <div class="invoice-content">
      <div class="invoice-detail-body">
        <div class="invoice-detail mb-5" style="padding: 0 48px">
          <h2 class="text-center">{{ $t("menu_dlt_form_add") }}</h2>
          <label for="type" class="fw-bold">{{ $t("menu_dlt_form_type") }}</label>
         
          <select
            class="form-select"
            aria-label="Default select example"
            id="type"
            v-model="store.formadddtl.dlt_code"
          >
            <option selected disabled>โปรดเลือกประเภทใบขับขี่</option>
            <option
              v-for="(item, index) in store.dtla"
              :key="index"
              v-bind:value="item.dlt_code"
            >
               <span v-if="locale == 'la'">{{
                              item.dlt_description_loas
                            }}</span>
                            <span v-if="locale == 'en'">{{
                              item.dlt_description_english
                            }}</span>
                            <span v-if="locale == 'th'">{{
                              item.dlt_description
                            }}</span>
            </option>
          </select>
        </div>

        <div class="mb-5" style="padding: 0 48px">
          <label for="type" class="fw-bold">{{ $t("menu_dlt_form_issue_date") }}</label>
          <Datepicker v-model="store.formadddtl.issue_date" :format="format_start"    :disabledDates="store.disabledDates"/>
 
            <div v-if="locale == 'la'">
        <span v-if="v$.issue_date.$error" class="text-xs text-red-500" style="color: red">
          ຕ້ອງມີຊ່ອງຂໍ້ມູນວັນທີອອກ</span>
      </div>

      <div v-if="locale == 'en'">
        <span v-if="v$.issue_date.$error" class="text-xs text-red-500" style="color: red">
          The Issue Date field is required</span>
      </div>

      <div v-if="locale == 'th'">
        <span v-if="v$.issue_date.$error" class="text-xs text-red-500"
          style="color: red">ต้องระบุข้อมูลวันที่ออก</span>
      </div>
        </div>





        <div class="mb-5" style="padding: 0 48px">
          <label for="type" class="fw-bold">{{ $t("menu_dlt_form_expiry_date") }}</label>
          <Datepicker v-model="store.formadddtl.expiry_date" :format="format_end"  :disabledDates="store.disabledDatesEnd"/>


            <div v-if="locale == 'la'">
        <span v-if="v$.expiry_date.$error" class="text-xs text-red-500" style="color: red">
          ຕ້ອງໃສ່ຊ່ອງວັນທີອອກ</span>
      </div>

      <div v-if="locale == 'en'">
        <span v-if="v$.expiry_date.$error" class="text-xs text-red-500" style="color: red">
          The Expiry date field is required</span>
      </div>

      <div v-if="locale == 'th'">
        <span v-if="v$.expiry_date.$error" class="text-xs text-red-500"
          style="color: red">ต้องระบุข้อมูลวันที่หมดอายุ</span>
      </div>
        </div>
        <div>
   

          <div v-if="locale == 'la'">
        <span v-if="v$.front_img.$error" class="text-xs text-red-500" style="color: red">
          ອັບໂຫຼດຮູບໜ້າບັດ</span>
      </div>

      <div v-if="locale == 'en'">
        <span v-if="v$.front_img.$error" class="text-xs text-red-500" style="color: red">
          Upload photo of card face</span>
      </div>

      <div v-if="locale == 'th'">
        <span v-if="v$.front_img.$error" class="text-xs text-red-500"
          style="color: red">อัพโหลดรูปภาพหน้าบัตร</span>
      </div>
        </div>
        <div class="invoice-detail mb-5" style="padding: 0 48px">
          <div class="form-group mt-3 d-flex">
            <label for="exampleFormControlFile1" class="fw-bold text-nowrap"
              >{{ $t("menu_dlt_form_front_img") }}</label
            >

            <input
              type="file"
              class="form-control-file ms-4"
              id="exampleFormControlFile1"
              @change="onFileChangeFront"
              ref="fileupload"
            />
          </div>
          <div class="border p-2 mt-3">
            <p>{{ $t("menu_dlt_image_display") }}: </p>
            <template v-if="store.formadddtl.front_img">
              <div class="row">
                <div id="image-container" class="col-md-12 col-sm-12 col-12">
                  <div class="image-wrapper">
                    <img
                      :src="coverimage(store.formadddtl.front_img)"
                      class="img-fluid"
                    />
                    <button
                      @click="removeImage('front_img')"
                      class="delete-button"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div>
    
          
          <div v-if="locale == 'la'">
        <span v-if="v$.back_img.$error" class="text-xs text-red-500" style="color: red">
          ອັບໂຫຼດຮູບຢູ່ດ້ານຫຼັງຂອງບັດ</span>
      </div>

      <div v-if="locale == 'en'">
        <span v-if="v$.back_img.$error" class="text-xs text-red-500" style="color: red">
          Upload photo of card of back</span>
      </div>

      <div v-if="locale == 'th'">
        <span v-if="v$.back_img.$error" class="text-xs text-red-500"
          style="color: red">อัพโหลดรูปภาพหลังบัตร</span>
      </div>
        </div>
        <div class="invoice-detail" style="padding: 0 48px">
          <div class="form-group mb-4 mt-3 d-flex">
            <label for="exampleFormControlFile1" class="fw-bold text-nowrap"
              >{{ $t("menu_dlt_form_back_img") }}</label
            >
            <input
              type="file"
              class="form-control-file ms-4"
              id="exampleFormControlFile2"
              @change="onFileChangeBack"
              ref="fileupload"
            />
          </div>

          <div class="border p-2 mt-3">
            <p>{{ $t("menu_dlt_image_display") }}:</p>
            <template v-if="store.formadddtl.back_img">
              <div class="row">
                <div id="image-container" class="col-md-9 col-sm-9 col-">
                  <div class="image-wrapper">
                    <img
                      :src="coverimage(store.formadddtl.back_img)"
                      class="img-fluid"
                    />
                    <button
                      @click="removeImage('back_img')"
                      class="delete-button"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div
          class="invoice-detail d-flex justify-content-center gap-2"
          style="padding: 0 48px"
        >
          <button class="btn btn-primary mt-4" @click="Add()">{{ $t("menu_dlt_bt_save") }}</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { DltStore } from "@/store/dlt"; // import the auth store we just created
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import ApiService from "../../services/api.service";
import Datepicker from "vuejs3-datepicker";
import moment from "moment";
import { useI18n } from "vue-i18n";
import Swal from 'sweetalert2';
const { locale, setLocale } = useI18n();
const toast = useToast();

const store = DltStore();
const route = useRoute();

const { FormDLTadd } = storeToRefs(store);



const rules = computed(() => {
  return {
    front_img: {
      required: helpers.withMessage(
        "The First Image Profile field is required",
        required
      ),
      minLength: minLength(1),
    },
    back_img: {
      required: helpers.withMessage(
        "The Back Image Profile field is required",
        required
      ),
      minLength: minLength(1),
    },
    issue_date: {
      required: helpers.withMessage(
        "The Issue date field is required",
        required
      ),
    },
    expiry_date: {
      required: helpers.withMessage(
          "The Expiry date field is required",
        required
      ),
  
    },

  
  };
});
;
const v$ = useVuelidate(rules, FormDLTadd);

const Add = async () => {
  v$.value.$validate();
   if (!v$.value.$error) {
  const save = await store.SaveFormDlt();
  if(save == true){
toast.success('Save Success');

let finddtl = await store.fetchDlt(route.params.id);
if (finddtl == true) {

} else {
  toast.error('Can not Data')
}
}else {
toast.error('Failed  Save Data')
}
  }
};

const removeImage = async (item) => {
  if (item == "front_img") {
    store.formadddtl.front_img = null;
     const input = document.querySelector('#exampleFormControlFile1');
  input.value = "";
  }
  if (item == "back_img") {
    store.formadddtl.back_img = null;
     const input = document.querySelector('#exampleFormControlFile2');
  input.value = "";
  }

};



const onFileChangeFront = async (event) => {
  var input = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag
   
    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formadddtl.front_img = reader.result;
    };
    store.imagelistFront = input.files[0];
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

const format_start = (date) => {
  store.formadddtl.issue_date = moment(date).format("YYYY-MM-DD");

  store.disabledDatesEnd.to = new Date(store.formadddtl.issue_date)
  return moment(date).format("YYYY-MM-DD");
};

const format_end = (date) => {
  store.formadddtl.expiry_date = moment(date).format("YYYY-MM-DD");
  store.disabledDates.from = new Date(store.formadddtl.expiry_date)
  return moment(date).format("YYYY-MM-DD");
};




const onFileChangeBack = async (event) => {
  var input = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag
   
    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formadddtl.back_img = reader.result;
    };
    store.imagelistBack = input.files[0];
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
</script>

 