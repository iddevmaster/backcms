<template>
  <div class="widget-content widget-content-area br-8 p-3">
    <div class="widget-header">
      <div class="row p-3">
        <div class="col-10 col-sm-12 col-md-10">
          <div class="form-group row">
            <h5>{{ $t("user_details_people") }}</h5>
          </div>
        </div>
        <div class="col-12 col-md-2">
          <div class="row">
            <button class="btn btn-primary" @click="Reback()">
              {{ $t("user_profile_button_back") }}
            </button>
          </div>
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
            <div class="col-12 col-sm-12 col-md-12">
              <div class="form-group">
                <label for="exampleInputEmail1">ຈຸດປະສົ່ງການເພິ່ມ:</label>
                <select class="form-control">
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
                  disabled
                />
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <div class="form-group">
                <label for="exampleInputEmail1">ເລກທີ:</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="ຕົວຢ່າງ: ຂສ 0012345"
                />
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <div class="form-group">
                <label for="exampleInputEmail1">ອອກຊື່:</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="ຕົວຢ່າງ: ທ້າວ ກກກກກກ ຂຂຂຂຂຂຂ"
                />
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <div class="form-group">
                <label for="exampleInputEmail1">ວັນທີອອກບັດ:</label>
                <VueDatePicker v-model="storedlt.formdlt_new.ap_date_start" :format="format_start"  :disabled-dates="isDateDisabled" required ></VueDatePicker>
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <div class="form-group">
                <label for="exampleInputEmail1">ວັນທີໝົດອາຍຸ:</label>
                <VueDatePicker v-model="storedlt.formdlt_new.ap_date_end" :format="format_end"  :disabled-dates="isDateDisabled" required></VueDatePicker>
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <div class="form-group">
                <label for="exampleInputEmail1">ຮູບໃບຂັບຂີ່ :</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="ຕົວຢ່າງ: ທ້າວ ກກກກກກ ຂຂຂຂຂຂຂ"
                />
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-12 pt-2">
              <div class="form-group">
               x
            
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
const store = usersStore();
const storedlt = DltStore();
const user_type = useCookie("user_type"); // useCookie new hook in nuxt 3
const router = useRouter();
const auth = useAuthStore();

store.formlog.user_admin = auth.user_id;
const CheckApp = async (item) => {
  store.ModalApp = true;
  store.status_app = item;

  // await router.push("/users/approvestaff");
};

const Hide = async () => {
  store.ModalApp = false;
};
const Save = async () => {
  store.formlog.des = "Approve";
  await store.UpdatePeddingByOneComment();
  await store.UpdateLogDataInsert();
  store.ModalApp = false;
  toast.success("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ");
  if (user_type.value == "1") {
    await router.push("/users/approve");
  }
  if (user_type.value == "2") {
    await router.push("/users/approvestaff");
  }
};

const Reback = async () => {
  await router.push("/appointment/details");
};


const format_start = (xd) => {


const isoFormatInUTC = xd.toISOString();
//return moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm');

storedlt.formdlt_new.ap_date_start = moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ss');
return moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD');

//  return `Selected date is ${day}/${month}/${year}`;
}



const format_end = (ie) => {


const isoFormatInUTC = ie.toISOString();


storedlt.formdlt_new.ap_date_end = moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ss');
return moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD');

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




