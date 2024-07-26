


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
import { DltStore } from "@/store/dlt"; // import the auth store we just created
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import ApiService from "../../services/api.service";
import DltCreate from "@/components/dlt/DltCreate.vue";
import DltDelet from "@/components/dlt/DltDelet.vue";
import moment from "moment";
import Datepicker from "vuejs3-datepicker";
import { useVuelidate } from "@vuelidate/core";
import { useI18n } from "vue-i18n";
import Swal from 'sweetalert2';
const { locale, setLocale } = useI18n();

definePageMeta({
  middleware: ["auth", "roles"],
  allowedRoles: [1],
});

const toast = useToast();
const route = useRoute();
const store = DltStore();
const auth = useAuthStore();
const profile = await auth.getProfile();
const storeapp = AppointStore()
store.formadddtl.user_id = route.params.id;
await store.ResetForm();

let finddtl = await store.fetchDlt(route.params.id);
if (finddtl == true) {
} else {
  toast.error("Can not Data");
}
store.mydtla = [];
store.isAdd = true;
store.isEdit = false;

const { FormDlt } = storeToRefs(store);

</script>

<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">{{ $t("menu_dlt_title_manage") }}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ $t("menu_dlt_title_user") }}
            </li>
          </ol>
        </nav>
      </div>

      <DltCreate></DltCreate>

      

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
  width: 400px;
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
  max-width: 500px;
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
 