<template>

<div class="row layout-top-spacing">
        <div class="col-xl-12">
          <div class="widget-content widget-content-area br-8 p-4">
            <div class="widget-header">
              <div class="row">
                <div class="col-xl-10 col-sm-12 col-10">
                  <h4> {{ $t("menu_dlt_title_user") }}</h4>
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
                <label for="exampleFormControlFile1" class="fw-bold text-nowrap">
                  ປະເພດອະນຸຍາດ:</label
                ><span class="text-xs text-red-500" style="color: red">
                  *
                </span>

                <div class="col-md-12 mt-3">
                  <div class="form-check form-check-primary form-check-inline"  v-for="(item, index) in store.dlt">

<input
      type="checkbox"
      :id="item.value"
      :value="item.dlt_code"
     class="form-check-input"
      v-model="store.formadddtl.dlt_code"
    />
<label class="form-check-label" for="form-check-default">
    {{item.dlt_code}}
</label>
</div>

                </div>

                <div v-if="locale == 'la'">
        <span v-if="v$.dlt_code.$error" class="text-xs text-red-500" style="color: red">
          ຕ້ອງມີຊ່ອງຂໍ້ມູນວັນທີອອກ</span>
      </div>

      <div v-if="locale == 'en'">
        <span v-if="v$.dlt_code.$error" class="text-xs text-red-500" style="color: red">
          The Issue Date field is required</span>
      </div>
              </div>

              <div class="col-md-6 mt-3">
                <label for="exampleFormControlFile1" class="fw-bold text-nowrap">
                 ວັນທີອອກບັດ</label
                >

                <div class="col-md-3 mt-3">
                  <Datepicker v-model="store.formadddtl.issue_date" :format="format_start"    :disabledDates="store.disabledDates"/>
               
                </div>
                    <div v-if="locale == 'la'">
        <span v-if="v$.issue_date.$error" class="text-xs text-red-500" style="color: red">
          ຕ້ອງມີຊ່ອງຂໍ້ມູນວັນທີອອກ</span>
      </div>

      <div v-if="locale == 'en'">
        <span v-if="v$.issue_date.$error" class="text-xs text-red-500" style="color: red">
          The Issue Date field is required</span>
      </div>
              </div>
              <div class="col-md-3 mt-3">
                <label for="exampleFormControlFile1" class="fw-bold text-nowrap">
                 ວັນ​ຫມົດ​ອາ​ຍຸ</label
                >

                <div class="col-md-3 mt-3">
                  <Datepicker v-model="store.formadddtl.expiry_date" :format="format_end"  :disabledDates="store.disabledDatesEnd"/>
               
                </div>
                    <div v-if="locale == 'la'">
        <span v-if="v$.issue_date.$error" class="text-xs text-red-500" style="color: red">
          ຕ້ອງມີຊ່ອງຂໍ້ມູນວັນທີອອກ</span>
      </div>

      <div v-if="locale == 'en'">
        <span v-if="v$.issue_date.$error" class="text-xs text-red-500" style="color: red">
          The Issue Date field is required</span>
      </div>
              </div>

      
