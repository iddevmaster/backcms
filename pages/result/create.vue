<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import { useAuthStore } from '@/store/auth';
import { ResultStore } from '@/store/result';
import ResultCreate from '@/components/result/ResultCreate.vue'
import ResultSearch from '@/components/result/ResultSearch.vue'
import ResultNodata from '@/components/result/ResultNodata.vue'


import { AlertStore } from '@/store/alert'; // import the auth store we just created
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1],
})




const auth = useAuthStore()

const store = ResultStore()

store.ResetFetch()
store.myChoose = [];
store.IsCardInsert = false
store.IsCardEdit = false;
store.IsCardNoInsert = false;
store.userall = [];

</script>

<template>
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                     <li class="breadcrumb-item"><a href="#">{{ $t("menu_result_form") }}</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_result_form_create") }}</li>
                    </ol>
                </nav>
            </div>
            
            <div class="middle-content container-xxl p-0">

                          <div class="row layout-top-spacing">
                        <div class="widget-content widget-content-area br-8 p-3 text-danger">
                            {{ $t("choose_user_edit_t") }} <b><u>{{ $t("choose_user_edit_verify") }}</u></b> {{ $t("choose_user_edit_e") }}
                        </div>
                    </div>
            
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <ResultSearch></ResultSearch>
                        </div>
                    </div>
                </div>
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing" v-if="store.IsCardInsert">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <ResultCreate></ResultCreate>
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