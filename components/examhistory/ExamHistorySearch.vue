<template>


  <div class="row layout-top-spacing">

    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
      <select class="form-select form-select" aria-label="Default select example"  v-model="store.byem_id">
        <option disabled selected :value="0">ເລືອກ</option>
        <option v-for="(events, x) in store.examlist" :value="events.em_id">{{events.em_name}}</option>
      </select>
    </div>
    <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
      <input type="text" class="form-control" id="inputEmail3" placeholder="ຄົ້ນຫາຜູ້ໃຊ້ *" maxlength="10"
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
            {{ $t("menu_result_index") }}
            <!-- <input type="checkbox"  v-model="store.isAllSelected" @click="selectAll"> -->
          </th>
          <th>{{ $t("menu_result_name") }} &#8597;</th>
          <!-- <th @click="sortList('user_name')">ยูสเซอร &#8597;</th> -->
          <!-- <th @click="sortList('user_email')">อีเมล &#8597;</th> -->
          <th >{{ $t("menu_result_phone") }} &#8597;</th>
          <th>{{ $t("menu_result_status") }}</th>
      
          <!-- <th class="no-content">จัดการ</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(users,index) in store.userall" :key="users.user_id"  @click="Sel(users,users.detail,users.identification_number,users.user_id)" :class="{ 'table-success': store.myChoose === users && users.detail == 'system_active' , 'table-danger': store.myChoose === users && users.detail != 'system_active' }">
          <td>{{ users.user_id }}</td>
           <td>{{ users.user_firstname }}  {{ users.user_lastname }}</td>
          <td>{{ users.user_phone }}</td>
          <td v-if="!users.detail">
            
          <p class="mb-0 text-danger">
      <span v-if="locale == 'la'" >{{ $t("unactive") }}</span>
      <span v-if="locale == 'en'" >{{ $t("unactive") }}</span>
      <span v-if="locale == 'th'" >{{ $t("unactive") }}</span>
          </p></td>
          <td v-if="users.detail == 'unactive'">
            <p class="mb-0 text-danger">
              <span v-if="locale == 'la'" >{{ $t("unactive") }}</span>
      <span v-if="locale == 'en'" >{{ $t("unactive") }}</span>
      <span v-if="locale == 'th'" >{{ $t("unactive") }}</span>
          </p></td>
          <td v-if="users.detail == 'phone_unactive'"><p class="mb-0 text-danger">
        
      <span v-if="locale == 'la'" >{{ $t("phone_unactive") }}</span>
      <span v-if="locale == 'en'" >{{ $t("phone_unactive") }}</span>
      <span v-if="locale == 'th'" >{{ $t("phone_unactive") }}</span>
          </p>
          </td>
          <td v-if="users.detail == 'phone_active'">
            <p class="mb-0 text-danger">
         
      <span v-if="locale == 'la'" >{{ $t("phone_active") }}</span>
      <span v-if="locale == 'en'" >{{ $t("phone_active") }}</span>
      <span v-if="locale == 'th'" >{{ $t("phone_active") }}</span>
            </p>
          </td>
          <td v-if="users.detail == 'system_unactive'">
            <p class="mb-0 text-danger">
      <span v-if="locale == 'la'" >{{ $t("system_unactive") }}</span>
      <span v-if="locale == 'en'" >{{ $t("system_unactive") }}</span>
      <span v-if="locale == 'th'" >{{ $t("system_unactive") }}</span>       
            </p>
          </td>
          <td v-if="users.detail == 'system_active'">
            <p class="mb-0 text-success">
       
      <span v-if="locale == 'la'" >{{ $t("system_active") }}</span>
      <span v-if="locale == 'en'" >{{ $t("system_active") }}</span>
      <span v-if="locale == 'th'" >{{ $t("system_active") }}</span>
            
            </p>
          </td>
   
          <!-- <td>
            <button type="button" class="btn btn-danger">เลือก</button>
          </td> -->
          <!-- <td>{{ user.user_email }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
  </div>





  <button type="button" class="btn btn-primary" @click="Fitter()">{{ $t("menu_exam_history_byuser_fitter") }}</button>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { ExamHistoryStore } from '@/store/examhistory'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
import { doesNotReject } from 'assert';
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();

 

const toast = useToast()
const router = useRouter();
const store = ExamHistoryStore();


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

const Fitter = async () => {

  store.IsCardNoInsert = false;
  store.IsCardInsert = true;
  await store.fetchExamlistByUser();


};



const Sel = async (users,item,identification_number,id) => {
store.user_id = id;
store.myChoose = users;


//store.formeditresult.identification_number = identification_number;

//  if(item == 'system_active'){
//   store.IsCardInsert = true;
//   store.IsCardEdit = false;
//   store.IsCardNoInsert = false;
//  // store.formresult.identification_number = identification_number;
//  // store.identification_number = identification_number
//  }else {
//   store.IsCardInsert = false;
//   store.IsCardEdit = false;
//   store.IsCardNoInsert = true;
//  }
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
