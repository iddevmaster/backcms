


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { AppointStore } from "@/store/appoint";
import AppointList from "@/components/appointment/AppointList.vue";
import AppointListByGroup from "@/components/appointment/AppointListByGroup.vue";
import ApiService from "../../../services/api.service";

import { useModalStore } from "@/store/modal";
import { useToast } from "vue-toastification";
definePageMeta({
  middleware: ["auth", "roles"],
  allowedRoles: [1, 2],
});
const toast = useToast();
const store = AppointStore();

const auth = useAuthStore();
const router = useRouter();
store.user_id = auth.user_id;

await store.fetchAppPresentTodayReset();
await store.fetchAppPresentToday();
await store.fetchAppCourse();
store.group = [];
const closeModal = () => {
  store.closeModal();
};

const deletel = async () => {
  let del = await store.deleteApp();
  if (del == true) {
    toast.success("ລຶບຂໍ້ມູນສຳເລັດ");
    store.fetchAppointment();
  } else {
    toast.error("ລຶບຂໍ້ມູນລົ້ມເຫລວ");
  }
};

const CreateAppo = async () => {
  await router.push("/appointment/user/create");
};

const GotoDetails = async (item) => {
  store.searchapp.ap_number = item.ap_number;

  localStorage.setItem("ap_number", item.ap_number);
  await router.push("/appointment/details");
};

const CheckTotalque = (item) => {



let total = store.course.find(obj => obj.course_code == item.dlt_code);

if(total){
  return total.total_quest
}else {
  return '-';
}
 
};


function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}
</script>

