<template>
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 layout-spacing">
                        <div class="widget widget-five">

                            <div class="widget-heading">


                        </div>


                        <div class="widget-content">
<!-- <button @click="loadNewData">Load New Data</button> -->
                    

   <Bar :data="store.datacollection" />
                          


                        </div>

                    </div>

                </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing">
                        <div class="widget widget-card-four">
                            <div class="widget-content">
                         <!-- <LogFitter></LogFitter> -->

                           <div class="row mb-4">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">Fitter</h4>
      </div>
    </div>

    <div class="col-sm-12">
      <label for="exampleFormControlInput1">Fiiter Type</label>
      <select class="form-control" v-model="store.formfitter.type">
        <option value="1">Lesson</option>
        <option value="2">Course</option>
        <option value="3">Course && User</option>
      </select>
    </div>
    <div class="col-sm-12">
      <label for="exampleFormControlInput1">Year</label>
      <select class="form-control" v-model="store.formfitter.year">
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
      </select>
    </div>


    <div class="col-sm-12">
      <label for="exampleFormControlInput1">Course ID</label>
      <select class="form-control" v-model="store.formfitter.course_id" @change="onChange($event)">
        <option disabled :value="null">
          เลือก
        </option>
        <option v-for="(item, i) in store.courselist" :value="item.course_id">
          {{ item.course_name }}
        </option>
      </select>
    </div>

    <div class="col-sm-12" v-if="store.formfitter.type != '2' && store.formfitter.type != '3'">
      <label for="exampleFormControlInput1">Lesson ID</label>
      <select class="form-control" v-model="store.formfitter.cs_id">
        <option disabled :value="null">
          เลือก
        </option>
        <option v-for="(less, i) in store.lessonlist" :value="less.cs_id" v-if="store.lessonlist">
          {{ less.cs_name }}
        </option>
      </select>
    </div>
  </div>
  <div class="row layout-top-spacing" v-if="store.formfitter.type == '3'">
    <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
      <input type="text" class="form-control" id="inputEmail3" placeholder="ค้นหา User *" maxlength="10"
        v-model="store.formuser.search" @keyup="searchData">
    </div>
  </div>

  <div class="col-sm-12" v-if="store.formfitter.type == '3'">
    <div class="table-responsive">
      <table id="example" class="table table-bordered" style="width:100%">
        <thead>
          <tr>
            <th>{{ $t("menu_result_name") }} &#8597;</th>
            <th>{{ $t("menu_result_phone") }} &#8597;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(users, index) in store.userall" :key="users.user_id" @click="Sel(users.user_id)"
            :class="{ 'table-success': store.myChoose === users.user_id }">
            <td>{{ users.user_firstname }} {{ users.user_lastname }}</td>
            <td>{{ users.user_phone }}</td>
          </tr>
        </tbody>
      </table>


    </div>
  </div>





  <button type="button" class="btn btn-primary" @click="search()">ค้นหา</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>

    </div>
    <!--  BEGIN FOOTER  -->

    <!--  END FOOTER  -->
</div></template>
<script setup lang="ts">
    definePageMeta({
    middleware: 'auth' // this should match the name of the file inside the middleware directory 
})

/*Call Components*/
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { defineComponent } from 'vue';
import LogFitter from '@/components/log/LogFitter.vue'
import Swal from 'sweetalert2';
import { Bar } from 'vue-chartjs';
import { LogStore } from '@/store/log'; // import the auth store we just created
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
const store = LogStore();



const year = new Date().getFullYear();
store.formfitter.year = year;

await store.fetchCourslist()


const searchData = async () => {
  store.myChoose = [];
  await store.fetchUsers()
};

const chartData = ref(store.datacollection);



const loadNewData = async () => {



     store.datacollection = {
        labels: ['January', 'February', 'March'],
        datasets: [{
          label: 'New Data',
          backgroundColor: ['#FAE043', '#2A9D8F', '#E63946'],
          data: [
            Math.floor(Math.random() * 50),
            Math.floor(Math.random() * 50),
            Math.floor(Math.random() * 50)
          ]
        }]
      };


};

const search = async () => {



  if (store.formfitter.type == '1') {
    if(store.formfitter.cs_id == null){
      Swal.fire({
    text: 'กรุณาเลือก Lesson ที่มีบทเรียน !',
    icon: 'error',
  });

    }else {
  await store.fetchReport();

  await updatechart();
    }


  }
  if (store.formfitter.type == '2') {
 

  if(store.formfitter.course_id == null){
      Swal.fire({
    text: 'กรุณาเลือก Course!',
    icon: 'error',
  });

    }else {
     await store.fetchReport();

     await updatechart();
     
      
    }

  }
  if (store.formfitter.type == '3') {

    

    if(store.formfitter.user_id == null){
      Swal.fire({
    text: 'กรุณาเลือก Users!',
    icon: 'error',
  });

    }else {
     await store.fetchReport();

await updatechart();
     

      
    }



  }
 
};

const onChange = async (event) => {
  store.formfitter.cs_id = null;
  await store.fetchLesson();

};


const updatechart = async () => {


store.datacollection = {
        labels: ['ມັງກອນ', 'ກຸມພາ', 'ມີເຄື່ອງໝາຍ.','ເດືອນເມສາ','ອາດ','ເດືອນມິຖຸນາ','ກໍລະກົດ','ສິງຫາ','ກັນຍາ','ຕຸລາ','ພະຈິກ','ທັນວາ'],
        datasets: [{
          label: 'Report E-learning',
          backgroundColor: ['#FAE043', '#2A9D8F', '#E63946'],
          data: [store.reportlog[0],store.reportlog[1],store.reportlog[2],store.reportlog[3],store.reportlog[4],store.reportlog[5],store.reportlog[6],
          store.reportlog[7],store.reportlog[8],store.reportlog[9],store.reportlog[10],store.reportlog[11]]
        }]
      };
};




const Sel = async (id) => {
  store.formfitter.user_id = id;
  store.myChoose = id;

}

const backToUser = async () => {
  router.go(-1);
}


</script>
<style scoped></style>