<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'
import UserEdit from '@/components/users/UserEdit.vue'
import Alert from '@/components/layout/Alert.vue';
definePageMeta({
    middleware: 'auth' // this should match the name of the file inside the middleware directory 
})
const store = usersStore()
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
                        <li class="breadcrumb-item"><a href="#">Users</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Edit User</li>
                    </ol>
                </nav>
            </div>
            <Alert v-if="PendingForm"></Alert>
            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <!-- <UserEdit></UserEdit> -->

                            <nav class="nav">
  <a class="nav-link active" aria-current="page" href="#">Active</a>
  <a class="nav-link" href="#">Link</a>
  <a class="nav-link" href="#">Link</a>
  <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
</nav>

<div id="navSection" data-bs-spy="affix" class="nav  sidenav">
                        <div class="sidenav-content">
                            <a href="#simpleTabs" class="active nav-link">Simple Tabs</a>
                            <a href="#withIcons" class="nav-link">With Icons</a>
                            <a href="#pill" class="nav-link">Pill</a>
                            <a href="#pillWithIcons" class="nav-link">Pill with Icons</a>
                            <a href="#verticalPill" class="nav-link">Vertical Pill</a>
                            <a href="#verticalPilliwthIcons" class="nav-link">Vertical Pill with Icons</a>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>

                

                
            </div>
        </div>
    </div>
</template>

<style></style>