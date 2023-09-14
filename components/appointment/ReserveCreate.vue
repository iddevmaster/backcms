<template>
  <div class="row layout-top-spacing">

    
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="text"
        name="txt"
        placeholder="ค้นหา"
        class="form-control"
        required=""
        v-model="store.formsearch.search" @keyup="searchData"
      />
    </div>
  </div>

  
{{store.myChoose}}

  <div class="table-responsive">
    <table id="example" class="table table-bordered table-hover" style="width: 100%">
      <thead>
        <tr>
          <th>
            #
            <!-- <input type="checkbox"  v-model="store.isAllSelected" @click="selectAll"> -->
          </th>
          <th @click="sortList('id')">ชื่อ - นามสกุล &#8597;</th>
          <!-- <th @click="sortList('user_name')">ยูสเซอร &#8597;</th> -->
          <!-- <th @click="sortList('user_email')">อีเมล &#8597;</th> -->
          <th @click="sortList('user_phone')">เบอรโทร</th>
          <th>อีเมล์ &#8597;</th>
          <!-- <th class="no-content">จัดการ</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in store.usersall" :key="user.user_id" @click="choose(user)" :class="{ 'table-success': store.myChoose === user }">
          <td id="clickTest">{{ index + 1 }}</td>
          <td>{{ user.user_firstname }} - {{ user.user_lastname }}</td>
          <td>{{ user.user_phone }}</td>
          <td>{{ user.user_email }}</td>
          <!-- <td>
            <button
              type="button"
              class="btn btn-success mt-0"
              @click="choose(user)"
            >
              เลือก
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>

  <!-- <div v-if="store.myChoose" class="alert alert-light-primary alert-dismissible fade show border-0 mb-4" role="alert"> 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"  @click="close()"> 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close" data-bs-dismiss="alert"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button> 
      <strong>Choose User Complete</strong> Lorem Ipsum is simply dummy text of the printing. </div> -->

  <!-- <div class="row mb-4">
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">User</label>
      {{store.myValue}}
      <Select2  v-model="store.myValue"  :options="myOptionsUser" :settings="{ settingOption: value, settingOption: value }"  @change="myChangeEvent($event)" @select="mySelectEvent($event)"/>
    </div>
  </div> -->
  <button type="button" class="btn btn-primary" @click="save()">บันทึก</button>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { AppointStore } from "@/store/appoint"; // import the auth store we just created
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const store = AppointStore();

await store.fetchUsers();

const myOptionsUser = JSON.parse(JSON.stringify(store.users));
const myUser = ref();

const backToUser = async () => {
  router.go(-1);
};

const save = async () => {
  console.log("save");
};

const choose = async (item) => {
 store.myChoose = item;
};


const close = async () => {
 store.myChoose = null;
};
const myChangeEvent = (event) => {
  console.log("myChangeEvent: ", event);
};

const mySelectEvent = (e) => {
  console.log("mySelectEvent: ", e);
};

const searchData = async () => {

  await store.fetchUsers()
};
</script>

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
</style>
