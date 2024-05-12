<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="text"
        name="txt"
        :placeholder="$t('search')"
        class="form-control"
        required=""
        v-model="store.formsearchlesson.search"
         maxlength="50"    @input="searchData"
      />
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="button"
        name="txt"
        :placeholder="$t('search')"
        class="form-control"
        :value="$t('menu_couse_f_add_lesson')"
style="
    background-color: rgb(15, 119, 223);
    color: white;
"
        @click="openmodal"
      />
      
    </div>
        <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">
     
    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">
      <select
        class="form-select form-select"
        aria-label="Default select example" @change="selectshowdata_ch($event)"
      
      >
        <option :value="0">{{ $t('all_subject') }}</option>
        <option v-for="item in store.group" :value="item.cg_id" :key="item.cg_id"   >{{item.cg_name}}</option>
      </select>
    </div>
       <div class="col-xl- col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">
      <select
        class="form-select form-select"
        aria-label="Default select example"
        @change="selectshowdata($event)"
      >
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="30">30</option>
        <option :value="50">50</option>
     
      </select>
    </div>
  </div>

  <div class="table-responsive">
    <table id="example" class="table table-bordered" style="width: 100%">
      <thead>
            <tr>
                <th scope="col">#</th>
                <th class="text-center" scope="col">{{ $t("lesson_title") }}</th>
                <th class="text-center" scope="col">{{ $t("lesson_content") }}</th>
                 <th scope="col">{{ $t("lesson_group") }}</th>
                <th scope="col">{{ $t("lesson_pic") }}</th>
                  <th class="text-center" scope="col">{{ $t("less_ac") }}</th>
            </tr>
        </thead>

      <tbody>
        <tr v-for="(item, index) in store.lessonlist" :key="item.cs_id">
          <td>{{ (store.formsearchlesson.page * store.formsearchlesson.per_page) - (store.formsearchlesson.per_page -  index) +  1 }}</td>
            <td style="white-space:unset;">{{ item.cs_name }}</td>
            <td  style="white-space:unset;">{{ item.cs_description }}</td>
            <td>{{ item.cg_name }}</td>
            <td class="text-center">
            
            <img :src="image(item.cs_cover)" class="img-fluid" width="80" height="80" v-if="item.cs_cover">
                  <img src="../../assets/images/no_photo.jpg" class="img-fluid" width="80" height="80" v-else>
          </td>
          <td>    
             <div class="action-btns">

                <NuxtLink>
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
                  @click="del(item.cs_id)"
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

<!-- 
  <div>
      <div class="dt--pagination" v-if="store.lesson_total_page > 1">
        <div class="dataTables_paginate paging_simple_numbers" id="zero-config_paginate">
          <ul class="pagination">
            <li class="paginate_button page-item previous" id="zero-config_previous">
              <a href="#" aria-controls="zero-config" data-dt-idx="0" tabindex="0" class="page-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-arrow-left">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg></a>
            </li>
            <li class="paginate_button page-item " v-for="page in store.lesson_total_page" :key="page">
              <a href="#" aria-controls="zero-config" data-dt-idx="1" tabindex="0" class="page-link"  @click="setCurrentPageLessonclick(page)"
              >
                {{ page }}</a>
            </li>
            <li class="paginate_button page-item next" id="zero-config_next"><a href="#" aria-controls="zero-config"
                data-dt-idx="4" tabindex="0" class="page-link"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                  height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg></a></li>
          </ul>
        </div>
      </div>
    </div> -->


  <!-- <div class="row">
    <div class="col-xl-12 col-lg-12">
      <div class="pagination-no_spacing" v-if="store.lesson_total_page > 1">
        <ul class="pagination">
          <li> <a href="javascript:void(0);" class="prev" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="feather feather-chevron-left">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg></a>
          </li>
          <li>
            <div class="col-xs-1">
              <input id="ex1" type="number" style="width:50px" v-model="store.formsearchlesson.page" min="1"  @input="validatePNumber($event)"
               >
            </div>
          </li>
          <li><a href="javascript:void(0);">/</a></li>
          <li><a href="javascript:void(0);">{{ store.lesson_total_page }}</a></li>
          <li> <a href="javascript:void(0);" class="next" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="feather feather-chevron-right">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg></a>
          </li>
        </ul>
      </div>

      <div class="pagination-no_spacing" v-else>
        <ul class="pagination">
         
        </ul>
      </div>
    </div>
  </div> -->


  <div class="row">
    <div class="col-xl-12 col-lg-12">
      <div class="pagination-no_spacing" v-if="store.lesson_total_page > 1">
        <ul class="pagination">
          <li>
            <a href="javascript:void(0);" class="prev"
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
                <polyline points="15 18 9 12 15 6"></polyline></svg ></a>
          </li>
          <li>
            <div class="col-xs-1">
              <input
                id="ex1"
                type="number"
                style="width: 50px"
                v-model="store.formsearchlesson.page"  @input="validatePNumberSelect($event)"
                min="1"
              
              />
            </div>
          </li>
          <li><a href="javascript:void(0);">/</a></li>
          <li>
            <a href="javascript:void(0);">{{ store.lesson_total_page }}</a>
          </li>
          <li>
            <a href="javascript:void(0);" class="next"
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
                <polyline points="9 18 15 12 9 6"></polyline></svg></a>
          </li>
        </ul>
      </div>

      <div class="pagination-no_spacing" v-else>
        <ul class="pagination">
         
        </ul>
      </div>
    </div>
  </div>


