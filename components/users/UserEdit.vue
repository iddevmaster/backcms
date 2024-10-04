<template>
  <div class="row mb-4">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">{{ $t("menu_user_form_edit") }}</h4>
      </div>
    </div>
    <div id="form_grid_layouts" class="col-lg-2">
      <div class="seperator-header" style="text-align: center;" @click="backToUser()">
        <button class="btn btn-primary additem _effect--ripple waves-effect waves-light">{{ $t("menu_user_c_back") }}</button>
      </div>
    </div>

    <div class="col-sm-2">
      <label for="exampleFormControlInput1">{{ $t("form_name_title") }}</label> <span class="text-xs text-red-500" style="color:red"> * </span>
      <select class="form-control" v-model="store.formDataEdit.user_prefrix">
    <option :value="null" disabled>{{ $t("choose") }}</option>
    <option value="ທ້າວ">{{ $t("than") }}</option>
    <option value="ນາງ">{{ $t("nang") }}</option>
    </select>

    <span class="text-xs text-red-500" style="color:red" v-if="v$.user_prefrix.$error">{{
        v$.user_prefrix.$errors[0].$message
      }}</span>

    
    </div>

    <div class="col-sm-5">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_name") }}</label> <span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputEmail3" maxlength="20" @input="filterInputFirst"
        v-model="store.formDataEdit.user_firstname" :class="{
          'border-red-500 focus:border-red-500': v$.user_firstname.$error,
          'border-[#42d392] ': !v$.user_firstname.$invalid,
        }" @change="v$.user_firstname.$touch" autocomplete="off"  placeholder="ຊື່​ແທ້">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_firstname.$error">{{
        v$.user_firstname.$errors[0].$message
      }}</span>
    </div>



    <div class="col-sm-5">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_lname") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputEmail3" maxlength="20"  @input="filterInputLast"
      
        v-model="store.formDataEdit.user_lastname" :class="{
          'border-red-500 focus:border-red-500': v$.user_lastname.$error,
          'border-[#42d392] ': !v$.user_lastname.$invalid,
        }" @change="v$.user_lastname.$touch" autocomplete="off"  placeholder="ນາມ​ສະ​ກຸນ">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_lastname.$error">{{
        v$.user_lastname.$errors[0].$message
      }}</span>
    </div>


  </div>
  <div class="row mb-4">

    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_username") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputPassword3"  maxlength="20" @input="filterInputUser"
        v-model="store.formDataEdit.user_name" :class="{
          'border-red-500 focus:border-red-500': v$.user_name.$error,
          'border-[#42d392] ': !v$.user_name.$invalid,
        }" @change="v$.user_name.$touch" autocomplete="off"  placeholder="ຜູ້ໃຊ້">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_name.$error">{{
        v$.user_name.$errors[0].$message
      }}</span>


    </div>

    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_pass") }}</label> <span class="text-xs text-red-500" style="color:red"> 
        
  
        <span v-if="locale == 'la'" > {{ $t("menu_user_c_pass_message") }}</span>
      <span v-if="locale == 'en'" > {{ $t("menu_user_c_pass_message") }}</span>
     
      </span>
      <input type="text" class="form-control" id="654134535" 
        v-model="store.formDataEdit.user_password" minlength="6">
    </div>
  </div>
  <div class="row mb-4">
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_email") }}</label> 
      <input type="text" class="form-control" id="inputPassword3" 
        v-model="store.formDataEdit.user_email"  placeholder="Test@gmail.com" maxlength="30">
    </div>
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_tel") }}</label> <span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputPassword3"  maxlength="10"
        v-model="store.formDataEdit.user_phone" :class="{
          'border-red-500 focus:border-red-500': v$.user_phone.$error,
          'border-[#42d392] ': !v$.user_phone.$invalid, 
        }" @change="v$.user_phone.$touch" autocomplete="off" @input="filterInput" placeholder="20xxxxxxxx">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_phone.$error">{{
        v$.user_phone.$errors[0].$message
      }}</span>

    </div>
  </div>
  <div class="row mb-4">
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_type") }}</label>
      <select class="form-control" v-model="store.formDataEdit.user_type">
        <option value="1">{{ $t("menu_user_c_type_user_superadmin") }}</option>
    <option value="2">{{ $t("menu_user_c_type_user_admin") }}</option>
    <option value="3">{{ $t("menu_user_c_type_user_user") }}</option>
    </select>
    </div>


       <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_status") }}</label>
      <select class="form-control" v-model="store.formDataEdit.active">
  <option value="1">
       <span v-if="locale == 'la'" >{{ $t("active") }}</span>
      <span v-if="locale == 'en'" >{{ $t("active") }}</span>
      <span v-if="locale == 'th'" >{{ $t("active") }}</span>

    </option>
    <option value="0">
  <span v-if="locale == 'la'" >{{ $t("notactive") }}</span>
      <span v-if="locale == 'en'" >{{ $t("notactive") }}</span>
      <span v-if="locale == 'th'" >{{ $t("notactive") }}</span>

    </option>
    </select>
    </div>
  </div>
  <button type="button" class="btn btn-primary" @click="save()">{{ $t("menu_user_c_save") }}</button>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useToast } from 'vue-toastification'
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();
const toast = useToast()

