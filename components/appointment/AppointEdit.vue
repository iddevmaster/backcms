<template>
  <div class="row mb-4">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">{{ $t("menu_app_app_edit") }}</h4>
      </div>
    </div>

    <div id="form_grid_layouts" class="col-lg-2">
      <div class="seperator-header" style="text-align: center;" @click="backToUser()">
        <button class="btn btn-primary additem _effect--ripple waves-effect waves-light">{{ $t("menu_app_app_back")
        }}</button>
      </div>
    </div>
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_app_app_quota") }}</label>
      <input type="text" class="form-control" id="inputEmail3" placeholder="ປະລິມານທີ່ສາມາດຈອງໄດ້ *" maxlength="3"
        v-model="store.formedit.ap_quota" :class="{
          'border-red-500 focus:border-red-500': v$.ap_quota.$error,
          'border-[#42d392] ': !v$.ap_quota.$invalid,
        }" @change="v$.ap_quota.$touch" autocomplete="off" @input="onInput">


      <div v-if="locale == 'la'">
        <span v-if="v$.ap_quota.$error" class="text-xs text-red-500" style="color: red">
          ຕ້ອງລະບຸຊ່ອງຂໍ້ມູນໂຄຕ້າ.</span>
      </div>

      <div v-if="locale == 'en'">
        <span v-if="v$.ap_quota.$error" class="text-xs text-red-500" style="color: red">
          The Quota field is required</span>
      </div>

      <div v-if="locale == 'th'">
        <span v-if="v$.ap_quota.$error" class="text-xs text-red-500" style="color: red">ต้องระบุช่องโควต้า</span>
      </div>

    </div>


    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_app_app_remark") }}</label>
      <input type="text" class="form-control" id="inputEmail3" placeholder="ຫມາຍ​ເຫດ​ *" maxlength="20"
        v-model="store.formedit.ap_remark" :class="{
          'border-red-500 focus:border-red-500': v$.ap_remark.$error,
          'border-[#42d392] ': !v$.ap_remark.$invalid,
        }" @change="v$.ap_remark.$touch" autocomplete="off">


      <div v-if="locale == 'la'">
        <span v-if="v$.ap_remark.$error" class="text-xs text-red-500" style="color: red">
          ຊ່ອງຂໍ້ສັງເກດແມ່ນຕ້ອງການ.</span>
      </div>

      <div v-if="locale == 'en'">
        <span v-if="v$.ap_remark.$error" class="text-xs text-red-500" style="color: red">
          The Remark field is required</span>
      </div>

      <div v-if="locale == 'th'">
        <span v-if="v$.ap_remark.$error" class="text-xs text-red-500" style="color: red">ต้องระบุช่อง Remark</span>
      </div>

    </div>


  </div>
  <div class="row mb-4">
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_app_app_start") }}</label>

      <!-- <vue-date-picker  v-model="store.formedit.ap_date_start"   type="datetime"  ></vue-date-picker> -->

      <VueDatePicker v-model="store.formedit.ap_date_start" :format="format_start"  :disabled-dates="isDateDisabled" required></VueDatePicker>
      <div v-if="locale == 'la'">
              <span v-if="v$.ap_date_start.$error" class="text-xs text-red-500" style="color: red">
                ຊ່ອງເວລາເລີ່ມຕົ້ນແມ່ນຕ້ອງການ..</span>
            </div>

            <div v-if="locale == 'en'">
              <span v-if="v$.ap_date_start.$error" class="text-xs text-red-500" style="color: red">
                The Start time field is required</span>
            </div>

            <div v-if="locale == 'th'">
              <span v-if="v$.ap_date_start.$error" class="text-xs text-red-500"
                style="color: red">ต้องระบุช่องช่วงเวลาเริ่ม</span>
            </div>
    </div>


   
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_app_app_end") }}</label>

      <VueDatePicker v-model="store.formedit.ap_date_end" :format="format_end" required   :disabled-dates="isDateDisabledEnd" ></VueDatePicker>

      <div v-if="locale == 'la'">
              <span v-if="v$.ap_date_end.$error" class="text-xs text-red-500" style="color: red">
                ຕ້ອງລະບຸຊ່ອງຂໍ້ມູນໄລຍະເວລາໝົດ.</span>
            </div>

            <div v-if="locale == 'en'">
              <span v-if="v$.ap_date_end.$error" class="text-xs text-red-500" style="color: red">
                The End time field is required</span>
            </div>

            <div v-if="locale == 'th'">
              <span v-if="v$.ap_date_end.$error" class="text-xs text-red-500"
                style="color: red">ต้องระบุช่องช่วงเวลาหมด</span>
            </div>

    </div>
  </div>

  <div class="row mb-4">
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_app_app_type") }}</label>
      <select class="form-control" v-model="store.formedit.ap_learn_type">
        <!-- <option value="1">{{ $t("menu_learn_theory") }}</option> -->
        <option value="2">{{ $t("menu_learn_practice") }}</option>
      </select>
    </div>


    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_app_app_status") }}</label>

      <select class="form-select form-select" aria-label="Default select example" v-model="store.formedit.dlt_code">
        <option v-for="(item, index) in store.dtl" :key="item.dlt_code" :value="item.dlt_code">{{ item.dlt_description }}
        </option>
      </select>
    </div>
  </div>



  <button type="button" class="btn btn-primary" @click="update()">{{ $t("menu_app_app_save") }}</button>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { AppointStore } from '@/store/appoint'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment-timezone';
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();

