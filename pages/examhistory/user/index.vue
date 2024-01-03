<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import { useAuthStore } from '@/store/auth';
import { ExamHistoryStore } from '@/store/examhistory'; // import the auth store we just created

import ExamHistorySearch from '@/components/examhistory/ExamHistorySearch.vue'
import ExamHistoryByUser from '@/components/examhistory/ExamHistoryByUser.vue'
import ResultNodata from '@/components/result/ResultNodata.vue'


import { AlertStore } from '@/store/alert'; // import the auth store we just created
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2],
})




const auth = useAuthStore()

const store = ExamHistoryStore()


store.myChoose = [];
store.IsCardInsert = false
store.IsCardEdit = false;
store.IsCardNoInsert = false;
store.userall = [];
store.fetchExam();


</script>

<template>
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                     <li class="breadcrumb-item"><a href="#">{{ $t("menu_exam_history_byuser") }}</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_exam_history_byuser_t") }}</li>
                    </ol>
                </nav>
            </div>
            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <ExamHistorySearch></ExamHistorySearch>
                        </div>
                    </div>
                </div>
                <div class="row layout-top-spacing" v-if="store.historylist.length > 0">

                
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing" v-if="store.IsCardInsert">
                        <div class="widget-content widget-content-area br-8 p-3">
                        <ExamHistoryByUser></ExamHistoryByUser>
                        </div>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing" v-if="store.IsCardNoInsert">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <ResultNodata></ResultNodata>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style></style>