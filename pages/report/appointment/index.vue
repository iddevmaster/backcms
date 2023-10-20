<template>
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-8 col-12 layout-spacing">
                        <div class="widget widget-five">
                            <div class="widget-heading">
                        </div>
                        <div class="widget-content">
                            <div>
    <div id="form_grid_layouts" class="col-lg-12">
      <div class="seperator-header">
        <h4 class="">Fitter</h4>
      </div>
    </div>
  </div>

  <div class="row">
 <Fitter></Fitter>

 <div class="col-lg-6 col-md-6 col-sm-6 mb-4">
  <Dlt></Dlt>
     </div>


       <div class="col-lg-6 col-md-6 col-sm-6 mb-4">
  <Aplearn></Aplearn>
     </div>


  </div>
                   <div>
                     <button type="button" class="btn btn-primary" @click="search">ค้นหา</button>
                    </div>
                        </div>
                    </div>
                </div>      
            </div>


            <div class="row layout-top-spacing">
          <div
            class="col-xl-12 col-lg-12 col-md-12 col-sm-8 col-12 layout-spacing"
          >
            <div class="widget widget-five">
              <div class="widget-heading"></div>
              <div class="widget-content">
                <div>
                  <div id="form_grid_layouts" class="col-lg-12">
                    <div class="seperator-header">
                      <h4 class="">Report Appointment</h4>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
                  <TableAppoint  v-if="store.reportappoint.length > 0"></TableAppoint>
                  <TableNodata  v-else></TableNodata>
                </div>
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
import Fitter from '@/components/report/Fitter.vue'
import ButtonSearch from '@/components/report/ButtonSearch.vue'
import Aplearn from '@/components/report/Aplearn.vue'
import Dlt from '@/components/report/Dlt.vue'
import Learn from '@/components/report/Learn.vue'
import Status from '@/components/report/Status.vue'
import TableAppoint from '@/components/report/TableAppoint.vue'
import TableNodata from "@/components/report/TableNodata.vue";
import Swal from 'sweetalert2';
import { Bar } from 'vue-chartjs';
import { ReportStore } from '@/store/report'; // import the auth store we just created
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


const store = ReportStore();


const date = ref();

// For demo purposes assign range from the current date
onMounted(() => {
   store.ResetFormSearch();
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
})



const searchData = async () => {

};


const search = async () => {
store.FitterAppoint();
};

const onChange = async (event) => {
 

};




const Sel = async (id) => {


}

const backToUser = async () => {
  router.go(-1);
}


</script>
<style scoped></style>