<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import ErrorUpload from "@/components/course/ErrorUpload.vue";
import { useAuthStore } from "@/store/auth";
import { CourseStore } from "@/store/course";

import { GroupStore } from '@/store/group'
import LearningAddGroup from "@/components/course/LearningAddGroup.vue";
import LearningViewCate from "@/components/course/LearningViewCate.vue";
import { useToast } from "vue-toastification";
import ApiService from "../../../services/api.service";
import { useI18n } from "vue-i18n";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import Swal from "sweetalert2";
import { useVuelidate } from "@vuelidate/core";
import { onMounted } from "vue";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
const { locale, setLocale } = useI18n();
definePageMeta({
  middleware: ["auth", "roles"],
  allowedRoles: [1, 2],
});

const auth = useAuthStore();
const store = CourseStore();
const router = useRouter();
const storegroup = GroupStore()


store.user_id = auth.user_id;
await store.fetchCourseCgId(router.currentRoute.value.params.id);
await storegroup.fetchGrouplist();




onMounted(async () => {
  store.isLoading = false;
});
</script>

<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">{{ $t("menu_couse") }} </a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ $t("menu_exam_history_course") }}
            </li>
          </ol>
        </nav>
      </div>
      <loading v-model:active="store.isLoading" :can-cancel="true" />
      <div class="middle-content container-xxl">
        <div class="row layout-top-spacing">
         
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <LearningAddGroup></LearningAddGroup>
         
         
          </div>
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <LearningViewCate></LearningViewCate>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<style>
.fot-bl{
  font-weight: bold;
}
</style>