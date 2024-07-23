


<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

import { useAuthStore } from "@/store/auth";
import ExamEdit from "@/components/examination/ExamEdit.vue";

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
  <ExamEdit></ExamEdit>
 
</template>

<style></style>