<template>
  <div class="row mb-4">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">{{ $t("menu_app_form_app") }}</h4>
      </div>
    </div>

    <div id="form_grid_layouts" class="col-lg-2">
      <div
        class="seperator-header"
        style="text-align: center"
        @click="backToUser()"
      >
        <button
          class="btn btn-primary additem _effect--ripple waves-effect waves-light"
        >
          {{ $t("menu_app_app_back") }}
        </button>
      </div>
    </div>
    <div class="col-sm-12 p-2">
      <label for="exampleFormControlInput1">{{
        $t("menu_app_app_start")
      }}</label
      ><span style="color: red"> * </span>
      <VueDatePicker
        v-model="store.forminsertnew.ap_date_start"
        :format="format"
        :enable-time-picker="false"
        :disabled-dates="isDateDisabled"
        :placeholder="$t('exp_update_acc_pehol')"
        required
      ></VueDatePicker>
    </div>

    <span
      v-if="v$.ap_date_start.$error"
      class="text-xs text-red-500"
      style="color: red"
    >
      ap_date_start</span
    >

    <div class="col-sm-12 p-2">
      <label for="exampleFormControlInput1">{{ $t("menu_app_app_end") }}</label
      ><span style="color: red"> * </span>

      <VueDatePicker
        v-model="store.forminsertnew.ap_date_end"
        required
        :format="format"
        :enable-time-picker="false"
        :disabled-dates="isDateDisabledEnd"
        :placeholder="$t('exp_update_acc_pehol')"
      ></VueDatePicker>
    </div>

    <span
      v-if="v$.ap_date_end.$error"
      class="text-xs text-red-500"
      style="color: red"
    >
      ap_date_end</span
    >

    <div class="col-12 col-sm-12 col-md-12 pt-2">
      <label for="exampleInputEmail1">ປະເພດອະນຸຍາດ:</label
      ><span style="color: red"> * </span>
      <div class="form-group">
        <label
          v-for="fruit in store.forminsertnew.day"
          :key="fruit"
          class="checkbox"
          style="padding: 0.5%"
        >
          {{ fruit.days }}
          <input
            type="checkbox"
          v-model="fruit.select"
          />
          
        </label>
      </div>
    </div>

    <span v-if="v$.day.$error" class="text-xs text-red-500" style="color: red">
      day</span
    >

    <div class="col-sm-12 p-2">
      <label for="exampleFormControlInput1">ເວລາເລິ່ມ:</label>
      <VueDatePicker
        v-model="store.forminsertnew.selectedDateTime"
        required
        :format="natee"
        :placeholder="$t('exp_update_acc_pehol')"
        time-picker
      ></VueDatePicker>
    </div>

    <span
      v-if="v$.selectedDateTime.$error"
      class="text-xs text-red-500"
      style="color: red"
    >
      selectedDateTime</span
    >

    <div class="col-12 col-sm-12 col-md-12 pt-2">
      <label for="exampleInputEmail1">ປະເພດອະນຸຍາດ:</label
      ><span style="color: red"> * </span>
      <div class="form-group">
        <label
          v-for="fruit in store.dltc"
          :key="fruit"
          class="checkbox"
          style="padding: 0.5%"
        >
          {{ fruit }}
          <input
            type="checkbox"
            :value="fruit"
            v-model="store.forminsertnew.dlt_code"
          />
        </label>
      </div>
    </div>

    <span
      v-if="v$.dlt_code.$error"
      class="text-xs text-red-500"
      style="color: red"
    >
      dlt_code</span
    >

    <div class="col-sm-12 p-2">
      <label for="exampleFormControlInput1">ຈຳນວນທີ່ເຮັດໄດ້:</label>
      <input
        type="text"
        class="form-control"
        id="inputEmail3"
        placeholder="520 *"
        maxlength="20"
        v-model="store.forminsertnew.ap_quota"
        :class="{
          'border-red-500 focus:border-red-500': v$.ap_quota.$error,
          'border-[#42d392] ': !v$.ap_quota.$invalid,
        }"
        @change="v$.ap_quota.$touch"
        autocomplete="off"
      />

      <span
        v-if="v$.ap_quota.$error"
        class="text-xs text-red-500"
        style="color: red"
      >
        ຈຳນວນທີ່ເຮັດໄດ້</span
      >
    </div>

    <div class="col-sm-12 p-2">
      <label for="exampleFormControlInput1">ออก ณ :</label>
      <select
        class="form-select form-select"
        aria-label="Default select example"
        v-model="store.forminsertnew.group_id"
      >
        <option
          v-for="(item, index) in store.provi"
          :key="item.province_code"
          :value="item.province_code"
        >
          {{ item.name }} - {{ item.province_name }}
        </option>
      </select>
    </div>
  </div>

  <div class="row mb-4"></div>

  <button type="button" class="btn btn-primary" @click="save()">
    {{ $t("menu_app_app_save") }}
  </button>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { AppointStore } from "@/store/appoint"; // import the auth store we just created
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment-timezone";
import { useI18n } from "vue-i18n";
   import Swal from 'sweetalert2';
