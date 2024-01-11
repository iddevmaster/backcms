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
      <input type="text" class="form-control" id="inputEmail3" maxlength="20"
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
      <input type="text" class="form-control" id="inputEmail3" maxlength="20"
      
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
      <input type="text" class="form-control" id="inputPassword3"  maxlength="20"
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
        v-model="store.formDataEdit.user_password" maxlength="20">
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
      <input type="text" class="form-control" id="inputPassword3"  maxlength="20"
        v-model="store.formDataEdit.user_phone" :class="{
          'border-red-500 focus:border-red-500': v$.user_phone.$error,
          'border-[#42d392] ': !v$.user_phone.$invalid, 
        }" @change="v$.user_phone.$touch" autocomplete="off" @input="onInput" placeholder="85620xxxxxxxx">
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
      required: helpers.withMessage('ຕ້ອງໃສ່ຊ່ອງໃສ່ຊື່ຜູ້ໃຊ້', required),
      minLength: minLength(1),
    },

    user_firstname: {
      required: helpers.withMessage('ຕ້ອງມີຊ່ອງໃສ່ຊື່ທໍາອິດ', required),
      minLength: minLength(1),
    },
    user_lastname: {
      required: helpers.withMessage('ຕ້ອງມີຊ່ອງໃສ່ນາມສະກຸນ', required),
      minLength: minLength(1),
    },

    user_phone: {
      required: helpers.withMessage('ຊ່ອງຂໍ້ມູນໂທລະສັບແມ່ນຕ້ອງການ', required),
      minLength: minLength(1),
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


</script>