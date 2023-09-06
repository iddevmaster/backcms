<template>
  <div class="row mb-4">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">ฟอร์ม เพิ่มนัดหมาย</h4>
      </div>
    </div>

    <div id="form_grid_layouts" class="col-lg-2">
      <div class="seperator-header" style="text-align: center;" @click="backToUser()">
        <button class="btn btn-primary additem _effect--ripple waves-effect waves-light">กลับหน้าผู้ใช้งาน</button>
      </div>
    </div>
    {{ store.formedit }}
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">Quota</label>
      <input type="text" class="form-control" id="inputEmail3" placeholder="จำนวนที่สามารถจองได้ *" maxlength="3"
        v-model="store.formedit.ap_quota" :class="{
          'border-red-500 focus:border-red-500': v$.ap_quota.$error,
          'border-[#42d392] ': !v$.ap_quota.$invalid,
        }" @change="v$.ap_quota.$touch" autocomplete="off" @input="onInput">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.ap_quota.$error">{{
        v$.ap_quota.$errors[0].$message
      }}</span>
    </div>


    <div class="col-sm-6">
      <label for="exampleFormControlInput1">Remark</label>
      <input type="text" class="form-control" id="inputEmail3" placeholder="หมายเหตุ *"
        v-model="store.formedit.ap_remark" :class="{
          'border-red-500 focus:border-red-500': v$.ap_remark.$error,
          'border-[#42d392] ': !v$.ap_remark.$invalid,
        }" @change="v$.ap_remark.$touch" autocomplete="off">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.ap_remark.$error">{{
        v$.ap_remark.$errors[0].$message
      }}</span>
    </div>


  </div>
  <div class="row mb-4">
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">ap_date_start</label>
            
            <vue-date-picker  v-model="t" ></vue-date-picker>
      <span class="text-xs text-red-500" style="color:red" v-if="v$.ap_date_start.$error">{{
        v$.ap_date_start.$errors[0].$message
      }}</span>
    </div>

    <div class="col-sm-6">
      <label for="exampleFormControlInput1">ap_date_end</label>
 
          <VueDatePicker  v-model="store.formedit.ap_date_end"   required></VueDatePicker>
      <span class="text-xs text-red-500" style="color:red" v-if="v$.ap_date_end.$error">{{
        v$.ap_date_end.$errors[0].$message
      }}</span>
    </div>
  </div>

  <div class="row mb-4">
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">ประเภทผู้ใช้งาน</label>
      <select class="form-control" v-model="store.formedit.ap_learn_type">
    <option value="1">ทฤษฎี</option>
    <option value="2">ปฏิบัติ</option>
    </select>
    </div>


    <div class="col-sm-6">
      <label for="exampleFormControlInput1">สถานะ</label>

     <select class="form-select form-select" aria-label="Default select example" v-model="store.formedit.dtl_code">
         <option   v-for="(item, index) in store.dtl" :key="item.dlt_code" :value="item.dlt_code" >{{item.dlt_description}}</option>
      </select>
    </div>
  </div>



  <button type="button" class="btn btn-primary" @click="update()">บันทึก</button>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { AppointStore } from '@/store/appoint'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment-timezone';


const toast = useToast()
const router = useRouter();
const store = AppointStore();

const { FormInsert } = storeToRefs(store);


const date = ref(new Date());
// const t = moment.utc('2016-01-01T10:00:00+07:00').format()

const a = store.formedit.ap_date_start.slice(0, -5) + '+07:00';
const t = moment.utc(a).format()

console.log(t);
// 2023-09-05T15:00:00.000Z
// In case of a range picker, you'll receive [Date, Date]

const update = async () => {
await store.Update();
}

      //     :locale="store.locale"
      // :timezone="store.selectedTimeZone"
      //  :format="store.dateFormat"

const rules = computed(() => {
  return {
    ap_quota: {
      required: helpers.withMessage('The Quota field is required', required),
      minLength: minLength(1),
    },
    ap_remark: {
      required: helpers.withMessage('The Remark field is required', required),
      minLength: minLength(1),
    },
    ap_date_start: { required
    },
    ap_date_end: { required 
    },
    

  };
});



const backToUser = async () => {
  router.go(-1);
}
const format_start = () => {
  

  const a = store.formedit.ap_date_start.slice(0, -5) + '+07:00';
const t = moment.utc(a).format()

  // const x = moment.utc(store.formedit.ap_date_start);
  // console.log(date);
  
 return t;
}
// 400Z

// const format_end = (date) => {
//   console.log(date)
// const isoFormatInUTC = date.toISOString();


// store.forminsert.ap_date_end = moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ss');
//  return moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm');
// }

const format_end = () => {

  console.log(store.formedit.ap_date_end);
 const date = ref(new Date(store.formedit.ap_date_end).toISOString());
  console.log('date',date.value);
  
  return store.formedit.ap_date_end;
}


const v$ = useVuelidate(rules, FormInsert);

const save = async () => {
  v$.value.$validate();
    if (!v$.value.$error) {
       const data = await store.SaveFormAPP();
      
    if (data == true) {
      toast.success('Save Data');
    } else {
      toast.error('Fall Save Data')
    }
  
  }

}


const onInput = async (event) => {
    store.forminsert.ap_quota = event.target.value.replace(/\D/g, '');
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
