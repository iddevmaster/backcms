<template>
  <div class="row mb-4">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">{{ $t("menu_result_form_create") }}</h4>
      </div>
    </div>


    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_result_form_score") }}</label>
      <input type="text" class="form-control" id="inputEmail3" placeholder="ใส่ตัวเลข *" maxlength="10"
        v-model="store.formresult.mr_score" :class="{
          'border-red-500 focus:border-red-500': v$.mr_score.$error,
          'border-[#42d392] ': !v$.mr_score.$invalid,
        }" @change="v$.mr_score.$touch" autocomplete="off" @input="onInput">


      <div v-if="locale == 'la'">
        <span v-if="v$.mr_score.$error" class="text-xs text-red-500" style="color: red">
          ຕ້ອງລະບຸຊ່ອງຄະແນນ</span>
      </div>

      <div v-if="locale == 'en'">
        <span v-if="v$.mr_score.$error" class="text-xs text-red-500" style="color: red">
          The Score field is required</span>
      </div>

      <div v-if="locale == 'th'">
        <span v-if="v$.mr_score.$error" class="text-xs text-red-500" style="color: red">ต้องระบุช่องคะแนน</span>
      </div>


    </div>

    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_result_form_type") }}</label>
      <select class="form-control" v-model="store.formresult.mr_learn_type">
        <option value="1">
          <span v-if="locale == 'la'">{{ $t("menu_learn_theory") }}</span>
          <span v-if="locale == 'en'">{{ $t("menu_learn_theory") }}</span>
          <span v-if="locale == 'th'">{{ $t("menu_learn_theory") }}</span>
        </option>
        <option value="2">
          <span v-if="locale == 'la'">{{ $t("menu_learn_practice") }}</span>
          <span v-if="locale == 'en'">{{ $t("menu_learn_practice") }}</span>
          <span v-if="locale == 'th'">{{ $t("menu_learn_practice") }}</span>
        </option>
      </select>
      <span class="text-xs text-red-500" style="color:red" v-if="v$.mr_learn_type.$error">{{
        v$.mr_learn_type.$errors[0].$message
      }}</span>
    </div>


  </div>
  <div class="row mb-4">

    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_result_form_type_dlt") }}</label>
      <select class="form-control" v-model="store.formresult.dlt_code">
        <option v-for="(itemd, i) in storeapp.dlt" :value="itemd.dlt_code">
         
          <span v-if="locale == 'la'" >{{itemd.dlt_code}} : {{itemd.dlt_description_loas}}</span>
      <span v-if="locale == 'en'" >{{itemd.dlt_code}} : {{itemd.dlt_description_english}}</span>
 
        </option>
      </select>
      <span class="text-xs text-red-500" style="color:red" v-if="v$.dlt_code.$error">{{
        v$.dlt_code.$errors[0].$message
      }}</span>
    </div>


    <div class="col-sm-6">
      <label for="exampleFormControlInput1">{{ $t("menu_result_form_type_status") }}</label>
      <select class="form-control" v-model="store.formresult.mr_status">
        <option value="pass">{{ $t("menu_result_pass") }}

        </option>
        <option value="fail">{{ $t("menu_result_fall") }}</option>
      </select>
      <span class="text-xs text-red-500" style="color:red" v-if="v$.mr_status.$error">{{
        v$.mr_status.$errors[0].$message
      }}</span>
    </div>
  </div>




  <button type="button" class="btn btn-primary" @click="save()">{{ $t("menu_result_save") }}</button>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { ResultStore } from '@/store/result'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();

const toast = useToast()
const router = useRouter();
const store = ResultStore();
const storeapp = AppointStore()

// await store.fetchDlt()
await store.fetchUser()

const { FormResult } = ResultStore();
const myOptions = JSON.parse(JSON.stringify(storeapp.dlt));
const myValue = ref();

const myOptionsUser = JSON.parse(JSON.stringify(store.users));
const myUser = ref();

const rules = computed(() => {
  return {
    mr_score: {
      required: helpers.withMessage('The Score field is required', required),
      minLength: minLength(1),
    },
    mr_learn_type: {
      required: helpers.withMessage('The mr_learn_type field is required', required),
      minLength: minLength(1),
    },
    dlt_code: {
      required: helpers.withMessage('The dlt_code field is required', required),
      minLength: minLength(1),
    },
    mr_status: {
      required: helpers.withMessage('The mr_status field is required', required),
      minLength: minLength(1),
    },


  };
});

const myChangeEvent = (event) => {
  console.log("myChangeEvent: ", event.value);
}
const mySelectEvent = (e) => {
  console.log("mySelectEvent: ", e.value);
}

const backToUser = async () => {
  router.go(-1);
}
const onInput = async (event) => {
  store.formresult.mr_score = event.target.value.replace(/\D/g, '');
}


const v$ = useVuelidate(rules, FormResult);

const save = async () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    let data = await store.saveResult();

    if (data == true) {
      toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ');
    } else {
      toast.error('ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ')
    }

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
