<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { ExamquestionStore } from "@/store/examquestion";
import TableChoice from "@/components/examination/TableChoice.vue";
import { useAuthStore } from "@/store/auth";

import { useVuelidate } from "@vuelidate/core";
import { useToast } from "vue-toastification";
import ApiService from "../../services/api.service";
import { useI18n } from "vue-i18n";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import Swal from "sweetalert2";

import { ref, computed, watch, onMounted } from "vue";
import 'vue-loading-overlay/dist/css/index.css';

import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";


const { locale, setLocale } = useI18n();

const auth = useAuthStore();
const store = ExamquestionStore();

const toast = useToast();
const router = useRouter();

const { formExamqedit } = storeToRefs(store);

// fetchdata();
Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
      
    },
  });

await store.fetchGrouplist();
await store.fetchExamquestionlistEdit(router.currentRoute.value.params.id);
await store.RemoveChoice();






 await setTimeout(() => Swal.close(), 500);
// await store.ManageChoice();


const rules = computed(() => {
  return {
    eq_name_lo: {
      required: helpers.withMessage(
        "The Course Code field is required",
        required
      ),
      minLength: minLength(1),
    },
    eq_name_eng: {
      required: helpers.withMessage(
        "The Course Code field is required",
        required
      ),
      minLength: minLength(1),
    },
    eq_answer: {
      required: helpers.withMessage(
        "The Course Code field is required",
        required
      ),
      minLength: minLength(1),
    },
  };
});

const v$ = useVuelidate(rules, formExamqedit);

const backtoLean = async () => {
  await router.push("/exam");
};

const fileInputRef = ref(null);
const openFileInput = async () => {
  // fileInputRef.value.click();
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
};

// const save = async () => {
//   v$.value.$validate();

//   if (!v$.value.$error) {
//     let uploadfile = await store.UploadfileExamq();   ///////////upload รูป
//     let save = await store.SaveExamquest();  ///////////save 
  
//     if(save == true){
//       console.log('save chioc ต่อ',save);
//       let savechoice = await store.SaveExamquestChoice();  ///////////save 
//     }


//   }
// };

const upda = async () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
  });
 let uploadfile = await store.UploadfileExamq();   ///////////upload รูป
 
   let updatechoice = await store.fetchExamquUpdateChoice();  ///////////save 
 //  let updatechoice = await store.fetchExamquUpdateChoice();  ///////////save 

   if(updatechoice == true){

let updateeq = await store.ExamquestionlistEditUpdate();  ///////////save 
if(updateeq == true){
  setTimeout(() => Swal.close(), 500);
  toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ');
  await router.push('/exam');
  
}else {
  toast.error("ບັນທຶກລົ້ມເຫລວ.");

}
   }



    // if(save == true){
    //   console.log('save chioc ต่อ',save);
    //   let savechoice = await store.SaveExamquestChoice();  ///////////save 
    // }


  }
};


const selecttype = async (item) => {
  await store.selecttypes(item.target.value);
  
};
 

const remove = async (e) => {
  store.selectedFiles.splice(e, 1); // Remove the file at the specified index
};

const onInputamount = async (event) => {
 if (event.data === ' ') {
        store.formExamq.eq_answer = store.formExamq.eq_answer.substring(0, store.formExamq.eq_answer.length - 1);
        return;
      }
      if (store.formExamq.eq_answer.charAt(0) == '0') {
        store.formExamq.eq_answer = "";
        return;
      } 
      store.formExamq.eq_answer = event.target.value.replace(/\D/g, "");
}


function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

const onFileChangeBack = async (event) => {
  var input = event.target;
  const file = event.target.files[0];
  const idxDot = file.name.lastIndexOf(".") + 1;
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const extFile = file.name.substr(idxDot, file.name.length).toLowerCase();

  if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
    //TO DO
    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formExamqedit.eq_image = reader.result;
    };
    store.imagelist = input.files[0];
    reader.readAsDataURL(file);
  } else {
    const input = document.querySelector('input[type="file"]');
    input.value = "";
    Swal.fire({
      text: "Upload File Image PNG JPG!",
      icon: "error",
    });
  }
};

const removeImage = async () => {
  store.formExamq.eq_image = null;
  const input = document.querySelector('input[type="file"]');
  input.value = "";
};

const onFileChangeBackPdf = async (event) => {
  Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  var input = event.target;

  if (event.target.files.length > 0) {
    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      if (file && file.type.startsWith("application/pdf")) {
        store.selectedFiles.push(event.target.files[i]);
      } else {
        store.selectedFilesError.push(event.target.files[i]);
      }
    }
  }

  setTimeout(() => Swal.close(), 500);

  if (store.selectedFilesError.length > 0) {
    store.openModalError = true;
  }
};
</script>

