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
    count:11
  }),
  getters: {
    load(state) {
      return state.loading;
    },
  },
  
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { error, data, statusCode }: any = await useFetch('/user/login', {
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
      console.log(data);
      if (data.value) {
    
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = "ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p"; // set token to cookie
        // token.value = data?.value?.token; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      }
      if (!data.value) {
        this.loading = true;
      }

    //   const res = await useFetch('https://dummyjson.com/auth/login', {
    //     method: 'POST',
    //     body: {
    //       username,
    //       password,
    //     },
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });
    // const output = await JSON.stringify(res);

    // console.log('output',output);
    

     // if (data.value) {
      //   const token = useCookie('token'); // useCookie new hook in nuxt 3
      //   token.value = data?.value?.token; // set token to cookie
      //   this.authenticated = true; // set authenticated  state value to true
      // }
      // if (!data.value) {
      //   this.loading = true;
      // }



 
 

    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      this.loading = false;
      return navigateTo('/auth/login');
    },
  },
});

// {"__v_isShallow":false,"__v_isRef":true,"_rawValue":null,"_value":null}