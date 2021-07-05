<template>
  <span
    class="flex flex-col items-center hover:bg-blue-100 rounded-md transition-all duration-200 ease-in-out"
  >
    <SvgIcon :name="filetype" class="h-20 w-20 mx-4 my-6"></SvgIcon>
    {{ filename }}
  </span>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";

defineProps(["filetype", "filename"]);
</script>
