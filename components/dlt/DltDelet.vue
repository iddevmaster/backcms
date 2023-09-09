<template>
  <div class="col-xl-7">
    <div class="invoice-content">
      <div class="invoice-detail-body">
        <div class="invoice-detail mb-5" style="padding: 0 48px">
          <h2 class="text-center">ไม่มีข้อมูล</h2>
          
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
const toast = useToast();

const store = DltStore();
const route = useRoute();


</script>

 