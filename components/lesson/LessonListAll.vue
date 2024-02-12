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
        @keyup="searchData"
      />
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto"></div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <select
        class="form-select form-select"
        aria-label="Default select example"
        @change="selectshowdata($event)"
      >
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="16">16</option>
        <option value="20">20</option>
      </select>
    </div>
  </div>

  <div class="table-responsive">
    <table id="example" class="table table-bordered" style="width: 100%">
      <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">{{ $t("lesson_pic") }}</th>
                <th class="text-center" scope="col">{{ $t("lesson_qui") }}</th>
                  <th class="text-center" scope="col">{{ $t("less_ac") }}</th>
                  <th class="text-center" scope="col">{{ $t("less_ac") }}</th>
            </tr>
        </thead>

      <tbody>
        <tr v-for="(item, index) in store.courselist" :key="item.course_id">
          <td>{{ (store.formsearchcourse.page * store.formsearchcourse.per_page) - (store.formsearchcourse.per_page -  index) +  1 }}</td>
             <td>{{ item.course_code }}</td>
               <td>{{ item.course_name }}</td>
         
          <td class="text-center">
            <img
              :src="image(item.course_cover)"
              class="img-fluid"
              width="80"
              height="80"
            />
          </td>
          <td>    
             <div class="action-btns">
            <NuxtLink >
                  <a
                    href="javascript:void(0);"
                    class="action-btn btn-edit bs-tooltip me-2"
                    @click="lesson(item.course_id)"
                    data-toggle="tooltip"
                    data-placement="top"
                    aria-label="Edit"
                    data-bs-original-title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
                    </svg>
                  </a>
                </NuxtLink>
                <NuxtLink :to="'/learning/' + item.course_id">
                  <a
                    href="javascript:void(0);"
                    class="action-btn btn-edit bs-tooltip me-2"
                    @click="edit(item)"
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
                <a
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
              </div></td>
      
        </tr>
      </tbody>
    </table>
  </div>


  <div v-if="store.GetopenModal" class="modal">

<div class="modal-content modal-dialog modal-xl" id="deleteConformationLabel">
  <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">ต้องการลบบทเรียนี้?</h5>
  </div>

  <div class="modal-footer">
    <button class="btn btn btn-light-dark" data-bs-dismiss="modal" >
      <i class="flaticon-cancel-12"></i> {{ $t("cancel") }}</button>
    <button type="button" class="btn btn-primary">{{ $t("delete") }}</button>
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

if (courselist === false) {
  await toast.error("Error Data Contact Admin", {
    timeout: 30000,
  });
}




const selectshowdata = async (sel) => {
  await selectentires(sel.target.value);
  await store.fetchCourslist();
};

const selchk = async (x) => {
  // await selectone(x);
};

const selectAll = async () => {
  // await selectall();
};
const searchData = async () => {
  await store.fetchCourslist();
};

function goToPage(page) {
  console.log(page);
}

const setCurrentPageclick = async (page) => {
  await setCurrentPage(page);
  await store.fetchCourslist();
};

const sortList = async (sortBy) => {
  //await sortLists (sortBy)
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

// const del = async (item) => {

// store.GetopenModal = true
// await store.selectlessId(item)
// };
// const edit = async (item) => {

// store.GetopenModalEdit = true
// await store.fetchLessonIdedit(item)
// };


function image(i) {
  let im = ApiService.image(i);
  return im;
}


</script>
<style>
.dt--pagination {
  float: right;
}

.gridarea__img img {
  object-fit: cover;
  height: 200px;
  width: 100%;
}
</style>