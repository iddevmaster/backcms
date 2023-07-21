<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import  CourseCreate from '@/components/course/CourseCreate.vue'


</script>

<template>
  <div id="content" class="main-content">
            <div class="layout-px-spacing">
              <div class="page-meta">
                        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Course </a></li>
                                <li class="breadcrumb-item active" aria-current="page">Add Course</li>
                            </ol>
                        </nav>
                    </div>

                <div class="middle-content container-xxl p-0">
                    <div class="row layout-top-spacing">
                        <!-- <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                            <div class="widget-content widget-content-area br-8 p-3">
           <CourseCreate></CourseCreate>
                               </div>
                              </div>
                               -->

                               <div class="doc-container">
    <div class="row">
        <div class="col-xl-12">
     <div class="widget-content widget-content-area br-8 p-3">
    <CourseCreate></CourseCreate>
    </div>
   
        </div>

        <!-- <div class="col-xl-3">
            <div class="invoice-actions">
                <div class="invoice-action-discount">
                    <div class="invoice-action-discount-fields">
              
                      
                    </div>

                </div>

            </div>

            <div class="invoice-actions-btn">

                <div class="invoice-action-btn">

                    <div class="row">
                        <div class="col-xl-12 col-md-4">
                            <a href="javascript:void(0);" class="btn btn-primary btn-send _effect--ripple waves-effect waves-light">Send Invoice</a>
                        </div>
                        <div class="col-xl-12 col-md-4">
                            <a href="./app-invoice-preview.html" class="btn btn-secondary btn-preview _effect--ripple waves-effect waves-light">Preview</a>
                        </div>
                        <div class="col-xl-12 col-md-4">
                            <a href="javascript:void(0);" class="btn btn-success btn-download _effect--ripple waves-effect waves-light">Save</a>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </div> -->
    </div>
    
    
</div>
 </div>


                </div>

            </div>
          </div>
 
       
</template>

<style>

</style>