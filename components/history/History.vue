<template>
  <div class="widget-content widget-content-area br-8 p-3" v-if="storehis.profile.length > 0" >

    <div class="widget-header">


      <div class="row m-1">

        
        <div class="col-12 col-sm-2 col-xl-2 col-lg-2 your-element">

          
          <div class="form-group row">
            <div
                            class="img-uploader-content"
                            style="padding: 5px"
                          
                          >
                      
                          <img v-if="storehis.profile[0].detail.user_img"
                                :src="coverimage(storehis.profile[0].detail.user_img)"
                              alt="avatar"
                              class="img-fluid"
                              width="200"
                              height="200"
                            />
                            <img v-else
                              src="../../assets/images/person-avatar.jpg"
                              alt="avatar"
                              class="img-fluid"
                              width="200"
                              height="200"
                            />
                          </div>
          </div>

       
        </div>

        <div class="col-12 col-sm-10 col-xl-10 col-lg-10">

          
          <div class="row">
            <label
              for="company-name"
              class="col-sm-12 col-form-label col-form-label-lg"
            >
            {{ storehis.profile[0].user_prefrix }} {{ storehis.profile[0].user_firstname }} {{ storehis.profile[0].user_lastname }}
            </label>
          </div>

          <div class="form-group row">
   
            <p class="font-weight-light"> {{ storehis.profile[0].user_full_name }}</p>
          </div>

         


          <div class="form-group row">
          
            <p class="font-weight-light">ເບີໂທ:  856  {{ storehis.profile[0].user_phone }}</p>
          </div>

          <div class="form-group row">
            
            <p class="font-weight-light">ອີເມລ: {{ storehis.profile[0].user_email }}</p>
          </div>

          <div class="form-group row">
            <label
              for="company-name"
              class="col-sm-12 col-form-label col-form-label-sm fot-bl"
            >
           
            <p class="font-weight-light">Username:  {{ storehis.profile[0].user_name }}</p>
            </label>
          </div>
        </div>
      </div>


      <div class="row m-1">
        <div class="col-12 col-sm-6 col-xl-6 col-lg-6 your-element">
          <div class="form-group row">
            <label
              for="company-name"
              class="col-sm-12 col-form-label col-form-label-sm fot-bl"
            >
              % ຮຽນຫຼັກສູດ :
            </label>
          </div>

          <div class="form-group row" v-if="storehis.learn.length > 0" v-for="(item, index) in storehis.learn" :key="item.course_id">
            <label
              for="company-name"
              class="col-sm-12 col-form-label col-form-label-sm fot-bl" style="color: green;" v-if = "item[index].progress > 50"
            >
            {{ item[index].course_code }}  :  {{ item[index].progress }}  %

            </label>

            <label
              for="company-name"
              class="col-sm-12 col-form-label col-form-label-sm fot-bl" style="color: red;" v-else
            >
            {{ item[index].course_code }}  :  {{ item[index].progress }}  %

            </label>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-xl-6 col-lg-6">
          <div class="form-group row">
            <label
              for="company-name"
              class="col-sm-12 col-form-label col-form-label-sm fot-bl"
            >
            ປະຫວັດຄະແນນ ທີ່ເຮັດແບບທົດສອບ : 
            </label>
          </div>
          <div class="form-group row">
            <div class="form-group row" v-if="storehis.result.length > 0">
            <div class="table-responsive">
    <table id="example" class="table table-bordered" style="width:100%">
      <thead>
        <tr>
          <th >ປະເພດ</th>
          <th >
            ວັນທີ  ເວລາ
          </th>
          <th>
            ຄະແນນ
          </th>
          <th>
            ຜົນ
          </th>
       
        </tr>
      </thead>
      <tbody>
       
        <tr   v-for="(item, index) in storehis.result" :key="item.mr_id">
        
          <td>  {{ item[index].dlt_code }}</td>
          <td>  {{ item[index].time }}</td>
          <td>  {{ item[index].mr_score }}</td>
          <td>  {{ item[index].mr_status }}</td>
        
    
        
        
        </tr>
      </tbody>
    </table>

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
import { HistoryStore } from '@/store/history'
const { locale, setLocale } = useI18n();

const toast = useToast();
const store = AppointStore();
const user_type = useCookie("user_type"); // useCookie new hook in nuxt 3
const router = useRouter();
const auth = useAuthStore();
const storehis = HistoryStore()

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

const ModalC = async () => {
  store.cancelapp = true;
  store.ScoreReqTh = false;
};

const Modaldiv = async () => {
  await store.fetchdivi();
  store.verify = true;
  store.ScoreReqTh = false;
};

const ModalT = async () => {
  store.theoryscore = true;
  store.ScoreReqTh = false;
};

const ModalP = async () => {
  store.practicalscore = true;
  store.ScoreReqTh = false;
};

const SearchApp = async () => {
  await store.fetchAppNumber();
};

const filterIAscore = async (event) => {
  // stores.form.user_phone = event.target.value.replace(/\D/g, "");
  const key = event.data;
  if (event.data === " ") {
    store.formscoreT.score = store.formscoreT.score.substring(
      0,
      store.formscoreT.score.length - 1
    );
    return;
  }
  if (store.formscoreT.score.charAt(0) == "0") {
    store.formscoreT.score = "";
    return;
  }

  store.formscoreT.score = event.target.value.replace(/\D/g, "");

  if (store.formscoreT.score >= store.totalscore.em_measure) {
    if (store.formscoreT.score > store.totalscore.total_question) {
      store.formscoreT.score = store.totalscore.total_question;
    }
    store.formscoreT.mr_status = "pass";
  }

  if (store.formscoreT.score < store.totalscore.em_measure) {
    store.formscoreT.mr_status = "fail";
  }
};

const filterIAscoreB = async (event) => {
  // stores.form.user_phone = event.target.value.replace(/\D/g, "");
  const key = event.data;
  if (event.data === " ") {
    store.formscoreP.score = store.formscoreP.score.substring(
      0,
      store.formscoreP.score.length - 1
    );
    return;
  }
  if (store.formscoreP.score.charAt(0) == "0") {
    store.formscoreP.score = "";
    return;
  }

  store.formscoreP.score = event.target.value.replace(/\D/g, "");

  if (store.formscoreP.score >= 85) {
    if (store.formscoreP.score > 100) {
      store.formscoreP.score = 100;
    }
    store.formscoreP.mr_status = "pass";
  }

  if (store.formscoreP.score < 85) {
    store.formscoreP.mr_status = "fail";
  }
};

const UpdateThero = async () => {
  if (store.formscoreT.score == "") {
    store.ScoreReqTh = true;
    return false;
  }
  store.theoryscore = false;
  store.formresult.mr_learn_type = 1;
  store.ScoreReqTh = false;
  let save = await store.SaveResultScore();

  await store.fetchResultScore();
};

const UpdatePra = async () => {
  if (store.formscoreP.score == "") {
    store.ScoreReqTh = true;
    return false;
  }
  store.practicalscore = false;
  store.formresult.mr_learn_type = 2;
  let save = await store.SaveResultScorePra();
  await store.fetchResultScore();
};

const CancelApp = async () => {
  store.cancelapp = false;
  let cancel = await store.CancelAppointment();
};

const UpdateStatus = async () => {
  store.verify = false;
  let ver = await store.UpdateStatusApp();
  await store.fetchAppNumber();
};

const ModalDri = async () => {
  // await router.push("/drivinglicense/view/"+store.dataapp[0].user_name);
  await router.push("/drivinglicense/view/" + store.dataapp[0].ap_number);
};
</script>




