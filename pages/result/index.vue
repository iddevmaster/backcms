


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import ResultList from '@/components/result/ResultList.vue';
import { ResultStore } from '@/store/result';

import { useToast } from 'vue-toastification'
definePageMeta({
  middleware: 'auth' // this should match the name of the file inside the middleware directory 
})
const toast = useToast()
const store = ResultStore()


</script>

<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Users</a></li>
            <li class="breadcrumb-item active" aria-current="page">User List</li>
          </ol>
        </nav>
      </div>
      <div class="middle-content container-xxl p-0">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
            <div class="widget-content widget-content-area br-8 p-3">
              <ResultList></ResultList>

            
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  width: 50%;
}

button {
  margin-top: 10px;
}
</style>