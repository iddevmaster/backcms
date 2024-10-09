<template>
  <div class="widget-content widget-content-area br-8 p-3">
    <div class="widget-header">
      <div class="row">
        <div class="col-lg-6 col-md-4 col-sm-4">
          <h5>ລາຍລະອຽດນັດໝາຍ</h5>
        </div>

        <div class="col-lg-1 col-md-4 col-sm-4">
          <label for="inputEmail3" class="col-sm-12 col-form-label">
            ID ນັດໝາຍ:</label
          >
        </div>
        <div class="col-lg-3 col-md-4 col-sm-4">
          <input
            id="t-text"
            type="text"
            name="txt"
            placeholder="A83M100"
            class="form-control"
            v-model="store.searchapp.ap_number"
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
        <div class="col-12 col-sm-12 col-xl-12 col-lg-12/ mb-3">
          <div class="form-group" style="text-align: right">
            <button type="button" class="btn btn-danger">ຍົກເລີກ</button>
          </div>
        </div>
        <br />

        <div class="col-12 col-sm-5 col-xl-5 col-lg-5 your-element">
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
                  <h3>-</h3>
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm"
                  >
                  </label>
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    {{ $t("tel") }} :</label
                  >
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    {{ $t("email") }} :
                  </label>
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    Username:
                  </label>
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
                <label
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
                  -</label
                >
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                </label>
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                </label>
              </div>
              <div class="form-group row">
                <label
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
                  -
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
                  {{ $t("form_approve_pass_image") }} :
                </label>
              </div>
            </div>

            <div class="col-8 col-sm-12 col-md-8">
              <div class="form-group row">
                <img
                  src="../../assets/images/no_photo.jpg"
                  class="img-fluid"
                  width="80"
                  height="80"
                />
              </div>
            </div>
          </div>

          <div class="row mb-5">
            <div class="col-12 col-sm-12 col-md-12">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  style="font-size: 18px"
                >
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
              <div class="form-group row">
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

        <div class="col-12 col-sm-7 col-xl-7 col-lg-7 your-element">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-xl-12 col-lg-12">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-lg fot-bl"
              >
                A83M100
              </label>
            </div>
          </div>

          <!-- <div class="row">
            <div class="col-12 col-sm-12 col-md-12">
        
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ສອບເສັງ ປະເພດ:  A : ລົດຈັກສອງລໍ້ ຄວາມແຮງບໍ່ເກີນ 125 cc


                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ID ນັກຮຽນ:
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ສະຖານະ:   ເສັງຜ່ານ
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                % ຮຽນຫຼັກສູດ A ໃນ App:  72.25%
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ລຳດັບສອບເສັງ:   1
                </label>
              </div>


              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ຜົນທິດສະດີ:   19/20 ໂດຍ: staff1  ,  2024-04-01 10:22:41
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ຜົນປະຕິບັດ:  85/100 ໂດຍ: E-driving ,  2024-04-01 11:32:23
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ໝາຍເຫດ:   ເຫດຜົນທີ່ຍົກເລີກໃຫ້ຂຽນໃສ່ບ່ອນນີ້
                </label>
              </div>
            </div>

            

           
          </div> -->

          <div class="row">
            <div class="col-5 col-sm-12 col-md-5">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  ສອບເສັງ ປະເພດ :
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  ID ນັກຮຽນ:
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  ສະຖານະ:
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  ຮຽນຫຼັກສູດ A ໃນ App:
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  ຄະແນນສູງສຸດ ທີ່ເຮັດແບບທົດສອບ ໃນApp:
                </label>
              </div>
            </div>

            <div class="col-7 col-sm-12 col-md-7">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  A : ລົດຈັກສອງລໍ້ ຄວາມແຮງບໍ່ເກີນ 125 cc</label
                >
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  ບໍ່ມີ
                </label>
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  ເສັງຜ່ານ
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  72.25%
                </label>
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  19/20
                </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 col-sm-3 col-md-3 col-xl-3 col-lg-6">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm"
              >
                ລຳດັບສອບເສັງ :</label
              >
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-xl-6 col-lg-6">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm"
              >
                1</label
              >
            </div>
            <div class="col-3 col-sm-3 col-md-3 col-xl-3 col-lg-3">
              <button type="button" class="btn btn-primary">ບັນທຶກ</button>
            </div>
          </div>

          <div class="row">
            <div class="col-3 col-sm-3 col-md-3 col-xl-3 col-lg-6">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm"
              >
                ຜົນທິດສະດີ: 19/20 :</label
              >
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-xl-6 col-lg-6">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm"
              >
                ໂດຍ: staff1 , 2024-04-01 10:22:41</label
              >
            </div>
            <div class="col-3 col-sm-3 col-md-3 col-xl-3 col-lg-3">
              <button type="button" class="btn btn-primary">
                ບັນທຶກ ຜົນທິດສະດີ
              </button>
            </div>
          </div>

          <div class="row">
            <div class="col-3 col-sm-3 col-md-3 col-xl-3 col-lg-6">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm"
              >
                ຜົນທິດສະດີ: 19/20 :</label
              >
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-xl-6 col-lg-6">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm"
              >
                ໂດຍ: staff1 , 2024-04-01 10:22:41</label
              >
            </div>
            <div class="col-3 col-sm-3 col-md-3 col-xl-3 col-lg-3">
              <button type="button" class="btn btn-primary">
                ບັນທຶກ ຜົນທິດສະດີ
              </button>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-xl-12 col-lg-12">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm"
              >
                ໝາຍເຫດ: ເຫດຜົນທີ່ຍົກເລີກໃຫ້ຂຽນໃສ່ບ່ອນນີ້</label
              >
            </div>
          </div>
          <!-- <div class="row">
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
              <div class="form-group row">
                <img
                  src="../../assets/images/no_photo.jpg"
                  class="img-fluid"
                  width="80"
                  height="80"
                />
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>

  <div class="modal" v-if="store.cancelapp">
    <div class="modal-content" id="deleteConformationLabel">
      <div class="modal-header">
        <h1 class="modal-title" id="exampleModalLabel">
          ຍົກເລີກນັດໝາຍ : xxxxx ?
        </h1>
      </div>
      <div class="modal-body">
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ເຫດຜົນທີ່ຍົກເລີກ</label
          >

          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="ຕົວຢ່າງ: ເອກະສານບໍ່ຖືກຕ້ອງ,  ຜູ້ກ່ຽວບໍ່ມາຕາມນັດ, ປະຫວັດການເຂົ້າຮຽນບໍ່ຄົບ, ຜິດລະບຽບ ປັບຕົກ. ..."
          >
          </textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="Hide()"
        >
          ຍົກເລີກ
        </button>
        <button type="button" class="btn btn-primary" @click="UpdateStatus()">
          ບັນທຶກ
        </button>
      </div>
    </div>
  </div>

  <div  class="modal" v-if="store.verify">
    <div class="modal-content" id="deleteConformationLabel">
      <div class="modal-header">
        <h1 class="modal-title" id="exampleModalLabel">
          ບັນທຶກຜົນເສັງ ພາກທິດສະດີ : A83M100
        </h1>
      </div>
      <div class="modal-body">
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ຊື່ :</label
          >
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ທ້າວ ສົມສັກ ຈ່າງດາບຸດ</label
          >
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ປະເພດ :</label
          >
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >A</label
          >
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ຄະແນນ :</label
          >
          <div class="form-group col-md-2">

      <input type="text" class="form-control" id="inputZip">
      
    </div>
    <label for="inputEmail3" class="col-sm-1"
            ><span style="font-size: 30px;">/</span></label
          >
    <div class="form-group col-md-2">