<br>


              <div class="col-md-6 mt-3">
              <div class="form-group mb-4 mt-3 d-flex">
            <label for="exampleFormControlFile1" class="fw-bold text-nowrap"
              >ບັດ​ປະ​ຈໍາ​ຕົວ</label
            >
            <input
              type="file"
              class="form-control-file ms-4"
              id="exampleFormControlFile2"
              @change="onFileChangeFull"
              ref="fileupload"
            />
          </div>

          <div class="border p-2 mt-3">
            <p>ເລກບັດປະຈຳຕົວ</p>
            <template v-if="store.formadddtl.full_name">
              <div class="row">
                <div id="image-container" class="col-md-9 col-sm-9 col-">
                  <div class="image-wrapper">
                    <img
                      :src="coverimage(store.formadddtl.full_name)"
                      class="img-fluid"
                    />
                    <button
                      @click="removeImage('back_img')"
                      class="delete-button"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
   

   
             </div>


             <div class="col-md-6 mt-3">
              <div class="form-group mb-4 mt-3 d-flex">
            <label for="exampleFormControlFile1" class="fw-bold text-nowrap"
              >ທີ່ຢູ່
              </label
            >
            <input
              type="file"
              class="form-control-file ms-4"
              id="exampleFormControlFile2"
              @change="onFileChangeAdd"
              ref="fileupload"
            />
          </div>

          <div class="border p-2 mt-3">
            <p>{{ $t("menu_dlt_image_display") }}:</p>
            <template v-if="store.formadddtl.address">
              <div class="row">
                <div id="image-container" class="col-md-9 col-sm-9 col-">
                  <div class="image-wrapper">
                    <img
                      :src="coverimage(store.formadddtl.address)"
                      class="img-fluid"
                    />
                    <button
                      @click="removeImage('back_img')"
                      class="delete-button"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>

    
             </div>

             <div class="col-md-6 mt-3">
              <div class="form-group mb-4 mt-3 d-flex">
            <label for="exampleFormControlFile1" class="fw-bold text-nowrap"
              >ດ້ານໜ້າ
              </label
            >
            <input
              type="file"
              class="form-control-file ms-4"
              id="exampleFormControlFile2"
              @change="onFileChangeFront"
              ref="fileupload"
            />
          </div>

          <div class="border p-2 mt-3">
            <p>{{ $t("menu_dlt_image_display") }}:</p>
            <template v-if="store.formadddtl.front_img">
              <div class="row">
                <div id="image-container" class="col-md-9 col-sm-9 col-">
                  <div class="image-wrapper">
                    <img
                      :src="coverimage(store.formadddtl.front_img)"
                      class="img-fluid"
                    />
                    <button
                      @click="removeImage('back_img')"
                      class="delete-button"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
          
      
             </div>

             

             <div class="col-md-6 mt-3">
              <div class="form-group mb-4 mt-3 d-flex">
            <label for="exampleFormControlFile1" class="fw-bold text-nowrap"
              >ຫລັງ</label
            >
            <input
              type="file"
              class="form-control-file ms-4"
              id="exampleFormControlFile2"
              @change="onFileChangeBack"
              ref="fileupload"
            />
          </div>

          <div class="border p-2 mt-3">
            <p>{{ $t("menu_dlt_image_display") }}:</p>
            <template v-if="store.formadddtl.back_img">
              <div class="row">
                <div id="image-container" class="col-md-9 col-sm-9 col-">
                  <div class="image-wrapper">
                    <img
                      :src="coverimage(store.formadddtl.back_img)"
                      class="img-fluid"
                    />
                    <button
                      @click="removeImage('back_img')"
                      class="delete-button"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
 
             </div>
    
            <div class="row">
              <div class="col-md-12 mt-3">
                <button class="btn btn-primary mt-4" @click="Add()">{{ $t("menu_dlt_bt_save") }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { DltStore } from "@/store/dlt"; // import the auth store we just created
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import ApiService from "../../services/api.service";
import Datepicker from "vuejs3-datepicker";
import moment from "moment";
import { useI18n } from "vue-i18n";
import Swal from 'sweetalert2';
const { locale, setLocale } = useI18n();
const toast = useToast();

const store = DltStore();
const route = useRoute();
const router = useRouter();
const auth = useAuthStore()
store.user_create = auth.user_id
const { FormDLTadd } = storeToRefs(store);



const rules = computed(() => {
  return {
    issue_date: {
      required: helpers.withMessage(
        "The Issue date field is required",
        required
      ),
    },
    expiry_date: {
      required: helpers.withMessage(
          "The Expiry date field is required",
        required
      ),
    },   
    dlt_code: {
      required: helpers.withMessage(
          "The Expiry date field is required",
        required
      ),
    },

  
  };
});
;
const v$ = useVuelidate(rules, FormDLTadd);

const Add = async () => {
  v$.value.$validate();
   if (!v$.value.$error) {


    if(store.StatusMethod === 'update'){
     
   let full = await store.UploadfileFull();
    let add = await store.UploadfileAdd();
    let back = await store.UploadfileFullBack();
    let front = await store.UploadfileFullFront();
  const updated = await store.UpdateFormDlt();

    if(updated === true){
      toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດ');
    }else {
      toast.error('ບັນທຶກຂໍ້ມູນລົ້ມເຫລວ')
    }


    }

    if(store.StatusMethod === 'insert'){
       
    let full = await store.UploadfileFull();
    let add = await store.UploadfileAdd();
    let back = await store.UploadfileFullBack();
    let front = await store.UploadfileFullFront();
    const save = await store.SaveFormDlt();
    

    if(save === true){
      toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດ');
    }
    else {
      toast.error('ບັນທຶກຂໍ້ມູນລົ້ມເຫລວ')
    }
    }

  // const save = await store.SaveFormDlt();
//   if(save == true){
//     await store.ResetForm();
// toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດ');

// let finddtl = await store.fetchDlt(route.params.id);
// if (finddtl == true) {

// } else {
//   toast.error('Can not Data')
// }
// }else {
// toast.error('ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ')
// }
  }
};

const removeImage = async (item) => {
  if (item == "front_img") {
    store.formadddtl.front_img = null;
     const input = document.querySelector('#exampleFormControlFile1');
  input.value = "";
  }
  if (item == "back_img") {
    store.formadddtl.back_img = null;
     const input = document.querySelector('#exampleFormControlFile2');
  input.value = "";
  }

};



const onFileChangeFront = async (event) => {
  var input = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag
   
    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formadddtl.front_img = reader.result;
    };
    store.imagelistFront = input.files[0];
    reader.readAsDataURL(file);
  } else {
    // Reset the image URL if the selected file is not an image
    //   this.imageUrl = null;
    const input = document.querySelector('input[type="file"]');
  input.value = "";
    Swal.fire({
      text: 'Upload File Image Only!',
      icon: 'error',
    });
  }
};

