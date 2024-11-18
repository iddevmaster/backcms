<template>
  <div class="widget-content widget-content-area br-8 p-3">
    <div class="widget-header">

  

      <div class="row m-1"  >
       
        <br />
        <div
          class="col-12 col-lg-6 col-xl-6"
         
        >
      
        <div class="row m-1">
      
     

      <div class="col-12 col-sm-12 col-md-12 pt-2">
        <div class="form-group">
          <div class="col-sm-12">
              <div class="card">
           
                <div
                  class="card-body" v-if="storedlt.formdlt_new.image_dlt"
                
                >
                  <img
                    class="aboutimg__1"
                     :src="coverimage(storedlt.formdlt_new.image_dlt)"
                    alt="aboutimg"
                    style="width: 100%"
                  />
                </div>

                <div
                  class="card-body" v-else
                
                >
                  <img
                    class="aboutimg__1"
                     src="../../assets/images/no_photo.jpg"
                    alt="aboutimg"
                    style="width: 100%"
                  />
                </div>
                
     
              </div>
        
            </div>
      
        </div>

      </div>

   
    </div>
      </div>
    
        <div
          class="col-12 col-lg-6 col-xl-6"
         
        >
        

        <div class="row m-1">
      
     

      <div class="col-12 col-sm-12 col-md-12 pt-2">
        <div class="form-group">
          <div class="col-sm-12">

           
              <div class="card">
           
                <div   class="card-body" 
                
                >

                
              <p style="font-size: 24px;">  ເລກທີ:<span> {{  storedlt.foreditdlt.number_licen }}</span></p>
              <p style="font-size: 24px;">  ອອກຊື່:  <span> {{  storedlt.foreditdlt.address_lic }}</span></p>
              <p style="font-size: 24px;">  ປະເພດອະນຸຍາດ:  <span>  {{  Discut(storedlt.foreditdlt.dlt_code) }}</span></p>
              <p style="font-size: 24px;">  ອອກວັນທີ:  <span >  {{  storedlt.foreditdlt.issue_date }}</span></p>
              <p style="font-size: 24px;">  ໝົດອາຍຸ : <span v-if="storedlt.exp_date == false" style="color: green;">  {{  CheckExp(storedlt.foreditdlt.expiry_date) }}</span>  <span v-else style="color: red;">  {{  CheckExp(storedlt.foreditdlt.expiry_date) }}</span></p>
              <p style="font-size: 24px;">  ອອກທີ່: <span> ກຄພຂ ຈຳປາສັກ</span></p>
                </div>

                

                

                
     
              </div>
        
            </div>
      
        </div>

        

      </div>

   
    </div>


    <div class="row m-1">
      
     

      <div class="col-12 col-sm-12 col-md-12 pt-2">
        <div class="form-group">
          <div class="col-sm-12">
              <div class="card">
           
                <div   class="card-body" 
                
                >
              <p style="font-size: 24px;">  ສະຖານະ:  <span style="color: green;">Active</span></p>
              <p style="font-size: 24px;">  ໝາຍເຫດ:  ເຄີຍເຮັດຜິດລະບຽດ ຖືກອອກໃບສັ່ງ 1 ຄັ້ງ</p>
              





                </div>

                

                

                
     
              </div>
        
            </div>
      
        </div>

        

      </div>

   
    </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style  scoped>
@media (min-width: 1025px) {
}
@media (min-width: 1281px) {
  .your-element {
    border-right: 2px solid rgb(241, 241, 241);
  }
}
.checkbox {

  margin: 8px 5px;
}
</style>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import "vue-select/dist/vue-select.css";
import { DltStore } from '@/store/dlt'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment-timezone';

import {
  required,
  minLength,
  helpers,
} from "@vuelidate/validators";

import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import ApiService from "../../services/api.service";

const { locale, setLocale } = useI18n();
const date = ref(new Date());
const toast = useToast();
const store = usersStore();
const storedlt = DltStore();
const user_type = useCookie("user_type"); // useCookie new hook in nuxt 3
const router = useRouter();
const auth = useAuthStore();



const fileInputFont = ref(null);

const { SaveDLT } = storeToRefs(storedlt);


onMounted(() => {

 
});

const rules = computed(() => {
  return {
    image_dlt: {
      required: required
    },
    address_lic: {
      required: required
    },
    number_licen: {
      required: required
    },
    issue_date: {
      required: required
    },
    expiry_date: {
      required: required
    },
    ap_number: {
      required: required
    },
    dlt_code: {
      required: required
    },
    
    
  };
});

storedlt.user_admin = auth.user_id;

const CheckApp = async (item) => {
  store.ModalApp = true;
  store.status_app = item;

  // await router.push("/users/approvestaff");
};

const changeFont = () => {
  // Trigger a click event on the file input element
  fileInputFont.value.click();
};




const changeFileFont = async (event) => {
  var inputs = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith("image/")) {
    if(file.size > 1000000){
      Swal.fire({
      text: "Over Size 1 mb!",
      icon: "error",
    });
return false;
    }
    storedlt.formdlt_new.image_dlt = inputs.files[0];
    storedlt.UploadImageDLT();
  } else {
    Swal.fire({
      text: "Upload File Image Only!",
      icon: "error",
    });
  }


};

const v$ = useVuelidate(rules, SaveDLT);
const Save = async () => {

  v$.value.$validate();
  if (!v$.value.$error) {

    Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
    
  });

  await storedlt.updateolddlt()
let save = await storedlt.savedt()
  console.log(save)
  if(save == true){
    setTimeout(() => {
  Swal.fire({
    icon: 'success',
    title: 'Complete!',
    text: 'Data has been successfully.',
    timer: 1000
  });
}, 1500);
  }
  

  }
 
};



const Reback = async () => {
  await router.push("/appointment/details");
};


const Discut = (xd) => {
  let sentence = xd.join("/");
  return sentence
}



const CheckExp = (xd) => {

  // storedlt.exp_date
 

  const millisecondslast = storedlt.foreditdlt.expiry_date;
  let now = new Date();
  let exp = new Date(millisecondslast);
  const start = now.getTime(); // Convert the date to milliseconds
  const end = exp.getTime(); // Convert the date to milliseconds

  if(start > end){
storedlt.exp_date = true;
  }

  
  return xd;
}


const SearchApp = async () => {

  

  await router.push("/drivinglicense/view/"+storedlt.username);
};

const FitterCh = async (event) => {

if(event.target.value == 'renew' || event.target.value == 'old'){
storedlt.AppisShow = false;
}else {
  storedlt.AppisShow = true;
}

};



const format_start = (xd) => {


const isoFormatInUTC = xd.toISOString();
//return moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm');

storedlt.formdlt_new.issue_date = moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ss');
return moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD');

//  return `Selected date is ${day}/${month}/${year}`;
}



const format_end = (ie) => {

const isoFormatInUTC = ie.toISOString();

storedlt.formdlt_new.expiry_date = moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ss');
return moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD');

}



const isDateDisabled = (date) => {



const currentDate = new Date();
    const disableBeforeDate = new Date(); // Adjust the date as needed
    storedlt.formdlt_new.expiry_date = null

    return date < currentDate || date < disableBeforeDate;
  };

const isDateDisabledEnd = (date) => {

const currentDate = new Date();
 const disableBeforeDate = new Date(storedlt.formdlt_new.issue_date); // Adjust the date as needed
if(!storedlt.formdlt_new.issue_date){
return true;
}

return  date <= currentDate;
}; 


function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}
</script>




