<template>
 
     
 <div class="row mb-4">
  <div id="form_grid_layouts" class="col-lg-12">
                            <div class="seperator-header">
                                <h4 class="">Form Add News</h4>
                            </div>
                        </div>
   


<!-- 
        <div class="col-sm-12">
          <label for="exampleFormControlInput1">News Description</label>
               <textarea class="form-control" aria-label="With textarea"></textarea>
            <span class="text-xs text-red-500" style="color:red" v-if="v$.user_lastname.$error">{{
            v$.user_lastname.$errors[0].$message
          }}</span>
        </div>
         -->

         <div class="form-group mb-4">
                                            <label for="formGroupExampleInput">Example label</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="News Title *"
                                                 :class="{
                'border-red-500 focus:border-red-500': v$.user_firstname.$error,
                'border-[#42d392] ': !v$.user_firstname.$invalid,
              }"
              @change="v$.user_firstname.$touch"
              autocomplete="off"
                                            >
                                        </div>
                                        <div class="form-group mb-4">
                                            <label for="formGroupExampleInput2">Another label</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input">
                                        </div>

                                         <div class="form-group mb-4">
                                            <label for="exampleFormControlTextarea1">Example textarea</label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                        </div>
                                        <div class="form-group mb-4 mt-3">
                                            <label for="exampleFormControlFile1">Example file input</label>
                                            <input type="file" class="form-control-file" id="exampleFormControlFile1" multiple>
                                        </div>
                                        <div>

  </div>
                                        


    </div>
   
   
    <button type="button" class="btn btn-primary" @click="save()">บันทึก</button>      
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';

const router = useRouter();
const store = usersStore();


const { SaveForm } = usersStore(); // use authenticateUser action from  auth store
const { getForm } = storeToRefs(store);


const formDataregister = reactive({
    user_name: store.formDataregister.user_name,
    user_password: store.formDataregister.user_password,
    user_firstname: store.formDataregister.user_firstname,
    user_lastname: store.formDataregister.user_lastname,
    user_email: store.formDataregister.user_email,
    user_phone:store.formDataregister.user_phone,
    user_type: 3,
});

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






const v$ = useVuelidate(rules, getForm);

const save = async () => {
    v$.value.$validate();
    if (!v$.value.$error) {
    
 await SaveForm(); //save form  ส่งไป Store User
 v$.value.$reset();


  }
}

</script>