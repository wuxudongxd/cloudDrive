<template>
  <span
    :class="[
      isActive ? 'border border-blue-400 bg-blue-100' : '',
      'flex flex-col items-center justify-center box-border w-24 h-28 mx-2 my-2 hover:bg-blue-100 rounded-md transition duration-200 ease-in-out',
    ]"
    @click="emit('activateFile', true)"
  >
    <SvgIcon :name="filetype" class="w-14 h-14 mb-3"></SvgIcon>
    <div class="text-gray-500 text-xs w-24 h-5 text-center overflow-hidden">
      {{ filename }}
    </div>
  </span>
</template>
<script lang="ts" setup>
import { defineEmit, defineProps } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";

defineProps(["filetype", "filename", "isActive"]);
const emit = defineEmit(["activateFile"]);
</script>