<template>
  <div id="content" class="main-content">
    <loading v-model:active="store.isLoading" :can-cancel="true"
    />
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">{{ $t("menu_couse") }} </a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ $t("menu_couse_p_title") }}
            </li>
          </ol>
        </nav>
      </div>
      <div class="row layout-top-spacing">
          <div class="doc-container">
            <div class="row">
              <div class="col-xl-12">
                <div class="widget-content widget-content-area br-8 p-4">
                  <div class="widget-header">
                    <div class="row">
                      <div class="col-xl-10 col-sm-12 col-10">
                        <h4>ແກ້ໄຂແບບທົດສອບ</h4>
                      </div>
                      <div
                        class="col-xl-2 col-sm-12 col-12"
                        style="text-align: center"
                      >
                        <button
                          type="button"
                          class="btn btn-primary additem _effect--ripple waves-effect waves-light bt-back-mo"
                          @click="backtoLean()"
                        >
                          {{ $t("backto_lean") }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />

                  <div class="row">

                    <div class="col-md-12 mt-3">
                      <label for="inputEmail4" class="form-label">
                        ໝວດວິຊາ</label
                      ><span class="text-xs text-red-500" style="color: red">
                        *
                      </span>
              
   
        <select class="form-control" v-model="store.cg_id"  @change="selecttype($event)"  >
          <option v-for="(item, index) in store.group" :key="item.cg_id" :value="item.cg_id" >
            {{ locale == "la" ? item.cg_name_lo : item.cg_name_eng }}
          </option>
        </select>
                    </div>

                    <div class="col-md-12 mt-3">
                      <label for="inputEmail4" class="form-label">
                        ຄໍາຖາມ(Lo)</label
                      ><span class="text-xs text-red-500" style="color: red">
                        *
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                        placeholder="ຄໍາຖາມ(Lo)"
                        v-model="store.formExamqedit.eq_name_lo"
                        :class="{
                          'border-red-500 focus:border-red-500':
                            v$.eq_name_lo.$error,
                          'border-[#42d392] ': !v$.eq_name_lo.$invalid,
                        }"
                        @change="v$.eq_name_lo.$touch"
                        maxlength="20"
                      />

                      <div v-if="locale == 'la'">
                        <span
                          v-if="v$.eq_name_lo.$error"
                          class="text-xs text-red-500"
                          style="color: red"
                          >ຕ້ອງມີຊ່ອງຂໍ້ມູນລະຫັດຫຼັກສູດ</span
                        >
                      </div>

                      <div v-if="locale == 'en'">
                        <span
                          v-if="v$.eq_name_lo.$error"
                          class="text-xs text-red-500"
                          style="color: red"
                          >The Course Code field is required</span
                        >
                      </div>
                    </div>

                    <div class="col-md-12 mt-3">
                      <label for="inputPassword4" class="form-label">ຄໍາຖາມ(En)</label
                      ><span class="text-xs text-red-500" style="color: red">
                        *
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        id="inputPassword4"
                        placeholder="ຄໍາຖາມ(En)"
                        v-model="store.formExamqedit.eq_name_eng"
                        :class="{
                          'border-red-500 focus:border-red-500':
                            v$.eq_name_eng.$error,
                          'border-[#42d392] ': !v$.eq_name_eng.$invalid,
                        }"
                        @change="v$.eq_name_eng.$touch"
                        maxlength="100"
                      />
                      <div v-if="locale == 'la'">
                        <span
                          v-if="v$.eq_name_eng.$error"
                          class="text-xs text-red-500"
                          style="color: red"
                          >ຕ້ອງມີຊ່ອງໃສ່ຊື່ຫຼັກສູດ.</span
                        >
                      </div>

                      <div v-if="locale == 'en'">
                        <span
                          v-if="v$.eq_name_eng.$error"
                          class="text-xs text-red-500"
                          style="color: red"
                        >
                          The Course Name field is required.</span
                        >
                      </div>
                    </div>


                    <div class="col-md-12 mt-3">
                      <label for="inputPassword4" class="form-label">ຄໍາຕອບ</label
                      ><span class="text-xs text-red-500" style="color: red">
                        *
                      </span>
          
                      <select class="form-control" v-model="store.formExamqedit.eq_answer"   >
          <option :value="1">
            ກ
          </option>
          <option :value="2">
            ຂ
          </option>
          <option :value="3">
            ຄ
          </option>
          <option :value="4">
            ງ
          </option>
        </select>
               
                    </div>


                    <div class="form-group mb-4 mt-3">
                      <label for="exampleFormControlFile1">{{
                        $t("menu_couse_f_title_picture")
                      }}</label>
                      <input
                        type="file"
                        class="form-control-file"
                        id="exampleFormControlFile1"
                        @change="onFileChangeBack"
                        ref="fileupload"
                        accept="image/png, image/jpeg"
                      />
                    </div>

                    <div class="border p-2 mt-3">
                      <p>{{ $t("menu_couse_f_title_display_picture") }}:</p>
                      <template v-if="store.formExamqedit.eq_image">
                        <div class="row">
                          <div
                            id="image-container"
                            class="col-md-3 col-sm-4 col-6"
                          >
                            <div class="image-wrapper">
                              <img
                                :src="coverimage(store.formExamqedit.eq_image)"
                                class="img-fluid"
                              />
                              <button
                                @click="removeImage()"
                                class="delete-button"
                              >
                                <i class="bi bi-x-lg"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                    <TableChoice></TableChoice>
                    <div class="form-group">
                      <div class="col-md-12 mt-3">
                        <button
                          type="button"
                          class="btn btn-success"
                          @click="upda()"
                        >
                          {{ $t("menu_couse_f_save") }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>


    </div>
  </div>
</template>

<style>
#exampleFormControlFilePdf {
  opacity: 0;
}

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

@media (min-width: 400px) {
  .bt-back-mo {
    width: 100%;
  }
}
</style>