const toast = useToast()
const router = useRouter();
const store = AppointStore();

const { FormEdit } = storeToRefs(store);


const date = ref(new Date());

const update = async () => {


  v$.value.$validate();
  if (!v$.value.$error) {
    let data = await store.Update();
    if (data == true) {
    await toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດ');
    await router.push('/appointment');
  } else {
    toast.error('ບັນທຶກຂໍ້ມູນລົ້ມເຫລວ')
  }
  }


}


const rules = computed(() => {
  return {
    ap_quota: {
      required: helpers.withMessage('The Quota field is required', required),
      minLength: minLength(1),
    },
    ap_remark: {
      required: helpers.withMessage('The Remark field is required', required),
      minLength: minLength(1),
    },
    ap_date_start: {
      required: helpers.withMessage('The Remark field is required', required),
      minLength: minLength(1),
    },
    ap_date_end: {
      required: helpers.withMessage('The Remark field is required', required),
      minLength: minLength(1),
    },


  };
});



const backToUser = async () => {
  router.go(-1);
}

const format_start = (xd) => {


  const isoFormatInUTC = xd.toISOString();
  //return moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm');

  store.formedit.ap_date_start = moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ss');
  return moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm');

  //  return `Selected date is ${day}/${month}/${year}`;
}



const format_end = (ie) => {


  const isoFormatInUTC = ie.toISOString();


  store.formedit.ap_date_end = moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ss');
  return moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm');

}

// 400Z

// const format_end = (date) => {
//   console.log(date)
// const isoFormatInUTC = date.toISOString();


// store.forminsert.ap_date_end = moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ss');
//  return moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm');
// }

// const format_end = () => {


//  const date = ref(new Date(store.formedit.ap_date_end).toISOString());


//   return store.formedit.ap_date_end;
// }


const v$ = useVuelidate(rules, FormEdit);

const save = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    const data = await store.SaveFormAPP();

    if (data == true) {
     await toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ');

   
    } else {
      toast.error('ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ')
    }

  }

}


const isDateDisabled = (date) => {



const currentDate = new Date();
    const disableBeforeDate = new Date(); // Adjust the date as needed
    store.formedit.ap_date_end = null
    return date < currentDate || date < disableBeforeDate;
// return date < store.disabledDates;
  };

const isDateDisabledEnd = (date) => {

const currentDate = new Date();
    const disableBeforeDate = new Date(store.formedit.ap_date_start); // Adjust the date as needed
   // return date < currentDate || date < disableBeforeDate;
//return false;

if(!store.formedit.ap_date_start){
return true;
}
return date < currentDate || date < disableBeforeDate;

};    


const onInput = async (event) => {
  store.formedit.ap_quota = event.target.value.replace(/\D/g, '');
}

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
}</style>
