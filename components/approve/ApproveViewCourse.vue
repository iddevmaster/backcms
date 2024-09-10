<template>
  <div class="widget-content widget-content-area br-8 p-3">
    <div class="widget-header">
      <div class="row p-3">
        <div class="col-10 col-sm-12 col-md-10">
          <div class="form-group row">
            <h5>ລາຍລະອຽດ ຜູ້ໃຊ້ (ປະຊາຊົນ) ສົ່ງເຂົ້າມາ</h5>
          </div>
        </div>
        <div class="col-2 col-md-2">
          <div class="row"><button class="btn btn-primary">Back</button></div>
        </div>
      </div>
      <hr style="margin-top: 1px" />
    <br>
      <div class="row">
        <div class="col-12  col-sm-7 col-xl-7 col-lg-7 your-element">
          <div class="row">
            <div class="col-3 col-sm-12 col-md-3">
              <div class="form-group row">
                <div class="invoice-detail-title">
                  <div class="invoice-logo">
                    <div class="profile-image">
                      <div class="img-uploader-content" style="padding: 5px" v-if="store.profile_by_one[0].user_img">
                        <img
                          :src="coverimage(store.profile_by_one[0].user_img)"
                          alt="avatar"
                          class="img-fluid"
                          width="200"
                          height="200"
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

            <div class="col-12 col-sm-7 col-xl-9 col-lg-9">
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
                ອີເມລ:  {{store.profile_by_one[0].user_email}}</label
                >
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  ເບີໂທ:  {{store.profile_by_one[0].user_phone}}</label
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

            <div class="row m-1">
              <div class="col-4 col-sm-12 col-md-4">
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    ເລກບັດປະຈຳຕົວ / Passport:
                  </label>
                </div>

                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    ວັນໝົດອາຍຸຂອງບັດ:
                  </label>
                </div>

                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    ວັນເດືອນປີເກີດ:
                  </label>
                </div>

                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    ສັນຊາດ:
                  </label>
                </div>

                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    ທີ່ຢູ່ປັດຈຸບັນ:
                  </label>
                </div>
              </div>

              <div class="col-8 col-sm-12 col-md-8">
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm"
                  >
                  {{store.profile_by_one[0].identification_number}}</label
                  >
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm"
                  >
                  {{store.profile_by_one[0].exp_date}}</label
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
                    ລາວ</label
                  >
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm"
                  >
                  {{store.profile_by_one[0].user_address}}
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
            <hr />
            <div class="row m-1">
              <div class="col-4 col-sm-12 col-md-4">
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    ຮູບບັດ / passport:
                  </label>
                </div>
              </div>

              <div class="col-8 col-sm-12 col-md-8">
                <div class="form-group row">
                  <img
                     :src="coverimage(store.profile_by_one[0].passpost_image)"
                    class="img-fluid"
                    width="80"
                    height="80"
                  />
                </div>
              </div>
            </div>

            <div class="row m-1">
              <div class="col-4 col-sm-12 col-md-4">
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    ຮູບຕົວຈິງ:
                  </label>
                </div>
              </div>

              <div class="col-8 col-sm-12 col-md-8">
                <div class="form-group row">
                  <img
                     :src="coverimage(store.profile_by_one[0].real_image)"
                    class="img-fluid"
                    width="80"
                    height="80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-5 col-xl-5" v-if="store.profile_by_one[0].status == 'W'">
          <div class="form-group row m-1">
            <label
              for="company-name"
              class="col-sm-12 col-form-label col-form-label-sm fot-bl"
              style="font-size: 30px"
            >
              ສະຖານະ:
              <span style="color: yellow">ລໍຖ້າຢືນຢັນຕົວຕົນ</span></label
            >
          </div>

 

          <div class="form-group row">
            <hr style="margin-top: 1px" />
          </div>

          <div class="form-group row m-1">
            <label
              for="company-name"
              class="col-sm-12 col-form-label col-form-label-sm fot-bl"
              style="font-size: 30px"
            >
              ການອະນຸມັດ
            </label>
          </div>


          <div class="row m-1">
            <div class="col-4 col-sm-12 col-md-4">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ຄຳເຫັນຄັ້ງກ່ອນ
                </label>
              </div>

              
            </div>
            <div class="col-8 col-sm-12 col-md-8">
      
              <div v-for="(item, index) in store.comment">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                {{ item.comment_details }}
                </label
                >
              </div>
            </div>
          </div>

          <div class="row m-1">
            <div class="col-4 col-sm-12 col-md-4">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ຄຳເຫັນ *:
                </label>
              </div>

              
            </div>
            <div class="col-8 col-sm-12 col-md-8">
      
         
              <div class="form-group row">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" v-model="store.comment_details"></textarea>
              </div>

      
            </div>

            
          </div>


          <div class="row m-1">
            <div class="col-4 col-sm-12 col-md-4">
              <div class="form-group row">
          
              </div>

              
            </div>
            <div class="col-4 col-sm-12 col-md-4">
      
              <div class="form-group">
                <button type="button" class="btn btn-success" @click="CheckApp('Y')">ອະນຸມັດ</button>
              </div>

            </div>
            <div class="col-4 col-sm-12 col-md-4">
      
      <div class="form-group">
        <button type="button" class="btn btn-danger"  @click="CheckApp('N')">ປະຕິເສດ</button>
      </div>

    </div>

            
          </div>
        </div>
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

const CheckApp = async (item) => {

  await store.UpdatePeddingByOneComment(item);
  toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ');
  if(user_type.value == '1'){
 await router.push("/users/approve");
  }
  if(user_type.value == '2'){
 await router.push("/users/approvestaff");
  }
 // await router.push("/users/approvestaff");
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




