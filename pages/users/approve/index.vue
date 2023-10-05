


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'
import Approve from '@/components/users/Approve.vue'
import { useModalStore } from '@/store/modal';
import Loading from '@/components/layout/Success.vue';
import Alert from '@/components/layout/Alert.vue';
import { useToast } from 'vue-toastification'
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1]
})
const toast = useToast()
const store = usersStore()

const { getSelect } = storeToRefs(store); //Get Getter
const { getSelectALL } = storeToRefs(store); //Get Getter
const modalStore = useModalStore();
const { GetopenModal } = storeToRefs(store); //Get Getter
const { GetopenModal_ID } = storeToRefs(store); //Get Getter
const { Pending } = storeToRefs(store); //Get Getter


const closeModal = () => {
  store.closeModal();
};

const closeModalView = () => {
  store.PopupIdcard = false;
};

const delete_userid = async (id) => {
  const deleitem = await store.deleteItem_id(id);
  if (deleitem) {
    toast.success('Save Data');
    await store.fetchUsers()
  } else {
    toast.error('Fail Save Data')
  }
  // await store.fetchUsers()
};

</script>

<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">{{ $t("menu_user_page") }}</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_user_page_all") }}</li>
          </ol>
        </nav>
      </div>
      <Loading v-if="Pending"></Loading>
      <div class="middle-content container-xxl p-0">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
            <div class="widget-content widget-content-area br-8 p-3">
              <Approve></Approve>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="GetopenModal" class="modal">
    <div class="modal-content" id="deleteConformationLabel">
      <div class="modal-header">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-trash-2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </div>
        <h5 class="modal-title" id="exampleModalLabel">{{ $t("delete_record") }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
      <div class="modal-body ">
        <p class="">{{ $t("delete_record_t") }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal">Cancel</button>
        <button type="button" class="btn btn-danger" data-remove="task" @click="delete_userid(GetopenModal_ID)">Delete {{
          GetopenModal_ID }}</button>
      </div>
    </div>
  </div>


  <div v-if="store.PopupIdcard" class="modal">
    <div class="modal-content" id="deleteConformationLabel">

      <div class="modal-body d-flex w-100">
      
        <div class="w-100 modal-image">
          <img src="data:image/jpeg;base64,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" alt="">
          <img src="data:image/jpeg;base64,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" alt="">
        </div>
        <div class="w-100 content-text">
          <p class="">ที่อยู่ : {{ store.display_user.detail.user_address }} {{ store.display_user.detail.location.zipcode_name }} {{ store.display_user.detail.location.province_name }}  {{ store.display_user.detail.country.capital_name_eng }}</p>
          <p class="">หมายเลขบัตร : {{ store.display_user.detail.identification_number }}</p>
          <p class="">วันเกิด : {{ store.display_user.detail.user_birthday }}</p>
        </div>

        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModalView">Cancel</button>
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
.modal-content {
  width: 80%;
  height: 80%;
}
.modal-body {
  overflow-y: scroll;
  gap: 10px;
}

.content-text {
  min-width: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
.modal-image {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
@media screen and (max-width: 1403px) {
  .modal-body {
    flex-wrap: wrap;
  }
}
</style>