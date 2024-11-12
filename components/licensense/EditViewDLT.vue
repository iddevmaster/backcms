<template>
  <div class="widget-content widget-content-area br-8 p-3">
    <div class="widget-header">




      <div class="row m-1">
   

   
        <div
          class="col-8 col-lg-8 col-xl-8"
          
        >
       
          <div class="row m-1">
      
            <div class="col-8 col-sm-12 col-md-12">
              <div class="form-group">
                <label for="exampleInputEmail1">ຈຸດປະສົ່ງການເພິ່ມ:</label>
                <select class="form-control" @change="FitterCh($event)" v-model="storedlt.foreditdlt.type">
        <option value="new">{{ $t("pass_card") }}</option>
        <option value="renew">{{ $t("renew_card") }}</option>
        <option value="old">{{ $t("old_card") }}</option>
      </select>
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2" >
              <div class="form-group">
                <label for="exampleInputEmail1">ເຊື່ອມຫາ ID ນັດໝາຍ:</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="A83M100"
                  
                  v-model="storedlt.foreditdlt.ap_number"
                  
                />
                <span
                          v-if="v$.ap_number.$error"
                          class="text-xs text-red-500"
                          style="color: red"
                        >
                        ນັດໝາຍ</span
                        >
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <div class="form-group">
                <label for="exampleInputEmail1">ເລກທີ:</label><span style="color: red;"> * </span>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="ຕົວຢ່າງ: ຂສ 0012345"
                 v-model="storedlt.foreditdlt.number_licen"
                 :class="{
                        'border-red-500 focus:border-red-500':
                          v$.number_licen.$error,
                        'border-[#42d392] ': !v$.number_licen.$invalid,
                      }"
                      @change="v$.number_licen.$touch"
                />
                <span
                          v-if="v$.number_licen.$error"
                          class="text-xs text-red-500"
                          style="color: red"
                        >
                        ເລກທີ</span
                        >
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <div class="form-group">
                <label for="exampleInputEmail1">ອອກຊື່:</label><span style="color: red;"> * </span>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="ຕົວຢ່າງ: ທ້າວ ກກກກກກ ຂຂຂຂຂຂຂ"
                  :class="{
                        'border-red-500 focus:border-red-500':
                          v$.address_lic.$error,
                        'border-[#42d392] ': !v$.address_lic.$invalid,
                      }"
                      @change="v$.address_lic.$touch"
                     v-model="storedlt.foreditdlt.address_lic"
                />

                <span
                          v-if="v$.address_lic.$error"
                          class="text-xs text-red-500"
                          style="color: red"
                        >
                        ອອກຊື່</span
                        >
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <div class="form-group">
                <label for="exampleInputEmail1">ວັນທີອອກບັດ:</label><span style="color: red;"> * </span>
                <VueDatePicker v-model="storedlt.foreditdlt.issue_date" :format="format_start"  :disabled-dates="isDateDisabled" required ></VueDatePicker>
              </div>
              <span
                          v-if="v$.issue_date.$error"
                          class="text-xs text-red-500"
                          style="color: red"
                        >
                        ວັນທີອອກບັດ</span
                        >
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <div class="form-group">
                <label for="exampleInputEmail1">ວັນທີໝົດອາຍຸ:</label><span style="color: red;"> * </span>
                <VueDatePicker v-model="storedlt.foreditdlt.expiry_date" :format="format_end"  :disabled-dates="isDateDisabledEnd" required></VueDatePicker>
              </div>
              <span
                          v-if="v$.expiry_date.$error"
                          class="text-xs text-red-500"
                          style="color: red"
                        >
                        ວັນທີໝົດອາຍຸ</span
                        >
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <label for="exampleInputEmail1">ປະເພດອະນຸຍາດ:</label><span style="color: red;"> * </span>
              <div class="form-group">
                
                <label v-for="fruit in storedlt.dltc" :key="fruit" class="checkbox" style="padding-left: 3px;">
                  {{ fruit }}
      <input 
        type="checkbox" 
        :value="fruit" 
        v-model="storedlt.foreditdlt.dlt_code" 
      />
     
    </label>
 
              </div>
              <span
                          v-if="v$.dlt_code.$error"
                          class="text-xs text-red-500"
                          style="color: red"
                        >
                        ອອກຊື່</span
                        >
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <div class="form-group">
                <div class="col-sm-12">
                    <div class="card">
                      <div class="card-body">
                        <span>ຮູບໃບຂັບຂີ່ :</span
                        ><span class="text-xs text-red-500" style="color: red"
                          >ກະລຸນາສະແກນບັດຕົວຈິງ, ແນະນຳຂະໜາດ 1000x650 px, ບໍ່ເກີນ 1MB</span
                        >
                        <span style="float: inline-end">
                          <input
                            type="file"
                           ref="fileInputFont"
                            style="display: none"
                          />
                          <button     @click="changeFont"
                            class="changeImg btn btn-success"
                          
                          >
                            Browse
                          </button>
                        </span>
                      </div>
                      <div
                        class="card-body" v-if="storedlt.foreditdlt.image_dlt"
                      
                      >
                        <img
                          class="aboutimg__1"
                           :src="coverimage(storedlt.foreditdlt.image_dlt)"
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

              <span
                          v-if="v$.image_dlt.$error"
                          class="text-xs text-red-500"
                          style="color: red"
                        >
                          Update Image Licen</span
                        >
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <div class="form-group">
                <div class="col-sm-12">
                  <button     style="width: 100%;" @click="Update()"
                            class="changeImg btn btn-primary"
                          
                          >
                          ບັນທຶກ
                          </button>
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
const { UpdateSaveDLT } = storeToRefs(storedlt);

onMounted(() => {
  if(storedlt.user_id){
    if (process.client) {
    fileInputFont.value.addEventListener("change", changeFileFont);
  }

  }
 
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

const v$ = useVuelidate(rules, UpdateSaveDLT);
const Update = async () => {

  v$.value.$validate();
  if (!v$.value.$error) {

    Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
    
  });


let save = await storedlt.updatesavedt()
  
  if(save == true){
   
    setTimeout(() => {
  Swal.fire({
    icon: 'success',
    title: 'Complete!',
    text: 'Update Data has been successfully.',
    timer: 1000
  });
}, 1500);
  }
  

  }
 
};



const Reback = async () => {
  await router.push("/appointment/details");
};



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




