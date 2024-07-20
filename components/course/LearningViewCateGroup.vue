<template>
          <div class="widget-content widget-content-area br-8 p-3">
              <div class="widget-header">
                <div class="row pt-3">
                  <div class="col-xl-8 col-sm-12 col-7">
                    <h3>{{ $t("menu_couse_view_table_header_g") }}</h3>
                  </div>
                  <div class="col-xl-4 col-sm-12 col-5" style="
    text-align: right;
">
                   
                  </div>       
                </div>

         
                <div class="row pt-3">
                  <span class="border-bottom"></span>
                </div>
              </div>

              <div class="row pl-3 pt-3">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">ໝວດວິຊາ</th>
                        <th class="text-center" scope="col">จำนวน</th>
                         <th class="text-center" scope="col">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr  v-for="(item, index) in store.clustercourse">
                        <td>{{index + 1}}</td>
                        <td>
                          
                       
                          {{ locale == "la" ? item.cg_name_lo : item.cg_name_eng }}
                        </td>
                        <td class="text-center">{{item.cg_amount_random}}</td>
                         <td>
            <div class="action-btns">
        
            
                <a
                  href="javascript:void(0);"
                  class="action-btn btn-edit bs-tooltip me-2"
                  data-toggle="tooltip"
                  data-placement="top"
                   @click="edit(item)"
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
              </div>


              <div class="row pl-3 pt-3">
                <div class="table-responsive">
                  <ul>
      <li
      v-for="(item, index) in store.clustercourse"
        :key="item.cct_id"
        :draggable="true"
        @dragstart="onDragStart($event, index)"
        @dragover="onDragOver($event, index)"
        @drop="onDrop($event, index)"
      >
        {{ item.cg_name_lo }}
      </li>
    </ul>


    <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">ໝວດວິຊາ</th>
                        <th class="text-center" scope="col">จำนวน</th>
                         <th class="text-center" scope="col">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr  v-for="(item, index) in store.clustercourse"   :key="item.cct_id"
        :draggable="true"
        @dragstart="onDragStart($event, index)"
        @dragover="onDragOver($event, index)"
        @drop="onDrop($event, index)">
                        <td>{{index + 1}}</td>
                        <td>
                          
                       
                          {{ locale == "la" ? item.cg_name_lo : item.cg_name_eng }}
                        </td>
                        <td class="text-center">{{item.cg_amount_random}}</td>
                         <td>
            <div class="action-btns">
        
            
                <a
                  href="javascript:void(0);"
                  class="action-btn btn-edit bs-tooltip me-2"
                  data-toggle="tooltip"
                  data-placement="top"
                   @click="edit(item)"
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
              </div>


            </div>
</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { GroupStore } from "@/store/group";
import { LessonStore } from "@/store/lesson";
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import 'vue-select/dist/vue-select.css';

import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
const { locale, setLocale } = useI18n();

const toast = useToast();
const store = GroupStore();
defineProps({
  id: {
    type: String,
    required: false,
    default: () => ({}),
  },
});

const router = useRouter();


const items = ref([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
]);

let draggedItemIndex = null;



  const onDragStart = (event, index) => {
  draggedItemIndex = index;
  event.dataTransfer.effectAllowed = 'move';
};

const onDragOver = (event, index) => {
  event.preventDefault();
};


const onDrop = (event, index) => {
  event.preventDefault();
  const draggedItem = store.clustercourse[draggedItemIndex];
 
  store.clustercourse.splice(draggedItemIndex, 1);
 
  store.clustercourse.splice(index, 0, draggedItem);

  console.log(store.clustercourse);
};

  

const MyGroup = async (id) => {
  await router.push("/learning/group/" + id);
}

const del = async (item) => {
 
store.cct_id = item.cct_id;
  store.GetopenModalDe = true;

}

const edit = async (item) => {
 
  store.cct_id = item.cct_id;
  store.cg_amount_random = item.cg_amount_random;
  store.GetopenModalGEdit = true;

}




</script>


