<script setup lang="ts">

const clientData = await new Promise((resolve) => {
  setTimeout(() => {
    resolve({ message: 'This is client data' });
  }, 1000);
});
</script>

<template>
  <div id="vue-microfrontend">
    <p>Client Data: {{ JSON.stringify(clientData) }}</p>
  </div>
</template>