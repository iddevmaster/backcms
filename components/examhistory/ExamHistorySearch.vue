<template>


  <div class="row layout-top-spacing">

   <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">{{ $t("user_history_exam") }}</h4>
      </div>
    </div>

    
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
          <!-- <th>
            {{ $t("menu_result_index") }} 
          </th> -->
          <th>{{ $t("menu_result_name") }} &#8597;</th>
          <!-- <th @click="sortList('user_name')">ยูสเซอร &#8597;</th> -->
          <!-- <th @click="sortList('user_email')">อีเมล &#8597;</th> -->
          <th >{{ $t("menu_result_phone") }} &#8597;</th>
          <th>{{ $t("menu_result_status") }}</th>
      
          <!-- <th class="no-content">จัดการ</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(users,index) in store.userall" :key="users.user_id"  @click="Sel(users,users.detail,users.identification_number,users.user_id)" :class="{ 'table-success': store.myChoose === users && (users.detail == 'system_active') || store.myChoose === users && (users.detail == 'phone_active'), 'table-danger': store.myChoose === users && (users.detail != 'system_active') && (users.detail != 'phone_active')}">
          <!-- <td>{{ index + 1 }}</td> -->
         
           <td>{{ users.user_prefrix }}  {{ users.user_firstname }}  {{ users.user_lastname }}</td>
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
            <p class="mb-0 text-success">
         
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


     <div class="row">
    <div class="col-xl-12 col-lg-12">
      <div class="pagination-no_spacing" v-if="store.total_page > 0">
        <ul class="pagination">
          <li> <a href="javascript:void(0);" class="prev"  @click="validatePNumberDown()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="feather feather-chevron-left">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg></a>
          </li>
          <li>
            <div class="col-xs-1">
              <input id="ex1" type="number" style="width:50px" v-model="store.formuser.page" @input="validatePNumber($event)">
            </div>
          </li>
          <li><a href="javascript:void(0);">/</a></li>
          <li><a href="javascript:void(0);">{{ store.total_page }}</a></li>
          <li> <a href="javascript:void(0);" class="next"  @click="validatePNumberUp()" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="feather feather-chevron-right">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg></a>
          </li>
        </ul>
      </div>

      <div class="pagination-no_spacing" v-else>
        <ul class="pagination">
          {{ $t("data_his") }}
        </ul>
      </div>
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
import Swal from 'sweetalert2';
const { locale, setLocale, t } = useI18n();

 

const toast = useToast()
const router = useRouter();
const store = ExamHistoryStore();
  await store.fetchUsers()

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
store.formuser.page = 1;
  await store.fetchUsers()
};

const Fitter = async () => {
  

  if(store.myChoose.detail == 'system_active' || store.myChoose.detail == 'phone_active'){
    store.IsCardNoInsert = false;
  store.IsCardInsert = true;
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  await store.fetchExamlistByUser();

  }else {

    Swal.fire({
      text: 'Please select a user',
      icon: 'error',
    });

  }
  

  
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


const validatePNumberDown = async () => {
  if (store.formuser.page == 1) {

    store.pending = true;
   
    store.formuser.page = 1;
   await store.fetchUsers()
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
 

    store.formuser.page -= 1;
    store.pending = true;
   await store.fetchUsers()
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }
}

const validatePNumberUp = async () => {

  if (store.formuser.page == store.total_page) {
    store.pending = true;
    store.formuser.page = store.total_page;

  await store.fetchUsers()
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
  
    store.formuser.page += 1;
    store.pending = true;
    await store.fetchUsers()
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }
}

const validatePNumber = async (evt) => {
 
  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const keyPressed: string = evt.key;
  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault()
  }
  if(store.formuser.page > store.total_page){
    store.formuser.page = store.total_page
return false;
  }
  if (store.formuser.page == '') {
   
  
    store.pending = true;
    store.formuser.page = 1;
   await store.fetchUsers()
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
    
    store.pending = true;
    await store.fetchUsers()
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }
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
