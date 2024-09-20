<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-4 col-md-4 col-sm-4 mb-4">
      <input
        id="t-text"
        type="text"
        name="txt"
        placeholder="ຊື່ / username / ບັດປະຈຳຕົວ/ Passport / ເບີໂທ"
        class="form-control"
        required=""
        v-model="store.searchDa"
        @keyup="searchData"
        maxlength="30"
      />
    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">
      <select
        class="form-select form-select"
        aria-label="Default select example"
        @change="selecttypeadmin($event)"
      >
        <option value="">
          <span v-if="locale == 'la'">{{ $t("all") }}</span>
          <span v-if="locale == 'en'">{{ $t("all") }}</span>
          <span v-if="locale == 'th'">{{ $t("all") }}</span>
          <span></span>
        </option>
        <option value="1">
          <span v-if="locale == 'la'">{{ $t("admin") }}</span>
          <span v-if="locale == 'en'">{{ $t("admin") }}</span>
          <span v-if="locale == 'th'">{{ $t("admin") }}</span>
        </option>
        <option value="2">
          <span v-if="locale == 'la'">{{ $t("officer") }}</span>
          <span v-if="locale == 'en'">{{ $t("officer") }}</span>
          <span v-if="locale == 'th'">{{ $t("officer") }}</span>
        </option>
        <option value="3">
          <span v-if="locale == 'la'">{{ $t("population") }}</span>
          <span v-if="locale == 'en'">{{ $t("population") }}</span>
          <span v-if="locale == 'th'">{{ $t("population") }}</span>
        </option>
      </select>
    </div>

    <div class="col-xl-1 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">
      <label for="inputEmail3" class="col-sm-12 col-form-label">ສະຖານະ</label>
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">
      <select
        class="form-select form-select"
        aria-label="Default select example"
        @change="selecttype($event)"
      >
        <option value="">ທັງໝົດ</option>
        <option value="unactive">{{ $t("unactive") }}</option>
        <option value="phone_active">{{ $t("phone_active") }}</option>
        <option value="system_unactive">{{ $t("system_unactive") }}</option>
        <option value="system_active">{{ $t("system_active") }}</option>
      </select>
    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <select
        class="form-select form-select"
        aria-label="Default select example"
        @change="selectshowdata($event)"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  </div>
  <div class="table-responsive">
    <table id="example" class="table table-bordered" style="width: 100%">
      <thead>
        <tr class="cours_move">
          <th @click="sortList('user_id')">
            {{ $t("menu_user_index") }} &#8597;
            <!-- <input type="checkbox"  v-model="store.isAllSelected" @click="selectAll"> -->
          </th>
          <th @click="sortList('user_firstname')">
            {{ $t("menu_user_name") }} &#8597;
          </th>
          <!-- <th @click="sortList('user_name')">ยูสเซอร &#8597;</th> -->
          <!-- <th @click="sortList('user_email')">อีเมล &#8597;</th> -->
          <th @click="sortList('menu_user_c_username')">
            {{ $t("menu_user_c_username") }} &#8597;
          </th>
          <th @click="sortList('user_phone')">
            {{ $t("menu_user_tel") }} &#8597;
          </th>
          <th>{{ $t("menu_user_iden") }}</th>
          <th>{{ $t("menu_user_status") }}</th>
          <th>{{ $t("menu_user_login_last") }}</th>
          <th class="no-content">{{ $t("menu_user_c_action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in posts_statff.data" :key="user.user_id">
          <!-- <td><input type="checkbox" v-model="store.selected" :value="user" number></td> -->
          <td>
            {{
              store.formsearch.page * store.formsearch.per_page -
              (store.formsearch.per_page - index) +
              1
            }}
          </td>
          <td>{{ user.user_firstname }} {{ user.user_lastname }}</td>
          <td>{{ user.user_name }}</td>
          <!-- <td>{{ user.user_email }}</td> -->

          <td>{{ user.user_phone }}</td>
          <td>{{ user.identification_number }}</td>
          <td v-if="user.verify_account == 'system_active'">
            <span style="color: #059814">{{ $t("system_active") }}</span>
          </td>

          <td v-else-if="user.verify_account == 'phone_active'">
            <span style="color: #ffa927">{{ $t("phone_active") }}</span>
          </td>

          <td v-else-if="user.verify_account == 'unactive'">
            <span style="color: #aa4a44">{{ $t("unactive") }}</span>
          </td>
          <td v-else-if="user.verify_account == 'system_unactive'">
            <span style="color: #aa4a44">{{ $t("system_unactive") }}</span>
          </td>
          <td>{{ user.login_last_date }}</td>
          <td>
            
              <a class="badge badge-light-primary text-start me-2 action-view" @click="viewProfile()" >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"    /></svg    ></a>
    
            <NuxtLink :to="'/users/' + user.user_id">
              <a class="badge badge-light-primary text-start me-2 action-edit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-edit-3"
                >
                  <path d="M12 20h9"></path>
                  <path
                    d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                  ></path></svg  ></a>
            </NuxtLink>
            
            <a
              class="badge badge-light-danger text-start action-delete"
              @click="del(user.user_id)"
              ><svg  xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-trash"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                ></path></svg  ></a>
            
        
                <button class="button2 m-1" @click="viewProfile(user.user_id)">ປະຫວັດຮຽນ</button>
              
          </td>
        </tr>
      </tbody>
    </table>

    <div></div>
  </div>
  <div class="row">
    <span
      >Showing {{ (store.current_page - 1) * store.formsearch.per_page + 1 }} to
      {{
        Math.min(store.current_page * store.formsearch.per_page, store.total)
      }}
      of {{ store.total }} entries</span
    >

    <div class="col-xl-12 col-lg-12">
      <div class="pagination-no_spacing" v-if="posts_statff.total_page > 1">
        <ul class="pagination">
          <li>
            <a
              href="javascript:void(0);"
              class="prev"
              @click="validatePNumberDown()"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-left"
              >
                <polyline points="15 18 9 12 15 6"></polyline></svg  ></a>
          </li>
          <li>
            <div class="col-xs-1">
              <input
                id="ex1"
                type="number"
                style="width: 50px"
                v-model="store.formsearch.page"
                @input="validatePNumber($event)"
              />
            </div>
          </li>
          <li><a href="javascript:void(0);">/</a></li>
          <li>
            <a href="javascript:void(0);">{{ store.total_page }}</a>
          </li>
          <li>
            <a
              href="javascript:void(0);"
              class="next"
              @click="validatePNumberUp()"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline></svg ></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { usersStore } from "@/store/users";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Paginate from "vuejs-paginate-next";
import { useToast } from "vue-toastification";
import moment from "moment-timezone";
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();

const router = useRouter();
const toast = useToast();
const store = usersStore();
const auth = useAuthStore();
const { posts } = storeToRefs(usersStore());
const { posts_statff } = storeToRefs(usersStore());
const { deleteItem } = usersStore(); //Action
const { selectall } = usersStore(); //Action
const { selectone } = usersStore(); //Action
const { setCurrentPage } = usersStore(); //Action
const { sortLists } = usersStore(); //Action
const { selectentires } = usersStore(); //Action
const { selecttypes } = usersStore(); //Action

const { getSelect } = storeToRefs(store); //Get Getter
const { getSelectALL } = storeToRefs(store); //Get Getter
const { getPaginate } = storeToRefs(store); //Get Getter
const { search } = storeToRefs(store); //Get Getter

await store.fetchUsers();

const del = async (id) => {
  await deleteItem(id);
  await store.fetchUsers();
};

const choose = async (id) => {
  router.push({ path: "dltmanage/" + id });
};

const searchData = async () => {
  store.formsearch.page = 1;
  await store.fetchUsers();
};

const viewProfile = async (item) => {
 
  await router.push("/users/profile/"+ item);
};

const selchk = async (x) => {
  await selectone(x);
};

const selectAll = async () => {
  await selectall();
};

const setCurrentPageclick = async (page) => {
  await setCurrentPage(page);
  await store.fetchUsers();
};
const format = (time) => {
  return moment(time).format("DD/MM/YYYY HH:mm");
};

const selectshowdata = async (x) => {
  store.formsearch.page = 1;
  await selectentires(x.target.value);
  await store.fetchUsers();
};

const selecttype = async (item) => {
  store.formsearch.page = 1;
  store.formsearch.verify_account = item.target.value;
  await store.fetchUsers();
};

const selecttypeadmin = async (item) => {
  store.formsearch.page = 1;
  store.type = item.target.value;
  await store.fetchUsers();
};

const sortList = async (sortBy) => {
  await sortLists(sortBy);
};

function coverttime(date) {
  const datetime = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDatetime = datetime.toLocaleString(undefined, options);

  return formattedDatetime;
}

const validatePNumber = async (evt) => {
  const keysAllowed: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  const keyPressed: string = evt.key;
  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault();
  }
  if (store.formsearch.page > store.total_page) {
    store.formsearch.page = store.total_page;
    return false;
  }
  if (store.formsearch.page == "") {
    store.formsearch.page = 1;
    await store.fetchUsersStaff();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
    await store.fetchUsers();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }
};

const validatePNumberDown = async () => {
  if (store.formsearch.page == 1) {
    store.pending = true;

    store.formsearch.page = 1;
    await store.fetchUsersStaff();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
    store.formsearch.page -= 1;
    store.pending = true;
    await store.fetchUsersStaff();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }
};

const validatePNumberUp = async () => {
  if (store.formsearch.page == store.total_page) {
    store.pending = true;
    store.formsearch.page = store.total_page;

    await store.fetchUsersStaff();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
    store.formsearch.page += 1;
    store.pending = true;
    await store.fetchUsersStaff();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }
};
</script>
<style>
.dt--pagination {
  float: right;
}

.cours_move {
  cursor: pointer;
}


.button {
  background-color: #04AA6D; /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1 {
  background-color: white; 
  color: black; 
  border: 2px solid #04AA6D;
}

.button1:hover {
  background-color: #04AA6D;
  color: white;
}

.button2 {
  background-color: white; 
  color: black; 
  border: 2px solid #008CBA;
}

.button2:hover {
  background-color: #008CBA;
  color: white;
}

.button3 {
  background-color: white; 
  color: black; 
  border: 2px solid #f44336;
}

.button3:hover {
  background-color: #f44336;
  color: white;
}

.button4 {
  background-color: white;
  color: black;
  border: 2px solid #e7e7e7;
}

.button4:hover {background-color: #e7e7e7;}

.button5 {
  background-color: white;
  color: black;
  border: 2px solid #555555;
}

.button5:hover {
  background-color: #555555;
  color: white;
}
</style>