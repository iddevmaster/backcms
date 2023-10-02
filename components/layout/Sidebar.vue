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
            <a class="nav-link"> CMS </a>
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
        <!-- <li class="menu active">
                        <a href="#dashboard" data-bs-toggle="collapse" aria-expanded="true" class="dropdown-toggle">
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                <span>Dashboard</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </a>
                        <ul class="collapse submenu list-unstyled show" id="dashboard" data-bs-parent="#accordionExample">
                            <li class="active">
                                <a href="./index.html"> Analytics </a>
                            </li>
                            <li>
                                <a href="./index2.html"> Sales </a>
                            </li>
                        </ul>
                    </li>

                    <li class="menu menu-heading">
                        <div class="heading"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg><span>APPLICATIONS</span></div>
                    </li> -->

        <li class="menu" >
          <a
            href="#course"
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
            class="collapse submenu list-unstyled"
            id="course"
            data-bs-parent="#accordionExample"
          >
            <li>
              <nuxt-link to="/course">{{ $t("menu_couse_all") }}</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/course/create">{{ $t("menu_couse_add") }}</nuxt-link>
            </li>
          </ul>
        </li>

        <li class="menu">
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
          </ul>
        </li>

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
            data-bs-parent="#accordionExample"
          >
            <li>
              <nuxt-link to="/news/transport">{{ $t("menu_new_tra") }}</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/news/transport/create"
                >{{ $t("menu_new_tra_add") }}</nuxt-link
              >
            </li>
          </ul>
        </li>
        <!-- <li class="menu" v-if="user_type == 1 || 2">
          <a
            href="#civil"
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
                class="feather feather-airplay"
              >
                <path
                  d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"
                ></path>
                <polygon points="12 15 17 21 7 21 12 15"></polygon>
              </svg>

              <span>{{ $t("menu_new_ci") }}</span>
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
            id="civil"
            data-bs-parent="#accordionExample"
          >
            <li>
              <nuxt-link to="/news/civil">{{ $t("menu_new_ci") }}</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/news/civil/create">{{ $t("menu_new_ci_add") }}</nuxt-link>
            </li>
          </ul>
        </li> -->

                <li class="menu">
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
            data-bs-parent="#accordionExample"
          >
            <li>
              <nuxt-link to="/dltmanage">จัดการใบขับขี่</nuxt-link>
            </li>
          
          </ul>
        </li>

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
              <nuxt-link to="/appointment/apppresent">{{ $t("menu_app_view_present") }}</nuxt-link>
            </li>
          </ul>
        </li>

        
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
            data-bs-parent="#accordionExample"
          >
            <li>
              <nuxt-link to="/result">ผลสอบทั้งหมด</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/result/create">เพิ่มผลสอบ</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/result/edit">แก้ไขผลสอบ</nuxt-link>
            </li>
          </ul>
        </li>

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
              <nuxt-link to="/users">ผู้ใช้งานทั้งหมด</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/users/create">เพิ่มผู้ใช้งาน</nuxt-link>
            </li>
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


const users = await store.getProfile();

const GotoPage = async () => {
  router.push('/');
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
</style>
  
  
