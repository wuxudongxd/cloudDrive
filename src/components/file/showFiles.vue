<template>
  <div class="flex flex-wrap content-start px-8 pt-5 pb-10">
    <fileItem filetype="pdf" filename="PDF文件" />
    <fileItem filetype="docx" filename="WORD文件" />
    <fileItem filetype="folder" filename="文件夹" />
    <fileItem filetype="image" filename="图片" />
    <fileItem filetype="music" filename="音乐" />
    <fileItem filetype="pptx" filename="PPT文件" />
    <fileItem filetype="txt" filename="文本文件" />
    <fileItem filetype="unknown" filename="未知文件" />
    <fileItem filetype="video" filename="视频文件" />
    <fileItem filetype="xlsx" filename="表格文件" />
    <fileItem filetype="zip" filename="压缩文件1234" />
  </div>
</template>

<script lang="ts" setup>
import fileItem from "@/components/file/fileItem.vue";
// import router from "@/router";
// console.log(router.currentRoute.value.path.slice(1));
</script>
