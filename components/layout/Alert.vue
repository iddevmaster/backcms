

<template>
                    <div class="alert alert-light-success alert-dismissible fade show border-0 mb-4" role="alert" v-if="AlertTextForm == 'success'"> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close" data-bs-dismiss="alert"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button> <strong>Success!</strong> Save success
 </div>
                    <div class="alert alert-light-danger alert-dismissible fade show border-0 mb-4" role="alert" v-else> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close" data-bs-dismiss="alert"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button> <strong>Failed!</strong> Failed to save data </div>

  </template>





<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'

const store = usersStore()
const { posts } = storeToRefs(usersStore())

const { Pending } = storeToRefs(store); //Get Getter
  const { AlertTextForm } = storeToRefs(store); //Get Getter

  
</script>




  
  
  
