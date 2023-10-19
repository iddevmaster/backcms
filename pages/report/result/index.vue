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
<!-- <button @click="loadNewData">Load New Data</button> -->
                   <Fitter></Fitter> 
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
import Swal from 'sweetalert2';
import { Bar } from 'vue-chartjs';
import { ReportStore } from '@/store/report'; // import the auth store we just created
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
const store = ReportStore();


const searchData = async () => {

};




const search = async () => {



 
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