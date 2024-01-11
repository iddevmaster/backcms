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

    <div class="col-sm-2">
      <label for="exampleFormControlInput1">{{ $t("form_name_title") }}</label> <span class="text-xs text-red-500" style="color:red"> * </span>
      <select class="form-control" v-model="store.formDataregister.user_prefrix">
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
      <input type="text" class="form-control" id="inputEmail3"
        v-model="store.formDataregister.user_firstname" :class="{
          'border-red-500 focus:border-red-500': v$.user_firstname.$error,
          'border-[#42d392] ': !v$.user_firstname.$invalid,
        }" @change="v$.user_firstname.$touch" autocomplete="off"   placeholder="ຊື່​ແທ້" maxlength="20">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_firstname.$error">{{
        v$.user_firstname.$errors[0].$message
      }}</span>
    </div>



    <div class="col-sm-5">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_lname") }}</label> <span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputEmail3" maxlength="20"
        v-model="store.formDataregister.user_lastname" :class="{
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
      <input type="text" class="form-control" id="inputPassword3" 
        v-model="store.formDataregister.user_name" :class="{
          'border-red-500 focus:border-red-500': v$.user_name.$error,
          'border-[#42d392] ': !v$.user_name.$invalid,
        }" @change="v$.user_name.$touch" autocomplete="off" placeholder="ຜູ້ໃຊ້" maxlength="20">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_name.$error">{{
        v$.user_name.$errors[0].$message
      }}</span>
    </div>

    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_pass") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputPassword3"
      placeholder="ລະຫັດຜ່ານ" maxlength="20"
        v-model="store.formDataregister.user_password" :class="{
          'border-red-500 focus:border-red-500': v$.user_password.$error,
          'border-[#42d392] ': !v$.user_password.$invalid,
          
        }" 
        @change="v$.user_password.$touch" autocomplete="off" >
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_password.$error">{{
        v$.user_password.$errors[0].$message
      }}</span>
    </div>
  </div>
  <div class="row mb-4">
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_email") }}</label>
      <input type="text" class="form-control" id="inputPassword3"
        v-model="store.formDataregister.user_email"  placeholder="Test@gmail.com" maxlength="30" >
   
    </div>
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_user_c_tel") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputPassword3"  @input="onInput" maxlength="20"
        v-model="store.formDataregister.user_phone" :class="{
          'border-red-500 focus:border-red-500': v$.user_phone.$error,
          'border-[#42d392] ': !v$.user_phone.$invalid, 
        }" @change="v$.user_phone.$touch" autocomplete="off" placeholder="85620xxxxxxxx">
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
import { useToast } from 'vue-toastification';
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();


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





const rules = computed(() => {
  return {
    user_name: {
      required: helpers.withMessage('ຕ້ອງໃສ່ຊ່ອງໃສ່ຊື່ຜູ້ໃຊ້', required),
      minLength: minLength(1),
    },
    user_password: {
      required: helpers.withMessage('ປ່ອງລະຫັດຜ່ານແມ່ນຕ້ອງການ', required),
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
    if (data == true) {
      toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ');
      await ResetForm();
      v$.value.$reset();
      router.push('/users');
    } else {
      toast.error('ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ')
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
