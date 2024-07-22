<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="text"
        name="txt"
        placeholder="ຊອກຫາ"
        class="form-control"
        required=""   v-model="store.formsearchexamques.search" @keyup="searchData"
      />
    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ">
      <button class="btn btn-primary mb-2 me-4" style="width: 100%;height: 100%;margin-top: auto;" @click="GotoPage('exam/create')" >{{ $t("menu_exam_add") }}</button>
    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ">
    </div>

    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 mb-4">
      <select class="form-control" v-model="store.cg_id"  @change="selecttype($event)"  >
          <option v-for="(item, index) in store.group" :key="item.cg_id" :value="item.cg_id" >
            {{ locale == "la" ? item.cg_name_lo : item.cg_name_eng }}
          </option>
        </select>
    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <select
        class="form-select form-select"
        aria-label="Default select example"   @change="selectshowdata($event)" 
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  </div>


  <div class="row layout-top-spacing">


    <div class="col-xl-12 col-lg-3 col-md-3 col-sm-3 mb-4">
<span style="font-weight: bolder;">{{ $t("menu_group_add") }} -> 

  {{ locale == "la" ? store.seletype.cg_name_lo : store.seletype.cg_name_eng }}
</span>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-bordered">
        <thead>
            <tr class="cours_move">
                <th scope="col">#</th>
                <th scope="col" >{{ $t("menu_exam_all_name") }} &#8597;</th>
                 <th class="text-center" scope="col">ຄໍາຕອບ
                </th>
                 <th class="text-center" scope="col">{{ $t("menu_exam_all_pic") }}</th>
                <th class="text-center" scope="col">{{ $t("menu_exam_all_total_action") }}</th>
            </tr>
        </thead>
        <tbody>
            <tr  v-for="(item, index) in store.examques" :key="item.eq_id">
                <td> 
                  {{
              store.formsearchexamques.page * store.formsearchexamques.per_page -
              (store.formsearchexamques.per_page - index) +
              1
            }}
                </td>
        
                <td style="white-space:unset;">
                  <span class="table-inner-text">
                    {{ locale == "la" ? item.eq_name_lo : item.eq_name_eng }}
                  </span>
                </td>

                <td style="white-space:unset;">
                  <span class="table-inner-text">
                    {{item.eq_answer}}
                  </span>
                </td>
     
                <td class="text-center">
  <img :src="image(item.eq_image)" class="img-fluid" width="80" height="80" />
                </td>
    
                <td >
              
            <div class="action-btns">
              <NuxtLink :to="'/exam/view/' + item.eq_id">
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
              <NuxtLink :to="'/exam/edit/' + item.eq_id">
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
            </div>
          </td>
     
            </tr>
        </tbody>
    </table>
</div>


            <!-- pageinate -->
  <div class="paginating-container" v-if="store.examques_total_page > 1">
      <div class="dataTables_paginate paging_simple_numbers" id="zero-config_paginate">
        <ul class="pagination">
          <li class="paginate_button page-item previous" id="zero-config_previous">
          <a href="#" aria-controls="zero-config" data-dt-idx="0" tabindex="0" class="page-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></a></li>
            <li class="paginate_button page-item " v-for="page in store.examques_total_page" :key="page">
              <a href="#" aria-controls="zero-config" data-dt-idx="1" tabindex="0" class="page-link" @click="setCurrentPageclick(page)">
              {{page}}
            </a>
              </li>
            <li class="paginate_button page-item next" id="zero-config_next"><a href="#" aria-controls="zero-config" data-dt-idx="4" tabindex="0" class="page-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a></li></ul></div>
       </div>
</template>


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { ExamStore } from "@/store/exam";
import { useToast } from "vue-toastification";
import ApiService from '../../services/api.service';
import moment from "moment-timezone";
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();
const router = useRouter();

const toast = useToast();
const store = ExamStore();

 const { Openmodaldelete } = ExamStore();//Action
 const { OpenEditItem } = ExamStore();//Action
 const { setCurrentPageq } = ExamStore();//Action
 const { selectentiresq } = ExamStore();//Action
 const { sortLists } = ExamStore();//Action
 const { GetopenModalEdit } = storeToRefs(store); //Get Getter

await store.fetchGrouplist()
await store.selectfirstGroupId()
await store.fetchExamlistQuest()
await store.selecttypes(store.cg_id)


const del = async (item) => {
const deleExam =  await Openmodaldelete(item);
};
const edit = async (item) => {

  await OpenEditItem(item);
  //await store.fetchNewTransport()
};

const selectshowdata = async (sel) => {
 
await selectentiresq(sel.target.value);
await store.fetchExamlistQuest()
 };

const selchk = async (x) => {
  // await selectone(x);
};
const OpenFormInsert = async () => {
    await store.OpenFormInser()
};

const format = (time) => {
  return moment(time).format("DD/MM/YYYY HH:mm");
};

const GotoPage = (item) => {

   router.push(item);
};



const selectAll = async () => {
  // await selectall();
};
const searchData = async () => {
  store.formsearchexamques.page = 1;
  await store.fetchExamlistQuest()
 };


 const selecttype = async (item) => {
  await store.fetchExamlistQuest()
  await store.selecttypes(item.target.value);

};
 

function goToPage(page) {

}

function goToAddEx(item) {

localStorage.setItem('em_id', item.em_id);
localStorage.setItem('em_name', item.em_name);

 router.push({ path: 'exam/question/'+item.em_id})
}

const sortList = async (sortBy) => {
await sortLists (sortBy)
 };


const setCurrentPageclick = async (page) => {
 await setCurrentPageq (page)
 await store.fetchExamlistQuest()
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
      var x = null;
      if (i) {
        const usingSplit = i.split(",");
        var x = usingSplit[0];
      } else {
        var x = "static/upload/2023/9/files-riRE6hEnHI.jpg";
      }
      let im =  ApiService.image(x);
      return im;
    }
</script>
<style>
.dt--pagination {
  float: right;
}


/* .modal-content {
  background-color: white;
  padding: 20px;
  width: 70%;
} */

/* @media only screen and (min-width: 576px) {

.modal-content {
background-color: white;
padding: 20px;
width: 100%;
}
} */

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}

.cours_move{

cursor: pointer;
}


</style>