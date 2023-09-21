<template>
  <div class="col-xl-7">
    <div class="invoice-content">
      <div class="invoice-detail-body">
        <div class="invoice-detail mb-5" style="padding: 0 48px">
          <h2 class="text-center">เพิ่มใบขับขี่</h2>
          <label for="type" class="fw-bold">ประเภทใบขับขี่</label>
          {{store.formadddtl}}
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
              {{ item.dlt_code }}
            </option>
          </select>
        </div>

        <div class="mb-5" style="padding: 0 48px">
          <label for="type" class="fw-bold">วันที่ออกใบ</label>
          <Datepicker v-model="store.formadddtl.issue_date" :format="format_start" />
          <span
            class="text-xs text-red-500"
            style="color: red"
            v-if="v$.issue_date.$error"
            >{{ v$.issue_date.$errors[0].$message }}</span>
        </div>


        <div class="mb-5" style="padding: 0 48px">
          <label for="type" class="fw-bold">วันหมดอายุ</label>
          <Datepicker v-model="store.formadddtl.expiry_date" :format="format_end" />
          <span
            class="text-xs text-red-500"
            style="color: red"
            v-if="v$.expiry_date.$error"
            >{{ v$.expiry_date.$errors[0].$message }}</span>
        </div>
        <div>
          <span
            class="text-xs text-red-500"
            style="color: red"
            v-if="v$.front_img.$error"
            >{{ v$.front_img.$errors[0].$message }}</span
          >
        </div>
        <div class="invoice-detail mb-5" style="padding: 0 48px">
          <div class="form-group mt-3 d-flex">
            <label for="exampleFormControlFile1" class="fw-bold text-nowrap"
              >รูปหน้าบัตร</label
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
            <p>แสดงหน้าบัตร: </p>
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
          <span
            class="text-xs text-red-500"
            style="color: red"
            v-if="v$.back_img.$error"
            >{{ v$.back_img.$errors[0].$message }}</span
          >
        </div>
        <div class="invoice-detail" style="padding: 0 48px">
          <div class="form-group mb-4 mt-3 d-flex">
            <label for="exampleFormControlFile1" class="fw-bold text-nowrap"
              >รูปหลังบัตร</label
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
            <p>แสดงรูปหลังบัตร: {{ store.formadddtl.back_img }}</p>
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
          <button class="btn btn-primary mt-4" @click="Add()">เพิ่มใบขับขี่</button>
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
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e) => {
      store.formadddtl.front_img = e.target.result;
    };
    store.imagelistFront = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
};

const format_start = (date) => {
  store.formadddtl.issue_date = moment(date).format("YYYY-MM-DD");
  return moment(date).format("YYYY-MM-DD");
};

const format_end = (date) => {
  store.formadddtl.expiry_date = moment(date).format("YYYY-MM-DD");
  return moment(date).format("YYYY-MM-DD");
};

const onFileChangeBack = async (event) => {
  var input = event.target;
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e) => {
      store.formadddtl.back_img = e.target.result;
    };
    store.imagelistBack = input.files[0];
    reader.readAsDataURL(input.files[0]);
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

 