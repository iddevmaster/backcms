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

    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_name") }}</label>
      <input type="text" class="form-control" id="inputEmail3"
        v-model="store.formDataEdit.user_firstname" :class="{
          'border-red-500 focus:border-red-500': v$.user_firstname.$error,
          'border-[#42d392] ': !v$.user_firstname.$invalid,
        }" @change="v$.user_firstname.$touch" autocomplete="off">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_firstname.$error">{{
        v$.user_firstname.$errors[0].$message
      }}</span>
    </div>



    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_lname") }}</label>
      <input type="text" class="form-control" id="inputEmail3"
        v-model="store.formDataEdit.user_lastname" :class="{
          'border-red-500 focus:border-red-500': v$.user_lastname.$error,
          'border-[#42d392] ': !v$.user_lastname.$invalid,
        }" @change="v$.user_lastname.$touch" autocomplete="off">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_lastname.$error">{{
        v$.user_lastname.$errors[0].$message
      }}</span>
    </div>


  </div>
  <div class="row mb-4">

    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_username") }}</label>
      <input type="text" class="form-control" id="inputPassword3" 
        v-model="store.formDataEdit.user_name" :class="{
          'border-red-500 focus:border-red-500': v$.user_name.$error,
          'border-[#42d392] ': !v$.user_name.$invalid,
        }" @change="v$.user_name.$touch" autocomplete="off">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_name.$error">{{
        v$.user_name.$errors[0].$message
      }}</span>


    </div>

    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_pass") }}</label>
      <input type="text" class="form-control" id="inputPassword3" 
        v-model="store.formDataEdit.user_password" :class="{
          'border-red-500 focus:border-red-500': v$.user_password.$error,
          'border-[#42d392] ': !v$.user_password.$invalid,
        }" @change="v$.user_password.$touch" autocomplete="off">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_password.$error">{{
        v$.user_password.$errors[0].$message
      }}</span>

    </div>
  </div>
  <div class="row mb-4">
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_email") }}</label>
      <input type="text" class="form-control" id="inputPassword3" 
        v-model="store.formDataEdit.user_email" :class="{
          'border-red-500 focus:border-red-500': v$.user_email.$error,
          'border-[#42d392] ': !v$.user_email.$invalid,
        }" @change="v$.user_email.$touch" autocomplete="off">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_email.$error">{{
        v$.user_email.$errors[0].$message
      }}</span>

    </div>
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_tel") }}</label>
      <input type="text" class="form-control" id="inputPassword3" 
        v-model="store.formDataEdit.user_phone" :class="{
          'border-red-500 focus:border-red-500': v$.user_phone.$error,
          'border-[#42d392] ': !v$.user_phone.$invalid, 
        }" @change="v$.user_phone.$touch" autocomplete="off" @input="onInput">
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
    <option value="1">ใช้งาน</option>
    <option value="0">ไม่ใช้งาน</option>
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
const toast = useToast()

const router = useRouter();
const store = usersStore();

const { FormEdit } = storeToRefs(store);


await store.fetchUsersId(router.currentRoute.value.params.id)


//  const formDataEdit = reactive({
//     user_name: store.formDataEdit.user_name,
//     user_password: "",
//     user_firstname: store.formDataEdit.user_firstname,
//     user_lastname: store.formDataEdit.user_lastname,
//     user_email: store.formDataEdit.user_email,
//     user_phone:store.formDataEdit.user_phone,
//     user_type: 3,
// });

const { Update } = usersStore(); // use authenticateUser action from  auth store

const rules = computed(() => {
  return {
    user_name: {
      required: helpers.withMessage('The User name field is required', required),
      minLength: minLength(1),
    },
    user_password: {
      required: helpers.withMessage('The Password field is required', required),
      minLength: minLength(1),
    },
    user_firstname: {
      required: helpers.withMessage('The First Name field is required', required),
      minLength: minLength(1),
    },
    user_lastname: {
      required: helpers.withMessage('The Last Name field is required', required),
      minLength: minLength(1),
    },

    user_phone: {
      required: helpers.withMessage('The tel field is required', required),
      minLength: minLength(1),
    },

    user_email: {
      required: helpers.withMessage('The password confirmation field is required', required),
      email: helpers.withMessage('Invalid email format', email),
    },
  };
});


const v$ = useVuelidate(rules, FormEdit);



const save = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    let updatedata = await Update(router.currentRoute.value.params.id); //save form  ส่งไป Store User
    if (updatedata) {
      toast.success('Save Data');
    } else {
      toast.error('Fail Save Data')
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