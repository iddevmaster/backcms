import { defineStore } from 'pinia';
import { useEnvStore } from '@/store/env'

interface UserPayloadInterface {
  username: string;
  password: string;
}



export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    status_login: true,
    count:11
  }),
  getters: {
    load(state) {
      return state.loading;
    },
    Loginfail(state) {
      return state.status_login;
    },
  },
  
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {

      try {
        const { data } = await useFetch('/user/login', {
          method: 'post',
          baseURL:useEnvStore().apidev,
          headers: new Headers({
            'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
            'Content-Type': 'application/json'
        }), 
          body: {
            "user_name": username,
            "user_password": password
        },
        });

        if (data.value) {
        
          const token = useCookie('token'); // useCookie new hook in nuxt 3
          const user_id = useCookie('user_id'); // useCookie new hook in nuxt 3
          const firstname = useCookie('firstname'); // useCookie new hook in nuxt 3
          const lastname = useCookie('firstname'); // useCookie new hook in nuxt 3
          const user_type = useCookie('user_type'); // useCookie new hook in nuxt 3
          token.value = "ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p"; // set token to cookie
          user_id.value = data.value.user_id; // set token to cookie
          user_type.value = data.value.user_type; // set token to cookie
        
    
          // token.value = data?.value?.token; // set token to cookie
          this.authenticated = true; // set authenticated  state value to true
          this.status_login = true;
        }else{
          this.status_login = false;
        }


      } catch (error) {
       this.status_login = false;
      } finally {
     
      }

    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      const user_id = useCookie('user_id');
      const user_type = useCookie('user_type'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      user_id.value = null;
      user_type.value = null;
      this.loading = false;
      localStorage.clear();
      return navigateTo('/auth/login');
    },
  },
});

// {"__v_isShallow":false,"__v_isRef":true,"_rawValue":null,"_value":null}