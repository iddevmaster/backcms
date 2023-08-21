import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

const route = useRouter();

export default defineNuxtRouteMiddleware((store, route) => {
const router = useRouter();
 var user_type = "IT"; // get token from cookies
const xx = route.meta;
console.log(xx)



//   if (!allowedRoles || !user_type) {
//  return true;
//   }

//   if (!allowedRoles.includes(user_type)) {
//     console.log('if2');
//   }

//   if (!allowedRoles.includes(user_type)) {
//     // User doesn't have the required role for this route
// console.log('sssssssssssss');
//     return navigateTo('/unauthorized');
//   }
  })