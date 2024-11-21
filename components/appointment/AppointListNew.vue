<template>

<div class="row ps-4 mb-5">
  <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12">
   
    </div>
    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12">

    </div>
    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12">

</div>
<div class="col-xl-1 col-lg-1 col-md-12 col-sm-12">

</div>
    <div class="col-xl-2 col-lg-3 col-md-12 col-sm-12">
    <button type="button" class="btn btn-primary right-button"  @click="UserCreate()">ເພິ່ມຂໍ້ມູນ ຜູ້ໃຊ້ ໃໝ່</button>
    </div>

</div>


  <div class="row ps-4 mb-5">
    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
      <label for="exampleFormControlInput1">Full Name</label>
      <input type="text" class="form-control" id="inputEmail3" placeholder="Full Name *"  maxlength="100"  v-model="store.formselectapp.user_full_name" disabled
       >
    </div>

    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
      <label for="exampleFormControlInput1">Citizen ID / Passport Number</label>
      <input type="text" class="form-control" id="inputEmail3" placeholder="Passport Number *"  maxlength="20"    v-model="store.formselectapp.identification_number" disabled
       >
    </div>




    
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 pt-3">
      <label for="exampleFormControlInput1">Class Type:</label>
      <select
        class="form-select form-select cateSelect"
        aria-label="Default select example"
        v-model="store.form.dlt_code" @change="SearchApp()"
      >
   
        <option
          v-for="(item, index) in store.dlt"
          :key="item.dlt_code"
          :value="item.dlt_code"
        >
        <span v-if="locale == 'la'" >{{item.dlt_code}} : {{item.dlt_name_lo}}</span>
      <span v-if="locale == 'en'" >{{item.dlt_code}} : {{item.dlt_name_lo}}</span>
     
        </option>
      </select>
    </div>


    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 pt-3">
      <label for="exampleFormControlInput1">Appointment time:</label>

  
      <select
      class="form-select form-select cateSelect" :class="store.event.length < 1 && 'bg-warning'"
        aria-label="Default select example"   v-model="store.form.date_event" 
    
        :disabled="store.event.length < 1 ? true : false"
        >
        <option disabled selected :value="0">{{ $t('select') }}...</option>
        
        <option v-for="(events, x) in store.event" :value="events">
           {{format(events.ap_date_first)}} {{events.time}}, Class {{events.dlt_code}} . Avalable: {{calcu(events.ap_quota,events.available)}} seats
        </option>
      </select> 
    </div>

    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 pt-3">
      <label for="exampleFormControlInput1">ID ນັກຮຽນ (ໃນລະບົບເກົ່າ, ສຳລັບປະເພດ B ຂື້ນໄປ ຕ້ອງໄດ້ຜ່ານໂຮງຮຽນ)</label>
      <input type="text" class="form-control" id="inputEmail3" placeholder="ຕຢ: KH0012"  maxlength="20"  v-model="store.formselectapp.id_card"
       >
    </div>

    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 pt-3">
      <button type="button" class="btn btn-primary" style="width: 100%;" @click="SaveAppoint()">{{ $t("menu_user_c_save") }}</button>
    </div>

    
  </div>


</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { AppointStore } from "@/store/appoint";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Paginate from "vuejs-paginate-next";
import { useToast } from "vue-toastification";
import Datepicker from "vuejs3-datepicker";
import moment from "moment";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
const { locale, setLocale } = useI18n();
const picked = ref(new Date());

const router = useRouter();
const toast = useToast();
const store = AppointStore();


// await store.fetchUser()
// await store.fetchAppointment();
const myOptionsUser = JSON.parse(JSON.stringify(store.users));
const myUser = ref();

const { deleteItem } = AppointStore(); //Action

const date = ref(new Date());




const UserCreate = () => {
  router.push('/users/create');
};

const format = (time) => {
  return moment(time).format("DD/MM/YYYY");
};


const formatty = (i) => {
  if(i == 1){
    return '08:00';
  }else {
    return '16:00';
  }

};
const calcu = (i,x) => {

  let a = i-x;
return a;
};



// store.fetchAppointment()

const del = async (id) => {
  store.deleteItem(id);
};

const Search = async (event) => {
  store.fetchAppointmentNew();
};

const SearchApp = async () => {
  store.fetchAppointmentNew();
};


const SaveAppoint = async () => {

  if(store.formselectapp.user_id == null){
    Swal.fire({
      text: 'Select User!',
      icon: 'error',
    });
    return false;
  }
  if(store.form.date_event == null){
    Swal.fire({
      text: 'Appointment time!',
      icon: 'error',
    });
    return false;
}
let save = await store.SaveUserRerv();
console.log(save);
if(save == 200){
 await toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ');

 await router.push('/appointment/dateappointment');
}
if(save == 201){
  toast.error('ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ ມີຢູ່ແລ້ວ')
}
if(save == 202){
  toast.error('QUATA ເຕັມ')
}


};










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


const myChangeEvent = (event) => {
    console.log("myChangeEvent: ", event.value);
  }
  const mySelectEvent = (e) => {
    console.log("mySelectEvent: ", e.value);
  }
</script>
<style scoped>



</style>
