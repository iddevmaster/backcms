<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'
import UserEdit from '@/components/users/UserEdit.vue'
import UserDetail from '@/components/users/UserDetail.vue'
import Alert from '@/components/layout/Alert.vue';
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1]
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
                        <li class="breadcrumb-item"><a href="#">{{ $t("menu_user_page") }}</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_user_page_edit") }}</li>
                    </ol>
                </nav>
            </div>
            <Alert v-if="PendingForm"></Alert>
            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">

                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">{{ $t("menu_user_account") }}</button>
                                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">{{ $t("menu_user_detail") }}</button>
                            </div>
                        </nav>
                        <div class="widget-content widget-content-area br-8 p-3 border-top-0">
                            <div class="tab-content mt-4" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                                    <UserEdit></UserEdit>
                                </div>
                                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                                    <UserDetail></UserDetail>
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