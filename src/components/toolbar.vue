<template>
  <div class="flex justify-end items-center h-14 space-x-4 mr-4">
    <button class="group w-20 h-10 flex justify-center items-center rounded bg-blue-400 hover:bg-blue-300 focus:outline-none focus:ring focus:border-blue-200">
        <SvgIcon name="上传" color="#fff" class="w-5 h-5" />
      </button>
    <div class="flex items-stretch">
      <label
        for="search"
        class="flex justify-center items-center w-16 h-10 -mr-px bg-gray-100 border border-gray-300 rounded-l"
      >
        <SvgIcon name="搜索" class="w-6 h-6" />
      </label>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="搜索"
        class="box-border px-3 text-gray-700 rounded-r outline-none border border-gray-300 focus:border-blue-400 transform duration-300 ease-in-out"
      />
    </div>
    <div>排序</div>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from "@/components/SvgIcon.vue";
</script>