<input type="text" class="form-control" id="inputZip">

</div>
    
        </div>

        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ຜົນສະຫຼຸບ :</label
          >
          <label
            for="inputEmail3"
            class="col-sm-8 col-form-label"
            style="color: chartreuse"
          >
            <input
              class="common__login__input form-control"
              type="text"
              maxlength="50"
            />
          </label>
        </div>

        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ເລກທີອ້າງອິງ ຂອງລະບົບເສັງ :</label
          >
          <label
            for="inputEmail3"
            class="col-sm-8 col-form-label"
            style="color: chartreuse"
          >
            <input
              class="common__login__input form-control"
              type="text"
              maxlength="50"
            />
          </label>
        </div>

        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ໝາຍເຫດ :</label
          >
          <label
            for="inputEmail3"
            class="col-sm-8 col-form-label"
            style="color: chartreuse"
          >
            <input
              class="common__login__input form-control"
              type="text"
              maxlength="50"
            />
          </label>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="Hide()"
        >
          ຍົກເລີກ
        </button>
        <button type="button" class="btn btn-primary" @click="UpdateStatus()">
          ຢືນຢັນ
        </button>
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

textarea::placeholder {
  color: rgb(211, 208, 208) !important;
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
const store = AppointStore();
const user_type = useCookie("user_type"); // useCookie new hook in nuxt 3
const router = useRouter();
const auth = useAuthStore();

function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}

const Hide = async () => {
  store.cancelapp = false;
  store.verify = false;
  store.theoryscore = false;
  store.practicalscore = false;
};
</script>




