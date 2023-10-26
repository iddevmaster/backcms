<template>

  <div class="table-responsive" > 
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">{{ $t("menu_exam_history_course") }}</th>
          <th scope="col">  {{ $t("menu_exam_history_score_by_user") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_exam_history_total_user") }}</th>
          <th scope="col" > {{ $t("menu_exam_history_name_user") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_exam_history_name_create") }}</th>
        </tr>
      </thead>

      <tbody >
        <tr v-for="item in store.historylist" > 
          <td>{{ item.out_em.em_name }}</td>
          <td>{{ item.er_score_total }}</td>
          <td>{{ item.er_question_total }}</td>
          <td>
            {{ item.out_user.user_firstname }} {{ item.out_user.user_lastname }}
          </td>

          <td>{{ item.crt_date }}</td>
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
import { ExamHistoryStore } from "@/store/examhistory"; // import the auth store we just created
import { useToast } from "vue-toastification";
import ApiService from "../../services/api.service";
const router = useRouter();

const toast = useToast();
const store = ExamHistoryStore();
</script>
<style>
.dt--pagination {
  float: right;
}

/* .modal-content {
  background-color: white;
  padding: 20px;
  width: 70%;
} */

/* @media only screen and (min-width: 576px) {

.modal-content {
background-color: white;
padding: 20px;
width: 100%;
}
} */

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}
</style>