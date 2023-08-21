import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

const route = useRouter();

export default defineNuxtRouteMiddleware((store, route, redirect) => {
//const router = useRouter();
 var user_type = "admin"; // get token from cookies
 const allowedRoles = route.meta.meta.allowedRoles;



  if (!allowedRoles || !user_type) {
 return true;
  }

//   if (!allowedRoles.includes(user_type)) {
//     console.log('if2');
//   }

  if (!allowedRoles.includes(user_type)) {
    // User doesn't have the required role for this route
    alert('unauthorized');
    return redirect('/unauthorized');
  }
  })