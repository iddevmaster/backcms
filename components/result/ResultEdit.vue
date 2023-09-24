<template>
  <div class="row mb-4">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">ฟอร์ม แก้ผลสอบ</h4>
      </div>
    </div>
  
  
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">คะแนน</label>
      <input type="text" class="form-control" id="inputEmail3" placeholder="ใส่ตัวเลข *" maxlength="10"
      v-model="store.formeditresult.mr_score" :class="{
          'border-red-500 focus:border-red-500': v$.mr_score.$error,
          'border-[#42d392] ': !v$.mr_score.$invalid,
        }" @change="v$.mr_score.$touch" autocomplete="off" @input="onInput"
      >
      <span class="text-xs text-red-500" style="color:red" v-if="v$.mr_score.$error">{{
        v$.mr_score.$errors[0].$message
      }}</span>

    </div>



    <div class="col-sm-6">
      <label for="exampleFormControlInput1">ประเภทสอบ</label>
      <select class="form-control" v-model="store.formeditresult.mr_learn_type" >
        <option value="1">ทฤษฎี</option>
        <option value="2">ปฏิบัติ</option>
      </select>
      <span class="text-xs text-red-500" style="color:red" v-if="v$.mr_learn_type.$error">{{
        v$.mr_learn_type.$errors[0].$message
      }}</span>
    </div>


  </div>
  <div class="row mb-4">

    <div class="col-sm-6">
      <label for="exampleFormControlInput1">ประเภทรถที่สอบ</label>
      <select class="form-control"  v-model="store.formeditresult.dlt_code">
        <option v-for="(itemd,i) in store.dlt" :value="itemd.dlt_code">{{itemd.dlt_description}}</option>
      </select>
      <span class="text-xs text-red-500" style="color:red" v-if="v$.dlt_code.$error">{{
        v$.dlt_code.$errors[0].$message
      }}</span>
    </div>


    <div class="col-sm-6">
      <label for="exampleFormControlInput1">สถานะ</label>
      <select class="form-control" v-model="store.formeditresult.mr_status">
        <option value="pass">ผ่าน</option>
        <option value="fail">ไม่ผ่าน</option>
      </select>
      <span class="text-xs text-red-500" style="color:red" v-if="v$.mr_status.$error">{{
        v$.mr_status.$errors[0].$message
      }}</span>
    </div>
  </div>

  <button type="button" class="btn btn-primary" @click="update()">แก้ไข</button>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { ResultStore } from '@/store/result'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
import { ref, onMounted, onUnmounted } from 'vue';



const toast = useToast()
const router = useRouter();
const store = ResultStore();

await store.fetchDlt()
await store.fetchUser()

const { FormUpdateResult } = ResultStore();
const myOptions = JSON.parse(JSON.stringify(store.dlt));
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


const v$ = useVuelidate(rules, FormUpdateResult);

const update = async () => {
  v$.value.$validate();

  if (!v$.value.$error) {
  let data = await store.updateResult();
      
    if (data == true) {
      toast.success('Save Data');
    } else {
      toast.error('Fall Save Data')
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
