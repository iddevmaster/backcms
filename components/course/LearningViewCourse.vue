<template>
  <div class="widget-content widget-content-area br-8 p-3">
    <div class="widget-header">
      <div class="row pt-3">
        <div class="col-xl-10 col-sm-8 col-8">
          <h3>{{ $t("menu_couse_view_table_header_c") }}</h3>
        </div>
        <div class="col-xl-2 col-sm-2 col-4" style="text-align: center"></div>
      </div>

      <div class="row pt-3">
        <span class="border-bottom"></span>
      </div>
    </div>

    <div class="row pt-3">
      <div class="col-xl-4 col-sm-12 col-12">
        <div class="invoice-detail-title">
          <div class="invoice-logo">
            <div class="profile-image">
              <div class="img-uploader-content" style="text-align: center">
                <img
                  :src="coverimage(course.course_cover)"
                  alt="avatar"
                  class="img-fluid"
                  width="140"
                  height="140"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-8 col-sm-12 col-12">
        <div class="form-group row">
          <h3>
            {{ $t("menu_couse_view_table_course") }} : {{ course.course_code }}
          </h3>
        </div>
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm" style="font-size: 20px;"
          >
            {{ $t("menu_couse_view_table_lesson") }}

            <span style="color: green" v-if="course.is_complete == 1"
              >{{ $t("menu_couse_view_c_is_complete") }}
            </span>

            <span style="color: red" v-else
              >{{ $t("menu_couse_view_c_is_notcomplete") }}
            </span>
          </label>
        </div>

        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm" style="font-size: 20px;"
          >
            {{ $t("menu_couse_view_table_status") }}

            <span style="color: green" v-if="course.active == 1">
             {{ $t("menu_couse_view_c_is_active") }}
            </span>

            <span style="color: red" v-else>
              {{ $t("menu_couse_view_c_is_unactive") }}
            </span>
          </label>
        </div>
      </div>
    </div>

    <div class="row pl-3 pt-3">
      <div class="col-xl-3 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm fot-bl" 
          >
            {{ $t("menu_couse_view_table_name_lo") }}</label
          >
        </div>
      </div>
      <div class="col-xl-9 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm"
          >
            {{ course.course_name_lo }}</label
          >
        </div>
      </div>
    </div>

    <div class="row pl-3">
      <div class="col-xl-3 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm fot-bl"
          >
            {{ $t("menu_couse_view_table_name_eng") }}</label
          >
        </div>
      </div>
      <div class="col-xl-9 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm"
          >
            {{ course.course_name_eng }}</label
          >
        </div>
      </div>
    </div>
    <div class="row pl-3">
      <div class="col-xl-3 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm fot-bl"
          >
            {{ $t("menu_couse_view_table_des") }}</label
          >
        </div>
      </div>
      <div class="col-xl-9 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm"
          >
            {{ course.course_description }}
          </label>
        </div>
      </div>
    </div>

    <div class="row pl-3">
      <div class="col-xl-3 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm fot-bl"
          >
            {{ $t("menu_couse_view_table_if_exam") }}</label
          >
        </div>
      </div>
      <div class="col-xl-9 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm"
          >
            {{ course.course_remark_b }}
          </label>
        </div>
      </div>
    </div>

    <div class="row pl-3">
      <div class="col-xl-3 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm fot-bl"
          >
            {{ $t("menu_couse_view_table_total") }}</label
          >
        </div>
      </div>
      <div class="col-xl-9 col-sm-12 col-12">
        <div class="form-group row">
          <label
            for="company-name"
            class="col-sm-12 col-form-label col-form-label-sm"
            style="color: #0aa7ff"
          >
            {{ $t("menu_couse_view_table_group") }} :
            {{ course.total_course_group }} |
            {{ $t("menu_couse_view_table_lesson_") }} :
            {{ course.total_lesson }} |
            {{ $t("menu_couse_view_table_video") }} : {{ course.total_video }}
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
import ApiService from "../../services/api.service";

const { locale, setLocale } = useI18n();

defineProps({
  course: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const toast = useToast();
const store = CourseStore();

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




