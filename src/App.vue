<script setup>
import { NConfigProvider } from "naive-ui";
</script>

<template>
  <n-config-provider theme="dark">
    <div class="container mx-auto px-4 py-8">
      <router-view />
    </div>
  </n-config-provider>
</template>
