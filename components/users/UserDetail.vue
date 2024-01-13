<template>

<div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">{{ $t("menu_user_detail") }}</h4>
      </div>
    </div>
    <div class="row mb-4">
    <div class="col-sm-12">
   
      <label for="exampleFormControlInput1">{{ $t("menu_user_iden") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="add" placeholder="ໝາຍເລກບັດປະຈຳຕົວ*"  v-model="store.formDetailEdit.identification_number"
      :class="{
          'border-red-500 focus:border-red-500': v$.identification_number.$error,
          'border-[#42d392] ': !v$.identification_number.$invalid,
        }" @change="v$.identification_number.$touch" autocomplete="off" maxlength="13"   @input="onInput"
      >
      <span class="text-xs text-red-500" style="color:red" v-if="v$.identification_number.$error">{{
        v$.identification_number.$errors[0].$message
      }}</span>
    </div>
  </div>
     <div class="row mb-4">
    <div class="col-sm-12">
      <label for="exampleFormControlInput1">{{ $t("menu_user_address") }}</label>
      <input type="text" class="form-control" id="add" placeholder="ທີ່ຢູ່ *"  v-model="store.formDetailEdit.user_address"
      :class="{
          'border-red-500 focus:border-red-500': v$.user_address.$error,
          'border-[#42d392] ': !v$.user_address.$invalid,
        }" @change="v$.user_address.$touch" autocomplete="off" maxlength="100"
      >
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_address.$error">{{
        v$.user_address.$errors[0].$message
      }}</span>
    </div>
  </div>
  <div class="row mb-4">
    <div class="col-sm-12">
      <label for="exampleFormControlInput1">{{ $t("menu_user_birdday") }}</label>
      <input type="date" class="form-control" id="birthday" placeholder="วันเกิด *" format="YYYY-MM-dd"   v-model="store.formDetailEdit.user_birthday" 
      :class="{
          'border-red-500 focus:border-red-500': v$.user_birthday.$error,
          'border-[#42d392] ': !v$.user_birthday.$invalid,
        }" @change="v$.user_birthday.$touch" autocomplete="off" 
      >
      
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_birthday.$error">{{
        v$.user_birthday.$errors[0].$message
      }}</span>
    </div>
  </div> 

  <div class="row mb-4">
    <div class="col-sm-12">
      <label for="exampleFormControlInput1">{{ $t("menu_user_village") }}</label>
      <input type="text" class="form-control" id="add" placeholder="ທີ່ຢູ່ *"  v-model="store.formDetailEdit.user_village" maxlength="30"
      :class="{
          'border-red-500 focus:border-red-500': v$.user_village.$error,
          'border-[#42d392] ': !v$.user_village.$invalid,
        }" @change="v$.user_village.$touch" autocomplete="off"
      >
      <span class="text-xs text-red-500" style="color:red" v-if="v$.user_village.$error">{{
        v$.user_village.$errors[0].$message
      }}</span>
    </div>
  </div>
    <div class="row mb-4">
    <div class="col-sm-12">
      <label for="exampleFormControlInput1">{{ $t("menu_user_zipcode") }}</label>

      <span v-if="locale == 'la'">
                  <span
                    class="text-xs text-red-500"
                    style="color: red"
                    v-if="v$.location.$error"
                    >ເລືອກສັນຊາດຂອງເຈົ້າ</span
                  >
                </span>

                <span v-if="locale == 'en'">
                  <span
                    class="text-xs text-red-500"
                    style="color: red"
                    v-if="v$.location.$error"
                    >
Choose your nationality</span
                  >
                </span>
    <!-- <select class="form-control" v-if="store.zipcode" v-model="store.formDetailEdit.location_id">
    <option   v-for="(zipcode, index) in store.zipcode" :key="zipcode.id" :value="zipcode.id">{{zipcode.zipcode_name}}</option>
    </select> -->


    <v-select
  v-model="store.formDetailEdit.location"
    :options="store.zipcode"
    label="zipcode_name" 
    @input="changedLabelZip"
     placeholder="ເລືອກ"
  ></v-select>

    </div>
    <div class="col-sm-12">
      <label for="exampleFormControlInput1">{{ $t("menu_user_country") }}</label>

      <span v-if="locale == 'la'">
                  <span
                    class="text-xs text-red-500"
                    style="color: red"
                    v-if="v$.country.$error"
                    >ເລືອກສັນຊາດຂອງເຈົ້າ</span
                  >
                </span>

                <span v-if="locale == 'en'">
                  <span
                    class="text-xs text-red-500"
                    style="color: red"
                    v-if="v$.country.$error"
                    >
