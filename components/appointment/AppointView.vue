<template>
  <div class="row p-3">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">นัดหมาย</h4>
      </div>
    </div>
    <div id="form_grid_layouts" class="col-lg-2">
      <div
        class="seperator-header"
        style="text-align: center"
        @click="backToUser()"
      >
        <button
          class="btn btn-primary additem _effect--ripple waves-effect waves-light"
        >
          กลับหน้านัดหมาย
        </button>
      </div>
    </div>
  </div>

  <div class="row p-3">
    <div class="row d-flex justify-content-end mb-2 gap-2 filter">
      <div class="col-xl-2 col-lg-4 col-sm-4">
        <div class="input-group input-group-sm">
          <input
            type="search"
            id="searchBar"
            class="form-control form-control-sm"   v-model="store.formserchrreserve.search" @keyup="searchData"
          />
          <span class="input-group-text"><i class="bi bi-search"></i></span>
        </div>
      </div>
      <div class="col-xl-2 col-lg-4 col-sm-4">
        <select
          class="form-select form-select-sm"
          aria-label="Default select example"  @change="selectshowdata($event)"
        >
          <option selected disabled>select menu</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
         <option value="100">100</option>
        </select>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>user_email</th>
          <th>user_firstname</th>
          <th>user_phone</th>
          <th>identification_number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in store.reservebyap">
          <td>{{ index + 1 }}</td>
          <td>{{ item.user_reserve.user_email }}</td>
          <td>
            {{ item.user_reserve.user_firstname }} -
            {{ item.user_reserve.user_lastname }}
          </td>
          <td>{{ item.user_reserve.user_phone }}</td>
          <td>{{ item.user_reserve.identification_number }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment-timezone";

const toast = useToast();
const router = useRouter();
const store = AppointStore();

const date = ref(new Date());

const { selectentiresap } = AppointStore();//Action

const backToUser = async () => {
  router.go(-1);
};

const searchData = async () => {
   await store.FetchAP()
};


const selectshowdata = async (x) => {
  await selectentiresap(x.target.value);
  await store.FetchAP()
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
.selectFilter {
}
.searchBar {
}
.filter {
  flex-wrap: wrap;
}
</style>
