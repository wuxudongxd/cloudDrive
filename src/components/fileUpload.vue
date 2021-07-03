<template>
  <div v-if="isUploadFile" class="fixed inset-0" @click="update">
    <div
      class="flex justify-center items-center h-screen w-screen clouded-glass bg-black bg-opacity-25"
    >
      <div class="h-3/5 w-3/5 bg-white border shadow rounded-md">
        <input type="file" multiple name="" id="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from "vue";

defineProps(["isUploadFile"]);
const emit = defineEmit(["update:isUploadFile"]);
const update = () => {
  emit("update:isUploadFile", false);
};
</script>

<style scoped>
.clouded-glass {
  backdrop-filter: blur(3px);
}
</style>
