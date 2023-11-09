<template>
  <div class="row">
    <div class="col-xl-12 col-lg-12">
      <div class="pagination-no_spacing" v-if="store.examqlisttotal > 0">
        <ul class="pagination">
          <li> <a href="javascript:void(0);" class="prev"  @click="validatePNumberDown()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="feather feather-chevron-left">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg></a>
          </li>
          <li>
            <div class="col-xs-1">
              <input id="ex1" type="number" style="width:50px" v-model="store.quest_Id" min="1"
                @input="validatePNumber($event)">
            </div>
          </li>
          <li><a href="javascript:void(0);">/</a></li>
          <li><a href="javascript:void(0);">{{ store.examqlisttotal }}</a></li>
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