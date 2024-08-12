<template>
  <div class="sidebar-wrapper sidebar-theme">
    <nav id="sidebar">
      <div class="navbar-nav theme-brand flex-row text-center">
        <div class="nav-logo" @click="GotoPage()">
          <div class="nav-item theme-logo">
            <a >
              <img src="/img/l.png" class="navbar-logo" alt="logo" />
            </a>
          </div>
          <div class="nav-item theme-text">
            <a class="nav-link"> <span style="font-size: 17px;"> DoT Smart App</span></a>
          </div>
        </div>
        <div class="nav-item sidebar-toggle" @click="ShowColl()">
          <div class="btn-toggle sidebarCollapse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevrons-left"
            >
              <polyline points="11 17 6 12 11 7"></polyline>
              <polyline points="18 17 13 12 18 7"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <div class="profile-info">
        <div class="user-info">
          <div class="profile-img" v-if="store.detail.user_img">
            <img :src="image(store.detail.user_img)" alt="avatar" />
          </div>

          <div class="profile-img" v-else>
            <img src="../../assets/images/team__1.png" alt="avatar" />
          </div>
          <div class="profile-content">
            <h6 class="" v-if="store.users">{{ store.users.user_name }}</h6>
            <p class="">{{ store.users.user_email }}</p>
          </div>
        </div>
      </div>

      <div class="shadow-bottom"></div>
      <ul class="list-unstyled menu-categories" id="accordionExample">
      

  
                  
         <li class="menu">
          
          <a
        
            class="dropdown-toggle" @click="GotoPage"
          >
            <div class="">
              <i class="bi bi-bar-chart menu-icon"></i>
              <span>Dashboard</span>
            </div>
         
          </a>
          
          <!-- <ul
            class="collapse submenu list-unstyled"
            id="log"
            data-bs-parent="#accordionExample"
          >
            <li>
              <nuxt-link to="/">{{ $t("menu_log") }}</nuxt-link>
            </li>
          </ul> -->
        </li>

                    <li class="menu menu-heading">
                        <div class="heading"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg><span>{{ $t("appication") }}</span></div>
                    </li>

        <li class="menu" >
          <a
            href="#learning"
            data-bs-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-layers"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              <span>{{ $t("menu_couse") }}</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </a>
          <ul
            class="collapse submenu list-unstyled" :class="{ show:isActiveMenu('/learning') }"
            id="learning"
            data-bs-parent="#accordionExample"
          >
            <li :class="{ active: isActive('/learning') }">
              <nuxt-link to="/learning">{{ $t("menu_couse_all") }}</nuxt-link>
            </li>
            <li :class="{ active: isActive('/learning/reportlearn') }">
              <nuxt-link to="/learning/reportlearn">{{ $t("menu_report_lesson") }}</nuxt-link>
            </li>
            <li :class="{ active: isActive('/learning/reportexam') }">
              <nuxt-link to="/learning/reportexam">{{ $t("menu_report_exam") }}</nuxt-link>
            </li>
         
          </ul>
        </li>


        <li class="menu">
          <a
            href="#group"
            data-bs-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-zap"
              >
                <polygon
                  points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
                ></polygon>
              </svg>

              <span>{{ $t("menu_group") }} </span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </a>

         
          <ul
            class="collapse submenu list-unstyled"
            id="group"
            data-bs-parent="#accordionExample"  :class="{ show:isActiveMenu2('/group') }"
          >
            <li :class="{ active: isActive('/group') }">
              <nuxt-link to="/group">{{ $t("menu_group_alla") }} </nuxt-link>
            </li>
          
            <li  :class="{ active: isActive('/lesson') }">
              <nuxt-link to="/lesson">{{ $t("menu_group_lesson") }} </nuxt-link>
            </li>

            <li :class="{ active: isActive('/exam') }">
              <nuxt-link to="/exam">{{ $t("menu_group_lesson_anws") }} </nuxt-link>
            </li>
           
          </ul>
        </li>

        <!-- <li class="menu">
          <a
            href="#exam"
            data-bs-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-layers"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              <span>{{ $t("menu_exam") }}</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </a>
          <ul
            class="collapse submenu list-unstyled"
            id="exam"
            data-bs-parent="#accordionExample"
          >
            <li>
              <nuxt-link to="/exam"> {{ $t("menu_exam_all") }}</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/examhistory"> {{ $t("menu_exam_all_history") }}</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/examhistory/user">{{ $t("menu_exam_history_byuser_menu") }}</nuxt-link>
            </li>
          </ul>
        </li> -->

        <li class="menu" v-if="user_type == 1 || 2">
          <a
            href="#transport"
            data-bs-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-box"
              >
                <path
                  d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                ></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>

              <span>{{ $t("menu_new_tra") }}</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </a>
          <ul
            class="collapse submenu list-unstyled"
            id="transport"
            data-bs-parent="#accordionExample"   :class="{ show:isActiveMenuNew('/new') }"
          >
            <li :class="{ active: isActive('/news/transport') }">
              <nuxt-link to="/news/transport">{{ $t("menu_page_new_tra_all") }}</nuxt-link>
            </li>
            <li :class="{ active: isActive('/news/transport/create') }">
              <nuxt-link to="/news/transport/create"
                >{{ $t("menu_new_tra_add") }}</nuxt-link
              >
            </li>
          </ul>
        </li>
  

                <!-- <li class="menu">
          <a
            href="#menu_dlt"
            data-bs-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div class="">
              <i class="bi bi-person-vcard menu-icon"></i>
              <span>{{ $t("menu_dlt") }}</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </a>
          <ul
            class="collapse submenu list-unstyled"
            id="menu_dlt"
            data-bs-parent="#accordionExample"   :class="{ show:isActiveMenuNewDLT('/dltmanage') }"
          >
            <li :class="{ active: isActive('/dltmanage') }">
              <nuxt-link to="/dltmanage">{{ $t("menu_user_dlt") }}</nuxt-link>
            </li>
          
          </ul>
        </li> -->
