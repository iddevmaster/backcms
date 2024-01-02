<template>
  <div class="row">
    <div class="col-xl-12 col-lg-12">
      <div class="paginating-container" v-if="store.total_page > 1">
      <div class="dataTables_paginate paging_simple_numbers" id="zero-config_paginate">
        <ul class="pagination">
          <li class="paginate_button page-item previous" id="zero-config_previous">
          <a href="#" aria-controls="zero-config" data-dt-idx="0" tabindex="0" class="page-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></a></li>
            <li class="paginate_button page-item " v-for="page in store.total_page" :key="page">
              <a href="#" aria-controls="zero-config" data-dt-idx="1" tabindex="0" class="page-link" @click="setCurrentPageclick(page)">
              {{page}}
            </a>
              </li>
            <li class="paginate_button page-item next" id="zero-config_next"><a href="#" aria-controls="zero-config" data-dt-idx="4" tabindex="0" class="page-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a></li></ul></div>
       </div>
      <div class="pagination-no_spacing" v-else>
        <ul class="pagination">
          ไม่มีข้อมูล
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
import { ExamquestionStore } from "@/store/examquestion";
import { useToast } from "vue-toastification";

const toast = useToast();
const store = ExamquestionStore();
const { questionlist } = ExamquestionStore();//Action


const Examlistq = await store.fetchExamquestionlist();



const del = async (item) => {

};
const edit = async (item) => {

};

const selectshowdata = async (sel) => {


};

const selchk = async (x) => {
  // await selectone(x);
};

const selectAll = async () => {
  // await selectall();
};
const searchData = async () => {

};



function goToPage(page) {
  console.log(page);
}

const sortList = async (sortBy) => {
  await sortLists(sortBy)
};


const setCurrentPageclick = async (page) => {
  await setCurrentPage(page)
  await store.fetchExamlist()
};

const validatePNumber = async (evt) => {
  console.log(evt)
  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const keyPressed: string = evt.key;
  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault()
  }

  if (store.quest_Id == '') {
    console.log('if')
    store.pending = true;
    store.quest_Id = 1;
    await questionlist();
    await toast.info("Loadding Data", {
      timeout: 50,
    });
  } else {
    store.pending = true;
    await questionlist();
    await toast.info("Loadding Data", {
      timeout: 50,
    });
  }
}

const validatePNumberUp = async () => {

  if (store.quest_Id == '') {
    store.pending = true;
    store.quest_Id = 1;
    await questionlist();
    await toast.info("Loadding Data", {
      timeout: 50,
    });
  } else {
    console.log('else');
    store.quest_Id += 1;
    store.pending = true;
    await questionlist();
    await toast.info("Loadding Data", {
      timeout: 50,
    });
  }
}

const validatePNumberDown = async () => {
  if (store.quest_Id == 1) {
    store.pending = true;
    store.quest_Id = 1;
    await questionlist();
    await toast.info("Loadding Data", {
      timeout: 50,
    });
  } else {
 
    store.quest_Id -= 1;
    store.pending = true;
    await questionlist();
    await toast.info("Loadding Data", {
      timeout: 50,
    });
  }
}


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
    var x = "static/upload/2023/7/files-1689561047889.jpg";
  }
  return "http://oasapi.iddriver.com/media_file/file/?f=" + x;
}
</script>
<style>
.dt--pagination {
  float: right;
}

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