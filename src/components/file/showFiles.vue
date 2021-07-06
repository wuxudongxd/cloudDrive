<template>
  <div class="flex flex-wrap content-start px-8 pt-5 pb-10">
    <fileItem
      v-for="(item, index) in fileList"
      :key="item.id"
      :filetype="item.filetype"
      :filename="item.filename"
      :isActive="index === activeFileIndex"
      @click="activateFile(index)"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import fileItem from "@/components/file/fileItem.vue";

const fileList = reactive([
  { id: 1, filetype: "pdf", filename: "PDF文件" },
  { id: 2, filetype: "docx", filename: "WORD文件" },
  { id: 3, filetype: "folder", filename: "文件夹" },
  { id: 4, filetype: "image", filename: "图片" },
  { id: 5, filetype: "music", filename: "音乐" },
  { id: 6, filetype: "pptx", filename: "PPT文件" },
  { id: 7, filetype: "txt", filename: "文本文件" },
  { id: 8, filetype: "unknown", filename: "未知文件" },
  { id: 9, filetype: "video", filename: "视频文件" },
  { id: 10, filetype: "xlsx", filename: "表格文件" },
  { id: 11, filetype: "zip", filename: "压缩文件1234567" },
]);

let activeFileIndex = ref<number>(-1);
const activateFile = (index: number) => {
  activeFileIndex.value = index;
};
</script>
