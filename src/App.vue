<script setup lang="ts">
import { ref } from 'vue';
import AsyncDataComp from './AsyncDataComp.vue';
import ClientOnlySuspense from './ClientOnlySuspense.vue';

interface Props {
  serverData?: Record<string, string>;
}

defineProps<Props>();
const counter = ref(20);

const increment = () => {
  counter.value++;
};
</script>

<template>
  <div id="vue-microfrontend">
    <h1>Microfrontend App</h1>
    <p>This is a microfrontend application.</p>
    <button @click="increment">Increment</button>
    <p>Counter: {{ counter }}</p>
    <p v-if="serverData">Server Data: {{ JSON.stringify(serverData) }}</p>
    <ClientOnlySuspense>
      <AsyncDataComp />
      <template #fallback>
        <p>Loading async data...</p>
      </template>
    </ClientOnlySuspense>
  </div>
</template>
