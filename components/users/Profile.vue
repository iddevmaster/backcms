<template>
  <div class="widget-content widget-content-area br-8 p-3">
    <div class="widget-header">
      <div class="row p-3">
        <div class="col-10 col-sm-12 col-md-10">
          <div class="form-group row">
            <h5>{{ $t("profile_details_de") }}</h5>
          </div>
        </div>
        <div class="col-12 col-md-2">
          <div class="row"><button class="btn btn-primary" @click="BackUser()">{{ $t("user_profile_button_back") }} </button></div>

         
        </div>
      </div>
      <hr style="margin-top: 1px" />
    <br>
   
    

      <div class="row m-1">
        <div class="col-12  col-sm-12 col-xl-7 col-lg-7 mb-3">


<div class="form-group" style="text-align: right;">
                  <button type="button" class="btn btn-danger"  @click="EditUser(store.profile_by_one[0].user_id)">{{ $t("user_profile_button_edit") }}</button>
 </div>
        </div>
        <br>
        
        <div class="col-12  col-sm-7 col-xl-7 col-lg-7 your-element">
         
    

            <div class="col-12 col-sm-7 col-xl-12 col-lg-12">

              <div class="form-group row">
                <div class="col-12 col-sm-7 col-xl-4 col-lg-4">
                  <div class="col-12 col-sm-12 col-md-12">
              <div class="form-group row">
                <div class="invoice-detail-title">
                  <div class="invoice-logo">
                    <div class="profile-image">
                  
                      <div class="img-uploader-content" style="padding: 5px" v-if="store.profile_by_one[0].user_img">
                        <img
                          :src="coverimage(store.profile_by_one[0].user_img)"
                          alt="avatar"
                          class="img-fluid"
                     
                        />
                      </div>
                      <div class="img-uploader-content" style="padding: 5px" v-else>
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
                <h3>{{store.profile_by_one[0].user_prefrix}} {{store.profile_by_one[0].user_firstname}}  {{store.profile_by_one[0].user_lastname}} </h3>
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                {{store.profile_by_one[0].user_full_name}} 
                </label>
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("tel") }} :  {{store.profile_by_one[0].user_phone}}</label
                >
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                {{ $t("email") }} :  {{store.profile_by_one[0].user_email}}</label
                >
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                Username:  {{store.profile_by_one[0].user_name}}</label
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
                    {{ $t("form_approve_passport") }}:
                  </label>
                </div>

                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    {{ $t("form_approve_birth_day") }} :
                  </label>
                </div>

                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    {{ $t("form_approve_passport_exp") }} :
                  </label>
                </div>

                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    {{ $t("form_approve_cou") }} :
                  </label>
                </div>

                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    {{ $t("form_approve_address") }} :
                  </label>
                </div>
              </div>

              <div class="col-8 col-sm-12 col-md-8">
                <div class="form-group row">
                  <label v-if="store.profile_by_one[0].identification_number"
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm"
                  >
                  {{store.profile_by_one[0].identification_number}}</label
                  >

                  <label v-else
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm"
                  >
                  -</label
                  >
                </div>
                <div class="form-group row">
                  <label v-if="store.profile_by_one[0].exp_date"
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm"
                  >
                  {{store.profile_by_one[0].exp_date}}</label
                  >
                  <label v-else
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
                  {{store.profile_by_one[0].user_birthday}}</label
                  >
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm"
                  >
                  {{store.profile_by_one[0].country_name_eng}}</label
                  >
                </div>
                <div class="form-group row">
                  <label v-if="store.profile_by_one[0].user_address"
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm"
                  >
                  {{store.profile_by_one[0].user_address}}
                </label

                
                  >

                  <label v-else
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm"
                  >
                 -
                </label

                
                  >
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm"
                  >
                  {{store.profile_by_one[0].amphur_name}} -  {{store.profile_by_one[0].province_name}}
                </label
                  >
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
                    {{ $t("form_approve_pass_image") }} :
                  </label>
                </div>
              </div>

              <div class="col-8 col-sm-12 col-md-8">
                <div class="form-group row"  v-if="store.profile_by_one[0].passpost_image">
                  <img
                     :src="coverimage(store.profile_by_one[0].passpost_image)"
                    class="img-fluid"
                    width="80"
                    height="80"
                  />
                </div>

                <div class="form-group row"  v-else>
                  <img
                     src="../../assets/images/no_photo.jpg"
                    class="img-fluid"
                    width="80"
                    height="80"
                  />
                </div>
              </div>
            </div>


            <div class="row mt-5">
              <div class="col-12 col-sm-12 col-md-7">
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl" style="font-size: 24px;"
                  >
              
                   {{ $t("form_approve_status") }}: 
                  
                  <span style="color: #11901E;" v-if="store.profile_by_one[0].verify_account == 'system_active'"> {{ $t("system_active") }}</span>
                  <span style="color: #FFA927;" v-else-if="store.profile_by_one[0].verify_account == 'phone_active'"> {{ $t("phone_active") }}</span>
                
                  <span style="color: #FF0000;" v-else-if="store.profile_by_one[0].verify_account == 'system_unactive'"> {{ $t("system_unactive") }}</span>
                  <span style="color: #FF0000;" v-else> {{store.profile_by_one[0].verify_account}}</span>
                  </label>
                </div>
              </div>
     

              <div class="col-12 col-sm-12 col-md-5">
                <div class="form-group row">
                  <button type="button" class="btn btn-danger" @click="Editstatus()">{{ $t("user_profile_button_edit_status") }}</button>
                </div>
              </div>
            </div>

          
            <div class="row mb-5" v-if="store.comment.length > 0">
              <div class="col-12 col-sm-12 col-md-12">
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl" style="font-size: 18px;"
                  >
                  ໝາຍເຫດ:  {{ store.comment[0].comment_details }}

        
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
                     {{ $t("form_approve_real_image") }} :
                  </label>
                </div>
              </div>

              <div class="col-8 col-sm-12 col-md-8">
                <div class="form-group row" v-if="store.profile_by_one[0].real_image">
                  <img
                     :src="coverimage(store.profile_by_one[0].real_image)"
                    class="img-fluid"
                    width="80"
                    height="80"
                  />
                </div>
                <div class="form-group row"  v-else>
                  <img
                     src="../../assets/images/no_photo.jpg"
                    class="img-fluid"
                    width="80"
                    height="80"
                  />
                </div>
              </div>
            </div>


            <div class="row mt-5">
              <div class="col-12 col-sm-12 col-md-12">
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl" v-if="store.log_user.length > 0" style="font-size: 24px;"
                  >
                   {{ $t("log_edit_date") }}:  {{store.log_user[0].udp_date}}   ໂດຍ: {{store.profile_by_one[0].user_firstname}} 

                  </label>

                  <label
                    for="company-name" style="font-size: 24px;"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl" v-else
                  >
                   {{ $t("log_edit_date") }}: - 

                  </label>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12 col-sm-12 col-md-12">
                <div class="form-group row">
                  <label v-if="store.log_admin.length > 0"
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl" style="font-size: 20px;"
                  >
                  {{ $t("log_edit_approve_date") }}:{{  store.log_admin[0].update_data}}   ໂດຍ: {{  store.log_admin[0].user_name}}
                  </label>

                  <label v-else
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl" style="font-size: 20px;"
                  >
                 {{ $t("log_edit_approve_date") }}:  -
                  </label>
                </div>
              </div>
            </div>
         
        </div>
        <!-- <div class="col-12 col-lg-5 col-xl-5" v-if="store.profile_by_one[0].status == 'W'">
          <div class="col-12 col-sm-12 col-lg-5 col-xl-5">
          <button class="btn btn-danger">{{ $t("user_profile_button_edit") }}</button>
        </div>
      
        </div> -->
      </div>
    </div>
  </div>

  <div class="modal" v-if="store.modal_update_status">
    <div class="modal-content" id="deleteConformationLabel">
      <div class="modal-header">
        <h1 class="modal-title" id="exampleModalLabel">ຢືນຢັນ ?</h1>
      </div>
        <div class="modal-body">


  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-4 col-form-label">ສະຖານະ :</label>
    <label for="inputEmail3" class="col-sm-8 col-form-label"  style="color: chartreuse;">
      <select
                      class="common__login__input px-2 form-control"
                      aria-label="Default select example"
                      v-model="store.formupdatestatus.verify_account"
                    >
                      <option selected value="" disabled>
                        {{ $t("choose") }}
                      </option>
                      <option value="unactive">{{ $t("unactive") }}</option>
                      <option value="phone_unactive">
                        {{ $t("phone_unactive") }}
                      </option>
                      <option value="phone_active">
                        {{ $t("phone_active") }}
                      </option>
                      <option value="system_unactive">
                        {{ $t("system_unactive") }}
                      </option>
                      <option value="system_active">
                        {{ $t("system_active") }}
                      </option>
                    </select>
    </label>
  
  </div>

  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-4 col-form-label">ໝາຍເຫດ :</label>
    <label for="inputEmail3" class="col-sm-8 col-form-label">



      <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="" v-model="store.comment_details"
   
            >
            </textarea>
    </label>
  </div>




      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="Hide()">ຍົກເລີກ</button>
        <button type="button" class="btn btn-primary" @click="UpdateStatus()">ຢືນຢັນ</button>
      </div>
    </div>
  </div>
