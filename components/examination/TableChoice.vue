<template>
  <div class="row layout-top-spacing">

  

  <div class="row layout-top-spacing">


    <div class="col-xl-12 col-lg-3 col-md-3 col-sm-3 mb-4">
      {{ $t("form_exam_new_select_choici") }}
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-bordered">
        <thead>
       
        </thead>
        <tbody>
          <tr  v-for="(item, index) in store.rows">
        <td style="width: 10%;">{{ item.ec_in }}</td>
        <td><input type="text" class="form-control" :placeholder="item.ec" v-model="store.rows[index].ec_name_lo"  maxlength="200"></td>
      </tr>
        </tbody>
    </table>
</div>
</div>
</template>


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { ExamquestionStore } from "@/store/examquestion";
import { useToast } from "vue-toastification";
import ApiService from '../../services/api.service';
import moment from "moment-timezone";
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();
const router = useRouter();

const toast = useToast();
const store = ExamquestionStore();

const user_type = useCookie('user_type'); 

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

.cours_move{

cursor: pointer;
}


</style>