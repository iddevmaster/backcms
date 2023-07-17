

<template>
<div>
<div class="auth-container d-flex">

<div class="container mx-auto align-self-center">

    <div class="row">
        <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
          <div class="alert alert-light-danger alert-dismissible fade show border-0 mb-4" role="alert" v-if="Loginfail == false"> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"> 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close" data-bs-dismiss="alert"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>  Invalid Credentials Error With Correct Username/Password
         </div>
            <div class="card mt-3 mb-3">
                <div class="card-body">

                    <div class="row">
                        <div class="col-md-12 mb-3">
                            
                            <h2>Sign In</h2>
                            <p>Enter your Usersname and password to login</p>
                            
                        </div>
                        <div class="col-md-12">
                            <div class="mb-3">
                                <label class="form-label">Usersname</label>
                                <input type="text" class="form-control" v-model="formData.username"
                                :class="{
                'border-red-500 focus:border-red-500': v$.username.$error,
                'border-[#42d392] ': !v$.username.$invalid,
              }"
              @change="v$.username.$touch"
              autocomplete="off"
                                >

                                <span class="text-xs text-red-500" style="color:red" v-if="v$.username.$error">{{
            v$.username.$errors[0].$message
          }}</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-4">
                                <label class="form-label">Password</label> 
                                <input type="password" class="form-control"    v-model="formData.password"
                                :class="{
                'border-red-500 focus:border-red-500': v$.password.$error,
                'border-[#42d392] ': !v$.password.$invalid,
              }"
              @change="v$.password.$touch"
              autocomplete="off"
                                >

                                <span class="text-xs text-red-500" style="color:red" v-if="v$.password.$error">{{
            v$.password.$errors[0].$message
          }}</span>
                            </div>
                        </div>
         
                        
                        <div class="col-12">
                            <div class="mb-4">
                                <button class="btn btn-secondary w-100" @click="login()">SIGN IN</button>
                            </div>
                        </div>
                        
                      
                    
                        
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
    
</div>
</div>
</div>

</template>





<script setup>


import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useVuelidate } from '@vuelidate/core'
import { reactive } from 'vue'
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';


definePageMeta({
  layout: "blank",
  middleware: 'guest' 
});


const formData = reactive({
  username: 'rkknoob1',
  password: '123456',
});




  const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage('The Usersname field is required', required),
    //   email: helpers.withMessage('Invalid email format', email),
      minLength: minLength(6),
    },
    password: {
      required: helpers.withMessage('The password field is required', required),
      minLength: minLength(6),
    },
  };
});
const router = useRouter();
  const v$ = useVuelidate(rules, formData)
  const { authenticateUser } = useAuthStore();
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
  const { Loginfail } = storeToRefs(useAuthStore()); //Get Getter

  
const login = async () => {

v$.value.$validate();

if (!v$.value.$error) {
 await authenticateUser(formData); // call authenticateUser and pass the user object
//   redirect to homepage if user is authenticated
   if (authenticated) {
    router.push('/');
  }

  }





};



</script>