<!-- 
           <li class="menu">
          <a
            href="#appointment"
            data-bs-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div class="">
              <i class="bi bi-calendar-plus menu-icon"></i>
              <span>{{ $t("menu_new_app") }}</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </a>
          <ul
            class="collapse submenu list-unstyled"
            id="appointment"
            data-bs-parent="#accordionExample"
          >
            <li>
              <nuxt-link to="/appointment">{{ $t("menu_app_manage_all") }}</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/appointment/create">{{ $t("menu_app_app_create") }}</nuxt-link>
            </li>
         
             <li>
              <nuxt-link to="/appointment/user">{{ $t("menu_app_view_by_user") }}</nuxt-link>
            </li>
          </ul>
        </li> -->

        
        <li class="menu">
          <a
            href="#result"
            data-bs-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div class="">
              <i class="bi bi-pencil-square menu-icon"></i>
              <span>{{ $t("menu_new_resul") }}</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </a>
          
          <ul
            class="collapse submenu list-unstyled"
            id="result"
            data-bs-parent="#accordionExample"  :class="{ show:isActiveMenuResult('/result') }"
          >
            <li :class="{ active: isActive('/result') }">
              <nuxt-link to="/result" >{{ $t("resultall") }}</nuxt-link>
            </li>
            <li :class="{ active: isActive('/result/create') }">
              <nuxt-link to="/result/create" >{{ $t("resultadd") }}</nuxt-link>
            </li>
            <li  :class="{ active: isActive('/result/edit') }">
              <nuxt-link to="/result/edit">{{ $t("resultedit") }}</nuxt-link>
            </li>
          </ul>
        </li>

        <!-- <li class="menu">
          <a
            href="#approve"
            data-bs-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div class="">
              <i class="bi bi-check-all menu-icon"></i>
              <span>{{ $t("menu_approve") }}</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </a>
          
          <ul
            class="collapse submenu list-unstyled"
            id="approve"
            data-bs-parent="#accordionExample"
          >
            <li>
              <nuxt-link to="/users/approve">{{ $t("page_menu_approve") }}</nuxt-link>
            </li>
          </ul>
        </li> -->

        <li class="menu">
          <a
            href="#users"
            data-bs-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div class="">
              <i class="bi bi-person-gear menu-icon"></i>
              <span>{{ $t("menu_new_user") }}</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </a>
          
          <ul
            class="collapse submenu list-unstyled"
            id="users"
            data-bs-parent="#accordionExample"
          >
            <li>
              <nuxt-link to="/users">{{ $t("menu_user_page_all") }}</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/users/create">{{ $t("menu_user_page_create") }}</nuxt-link>
            </li>
            <!-- <li>
              <nuxt-link to="/users/approve">{{ $t("page_menu_approve") }}</nuxt-link>
            </li> -->
          
          </ul>
        </li>
   

          <li class="menu menu-heading">
                        <div class="heading"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg><span>{{ $t("report") }}</span></div>
         </li>

         <li class="menu">
          <a
            href="#report"
            data-bs-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div class="">
              <i class="bi bi-calendar2-fill menu-icon"></i>
              <span>{{ $t("report") }}</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </a>
          
          <ul
            class="collapse submenu list-unstyled"
            id="report"
            data-bs-parent="#accordionExample"
          >
            <li>
              <nuxt-link to="/report/register">{{ $t("report_register") }}</nuxt-link>
            </li>
            <!-- <li>
              <nuxt-link to="/report/appointment">{{ $t("report_app") }}</nuxt-link>
            </li> -->
            <!-- <li>
              <nuxt-link to="/report/exam">{{ $t("report_exam") }}</nuxt-link>
            </li> -->
            <!-- <li>
              <nuxt-link to="/report/result">{{ $t("report_result") }}</nuxt-link>
            </li> -->
          </ul>
        </li>

      </ul>

      
    </nav>
  </div>
