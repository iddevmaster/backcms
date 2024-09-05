<template>
  <div class="widget-content widget-content-area br-8 p-3">
    <div class="widget-header">
      <div class="row pt-3">
        <div class="col-xl-10 col-sm-8 col-8">
          <h3>{{ $t("menu_couse_view_table_header_d") }}</h3>
        </div>
        <div class="col-xl-2 col-sm-2 col-4" >
          <button type="button" class="btn btn-primary">
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
         xxx
          </label
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
           xxx</label
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
         xxxxx
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
          xxxxxxxxxxx
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
           xxxxxxxxxxxx
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
         xxxxxxxxxx
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
         xxxxxxxxxxxxxxx
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



</script>


