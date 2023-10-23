<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="middle-content container-xxl p-0">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="row widget-statistic">
              <div
                class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing"
                @click="choose('all')"
              >
                <div class="widget widget-one_hybrid widget-followers">
                  <div class="widget-heading">
                    <div class="w-title">
                      <div class="w-icon">
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
                          class="feather feather-users"
                        >
                          <path
                            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                          ></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <div class="">
                        <p class="w-value">{{ $t("menu_dashboard_all") }}</p>
                        <h5 class="">{{ $t("menu_dashboard_all") }}</h5>
                      </div>
                    </div>
                  </div>
                  <div class="widget-content">
                    <div class="w-chart">
                      <div id="hybrid_followers"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing"
                @click="choose('course')"
              >
                <div class="widget widget-one_hybrid widget-referral">
                  <div class="widget-heading">
                    <div class="w-title">
                      <div class="w-icon">
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
                          class="feather feather-link"
                        >
                          <path
                            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                          ></path>
                          <path
                            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                          ></path>
                        </svg>
                      </div>
                      <div class="">
                        <p class="w-value">{{ $t("menu_dashboard_course") }}</p>
                        <h5 class="">{{ $t("menu_dashboard_course_t") }}</h5>
                      </div>
                    </div>
                  </div>
                  <div class="widget-content">
                    <div class="w-chart">
                      <div id="hybrid_followers1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing"
                @click="choose('reserve')"
              >
                <div class="widget widget-one_hybrid widget-engagement">
                  <div class="widget-heading">
                    <div class="w-title">
                      <div class="w-icon">
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
                          class="feather feather-message-circle"
                        >
                          <path
                            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                          ></path>
                        </svg>
                      </div>
                      <div class="">
                        <p class="w-value">{{ $t("menu_dashboard_app") }}</p>
                        <h5 class="">{{ $t("menu_dashboard_app_t") }}</h5>
                      </div>
                    </div>
                  </div>
                  <div class="widget-content">
                    <div class="w-chart">
                      <div id="hybrid_followers3"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing"
                @click="choose('exam')"
              >
                <div class="widget widget-one_hybrid widget-engagement">
                  <div class="widget-heading">
                    <div class="w-title">
                      <div class="w-icon">
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 3a3 3 0 013-3h94a3 3 0 013 3v65H0V3z"
                            fill="#2D2D2D"
                          />
                          <path d="M0 0h100v10H0V0z" fill="#393939" />
                          <path fill="#242424" d="M0 10h100v1H0z" />
                          <path fill="#3C4146" d="M20 11h2v57h-2z" />
                          <path
                            d="M3 15c0-.6.4-1 1-1h16v8H4a1 1 0 01-1-1v-6z"
                            fill="#6A737C"
                          />
                          <rect
                            x="26"
                            y="14"
                            width="49"
                            height="8"
                            rx="1"
                            fill="#6A737C"
                          />
                          <rect
                            x="93"
                            y="4"
                            width="4"
                            height="4"
                            rx="1"
                            fill="#6A737C"
                          />
                          <rect
                            x="86"
                            y="4"
                            width="4"
                            height="4"
                            rx="1"
                            fill="#6A737C"
                          />
                          <rect
                            x="3"
                            y="4"
                            width="4"
                            height="4"
                            rx="1"
                            fill="#6A737C"
                          />
                          <rect
                            x="36"
                            y="27"
                            width="61"
                            height="4"
                            rx="1"
                            fill="#6A737C"
                          />
                          <rect
                            x="36"
                            y="34"
                            width="58"
                            height="4"
                            rx="1"
                            fill="#6A737C"
                          />
                          <rect
                            x="36"
                            y="41"
                            width="57"
                            height="4"
                            rx="1"
                            fill="#6A737C"
                          />
                          <rect
                            x="36"
                            y="48"
                            width="59"
                            height="4"
                            rx="1"
                            fill="#6A737C"
                          />
                          <rect
                            x="26"
                            y="27"
                            width="6"
                            height="6"
                            rx="1"
                            fill="#6A737C"
                          />
                          <rect
                            x="26"
                            y="43"
                            width="6"
                            height="6"
                            rx="1"
                            fill="#6A737C"
                          />
                          <rect
                            x="83"
                            y="57"
                            width="14"
                            height="8"
                            rx="1"
                            fill="#6A737C"
                          />
                          <rect
                            x="27"
                            y="36"
                            width="4"
                            height="4"
                            rx="1"
                            fill="#6A737C"
                          />
                          <path fill="#F2720C" d="M20 14h2v8h-2z" />
                          <rect
                            x="78"
                            y="14"
                            width="19"
                            height="8"
                            rx="1"
                            fill="#0095FF"
                          />
                          <path fill="#F2720C" d="M0 0h100v2H0z" />
                        </svg>
                      </div>
                      <div class="">
                        <p class="w-value">{{ $t("menu_dashboard_exam") }}</p>
                        <h5 class="">{{ $t("menu_dashboard_exam_t") }}</h5>
                      </div>
                    </div>
                  </div>
                  <div class="widget-content">
                    <div class="w-chart">
                      <div id="hybrid_followers3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- --------------333333333333333333333333 -->
        <div
          class="row layout-top-spacing"
          v-if="store.type == 'all' || store.type == 'reserve'"
        >
          <div
            class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 layout-spacing"
          >
            <div class="widget widget-five">
              <div class="widget-heading">
                <h5 class="">{{ $t("chart_log_app") }}</h5>
              </div>

              <div class="widget-content">
                <!-- <button @click="loadNewData">Load New Data</button> -->

                <Bar :data="store.datacollectionreserve" />
              </div>
            </div>
          </div>

          <div
            class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing"
          >
            <div class="widget widget-card-four">
              <div class="widget-content">
                <!-- <LogFitter></LogFitter> -->

                <div class="row mb-4">
                  <div id="form_grid_layouts" class="col-lg-10">
                    <div class="seperator-header">
                      <h4 class="">{{ $t("fitter_dashboard_appoint") }}</h4>
                    </div>
                  </div>

                  <div class="col-sm-12">
                    <label for="exampleFormControlInput1">Year</label>
                    <select class="form-control" v-model="store.formrev.year">
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                  </div>

                  <div class="col-sm-12">
                    <label for="exampleFormControlInput1">DLT</label>
                    <select
                      class="form-control"
                      @change="onChange($event)"
                      v-model="store.formrev.dlt_code"
                    >
                      <option disabled :value="null">เลือก</option>

                      <option
                        v-for="(item, i) in store.dlt"
                        :value="item.dlt_code"
                      >
                    
                          <span v-if="locale == 'la'">{{ item.dlt_description_loas }}</span>
                  <span v-if="locale == 'en'">{{ item.dlt_description_english }}</span>
                  <span v-if="locale == 'th'">{{ item.dlt_description }}</span>
                      </option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  class="btn btn-primary"
                  @click="searchReserve()"
                >
                  {{ $t("fitter_search") }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="row layout-top-spacing"
          v-if="store.type == 'all' || store.type == 'exam'"
        >
          <div
            class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 layout-spacing"
          >
            <div class="widget widget-five">
              <div class="widget-heading">
                <h5 class="">{{ $t("chart_log_exam") }}</h5>
              </div>

              <div class="widget-content">
                <!-- <button @click="loadNewData">Load New Data</button> -->

                <Bar :data="store.datacollectionexam" />
              </div>
            </div>
          </div>

          <div
            class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing"
          >
            <div class="widget widget-card-four">
              <div class="widget-content">
                <!-- <LogFitter></LogFitter> -->

                <div class="row mb-4">
                  <div id="form_grid_layouts" class="col-lg-10">
                    <div class="seperator-header">
                      <h4 class="">{{ $t("fitter_dashboard_appoint") }}</h4>
                    </div>
                  </div>

                  <div class="col-sm-12">
                    <label for="exampleFormControlInput1">Year</label>
                    <select class="form-control" v-model="store.formexam.year">
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                  </div>

                  <div class="col-sm-12">
                    <label for="exampleFormControlInput1">DLT</label>
                    <select
                      class="form-control"
                      @change="onChange($event)"
                      v-model="store.formexam.dlt_code"
                    >
                      <option disabled :value="null">เลือก</option>
                      <option
                        v-for="(item, i) in store.dlt"
                        :value="item.dlt_code"
                      >
                  
                         <span v-if="locale == 'la'">{{ item.dlt_description_loas }}</span>
                  <span v-if="locale == 'en'">{{ item.dlt_description_english }}</span>
                  <span v-if="locale == 'th'">{{ item.dlt_description }}</span>
                      </option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  class="btn btn-primary"
                  @click="searchExam()"
                >
                  {{ $t("fitter_search") }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="row layout-top-spacing"
          v-if="store.type == 'all' || store.type == 'course'"
        >
          <div
            class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 layout-spacing"
          >
            <div class="widget widget-five">
              <div class="widget-heading">
                <h5 class="">{{ $t("chart_log_course") }}</h5>
              </div>

              <div class="widget-content">
                <!-- <button @click="loadNewData">Load New Data</button> -->

                <Bar :data="store.datacollection" />
              </div>
            </div>
          </div>

          <div
            class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing"
          >
            <div class="widget widget-card-four">
              <div class="widget-content">
                <!-- <LogFitter></LogFitter> -->

                <div class="row mb-4">
                  <div id="form_grid_layouts" class="col-lg-10">
                    <div class="seperator-header">
                      <h4 class="">{{ $t("fitter_dashboard_course") }}</h4>
                    </div>
                  </div>

                  <div class="col-sm-12">
                    <label for="exampleFormControlInput1">Fiiter Type</label>
                    <select
                      class="form-control"
                      v-model="store.formfitter.type"
                    >
                      <option value="1">Lesson</option>
                      <option value="2">Course</option>
                      <option value="3">Course && User</option>
                    </select>
                  </div>
                  <div class="col-sm-12">
                    <label for="exampleFormControlInput1">Year</label>
                    <select
                      class="form-control"
                      v-model="store.formfitter.year"
                    >
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                  </div>

                  <div class="col-sm-12">
                    <label for="exampleFormControlInput1">Course ID</label>
                    <select
                      class="form-control"
                      v-model="store.formfitter.course_id"
                      @change="onChange($event)"
                    >
                      <option disabled :value="null">เลือก</option>
                      <option
                        v-for="(item, i) in store.courselist"
                        :value="item.course_id"
                      >
                        {{ item.course_name }}
                      </option>
                    </select>
                  </div>

                  <div
                    class="col-sm-12"
                    v-if="
                      store.formfitter.type != '2' &&
                      store.formfitter.type != '3'
                    "
                  >
                    <label for="exampleFormControlInput1">Lesson ID</label>
                    <select
                      class="form-control"
                      v-model="store.formfitter.cs_id"
                    >
                      <option disabled :value="null">เลือก</option>
                      <option
                        v-for="(less, i) in store.lessonlist"
                        :value="less.cs_id"
                        v-if="store.lessonlist"
                      >
                        {{ less.cs_name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  class="row layout-top-spacing"
                  v-if="store.formfitter.type == '3'"
                >
                  <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail3"
                      placeholder="ค้นหา User *"
                      maxlength="10"
                      v-model="store.formuser.search"
                      @keyup="searchData"
                    />
                  </div>
                </div>

                <div class="col-sm-12" v-if="store.formfitter.type == '3'">
                  <div class="table-responsive">
                    <table
                      id="example"
                      class="table table-bordered"
                      style="width: 100%"
                    >
                      <thead>
                        <tr>
                          <th>{{ $t("menu_result_name") }} &#8597;</th>
                          <th>{{ $t("menu_result_phone") }} &#8597;</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(users, index) in store.userall"
                          :key="users.user_id"
                          @click="Sel(users.user_id)"
                          :class="{
                            'table-success': store.myChoose === users.user_id,
                          }"
                        >
                          <td>
                            {{ users.user_firstname }} {{ users.user_lastname }}
                          </td>
                          <td>{{ users.user_phone }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <button type="button" class="btn btn-primary" @click="search()">
                  {{ $t("fitter_search") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  BEGIN FOOTER  -->

    <!--  END FOOTER  -->
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth", // this should match the name of the file inside the middleware directory
});

/*Call Components*/
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import LogFitter from "@/components/log/LogFitter.vue";
import { ref, onMounted, onUnmounted } from "vue";
import Swal from "sweetalert2";
import { Bar } from "vue-chartjs";
import { LogStore } from "@/store/log"; // import the auth store we just created
import { useI18n } from "vue-i18n";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
const { locale, setLocale } = useI18n();
const store = LogStore();

onMounted(async () => {
  const year = new Date().getFullYear();
  store.formfitter.year = year;
  store.formrev.year = year;
  store.formexam.year = year;

  await store.fetchCourslist();
  await store.fetchLogReserve();
  await store.fetchLogExam();
  await updatechartrev();
  await updatechartexam();
});

const searchData = async () => {
  store.myChoose = [];
  await store.fetchUsers();
};

const chartData = ref(store.datacollection);

const loadNewData = async () => {
  store.datacollection = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "New Data",
        backgroundColor: ["#FAE043", "#2A9D8F", "#E63946"],
        data: [
          Math.floor(Math.random() * 50),
          Math.floor(Math.random() * 50),
          Math.floor(Math.random() * 50),
        ],
      },
    ],
  };
};

const search = async () => {
  if (store.formfitter.type == "1") {
    if (store.formfitter.cs_id == null) {
      Swal.fire({
        text: "กรุณาเลือก Lesson ที่มีบทเรียน !",
        icon: "error",
      });
    } else {
      await store.fetchReport();

      await updatechart();
    }
  }
  if (store.formfitter.type == "2") {
    if (store.formfitter.course_id == null) {
      Swal.fire({
        text: "กรุณาเลือก Course!",
        icon: "error",
      });
    } else {
      await store.fetchReport();

      await updatechart();
    }
  }
  if (store.formfitter.type == "3") {
    if (store.formfitter.user_id == null) {
      Swal.fire({
        text: "กรุณาเลือก Users!",
        icon: "error",
      });
    } else {
      await store.fetchReport();

      await updatechart();
    }
  }
};

const searchExam = async () => {
  await store.fetchLogExam();

  await updatechartexam();
};

const searchReserve = async () => {
  await store.fetchLogReserve();
  await updatechartrev();
};

const onChange = async (event) => {
  store.formfitter.cs_id = null;
  await store.fetchLesson();
};

const updatechart = async () => {
  store.datacollection = {
    labels: [
      "ມັງກອນ",
      "ກຸມພາ",
      "ມີເຄື່ອງໝາຍ.",
      "ເດືອນເມສາ",
      "ອາດ",
      "ເດືອນມິຖຸນາ",
      "ກໍລະກົດ",
      "ສິງຫາ",
      "ກັນຍາ",
      "ຕຸລາ",
      "ພະຈິກ",
      "ທັນວາ",
    ],
    datasets: [
      {
        label: "Log Course",
        backgroundColor: ["#FAE043", "#2A9D8F", "#E63946"],
        data: [
          store.reportlog[0],
          store.reportlog[1],
          store.reportlog[2],
          store.reportlog[3],
          store.reportlog[4],
          store.reportlog[5],
          store.reportlog[6],
          store.reportlog[7],
          store.reportlog[8],
          store.reportlog[9],
          store.reportlog[10],
          store.reportlog[11],
        ],
      },
    ],
  };
};

const updatechartrev = async () => {
  store.datacollectionreserve = {
    labels: [
      "ມັງກອນ",
      "ກຸມພາ",
      "ມີເຄື່ອງໝາຍ.",
      "ເດືອນເມສາ",
      "ອາດ",
      "ເດືອນມິຖຸນາ",
      "ກໍລະກົດ",
      "ສິງຫາ",
      "ກັນຍາ",
      "ຕຸລາ",
      "ພະຈິກ",
      "ທັນວາ",
    ],
    datasets: [
      {
        label: "Log Reserve",
        backgroundColor: ["#FAE043", "#2A9D8F", "#E63946"],
        data: [
          store.reportrev[0],
          store.reportrev[1],
          store.reportrev[2],
          store.reportrev[3],
          store.reportrev[4],
          store.reportrev[5],
          store.reportrev[6],
          store.reportrev[7],
          store.reportrev[8],
          store.reportrev[9],
          store.reportrev[10],
          store.reportrev[11],
        ],
      },
    ],
  };
};

const updatechartexam = async () => {
  store.datacollectionexam = {
    labels: [
      "ມັງກອນ",
      "ກຸມພາ",
      "ມີເຄື່ອງໝາຍ.",
      "ເດືອນເມສາ",
      "ອາດ",
      "ເດືອນມິຖຸນາ",
      "ກໍລະກົດ",
      "ສິງຫາ",
      "ກັນຍາ",
      "ຕຸລາ",
      "ພະຈິກ",
      "ທັນວາ",
    ],
    datasets: [
      {
        label: "Log Exam",
        backgroundColor: ["#FAE043", "#2A9D8F", "#E63946"],
        data: [
          store.reportexam[0],
          store.reportexam[1],
          store.reportexam[2],
          store.reportexam[3],
          store.reportexam[4],
          store.reportexam[5],
          store.reportexam[6],
          store.reportexam[7],
          store.reportexam[8],
          store.reportexam[9],
          store.reportexam[10],
          store.reportexam[11],
        ],
      },
    ],
  };
};

const choose = async (e) => {
  store.type = e;
  await store.FillterType();
};
const Sel = async (id) => {
  store.formfitter.user_id = id;
  store.myChoose = id;
};

const backToUser = async () => {
  router.go(-1);
};
</script>
<style scoped></style>