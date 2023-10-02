<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import ExamqCreate from '@/components/examquestion/ExamqCreate.vue'
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2],
})



</script>

<template>
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
           <li class="breadcrumb-item"><a href="#">{{ $t("menu_page_exam") }} </a></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_exam_all_bt_add_exam") }}</li>
                    </ol>
                </nav>
            </div>

            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="doc-container">
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="widget-content widget-content-area br-8 p-3">
                                    <ExamqCreate></ExamqCreate>
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