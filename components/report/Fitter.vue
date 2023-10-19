<template>
  <div class="row mb-4">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">Fitter</h4>
      </div>
    </div>

  </div>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
      <input type="text" class="form-control" id="inputEmail3" placeholder="ค้นหา User *" maxlength="10"
        v-model="store.formuser.search" @keyup="searchData">
        <VueDatePicker v-model="store.formuser.search"></VueDatePicker>
    </div>
  </div>
  <div>
    <label>Start Date:</label>
    <input type="date" class="form-control" v-model="startDate" @change="onStartDateChange">

    <label>End Date:</label>
    <input type="date" class="form-control" :min="minEndDate" v-model="endDate" @change="updateDateRange">

    <div v-if="dateRange">
      Selected Range: {{ dateRange.startDate }} to {{ dateRange.endDate }}
    </div>
  </div>



  <button type="button" class="btn btn-primary" @click="search()">ค้นหา</button>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent,ref, computed } from 'vue';
import { ReportStore } from '@/store/report'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
import { doesNotReject } from 'assert';
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();
import Swal from 'sweetalert2';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'



const toast = useToast()
const router = useRouter();
const store = ReportStore();


const startDate = ref("");
    const endDate = ref("");
    const minEndDate = ref(""); 






const backToUser = async () => {
  router.go(-1);
}


const onStartDateChange = () => {
      store.setStartDate(store.startDate);
    };

    const onEndDateChange = () => {
      store.setEndDate(store.endDate);
    };

    const dateRange = computed(() => {
      if (store.startDate && store.endDate) {
        return {
          startDate: store.startDate,
          endDate: store.endDate
        };
      }
      return null;
    });
</script>

<style>
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
}

#image-container img {
  width: 250px;
  height: 250px;
  object-fit: cover;
}

#image-container .delete-button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border: none;
  padding: 2.5px 5px;
  cursor: pointer;
}

#image-container .image-wrapper {
  position: relative;
  display: inline-block;
  margin: 10px;
  border: 1px solid;
}

#image-container {
  width: fit-content;
  min-width: 200px;
  min-height: 200px;
  max-width: 300px;
  max-height: 300px;
}
</style>