</template>

<style  scoped>

@media (min-width:1025px) {


 }
@media (min-width:1281px) { 
  .your-element {
  border-right: 2px solid rgb(241, 241, 241);
}


 }

 textarea::placeholder {
  color: rgb(211, 208, 208)!important;
  opacity: 1;
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
import ApiService from "../../services/api.service";

const { locale, setLocale } = useI18n();

const toast = useToast();
const store = usersStore()
const user_type = useCookie('user_type'); // useCookie new hook in nuxt 3
const router = useRouter();
const auth = useAuthStore()
store.formupdatestatus.user_admin = auth.user_id

const CheckApp = async (item) => {
store.ModalApp = true
store.status_app = item

 // await router.push("/users/approvestaff");
};

const Hide = async () => {
  store.ModalApp = false;
  store.modal_update_status = false;

}


const BackUser = async () => {
  if(user_type.value == '1'){
 await router.push("/users");
  }
  if(user_type.value == '2'){
 await router.push("/users/staff");
  }
};


const EditUser = async (item) => {
  if(user_type.value == '1'){
    await router.push("/users/"+item);
  }
  if(user_type.value == '2'){
 await router.push("/users/staff/edit/"+ item);
  }
};





const Editstatus = async () => {
store.modal_update_status  = true;

store.formupdatestatus.verify_account = store.profile_by_one[0].verify_account
};

const UpdateStatus = async () => {
await store.UpdateStatus()
await store.UpdateStatusLog();
store.modal_update_status  = false;
await store.fetchUsersByOneAdminProfile(router.currentRoute.value.params.id);
await store.fetchUsersByOneComment();
await store.fetchUsersLog(router.currentRoute.value.params.id);
await store.fetchUsersLogApporv(router.currentRoute.value.params.id);
store.comment_details  = '';
};



const Save = async () => {
  await store.UpdatePeddingByOneComment();
  toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ');
  if(user_type.value == '1'){
 await router.push("/users/approve");
  }
  if(user_type.value == '2'){
 await router.push("/users/approvestaff");
  }
}


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




