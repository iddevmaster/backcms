<template>
  <loading
    v-model:active="store.isLoaddingsave"
    :can-cancel="true"

  />

  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <h4 class="">{{ $t("lesson_all") }}</h4>
    </div>
  </div>

  <div class="row layout-top-spacing">
    <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="text"
        name="txt"
        placeholder="ຊອກຫາ"
        class="form-control"
        v-model="store.selectlesson_form_menu_course.search"
        @keyup="searchData"
      />
    </div>

        <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
     
      
    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">

    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="button"
        name="txt"
        placeholder="ຊອກຫາ"
        class="form-control btn-danger"
        @click="selectAllRows"
        value="ເລືອກ​ທັງ​ຫມົດ"
style="
   
    color: white;
    
"
       
      />
      
    </div>



    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <select
        class="form-select form-select"
        aria-label="Default select example" @change="selectshowdata_ch($event)"
      >

          <option  value="0"
        >
        ທັງໝົດ
      </option>
      <option  v-for="(item, index) in store.group"
          :key="item.cg_id"
          :value="item.cg_id"
        >
        {{ item.cg_name }}
      </option>
      </select>
    </div>



  </div>
  <div class="row mb-4 g-3">
    <div class="table-responsive">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th class="checkbox-area" scope="col">
              <div class="form-check form-check-primary">{{ $t("lesson_select_record") }}</div>
            </th>
            <th scope="col"> {{ $t("lesson_qui") }}</th>
                <th scope="col"> {{ $t("lesson_ans") }}</th>
                <th scope="col"> {{ $t("lesson_yout") }}</th>
                <th scope="col"> {{ $t("lesson_pic") }}</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in store.lessonlist" :key="item.cs_id">
            <td>
            
              <div >
       
<input type="button" class="btn btn-primary" value="ເລືອກ"  @click="selectAllRowsOne(item)"/>
                  
               
              </div>
            </td>
            <td>{{item.cs_name}}</td>
            <td>{{item.cs_description}}</td>     
          <td> 
            <a v-if="item.cs_video" :href="item.cs_video" target="_blank"><span class="badge badge-success">Watch click!</span></a>
            <a v-else><span class="badge badge-danger">No Video</span></a>
          </td>
               
                <td class="text-center">
                  <img :src="coverimage(item.cs_cover)" class="img-fluid" width="80" height="80" v-if="item.cs_cover">
                  <img src="../../assets/images/no_photo.jpg" class="img-fluid" width="80" height="80" v-else>
                </td>
                
          </tr>
        </tbody>
      </table>
    </div>

 
    <div class="row">



      <div class="row">
    <div class="col-xl-12 col-lg-12">
      <div class="pagination-no_spacing" v-if="store.lesson_total_page > 1">
        <ul class="pagination">
          <li>
            <a href="javascript:void(0);" class="prev" @click="Previou()"
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
                class="feather feather-chevron-left"
              >
                <polyline points="15 18 9 12 15 6"></polyline></svg ></a>
          </li>
          <li>
            <div class="col-xs-1">
              <input
                id="ex1"
                type="number"
                style="width: 50px"
                v-model="store.formlesson.page"  @input="validatePNumberSelect($event)"
                min="1"
              
              />
            </div>
          </li>
          <li><a href="javascript:void(0);">/</a></li>
          <li>
            <a href="javascript:void(0);">{{ store.lesson_total_page }}</a>
          </li>
          <li>
            <a href="javascript:void(0);" class="next"  @click="Nextu()"
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
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline></svg></a>
          </li>
        </ul>
      </div>

      <div class="pagination-no_spacing" v-else>
        <ul class="pagination">
         
        </ul>
      </div>
    </div>
  </div>
  </div>
  </div>

 
</template>
    <script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { CourseStore } from "@/store/course"; // import the auth store we just created
import { LessonStore } from "@/store/lesson";
import { useVuelidate } from "@vuelidate/core";
import ApiService from "../../services/api.service";

import Swal from "sweetalert2";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
const { locale, setLocale } = useI18n();

const toast = useToast();
const router = useRouter();
const store = LessonStore();
const stores = CourseStore();

const { selectentireslesson } = LessonStore(); //Action
const { selectentiresentires } = LessonStore(); //Action



const selectshowdata = async (sel) => {
  await selectentiresentires(sel.target.value);
  await store.fetchLessonlist();
};

const searchData = async () => {
  await store.paginatedItemsCourse() 
};
const selectAllRows = async () => {
 store.selectlesson_form.page = 1 
  await store.SeleectAllLessonlist();
  await store.CheckSelectRemove();
  await store.paginatedItemsCourse() 
  await store.paginatedItemsSelete() 
};
const UnselectAllRows = async () => {
  store.selectlesson_form.page = 1 
  await store.UnSeleectAllLessonlist();
  await store.paginatedItemsCourse() 
};

