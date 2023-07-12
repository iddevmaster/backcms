<template>
 
     
 <div class="row mb-4">
  {{FormEdit}}
        <div class="col-sm-6">
            <input type="text" class="form-control" id="inputEmail3" placeholder="First Name *" v-model="store.formDataEdit.user_firstname"
                  :class="{
                'border-red-500 focus:border-red-500': v$.user_firstname.$error,
                'border-[#42d392] ': !v$.user_firstname.$invalid,
              }"
              @change="v$.user_firstname.$touch"
              autocomplete="off"
            >
            <span class="text-xs text-red-500" style="color:red" v-if="v$.user_firstname.$error">{{
            v$.user_firstname.$errors[0].$message
          }}</span>
        </div>



        <div class="col-sm-6">
            <input type="text" class="form-control" id="inputEmail3" placeholder="Last Name *" v-model="store.formDataEdit.user_lastname"
         :class="{
                'border-red-500 focus:border-red-500': v$.user_lastname.$error,
                'border-[#42d392] ': !v$.user_lastname.$invalid,
              }"
              @change="v$.user_lastname.$touch"
              autocomplete="off"
            >
            <span class="text-xs text-red-500" style="color:red" v-if="v$.user_lastname.$error">{{
            v$.user_lastname.$errors[0].$message
          }}</span>
        </div>


    </div>
    <div class="row mb-4">
      
        <div class="col-sm-6">
            <input type="text" class="form-control" id="inputPassword3" placeholder="Username *" v-model="store.formDataEdit.user_name"
       :class="{
                'border-red-500 focus:border-red-500': v$.user_name.$error,
                'border-[#42d392] ': !v$.user_name.$invalid,
              }"
              @change="v$.user_name.$touch"
              autocomplete="off"
            >
            <span class="text-xs text-red-500" style="color:red" v-if="v$.user_name.$error">{{
            v$.user_name.$errors[0].$message
          }}</span>
            
        
        </div>

        <div class="col-sm-6">
            <input type="text" class="form-control" id="inputPassword3" placeholder="Password *" v-model="store.formDataEdit.user_password"
          :class="{
                'border-red-500 focus:border-red-500': v$.user_password.$error,
                'border-[#42d392] ': !v$.user_password.$invalid,
              }"
              @change="v$.user_password.$touch"
              autocomplete="off"
            >
            <span class="text-xs text-red-500" style="color:red" v-if="v$.user_password.$error">{{
            v$.user_password.$errors[0].$message
          }}</span>
 
        </div>
    </div>
    <div class="row mb-4">
        <div class="col-sm-6">
                <input type="text" class="form-control" id="inputPassword3" placeholder="Email *" v-model="store.formDataEdit.user_email"
                 :class="{
                'border-red-500 focus:border-red-500': v$.user_email.$error,
                'border-[#42d392] ': !v$.user_email.$invalid,
              }"
              @change="v$.user_email.$touch"
              autocomplete="off"
                >
                <span class="text-xs text-red-500" style="color:red" v-if="v$.user_email.$error">{{
            v$.user_email.$errors[0].$message
          }}</span>
              
        </div>
        <div class="col-sm-6">
                <input type="text" class="form-control" id="inputPassword3" placeholder="Tel *" v-model="store.formDataEdit.user_phone"
               :class="{
                'border-red-500 focus:border-red-500': v$.user_phone.$error,
                'border-[#42d392] ': !v$.user_phone.$invalid,
              }"
              @change="v$.user_phone.$touch"
              autocomplete="off"
               
                >
                <span class="text-xs text-red-500" style="color:red" v-if="v$.user_phone.$error">{{
            v$.user_phone.$errors[0].$message
          }}</span>
        
        </div>
        </div>
    <button type="button" class="btn btn-primary" @click="save()">แก้ไข {{store.formDataEdit}}</button>      
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';

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

const { EditForm } = usersStore(); // use authenticateUser action from  auth store

const rules = computed(() => {
  return {
    user_name: {
      required: helpers.withMessage('The User name field is required', required),
      minLength: minLength(6),
    },
    user_password: {
      required: helpers.withMessage('The Password field is required', required),
      minLength: minLength(6),
    },
    user_firstname: {
      required: helpers.withMessage('The First Name field is required', required),
      minLength: minLength(6),
    },
    user_lastname: {
      required: helpers.withMessage('The Last Name field is required', required),
      minLength: minLength(6),
    },

    user_phone: {
      required: helpers.withMessage('The tel field is required', required),
      minLength: minLength(6),
    },
    
    user_email: {
      required: helpers.withMessage('The password confirmation field is required', required),
      email: helpers.withMessage('Invalid email format', email),
    },
  };
});


const v$ = useVuelidate(rules, FormEdit);

console.log(FormEdit);

const save = async () => {
  
    v$.value.$validate();
    if (!v$.value.$error) {
    await EditForm(); //save form  ส่งไป Store User
  }
}




</script>