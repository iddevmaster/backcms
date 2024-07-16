<template>
  <div class="widget-content widget-content-area br-8 p-3">
    <div class="widget-header">
      <div class="row pt-3">
        <div class="col-xl-10 col-sm-8 col-8">
          <h3>{{ $t("menu_couse_view_table_header_d") }}</h3>
        </div>
        <div class="col-xl-2 col-sm-2 col-4" >
          <button type="button" class="btn btn-primary" @click="MyExam(id)">
            {{ $t("menu_couse_view_d_name_bt_") }}
          </button>
        </div>
      </div>

      <div class="row pt-3">
        <span class="border-bottom"></span>
      </div>
    </div>

    <div class="row pl-3 pt-3">
      <div class="col-xl-4 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm fot-bl"
          >
            {{ $t("menu_couse_view_d_code") }}</label
          >
        </div>
      </div>
      <div class="col-xl-8 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm"
          >
          </label
          >
        </div>
      </div>
    </div>
{{ id }}
    <div class="row pl-3">
      <div class="col-xl-4 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm fot-bl"
          >
            {{ $t("menu_couse_view_d_name_lo") }}</label
          >
        </div>
      </div>
      <div class="col-xl-8 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm"
          >
            {{ exam.em_name_lo }}</label
          >
        </div>
      </div>
    </div>
    <div class="row pl-3">
      <div class="col-xl-4 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm fot-bl"
          >
            {{ $t("menu_couse_view_d_name_eng") }}</label
          >
        </div>
      </div>
      <div class="col-xl-8 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm"
          >
            {{ exam.em_name_eng }}
          </label>
        </div>
      </div>
    </div>

    <div class="row pl-3">
      <div class="col-xl-4 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm fot-bl"
          >
            {{ $t("menu_couse_view_d_name_dlt") }}</label
          >
        </div>
      </div>
      <div class="col-xl-8 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm"
          >
            {{ exam.dlt_desc.dlt_code }} : {{ exam.dlt_desc.dlt_name_lo }}
          </label>
        </div>
      </div>
    </div>

    <div class="row pl-3">
      <div class="col-xl-4 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm fot-bl"
          >
            {{ $t("menu_couse_view_d_name_des") }}</label
          >
        </div>
      </div>
      <div class="col-xl-8 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm"
          >
            {{ exam.em_description }}
          </label>
        </div>
      </div>
    </div>

    <div class="row pl-3">
      <div class="col-xl-4 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm fot-bl"
          >
            {{ $t("menu_couse_view_d_name_ex_time") }}</label
          >
        </div>
      </div>
      <div class="col-xl-8 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm"
          >
            {{ exam.em_time }}
          </label>
        </div>
      </div>
    </div>

    <div class="row pl-3">
      <div class="col-xl-4 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm fot-bl"
          >
            {{ $t("menu_couse_view_d_name_em_e") }}</label
          >
        </div>
      </div>
      <div class="col-xl-8 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm"
          >
            {{ exam.em_measure }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { CourseStore } from "@/store/course";
import { LessonStore } from "@/store/lesson";
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import "vue-select/dist/vue-select.css";

import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
const { locale, setLocale } = useI18n();

defineProps({
  exam: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  id: {
    type: Number,
    required: false,
    default: () => ({}),
  },
});

const toast = useToast();
const store = CourseStore();
const router = useRouter();

const MyExam = async (id) => {
  await router.push("/learning/exam/" + id);
}

</script>


