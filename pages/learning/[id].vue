<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import CoursetEdit from '@/components/course/CoursetEdit.vue'
import { useAuthStore } from '@/store/auth'
import { CourseStore } from '@/store/course'
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2],
})

const auth = useAuthStore()

const store = CourseStore()
store.formDataCourse.user_id = auth.user_id
store.formDataEditCourse.user_id = auth.user_id
store.formDatalesson.user_id = auth.user_id
store.formDataeditlesson.user_id = auth.user_id
store.user_id = auth.user_id
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

            </div>

        </div>
    </div>
</template>

<style></style>