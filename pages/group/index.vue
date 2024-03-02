


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { GroupStore } from '@/store/group'
import { useAuthStore } from '@/store/auth'
import GroupList from '@/components/group/GroupList.vue'
import GroupCreate from '@/components/group/GroupCreate.vue'

import { useToast } from 'vue-toastification';
import { ref } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2]
})

const auth = useAuthStore()
const store = GroupStore()
const toast = useToast();
store.formcreategroup.user_id = auth.user_id

 store.fetchGrouplist();
  const closeModal = () => {
    //store.closeModal();
  };



</script>

<template>
   <loading v-model:active="store.isLoading" :can-cancel="true"
                />
  <div id="content" class="main-content">
            <div class="layout-px-spacing">
              <div class="page-meta">
                        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"> {{ $t("title_group") }} </a></li>
                                <li class="breadcrumb-item active" aria-current="page"> {{ $t("title_group_t") }}</li>
                            </ol>
                        </nav>
                    </div>
            <GroupList></GroupList>
            </div>
          </div>

 <GroupCreate></GroupCreate>
    <!-- <LessonEdit></LessonEdit> -->
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