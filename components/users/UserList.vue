<template>
 
     
 <table  id="example" class="table" style="width:100%">
                                    <thead>
                                        <tr>
                                           
                                           <th><input type="checkbox"  v-model="store.isAllSelected" @click="selectAll"></th>
                                            <th>ชื่อ - นามสกุล</th>
                                            <th>Username</th>
                                            <th>อีเมล</th>
                                            <th>เบอร์โทร</th>
                                            <th>อัพเดทล่าสุด</th>
                                            <th class="no-content">จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      <tr v-for="user in posts.data" :key="user.user_id">
                                        <td><input type="checkbox" v-model="store.selected" :value="user" number></td>
            <td>{{ user.user_firstname }} {{ user.user_lastname }}</td>
            <td>{{ user.user_name }}</td>
            <td>{{ user.user_email }}</td>
            <td>{{ user.user_phone }}</td>
            <td>{{ coverttime(user.udp_date) }}</td>
          

            <!-- "user_name": "rkknoob",
            "user_firstname": "xx1",
            "user_lastname": "xx2",
            "user_email": "rkknoob@gmail.com",
            "user_phone": "0833268813",
            "user_type": 3, -->
         
             <td>
                                                <a class="badge badge-light-primary text-start me-2 action-edit" @click="editItem(user.id)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></a>
                                                <a class="badge badge-light-danger text-start action-delete" @click="del(user.id)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
                                            </td>
          
          </tr>
                                    </tbody>
                                </table>
                                {{store.selected}}
   
   </template>



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


const store = usersStore()
const { posts } = storeToRefs(usersStore())
  const { deleteItem } = usersStore();//Action
  const { selectall } = usersStore(); //Action
  const { selectone } = usersStore();//Action
  const { getSelect } = storeToRefs(store); //Get Getter
  const { getSelectALL } = storeToRefs(store); //Get Getter
  
  
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
 

 const selchk = async (x) => {
  await selectone(x); 
 };

 const selectAll = async () => {
  await selectall(); 
 };

 

 function coverttime(date) {
const datetime = new Date(date);
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
const formattedDatetime = datetime.toLocaleString(undefined, options);

return formattedDatetime;

 }



  
</script>
