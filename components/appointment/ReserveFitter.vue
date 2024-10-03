<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-6 col-md-6 col-sm-6 mb-4">
      <input
        id="t-text"
        type="text"
        name="txt"
           placeholder="ຊື່ / username / ບັດປະຈຳຕົວ/ Passport / ເບີໂທ"
        class="form-control"
        v-model="store.formuser.search"
        @keyup="searchData" maxlength="20"
      />
    </div>
  </div>

  <div class="table-responsive">
    <table
      id="example"
      class="table-bordered styled-table"
      style="width: 100%"
    >
      <thead>
        <tr>
          <th>
            {{ $t("menu_app_view_list_index") }}
        
          </th>
          <th @click="sortList('id')">
            {{ $t("menu_app_view_list_name") }} 
          </th>
          <th @click="sortList('user_phone')">
            {{ $t("menu_app_view_list_username") }}
          </th>
          <th> {{ $t("menu_app_view_list_phone") }} </th>
          <th>{{ $t("menu_app_view_list_iden") }} </th>
        
          <th>{{ $t("menu_app_view_list_last_login") }} </th>
          <th> Action </th>
      
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(users, index) in store.user"
          :key="users.user_id"
        
 
          :class="{ 'selected-row': store.selectedRow.user_id === users.user_id }" 
       
        >
         
          <td id="clickTest">{{ index + 1 }}</td>
          <td>{{ users.user_prefrix }} {{ users.user_firstname }} {{ users.user_lastname }}</td>
          <td>{{ users.user_name }}</td>
          <td>{{ users.user_phone }}</td>
          <td>{{ users.identification_number }}</td>
          <td>{{ users.login_last_date }}</td>

          <td>
            <button
              type="button"
              class="btn btn-success mt-0"
              @click="selectPoint(users)"
            >
            ເລືອກ
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

          <div class="row">
    <div class="col-xl-12 col-lg-12">
      <div class="pagination-no_spacing" v-if="store.total_page_user > 0">
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
          <li><a href="javascript:void(0);">{{ store.total_page_user }}</a></li>
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
          ບໍ່ມີຂໍ້ມູນ

        </ul>
      </div>
    </div>
  </div>

  <!-- <div v-if="store.myChoose" class="alert alert-light-primary alert-dismissible fade show border-0 mb-4" role="alert"> 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"  @click="close()"> 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close" data-bs-dismiss="alert"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button> 
      <strong>Choose User Complete</strong> Lorem Ipsum is simply dummy text of the printing. </div> -->

  <!-- <div class="row mb-4">
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">User</label>
      {{store.myValue}}
      <Select2  v-model="store.myValue"  :options="myOptionsUser" :settings="{ settingOption: value, settingOption: value }"  @change="myChangeEvent($event)" @select="mySelectEvent($event)"/>
    </div>
  </div> -->
 
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { AppointStore } from "@/store/appoint"; // import the auth store we just created
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();

const toast = useToast();
const router = useRouter();
const store = AppointStore();

await store.fetchUse();

const myOptionsUser = JSON.parse(JSON.stringify(store.users));
const myUser = ref();

const backToUser = async () => {
  router.go(-1);
};

const save = async () => {
  if (store.myChoose == null) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "ກະ​ລຸ​ນາ​ເລືອກ",
      showConfirmButton: false,
      timer: 1500,
    });

    return false;
  } else {
    let savere = await store.SaveFormreserve();
    if (savere == true) {
      toast.success("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ");
    //  await store.fetchUsers();
      await store.FetchAP();
    } else {
      toast.error("ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ");
    }
  }
};

const choose = async (item) => {
  let check = await store.CheckVerify(item);
  if (check == true) {
    store.myChoose = item;
     store.user_id_fitter = item.user_id
    await store.FetchAPUser();
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "ຜູ້ໃຊ້ນີ້ຍັງບໍ່ໄດ້ຢືນຢັນຕົວຕົນຂອງເຂົາເຈົ້າສໍາເລັດເທື່ອ.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  // store.myChoose = item;
};


const selectPoint = async (item) => {
await store.SelectUserByApp(item);
store.selectedRow = item; // Store the index of the clicked row
console.log(store.selectedRow);
};

const close = async () => {
  store.myChoose = null;
};
const myChangeEvent = (event) => {
  console.log("myChangeEvent: ", event);
};

const mySelectEvent = (e) => {
  console.log("mySelectEvent: ", e);
};

const searchData = async () => {
  store.myChoose = null;
  store.app_user = [];
  store.formuser.page = 1
  await store.fetchUse();
};




const validatePNumberDown = async () => {
  if (store.formuser.page == 1) {
    store.pending = true;

    store.formuser.page = 1;
   await store.fetchUse()
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
 
    store.formuser.page -= 1;
    store.pending = true;
   await store.fetchUse()
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }
}

const validatePNumberUp = async () => {

  if (store.formuser.page == store.total_page_user) {
    store.pending = true;
    store.formuser.page = store.total_page_user;

  await store.fetchUse()
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {

    store.formuser.page += 1;
    store.pending = true;
    await store.fetchUse()
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
  if(store.formuser.page > store.total_page_user){
    store.formuser.page = store.total_page_user
return false;
  }
  if (store.formuser.page == '') {
   

    store.pending = true;
    store.formuser.page = 1;
    await store.fetchUse()
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
     
    store.pending = true;
     await store.fetchUse()
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }
}
</script>

<style scoped>




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

.selected-row {

  background-color:#f1f1f1
}
.styled-table {
  border-collapse: collapse;
  margin: 25px auto;
  font-size: 18px;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}



.styled-table th,
.styled-table td {
  padding: 12px 15px;
}




</style>
