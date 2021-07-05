<template>
  <div class="flex flex-wrap px-8 pt-5 pb-10">
    <span>
      <fileItem filetype="PDF" filename="PDF文件" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import fileItem from "@/components/file/fileItem.vue";
import router from "@/router";
// console.log(router.currentRoute.value.path.slice(1));
</script>
