


<script setup lang="ts">
definePageMeta({
  layout: "blank"
});

</script>

<template>
  <div class="unauthorized-container">
    <h3>Server Maintenance!</h3>
    <p>
                  Please wait a moment. The system will return to normal
                  operation.
                </p>

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