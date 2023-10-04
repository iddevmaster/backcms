<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="text"
        name="txt"
        placeholder="Search"
        class="form-control"
        required=""   v-model="store.formsearchexam.search" @keyup="searchData"
      />
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">

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

  <div class="table-responsive">
    <table class="table table-bordered">
        <thead>
            <tr>
       
                <th scope="col" @click="sortList('em_code')">{{ $t("menu_exam_all_code") }} &#8597;</th>
                <th class="text-center" scope="col">{{ $t("menu_exam_all_pic") }}</th>
                <th scope="col" @click="sortList('em_name')">{{ $t("menu_exam_all_name") }} &#8597;</th>
                <th class="text-center" scope="col">{{ $t("menu_exam_all_detail") }}</th>
                <th class="text-center" scope="col" @click="sortList('em_random_amount')">{{ $t("menu_exam_all_total_random") }} &#8597;</th>
                 <th class="text-center" scope="col" @click="sortList('total_question')">{{ $t("menu_exam_all_total_exam") }} &#8597;</th>
            
                <th class="text-center" scope="col">{{ $t("menu_exam_all_total_action") }}</th>
            </tr>
        </thead>

     
        <tbody>
            <tr  v-for="item in store.examlist" :key="item.em_id">
                <td>{{item.em_code}}</td>
                <td class="text-center">
  <img :src="image(item.em_cover)" class="img-fluid" width="80" height="80" />
                </td>
                <td>
                  <span class="table-inner-text">
                    {{item.em_name}}
                  </span>
                </td>
              
                <td class="text-center">
                  {{item.em_description}}
                </td>
                <td class="text-center">
                    <span class="badge badge-light-secondary">{{item.em_random_amount}}</span>
                </td>
                 <td class="text-center">
                    <span class="badge badge-light-secondary">{{item.total_question}}</span>
                </td>
                <!-- <td>
                  <NuxtLink>
                  <a class="badge badge-light-primary text-start me-2 action-edit" @click="edit(item)"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></a>
                   </NuxtLink>

                   <a class="badge badge-light-danger text-start action-delete" @click="del(item)" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
                </td> -->
                <td align="center">
             <div class="btn-group-vertical">
            <button type="button" class="btn btn-success" style="background-color:#3F2C73;" @click="details(item.em_id)">{{ $t("menu_exam_history_detail") }}</button>
        
            </div>
          </td>
            </tr>
        </tbody>
    </table>
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
const router = useRouter();

const toast = useToast();
const store = ExamStore();

 const { Openmodaldelete } = ExamStore();//Action
 const { OpenEditItem } = ExamStore();//Action
 const { setCurrentPage } = ExamStore();//Action
 const { selectentires } = ExamStore();//Action
 const { sortLists } = ExamStore();//Action
 const { GetopenModalEdit } = storeToRefs(store); //Get Getter

const Examlist = await store.fetchExamlist();
if (Examlist === false) {
  await toast.error("Error Data Contact Admin", {
        timeout: 30000,
  });
}

const del = async (item) => {
const deleExam =  await Openmodaldelete(item);
};
const edit = async (item) => {

  await OpenEditItem(item);
  //await store.fetchNewTransport()
};

const selectshowdata = async (sel) => {
 
await selectentires(sel.target.value);
await store.fetchExamlist()
 };

const selchk = async (x) => {
  // await selectone(x);
};

const selectAll = async () => {
  // await selectall();
};
const searchData = async () => {
 await store.fetchExamlist()
 };

 

function goToPage(page) {

}


const sortList = async (sortBy) => {
await sortLists (sortBy)
 };


const setCurrentPageclick = async (page) => {
 await setCurrentPage (page)
 await store.fetchExamlist()
};


const details = async (item) => {
  router.push({ path: "examhistory/" + item });
};


function image(i) {
  let im =  ApiService.image(i);
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

</style>