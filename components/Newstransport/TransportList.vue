<template>
 
     <div class="row">
      <div class="col-12 col-sm-12 d-flex">
      <div class="dataTables_length" id="zero-config_length">
        <label>Results :  
          <select name="zero-config_length" aria-controls="zero-config" @change="selectshowdata($event)" >
          <option value="2">2</option>
          <option value="7">7</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option></select>
          </label>
          </div>
          </div>
          </div>
              <div class ="table-responsive">
 <table  id="example" class="table table-bordered" style="width:100%">
                                    <thead>
                                        <tr>
                                           <th>#</th>
                                           <!-- <th><input type="checkbox"  v-model="store.isAllSelected" @click="selectAll"></th> -->
                                            <th @click="sortList('id')">News Cover</th>
                                            <th @click="sortList('user_name')">News Title</th>
                                            <th @click="sortList('user_email')">News Description</th>
                                            <th @click="sortList('user_phone')">News Type</th>
                                            <th>Update</th>
                                            <th class="no-content">จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      <tr v-for="datanew in datanewstransport.data" :key="datanew.news_id">
                                        <td><input type="checkbox" v-model="store.selected" :value="datanew" number></td>
            <td>
                 <img :src="image(datanew.news_cover)" class="img-fluid" width="80" height="80" />
            </td>
            <td>{{ datanew.news_title }}</td>
            <td>{{ datanew.news_description }}</td>
            <td>{{ datanew.news_type }}</td>
            <td>{{ coverttime(datanew.udp_date) }}</td>
                                                <td>
                                                  <NuxtLink :to="'/users/' + datanew.news_id">
                                                <a class="badge badge-light-primary text-start me-2 action-edit"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></a>
                                            </NuxtLink>
                                                <a class="badge badge-light-danger text-start action-delete" @click="del(datanew.news_id)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
                                            </td>
          
          </tr>
                                    </tbody>
                                </table>
                             
   
     <div>

        <div class="dt--pagination" v-if="datanewstransport.total_page > 1">
      <div class="dataTables_paginate paging_simple_numbers" id="zero-config_paginate">
        <ul class="pagination"><li class="paginate_button page-item previous" id="zero-config_previous">
          <a href="#" aria-controls="zero-config" data-dt-idx="0" tabindex="0" class="page-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></a></li>
            <li class="paginate_button page-item " v-for="page in datanewstransport.total_page" :key="page">
              <a href="#" aria-controls="zero-config" data-dt-idx="1" tabindex="0" class="page-link" @click="setCurrentPageclick(page)">
              {{page}}</a>
              </li>
            <li class="paginate_button page-item next" id="zero-config_next"><a href="#" aria-controls="zero-config" data-dt-idx="4" tabindex="0" class="page-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a></li></ul></div>
            </div>

     </div>
  </div>

   

   </template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { newTransportStore } from '@/store/newstransport'
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
 import $ from 'jquery'
 import Paginate from "vuejs-paginate-next";

const store = newTransportStore()
const { datanewstransport } = storeToRefs(newTransportStore())
  const { deleteItem } = newTransportStore();//Action
  const { selectall } = newTransportStore(); //Action
  const { selectone } = newTransportStore();//Action
  const { setCurrentPage } = newTransportStore();//Action
  const { sortLists } = newTransportStore();//Action
  const { selectentires } = newTransportStore();//Action
  
  
  const { getSelect } = storeToRefs(store); //Get Getter
  const { getSelectALL } = storeToRefs(store); //Get Getter
  const { getPaginate } = storeToRefs(store); //Get Getter
  
store.fetchNewTransport()




 function editItem() {
    console.log('editItem');
 }

 const del = async (id) => {

 await deleteItem(id); 
 await store.fetchNewTransport()
 };
 

 const selchk = async (x) => {
  await selectone(x); 
 };

 const selectAll = async () => {
  await selectall(); 
 };

 

  function goToPage(page) {
      console.log(page)
  }


 const setCurrentPageclick = async (page) => {
  await setCurrentPage (page)
  await store.fetchNewTransport()
 };

const selectshowdata = async (x) => {

await selectentires(x.target.value);
await store.fetchNewTransport()
 };

 const sortList = async (sortBy) => {

await sortLists (sortBy)

 };

 function coverttime(date) {
const datetime = new Date(date);
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
const formattedDatetime = datetime.toLocaleString(undefined, options);

return formattedDatetime;

 }

function image(i) {

  
// const usingSplit = i.split(',');

// const image = '';
// if(usingSplit.length > 0){
//   const image = usingSplit[0];
// }
var x = null;
if(i){
console.log('if');
const usingSplit = i.split(',');
var x = usingSplit[0];
}else {
var x = 'static/upload/2023/7/files-1689561047889.jpg';
}

return "http://oasapi.iddriver.com/media_file/file/?f="+x;

 }


 



  
</script>
<style>
.dt--pagination{
  float: right;
}
</style>