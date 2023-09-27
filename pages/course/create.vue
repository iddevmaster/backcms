<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { CourseStore } from "@/store/course";
import { useAuthStore } from '@/store/auth';
import CourseCreate from "@/components/course/CourseCreate.vue";
import Loading from "@/components/layout/Success.vue";

definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2],
})

const auth = useAuthStore()
const store = CourseStore();
console.log();
store.formDataCourse.user_id = auth.user_id
store.formDataEditCourse.user_id = auth.user_id
store.formDatalesson.user_id = auth.user_id
store.formDataeditlesson.user_id = auth.user_id
store.user_id = auth.user_id
store.ResetForm()
const { Pending } = storeToRefs(store); //Get Getter
</script>

<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">คอร์ส </a></li>
            <li class="breadcrumb-item active" aria-current="page">
              เพิ่มคอร์ส
            </li>
          </ol>
        </nav>
      </div>
      <Loading v-if="Pending"></Loading>
      <div class="middle-content container-xxl p-0">
        <div class="row layout-top-spacing">
          <div class="doc-container">
            <div class="row">
              <div class="col-xl-12">
                <div class="widget-content widget-content-area br-8 p-3">
                  <CourseCreate></CourseCreate>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>