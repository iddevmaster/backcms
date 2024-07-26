<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="text"
        name="txt"
        placeholder="ຊອກຫາ"
        class="form-control"
        required=""
        v-model="store.formsearchcourse.search"
        @input="searchData"
        maxlength="30"
      />
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <button class="btn btn-primary mb-2 me-4" style="width: 100%;height: 100%;margin-top: auto;" @click="goToPage('learning/create')" >{{ $t("menu_exam_add") }}</button>
    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">
  
      
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
<select
  class="form-select form-select"
  aria-label="Default select example"
  @change="selectactive($event)"
>
  <option :value="[0,1]">ທັງໝົດ</option>
  <option :value="[1]">ໃຊ້</option>
  <option :value="[0]">ບໍ່ໄດ້ໃຊ້</option>
</select>
</div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <select
        class="form-select form-select"
        aria-label="Default select example"
        @change="selectshowdata($event)"
      >
        <option value="5">5</option>
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
          <th>
            #
            <!-- <input type="checkbox"  v-model="store.isAllSelected" @click="selectAll"> -->
          </th>
          <th @click="sortList('course_id')">
            {{ $t("table_course_code") }} &#8597;
          </th>
          <!-- <th @click="sortList('user_name')">ยูสเซอร &#8597;</th> -->
          <!-- <th @click="sortList('user_email')">อีเมล &#8597;</th> -->
          <th @click="sortList('course_name')">
            {{ $t("table_course_name") }} &#8597;
          </th>

          <th>{{ $t("table_course_lesson") }}</th>
          <th>{{ $t("table_course_pic") }}</th>
          <th>{{ $t("menu_exam_history_status") }}</th>
          <th class="no-content">{{ $t("menu_user_c_action") }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in store.courselist" :key="item.course_id">
          <!-- <td><input type="checkbox" v-model="store.selected" :value="user" number></td> -->
          <td>
            {{
              store.formsearchcourse.page * store.formsearchcourse.per_page -
              (store.formsearchcourse.per_page - index) +
              1
            }}
          </td>
          <td>
            {{ item.course_code }}
          </td>
          <td>
            {{ locale == "la" ? item.course_name_lo : item.course_name_eng }}
          </td>

          <td>
            <span class="badge badge-success" v-if="item.is_complete == 1"
              >ມີບົດຮຽນ.</span
            >
            <span class="badge badge-danger" v-else>ບໍ່ມີບົດຮຽນ.</span>
          </td>
          <td class="text-center">
            <img
              :src="image(item.course_cover)"
              class="img-fluid"
              width="80"
              height="80"
            />
          </td>
          <td>
            <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" :checked="item.active" @change="toggleItem(index)">
 <span class="form-check-label"> <p>{{ item.active === 1 ? 'Active' : 'UnActive' }}</p></span>
 
 
</div>
    
          </td>
          <td>
            <div class="action-btns">
              <NuxtLink :to="'/learning/view/' + item.course_id">
                <a
                  href="javascript:void(0);"
                  class="action-btn btn-edit bs-tooltip me-2"
                  data-toggle="tooltip"
                  data-placement="top"
                  aria-label="Edit"
                  data-bs-original-title="Edit"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>
                </a>
              </NuxtLink>
              <NuxtLink :to="'/learning/edit/' + item.course_id"  v-if="user_type == '1'">
                <a
                  href="javascript:void(0);"
                  class="action-btn btn-edit bs-tooltip me-2"
                  data-toggle="tooltip"
                  data-placement="top"
                  aria-label="Edit"
                  data-bs-original-title="Edit"
                >
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
                    class="feather feather-edit-2"
                  >
                    <path
                      d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                    ></path>
                  </svg>
                </a>
              </NuxtLink>
              <a  v-if="user_type == '1'"
                href="javascript:void(0);"
                class="action-btn btn-delete bs-tooltip"
                @click="del(item)"
                data-toggle="tooltip"
                data-placement="top"
                aria-label="Delete"
                data-bs-original-title="Delete"
              >
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
                  class="feather feather-trash-2"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div>
    <div class="dt--pagination" v-if="store.total_page > 1">
      <div
        class="dataTables_paginate paging_simple_numbers"
        id="zero-config_paginate"
      >
        <ul class="pagination">
          <li
            class="paginate_button page-item previous"
            id="zero-config_previous"
            @click="Prev()"
          >
            <a
              href="#"
              aria-controls="zero-config"
              data-dt-idx="0"
              tabindex="0"
              class="page-link"
            >
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
                class="feather feather-arrow-left"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline></svg ></a>
          </li>
          <li
            class="paginate_button page-item"
            v-for="page in store.total_page"
            :key="page"
          >
            <a
              href="#"
              aria-controls="zero-config"
              data-dt-idx="1"
              tabindex="0"
              class="page-link"
              :class="{ bgcx: page === store.formsearchcourse.page }"
              @click="setCurrentPageclick(page)"
            >
              {{ page }}</a
            >
          </li>
          <li class="paginate_button page-item next" id="zero-config_next">
            <a
              href="#"
              aria-controls="zero-config"
              @click="Next()"
              data-dt-idx="4"
              tabindex="0"
              class="page-link"
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
                class="feather feather-arrow-right"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline></svg ></a>
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
import { CourseStore } from "@/store/course";
import { useAuthStore } from "@/store/auth";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Paginate from "vuejs-paginate-next";
import { useToast } from "vue-toastification";
import ApiService from "../../services/api.service";
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();

const toast = useToast();
const router = useRouter();
const store = CourseStore();
store.isLoading == true;
const { Courselist } = storeToRefs(store);
const { deleteItem } = CourseStore(); //Action
const { selectentires } = CourseStore(); //Action
const { setCurrentPage } = CourseStore(); //Action

const auth = useAuthStore();

const courselist = await store.fetchCourslist();

defineProps({
  user_type: {
    type: Number,
    required: false,
    default: () => ({}),
  },
});


if (courselist === false) {
  await toast.error("Error Data Contact Admin", {
    timeout: 30000,
  });
}

const del = async (id) => {
  const delecourse = await deleteItem(id);
};

const lesson = async (id) => {
  await router.push("/learning/lesson/" + id);
};

const selectshowdata = async (sel) => {
  await selectentires(sel.target.value);
  await store.fetchCourslist();
};

const selectactive = async (sec) => {
  store.formsearchcourse.active_include = [sec.target.value];
  await store.fetchCourslist();
};



const selchk = async (x) => {
  // await selectone(x);
};

const selectAll = async () => {
  // await selectall();
};

const searchData = async (event) => {
  store.formsearchcourse.search = event.target.value.replace(
    /[!@#$%^&*(),.?":{}|<>]/g,
    ""
  );
  await store.fetchCourslist();
};



const goToPage = async (item) => {
  await router.push(item);
}

const setCurrentPageclick = async (page) => {
  await setCurrentPage(page);
  await store.fetchCourslist();
};

const sortList = async (sortBy) => {
  await store.sortLists(sortBy);
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

function image(i) {
  let im = ApiService.image(i);
  return im;
}



const Prev = async () => {
  if (store.formsearchcourse.page == 1) {
    await store.fetchCourslist();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
    store.formsearchcourse.page -= 1;
    await store.fetchCourslist();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }
};

const Next = async () => {
  if (store.formsearchcourse.page == store.total_page) {
    store.formsearchcourse.page = store.total_page;
    await store.fetchCourslist();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
    store.formsearchcourse.page += 1;
    await store.fetchCourslist();
  }
};

const toggleItem = async (index) => {
  store.courselist[index].active = store.courselist[index].active === 1 ? 0 : 1;
 
  
 let a =  await store.fetchCoursActive(store.courselist[index]);

};






</script>
<style scoped>


.dt--pagination {
  float: right;
}

.bgcx {
  color: #0a58ca;
}

.gridarea__img img {
  object-fit: cover;
  height: 200px;
  width: 100%;
}
.cours_move {
  cursor: pointer;
}




input:checked {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}


/*----------- BUTTON ----------*/
.btn-holder {
  width: 400px;
  height: 300px;
  margin: 50px auto 0;
}
.btn-lg.btn-toggle {
  padding: 0;
  margin: 0 5rem;
  position: relative;
  height: 2.5rem;
  width: 6rem;
  border-radius: 3rem;
  color: #6b7381;
  background: #bdc1c8;
  margin-bottom: 30px;
}
.btn-toggle.btn-lg > .switch {
    position: absolute;
    top: 0.2rem;
    left: 0.1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 1.875rem;
    background: #fff;
    transition: left .25s;
}
.btn-toggle.active {
    background-color: #ff8800;
}
.btn-toggle.btn-lg.active > .switch {
    left: 3.75rem;
    transition: left .25s;
}

.btn-lg.btn-toggle:after {
    content: "Active";
    right: -5rem;
    opacity: 0.5;
    line-height: 2.5rem;
    width: 5rem;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 2px;
    position: absolute;
    bottom: 0;
    transition: opacity .25s;
}

.btn-lg.btn-toggle.active:after {
  opacity: 1;
}

/*------------ CHECKBOX -------------*/
.toggle-switch {
  margin: 0 auto;
  width: 241px;
  margin-top: 20px;
  position: relative;
}
.toggle-switch label {
  padding: 0;
}
input#cb-switch {
  display: none;
}
.toggle-switch label input + span {
      position: relative;
    display: inline-block;
    margin-right: 10px;
    width: 6rem;
    height: 2.5rem;
    background: #bdc1c8;
    border: 1px solid #eee;
    border-radius: 50px;
    transition: all 0.3s ease-in-out;
    box-shadow: inset 0 0 5px #828282;
}
.toggle-switch label input + span small {
    position: absolute;
    display: block;
    width: 2rem;
    height: 2rem;
    border-radius: 1.875rem;
    background: #fff;
    transition: all 0.3s ease-in-out;
    top: 0.2rem;
    left: 0.2rem;
}
.toggle-switch label input:checked + span {
  background-color: #ff8800;
}
.toggle-switch label input:checked + span small{
    left: 3.7rem;
    transition: left .25s;
}
.toggle-switch span:after {
  content: "Active";
  line-height: 2.5rem;
    width: 5rem;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 2px;
    position: absolute;
    bottom: 0;
    transition: opacity .25s;
    left: 6rem;
    opacity: 0.5;
    color: #6b7381;
}
.toggle-switch label input:checked + span:after {
  opacity: 1;
}
</style>