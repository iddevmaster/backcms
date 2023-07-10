<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'
import  UserCreate from '@/components/users/UserCreate.vue'

import Loading from '@/components/layout/Success.vue';


const store = usersStore()
const { posts } = storeToRefs(usersStore())
  const { Pending } = storeToRefs(store); //Get Getter
</script>

<template>
  <div id="content" class="main-content">
            <div class="layout-px-spacing">
              <div class="page-meta">
                        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Users</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Add User</li>
                            </ol>
                        </nav>
                    </div>
<Loading v-if="Pending"></Loading>

                <div class="middle-content container-xxl p-0">
                    <div class="row layout-top-spacing">
                        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
          
                            <div class="widget-content widget-content-area br-8 p-3">
           <UserCreate></UserCreate>
                               </div>
                              </div>
                              
 </div>

                </div>

            </div>
          </div>
 
       
</template>

<style>

</style>