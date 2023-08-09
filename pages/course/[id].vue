<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import  CoursetEdit from '@/components/course/CoursetEdit.vue'
definePageMeta({
    middleware: 'auth' // this should match the name of the file inside the middleware directory 
})


</script>

<template>
  <div id="content" class="main-content">
            <div class="layout-px-spacing">
              <div class="page-meta">
                        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Course </a></li>
                                <li class="breadcrumb-item active" aria-current="page">Edit Course</li>
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

<style>

</style>