const selectAllRowsOne = async (item) => {
  store.selectlesson_form.page = 1 
  await store.SelectOneessonlist(item) 
  await store.CheckSelectRemove();
 await store.paginatedItemsCourse() 
await store.paginatedItemsSelete() 
 // await store.paginatedItemsCourse() 
 // await new Promise(resolve => setTimeout(resolve, 1000));
//  FeedData();

};
const FeedData = async () => {
  //store.isLoaddingsave = true;
await stores.paginatedItemsClear() ;
await stores.paginatedItems() 
// store.isLoaddingsave = false;


}

// const Next = async () => {
//   if (store.formsearchlesson.page == store.lesson_total_page) {
//     store.pending = true;
//     store.formsearchlesson.page = store.lesson_total_page;
//   await store.fetchLessonlist();
//     await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
//       timeout: 50,
//     });
//   } else {
//     store.formsearchlesson.page += 1;
// await store.fetchLessonlist();
//     store.pending = true;
//   }

// };

// const Prev = async () => {

//   if (store.formsearchlesson.page == 1) {
//     await store.fetchLessonlist();
//     await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
//       timeout: 50,
//     });
//   } else {
//     store.formsearchlesson.page -= 1;
//     await store.fetchLessonlist();
//     await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
//       timeout: 50,
//     });
//   }
// };

const Previou = async () => {

if(store.selectlesson_form_menu_course.page == 1){

}else {
  
  await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  store.selectlesson_form_menu_course.page -= 1
  await store.paginatedItemsCourse() 
}
};
const Nextu = async () => {
if(store.selectlesson_form_menu_course.page == store.selectlesson_form_menu_course.total_page){

}else {
  await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  store.selectlesson_form_menu_course.page += 1
  await store.paginatedItemsCourse()
}


};


const validatePNumber = async (evt) => {
  const keysAllowed: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  const keyPressed: string = evt.key;
  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault();
  }

  if (store.selectlesson_form.page == "") {
    store.pending = true;
    store.selectlesson_form.page = 1;
  await store.fetchLessonlist();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
await store.fetchLessonlist();
    store.pending = true;
  }
};


const selectshowdata_ch = async (cg) => {
  console.log(cg.target.value);
store.selectlesson_form_menu_course.cg_id = cg.target.value
 await store.paginatedItemsCourse() 
};


// const validatePNumberSelect = async (evt) => {
  
//   const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//   const keyPressed: string = evt.key;
//   if (!keysAllowed.includes(keyPressed)) {
//     evt.preventDefault()
  
//   }

//   if (store.selectlesson_form_menu_course.page == "") {
//     store.selectlesson_form_menu_less.page = 1;
//   //  await store.fetchLessonlist();
//   await store.paginatedItemsCourse() 
//     await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
//       timeout: 50,
//     });
//   } else if(store.selectlesson_form_menu_course.page > store.selectlesson_form_menu_course.total_page){
//     store.selectlesson_form_menu_course.page = store.selectlesson_form_menu_course.total_page;
//     await store.paginatedItemsCourse() 
//     await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
//       timeout: 50,
//     });
//   }else {
//     store.pending = true;
//     await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
//       timeout: 50,
//     });
//     await store.paginatedItemsCourse() 
//   }

// }


const validatePNumberSelect = async (evt) => {

  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const keyPressed: string = evt.key;
  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault()
  
  }
  console.log(store.formsearchlesson.page);
  console.log(store.lesson_total_page);

  if (store.formsearchlesson.page == "") {
    store.formsearchlesson.page = 1;
await store.fetchLessonlist();
 // await store.paginatedItemsCourse() 
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else if(store.formsearchlesson.page > store.lesson_total_page){
   
    store.formsearchlesson.page = store.lesson_total_page;
    
  //  await store.paginatedItemsCourse() 
  await store.fetchLessonlist();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }else {
    store.pending = true;
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
    store.formsearchlesson.page += 1;
    await store.fetchLessonlist();
  //  await store.paginatedItemsCourse() 
  }

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

function image(i) {
  var x = null;
  if (i) {
    const usingSplit = i.split(",");
    var x = usingSplit[0];
  } else {
    var x = "static/upload/2023/9/files-riRE6hEnHI.jpg";
  }
  let im = ApiService.image(x);
  return im;
}
</script>
    <style>
.seperator-headerx {
  background: transparent;
  box-shadow: none;
  border-radius: 0;
}

.seperator-headerx h4 {
  margin-bottom: 0;
  line-height: 1.4;
  padding: 5px 8px;
  font-size: 15px;
  border-radius: 4px;
  letter-spacing: 1px;
  display: inline-block;
  background: rgba(0, 150, 136, 0.26);
  color: #009688;
  font-weight: 500;
}
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio (change this value as per your video's aspect ratio) */
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
}
#image-container img {
  width: 250px;
  height: 250px;
  object-fit: cover;
}
#image-container .delete-button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border: none;
  padding: 2.5px 5px;
  cursor: pointer;
}
#image-container .image-wrapper {
  position: relative;
  display: inline-block;
  margin: 10px;
  border: 1px solid;
}
#image-container {
  width: fit-content;
  min-width: 200px;
  min-height: 200px;
  max-width: 300px;
  max-height: 300px;
}
</style>
    
    