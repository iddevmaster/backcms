<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment-timezone";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { usersStore } from "@/store/users";
import { useAuthStore } from "@/store/auth";
import ApiService from "../../../../services/api.service";
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import { ref, onMounted } from "vue";
import { useToast } from 'vue-toastification';

definePageMeta({
  middleware: ["auth", "roles"],
  allowedRoles: [1, 2],
});
const auth = useAuthStore();
const store = usersStore();

const router = useRouter();
const { EditFormPeple } = storeToRefs(store);

await store.Zipcode();
await store.Country();
await auth.getProfileDetails();
store.formapeple.location_id = auth.profiledetails.location_id;
store.user_id = auth.user_id;

await store.fetchUsersByOneAdmin(router.currentRoute.value.params.id);

const toast = useToast()

const fileInputFont = ref(null);
const fileInputBack = ref(null);

onMounted(() => {
  if (process.client) {
    fileInputFont.value.addEventListener("change", changeFileFont);
    fileInputBack.value.addEventListener("change", changeFileBack);
  }

  store.zipcode.map(function (x) {
    return (x.item_data = x.zipcode_name + " - " + x.province_name);
  });
  scrollToTop();
});

const rules = computed(() => {
  return {
    user_prefrix: {
      required: helpers.withMessage(
        "The User name field is required",
        required
      ),
      minLength: minLength(1),
    },
    first_name: {
      required: helpers.withMessage(
        "The Identification number field is required",
        required
      ),
      minLength: minLength(5),
    },
    last_name: {
      required: helpers.withMessage(
        "The Identification number field is required",
        required
      ),
      minLength: minLength(5),
    },
    full_name: {
      required: helpers.withMessage(
        "The Identification number field is required",
        required
      ),
      minLength: minLength(5),
    },
    identification_number: {
      required: helpers.withMessage(
        "The Identification number field is required",
        required
      ),
      minLength: minLength(5),
    },

    location_id: {
      required: helpers.withMessage(
        "Select location field is required",
        required
      ),
      minLength: minLength(1),
    },

    user_village: {
      required: helpers.withMessage("The village field is required", required),
      minLength: minLength(1),
    },
    user_address: {
      required: helpers.withMessage("Adress field is required", required),
      minLength: minLength(1),
    },
    user_birthday: {
      required: helpers.withMessage(
        "user_birthday field is required",
        required
      ),
    },
    expire: {
      required: helpers.withMessage("expire field is required", required),
    },
    user_phone: {
      required: helpers.withMessage("expire field is required", required),
    },
    username: {
      required: helpers.withMessage("expire field is required", required),
    },
    passpost_image: {
      required: helpers.withMessage("expire field is required", required),
    },
    real_image: {
      required: helpers.withMessage("expire field is required", required),
    },

  };
});

const changeFont = () => {
  // Trigger a click event on the file input element
  fileInputFont.value.click();
};


const updated = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {

    let check = await store.CheckPeopleEdit();


    if (
      store.checkphone == false &&
      store.checkemail == false &&
      store.checkusername == false &&
      store.checkIden == false
    ) {
      
    } else {
      scrollToTop();
    }
// let  t  = await store.UpdateUsersByOneAdmin();
// toast.success("ບັນທຶກສຳເລັດແລ້ວ");
  }
}

const RandomPassword = () => {
  let r = (Math.random() + 1).toString(36).substring(6);
  store.formapeple.user_password = r;
};
const filterInput = async (event) => {
  // stores.form.user_phone = event.target.value.replace(/\D/g, "");


  const key = event.data;
      if (event.data === ' ') {
        store.formapeple.user_phone= store.formapeple.user_phone.substring(0, store.formapeple.user_phone.length - 1);
        return;
      }
      if (store.formapeple.user_phone.charAt(0) !== '2') {
        store.formapeple.user_phone = "";
        return;
      } 
      if ((store.formapeple.user_phone.charAt(1) !== '') && (store.formapeple.user_phone.charAt(1) !== '0')) {
        store.formapeple.user_phone = "2";
        return;
      } 
      store.formapeple.user_phone = event.target.value.replace(/\D/g, "");
};


