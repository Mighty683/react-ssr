<script setup lang="ts">
import { ref, onMounted } from 'vue';


const isClient = ref(false);

onMounted(() => {
  isClient.value = true;
});
</script>

<template>
  <template v-if="!isClient">
    <slot name="fallback">
    </slot>
  </template>
  <Suspense v-else>
    <template #default>
      <slot></slot>
    </template>
    <template #fallback>
      <slot name="fallback">
      </slot>
    </template>
  </Suspense>
</template>