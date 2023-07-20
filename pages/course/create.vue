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
                        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                            <div class="widget-content widget-content-area br-8 p-3">
           <CourseCreate></CourseCreate>
                               </div>
                              </div>
                              
 </div>

                </div>

            </div>
          </div>
 
       
</template>

<style>

</style>