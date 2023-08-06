


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { ExamquestionStore } from '@/store/examquestion'
import { useToast } from 'vue-toastification';
import ExamqList from '@/components/examquestion/ExamqList.vue'
import { required, email, sameAs, minLength, helpers, } from '@vuelidate/validators';
import { useRoute } from 'vue-router'




const toast = useToast()
const store = ExamquestionStore()


const route = useRoute()
const router = useRouter();

store.em_id = route.params.id;

let em_id = localStorage.getItem('em_id')
let em_name = localStorage.getItem('em_name')


const goToCreatePage = async () => {
    router.push('/exam/question/create/');
 };
 const goToExmPage = async () => {
    router.push('/exam');
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
              
                    <div class="row invoice layout-top-spacing layout-spacing">
                      
                        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                          
                            <div class="widget-content widget-content-area br-8 p-3">
                              <!-- <div class="widget-header">
                                    <div class="row">
                                        <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                          <button class="btn btn-primary mb-2 me-4" @click="goToCreatePage()">แบบฟอร์มเพิ่มข้อสอบ</button>
                                        </div>           
                                              
                                    </div>
                                </div> -->
                              <ExamqList></ExamqList>
                              </div>
                        </div>

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        
                            <div class="doc-container">
                                <div class="row">
                                    <div class="col-xl-9" v-if="store.eq != 0">
                                        <div class="invoice-container">
                                            <div class="invoice-inbox">
                                                
                                                <div id="ct" class="">
                                                    
                                                    <div class="invoice-00001">
                                                      
                                                        
                                                        <div class="content-section"  v-if="store.eq != 0">
        
                                                            <div class="inv--head-section inv--detail-section" >
                                                    
                                                                <div class="row" v-for="(quest, indexs) in store.eq" :key="indexs">
                                                                    <div class="col-sm-6 col-12 mr-auto">
                                                                        <div class="d-flex">
                                                                            <img class="company-logo" src="../src/assets/img/cork-logo.png" alt="company">
                                                                            <h3 class="in-heading align-self-center">คำถาม {{ quest.eq_name }}   {{store.eq.length}} </h3>
                                                                        </div>
                                                                       
                                                                    </div>
                                                                    
                                                                    <div class="col-sm-6 text-sm-end">
                                                                        <p class="inv-list-number mt-sm-3 pb-sm-2 mt-4"><span class="inv-title">Answer : </span> <span class="inv-number">{{ quest.eq_answer }}</span></p>
                                                                       
                                                                    </div>                                                                
                                                                </div>
                                                                
                                                            </div>

                                                            <div class="inv--detail-section inv--customer-detail-section">
    
                                                                <div class="row">
    
                                                                    <div class="col-xl-8 col-lg-7 col-md-6 col-sm-4 align-self-center" v-for="(exams, x) in store.exam" :key="x">
                                                                        <p class="inv-to">ข้อสอบหลักสูตร : {{exams.em_name}}</p>
                                                                    </div>

                                                                </div>
                                                                
                                                            </div>
        
                                                  
                                                            <div class="inv--product-table-section">
                                                                <div class="table-responsive" v-if="store.choicelist">
                                                                    <table class="table">
                                                                        <thead class="">
                                                                            <tr>
                                                                                <th scope="col">ลำดับ</th>
                                                                                <th scope="col">คำตอบ</th>
                                                                                <th class="text-end" scope="col">รูปภาพ</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr v-for="(item, index) in store.choicelist" :key="index">
                                                                                <td>{{index + 1}}</td>
                                                                                <td>{{item.ec_name}}</td>
                                                                                <td class="text-end">{{item.ec_image}}</td>
                                                                                
                                                                            </tr>
                                                                           
                                                                        </tbody>
                                                                    </table>

                                                               
                                                                  
                                                                </div>
                                                                 <div class="no-d" v-else>
                                                                     ไม่มีข้อมูล
                                                                   </div>
                                                            </div>
                                                            
                                                
     
                                                        </div>
                                                     

                                                      
                                                    </div> 
                                                    
                                                </div>
        
        
                                            </div>
        
                                        </div>
    
                                    </div>
    
                                    <div class="col-xl-3" v-if="store.eq != 0">
                                        <div class="invoice-actions-btn">
                                            <div class="invoice-action-btn">
                                                <div class="row">
                                                    <div class="col-xl-12 col-md-3 col-sm-6">
                                                        <a href="javascript:void(0);" class="btn btn-primary btn-send" @click="goToCreatePage()">แบบฟอร์มเพิ่มข้อสอบ</a>
                                                    </div>
                                                    <div class="col-xl-12 col-md-3 col-sm-6">
                                                        <a href="javascript:void(0);" class="btn btn-secondary btn-print  action-print">Print</a>
                                                    </div>
                                                    <div class="col-xl-12 col-md-3 col-sm-6">
                                                        <a href="javascript:void(0);" class="btn btn-success btn-download">Download</a>
                                                    </div>
                                                    <div class="col-xl-12 col-md-3 col-sm-6">
                                                        <a href="./app-invoice-edit.html" class="btn btn-dark btn-edit">Edit</a>
                                                    </div>
                                                </div>

                                            </div>
                                            
                                        </div>
                                        
                                    </div>

                                    
                                    <div class="col-xl-12" v-else>
                                        <div class="invoice-actions-btn">
                                            <div class="invoice-action-btn">
                                                <div class="row">
                                                    <div class="col-xl-12 col-md-3 col-sm-6">
                                                        <a href="javascript:void(0);" class="btn btn-danger btn-send"  @click="goToExmPage()">กลับสู่หน้าหลักสูตร</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                     
                                    </div>
                                </div>                               
                            </div>
    
                        </div>
                        
                    </div>
                </div>
            </div>
          </div>

    
           




    
</template>

<style>



.no-d{
     text-align: center;
  border: 3px solid green;
}



</style>