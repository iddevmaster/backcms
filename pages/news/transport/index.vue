


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { newTransportStore } from '@/store/newstransport'
import TransportList from '@/components/Newstransport/TransportList.vue'
import { useModalStore } from '@/store/modal';
import Loading from '@/components/layout/Success.vue';
import Alert from '@/components/layout/Alert.vue';
definePageMeta({
    middleware: 'auth' // this should match the name of the file inside the middleware directory 
})

const store = newTransportStore()
const { posts } = storeToRefs(newTransportStore())
  const { deleteItem } = newTransportStore();//Action
  const { selectall } = newTransportStore(); //Action
  const { selectone } = newTransportStore();//Action
  const { getSelect } = storeToRefs(store); //Get Getter
  const { getSelectALL } = storeToRefs(store); //Get Getter
  const modalStore = useModalStore();
  const { GetopenModal } = storeToRefs(store); //Get Getter
  const { GetopenModal_ID } = storeToRefs(store); //Get Getter

  const { Pending } = storeToRefs(store); //Get Getter

  const closeModal = () => {
    store.closeModal();
  };


const delete_userid = async (id) => {
  await store.deleteItem_id(id);
  await store.fetchNewTransport()
  };
  
</script>

<template>

  <div id="content" class="main-content">
            <div class="layout-px-spacing">
              <div class="page-meta">
                        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">ข่าวสารกรมขนส่ง </a></li>
                                <li class="breadcrumb-item active" aria-current="page">ข่าวสารกรมขนส่งทั้งหมด</li>
                            </ol>
                        </nav>
                    </div>
                
                <Loading v-if="Pending"></Loading>
                
                <div class="middle-content container-xxl p-0">
                    <div class="row layout-top-spacing">
                        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                            <div class="widget-content widget-content-area br-8 p-3">
                           
                              <TransportList></TransportList>
                               
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </div>
                                    <h5 class="modal-title" id="exampleModalLabel">ต้องการลบรายการนี้?</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p class="">หากคุณลบรายกานนี้ รายการนั้นจะหายไปตลอดกาล คุณแน่ใจหรือไม่ว่าต้องการดำเนินการต่อ?</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal" >Cancel</button>
                                    <button type="button" class="btn btn-danger" data-remove="task" @click="delete_userid(GetopenModal_ID)">Delete</button>
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