<template>
  <div class="widget-content widget-content-area br-8 p-3">
    <div class="widget-header">


      <div class="row p-3">
        <div class="col-lg-6 col-md-4 col-sm-4">
          <h5>ເພິ່ມ ໃບຂັບຂີ່ ໃຫ້ຜູ້ໃຊ້</h5>
        </div>

        <div class="col-lg-1 col-md-4 col-sm-4">
          <label for="inputEmail3" class="col-sm-12 col-form-label">
             Username :</label
          >
        </div>
        <div class="col-lg-3 col-md-4 col-sm-4">
          <input
            id="t-text"
            type="text"
            name="txt"
            placeholder="A83M100"
            class="form-control"
 
            maxlength="30"
          />
        </div>

        <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3">
          <button
            type="button"
            class="btn btn-primary"
            style="width: 100%; height: 100%; margin-top: auto"
            @click="SearchApp()"
          >
            Search
          </button>
        </div>
      </div>
      <hr style="margin-top: 1px" />
      <br />

      <div class="row m-1">
        <div class="col-12 col-sm-12 col-xl-7 col-lg-7 mb-3"></div>
        <br />

        <div class="col-12 col-sm-7 col-xl-7 col-lg-7 your-element">
          <div class="col-12 col-sm-7 col-xl-12 col-lg-12">
            <div class="form-group row">
              <div class="col-12 col-sm-7 col-xl-4 col-lg-4">
                <div class="col-12 col-sm-12 col-md-12">
                  <div class="form-group row">
                    <div class="invoice-detail-title">
                      <div class="invoice-logo">
                        <div class="profile-image">
                          <div
                            class="img-uploader-content"
                            style="padding: 5px"
                            v-if="store.profile_by_one[0].user_img"
                          >
                            <img
                              :src="
                                coverimage(store.profile_by_one[0].user_img)
                              "
                              alt="avatar"
                              height="150"
                              width="200"
                            />
                          </div>
                          <div
                            class="img-uploader-content"
                            style="padding: 5px"
                            v-else
                          >
                            <img
                              src="../../assets/images/person-avatar.jpg"
                              alt="avatar"
                              class="img-fluid"
                              width="200"
                              height="200"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-7 col-xl-8 col-lg-8">
                <div class="form-group row">
                  <h3>
                    {{ store.profile_by_one[0].user_prefrix }}
                    {{ store.profile_by_one[0].user_firstname }}
                    {{ store.profile_by_one[0].user_lastname }}
                  </h3>
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm"
                  >
                    {{ store.profile_by_one[0].user_full_name }}
                  </label>
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    {{ $t("tel") }}:
                    {{ store.profile_by_one[0].user_phone }}</label
                  >
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    {{ $t("email") }}:
                    {{ store.profile_by_one[0].user_email }}</label
                  >
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    Username: {{ store.profile_by_one[0].user_name }}</label
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4 col-sm-12 col-md-4">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("passport_update_acc_label") }}:
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("form_approve_passport_exp") }}:
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("form_approve_birth_day") }}:
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("form_approve_cou") }}:
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("form_approve_address") }}:
                </label>
              </div>
            </div>

            <div class="col-8 col-sm-12 col-md-8">
              <div class="form-group row">
                <label
                  v-if="store.profile_by_one[0].identification_number"
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  {{ store.profile_by_one[0].identification_number }}</label
                >

                <label
                  v-else
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  -</label
                >
              </div>
              <div class="form-group row">
                <label
                  v-if="store.profile_by_one[0].exp_date"
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  {{ store.profile_by_one[0].exp_date }}</label
                >
                <label
                  v-else
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  -</label
                >
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  {{ store.profile_by_one[0].user_birthday }}</label
                >
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  ລາວ</label
                >
              </div>
              <div class="form-group row">
                <label
                  v-if="store.profile_by_one[0].user_address"
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  {{ store.profile_by_one[0].user_address }}
                </label>

                <label
                  v-else
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  -
                </label>
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  {{ store.profile_by_one[0].amphur_name }} -
                  {{ store.profile_by_one[0].province_name }}
                </label>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4 col-sm-12 col-md-4">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("form_approve_pass_image") }}:
                </label>
              </div>
            </div>

            <div class="col-8 col-sm-12 col-md-8">
              <div
                class="form-group row"
                v-if="store.profile_by_one[0].passpost_image"
              >
                <img
                  :src="coverimage(store.profile_by_one[0].passpost_image)"
                  class="img-fluid"
                  width="80"
                  height="80"
                />
              </div>

              <div class="form-group row" v-else>
                <img
                  src="../../assets/images/no_photo.jpg"
                  class="img-fluid"
                  width="80"
                  height="80"
                />
              </div>
            </div>
          </div>

          <br />

          <div class="row">
            <div class="col-4 col-sm-12 col-md-4">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("form_approve_real_image") }}:
                </label>
              </div>
            </div>

            <div class="col-8 col-sm-12 col-md-8">
              <div
                class="form-group row"
                v-if="store.profile_by_one[0].real_image"
              >
                <img
                  :src="coverimage(store.profile_by_one[0].real_image)"
                  class="img-fluid"
                  width="80"
                  height="80"
                />
              </div>
              <div class="form-group row" v-else>
                <img
                  src="../../assets/images/no_photo.jpg"
                  class="img-fluid"
                  width="80"
                  height="80"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-12 col-lg-5 col-xl-5"
          v-if="store.profile_by_one[0].status == 'Y'"
        >
          <div class="col-12 col-sm-12 col-lg-5 col-xl-5"></div>

          <div class="row m-1">
            {{ storedlt.formdlt_new }}
            <div class="col-12 col-sm-12 col-md-12">
              <div class="form-group">
                <label for="exampleInputEmail1">ຈຸດປະສົ່ງການເພິ່ມ:</label>
                <select class="form-control" v-model="storedlt.formdlt_new.type">
        <option value="new">{{ $t("pass_card") }}</option>
        <option value="renew">{{ $t("renew_card") }}</option>
        <option value="old">{{ $t("old_card") }}</option>
      </select>
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <div class="form-group">
                <label for="exampleInputEmail1">ເຊື່ອມຫາ ID ນັດໝາຍ:</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="A83M100"
                  
                  v-model="storedlt.formdlt_new.ap_number"
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
                 v-model="storedlt.formdlt_new.number_licen"
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
                     v-model="storedlt.formdlt_new.address_lic"
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
                <VueDatePicker v-model="storedlt.formdlt_new.issue_date" :format="format_start"  :disabled-dates="isDateDisabled" required ></VueDatePicker>
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
                <VueDatePicker v-model="storedlt.formdlt_new.expiry_date" :format="format_end"  :disabled-dates="isDateDisabledEnd" required></VueDatePicker>
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
        v-model="storedlt.formdlt_new.dlt_code" 
      />
      {{ fruit }}
    </label>
    {{ storedlt.formdlt_new.dlt_code }}
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
                  <button     style="width: 100%;" @click="Save()"
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


onMounted(() => {
  if (process.client) {
    fileInputFont.value.addEventListener("change", changeFileFont);
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

const v$ = useVuelidate(rules, SaveDLT);
const Save = async () => {

  v$.value.$validate();
  if (!v$.value.$error) {
await storedlt.updateolddlt()
await storedlt.savedt()
    Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
    
  });
  
  

  }
 
};

const Reback = async () => {
  await router.push("/appointment/details");
};

const SearchApp = async () => {

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




