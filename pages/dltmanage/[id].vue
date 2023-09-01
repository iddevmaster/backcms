


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


definePageMeta({
  middleware: ['auth', 'roles'],
  allowedRoles: [1],
})

const toast = useToast()
const route = useRoute();
const store = DltStore()


let finddtl = await store.fetchDlt(route.params.id);
if (finddtl == true) {

} else {
  toast.error('Can not Data')
}


const onFileChangeFront = async (event) => {
  var input = event.target;
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e) => {
      store.front_img = e.target.result;
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
      store.back_img = e.target.result;
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

const SelectDtl = async (item) => {
await store.SelectgetDLT(item);
};

</script>

<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">จัดการ DLT </a></li>
            <li class="breadcrumb-item active" aria-current="page">
              DLT User
            </li>
          </ol>
        </nav>
      </div>

      <div class="middle-content container-xxl p-0">
        <div class="row invoice layout-top-spacing layout-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <div class="doc-container">

              <div class="row">
                <div class="col-xl-7">
                  <div class="invoice-content">
                    <div class="invoice-detail-body">

                      <div class="invoice-detail mb-5" style="padding: 0 48px;">
                        <h2 class="text-center">เพิ่มใบขับขี่</h2>
                        <label for="type" class="fw-bold">ประเภทใบขับขี่</label>
                        <select class="form-select " aria-label="Default select example" id="type" v-model="store.formdtl.dlt_code" >
                          <option selected disabled>โปรดเลือกประเภทใบขับขี่</option>
                          <option  v-for="(item, index) in store.dtla" :key="index"  v-bind:value="item.dlt_code" > {{item.dlt_code  }}</option>
               
                        </select>
                      </div>

                      <div class="invoice-detail mb-5" style="padding: 0 48px;">

                        <div class="form-group mt-3 d-flex">
                          <label for="exampleFormControlFile1" class="fw-bold text-nowrap">รูปหน้าบัตร</label>
                          <input type="file" class="form-control-file ms-4" id="exampleFormControlFile1"
                            @change="onFileChangeFront" ref="fileupload" />
                        </div>
                        <div class="border p-2 mt-3">
                          <p>แสดงหน้าบัตร: </p>
                          <template v-if="store.front_img">
                            <div class="row">
                              <div id="image-container" class="col-md-12 col-sm-12 col-12">
                                <div class="image-wrapper">
                                  <img :src="store.front_img" class="img-fluid" />
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
                          <label for="exampleFormControlFile1" class="fw-bold text-nowrap">รูปหลังบัตร</label>
                          <input type="file" class="form-control-file ms-4" id="exampleFormControlFile1"
                            @change="onFileChangeBack" ref="fileupload" />
                        </div>
                        <div class="border p-2 mt-3">
                          <p>แสดงรูปหลังบัตร: </p>
                          <template v-if="store.back_img">
                            <div class="row">
                              <div id="image-container" class="col-md-9 col-sm-9 col-">
                                <div class="image-wrapper">
                                  <img :src="store.back_img" class="img-fluid" />
                                  <button @click="removeImage('back_img')" class="delete-button"><i
                                      class="bi bi-x-lg"></i></button>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>

                      <div class="invoice-detail d-flex justify-content-center gap-2" style="padding: 0 48px;">
                        <button class="btn btn-primary mt-4">Submit</button>
                        <button class="btn btn-danger mt-4">Delete</button>
                        <button class="btn btn-success mt-4">Update</button>
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
                      <p class="fw-bold fs-4">ใบขับขี่ทั้งหมด</p>
                      <button class="btn btn-success mt-0"><i class="bi bi-plus-circle"></i></button>
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
 