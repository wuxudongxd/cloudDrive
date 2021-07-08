<template>
  <div>
    <div class="ml-4 h-5">
      <span
        v-show="currentDirectory.length"
        class="mr-2 cursor-pointer text-gray-400 hover:text-blue-400 select-none transition duration-200 ease-in-out"
        @click="upFolderLevel"
        >上一级</span
      >
      <span
        v-for="item in currentDirectory"
        class="mr-1 cursor-pointer text-gray-400 hover:text-blue-400 select-none transition duration-200 ease-in-out"
        @click="changeFolder(item)"
      >
        {{ item + "/" }}
      </span>
    </div>
    <div v-if="isShade" class="flex justify-center items-center h-96 w-full">
      <div v-loading="true"></div>
    </div>
    <div v-else>
      <div v-if="showFiles.length" class="flex flex-wrap content-start px-8 pt-5 pb-10">
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
      <div v-else class="flex flex-col justify-center items-center h-96">
        <SvgIcon name="暂无文件" class="w-64 h-64"></SvgIcon>
        <span class="text-xl text-gray-500">暂无文件</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, reactive, ref } from "vue";
import fileItem from "@/components/file/fileItem.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import axios from "axios";
import router from "@/router";

const props = defineProps({ queryMenu: { type: String } });

// 文件加载遮罩
const isShade = ref<boolean>(true);

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
// 记录当前路径
const currentDirectory = ref<string[]>([]);
// currentDirectory.value = router.currentRoute.value.path.slice(1);

const showFiles = ref<showFilesProps[]>([]);
const url = "api/file/list";
const userId = localStorage.getItem("userId") || 1;
const query = `?userId=${userId}&queryMenu=${props.queryMenu}`;
const config = {
  headers: { "Content-Type": "multipart/form-data", userId },
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
  isShade.value = false;
};
// 初始化请求
axios.get(url + query, config).then(preShowFiles);

/**
 *  文件夹左键双击事件：点开下一级文件夹
 */
const handleFolder = (file: showFilesProps) => {
  if (file.isFolder) {
    currentDirectory.value.push(file.filename);
    isShade.value = true;
    axios
      .get(
        `api/file/folder?userId=${userId}&currentDirectory=/${currentDirectory.value.join(
          "/"
        )}`,
        config
      )
      .then(preShowFiles);
  }
};

/**
 * 切换目录
 */
const changeFolder = (item: string) => {
  for (const folder of currentDirectory.value.join(",").split(",").reverse()) {
    if (item === folder) {
      break;
    }
    currentDirectory.value.pop();
  }
  isShade.value = true;
  axios
    .get(
      `api/file/folder?userId=${userId}&currentDirectory=/${currentDirectory.value.join(
        "/"
      )}`,
      config
    )
    .then(preShowFiles);
};

/**
 * 返回上一级
 */
const upFolderLevel = () => {
  currentDirectory.value.pop();
  isShade.value = true;
  axios
    .get(
      `api/file/folder?userId=${userId}&currentDirectory=/${currentDirectory.value.join(
        "/"
      )}`,
      config
    )
    .then(preShowFiles);
};
</script>
