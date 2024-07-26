

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useAuthStore } from "@/store/auth";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import ExamView from "@/components/examination/ExamView.vue";
definePageMeta({
  middleware: ["auth", "roles"],
  allowedRoles: [1, 2],
});
</script>

<template>
  <ExamView></ExamView>
 
</template>

<style></style>