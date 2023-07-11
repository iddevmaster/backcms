<template>
 
     
 <div class="row mb-4">
  
        <div class="col-sm-6">
            <input type="text" class="form-control" id="inputEmail3" placeholder="First Name *"
        
            >
          
        </div>



        <div class="col-sm-6">
            <input type="text" class="form-control" id="inputEmail3" placeholder="Last Name *" 
        
            >
         
        </div>


    </div>
    <div class="row mb-4">
      
        <div class="col-sm-6">
            <input type="text" class="form-control" id="inputPassword3" placeholder="Username *" 
       
            >
        
        </div>

        <div class="col-sm-6">
            <input type="text" class="form-control" id="inputPassword3" placeholder="Password *" 
         
            >
 
        </div>
    </div>
    <div class="row mb-4">
        <div class="col-sm-6">
                <input type="text" class="form-control" id="inputPassword3" placeholder="Email *" >
              
        </div>
        <div class="col-sm-6">
                <input type="text" class="form-control" id="inputPassword3" placeholder="Tel *"
                >
        
        </div>
        </div>
    <button type="button" class="btn btn-primary">แก้ไข้</button>      
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';

const router = useRouter();
const store = usersStore();




store.fetchUsersId(router.currentRoute.value.params.id)

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




</script>