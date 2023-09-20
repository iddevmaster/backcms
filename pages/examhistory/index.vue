


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth'
import ExamHistory from '@/components/examhistory/ExamHistory.vue'
import { useModalStore } from '@/store/modal';
import { useToast } from 'vue-toastification';
import { ref } from 'vue';




const auth = useAuthStore()

const toast = useToast()


  
</script>

<template>

  <div id="content" class="main-content">
            <div class="layout-px-spacing">
              <div class="page-meta">
                        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">ประวัติฝึกทดสอบ </a></li>
                                <li class="breadcrumb-item active" aria-current="page">ประวัติฝึกทดสอบ</li>
                            </ol>
                        </nav>
                    </div>
            <ExamHistory></ExamHistory>
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