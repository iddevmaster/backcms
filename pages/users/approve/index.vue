


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
import ApiService  from "../../../services/api.service";
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


function coverimage(i) {
  let result = i.slice(0, 6);
if (result === 'static') {
  let im =  ApiService.image(i);
  return im;
}else {
  return i;
}
 }

const delete_userid = async (id) => {
  const deleitem = await store.deleteItem_id(id);
  if (deleitem) {
    toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ');
    await store.fetchUsers()
  } else {
    toast.error('ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ')
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
            <li class="breadcrumb-item"><a href="#">{{ $t("menu_approve") }}</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ $t("page_menu_approve") }}</li>
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
  


</template>

<style scoped>



</style>