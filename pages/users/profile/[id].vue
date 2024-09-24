


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'
import { useModalStore } from '@/store/modal';
import Profile from "@/components/users/Profile.vue";


import Alert from '@/components/layout/Alert.vue';
import { useToast } from 'vue-toastification'
import ApiService  from "../../../services/api.service";
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2]
})
const toast = useToast()
const store = usersStore()
const auth = useAuthStore()
const router = useRouter();
store.user_id = auth.user_id
await store.fetchUsersByOneAdminProfile(router.currentRoute.value.params.id);
await store.fetchUsersByOneComment();

await store.fetchUsersLog(router.currentRoute.value.params.id);

await store.fetchUsersLogApporv(router.currentRoute.value.params.id);



</script>





<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">

   
      <div class="middle-content container-xxl">
        <div class="row layout-top-spacing">
         
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <Profile  ></Profile>
          </div>
          
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<style  scoped>


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
  width: 60%;
  height: 65%;
}
.modal-body {
  overflow-y: scroll;
  flex-direction: column;
  gap: 10px;
}

.content-text {
  min-width: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: large;
  text-align: center;
  margin-top: 20px;
}
.modal-image {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5%;
}
.modal-image > div {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.modal-image > div > img {
  max-width: 400px;
}
@media  (max-width: 740px) {
  .modal-image > div > img {
    max-width: 200px;
  }
  .content-text {
    font-size:small;
  }
}
</style>