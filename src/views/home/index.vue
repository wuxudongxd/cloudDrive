<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Headbar />
      <Toolbar />
      <router-view class="flex-1 overflow-auto" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Headbar from "@/components/headbar.vue";
import Toolbar from "@/components/toolbar.vue";
import Sidebar from "@/components/sidebar.vue";
</script>
