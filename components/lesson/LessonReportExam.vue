<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="text"
        name="txt"
        placeholder="ຊອກຫາ"
        class="form-control"
        required=""
        v-model="store.formreportexam.search"
        @input="searchData"
        maxlength="30"
      />
    </div>

    <div class="col-xl-4 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">
      <select
        class="form-select form-select"
        aria-label="Default select example"
        @change="selectscourse($event)"
      >
        <option
          v-for="(item, index) in store.course"
          :key="item.course_id"
          :value="item.course_id"
        >
          {{ locale == "la" ? item.course_name_lo : item.course_name_eng }}
        </option>
      </select>
    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <select
        class="form-select form-select"
        aria-label="Default select example"
        @change="selectshowdata($event)"
      >
        <option value="50">50</option>
      </select>
    </div>
  </div>



  <div class="row">
    <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area">
          <div
            id="html5-extension_wrapper"
            class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer"
          >
            <div class="dt--top-section">
              <div class="row">
                <div
                  class="col-sm-12 col-md-12 d-flex justify-content-md-start justify-content-center"
                >
                  <div class="dt-buttons">
                    <button
                      class="dt-button buttons-excel buttons-html5 btn" @click="ExportExcel()"
                      tabindex="0"
                      aria-controls="html5-extension"
                    >
                      <span>Excel</span>
                    </button>
                  </div>
                </div>
              
              </div>
            </div>
            <div class="table-responsive">
              <table
                id="html5-extension"
                class="table dt-table-hover dataTable no-footer"
                style="width: 100%"
                role="grid"
                aria-describedby="html5-extension_info"
              >
                <thead>
                  <tr class="cours_move">
                    <th>#</th>
                    <th>{{ $t("table_report_exam_fullname_learning") }}</th>
                    <th>{{ $t("table_report_exam_course_code") }}</th>
                    <th>{{ $t("table_report_exam_course_name_lo") }}</th>
                    <th>{{ $t("table_report_exam_total_score") }}</th>
                    <th>{{ $t("table_report_exam_total_qus_total") }}</th>
                    <th>{{ $t("table_report_exam_time") }}</th>
                    <th>{{ $t("table_report_exam_status") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in store.reportexam">
                    <td>{{ (store.formreportexam.page * store.formreportexam.per_page) - (store.formreportexam.per_page -  index) +  1 }}</td>
                    <td>
                      {{ item.fullname_exam }}
                    </td>
                    <td>
                      {{ item.course_code }}
                    </td>
                    <td>
                      {{ locale == "la" ? item.course_name_lo : item.course_name_eng }}
                    </td>
                   
                    <td>
                      {{ item.er_question_total }}
                    </td>
                    <td>
                      {{ item.er_score_total }}
                    </td>
                    <td>
                      {{ item.er_use_time }}
                    </td>
                    <td>
                      {{ item.status }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div  class="dt--bottom-section d-sm-flex justify-content-sm-between text-center">
              <div class="dt--pages-count mb-sm-0 mb-3">
                <div
                  class="dataTables_info"
                  id="html5-extension_info"
                  role="status"
                  aria-live="polite"
                >

                <span
      >Showing
      {{
        (store.reportexam_current_page - 1) * store.formreportexam.per_page +
        1
      }}
      to
      {{
        Math.min(
          store.reportexam_current_page * store.formreportexam.per_page,store.reportexam_total
        )
      }}
      of {{ store.reportexam_total }} entries</span
    >
                </div>
              </div>
              <div class="dt--pagination" v-if="store.reportexam_total_page > 1">
      <div
        class="dataTables_paginate paging_simple_numbers"
        id="zero-config_paginate"
      >
        <ul class="pagination">
          <li
            class="paginate_button page-item previous"
            id="zero-config_previous"
            @click="Prev()"
          >
            <a
              href="#"
              aria-controls="zero-config"
              data-dt-idx="0"
              tabindex="0"
              class="page-link"
            >
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
                class="feather feather-arrow-left"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline></svg ></a>
          </li>
          <li
            class="paginate_button page-item"
            v-for="page in store.reportexam_total_page"
            :key="page"
          >
            <a
              href="#"
              aria-controls="zero-config"
              data-dt-idx="1"
              tabindex="0"
              class="page-link"
              :class="{ bgc: page === store.formreportexam.page }"
              @click="setCurrentPageclick(page)"
            >
              {{ page }}</a
            >
          </li>
          <li class="paginate_button page-item next" id="zero-config_next">
            <a
              href="#"
              aria-controls="zero-config"
              @click="Next()"
              data-dt-idx="4"
              tabindex="0"
              class="page-link"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-arrow-right"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline></svg ></a>
          </li>
        </ul>
      </div>
    </div>
            </div>


  <!-- pageinate -->
</template>


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { LessonStore } from "@/store/lesson";
import { useToast } from "vue-toastification";
import ApiService from "../../services/api.service";
import moment from "moment-timezone";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
import * as XLSX from 'xlsx'
const { locale, setLocale } = useI18n();
const router = useRouter();

const toast = useToast();
const store = LessonStore();
const auth = useAuthStore();

Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

await store.fetchCourseAll();
await store.ReportCourseExam();

setTimeout(() => Swal.close(), 500);

const searchData = async () => {
  await store.ReportCourseExam();
};

const selectscourse = async (x) => {
  Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  store.formreportexam.page = 1;
  await store.selectentirescourse(x.target.value);
  await store.ReportCourseExam();
  setTimeout(() => Swal.close(), 500);
};
const setCurrentPageclick = async (page) => {
  Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  await store.setCurrentPageReportExam(page);
  await store.ReportCourseExam();

  setTimeout(() => Swal.close(), 500);
};


const ExportExcel = async () => {
  const data = store.reportexam;
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  // Generate a binary string representation of the workbook
  const workbookBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' })

  // Convert the binary string to a Blob
  const arrayBuffer = new ArrayBuffer(workbookBinary.length)
  const uintArray = new Uint8Array(arrayBuffer)
  for (let i = 0; i < workbookBinary.length; i++) {
    uintArray[i] = workbookBinary.charCodeAt(i) & 0xFF
  }
  const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' })

  // Create a link element and trigger the download
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'exam.xlsx')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
};



function coverttime(date) {
  const datetime = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDatetime = datetime.toLocaleString(undefined, options);

  return formattedDatetime;
}

function image(i) {
  let im = ApiService.image(i);
  return im;
}
</script>
<style>
.dt--pagination {
  float: right;
}

/* .modal-content {
  background-color: white;
  padding: 20px;
  width: 70%;
} */

/* @media only screen and (min-width: 576px) {

.modal-content {
background-color: white;
padding: 20px;
width: 100%;
}
} */

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}
</style>