const onInput = async (event) => {
  store.formapeple.identification_number = event.target.value.replace(/\D/g, '');
}



const changeBack = () => {
  // Trigger a click event on the file input element
  fileInputBack.value.click();
};

const changeFileFont = async (event) => {
  var inputs = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith("image/")) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag
    // const reader = new FileReader();
    // reader.onload = () => {
    //   store.passpost_image = reader.result;
    // };
    // store.image_pas = inputs.files[0];
    // reader.readAsDataURL(file);

    store.formeditapeple.passpost_image = inputs.files[0];
    // console.log(store.passpost_image);
    store.UploadImage();
  } else {
    Swal.fire({
      text: "Upload File Image Only!",
      icon: "error",
    });
  }
};

const changeFileBack = async (event) => {
  var inputs = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith("image/")) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag
    // const reader = new FileReader();
    // reader.onload = () => {
    //   store.passpost_image = reader.result;
    // };
    // store.image_pas = inputs.files[0];
    // reader.readAsDataURL(file);

    store.formeditapeple.real_image = inputs.files[0];

    store.UploadImage2();
  } else {
    Swal.fire({
      text: "Upload File Image Only!",
      icon: "error",
    });
  }
};

const v$ = useVuelidate(rules, EditFormPeple);

function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}

function scrollToTop() {
  if (process.client) {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This makes the scroll smooth
    });
  }
}

const date = ref(new Date());
const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
</script>

