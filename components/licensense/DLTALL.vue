<template>

  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input id="t-text" type="text" name="txt" placeholder="ເລກທີື່ / ອອກຊື່" class="form-control" required=""
      v-model="stores.formsearchdlt.search" @keyup="searchData" />
    </div>



  </div>

  <div class="table-responsive">
    <table id="example" class="table table-bordered" style="width:100%">
      <thead>
        <tr>
          <th >#</th>
          <th >
         
            {{ $t("profile_table_dlt_num") }}
          </th>
          <th>
         
            {{ $t("profile_table_dlt_add") }}
          </th>
          <th>
         
            {{ $t("profile_table_dlt") }}
          </th>
          <th>
            {{ $t("profile_dlt_exp_day") }}
         
          </th>
          <th>
         
            ແຂວງ
          </th>
          <th>
            ສະຖານະ
          </th>
          <th>
            Action
          </th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="(item ,index) in stores.mydlt.data" :key="item.id">
  
          <td> 
            {{
              stores.formsearchdlt.page * stores.formsearchdlt.per_page -
              (stores.formsearchdlt.per_page - index) +
              1
            }}
          </td>
        
          <td>  {{ item.number_licen }}</td>
          <td>   {{ item.address_lic }} </td>
          <td>  {{ item.dlt }}</td>
          <td>  {{ item.expiry_date }}</td>
          <td> {{ item.province_name }} </td>
          <td> {{ item.type_status }} </td>
        
          <td>
            
            <a class="badge badge-light-primary text-start me-2 action-view"  >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"    /></svg    ></a>
  
          <NuxtLink >
            <a class="badge badge-light-primary text-start me-2 action-edit"  @click="EditDri(item)">
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
          
       
          
      
           
            
        </td>
          
         

        </tr>
      </tbody>
    </table>

    <div>


<span>Showing {{ (stores.current_page - 1 ) * stores.formsearchdlt.per_page + 1}}  to {{ Math.min(stores.current_page * stores.formsearchdlt.per_page, stores.total)}}  of {{stores.total}} entries</span>

<div class="dt--pagination" v-if="stores.total_page > 1">
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
        v-for="page in stores.total_page"
        :key="page"
      >
        <a
          href="#"
          aria-controls="zero-config"
          data-dt-idx="1"
          tabindex="0"
          class="page-link"
          :class="{ bgcx: page === stores.formsearchdlt.page }"
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


   
  </div>
</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { DltStore } from '@/store/dlt'
import 'jquery/dist/jquery.min.js';
//Datatable Modules

import { useToast } from 'vue-toastification'
import moment from "moment-timezone";
import { useI18n } from "vue-i18n";
import { email } from '@vuelidate/validators';
const { locale, setLocale } = useI18n();

const router = useRouter();
const toast = useToast()
const stores = DltStore()


await stores.fetchdltuser();
const searchData = async () => {
  await stores.fetchdltuser() 
};



const setCurrentPageclick = async (page) => {
 await stores.setCurrentPageq (page)
  await stores.fetchdltuser()
};

const EditDri = async (item) => {


router.push("/drivinglicense/edit/"+item.ids);
};
  



const Prev = async () => {
  if (stores.formsearchdlt.page == 1) {
    await stores.fetchdltuser();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
    stores.formsearchdlt.page -= 1;
    await stores.fetchdltuser();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }
};

const Next = async () => {
  if (stores.formsearchdlt.page == stores.total_page) {
    stores.formsearchdlt.page = stores.total_page;
    await stores.fetchdltuser();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
    stores.formsearchdlt.page += 1;
    await stores.fetchdltuser();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }
};

function coverttime(date) {
  const datetime = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDatetime = datetime.toLocaleString(undefined, options);

  return formattedDatetime;

}




</script>
<style scoped>


.bgcx {
  color: #0a58ca;
}
.dt--pagination {
  float: right;
}


.gridarea__img img {
  object-fit: cover;
  height: 200px;
  width: 100%;
}

p.disctext {
  white-space: nowrap; 
  width: 400px; 
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>