<br>

  <div v-if="store.GetopenModalLesson" class="modal">

<div class="modal-content modal-dialog modal-xl" id="deleteConformationLabel">
  <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">ต้องการลบบทเรียนี้?</h5>
  </div>
  <div class="modal-footer">
    <button class="btn btn btn-light-dark" data-bs-dismiss="modal" @click="closemodalLesson()">
      <i class="flaticon-cancel-12"></i> {{ $t("cancel") }}</button>
    <button type="button" class="btn btn-primary" @click="delelelesson()">{{ $t("delete") }}</button>
  </div>
</div>
</div>


</template>

<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>
<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>

<!-- Add this after vue.js -->

<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { LessonStore } from "@/store/lesson";
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
const store = LessonStore();;
store.isLoading == true;

const { deleteItem } = LessonStore(); //Action

const { selectentireslesson } = LessonStore(); //Action
const { selectentiresentires } = LessonStore(); //Action

const auth = useAuthStore();




const selectshowdata = async (sel) => {
  await selectentiresentires(sel.target.value);
  await store.fetchLessonlist() 
};

// const searchData = async () => {
//   await store.fetchLessonlist() 
// };

const searchData = async (event) => {
      store.formsearchlesson.search = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
    await store.fetchLessonlist() 
};

const openmodal = async () => {
  store.myselect_group = null
  store.GetopenModalCreate = true;
};

const selectshowdata_ch = async (cg) => {
store.cg_id = cg.target.value
store.formsearchlesson.page = 1;
 await store.fetchLessonlist() 
};



function goToPage(page) {
  console.log(page);
}


const setCurrentPageLessonclick = async (page) => {
  await selectentireslesson(page);
  await store.fetchLessonlist();
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

const del = async (item) => {

store.GetopenModalLesson = true
store.cs_id = item;
//await store.selectlessId(item)

};

const validatePNumberSelect = async (evt) => {
  
  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const keyPressed: string = evt.key;
  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault()
  
  }

  if (store.formsearchlesson.page == "") {
    store.formsearchlesson.page = 1;
    await store.fetchLessonlist();
  //await store.paginatedItems() 
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else if(store.formsearchlesson.page > store.lesson_total_page){
    store.formsearchlesson.page = store.lesson_total_page;
    await store.fetchLessonlist();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }else {
 //   await store.fetchLessonlist();
    store.pending = true;
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
    await store.fetchLessonlist();
  }
 // await stores.paginatedItems() 
}
 

const delelelesson = async () => {
 let de =  await store.deletelesson();

 if(de == true){
  store.GetopenModalLesson = false
  await toast.success('ລຶບຂໍ້ມູນສຳເລັດ',{
    timeout: 30000,
  });

    const lessonlist = await store.fetchLessonlist();
await store.paginatedItems() 
 }else {
  store.GetopenModalLesson = false
  await toast.error("ລຶບລົ້ມເຫລວ", {
    timeout: 30000,
  });
 }

 // await toast.success('ລຶບຂໍ້ມູນສຳເລັດ');
};
const edit = async (item) => {
store.formcreatelessonedit.user_id = auth.user_id
store.GetopenModalEdit = true
store.myselect_group = item.cg_id
store.formcreatelessonedit.cg_id = item.cg_id;
 await store.fetchLessonIdedit(item)
};


const validatePNumber = async (evt) => {
  
  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const keyPressed: string = evt.key;
  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault()
  
  }

  if (store.selectlesson_form_menu_less.page == '') {
    store.pending = true;
   
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
    store.pending = true;

    if(store.selectlesson_form_menu_less.page > store.max){
 store.selectlesson_form_menu_less.page = store.max;

    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });

    }else {
   
   await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });

    }
     
  }

}

const closemodalLesson = async () => {
  store.GetopenModalLesson = false;
}


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