<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">{{ $t("menu_app_manage") }}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ $t("menu_app_manage_all") }}
            </li>
          </ol>
        </nav>
      </div>

      <div class="middle-content container-xxl p-0">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <button @click="CreateAppo()" class="changeImg btn btn btn-primary">
              ເພິ່ມນັດໝາຍ
            </button>
          </div>
          <div
            class="col-xl-12 col-lg-12 col-sm-12 layout-spacing"
            v-if="store.group"
          >
            <!-- <AppointListByGroup></AppointListByGroup> -->
          </div>
        </div>
        <div id="toggleAccordion" class="no-icons accordion">
          <!-- A 1-->

          <div class="card mb-1" v-if="store.dlt_today.A_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionA1"
                  aria-expanded="false"
                  aria-controls="defaultAccordionA1"
                >
                  ຊ່ອງເວລາ 08.00 - A : Two-wheels motocycle engine not exceed
                  125 cc
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionA1"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="(item1, index) in store.dlt_today.A_1"
                    :key="item1"
                  >
                    <div class="row" @click="GotoDetails(item1)">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img v-if="item1.user_img"
                            :src="coverimage(item1.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img v-else
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: {{ item1.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item1.user_prefrix }}
                              {{ item1.user_firstname }}
                              {{ item1.user_lastname }}
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item1.thero"
                                >
                                  ຜົນທິດສະດີ: {{ item1.thero }}
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນທິດສະດີ: -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item1.pratic"
                                >
                                  ຜົນປະຕິບັດ: <span style="color: green">{{ item1.pratic }} /100</span>
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນປະຕິບັດ: -
                                </h4>
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
          </div>

          <!-- A 2-->
          <div class="card mb-1" v-if="store.dlt_today.A_2.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionA2"
                  aria-expanded="false"
                  aria-controls="defaultAccordionA2"
                >
                  ຊ່ອງເວລາ 16.00 - A : Two-wheels motocycle engine not exceed
                  125 cc
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionA2"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="(item, index) in store.dlt_today.A_2"
                    :key="item"
                  >
                    <div class="row" @click="GotoDetails(item)">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img v-if="item.user_img"
                            :src="coverimage(item.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img v-else
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                  ຜົນທິດສະດີ: {{ item.thero }} /  {{CheckTotalque(item)}}
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນທິດສະດີ: -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                  ຜົນປະຕິບັດ: {{ item.pratic }} /100
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນປະຕິບັດ: -
                                </h4>
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
          </div>

          <!-- A1 1 -->
          <div class="card mb-1" v-if="store.dlt_today.A1_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionA11"
                  aria-expanded="false"
                  aria-controls="defaultAccordionA11"
                >
                  ຊ່ອງເວລາ 08.00 - A1 : Two-wheels motorcycle engine 125 cc and
                  above
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionA11"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="(item, index) in store.dlt_today.A1_1"
                    :key="item"
                  >
              
                    <div class="row" @click="GotoDetails(item)">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img v-if="item.user_img"
                            :src="coverimage(item.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img v-else
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                      
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                  ຜົນທິດສະດີ: 
                                  <span style="color: red;" v-if="item.mr_status_t == 'fail'">  {{ item.thero }}/{{CheckTotalque(item)}}</span>
                                  <span style="color: green;"  v-if="item.mr_status_t == 'pass'">  {{ item.thero }}/{{CheckTotalque(item)}}</span>
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນທິດສະດີ: -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                  ຜົນປະຕິບັດ:
                            
                                <span style="color: red;" v-if="item.mr_status_p == 'fail'">  {{ item.pratic }}</span>
                                <span style="color: green;"  v-if="item.mr_status_p == 'pass'">  {{ item.pratic }}</span>
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນປະຕິບັດ: -
                                </h4>
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
          </div>

          <!-- A1 2-->
          <div class="card mb-1" v-if="store.dlt_today.A1_2.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionA12"
                  aria-expanded="false"
                  aria-controls="defaultAccordionA12"
                >
                  ຊ່ອງເວລາ 16.00 - A1 : Two-wheels motorcycle engine 125 cc and
                  above
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionA12"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="(item, index) in store.dlt_today.A1_2"
                    :key="item"
                  >
                    <div class="row" @click="GotoDetails(item)">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img v-if="item.user_img"
                            :src="coverimage(item.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img v-else
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                  ຜົນທິດສະດີ: 
                                  <span style="color: red;" v-if="item.mr_status_t == 'fail'">  {{ item.thero }}/{{CheckTotalque(item)}}</span>
                                  <span style="color: green;"  v-if="item.mr_status_t == 'pass'">  {{ item.thero }}/{{CheckTotalque(item)}}</span>
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນທິດສະດີ: -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                  ຜົນປະຕິບັດ:
                            
                                <span style="color: red;" v-if="item.mr_status_p == 'fail'">  {{ item.pratic }}</span>
                                <span style="color: green;"  v-if="item.mr_status_p == 'pass'">  {{ item.pratic }}</span>
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນປະຕິບັດ: -
                                </h4>
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
          </div>

          <!-- A2 1-->
          <div class="card mb-1" v-if="store.dlt_today.A2_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionA21"
                  aria-expanded="false"
                  aria-controls="defaultAccordionA21"
                >
                  ຊ່ອງເວລາ 08.00 - A2 : Private three-wheels vehicle, Passenger
                  vehicle with two-wheels and three-wheels
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionA21"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="(item, index) in store.dlt_today.A2_1"
                    :key="item"
                  >
                    <div class="row" @click="GotoDetails(item)">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img v-if="item.user_img"
                            :src="coverimage(item.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img v-else
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                  ຜົນທິດສະດີ: 
                                  <span style="color: red;" v-if="item.mr_status_t == 'fail'">  {{ item.thero }}/{{CheckTotalque(item)}}</span>
                                  <span style="color: green;"  v-if="item.mr_status_t == 'pass'">  {{ item.thero }}/{{CheckTotalque(item)}}</span>
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນທິດສະດີ: -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                  ຜົນປະຕິບັດ:
                            
                                <span style="color: red;" v-if="item.mr_status_p == 'fail'">  {{ item.pratic }}</span>
                                <span style="color: green;"  v-if="item.mr_status_p == 'pass'">  {{ item.pratic }}</span>
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນປະຕິບັດ: -
                                </h4>
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
          </div>

          <!-- A2 2-->
          <div class="card mb-1" v-if="store.dlt_today.A2_2.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionA22"
                  aria-expanded="false"
                  aria-controls="defaultAccordionA22"
                >
                  ຊ່ອງເວລາ 16.00 - A2 : Private three-wheels vehicle, Passenger
                  vehicle with two-wheels and three-wheels
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionA22"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="(item, index) in store.dlt_today.A2_2"
                    :key="item"
                  >
                    <div class="row" @click="GotoDetails(item)">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                  ຜົນທິດສະດີ: 
                                  <span style="color: red;" v-if="item.mr_status_t == 'fail'">  {{ item.thero }}/{{CheckTotalque(item)}}</span>
                                  <span style="color: green;"  v-if="item.mr_status_t == 'pass'">  {{ item.thero }}/{{CheckTotalque(item)}}</span>
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນທິດສະດີ: -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                  ຜົນປະຕິບັດ:
                            
                                <span style="color: red;" v-if="item.mr_status_p == 'fail'">  {{ item.pratic }}</span>
                                <span style="color: green;"  v-if="item.mr_status_p == 'pass'">  {{ item.pratic }}</span>
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນປະຕິບັດ: -
                                </h4>
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
          </div>

          <!-- A3 1-->
          <div class="card mb-1" v-if="store.dlt_today.A3_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionA31"
                  aria-expanded="false"
                  aria-controls="defaultAccordionA31"
                >
                  ຊ່ອງເວລາ 08.00 - A3 : Two-wheels tractor with trailer and
                  Walk-behide Tractor
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionA31"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="(item, index) in store.dlt_today.A3_1"
                    :key="item"
                  >
                    <div class="row" @click="GotoDetails(item)">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img v-if="item.user_img"
                            :src="coverimage(item.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img v-else
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>
                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                  ຜົນທິດສະດີ: 
                                  <span style="color: red;" v-if="item.mr_status_t == 'fail'">  {{ item.thero }}/{{CheckTotalque(item)}}</span>
                                  <span style="color: green;"  v-if="item.mr_status_t == 'pass'">  {{ item.thero }}/{{CheckTotalque(item)}}</span>
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນທິດສະດີ: -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                  ຜົນປະຕິບັດ:
                            
                                <span style="color: red;" v-if="item.mr_status_p == 'fail'">  {{ item.pratic }}</span>
                                <span style="color: green;"  v-if="item.mr_status_p == 'pass'">  {{ item.pratic }}</span>
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນປະຕິບັດ: -
                                </h4>
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
          </div>

          <!-- A3 2-->
          <div class="card mb-1" v-if="store.dlt_today.A3_2.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionA32"
                  aria-expanded="false"
                  aria-controls="defaultAccordionA32"
                >
                  ຊ່ອງເວລາ 16.00 - A3 : Two-wheels tractor with trailer and
                  Walk-behide Tractor
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionA32"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="(item, index) in store.dlt_today.A3_2"
                    :key="item"
                  >
                    <div class="row" @click="GotoDetails(item)">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img v-if="item.user_img"
                            :src="coverimage(item.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                  ຜົນທິດສະດີ: 
                                  <span style="color: red;" v-if="item.mr_status_t == 'fail'">  {{ item.thero }}/{{CheckTotalque(item)}}</span>
                                  <span style="color: green;"  v-if="item.mr_status_t == 'pass'">  {{ item.thero }}/{{CheckTotalque(item)}}</span>
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນທິດສະດີ: -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                  ຜົນປະຕິບັດ:
                            
                                <span style="color: red;" v-if="item.mr_status_p == 'fail'">  {{ item.pratic }}</span>
                                <span style="color: green;"  v-if="item.mr_status_p == 'pass'">  {{ item.pratic }}</span>
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນປະຕິບັດ: -
                                </h4>
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
          </div>

          <!-- B 1-->
          <div class="card mb-1" v-if="store.dlt_today.B_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionB1"
                  aria-expanded="false"
                  aria-controls="defaultAccordionB1"
                >
                  ຊ່ອງເວລາ 08.00 - B : Car with four-wheels, total weight not
                  exceed 3500kg, not more than 9 seats including driver
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionB1"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="(item, index) in store.dlt_today.B_1"
                    :key="item"
                  >
                    <div class="row" @click="GotoDetails(item)">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img v-if="item.user_img"
                            :src="coverimage(item.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>
                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                  ຜົນທິດສະດີ: {{ item.thero }}
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນທິດສະດີ: -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                  ຜົນປະຕິບັດ: {{ item.pratic }} /100
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນປະຕິບັດ: -
                                </h4>
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
          </div>

          <!-- B 2-->
          <div class="card mb-1" v-if="store.dlt_today.B_2.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionB2"
                  aria-expanded="false"
                  aria-controls="defaultAccordionB2"
                >
                  ຊ່ອງເວລາ 16.00 - B : Car with four-wheels, total weight not
                  exceed 3500kg, not more than 9 seats including driver
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionB2"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="(item, index) in store.dlt_today.B_2"
                    :key="item"
                  >
                    <div class="row" @click="GotoDetails(item)">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                  ຜົນທິດສະດີ: {{ item.thero }}
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນທິດສະດີ: -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                  ຜົນປະຕິບັດ: {{ item.pratic }} /100
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  ຜົນປະຕິບັດ: -
                                </h4>
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
          </div>

          <!-- C 1-->
          <div class="card mb-1" v-if="store.dlt_today.C_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionC1"
                  aria-expanded="false"
                  aria-controls="defaultAccordionC1"
                >
                  ຊ່ອງເວລາ 08.00 - C : Cargo truck, total weight from 3,500 to
                  7,500 kilograms
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionC1"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- C 2-->
          <div class="card mb-1" v-if="store.dlt_today.C_2.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionC2"
                  aria-expanded="false"
                  aria-controls="defaultAccordionC2"
                >
                  ຊ່ອງເວລາ 16.00 - C : Cargo truck, total weight from 3,500 to
                  7,500 kilograms
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionC2"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- C11 -->
          <div class="card mb-1" v-if="store.dlt_today.C1_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionC11"
                  aria-expanded="false"
                  aria-controls="defaultAccordionC11"
                >
                  ຊ່ອງເວລາ 08.00 - C1 : Cargo truck, total weight exceed 7,500
                  kilogram up to 15,000 kilograms
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionC11"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- C1 2-->
          <div class="card mb-1" v-if="store.dlt_today.C1_2.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionC12"
                  aria-expanded="false"
                  aria-controls="defaultAccordionC12"
                >
                  ຊ່ອງເວລາ 16.00 - C1 : Cargo truck, total weight exceed 7,500
                  kilogram up to 15,000 kilograms
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionC12"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- C2 1-->
          <div class="card mb-1" v-if="store.dlt_today.C2_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionC21"
                  aria-expanded="false"
                  aria-controls="defaultAccordionC21"
                >
                  ຊ່ອງເວລາ 08.00 - C2 : Cargo truck, total weight exceed 15,000
                  kilograms
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionC21"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- C2 2-->
          <div class="card mb-1" v-if="store.dlt_today.C2_2.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionC22"
                  aria-expanded="false"
                  aria-controls="defaultAccordionC22"
                >
                  ຊ່ອງເວລາ 16.00 - C2 : Cargo truck, total weight exceed 15,000
                  kilograms
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionC22"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- D 1-->
          <div class="card mb-1" v-if="store.dlt_today.D_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionD1"
                  aria-expanded="false"
                  aria-controls="defaultAccordionD1"
                >
                  ຊ່ອງເວລາ 08.00 - D : Passenger vehicle with 4 wheels or more,
                  not more than 15 seats
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionD1"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- D 2-->
          <div class="card mb-1" v-if="store.dlt_today.D_2.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionD2"
                  aria-expanded="false"
                  aria-controls="defaultAccordionD2"
                >
                  ຊ່ອງເວລາ 16.00 - D : Passenger vehicle with 4 wheels or more,
                  not more than 15 seats
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionD2"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- D1 1-->
          <div class="card mb-1" v-if="store.dlt_today.D1_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionD11"
                  aria-expanded="false"
                  aria-controls="defaultAccordionD11"
                >
                  ຊ່ອງເວລາ 08.00 - D1 : Passenger vehicle from 16 seats to 35
                  seats
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionD11"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!--D1 2-->
          <div class="card mb-1" v-if="store.dlt_today.D1_2.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionD12"
                  aria-expanded="false"
                  aria-controls="defaultAccordionD12"
                >
                  ຊ່ອງເວລາ 16.00 - D1 : Passenger vehicle from 16 seats to 35
                  seats
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionD12"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- D2 1-->
          <div class="card mb-1" v-if="store.dlt_today.D2_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionD21"
                  aria-expanded="false"
                  aria-controls="defaultAccordionD21"
                >
                  ຊ່ອງເວລາ 08.00 - D2 : Passenger vehicle from 36 seats or more
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionD21"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- D2 2-->
          <div class="card mb-1" v-if="store.dlt_today.D2_2.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionD22"
                  aria-expanded="false"
                  aria-controls="defaultAccordionD22"
                >
                  ຊ່ອງເວລາ 16.00 - D2 : Passenger vehicle from 36 seats or more
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionD22"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- E 1-->
          <div class="card mb-1" v-if="store.dlt_today.E_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionE1"
                  aria-expanded="false"
                  aria-controls="defaultAccordionE1"
                >
                  ຊ່ອງເວລາ 08.00 - E : Car (B), Cargo truck (C) and Passenger
                  vehicle (D), having trailer total weight not exceed 750
                  kilograms
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionE1"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- E 2-->
          <div class="card mb-1" v-if="store.dlt_today.E_2.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionE2"
                  aria-expanded="false"
                  aria-controls="defaultAccordionE2"
                >
                  ຊ່ອງເວລາ 16.00 - E : Car (B), Cargo truck (C) and Passenger
                  vehicle (D), having trailer total weight not exceed 750
                  kilograms
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionE2"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- E1 1-->
          <div class="card mb-1" v-if="store.dlt_today.E1_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionE11"
                  aria-expanded="false"
                  aria-controls="defaultAccordionE11"
                >
                  ຊ່ອງເວລາ 08.00 - E1 : Cargo truck (C2) having trailer total
                  weight exceed 750 kilograms
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionE11"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>

          <!-- E1 2-->
          <div class="card mb-1" v-if="store.dlt_today.E1_2.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionE12"
                  aria-expanded="false"
                  aria-controls="defaultAccordionE12"
                >
                  ຊ່ອງເວລາ 16.00 - E1 : Cargo truck (C2) having trailer total
                  weight exceed 750 kilograms
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionE12"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>

                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">ລຳດັບສອບເສັງ: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="row">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              ID ນັດໝາຍ: A83M100
                            </h4>
                            <h5 class="media-heading mb-1">
                              ທ. ສົມສັກ ຈ່າງດາບຸດ
                            </h5>
                            <p class="card-category mb-2">ID ນັກຮຽນ: ບໍ່ມີ</p>
                            <span class="card-category mb-2">ສະຖານະ : </span
                            ><span style="color: red">ລໍຖ້າກວດເອກະສານ</span>
                            <p class="card-category mb-2 pt-2">
                              ລຳດັບສອບເສັງ: 1
                            </p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນທິດສະດີ: 18/20
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4 class="media-heading mb-1">
                                  ຜົນປະຕິບັດ: 85/100
                                </h4>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style  scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  width: 50%;
}

button {
  margin-top: 10px;
}

.accordion-buttonaa.collapsed::after {
  transform: rotate(-90deg); /* Left arrow when collapsed */
}

.accordion-buttonaa {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--bs-accordion-btn-padding-y) var(--bs-accordion-btn-padding-x);

  color: var(--bs-accordion-btn-color);
  text-align: left;

  border: 0;
  border-radius: 0;
  overflow-anchor: none;
  transition: var(--bs-accordion-transition);
}

.accordion-buttonaa::after {
  flex-shrink: 0;
  width: var(--bs-accordion-btn-icon-width);
  height: var(--bs-accordion-btn-icon-width);
  margin-left: auto;
  content: "";
  background-image: var(--bs-accordion-btn-icon);
  background-repeat: no-repeat;
  background-size: var(--bs-accordion-btn-icon-width);
  transition: var(--bs-accordion-btn-icon-transition);
}
</style>