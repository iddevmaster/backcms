<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import CoursetEdit from '@/components/course/CoursetEdit.vue'
import SelectListLesson from "@/components/course/SelectListLesson.vue";
import ListLesson from "@/components/course/ListLesson.vue";
import { useAuthStore } from '@/store/auth'
import { CourseStore } from '@/store/course'
import { LessonStore } from '@/store/lesson'
   import { useToast } from "vue-toastification";
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2],
})

const auth = useAuthStore()
const store = CourseStore()
const storelesson = LessonStore()
   const router = useRouter();
    const toast = useToast();
store.formDataCourse.user_id = auth.user_id
store.formDataEditCourse.user_id = auth.user_id
store.formDatalesson.user_id = auth.user_id
store.formDataeditlesson.user_id = auth.user_id
store.user_id = auth.user_id
storelesson.formsearchlesson.per_page = 5
storelesson.formsearchlesson.page = 1
storelesson.formsearchlesson.search = "";
await store.fetchCourseId(router.currentRoute.value.params.id);
await store.fetchLessonInCourseId();
const lessonlist = await storelesson.fetchLessonlist();
if (lessonlist === false) {
  await toast.error("Error Data Contact Admin", {
    timeout: 30000,
  });
}

</script>

<template>
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">{{ $t("menu_couse") }}  </a></li>
                        <li class="breadcrumb-item active" aria-current="page"> {{ $t("menu_couse_edit") }}</li>
                    </ol>
                </nav>
            </div>

            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">

                        <div class="widget-content widget-content-area br-8 p-3">
                            <CoursetEdit></CoursetEdit>
                        </div>
                    </div>

                </div>

                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">

                        <div class="widget-content widget-content-area br-8 p-3">
                            <SelectListLesson></SelectListLesson>
                        </div>
                    </div>

                </div>

                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <ListLesson></ListLesson>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<style></style>