const router = useRouter();
const store = usersStore();

const { FormEdit } = storeToRefs(store);

await store.fetchUsersId(router.currentRoute.value.params.id)
const { Update } = usersStore(); // use authenticateUser action from  auth store

const rules = computed(() => {
  return {
    user_name: {
      required: helpers.withMessage('Username ຕ້ອງມີຢ່າງໜ້ອຍ 1 ຕົວອັກສອນ', required),
      minLength: minLength(1),
    },

    user_firstname: {
      required: helpers.withMessage('ຊື່ ຕ້ອງມີຢ່າງໜ້ອຍ 1 ຕົວອັກສອນ', required),
      minLength: minLength(1),
    },
    user_lastname: {
      required: helpers.withMessage('ນາມສະກຸນ ຕ້ອງມີຢ່າງໜ້ອຍ 1 ຕົວອັກສອນ', required),
      minLength: minLength(1),
    },

    user_phone: {
      required: helpers.withMessage('ເບີໂທ ຕ້ອງມີຢ່າງໜ້ອຍ 10 ຕົວອັກສອນ', required),
      minLength: minLength(10),
    },
    user_prefrix: {
      required: helpers.withMessage('ຊ່ອງຂໍ້ມູນແມ່ນຕ້ອງການ', required),
      minLength: minLength(1),
    },
  };
});


const v$ = useVuelidate(rules, FormEdit);



const save = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    let updatedata = await Update(router.currentRoute.value.params.id); //save form  ส่งไป Store User
    if (updatedata) {
      toast.success('ແກ້ໄຂສຳເລັດແລ້ວ');
    } else {
      toast.error('ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ')
    }

  }
}

const backToUser = async () => {
  router.go(-1);
}

const onInput = async (event) => {
    store.formDataEdit.user_phone = event.target.value.replace(/\D/g, '');
}

const filterInput = async (event) => {
  // stores.form.user_phone = event.target.value.replace(/\D/g, "");
  const key = event.data;
      if (event.data === ' ') {
        store.formDataEdit.user_phone = store.formDataEdit.user_phone.substring(0, store.formDataEdit.user_phone.length - 1);
        return;
      }
      if (store.formDataEdit.user_phone.charAt(0) !== '2') {
        store.formDataEdit.user_phone = "";
        return;
      } 
      if  (store.formDataEdit.user_phone.charAt(1) !== '0') {
       store.formDataEdit.user_phone = "2";
        return;
      } 
  store.formDataEdit.user_phone = event.target.value.replace(/\D/g, "");
};





const filterInputUser = async (event) => {
  const key = event.data;
      if (event.data === ' ') {
        store.formDataEdit.user_name = store.formDataEdit.user_name.substring(0, store.formDataEdit.user_name.length - 1);
        return;
      }
      store.formDataEdit.user_name = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};

const filterInputFirst = async (event) => {
  const key = event.data;
      if (event.data === ' ') {
        store.formDataEdit.user_firstname = store.formDataEdit.user_firstname.substring(0, store.formDataEdit.user_firstname.length - 1);
        return;
      }
      store.formDataEdit.user_firstname = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};

const filterInputLast = async (event) => {
  const key = event.data;
      if (event.data === ' ') {
        store.formDataEdit.user_lastname = store.formDataEdit.user_lastname.substring(0, store.formDataEdit.user_lastname.length - 1);
        return;
      }
      store.formDataEdit.user_lastname = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};



</script>