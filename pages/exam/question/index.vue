


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { ExamquestionStore } from '@/store/examquestion'
import { useToast } from 'vue-toastification';
import ExamqList from '@/components/examquestion/ExamqList.vue'
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
              
                    <div class="row invoice layout-top-spacing layout-spacing">
                      
                        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                          
                            <div class="widget-content widget-content-area br-8 p-3">
                              <div class="widget-header">
                                    <div class="row">
                                        <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                          <button class="btn btn-primary mb-2 me-4" @click="goToCreatePage()">แบบฟอร์มเพิ่มข้อสอบ</button>
                                        </div>                 
                                    </div>
                                </div>
                              <ExamqList></ExamqList>
                              </div>
                        </div>

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="doc-container">
                                <div class="row">
                                    <div class="col-xl-9">
                                        <div class="invoice-container">
                                            <div class="invoice-inbox">
                                                
                                                <div id="ct" class="">
                                                    
                                                    <div class="invoice-00001">
                                                        <div class="content-section">
        
                                                            <div class="inv--head-section inv--detail-section">
                                                        
                                                                <div class="row">
                                                                    <div class="col-sm-6 col-12 mr-auto">
                                                                        <div class="d-flex">
                                                                            <img class="company-logo" src="../src/assets/img/cork-logo.png" alt="company">
                                                                            <h3 class="in-heading align-self-center">Cork Inc.</h3>
                                                                        </div>
                                                                        <p class="inv-street-addr mt-3">XYZ Delta Street</p>
                                                                        <p class="inv-email-address">info@company.com</p>
                                                                        <p class="inv-email-address">(120) 456 789</p>
                                                                    </div>
                                                                    
                                                                    <div class="col-sm-6 text-sm-end">
                                                                        <p class="inv-list-number mt-sm-3 pb-sm-2 mt-4"><span class="inv-title">Invoice : </span> <span class="inv-number">#0001</span></p>
                                                                        <p class="inv-created-date mt-sm-5 mt-3"><span class="inv-title">Invoice Date : </span> <span class="inv-date">20 Mar 2022</span></p>
                                                                        <p class="inv-due-date"><span class="inv-title">Due Date : </span> <span class="inv-date">26 Mar 2022</span></p>
                                                                    </div>                                                                
                                                                </div>
                                                                
                                                            </div>
        
                                                  
                                                            <div class="inv--product-table-section">
                                                                <div class="table-responsive">
                                                                    <table class="table">
                                                                        <thead class="">
                                                                            <tr>
                                                                                <th scope="col">S.No</th>
                                                                                <th scope="col">Items</th>
                                                                                <th class="text-end" scope="col">Qty</th>
                                                                                <th class="text-end" scope="col">Price</th>
                                                                                <th class="text-end" scope="col">Amount</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td>Calendar App Customization</td>
                                                                                <td class="text-end">1</td>
                                                                                <td class="text-end">$120</td>
                                                                                <td class="text-end">$120</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>Chat App Customization</td>
                                                                                <td class="text-end">1</td>
                                                                                <td class="text-end">$230</td>
                                                                                <td class="text-end">$230</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>3</td>
                                                                                <td>Laravel Integration</td>
                                                                                <td class="text-end">1</td>
                                                                                <td class="text-end">$405</td>
                                                                                <td class="text-end">$405</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>4</td>
                                                                                <td>Backend UI Design</td>
                                                                                <td class="text-end">1</td>
                                                                                <td class="text-end">$2500</td>
                                                                                <td class="text-end">$2500</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            
                                                
     
                                                        </div>
                                                    </div> 
                                                    
                                                </div>
        
        
                                            </div>
        
                                        </div>
    
                                    </div>
    
                                    <div class="col-xl-3">
                                        <div class="invoice-actions-btn">
                                            <div class="invoice-action-btn">
                                                <div class="row">
                                                    <div class="col-xl-12 col-md-3 col-sm-6">
                                                        <a href="javascript:void(0);" class="btn btn-primary btn-send">Send Invoice</a>
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
    
                                </div>
                                
                            </div>
    
                        </div>

                        

            

                        
                    </div>
                </div>
            </div>
          </div>

    
           




    


       
</template>

<style>







</style>