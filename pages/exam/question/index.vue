


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { ExamStore } from '@/store/exam'
import { useToast } from 'vue-toastification';

import { required, email, sameAs, minLength, helpers, } from '@vuelidate/validators';





const toast = useToast()
const store = ExamStore()
const router = useRouter();


const goToCreatePage = async () => {
    router.push('/exam/question/create');
 };



 
 










</script>

<template>

  <div id="content" class="main-content">
            <div class="layout-px-spacing">
              <div class="page-meta">
                        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Exam </a></li>
                                <li class="breadcrumb-item active" aria-current="page">Exam Question</li>
                            </ol>
                        </nav>
                    </div>
                  

            <div class="middle-content container-xxl p-0">
              
                    <div class="row layout-top-spacing">
                      
                        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                          
                            <div class="widget-content widget-content-area br-8 p-3">
                              <div class="widget-header">
                                    <div class="row">
                                        <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                          <button class="btn btn-primary mb-2 me-4" @click="goToCreatePage()">แบบฟอร์มเพิ่มข้อสอบ</button>
                                        </div>                 
                                    </div>
                                </div>
                              <ExamList></ExamList>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

    
           
<ExamCreate></ExamCreate>
<ExamEdit></ExamEdit>



    


       
</template>

<style>







</style>