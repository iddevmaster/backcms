<template>


  <div class="row layout-top-spacing">
    <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
      <input type="text" class="form-control" id="inputEmail3" placeholder="ค้นหา User *" maxlength="10"
      v-model="store.formuser.search" @keyup="searchData"
      >
    </div>

  </div>

    <div class="col-sm-12">
    <div class="table-responsive">
    <table id="example" class="table table-bordered" style="width:100%" >
      <thead>
        <tr>
          <th>
            #
            <!-- <input type="checkbox"  v-model="store.isAllSelected" @click="selectAll"> -->
          </th>
          <th>ชื่อ - นามสกุล &#8597;</th>
          <!-- <th @click="sortList('user_name')">ยูสเซอร &#8597;</th> -->
          <!-- <th @click="sortList('user_email')">อีเมล &#8597;</th> -->
          <th >เบอรโทร &#8597;</th>
          <th>สถานะ</th>
      
          <!-- <th class="no-content">จัดการ</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(users,index) in store.userall" :key="users.user_id"  @click="Sel(users,users.detail,users.identification_number,users.user_id)" :class="{ 'table-success': store.myChoose === users }">
          <td>{{ users.user_id }}</td>
           <td>{{ users.user_firstname }} - {{ users.user_lastname }}</td>
          <td>{{ users.user_phone }}</td>
          <td v-if="users.detail == 'y'">ผ่านการยืนยัน</td>
          <td v-else>ไม่ผ่านการยืนยัน</td>
          <!-- <td>
            <button type="button" class="btn btn-danger">เลือก</button>
          </td> -->
          <!-- <td>{{ user.user_email }}</td> -->
        </tr>
      </tbody>
    </table>

    

  </div>
  </div>





  <!-- <button type="button" class="btn btn-primary" @click="search()">ค้นหา</button> -->
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { ResultStore } from '@/store/result'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
import { doesNotReject } from 'assert';
import { ref, onMounted, onUnmounted } from 'vue';

 

const toast = useToast()
const router = useRouter();
const store = ResultStore();

await store.fetchDlt()


const rules = computed(() => {
  return {
    mr_score: {
      required: helpers.withMessage('The Score field is required', required),
      minLength: minLength(1),
    },
    mr_learn_type: {
      required: helpers.withMessage('The mr_learn_type field is required', required),
      minLength: minLength(1),
    },
    dlt_code: {
      required: helpers.withMessage('The dlt_code field is required', required),
      minLength: minLength(1),
    },
    mr_status: {
      required: helpers.withMessage('The mr_status field is required', required),
      minLength: minLength(1),
    },
    user_id: {
      required: helpers.withMessage('The user_id field is required', required),
      minLength: minLength(1),
    },

  };
});

const searchData = async () => {
  store.myChoose = [];
  store.IsCardInsert = false;
  store.IsCardEdit = false;
  store.IsCardListByUser = false;

  await store.fetchUsers()
};

const Sel = async (users,item,identification_number,id) => {
store.user_id = id;
store.myChoose = users;
store.formeditresult.identification_number = identification_number;
await store.fetchResultByUser()
 if(item == 'y'){
  store.IsCardInsert = true;
  store.IsCardEdit = false;
  store.IsCardNoInsert = false;
  store.formresult.identification_number = identification_number;
  store.identification_number = identification_number
 }else {
  store.IsCardInsert = false;
  store.IsCardEdit = false;
  store.IsCardNoInsert = true;
 }
};

const backToUser = async () => {
  router.go(-1);
}

</script>

<style>
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
}

#image-container img {
  width: 250px;
  height: 250px;
  object-fit: cover;
}

#image-container .delete-button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border: none;
  padding: 2.5px 5px;
  cursor: pointer;
}

#image-container .image-wrapper {
  position: relative;
  display: inline-block;
  margin: 10px;
  border: 1px solid;
}

#image-container {
  width: fit-content;
  min-width: 200px;
  min-height: 200px;
  max-width: 300px;
  max-height: 300px;
}
</style>
