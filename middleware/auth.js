import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';


export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie('token'); // get token from cookies
  const user_id = useCookie('user_id'); // get token from cookies
  const User = useAuthStore();
  User.user_id = user_id.value;

  if (token.value) {
    
    // check if value exists
    authenticated.value = true; // update the state to authenticated
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === 'login') {

    return navigateTo('/');
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'login') {

    abortNavigation();
    return navigateTo('/auth/login');
  }
});