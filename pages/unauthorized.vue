


<script setup lang="ts">
definePageMeta({
  layout: "blank"
});

</script>

<template>
  <div class="unauthorized-container">
    <h1>Unauthorized Access</h1>
    <p>You do not have the necessary permissions to view this page.</p>
    <nuxt-link to="/">Back to Home</nuxt-link>
  </div>
</template>

<style scoped>
.unauthorized-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>