


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
 
// DataTable.use(DataTablesCore);








const store = usersStore()
const { posts } = storeToRefs(usersStore())



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
      $('#example').DataTable();
}, 500);



  
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


      


      <table  id="example" class="table dt-table-hover" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Office</th>
                                            <th>Age</th>
                                            <th>Start date</th>
                                            <th>Salary</th>
                                            <th class="no-content">Action</th>
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
                                </table>
    </div>
                        </div>


                      

                   


                    </div>

                </div>

            </div>
          </div>
 
       
</template>

<style>

</style>