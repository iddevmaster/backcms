


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
 import $ from 'jquery'



import Select from 'datatables.net-select';
import type { Header, Item } from "vue3-easy-data-table";
 
// DataTable.use(DataTablesCore);








const store = usersStore()
const { posts } = storeToRefs(usersStore())
  const { deleteItem } = usersStore();


store.fetchUsers()

const columns = [
  { data: 'id' },
  { data: 'id' },
  { data: 'id' },
  { data: 'id' },
  { data: 'id' },
  { data: 'id' },
  { data: 'id' },
];
 



  setTimeout(function(){
      $('#example').DataTable({
   
    "columnDefs": [ {
"targets": 0,
"orderable": false}]
      });


}, 500);



 function editItem() {
    console.log('editItem');
 }


 const del = async (x) => {
 await deleteItem(x); 
await store.fetchUsers()
 };
 










  
</script>

<template>


  <div id="content" class="main-content">


          
            <div class="layout-px-spacing">
              <div class="page-meta">
                        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Elements</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Breadcrumbs</li>
                            </ol>
                        </nav>
                    </div>

                <div class="middle-content container-xxl p-0">

                    <div class="row layout-top-spacing">

                     
                    

                        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                            <div class="widget-content widget-content-area br-8 p-3">
                                <!-- <DataTable
                               
      class="table table-hover table-striped"
      width="100%"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Extn.</th>
          <th>Start date</th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
      </thead>
      
      
    </DataTable> -->

    


    <!-- <table class="table" id="example">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Extn.</th>
          <th>Start date</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="user in posts.products" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.title }}</td>
            <td>3</td>
            <td>4</td>
            <td>1</td>
            <td> <img :src='user.thumbnail' width="40"></td>
            <td>3</td>
          
          </tr>
          
        </tbody>
      </table> -->


 

      <table  id="example" class="table" style="width:100%">
                                    <thead>
                                        <tr>
                                           
                                           <th><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></th>
                                            <th>ชื่อ - นามสกุล</th>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>เบอร์โทร</th>
                                            <th>สถานะ</th>
                                            <th class="no-content">จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      <tr v-for="user in posts.products" :key="user.id">
                                          <td><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></td>
            <td>{{ user.id }}</td>
            <td>{{ user.title }}</td>
            <td>3</td>
            <td>0833268813</td>
          
            <td> <img :src='user.thumbnail' width="40"></td>
             <td>
                                                <a class="badge badge-light-primary text-start me-2 action-edit" @click="editItem(user.id)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></a>
                                                <a class="badge badge-light-danger text-start action-delete" @click="del(user.id)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
                                            </td>
          
          </tr>
                                    </tbody>
                                </table>
 <span>Selected Ids: </span>


                                
    </div>
                        </div>


                      

                   


                    </div>

                </div>

            </div>
          </div>
 
       
</template>

<style>

</style>