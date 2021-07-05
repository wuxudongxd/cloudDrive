<template>
  <span
    class="flex flex-col items-center px-4 mx-2 py-4 my-2 hover:bg-blue-100 rounded-md transition duration-200 ease-in-out"
  >
    <SvgIcon :name="filetype" class="h-20 w-20 mb-3"></SvgIcon>
    <div class="text-gray-700 text-sm w-24 h-5 text-center overflow-hidden">{{ filename }}</div>
  </span>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";

defineProps(["filetype", "filename"]);
</script>
