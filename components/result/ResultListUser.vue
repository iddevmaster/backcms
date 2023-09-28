<template>


<div class="widget-header">
  <div class="row">
      <div class="col-xl-12 col-md-12 col-sm-12 col-12">
          <h4>{{ $t("menu_result_form") }}</h4>
      </div>
  </div>
</div>
<div class="table-responsive">
    <table class="table text-center" v-if="store.resultUser.length > 0">
      <thead>
        <tr>
          <th scope="col">{{ $t("menu_result_index") }}</th>
          <th scope="col">{{ $t("menu_result_score") }}</th>
          <th scope="col">{{ $t("menu_result_type") }}</th>
          <th scope="col">{{ $t("menu_result_form_type_dlt") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_result_status") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_result_create") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_result_action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event, index) in store.resultUser" >
          <td>{{ index + 1 }}</td>
          <td>{{ event.mr_score }}</td>
          <td>
            <span v-if="event.mr_learn_type == 1"> {{ $t("menu_learn_theory") }} </span>
            <span v-else> {{ $t("menu_learn_practice") }} </span>
          </td>
          <td>
            {{ format_dlt(event.dlt_code) }}
          </td>
         
          <td v-if="event.mr_status == 'fail'">{{ $t("menu_fail") }}</td>
          <td v-else>{{ $t("menu_pass") }}</td>
          <td>{{ event.crt_date }}</td>
          <td>
            <button
              type="button"
              class="btn btn-success mt-0 mx-1"
              style="background-color: #bfe20b"
              @click="edit(event)" >
              <i class="bi bi-gear"></i>
            </button>

            <button
              type="button"
              class="btn btn-success mt-0 mx-1"
              style="background-color: #ce0000"
              @click="del(event.mr_id)" >
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';

import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { ResultStore } from "@/store/result";

import { useToast } from "vue-toastification";


const router = useRouter();
const toast = useToast();
const store = ResultStore();


const { deleteItem } = ResultStore(); //Action


// store.fetchAppointment()

const del = async (item) => {
  store.mr_id = item;
  store.modaldelete = true
 //
};


const edit = async (item) => {

  store.IsCardEdit = true;
  store.mr_id = item.mr_id;
  store.formeditresult.mr_score = item.mr_score 
  store.formeditresult.dlt_code = item.dlt_code 
  store.formeditresult.mr_status = item.mr_status 
  store.formeditresult.mr_learn_type = item.mr_learn_type 
  //store.identification_number = item.identification_number
 //
};

const format_dlt = (evnet_dlt) => {

let obj = store.dtla.find(o => o.dlt_code === evnet_dlt);
return obj.dlt_description;
};



</script>
<style>
.dt--pagination {
  float: right;
}
.cateSelect {
  font-size: 20px;
  width: 100%;
  font-weight: bold;
  text-align: center;
  --bs-form-select-bg-img: "";
  border: 1px solid rgb(199, 199, 199);
  
}
.cateSelect:hover {
  
}
.type {
  width: fit-content;
}
.typeSelect {
  padding: 5px;
}
.vuejs3-datepicker__value {
  padding: 5px !important;
  height: 100% !important;
  width: 100%;
}
table {
  border-collapse: collapse !important;
}
.vuejs3-datepicker {
  width: 100%;
}
.picker {
  min-width: fit-content;
}
</style>