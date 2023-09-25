<template>
  <div class="text-center"><h5 class="text-danger">#ผู้ใช้งาน {{ store.myChoose.user_firstname + ' ' + store.myChoose.user_lastname }} ยังไม่ผ่านการยืนยันตัวตน</h5></div>
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

const { FormResult } = ResultStore();
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
    user_id: {
      required: helpers.withMessage('The user_id field is required', required),
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


const v$ = useVuelidate(rules, FormResult);

const save = async () => {
  v$.value.$validate();

  if (!v$.value.$error) {
  let data = await store.saveResult();
      
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
.notpass h4 {
  background-color: rgba(255, 0, 0, 0.623);
  color: white;
  border-radius: 10px;
}
</style>
