<template>
  <div class="row p-3">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">{{ $t("menu_app_view") }}</h4>
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
          {{ $t("menu_app_view_back") }}
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
            class="form-control form-control-sm"
            v-model="store.formserchrreserve.search"
            @keyup="searchData"
          />
          <span class="input-group-text"><i class="bi bi-search"></i></span>
        </div>
      </div>
      <div class="col-xl-2 col-lg-4 col-sm-4">
        <select
          class="form-select form-select-sm"
          aria-label="Default select example"
          @change="selectshowdata($event)"
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
          <th>{{ $t("menu_app_view_list_index") }}</th>
          <th>{{ $t("menu_app_view_list_email") }}</th>
          <th>{{ $t("menu_app_view_list_name") }}</th>
          <th>{{ $t("menu_app_view_list_phone") }}</th>
          <th>{{ $t("menu_app_view_iden") }}</th>
          <th>{{ $t("menu_app_view_action") }}</th>
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
          <td>
            <button
              type="button"
              class="btn btn-success mt-0"
              style="background-color: #ce0000"
              @click="del(item)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <div class="dt--pagination" v-if="store.total_page > 0">
        <div
          class="dataTables_paginate paging_simple_numbers"
          id="zero-config_paginate"
        >
          <ul class="pagination">
            <li
              class="paginate_button page-item previous"
              id="zero-config_previous"
            >
              <a
                href="#"
                aria-controls="zero-config"
                data-dt-idx="0"
                tabindex="0"
                class="page-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-arrow-left"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline></svg
              ></a>
            </li>
            <li
              class="paginate_button page-item"
              v-for="page in store.total_page"
              :key="page"
            >
              <a
                href="#"
                aria-controls="zero-config"
                data-dt-idx="1"
                tabindex="0"
                class="page-link"
              >
                {{ page }}</a
              >
            </li>
            <li class="paginate_button page-item next" id="zero-config_next">
              <a
                href="#"
                aria-controls="zero-config"
                data-dt-idx="4"
                tabindex="0"
                class="page-link"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-arrow-right"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline></svg
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

      <div v-if="store.isDelAP" class="modal">
    <div class="modal-content" id="deleteConformationLabel">
      <div class="modal-header">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-trash-2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </div>
        <h5 class="modal-title" id="exampleModalLabel">ต้องการลบรายการนี้?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p class="">หากคุณลบรายกานนี้ รายการนั้นจะหายไปตลอดกาล คุณแน่ใจหรือไม่ว่าต้องการดำเนินการต่อ?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal">Cancel</button>
        <button type="button" class="btn btn-danger" data-remove="task" @click="deletel()">Delete</button>
      </div>
    </div>
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

const { selectentiresap } = AppointStore(); //Action

const backToUser = async () => {
  router.go(-1);
};

const searchData = async () => {
  await store.FetchAP();
};

const selectshowdata = async (x) => {
  await selectentiresap(x.target.value);
  await store.FetchAP();
};

const del = async (item) => {
    store.del_ap = item.ap_id
    store.deluser_id = item.user_id
    store.ardel_id = item.ar_id
    store.isDelAP = true;
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

.dt--pagination {
  float: right;
}
</style>
