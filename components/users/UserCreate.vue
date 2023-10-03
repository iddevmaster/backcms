<template>
  <div class="row mb-4">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">{{ $t("menu_user_form_add") }}</h4>
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
        v-model="store.formDataregister.user_firstname" :class="{
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
        v-model="store.formDataregister.user_lastname" :class="{
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
        v-model="store.formDataregister.user_name" :class="{
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
        v-model="store.formDataregister.user_password" :class="{
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
        v-model="store.formDataregister.user_email" :class="{
          'border-red-500 focus:border-red-500': v$.user_email.$error,
          'border-[#42d392] ': !v$.user_email.$invalid,
        }" @change="v$.user_email.$touch" autocomplete="off">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_email.$error">{{
        v$.user_email.$errors[0].$message
      }}</span>
    </div>
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_tel") }}</label>
      <input type="text" class="form-control" id="inputPassword3"  @input="onInput"
        v-model="store.formDataregister.user_phone" :class="{
          'border-red-500 focus:border-red-500': v$.user_phone.$error,
          'border-[#42d392] ': !v$.user_phone.$invalid,
        }" @change="v$.user_phone.$touch" autocomplete="off">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_phone.$error">{{
        v$.user_phone.$errors[0].$message
      }}</span>
    </div>
  </div>
  <div class="row mb-4">
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_type") }}</label>
      <select class="form-control" v-model="store.formDataregister.user_type">
    <option value="1">{{ $t("menu_user_c_type_user_superadmin") }}</option>
    <option value="2">{{ $t("menu_user_c_type_user_admin") }}</option>
    <option value="3">{{ $t("menu_user_c_type_user_user") }}</option>
    </select>
    </div>


    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_status") }}</label>
      <select class="form-control" v-model="store.formDataregister.active">
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
import { useToast } from 'vue-toastification';



const toast = useToast()
const router = useRouter();
const store = usersStore();

store.ResetForm();
const { SaveForm } = usersStore(); // use authenticateUser action from  auth store
const { getForm } = storeToRefs(store);
const { ResetForm } = usersStore(); // use authenticateUser action from  auth store

const { Zipcode } = usersStore(); 
const { Country } = usersStore();

await store.Zipcode();
await store.Country();


// const formDataregister = reactive({
//   user_name: store.formDataregister.user_name,
//   user_password: store.formDataregister.user_password,
//   user_firstname: store.formDataregister.user_firstname,
//   user_lastname: store.formDataregister.user_lastname,
//   user_email: store.formDataregister.user_email,
//   user_phone: store.formDataregister.user_phone,
//   user_address: store.formDataregister.user_address,
//   user_birthday: store.formDataregister.user_birthday,
//   verify_account: store.formDataregister.verify_account,
//   user_type: 3,
//   active:1,
//   country_id: store.country_id,
//   location_id: store.location_id,
// });



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
    // user_address: {
    //   required: helpers.withMessage('The Address field is required', required),
    //   minLength: minLength(6),
    // },
    // user_birthday: {
    //   required: helpers.withMessage('The Birthday field is required', required),
    //   minLength: minLength(6),
    // },
  };
});



const backToUser = async () => {
  router.go(-1);
}


const v$ = useVuelidate(rules, getForm);

const save = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    const data = await SaveForm();
    console.log(data);
    if (data == true) {
      toast.success('Save Data');
      await ResetForm();
      v$.value.$reset();
      router.push('/users');
    } else {
      toast.error('Fail Save Data')
    }
  }
}

 
const onFileChange = async (event) => {
   var input = event.target;
       if (input.files) {
         var reader = new FileReader();
         reader.onload = (e) => {
           store.image = e.target.result;
         }
         store.imagelist=input.files[0];
         reader.readAsDataURL(input.files[0]);
       }
 }

const removeImage = async () => {
store.image = null;
const input = document.querySelector('input[type="file"]');
  input.value = '';
}

const onInput = async (event) => {
    store.formDataregister.user_phone = event.target.value.replace(/\D/g, '');
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
#image-container img{
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
