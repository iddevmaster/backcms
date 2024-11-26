


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
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();
definePageMeta({
  middleware: ["auth", "roles"],
  allowedRoles: [1, 2],
});
const toast = useToast();
const store = AppointStore();

const auth = useAuthStore();
const router = useRouter();
store.user_id = auth.user_id;
store.location_id = auth.detail.location_id;
store.user_type = auth.users.user_type;



const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
store.formsearchapptoday.ap_date_start = date;
await store.fetchDlt();
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
  let total = store.course.find((obj) => obj.course_code == item.dlt_code);

  if (total) {
    return total.total_quest;
  } else {
    return "-";
  }
};


const checkdlt = (item) => {




const filteredData = store.dlt.filter(s => s.dlt_code == item[0].dlt_code);


return filteredData;
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
                  ຊ່ອງເວລາ {{store.dlt_today}} - A : {{ locale == "la" ? checkdlt(store.dlt_today.A_1)[0].dlt_name_lo : checkdlt(store.dlt_today.A_1)[0].dlt_name_eng }}
                

              
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
                          <img
                            v-if="item1.user_img"
                            :src="coverimage(item1.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img
                            v-else
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              {{ $t("app_today_id") }}: {{ item1.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item1.user_prefrix }}
                              {{ item1.user_firstname }}
                              {{ item1.user_lastname }}
                            </h5>
                            <p class="card-category mb-2">{{ $t("app_today_ppt") }}: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">{{ $t("app_today_div") }}: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item1.thero"
                                >
                                {{ $t("app_today_id") }}: {{ item1.thero }}
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_ther") }}: -
                                </h4>
                              </div>
                              <div class="media-body">
                                
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item1.pratic"
                                >
                                {{ $t("app_today_pra") }}:
                                  <span style="color: green"
                                    >{{ item1.pratic }} /100</span
                                  >
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_pra") }}: -
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
                  ຊ່ອງເວລາ 16.00 - A : {{ locale == "la" ? checkdlt(store.dlt_today.A_2)[0].dlt_name_lo : checkdlt(store.dlt_today.A_2)[0].dlt_name_eng }}
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
                          <img
                            v-if="item.user_img"
                            :src="coverimage(item.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img
                            v-else
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              {{ $t("app_today_id") }}: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                            <p class="card-category mb-2">{{ $t("app_today_ppt") }}: ບໍ່ມີ</p>
                            <p class="card-category mb-2">ສະຖານະ: ເສັງຜ່ານ</p>
                            <p class="card-category mb-2">{{ $t("app_today_div") }}: 1</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                {{ $t("app_today_ther") }}: {{ item.thero }} /
                                  {{ CheckTotalque(item) }}
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_ther") }}: -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                {{ $t("app_today_pra") }}: {{ item.pratic }} /100
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_pra") }}: -
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
                  ຊ່ອງເວລາ {{store.dlt_today.A1_1[0].time}} - A1 
                  {{ locale == "la" ? checkdlt(store.dlt_today.A1_1)[0].dlt_name_lo : checkdlt(store.dlt_today.A1_1)[0].dlt_name_eng }}

                 
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
                          <img
                            v-if="item.user_img"
                            :src="coverimage(item.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img
                            v-else
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />

                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              {{ $t("app_today_id") }}: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                          
                            <p class="card-category mb-2" v-if="item.id_card">{{ $t("app_today_ppt") }}: {{item.id_card}}</p>
                            <p class="card-category mb-2" v-else>{{ $t("app_today_ppt") }}: ບໍ່ມີ</p>
                        
                            <div v-if="item.app_status == 'C'">
                              <p
                                class="card-category mb-2"
                                v-if="item.app_status == 'C'"
                                style="color: red"
                              >
                                ສະຖານະ: Canceled
                              </p>
                            </div>
                            <div
                              v-if="
                                item.app_status == 'Y' &&
                                item.check_document == null
                              "
                            >
                              <p
                                class="card-category mb-2"
                                v-if="
                                  (item.check_document == '' ||
                                    item.check_document == null) &&
                                  item.app_status == 'Y'
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending check document
                              </p>
                            </div>

                            <div
                              v-if="
                                item.app_status == 'Y' &&
                                item.check_document == 'pass'
                              "
                            >
                              <p
                                class="card-category mb-2"
                                v-if="
                                  (item.check_document != '' ||
                                    item.check_document != null) &&
                                  item.mr_status_t == null
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending Theory Exam
                              </p>

                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t != null &&
                                  item.mr_status_p == null
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending Practical Exam
                              </p>

                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t == 'fail' &&
                                  item.mr_status_p == 'fail'
                                "
                                style="color: red"
                              >
                                ສະຖານະ: Failed Exam
                              </p>
                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t == 'pass' &&
                                  item.mr_status_p == 'pass'
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Practical Exam
                              </p>
                            </div>

                            <p class="card-category mb-2" v-if="item.st_id">{{ $t("app_today_div") }}: {{item.st_id}}</p>
                            <p class="card-category mb-2" v-else>{{ $t("app_today_div") }}: -</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                {{ $t("app_today_ther") }}
                                  <span
                                    style="color: red"
                                    v-if="item.mr_status_t == 'fail'"
                                  >
                                    {{ item.thero }}/{{
                                      CheckTotalque(item)
                                    }}</span
                                  >
                                  <span
                                    style="color: green"
                                    v-if="item.mr_status_t == 'pass'"
                                  >
                                    {{ item.thero }}/{{
                                      CheckTotalque(item)
                                    }}</span
                                  >
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_ther") }} -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                {{ $t("app_today_pra") }}

                                  <span
                                    style="color: red"
                                    v-if="item.mr_status_p == 'fail'"
                                  >
                                    {{ item.pratic }}</span
                                  >
                                  <span
                                    style="color: green"
                                    v-if="item.mr_status_p == 'pass'"
                                  >
                                    {{ item.pratic }}/100</span
                                  >
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_pra") }} -
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

          <div class="card mb-1" v-if="store.dlt_today.A2_1.length > 0">
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
                  ຊ່ອງເວລາ {{store.dlt_today.A2_1[0].time}} - A2 
                  {{ locale == "la" ? checkdlt(store.dlt_today.A2_1)[0].dlt_name_lo : checkdlt(store.dlt_today.A2_1)[0].dlt_name_eng }}

                 
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
                    v-for="(item, index) in store.dlt_today.A2_1"
                    :key="item"
                  >
                    <div class="row" @click="GotoDetails(item)">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            v-if="item.user_img"
                            :src="coverimage(item.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img
                            v-else
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />

                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              {{ $t("app_today_id") }}: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                          
                            <p class="card-category mb-2" v-if="item.id_card">{{ $t("app_today_ppt") }}: {{item.id_card}}</p>
                            <p class="card-category mb-2" v-else>{{ $t("app_today_ppt") }}: ບໍ່ມີ</p>
                        
                            <div v-if="item.app_status == 'C'">
                              <p
                                class="card-category mb-2"
                                v-if="item.app_status == 'C'"
                                style="color: red"
                              >
                                ສະຖານະ: Canceled
                              </p>
                            </div>
                            <div
                              v-if="
                                item.app_status == 'Y' &&
                                item.check_document == null
                              "
                            >
                              <p
                                class="card-category mb-2"
                                v-if="
                                  (item.check_document == '' ||
                                    item.check_document == null) &&
                                  item.app_status == 'Y'
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending check document
                              </p>
                            </div>

                            <div
                              v-if="
                                item.app_status == 'Y' &&
                                item.check_document == 'pass'
                              "
                            >
                              <p
                                class="card-category mb-2"
                                v-if="
                                  (item.check_document != '' ||
                                    item.check_document != null) &&
                                  item.mr_status_t == null
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending Theory Exam
                              </p>

                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t != null &&
                                  item.mr_status_p == null
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending Practical Exam
                              </p>

                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t == 'fail' &&
                                  item.mr_status_p == 'fail'
                                "
                                style="color: red"
                              >
                                ສະຖານະ: Failed Exam
                              </p>
                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t == 'pass' &&
                                  item.mr_status_p == 'pass'
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Practical Exam
                              </p>
                            </div>

                            <p class="card-category mb-2" v-if="item.st_id">{{ $t("app_today_div") }}: {{item.st_id}}</p>
                            <p class="card-category mb-2" v-else>{{ $t("app_today_div") }}: -</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                {{ $t("app_today_ther") }}
                                  <span
                                    style="color: red"
                                    v-if="item.mr_status_t == 'fail'"
                                  >
                                    {{ item.thero }}/{{
                                      CheckTotalque(item)
                                    }}</span
                                  >
                                  <span
                                    style="color: green"
                                    v-if="item.mr_status_t == 'pass'"
                                  >
                                    {{ item.thero }}/{{
                                      CheckTotalque(item)
                                    }}</span
                                  >
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_ther") }} -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                {{ $t("app_today_pra") }}

                                  <span
                                    style="color: red"
                                    v-if="item.mr_status_p == 'fail'"
                                  >
                                    {{ item.pratic }}</span
                                  >
                                  <span
                                    style="color: green"
                                    v-if="item.mr_status_p == 'pass'"
                                  >
                                    {{ item.pratic }}/100</span
                                  >
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_pra") }} -
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


          <div class="card mb-1" v-if="store.dlt_today.B_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionB"
                  aria-expanded="false"
                  aria-controls="defaultAccordionB"
                >
                  ຊ່ອງເວລາ {{store.dlt_today.B_1[0].time}} - B
                  {{ locale == "la" ? checkdlt(store.dlt_today.B_1)[0].dlt_name_lo : checkdlt(store.dlt_today.B_1)[0].dlt_name_eng }}

                 
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionB"
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
                          <img
                            v-if="item.user_img"
                            :src="coverimage(item.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img
                            v-else
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />

                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              {{ $t("app_today_id") }}: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                          
                            <p class="card-category mb-2" v-if="item.id_card">{{ $t("app_today_ppt") }}: {{item.id_card}}</p>
                            <p class="card-category mb-2" v-else>{{ $t("app_today_ppt") }}: ບໍ່ມີ</p>
                        
                            <div v-if="item.app_status == 'C'">
                              <p
                                class="card-category mb-2"
                                v-if="item.app_status == 'C'"
                                style="color: red"
                              >
                                ສະຖານະ: Canceled
                              </p>
                            </div>
                            <div
                              v-if="
                                item.app_status == 'Y' &&
                                item.check_document == null
                              "
                            >
                              <p
                                class="card-category mb-2"
                                v-if="
                                  (item.check_document == '' ||
                                    item.check_document == null) &&
                                  item.app_status == 'Y'
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending check document
                              </p>
                            </div>

                            <div
                              v-if="
                                item.app_status == 'Y' &&
                                item.check_document == 'pass'
                              "
                            >
                              <p
                                class="card-category mb-2"
                                v-if="
                                  (item.check_document != '' ||
                                    item.check_document != null) &&
                                  item.mr_status_t == null
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending Theory Exam
                              </p>

                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t != null &&
                                  item.mr_status_p == null
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending Practical Exam
                              </p>

                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t == 'fail' &&
                                  item.mr_status_p == 'fail'
                                "
                                style="color: red"
                              >
                                ສະຖານະ: Failed Exam
                              </p>
                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t == 'pass' &&
                                  item.mr_status_p == 'pass'
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Practical Exam
                              </p>
                            </div>

                            <p class="card-category mb-2" v-if="item.st_id">{{ $t("app_today_div") }}: {{item.st_id}}</p>
                            <p class="card-category mb-2" v-else>{{ $t("app_today_div") }}: -</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                {{ $t("app_today_ther") }}
                                  <span
                                    style="color: red"
                                    v-if="item.mr_status_t == 'fail'"
                                  >
                                    {{ item.thero }}/{{
                                      CheckTotalque(item)
                                    }}</span
                                  >
                                  <span
                                    style="color: green"
                                    v-if="item.mr_status_t == 'pass'"
                                  >
                                    {{ item.thero }}/{{
                                      CheckTotalque(item)
                                    }}</span
                                  >
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_ther") }} -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                {{ $t("app_today_pra") }}

                                  <span
                                    style="color: red"
                                    v-if="item.mr_status_p == 'fail'"
                                  >
                                    {{ item.pratic }}</span
                                  >
                                  <span
                                    style="color: green"
                                    v-if="item.mr_status_p == 'pass'"
                                  >
                                    {{ item.pratic }}/100</span
                                  >
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_pra") }} -
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


          <div class="card mb-1" v-if="store.dlt_today.C_1.length > 0">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionC"
                  aria-expanded="false"
                  aria-controls="defaultAccordionAC"
                >
                  ຊ່ອງເວລາ {{store.dlt_today.C_1[0].time}} - C
                  {{ locale == "la" ? checkdlt(store.dlt_today.C_1)[0].dlt_name_lo : checkdlt(store.dlt_today.C_1)[0].dlt_name_eng }}

                
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionC"
              class="collapse"
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion3"
            >
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-sm-6"
                    v-for="(item, index) in store.dlt_today.C_1"
                    :key="item"
                  >
                    <div class="row" @click="GotoDetails(item)">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            v-if="item.user_img"
                            :src="coverimage(item.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img
                            v-else
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />

                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              {{ $t("app_today_id") }}: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                          
                            <p class="card-category mb-2" v-if="item.id_card">{{ $t("app_today_ppt") }}: {{item.id_card}}</p>
                            <p class="card-category mb-2" v-else>{{ $t("app_today_ppt") }}: ບໍ່ມີ</p>
                        
                            <div v-if="item.app_status == 'C'">
                              <p
                                class="card-category mb-2"
                                v-if="item.app_status == 'C'"
                                style="color: red"
                              >
                                ສະຖານະ: Canceled
                              </p>
                            </div>
                            <div
                              v-if="
                                item.app_status == 'Y' &&
                                item.check_document == null
                              "
                            >
                              <p
                                class="card-category mb-2"
                                v-if="
                                  (item.check_document == '' ||
                                    item.check_document == null) &&
                                  item.app_status == 'Y'
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending check document
                              </p>
                            </div>

                            <div
                              v-if="
                                item.app_status == 'Y' &&
                                item.check_document == 'pass'
                              "
                            >
                              <p
                                class="card-category mb-2"
                                v-if="
                                  (item.check_document != '' ||
                                    item.check_document != null) &&
                                  item.mr_status_t == null
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending Theory Exam
                              </p>

                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t != null &&
                                  item.mr_status_p == null
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending Practical Exam
                              </p>

                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t == 'fail' &&
                                  item.mr_status_p == 'fail'
                                "
                                style="color: red"
                              >
                                ສະຖານະ: Failed Exam
                              </p>
                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t == 'pass' &&
                                  item.mr_status_p == 'pass'
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Practical Exam
                              </p>
                            </div>

                            <p class="card-category mb-2" v-if="item.st_id">{{ $t("app_today_div") }}: {{item.st_id}}</p>
                            <p class="card-category mb-2" v-else>{{ $t("app_today_div") }}: -</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                {{ $t("app_today_ther") }}
                                  <span
                                    style="color: red"
                                    v-if="item.mr_status_t == 'fail'"
                                  >
                                    {{ item.thero }}/{{
                                      CheckTotalque(item)
                                    }}</span
                                  >
                                  <span
                                    style="color: green"
                                    v-if="item.mr_status_t == 'pass'"
                                  >
                                    {{ item.thero }}/{{
                                      CheckTotalque(item)
                                    }}</span
                                  >
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_ther") }} -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                {{ $t("app_today_pra") }}

                                  <span
                                    style="color: red"
                                    v-if="item.mr_status_p == 'fail'"
                                  >
                                    {{ item.pratic }}</span
                                  >
                                  <span
                                    style="color: green"
                                    v-if="item.mr_status_p == 'pass'"
                                  >
                                    {{ item.pratic }}/100</span
                                  >
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_pra") }} -
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


          <div class="card mb-1" v-if="store.dlt_today.D_1.length > 0">
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
                  ຊ່ອງເວລາ {{store.dlt_today.D_1[0].time}} - D
                  {{ locale == "la" ? checkdlt(store.dlt_today.D_1)[0].dlt_name_lo : checkdlt(store.dlt_today.D_1)[0].dlt_name_eng }}

                
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
                    v-for="(item, index) in store.dlt_today.D_1"
                    :key="item"
                  >
                    <div class="row" @click="GotoDetails(item)">
                      <div
                        class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12/"
                      >
                        <div class="card style-3">
                          <img
                            v-if="item.user_img"
                            :src="coverimage(item.user_img)"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />
                          <img
                            v-else
                            src="../.././../public/img/logo.svg"
                            class="card-img-top"
                            alt="..."
                            style="width: 200px"
                          />

                          <div class="card-body px-0 py-0">
                            <h4 class="media-heading mb-1">
                              {{ $t("app_today_id") }}: {{ item.ap_number }}
                            </h4>

                            <h5 class="media-heading mb-1">
                              {{ item.user_prefrix }} {{ item.user_firstname }}
                              {{ item.user_lastname }}
                            </h5>
                          
                            <p class="card-category mb-2" v-if="item.id_card">{{ $t("app_today_ppt") }}: {{item.id_card}}</p>
                            <p class="card-category mb-2" v-else>{{ $t("app_today_ppt") }}: ບໍ່ມີ</p>
                        
                            <div v-if="item.app_status == 'C'">
                              <p
                                class="card-category mb-2"
                                v-if="item.app_status == 'C'"
                                style="color: red"
                              >
                                ສະຖານະ: Canceled
                              </p>
                            </div>
                            <div
                              v-if="
                                item.app_status == 'Y' &&
                                item.check_document == null
                              "
                            >
                              <p
                                class="card-category mb-2"
                                v-if="
                                  (item.check_document == '' ||
                                    item.check_document == null) &&
                                  item.app_status == 'Y'
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending check document
                              </p>
                            </div>

                            <div
                              v-if="
                                item.app_status == 'Y' &&
                                item.check_document == 'pass'
                              "
                            >
                              <p
                                class="card-category mb-2"
                                v-if="
                                  (item.check_document != '' ||
                                    item.check_document != null) &&
                                  item.mr_status_t == null
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending Theory Exam
                              </p>

                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t != null &&
                                  item.mr_status_p == null
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Pending Practical Exam
                              </p>

                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t == 'fail' &&
                                  item.mr_status_p == 'fail'
                                "
                                style="color: red"
                              >
                                ສະຖານະ: Failed Exam
                              </p>
                              <p
                                class="card-category mb-2"
                                v-if="
                                  item.mr_status_t == 'pass' &&
                                  item.mr_status_p == 'pass'
                                "
                                style="color: green"
                              >
                                ສະຖານະ: Practical Exam
                              </p>
                            </div>

                            <p class="card-category mb-2" v-if="item.st_id">{{ $t("app_today_div") }}: {{item.st_id}}</p>
                            <p class="card-category mb-2" v-else>{{ $t("app_today_div") }}: -</p>

                            <div class="media mt-4 mb-0">
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.thero"
                                >
                                {{ $t("app_today_ther") }}
                                  <span
                                    style="color: red"
                                    v-if="item.mr_status_t == 'fail'"
                                  >
                                    {{ item.thero }}/{{
                                      CheckTotalque(item)
                                    }}</span
                                  >
                                  <span
                                    style="color: green"
                                    v-if="item.mr_status_t == 'pass'"
                                  >
                                    {{ item.thero }}/{{
                                      CheckTotalque(item)
                                    }}</span
                                  >
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_ther") }} -
                                </h4>
                              </div>
                              <div class="media-body">
                                <h4
                                  class="media-heading mb-1"
                                  v-if="item.pratic"
                                >
                                {{ $t("app_today_pra") }}

                                  <span
                                    style="color: red"
                                    v-if="item.mr_status_p == 'fail'"
                                  >
                                    {{ item.pratic }}</span
                                  >
                                  <span
                                    style="color: green"
                                    v-if="item.mr_status_p == 'pass'"
                                  >
                                    {{ item.pratic }}/100</span
                                  >
                                </h4>
                                <h4 class="media-heading mb-1" v-else>
                                  {{ $t("app_today_pra") }} -
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