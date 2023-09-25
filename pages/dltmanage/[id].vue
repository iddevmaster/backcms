


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
import { DltStore } from '@/store/dlt'; // import the auth store we just created
import { useToast } from 'vue-toastification'
import { useRoute } from "vue-router";
import { useAuthStore } from '@/store/auth'
import ApiService  from "../../services/api.service";
import DltCreate from '@/components/dlt/DltCreate.vue'
import DltDelet from '@/components/dlt/DltDelet.vue'
import moment from "moment";
import Datepicker from "vuejs3-datepicker";

definePageMeta({
  middleware: ['auth', 'roles'],
  allowedRoles: [1],
})

const toast = useToast()
const route = useRoute();
const store = DltStore()
const auth = useAuthStore()
const profile = await auth.getProfile();
store.formadddtl.user_id = route.params.id

let finddtl = await store.fetchDlt(route.params.id);
if (finddtl == true) {

} else {
  toast.error('Can not Data')
}
store.mydtla = [];
store.isAdd = true;
store.isEdit = false;

const onFileChangeFront = async (event) => {
  var input = event.target;
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e) => {
      store.formdtl.front_img = e.target.result;
    };
    store.imagelistFront = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
};



const onFileChangeBack = async (event) => {
  var input = event.target;
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e) => {
      store.formdtl.back_img = e.target.result;
    };
    store.imagelistBack = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
};

const removeImage = async (item) => {
  store.image = null;
  const input = document.querySelector('input[type="file"]');
  input.value = "";
};

function coverimage(i) {
  let result = i.slice(0, 6);
if (result === 'static') {
  let im =  ApiService.image(i);
  return im;
}else {
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
  store.formadddtl.issue_date = moment(date).format("YYYY-MM-DD");
  return moment(date).format("YYYY-MM-DD");
};

const format_end = (date) => {
  store.formadddtl.expiry_date = moment(date).format("YYYY-MM-DD");
  return moment(date).format("YYYY-MM-DD");
};


const UpdateDlT = async () => {
  store.isDelete = false;
let update =await store.Updatedtl();
if(update == true){
toast.success('Save Success');
store.getDLT()

}else {
toast.error('Failed  Save Data')
}
};


const Add = async () => {

toast.success('Save Success');
};

const AddDLT = async () => {
await store.CheckForm();
};

const DelDlT = async () => {
let  del = await store.delete();

if(del == true){
toast.success('Delete Success');
store.getDLT()
}else {
toast.error('Failed  Save Data')
}
};

</script>

<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">{{ $t("menu_dlt_title_manage") }}</a></li>
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
                      <div class="invoice-detail mb-5" style="padding: 0 48px;">
                        <h2 class="text-center">{{ $t("menu_dlt_form_update") }}</h2>
                       
                        <label for="type" class="fw-bold">{{ $t("menu_dlt_form_type") }}</label>
                        <select class="form-select " aria-label="Default select example" id="type" v-model="store.formdtl.dlt_code" >
                          <option selected disabled>โปรดเลือกประเภทใบขับขี่</option>
                          <option  v-for="(item, index) in store.dtla" :key="index"  v-bind:value="item.dlt_code" > {{item.dlt_code  }}</option>
               
                        </select>
                      </div>

                           <div class="mb-5" style="padding: 0 48px">
          <label for="type" class="fw-bold">{{ $t("menu_dlt_form_issue_date") }}</label>
          <Datepicker v-model="store.formdtl.issue_date" :format="format_start" />
          
        </div>


        <div class="mb-5" style="padding: 0 48px">
          <label for="type" class="fw-bold">{{ $t("menu_dlt_form_expiry_date") }}</label>
          <Datepicker v-model="store.formdtl.expiry_date" :format="format_end" />
       
        </div>

                      <div class="invoice-detail mb-5" style="padding: 0 48px;">

                        <div class="form-group mt-3 d-flex">
                          <label for="exampleFormControlFile1" class="fw-bold text-nowrap">{{ $t("menu_dlt_form_front_img") }}</label>
                          <input type="file" class="form-control-file ms-4" id="exampleFormControlFile1"
                            @change="onFileChangeFront" ref="fileupload" />
                        </div>
                        <div class="border p-2 mt-3">
                          <p>{{ $t("menu_dlt_image_display") }}: </p>
                          <template v-if="store.formdtl.front_img">
                            <div class="row">
                              <div id="image-container" class="col-md-12 col-sm-12 col-12">
                                <div class="image-wrapper">
                                  <img :src="coverimage(store.formdtl.front_img)" class="img-fluid" />
                                  <button @click="removeImage('front_img')" class="delete-button"><i
                                      class="bi bi-x-lg"></i></button>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>


                      <div class="invoice-detail" style="padding: 0 48px;">

                        <div class="form-group mb-4 mt-3 d-flex">
                          <label for="exampleFormControlFile1" class="fw-bold text-nowrap">{{ $t("menu_dlt_form_back_img") }}</label>
                          <input type="file" class="form-control-file ms-4" id="exampleFormControlFile1"
                            @change="onFileChangeBack" ref="fileupload" />
                        </div>
                        <div class="border p-2 mt-3">
                          <p>{{ $t("menu_dlt_image_display") }}:  </p>
                          <template v-if="store.formdtl.back_img">
                            <div class="row">
                              <div id="image-container" class="col-md-9 col-sm-9 col-">
                                <div class="image-wrapper">
                                  <img :src="coverimage(store.formdtl.back_img)" class="img-fluid" />
                                  <button @click="removeImage('back_img')" class="delete-button"><i
                                      class="bi bi-x-lg"></i></button>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>

                      <div class="invoice-detail d-flex justify-content-center gap-2" style="padding: 0 48px;">
                        <button class="btn btn-danger mt-4" @click="DelDlT()">{{ $t("menu_dlt_del") }}</button>
                        <button class="btn btn-success mt-4" @click="UpdateDlT()">{{ $t("menu_dlt_update") }}</button>
                      </div>
                    </div>

                  </div>

                </div>

                <div class="col-xl-5">

                  <div class="invoice-actions-btn">
                    <div class="d-flex mb-4">
                      <div class="card" style="height: 100px; width: 100px;"></div>
                      <h5 class="ms-2">{{ store.name }}</h5>
                    </div>
                    <div class="d-flex justify-content-between pb-2 mb-2 border-bottom">
                      <p class="fw-bold fs-4">{{ $t("menu_dlt_all") }}</p>
                      <button class="btn btn-success mt-0" @click="AddDLT()"><i class="bi bi-plus-circle"></i></button>
                    </div>
                    <div class="invoice-action-btn">
                      <div class="row">
                        
                        <div class="col-xl-12 col-md-4" v-for="(item, index) in store.mydtla" :key="item.dlt_code" @click="SelectDtl(index)">
                        
                          <a href="javascript:void(0);"
                            class="btn btn-primary btn-send _effect--ripple waves-effect waves-light">{{ item.dlt_description }}</a>
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
 