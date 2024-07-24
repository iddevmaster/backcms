


<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

import { useAuthStore } from "@/store/auth";
import ExamCreate from "@/components/examination/ExamCreate.vue";

import { useToast } from "vue-toastification";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

definePageMeta({
  middleware: ["auth", "roles"],
  allowedRoles: [1, 2],
});
</script>

<template>
  <ExamCreate></ExamCreate>
 
</template>



<style></style>