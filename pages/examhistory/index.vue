


<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { ExamStore } from '@/store/exam'
import { useAuthStore } from '@/store/auth'
import ExamHistory from '@/components/examhistory/ExamHistory.vue'

import { useToast } from 'vue-toastification';
import { required, email, sameAs, minLength, helpers, } from '@vuelidate/validators';

definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2],
})


const toast = useToast()
const store = ExamStore()
const auth = useAuthStore()
const profile = await auth.getProfile();
store.ResetFetch();
store.formexam.user_id = auth.user_id
store.formexamedit.user_id = auth.user_id
store.user_id = auth.user_id

const { GetopenModal } = storeToRefs(store); //Get Getter
const { GetopenModalCreate } = storeToRefs(store); //Get Getter
const { OpenFormInser } = ExamStore();//Action
const { GetExamDelId } = storeToRefs(store); //Get Getter
const { deleteExam } = ExamStore();//Action

const OpenFormInsert = async () => {
    await store.OpenFormInser()
};

const closeModal = async () => {
    await store.closeModal()
};

const Deleteexam = async (item) => {
    const a = await deleteExam(item);
    await store.fetchExamlist()
};


</script>

<template>
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">{{ $t("menu_exam_history") }} </a></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_exam_history_all") }}</li>
                    </ol>
                </nav>
            </div>


            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                        
                            <ExamHistory></ExamHistory>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


   
</template>

<style></style>