const { locale, setLocale } = useI18n();

const toast = useToast();
const router = useRouter();
const store = AppointStore();

const { FormAppoint } = storeToRefs(store);
const { ResetForm } = AppointStore();

const date = ref(new Date());

// In case of a range picker, you'll receive [Date, Date]

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const natee = (time) => {
  if (!time) return "";
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format; set to true for 12-hour format
  };

  return new Intl.DateTimeFormat("en-GB", options).format(new Date(time));
};

const rules = computed(() => {
  return {
    ap_quota: {
      required: helpers.withMessage("The Quota field is required", required),
      minLength: minLength(1),
    },
    selectedDateTime: {
      required: helpers.withMessage("The Remark field is required", required),
      minLength: minLength(1),
    },
    ap_date_start: { required },
    ap_date_end: { required },
    day: { required },
    dlt_code: { required },
  };
});

const isDateDisabled = (date) => {
  const currentDate = new Date();
  const disableBeforeDate = new Date(); // Adjust the date as needed
  store.forminsertnew.ap_date_end = null;

  return date < currentDate || date < disableBeforeDate;
};

const isDateDisabledEnd = (date) => {
  const currentDate = new Date();
  const disableBeforeDate = new Date(store.forminsertnew.ap_date_start); // Adjust the date as needed

  if (!store.forminsertnew.ap_date_start) {
    return true;
  }

  return date <= disableBeforeDate;
};

const backToUser = async () => {
  router.go(-1);
};

const v$ = useVuelidate(rules, FormAppoint);

const save = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    const data = await store.SaveFormAPPNew();
    console.log(data.length);
    if (data.length == 0) {
      await toast.success("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ");
      await router.push("/appointment");
    }
    if (data.length > 0) {


     const htmlContent = data
        .map(
          (item) =>
            `<p style="color:red;"><strong>${item.day}:</strong> ${item.dlt} already exists  </p>`
        )
        .join("");

      Swal.fire({
        title: "List of Items",
        html: htmlContent,
        icon: "success",
        confirmButtonText: "Close",
      });
  //    await router.push("/appointment");
    }
  }
};

const disabledDates = () => {
  const currentDate = new Date(store.forminsert.ap_date_start);
  const currentDateEnd = new Date(store.forminsert.ap_date_end);
  const isoFormatInUTC = currentDate.toISOString();
  const isoFormatInUTCend = currentDateEnd.toISOString();
  let start = moment
    .utc(isoFormatInUTC)
    .tz("Asia/Bangkok")
    .format("YYYY-MM-DD");
  let end = moment
    .utc(isoFormatInUTCend)
    .tz("Asia/Bangkok")
    .format("YYYY-MM-DD");

  if (start == end) {
    const selectedHourstart = currentDate.getHours();
    const selectedHourend = currentDateEnd.getHours();
    if (selectedHourstart > selectedHourend) {
      return false;
    }
    return true;

    //return false;
  }
  // return true;
};

const onInput = async (event) => {
  store.forminsert.ap_quota = event.target.value.replace(/\D/g, "");
};
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
}
</style>