<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">ເພິ່ມຂໍ້ມູນ </a></li>
            <li class="breadcrumb-item active" aria-current="page">
              ເພິ່ມຂໍ້ມູນ ຜູ້ໃຊ້ (ປະຊາຊົນ)
            </li>
          </ol>
        </nav>
      </div>
{{ store.formeditapeple }}
      <div class="middle-content container-xxl p-0">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <div class="widget-content widget-content-area br-8 p-3">
              <div class="row mt-3">
                <div class="col-xl-2">
                  <div class="login__form">
                    <label class="form__label"
                      >{{ $t("form_name_title")
                      }}<span class="text-xs text-red-500" style="color: red"
                        >*</span
                      ></label
                    >

                    <select
                      class="common__login__input px-2 form-control"
                      aria-label="Default select example"
                      v-model="store.formeditapeple.user_prefrix"
                    >
                      <option selected value="" disabled>
                        {{ $t("choose") }}
                      </option>
                      <option value="ທ້າວ">{{ $t("than") }}</option>
                      <option value="ນາງ">{{ $t("nang") }}</option>
                    </select>
                    <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="v$.user_prefrix.$error"
                      >{{ $t("profile_alert_title") }}</span
                    >
                  </div>
                </div>
                <div class="col-xl-5">
                  <div class="login__form">
                    <label class="form__label"
                      >{{ $t("fname") }}
                      <span class="text-xs text-red-500" style="color: red"
                        >*</span
                      ></label
                    >
                    <input
                      class="common__login__input form-control"
                      type="text"
                      :placeholder="$t('fname')"
                      maxlength="50"
                      v-model="store.formeditapeple.first_name"
                      :class="{
                        'border-red-500 focus:border-red-500':
                          v$.first_name.$error,
                        'border-[#42d392] ': !v$.first_name.$invalid,
                      }"
                      @change="v$.first_name.$touch"
                    />
                    <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="v$.first_name.$error"
                      >{{ $t("form_d_first_name") }}</span
                    >
                  </div>
                </div>
                <div class="col-xl-5">
                  <div class="login__form">
                    <label class="form__label"
                      >{{ $t("lname")
                      }}<span class="text-xs text-red-500" style="color: red"
                        >*</span
                      ></label
                    >
                    <input
                      class="common__login__input form-control"
                      type="text"
                      :placeholder="$t('lname')"
                      maxlength="50"
                      v-model="store.formeditapeple.last_name"
                      :class="{
                        'border-red-500 focus:border-red-500':
                          v$.last_name.$error,
                        'border-[#42d392] ': !v$.last_name.$invalid,
                      }"
                      @change="v$.last_name.$touch"
                    />
                    <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="v$.last_name.$error"
                      >{{ $t("form_d_last_name") }}</span
                    >
                  </div>
                </div>
                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <label class="form__label"
                      >{{ $t("form_approve_full_name") }}
                      <span class="text-xs text-red-500" style="color: red"
                        >*</span
                      >
                    </label>
                    <input
                      class="common__login__input form-control"
                      type="text"
                      :placeholder="$t('full_name_update_acc_pehol')"
                      v-model="store.formeditapeple.full_name"
                      :class="{
                        'border-red-500 focus:border-red-500':
                          v$.full_name.$error,
                        'border-[#42d392] ': !v$.full_name.$invalid,
                      }"
                      @change="v$.full_name.$touch"
                       maxlength="100"
                    />
                    <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="v$.full_name.$error"
                      >{{ $t("form_d_full_name") }}</span
                    >
                  </div>
                </div>

                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <label class="form__label"
                      >username
                      <span class="text-xs text-red-500" style="color: red"
                        >*</span
                      >
                    </label>
                    <input
                      class="common__login__input form-control"
                      type="text"
                      :placeholder="$t('pleho_user_users')"
                      v-model="store.formeditapeple.username"
                      :class="{
                        'border-red-500 focus:border-red-500':
                          v$.username.$error,
                        'border-[#42d392] ': !v$.username.$invalid,
                      }"
                      @change="v$.username.$touch"
                       maxlength="30"
                    />
                    <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="v$.username.$error"
                      >{{ $t("profile_alert_usersname") }}</span
                    >


                    <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="store.checkusername"
                      >{{ $t("alert_checkusername") }}</span
                    >
                  </div>
                </div>


                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <label class="form__label"
                      >{{ $t("form_password") }}
                     
                    </label>
                    <input
                      class="common__login__input form-control"
                      type="text"
                      :placeholder="$t('pleho_user_password')" 
                      v-model="store.formeditapeple.user_password"
               
                     
                       maxlength="12"
                    />
                    <button
                            class="changeImg btn btn-outline-dark"
                         @click="RandomPassword"
                          >
                            Generate
                          </button>
                  </div>
                </div>


                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <label class="form__label"
                      >ເບີໂທ
                      <span class="text-xs text-red-500" style="color: red"
                        >*</span
                      >
                    </label>
                    <input
                      class="common__login__input form-control"
                      type="text"
                      :placeholder="$t('pleho_user_phone')"
                      v-model="store.formeditapeple.user_phone"
                      :class="{
                        'border-red-500 focus:border-red-500':
                          v$.user_phone.$error,
                        'border-[#42d392] ': !v$.user_phone.$invalid,
                      }"
                         maxlength="10"
                          @input="filterInput"
                      @change="v$.user_phone.$touch"
                    />
                    <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="v$.user_phone.$error"
                      >{{ $t("profile_alert_phone") }}</span
                    >

                    <span
                      class="text-xs text-red-500"
                      style="color: #FFA927"
                      > ແນະນຳ: ເບີໂທ ຕ້ອງບໍ່ຊ້ຳກັນກັບຜູ້ອື່ນ ແລະ ຕ້ອງຢືນຢັນວ່າລາວເປັນເຈົ້າຂອງແທ້ (ຕຢ: ອາດຈະລອງໂທໃສ່)</span
                    >

                   

                    <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="store.checkphone"
                      >{{ $t("alert_checkphone") }}</span
                    >
                  </div>
                </div>

                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <label class="form__label">Email </label>
                    <input
                      class="common__login__input form-control"
                      type="text"
                      placeholder="admin@gmail.com"
                      v-model="store.formeditapeple.user_email"
                       maxlength="50"
                    />
                  </div>
                  <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="store.checkemail"
                      >{{ $t("alert_checkemail") }}</span
                    >
                </div>

                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <label class="form__label"
                      >{{ $t("form_approve_passport")
                      }}<span class="text-xs text-red-500" style="color: red"
                        >*</span
                      >
                    </label>
                    <input
                      class="common__login__input form-control"
                      type="text"
                      :placeholder="$t('passport_update_acc_pehol')"
                      v-model="store.formeditapeple.identification_number"
                      :class="{
                        'border-red-500 focus:border-red-500':
                          v$.identification_number.$error,
                        'border-[#42d392] ': !v$.identification_number.$invalid,
                      }"
                         maxlength="13"
                       @input="onInput"
                      @change="v$.identification_number.$touch"
                    />

                    <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="v$.identification_number.$error"
                      >{{ $t("form_d_iden") }}</span
                    >
                    <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="store.checkIden"
                      >{{ $t("alert_checkIden") }}</span
                    >
                  </div>
                </div>

                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <label class="form__label"
                      >{{ $t("form_approve_passport_exp")
                      }}<span class="text-xs text-red-500" style="color: red"
                        >*</span
                      >
                    </label>
                    <VueDatePicker
                      :format="format"
                      v-model="store.formeditapeple.expire"
                      :enable-time-picker="false"
                      :placeholder="$t('exp_update_acc_pehol')"
                    ></VueDatePicker>
                  </div>
                  <span
                    class="text-xs text-red-500"
                    style="color: red"
                    v-if="v$.expire.$error"
                    >{{ $t("form_d_exp") }}</span
                  >
                </div>
                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <label class="form__label"
                      >{{ $t("form_approve_birth_day")
                      }}<span class="text-xs text-red-500" style="color: red"
                        >*</span
                      >
                    </label>

                    <VueDatePicker
                      :format="format"
                      v-model="store.formeditapeple.user_birthday"
                      :enable-time-picker="false"
                      :placeholder="$t('bird_update_acc_pehol')"
                    ></VueDatePicker>
                    <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="v$.user_birthday.$error"
                      >{{ $t("form_d_bird") }}</span
                    >
                  </div>
                </div>

                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <label class="form__label"
                      >{{ $t("form_approve_address")
                      }}<span class="text-xs text-red-500" style="color: red"
                        >*</span
                      >
                    </label>
                    <input
                      class="common__login__input form-control"
                      type="text"
                      :placeholder="$t('add_update_acc_pehol')"
                      v-model="store.formeditapeple.user_address"
                      :class="{
                        'border-red-500 focus:border-red-500':
                          v$.user_address.$error,
                        'border-[#42d392] ': !v$.user_address.$invalid,
                      }"
                      @change="v$.user_address.$touch"
                    />

                    <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="v$.user_address.$error"
                      >{{ $t("form_d_add") }}</span
                    >
                  </div>
                </div>

                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <label class="form__label"
                      >{{ $t("form_approve_vil")
                      }}<span class="text-xs text-red-500" style="color: red"
                        >*</span
                      >
                    </label>
                    <input
                      class="common__login__input form-control"
                      type="text"
                      :placeholder="$t('home_update_acc_pehol')"
                      v-model="store.formeditapeple.user_village"
                      :class="{
                        'border-red-500 focus:border-red-500':
                          v$.user_village.$error,
                        'border-[#42d392] ': !v$.user_village.$invalid,
                      }"
                      @change="v$.user_village.$touch"
                    />
                    <span
                      class="text-xs text-red-500"
                      style="color: red"
                      v-if="v$.user_village.$error"
                      >{{ $t("form_d_vil") }}</span
                    >
                  </div>
                </div>

                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <label class="form__label"
                      >{{ $t("form_approve_prov") }}
                      <span class="text-xs text-red-500" style="color: red"
                        >*</span
                      ></label
                    >

                    <v-select
                      disabled
                      :options="store.zipcode"
                      label="item_data"
                      placeholder="ເລືອກ"
                      v-model="store.formeditapeple.location_id"
                      :reduce="(item_data) => item_data.id"
                    ></v-select>
                    <span
                      class="text-xs text-red-500 form-control"
                      style="color: red"
                      v-if="v$.location_id.$error"
                      >{{ $t("form_d_district") }}</span
                    >
                  </div>
                </div>

                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <label class="form__label">{{
                      $t("form_approve_cou")
                    }}</label>
                    <select
                      v-model="store.formeditapeple.country_id"
                      class="common__login__input px-2 form-control"
                      aria-label="Default select example"
                      disabled
                    >
                      <option selected :value="null" disabled>
                        {{ $t("choose") }}
                      </option>
                      <option
                        v-for="(item, index) in store.country"
                        :value="item.country_id"
                      >
                        {{ item.country_name_eng }}
                      </option>
                    </select>
                  </div>
                </div>


                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <label class="form__label">ສະຖານະ</label>
                    <select
                      class="common__login__input px-2 form-control"
                      aria-label="Default select example"
                      v-model="store.formeditapeple.verify_account"
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
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-sm-6">
                    <div class="card">
                      <div class="card-body">
                        <span
                          >{{ $t("form_approve_pass_image") }}
                          <span class="text-xs text-red-500" style="color: red"
                            >*</span
                          ></span
                        >
                        <span style="float: inline-end">
                          <input
                            type="file"
                            ref="fileInputFont"
                            style="display: none"
                          />
                          <button
                            class="changeImg btn btn-success"
                            @click="changeFont"
                          >
                            Browse
                          </button>
                        </span>
                      </div>
                      <div class="card-body" v-if="store.formeditapeple.passpost_image">
                        <img
                          class="aboutimg__1"
                          :src="coverimage(store.formeditapeple.passpost_image)"
                          alt="aboutimg"
                          style="width: 100%"
                        />
                      </div>
                      <div class="card-body" v-else>
                        <img
                          class="aboutimg__1"
                          src="../../../assets/img/ppt.JPG"
                          alt="aboutimg"
                          style="width: 100%"
                        />
                      </div>
                    </div>
                    <span
                     
                     style="color: red"
                     v-if="v$.passpost_image.$error"
                     >{{ $t("form_approve_pass_image") }}</span
                   >
                  </div>
                  
                  <div class="col-sm-6">
                    <div class="card">
                      <div class="card-body">
                        <span>{{ $t("form_approve_real_image") }}</span
                        ><span class="text-xs text-red-500" style="color: red"
                          >*</span
                        >
                        <span style="float: inline-end">
                          <input
                            type="file"
                            ref="fileInputBack"
                            style="display: none"
                          />
                          <button
                            class="changeImg btn btn-success"
                            @click="changeBack"
                          >
                            Browse
                          </button>
                        </span>
                      </div>

                   
                      <div class="card-body" v-if="store.formeditapeple.real_image">
                        <img
                          class="aboutimg__1"
                          :src="coverimage(store.formeditapeple.real_image)"
                          alt="aboutimg"
                          style="width: 100%"
                        />
                      </div>
                      <div class="card-body" v-else>
                        <img
                          class="aboutimg__1"
                          src="../../../assets/img/ppt.JPG"
                          alt="aboutimg"
                          style="width: 100%"
                        />
                      </div>
                    </div>
                    <span
                     
                     style="color: red"
                     v-if="v$.real_image.$error"
                     >{{ $t("form_approve_real_image") }}</span
                   >
                  </div>
                </div>
                <div class="col-xl-12 mt-3">
                  <div class="login__form">
                    <button type="button" class="btn btn-primary" style="width: 100%;" @click="updated()">Save</button>
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

<style></style>