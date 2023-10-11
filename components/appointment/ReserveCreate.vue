<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="text"
        name="txt"
        placeholder="Search"
        class="form-control"
        required=""
        v-model="store.formuser.search"
        @keyup="searchData"
      />
    </div>
  </div>

  <div class="table-responsive">
    <table
      id="example"
      class="table table-bordered table-hover"
      style="width: 100%"
    >
      <thead>
        <tr>
          <th>
            {{ $t("menu_app_view_list_index") }}
            <!-- <input type="checkbox"  v-model="store.isAllSelected" @click="selectAll"> -->
          </th>
          <th @click="sortList('id')">
            {{ $t("menu_app_view_list_name") }} 
          </th>
          <!-- <th @click="sortList('user_name')">ยูสเซอร &#8597;</th> -->
          <!-- <th @click="sortList('user_email')">อีเมล &#8597;</th> -->
          <th @click="sortList('user_phone')">
            {{ $t("menu_app_view_list_phone") }}
          </th>
          <th>{{ $t("menu_app_view_list_email") }} </th>
          <th>{{ $t("menu_user_c_status") }} </th>
          <!-- <th class="no-content">จัดการ</th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(users, index) in store.userall"
          :key="users.user_id"
          @click="choose(users)"
          :class="{ 'table-success': store.myChoose === users }"
        >
         
          <td id="clickTest">{{ index + 1 }}</td>
          <td>{{ users.user_firstname }} {{ users.user_lastname }}</td>
          <td>{{ users.user_phone }}</td>
          <td>{{ users.user_email }}</td>


          <td v-if="!users.detail">
            <p class="mb-0 text-danger">
              <span v-if="locale == 'la'">{{ $t("unactive") }}</span>
              <span v-if="locale == 'en'">{{ $t("unactive") }}</span>
              <span v-if="locale == 'th'">{{ $t("unactive") }}</span>
            </p>
          </td>
          <td v-if="users.detail == 'unactive'">
            <p class="mb-0 text-danger">
              <span v-if="locale == 'la'">{{ $t("unactive") }}</span>
              <span v-if="locale == 'en'">{{ $t("unactive") }}</span>
              <span v-if="locale == 'th'">{{ $t("unactive") }}</span>
            </p>
          </td>
          <td v-if="users.detail == 'phone_unactive'">
            <p class="mb-0 text-danger">
              <span v-if="locale == 'la'">{{ $t("phone_unactive") }}</span>
              <span v-if="locale == 'en'">{{ $t("phone_unactive") }}</span>
              <span v-if="locale == 'th'">{{ $t("phone_unactive") }}</span>
            </p>
          </td>
          <td v-if="users.detail == 'phone_active'">
            <p class="mb-0 text-danger">
              <span v-if="locale == 'la'">{{ $t("phone_active") }}</span>
              <span v-if="locale == 'en'">{{ $t("phone_active") }}</span>
              <span v-if="locale == 'th'">{{ $t("phone_active") }}</span>
            </p>
          </td>
          <td v-if="users.detail == 'system_unactive'">
            <p class="mb-0 text-danger">
              <span v-if="locale == 'la'">{{ $t("system_unactive") }}</span>
              <span v-if="locale == 'en'">{{ $t("system_unactive") }}</span>
              <span v-if="locale == 'th'">{{ $t("system_unactive") }}</span>
            </p>
          </td>
          <td v-if="users.detail == 'system_active'">
            <p class="mb-0 text-success">
              <span v-if="locale == 'la'">{{ $t("system_active") }}</span>
              <span v-if="locale == 'en'">{{ $t("system_active") }}</span>
              <span v-if="locale == 'th'">{{ $t("system_active") }}</span>
            </p>
          </td>
          <!-- <td>
            <button
              type="button"
              class="btn btn-success mt-0"
              @click="choose(user)"
            >
              เลือก
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>
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
  <button type="button" class="btn btn-primary" @click="save()">บันทึก</button>
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
      title: "กรุณาเลือก",
      showConfirmButton: false,
      timer: 1500,
    });

    return false;
  } else {
    let savere = await store.SaveFormreserve();
    if (savere == true) {
      toast.success("Save Data");
    //  await store.fetchUsers();
      await store.FetchAP();
    } else {
      toast.error("Fail Save Data");
    }
  }
};

const choose = async (item) => {
  let check = await store.CheckVerify(item);
  if (check == true) {
    store.myChoose = item;
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "This user has not yet successfully verified their identity.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  // store.myChoose = item;
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
  await store.fetchUse();
};
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
