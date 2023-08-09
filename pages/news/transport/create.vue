<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import  NewsCreate from '@/components/Newstransport/TransportCreate.vue'
import Alert from '@/components/layout/Alert.vue';

definePageMeta({
    middleware: 'auth' // this should match the name of the file inside the middleware directory 
})

const store = newTransportStore()
const { posts } = storeToRefs(usersStore())
const { PendingForm } = storeToRefs(store); //Get Getter
const { AlertTextForm } = storeToRefs(store); //Get Getter
</script>

<template>
  <div id="content" class="main-content">
            <div class="layout-px-spacing">
              <div class="page-meta">
                        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">News </a></li>
                                <li class="breadcrumb-item active" aria-current="page">Add News Transport</li>
                            </ol>
                        </nav>
                    </div>
<Alert></Alert>
                <div class="middle-content container-xxl p-0">
                    <div class="row layout-top-spacing">
                        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
          
                            <div class="widget-content widget-content-area br-8 p-3">
           <NewsCreate></NewsCreate>
                               </div>
                              </div>
                              
 </div>

                </div>

            </div>
          </div>
 
       
</template>

<style>

</style>