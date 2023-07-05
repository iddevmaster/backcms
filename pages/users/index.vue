<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'



DataTable.use(DataTablesCore);







const store = usersStore()
const { posts } = storeToRefs(usersStore())



store.fetchUsers()

 
console.log(posts);


const columns = [
  { data: 'userId' },
  { data: 'id' },
  { data: 'title' },
  { data: 'body' },
];



const data = [
      {
        "id": "1",
        "name": "xxxxxxxxxxxxxxxxxxxx",
        "position": "System Architect",
        "salary": "$320,800",
        "start_date": "2011/04/25",
        "office": "Edinburgh",
        "extn": "5421"
      },
    
      {
        "id": "57",
        "name": "Donna Snider",
        "position": "Customer Support",
        "salary": "$112,000",
        "start_date": "2011/01/25",
        "office": "New York",
        "extn": "4226"
      }
    ]

</script>

<template>


  <div id="content" class="main-content">
            <div class="layout-px-spacing">


                <div class="middle-content container-xxl p-0">

                    <div class="row layout-top-spacing">

                     
                        
                     

                        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                            <div class="widget-content widget-content-area br-8 p-3">
                                <DataTable
                                :columns="columns"
      :data="posts.posts"
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
        </tr>
      </thead>
    </DataTable>

                            </div>
                        </div>


                      

                   


                    </div>

                </div>

            </div>
       
        </div>
</template>

<style>
@import 'datatables.net-bs5';
</style>