Choose your nationality</span
                  >
                </span>
      <!-- <select class="form-control" v-if="store.country" v-model="store.formDetailEdit.country_id">
    <option   v-for="(country, x) in store.country" :key="country.country_id" :value="country.country_id">{{country.country_name_eng}}</option>
    </select> -->
    <v-select
  v-model="store.formDetailEdit.country"
    :options="store.country"
    label="country_name_eng"
     placeholder="ເລືອກ"
     @input="changedLabelCounrt"
  ></v-select>

 
    </div>
  </div>


    <div class="row mb-4">
    <div class="col-sm-12">
      <label for="exampleFormControlInput1">{{ $t("menu_user_verify") }}</label>
      <select class="form-control" v-model="store.formDetailEdit.verify_account">
    <option value="unactive">{{ $t("unactive") }}</option>
    <option value="phone_unactive">{{ $t("phone_unactive") }}</option>
    <option value="phone_active">{{ $t("phone_active") }}</option>
    <option value="system_unactive">{{ $t("system_unactive") }}</option>
    <option value="system_active">{{ $t("system_active") }}</option>
    </select>
    </div>

    
  </div>

    <div class="form-group mb-4 mt-3">
      <label for="exampleFormControlFile1">{{ $t("menu_user_image") }}</label> <span class="text-xs text-red-500" style="color:red"
        v-if="store.imageReq == true"> Invalid file selected</span>
      <input type="file" class="form-control-file" id="exampleFormControlFile1"  @change="onFileChange"
        ref="fileupload" accept="image/*">
    </div>
    <div class="border p-2 mt-3">
      <p>แสดงรูปตรงนี้:</p>
      <template  v-if="store.image">
        <div class="row">
          <div id="image-container" class="col-md-3 col-sm-4 col-6" >
            <div class="image-wrapper">
              <img :src="coverimage(store.image)" class="img-fluid" />
              <button @click="removeImage()" class="delete-button"><i class="bi bi-x-lg"></i></button>
            </div>
          </div>
        </div>
      </template>
    </div>

  
    <div class="form-group mb-4 mt-3">
      <button type="button" class="btn btn-primary" @click="savedetail()">{{ $t("menu_user_bt_save") }}</button>
    </div>
    
</template>

  <script setup lang="ts">
  import 'vue-select/dist/vue-select.css';
  import vSelect from 'vue-select';
  import { storeToRefs } from 'pinia';
  import { defineComponent } from 'vue';
  import { usersStore } from '@/store/users'; // import the auth store we just created
  import { useVuelidate } from '@vuelidate/core';
  import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
  import { useToast } from 'vue-toastification'
  import ApiService  from "../../services/api.service";
  import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();


  const toast = useToast()
  
  const router = useRouter();
  const store = usersStore();
  
  const { FormEditDetail } = storeToRefs(store);

  const { Zipcode } = usersStore(); 
const { Country } = usersStore();
const { UpdateDetails } = usersStore();

await store.Zipcode();
await store.Country();
store.imageReq = false;

  
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
      user_address: {
        required: helpers.withMessage('ປ່ອງທີ່ຢູ່ແມ່ນຕ້ອງການ', required),
        minLength: minLength(1),
      },
      country: {
      required: helpers.withMessage("Select Country field is required", required),
      minLength: minLength(1),
      },
      location: {
      required: helpers.withMessage("Select Country field is required", required),
      minLength: minLength(1),
      },
      user_birthday: {
        required: helpers.withMessage('ຕ້ອງມີຊ່ອງຂໍ້ມູນວັນເກີດ', required),
        minLength: minLength(1),
      },
      identification_number: {
        required: helpers.withMessage('ຕ້ອງມີຊ່ອງຂໍ້ມູນການລະບຸຕົວຕົນ', required),
        minLength: minLength(5),
      },
      user_village: {
        required: helpers.withMessage('ພື້ນທີ່ບ້ານແມ່ນຕ້ອງການ', required),
        minLength: minLength(1),
      },


      
      
    };
  });
  
  
  const v$ = useVuelidate(rules, FormEditDetail);
  
  const backToUser = async () => {
    router.go(-1);
  }
  

const savedetail = async () => {
  v$.value.$validate();


  if(!store.image){
store.imageReq = true;
return false;
}
  if (!v$.value.$error) {
    const data = await UpdateDetails();
      if(data === true){
      await toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ')
      router.push('/users');
      }else {
       await toast.error('ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ')
      }
  
  }
}

const changedLabelCounrt = async (event) => {
store.formscount.search = event.target.value
await store.Country();
}

const changedLabelZip = async (event) => {
store.formszipcode.search = event.target.value
await store.Zipcode();

}

  const onFileChange = async (event) => {
   var input = event.target;
   const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
         var reader = new FileReader();
         reader.onload = (e) => {
           store.image = e.target.result;
         }
         store.imagelist=input.files[0];
         reader.readAsDataURL(input.files[0]);
       } else {
    toast.error('ອັບໂຫຼດໄຟລ໌ຮູບພາບເທົ່ານັ້ນ')
     }

 }



const removeImage = async () => {
store.image = null;

const input = document.querySelector('input[type="file"]');
  input.value = '';
}


const onInput = async (event) => {
    store.formDetailEdit.identification_number = event.target.value.replace(/\D/g, '');
}

function coverimage(i) {
  let result = i.slice(0, 6);
if (result === 'static') {
  let im =  ApiService.image(i);
  return im;
}else {
  return i;
}
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