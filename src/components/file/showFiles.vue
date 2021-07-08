<template>
  <div>
    <div>{{ currentDirectory }}</div>
    <div class="flex flex-wrap content-start px-8 pt-5 pb-10">
      <fileItem
        v-for="(item, index) in showFiles"
        :key="item.id"
        :filetype="item.filetype"
        :filename="item.filename"
        :isActive="index === activeFileIndex"
        @click="activateFile(index)"
        @dblclick.left="handleFolder(item)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import fileItem from "@/components/file/fileItem.vue";
import axios from "axios";

/**
 * 处理文件点击激活样式
 */
let activeFileIndex = ref<number>(-1);
const activateFile = (index: number) => {
  activeFileIndex.value = index;
};

/**
 * 请求文件并进行预处理
 */
interface showFilesProps {
  id: number;
  extension: string;
  filetype: string;
  filename: string;
  isFolder: boolean;
}

// 为文件图标匹配做准备
const filetypeName = [
  "pdf",
  "docx",
  "pptx",
  "txt",
  "xlsx",
  "zip",
  "svg",
  "json",
  "xml",
  "java",
];
const filetypeMap = new Map([
  ["jpg", "image"],
  ["jpeg", "image"],
  ["png", "image"],
  ["flac", "music"],
  ["mp3", "music"],
  ["m4a", "video"],
  ["mp4", "video"],
]);
const showFiles = ref<showFilesProps[]>([]);
const url = "api/file/list";
const query = `?userId=4&queryMenu=home`;
const config = {
  headers: { "Content-Type": "multipart/form-data", userId: 4 },
};

const preShowFiles = (res: any) => {
  showFiles.value = [];
  const fileList = res.data.data;
  // 使文件夹在showFiles数组前面，方便展示
  for (const file of fileList) {
    if (file.isFolder) {
      showFiles.value.push(file);
    }
  }
  for (const file of fileList) {
    if (!file.isFolder) {
      showFiles.value.push(file);
    }
  }
  // 处理svg图标展示
  for (const file of showFiles.value) {
    if (filetypeName.includes(file.extension)) {
      file.filetype = file.extension;
    } else {
      if (filetypeMap.get(file.extension)) {
        file.filetype = filetypeMap.get(file.extension) as string;
      } else {
        file.isFolder ? (file.filetype = "folder") : (file.filetype = "unknown");
      }
    }
  }
};
// 初始化请求
axios.get(url + query, config).then(preShowFiles);

/**
 * 左键双击事件：点开下一级文件夹
 */
const currentDirectory = ref<string>("");
const handleFolder = (file: showFilesProps) => {
  console.log(file.filename);
  if (file.isFolder) {
    currentDirectory.value += `/${file.filename}`;
    axios
      .get(`api/file/folder?userId=4&currentDirectory=${currentDirectory.value}`, config)
      .then(preShowFiles);
  }
};
</script>
