


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { AppointStore } from "@/store/appoint";
import AppointList from "@/components/appointment/AppointList.vue";
import AppointListByGroup from "@/components/appointment/AppointListByGroup.vue";

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


await store.fetchAppPresentToday();
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
                      <button @click="CreateAppo()"
                            class="changeImg btn btn btn-primary"
                          >
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
          <div class="card">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                  class="collapsed accordion-buttonaa"
                  
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionOne"
                  aria-expanded="true"
                  aria-controls="defaultAccordionOne"
                >
                ຊ່ອງເວລາ 08.00 A : Two-wheels motocycle, engine not exceed 125cc
                
                </div>

            
          
              </section>
            </div>

            <div
              id="defaultAccordionOne"
                   class="collapse"
      
              data-bs-parent="#toggleAccordion1"
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
          <br>
          <div class="card">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                 class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionTwo"
                  aria-expanded="false"
                  aria-controls="defaultAccordionTwo"
                >
                ຊ່ອງເວລາ  16.00 - A : Two-wheels motocycle, engine not exceed 125cc
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionTwo"
              class="collapse "
              aria-labelledby="..."
              data-bs-parent="#toggleAccordion2"
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
          <br>
          <div class="card">
            <div class="card-header" id="...">
              <section class="mb-0 mt-0">
                <div
                  role="menu"
                 class="collapsed accordion-buttonaa"
                  data-bs-toggle="collapse"
                  data-bs-target="#defaultAccordionThree"
                  aria-expanded="false"
                  aria-controls="defaultAccordionThree"
                >
                ຊ່ອງເວລາ   08.00 - B : Car with four-wheels, total weight not exceed
                  3500kg, not more than 9 seats including driver
                </div>
              </section>
            </div>
            <div
              id="defaultAccordionThree"
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