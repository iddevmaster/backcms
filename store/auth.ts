import { defineStore } from 'pinia';
import { useEnvStore } from '@/store/env'
import ApiService from '../services/api.service';

interface UserPayloadInterface {
  username: string;
  password: string;
}



export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    isActiveBar: false,
    isActiveSide: false,
    loading: false,
    status_login: true,
    count:11,
    user_id:null,
    users: {
      user_id: null,
      user_name: null,
      user_firstname: null,
      user_lastname: null,
      user_email: null,
      user_phone: null,
      user_type: null,
    },
    detail: {
      user_img: null,
    }
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
          const token = useCookie('tokens'); // useCookie new hook in nuxt 3
          const user_id = useCookie('Userid'); // useCookie new hook in nuxt 3
          const firstname = useCookie('firstname'); // useCookie new hook in nuxt 3
          const lastname = useCookie('firstname'); // useCookie new hook in nuxt 3
          const user_type = useCookie('user_type'); // useCookie new hook in nuxt 3
          token.value = "ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p"; // set token to cookie
          user_id.value = data.value.user_id; // set token to cookie
          user_type.value = data.value.user_type; // set token to cookie
        
          // token.value = data?.value?.token; // set token to cookie
          this.authenticated = true; // set authenticated  state value to true
          this.user_id = data.value.user_id; // set authenticated  state value to true
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
      const token = useCookie('tokens'); // useCookie new hook in nuxt 3
      const user_id = useCookie('Userid');
      const user_type = useCookie('user_type'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      user_id.value = null;
      user_type.value = null;
      this.loading = false;
      localStorage.clear();
      return navigateTo('/auth/login');
    },



    async getProfile(){
      const token = useCookie('tokens'); // useCookie new hook in nuxt 3

      try {
        const data = await ApiService.get('/user/get/'+this.user_id).then(response => {
   this.users.user_id  = response.data.user_id
   this.users.user_name = response.data.user_name
   this.users.user_firstname = response.data.user_firstname
   this.users.user_lastname = response.data.user_lastname
   this.users.user_email = response.data.user_email
   this.users.user_phone = response.data.user_phone
   this.users.user_type = response.data.user_type
   this.detail.user_img = response.data.detail.user_img


        });

        return true;
      } catch (error) {
        return false;
      }

      
    }
  },
});

// {"__v_isShallow":false,"__v_isRef":true,"_rawValue":null,"_value":null}