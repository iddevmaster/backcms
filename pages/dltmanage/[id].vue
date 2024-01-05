


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

import Loading from "@/components/layout/Success.vue";
import { DltStore } from "@/store/dlt"; // import the auth store we just created
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import ApiService from "../../services/api.service";
import DltCreate from "@/components/dlt/DltCreate.vue";
import DltDelet from "@/components/dlt/DltDelet.vue";
import moment from "moment";
import Datepicker from "vuejs3-datepicker";
import { useVuelidate } from "@vuelidate/core";
import { useI18n } from "vue-i18n";
import Swal from 'sweetalert2';
const { locale, setLocale } = useI18n();

definePageMeta({
  middleware: ["auth", "roles"],
  allowedRoles: [1],
});

const toast = useToast();
const route = useRoute();
const store = DltStore();
const auth = useAuthStore();
const profile = await auth.getProfile();
store.formadddtl.user_id = route.params.id;
await store.ResetForm();

let finddtl = await store.fetchDlt(route.params.id);
if (finddtl == true) {
} else {
  toast.error("Can not Data");
}
store.mydtla = [];
store.isAdd = true;
store.isEdit = false;

const { FormDlt } = storeToRefs(store);

const rules = computed(() => {
  return {
    front_img: {
      required: helpers.withMessage(
        "The Front Image DLT field is required",
        required
      ),
      minLength: minLength(1),
    },
    back_img: {
      required: helpers.withMessage(
        "The Back Image DLT field is required",
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
const v$ = useVuelidate(rules, FormDlt);



const onFileChangeFront = async (event) => {
  var input = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag
  
    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formdtl.front_img = reader.result;
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



const onFileChangeBack = async (event) => {
  var input = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag
  
    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formdtl.back_img = reader.result;
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

const removeImage = async (item) => {
  store.image = null;

  if (item == "front_img") {
    store.formdtl.front_img = null;
    const input = document.querySelector("#exampleFormControlFile1");
    input.value = "";
  }
  if (item == "back_img") {
    store.formdtl.back_img = null;
    const input = document.querySelector("#exampleFormControlFile2");
    input.value = "";
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

const SelectDtl = async (item) => {
  store.isEdit = true;
  store.isAdd = false;
  store.isDelete = false;
  //   const input1 = document.querySelector('#exampleFormControlFile1');
  // input1.value = "";

  //    const input2 = document.querySelector('#exampleFormControlFile2');
  // input2.value = "";
  await store.SelectgetDLT(item);
};

const format_start = (date) => {
  store.formdtl.issue_date = moment(date).format("YYYY-MM-DD");

  store.disabledDatesEnd.to = new Date(store.formdtl.issue_date)
  return moment(date).format("YYYY-MM-DD");
};

const format_end = (date) => {
  store.formdtl.expiry_date = moment(date).format("YYYY-MM-DD");
  store.disabledDates.from = new Date(store.formdtl.expiry_date)
  return moment(date).format("YYYY-MM-DD");
};

const UpdateDlT = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    store.isDelete = false;
    let update = await store.Updatedtl();
    if (update == true) {
      toast.success("Save Success");
      store.getDLT();
    } else {
      toast.error("ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ");
    }
  }
};

const Add = async () => {
  toast.success("Save Success");
};

const AddDLT = async () => {
  await store.CheckForm();
};

const DelDlT = async () => {
  let del = await store.delete();

  if (del == true) {
    toast.success("Delete Success");
    store.getDLT();
  } else {
    toast.error("ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ");
  }
};
</script>

<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">{{ $t("menu_dlt_title_manage") }}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ $t("menu_dlt_title_user") }}
            </li>
          </ol>
        </nav>
      </div>

      <div class="middle-content container-xxl p-0">
        <div class="row invoice layout-top-spacing layout-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <div class="doc-container">
              <div class="row">
                <DltDelet v-if="store.isDelete"></DltDelet>
                <DltCreate v-if="store.isAdd"></DltCreate>
                <div class="col-xl-7" v-if="store.isEdit">
                  <div class="invoice-content">
                    <div class="invoice-detail-body">
                      <div class="invoice-detail mb-5" style="padding: 0 48px">
                        <h2 class="text-center">
                          {{ $t("menu_dlt_form_update") }}
                        </h2>

                        <label for="type" class="fw-bold">{{
                          $t("menu_dlt_form_type")
                        }}</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          id="type"
                          v-model="store.formdtl.dlt_code"
                        >
                          <option selected disabled>
                            โปรดเลือกประเภทใบขับขี่
                          </option>
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
                        <label for="type" class="fw-bold">{{
                          $t("menu_dlt_form_issue_date")
                        }}</label>
                        <Datepicker
                          v-model="store.formdtl.issue_date"
                          :format="format_start"   :disabledDates="store.disabledDates"
                        />
                      </div>

                      <div class="mb-5" style="padding: 0 48px">
                        <label for="type" class="fw-bold">{{
                          $t("menu_dlt_form_expiry_date")
                        }}</label>
                        <Datepicker
                          v-model="store.formdtl.expiry_date"
                          :format="format_end"
                          :disabledDates="store.disabledDatesEnd"
                        />
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
                          <label
                            for="exampleFormControlFile1"
                            class="fw-bold text-nowrap"
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
                          <p>{{ $t("menu_dlt_image_display") }}:</p>
                          <template v-if="store.formdtl.front_img">
                            <div class="row">
                              <div
                                id="image-container"
                                class="col-md-12 col-sm-12 col-12"
                              >
                                <div class="image-wrapper">
                                  <img
                                    :src="coverimage(store.formdtl.front_img)"
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
                          <label
                            for="exampleFormControlFile2"
                            class="fw-bold text-nowrap"
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
                          <template v-if="store.formdtl.back_img">
                            <div class="row">
                              <div
                                id="image-container"
                                class="col-md-9 col-sm-9 col-"
                              >
                                <div class="image-wrapper">
                                  <img
                                    :src="coverimage(store.formdtl.back_img)"
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
                        <button class="btn btn-danger mt-4" @click="DelDlT()">
                          {{ $t("menu_dlt_del") }}
                        </button>
                        <button
                          class="btn btn-success mt-4"
                          @click="UpdateDlT()"
                        >
                          {{ $t("menu_dlt_update") }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-5">
                  <div class="invoice-actions-btn">
                    <div class="d-flex mb-4">
                      <div
                        class="card"
                        style="height: 100px; width: 100px"
                      >
                      <img :src="coverimage(store.image_url)" width="100" height="100"  v-if="store.image_url"/>
                    </div>
                      <h5 class="ms-2">{{ store.name }}</h5>
                    </div>
                    <div
                      class="d-flex justify-content-between pb-2 mb-2 border-bottom"
                    >
                      <p class="fw-bold fs-4">{{ $t("menu_dlt_all") }}</p>
                      <button class="btn btn-success mt-0" @click="AddDLT()">
                        <i class="bi bi-plus-circle"></i>
                      </button>
                    </div>
                    <div class="invoice-action-btn">
                      <div class="row">
                        <div
                          class="col-xl-12 col-md-4"
                          v-for="(item, index) in store.mydtla"
                          :key="item.dlt_code"
                          @click="SelectDtl(index)"
                        >
                          <a
                            href="javascript:void(0);"
                            class="btn btn-primary btn-send _effect--ripple waves-effect waves-light"
                            >{{ item.dlt_description }}</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.no-d {
  text-align: center;
  border: 3px solid green;
}
</style>

<style>
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
}

#image-container img {
  width: 400px;
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
  max-width: 500px;
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
 