</template>

  

<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth';
import ApiService  from "../../services/api.service";


const data = localStorage.getItem('user');
 const user_type = useCookie('user_type').value;


let user = JSON.parse(data);
const router = useRouter();
const store = useAuthStore();
const route = useRoute()


const users = await store.getProfile();

// if(users === false){
//   await store.logUserOut()
// }

const GotoPage = async () => {
  router.push('/');
}

const currentPath = computed(() => router.path)

const isActive = (path) => {
 return router.currentRoute.value.path === path
}
const isActiveMenu = () => {
  if((router.currentRoute.value.path == '/learning') || (router.currentRoute.value.path == '/learning/reportlearn') || (router.currentRoute.value.path == '/learning/reportexam')){ 
    return true;
  }else {
  return false;
  }
}
const isActiveMenu2 = () => {
  if((router.currentRoute.value.path == '/group') || (router.currentRoute.value.path == '/lesson') || (router.currentRoute.value.path == '/exam')){ 
    return true;
  }
}

const isActiveMenuNew = () => {
  if((router.currentRoute.value.path == '/news/transport') || (router.currentRoute.value.path == '/news/transport/create')){ 
    return true;
  }
}

const isActiveMenuNewDLT = () => {
  if((router.currentRoute.value.path == '/dltmanage')){ 
    return true;
  }
}

const isActiveMenuResult = () => {
  if((router.currentRoute.value.path == '/result') || (router.currentRoute.value.path == '/result/create') || (router.currentRoute.value.path == '/result/edit')){ 
    return true;
  }
}




const ShowColl = async () => {
  store.isActiveSide = !store.isActiveSide
  store.isActiveBar = false;
}
function image(i) {
  let im =  ApiService.image(i);
  return im;
}

</script>

<style>
  .menu-icon {
    font-size: 20px;
    margin-right: 5px;
  }
  #sidebar ul.menu-categories li.menu > .dropdown-toggle[aria-expanded=true] .menu-icon {
    color: white;
  }



 li.active a {
  color: red; /* เปลี่ยนสีข้อความเมื่อเมนูอยู่ในสถานะ active */
}
</style>
  
  