const onFileChangeAdd = async (event) => {
  var input = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag
   
    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formadddtl.address = reader.result;
    };
    store.imagelistAdd = input.files[0];
    reader.readAsDataURL(file);
  } else {
    // Reset the image URL if the selected file is not an image
    //   this.imageUrl = null;
    const input = document.querySelector('input[type="file"]');
  input.value = "";
    Swal.fire({
      text: 'Upload File Image Only!',
      icon: 'error',
    });
  }
};


const onFileChangeFull = async (event) => {
  var input = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag
   
    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formadddtl.full_name = reader.result;
    };
    store.imagelistFull = input.files[0];
    reader.readAsDataURL(file);
  } else {
    // Reset the image URL if the selected file is not an image
    //   this.imageUrl = null;
    const input = document.querySelector('input[type="file"]');
  input.value = "";
    Swal.fire({
      text: 'Upload File Image Only!',
      icon: 'error',
    });
  }
};

const format_start = (date) => {
  store.formadddtl.issue_date = moment(date).format("YYYY-MM-DD");

  store.disabledDatesEnd.to = new Date(store.formadddtl.issue_date + 1)
  return moment(date).format("YYYY-MM-DD");
};

const format_end = (date) => {
  store.formadddtl.expiry_date = moment(date).format("YYYY-MM-DD");
  store.disabledDates.from = new Date(store.formadddtl.expiry_date)
  return moment(date).format("YYYY-MM-DD");
};




const backtoLean = async () => {

await router.push('/dltmanage');
}

const onFileChangeBack = async (event) => {
  var input = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag
   
    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formadddtl.back_img = reader.result;
    };
    store.imagelistBack = input.files[0];
    reader.readAsDataURL(file);
  } else {
    // Reset the image URL if the selected file is not an image
    //   this.imageUrl = null;
    const input = document.querySelector('input[type="file"]');
  input.value = "";
    Swal.fire({
      text: 'Upload File Image Only!',
      icon: 'error',
    });
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

 