<template>

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
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();


const toast = useToast()
const router = useRouter();
const store = AppointStore();

const { FormInsert } = storeToRefs(store);
const { ResetForm } = AppointStore();

const date = ref(new Date());



// In case of a range picker, you'll receive [Date, Date]
const format_start = (date) => {
const isoFormatInUTC = date.toISOString();

store.forminsert.ap_date_start = moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ss');
 return moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm');
return date
}

const format_end = (date) => {
const isoFormatInUTC = date.toISOString();


store.forminsert.ap_date_end = moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ss');
 return moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm');
}

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

const isDateDisabled = (date) => {



  const currentDate = new Date();
      const disableBeforeDate = new Date(); // Adjust the date as needed
      store.forminsert.ap_date_end = null
      return date < currentDate || date < disableBeforeDate;
  // return date < store.disabledDates;
    };

const isDateDisabledEnd = (date) => {
  const currentDate = new Date();
      const disableBeforeDate = new Date(store.forminsert.ap_date_start); // Adjust the date as needed

if(!store.forminsert.ap_date_start){
  return true;
}
return  date <= currentDate;

 };    



 


const backToUser = async () => {
  router.go(-1);
}


const v$ = useVuelidate(rules, FormInsert);

const save = async () => {
  v$.value.$validate();


    if (!v$.value.$error) {
    let checktime = await disabledDates()
    if(checktime == false){
      store.AlertEndtime  = true
     
return false;
    }
 
       const data = await store.SaveFormAPP();
    if (data == 200) {
      store.AlertEndtime  = false;
    await toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ');
     await   store.ResetForm();
     await router.push('/appointment');
          
    } else {
      toast.error('ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ')
    }
  
  }

}



const disabledDates = () => {


  const currentDate = new Date(store.forminsert.ap_date_start);
  const currentDateEnd = new Date(store.forminsert.ap_date_end);
  const isoFormatInUTC = currentDate.toISOString();
  const isoFormatInUTCend = currentDateEnd.toISOString();
     let start = moment.utc(isoFormatInUTC).tz('Asia/Bangkok').format('YYYY-MM-DD');
     let end = moment.utc(isoFormatInUTCend).tz('Asia/Bangkok').format('YYYY-MM-DD');
  

 if(start == end){
  const selectedHourstart = currentDate.getHours();
  const selectedHourend = currentDateEnd.getHours();
  if(selectedHourstart > selectedHourend){
    return false;
  }
  return true;
 
  //return false;
 }
// return true;
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
