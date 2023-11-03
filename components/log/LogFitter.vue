<template>
  <div class="row mb-4">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">Fitter</h4>
      </div>
    </div>

    <div class="col-sm-12">
      <label for="exampleFormControlInput1">Fiiter Type</label>
      <select class="form-control" v-model="store.formfitter.type">
        <option value="1">Lesson</option>
        <option value="2">Course</option>
        <option value="3">Course && User</option>
      </select>
    </div>
    <div class="col-sm-12">
      <label for="exampleFormControlInput1">Year</label>
      <select class="form-control" v-model="store.formfitter.year">
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
      </select>
    </div>


    <div class="col-sm-12">
      {{ store.formfitter }}
      <label for="exampleFormControlInput1">Course ID</label>
      <select class="form-control" v-model="store.formfitter.course_id" @change="onChange($event)">
        <option disabled :value="null">
          เลือก
        </option>
        <option v-for="(item, i) in store.courselist" :value="item.course_id">
          {{ item.course_name }}
        </option>
      </select>
    </div>

    <div class="col-sm-12" v-if="store.formfitter.type != '2' && store.formfitter.type != '3'">
      <label for="exampleFormControlInput1">Lesson ID</label>
      <select class="form-control" v-model="store.formfitter.cs_id">
        <option disabled :value="null">
          เลือก
        </option>
        <option v-for="(less, i) in store.lessonlist" :value="less.cs_id" v-if="store.lessonlist">
          {{ less.cs_name }}
        </option>
      </select>
    </div>
  </div>
  <div class="row layout-top-spacing" v-if="store.formfitter.type == '3'">
    <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
      <input type="text" class="form-control" id="inputEmail3" placeholder="ค้นหา User *" maxlength="10"
        v-model="store.formuser.search" @keyup="searchData">
    </div>
  </div>

  <div class="col-sm-12" v-if="store.formfitter.type == '3'">
    <div class="table-responsive">
      <table id="example" class="table table-bordered" style="width:100%">
        <thead>
          <tr>
            <th>{{ $t("menu_result_name") }} &#8597;</th>
            <th>{{ $t("menu_result_phone") }} &#8597;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(users, index) in store.userall" :key="users.user_id" @click="Sel(users.user_id)"
            :class="{ 'table-success': store.myChoose === users.user_id }">
            <td>{{ users.user_firstname }} {{ users.user_lastname }}</td>
            <td>{{ users.user_phone }}</td>
          </tr>
        </tbody>
      </table>


    </div>
  </div>





  <button type="button" class="btn btn-primary" @click="search()">ค้นหา</button>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { LogStore } from '@/store/log'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
import { doesNotReject } from 'assert';
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();
import Swal from 'sweetalert2';


const toast = useToast()
const router = useRouter();
const store = LogStore();

const year = new Date().getFullYear();
await store.formfitter.year = year;

await store.fetchCourslist()


const searchData = async () => {
  store.myChoose = [];
  await store.fetchUsers()
};

const search = async () => {


  if (store.formfitter.type == '1') {
    if(store.formfitter.cs_id == null){
      Swal.fire({
    text: 'กรุณาเลือก Lesson ที่มีบทเรียน !',
    icon: 'error',
  });

    }else {
      store.fetchReport();
    }


  }
  if (store.formfitter.type == '2') {
    Swal.fire({
    text: 'Upload File Image Only2!',
    icon: 'error',
  });

  if(store.formfitter.course_id == null){
      Swal.fire({
    text: 'กรุณาเลือก Course!',
    icon: 'error',
  });

    }else {
      store.fetchReport();
    }

  }
  if (store.formfitter.type == '3') {

    



  }
 
};

const onChange = async (event) => {
  store.formfitter.cs_id = null;
  await store.fetchLesson();

};



const Sel = async (id) => {
  store.formfitter.user_id = id;
  store.myChoose = id;

}

const backToUser = async () => {
  router.go(-1);
}

</script>

<style>
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
