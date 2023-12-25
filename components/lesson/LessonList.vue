<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">

    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-bordered">
        <thead>
            <tr>
       
                <th scope="col">#</th>
                <th scope="col">{{ $t("lesson_pic") }}</th>
                <th class="text-center" scope="col">{{ $t("lesson_qui") }}</th>
                  <th class="text-center" scope="col">{{ $t("less_ac") }}</th>
            </tr>
        </thead>

     
        <tbody> 
            <tr  v-for="(item,index ) in store.lesson" :key="item.cs_id">
                <td>{{index +1}}</td>
                <td class="text-center">
  <img :src="image(item.cs_cover)" class="img-fluid" width="80" height="80" />
                </td>
                <td>
                  <span class="table-inner-text">
                    {{item.cs_name}}
                  </span>
                </td>
          
                <!-- <td class="text-center">
                  {{item.em_description}}
                </td> -->
              
       
                <td align="center">
             <div class="btn-group-vertical">
            <button type="button" class="btn btn-success" style="background-color:#3F2C73;"  @click="edit(item.cs_id)"> {{ $t("lesson_edit") }}</button>
            <button type="button" class="btn btn-success" style="background-color:#3F2C73;" @click="del(item.cs_id)"> {{ $t("lesson_delete") }}</button>
            </div>
          </td>
            </tr>
        </tbody>
    </table>
</div>


            <!-- pageinate -->

</template>


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { LessonStore } from "@/store/lesson";
import { useToast } from "vue-toastification";
import ApiService from '../../services/api.service';
import moment from "moment-timezone";
const router = useRouter();

const toast = useToast();
const store = LessonStore();
const auth = useAuthStore()



const del = async (item) => {

  store.GetopenModal = true
await store.selectlessId(item)
//await store.fetchLessonId(router.currentRoute.value.params.id)
};
const edit = async (item) => {

  store.GetopenModalEdit = true
  await store.fetchLessonIdedit(item)
};






 

function goToPage(page) {

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