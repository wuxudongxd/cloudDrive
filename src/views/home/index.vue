<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex-1">
      <Headbar />
      <Toolbar />
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Headbar from "@/components/headbar.vue";
import Toolbar from "@/components/toolbar.vue";
import Sidebar from "@/components/sidebar.vue";
</script>
