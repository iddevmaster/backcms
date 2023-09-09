<template>
  <div class="row mb-4 p-3">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">ฟอร์ม เพิ่มนัดหมาย</h4>
      </div>
    </div>
    <div id="form_grid_layouts" class="col-lg-2">
      <div class="seperator-header" style="text-align: center;" @click="backToUser()">
        <button class="btn btn-primary additem _effect--ripple waves-effect waves-light">กลับหน้านัดหมาย</button>
      </div>
    </div>
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">Quota</label>
    </div>



    <div class="col-sm-6">
      <label for="exampleFormControlInput1">Remark</label>
   
    </div>


  </div>


  <div class="row mb-4 p-3">
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">ประเภทผู้ใช้งาน</label>
  
    </div>


    <div class="col-sm-6">
      <label for="exampleFormControlInput1">สถานะ</label>
  
    </div>
  </div>

  <div class="row p-3">
      <div class="row d-flex justify-content-end mb-2  gap-2 filter">
        <div class="col-xl-2 col-lg-2 col-sm-2 searchBar">
          <div class="input-group input-group-sm">
            <input type="search" class="form-control form-control-sm" >
            <span class="input-group-text"><i class="bi bi-search"></i></span>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-sm-2">
          <select class="form-select form-select-sm" aria-label="Default select example">
            <option selected disabled>select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>ชื่อ-นามสกุล</th>
            <th>วันที่ทำการจอง</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>01</td>
            <td>Meanie</td>
            <td>{{ new Date().getDate() }} / {{ new Date().getMonth() }} / {{ new Date().getFullYear() }}</td>
          </tr>
        </tbody>
      </table>
  </div>



 
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { AppointStore } from '@/store/appoint'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment-timezone';



const toast = useToast()
const router = useRouter();
const store = AppointStore();




const date = ref(new Date());





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
.selectFilter {

}
.searchBar {

}
.filter {
  flex-wrap: wrap;
}
</style>
