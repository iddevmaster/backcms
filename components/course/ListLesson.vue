<template>

    <loading v-model:active="store.isLoaddingsave" :can-cancel="true" @on-cancel="onCancel"
                    />
      <div class="row mb-4 g-3">
        <div id="form_grid_layouts" class="col-lg-9">
          <div class="seperator-header">
            <h4 class=""> บทเรียน</h4>
          </div>
        </div>
        <div class="table-responsive">
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th class="checkbox-area" scope="col">
                    <div class="form-check form-check-primary">
                       #
                    </div>
                </th>
                <th scope="col">ถาม</th>
                <th scope="col">ตอบ</th>
               
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in store.lessonlist" :key="item.cs_id">
               
                <td>
                    <div class="form-check form-check-primary">
                        <input class="form-check-input hover_child" type="checkbox"  v-model="store.selected" :value="item">
                    </div>
                </td>
                <td>{{item.cs_name}}</td>
                <td>{{item.cs_description}}</td>
            </tr>
        </tbody>
    </table>
</div>

<button size="sm" @click="selectAllRows">Select all</button>
     </div>

    
      
    
     <div class="row">
    <div class="col-xl-12 col-lg-12">
      <div class="pagination-no_spacing" v-if="store.lesson_total_page > 1">
        <ul class="pagination">
          <li> <a href="javascript:void(0);" class="prev" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="feather feather-chevron-left">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg></a>
          </li>
          <li>
            <div class="col-xs-1">
              <input id="ex1" type="number" style="width:50px" v-model="store.formsearchlesson.page" min="1"  @input="validatePNumber($event)"
               >
            </div>
          </li>
          <li><a href="javascript:void(0);">/</a></li>
          <li><a href="javascript:void(0);">{{ store.lesson_total_page }}</a></li>
          <li> <a href="javascript:void(0);" class="next" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="feather feather-chevron-right">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg></a>
          </li>
        </ul>
      </div>

      <div class="pagination-no_spacing" v-else>
        <ul class="pagination">
          ไม่มีข้อมูล
        </ul>
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
    import ApiService  from "../../services/api.service";
    
    import Swal from 'sweetalert2';
    import {
      required,
      email,
      sameAs,
      minLength,
      helpers,
    } from "@vuelidate/validators";
    import { useToast } from "vue-toastification";
    import { useI18n } from "vue-i18n";
    import Loading from 'vue-loading-overlay';import 'vue-loading-overlay/dist/css/index.css';
    const { locale, setLocale } = useI18n();
    
    const toast = useToast();
    const router = useRouter();
    const store = LessonStore();

 

    
const { selectentireslesson } = LessonStore(); //Action
const { selectentiresentires } = LessonStore(); //Action


    


const selectshowdata = async (sel) => {
  await selectentiresentires(sel.target.value);
  await store.fetchLessonlist();
};

const searchData = async () => {
  await store.fetchLessonlist();
};
const selectAllRows = async () => {
    await store.SeleectAllLessonlist();
};



    
const validatePNumber = async (evt) => {
  
  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const keyPressed: string = evt.key;
  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault()
  
  }

  if (store.formsearchlesson.page == '') {
    store.pending = true;
    store.formsearchexamquestion.page = 1;
    await store.fetchLessonlist();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
    store.pending = true;

    if(store.formsearchlesson.page > store.lesson_total_page){
 store.formsearchlesson.page = store.lesson_total_page;
 await store.fetchLessonlist();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });

    }else {
      await store.fetchLessonlist();
   await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });

    }
     
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
      let im =  ApiService.image(x);
      return im;
    }
    
    
    </script>
    <style>
    
    
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
    #image-container img{
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
    
    