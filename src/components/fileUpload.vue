<template>
  <div v-if="isUploadFile" class="fixed inset-0">
    <div
      class="flex justify-center items-center h-screen w-screen clouded-glass bg-black bg-opacity-25"
    >
      <div class="flex flex-col h-3/5 w-3/5 bg-white shadow rounded-md overflow-hidden">
        <div class="h-10 w-full flex justify-between items-center border-b">
          <div class="ml-4 flex items-center">
            <span>上传个萝卜</span>
            <SvgIcon name="胡萝卜" class="h-5 w-5"></SvgIcon>
          </div>
          <button @click="exitUpload" class="w-8 h-8 mr-4 exit"></button>
        </div>
        <div class="flex-1 flex bg-gray-100">
          <div
            class="w-1/2 h-full bg-gray-300 flex flex-col justify-center items-center"
            @dragenter.prevent=""
            @dragover.prevent=""
            @drop.prevent="handleDrop"
          >
            <label for="fileInput" class="h-full w-full cursor-pointer"></label>
            <input
              id="fileInput"
              type="file"
              webkitdirectory="true"
              class="h-0 w-0 opacity-0"
              @change="handleInput"
            />
          </div>
          <ul v-if="uploadList" class="w-1/2 h-full">
            <li v-for="name in uploadList">
              {{ name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmit, defineProps } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import axios from "axios";

// 上传组件打开关闭状态控制
defineProps(["isUploadFile"]);
const emit = defineEmit(["update:isUploadFile"]);
const exitUpload = () => {
  emit("update:isUploadFile", false);
};

/**
 * 文件上传逻辑部分
 */
let uploadList = ref<string[]>([]);

// 通过拖拽获取文件信息
const handleDrop = (event: DragEvent) => {
  // const files  = event.dataTransfer?.items as DataTransferItemList ;
  // for (let i = 0; i < files.length; i++){
  //   console.log(files[i].kind);
  //   console.log("file.name", files[i]);
  // }
  previewFiles(event.dataTransfer?.files);
};

// 通过File类型的Input获取文件信息
const handleInput = (event: Event) => {
  const files = (event.target as HTMLInputElement).files as FileList;
  for (let i = 0; i < files.length; i++){
    console.log(files[i]);
    console.log("file.name", (files[i] as any).webkitRelativePath);
  }

  previewFiles((event.target as HTMLInputElement).files);
};

// 预览文件，显示文件信息和上传进度
const previewFiles = async (files: FileList | undefined | null) => {
  if (!files || files.length <= 0) {
    return;
  }

  console.log(files);

  for (let i = 0; i < files.length; i++) {
    uploadList.value.push(files[i].name);
  }
  // 读取文件
  // const uploadList = [];
  // console.log(files);
  // const readFileAsync = (file: File) =>
  //   new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onload = (evt) => resolve(evt.target?.result);
  //     reader.readAsDataURL(file);
  //   });

  // for (let i = 0; i < files.length; i++) {
  //   uploadList.push(await readFileAsync(files[i]));
  // }
  // console.log(uploadList);

  updateFiles(files);
};

// 上传文件
const updateFiles = (files: FileList) => {
  // const formData = new FormData();
  // for (let i = 0; i < files.length; i++) {
  //   formData.append("file", files[i], files[i].name);
  // }
  // const config = {
  //   headers: { "Content-Type": "multipart/form-data" },
  // };
  // const url = "";
  // axios
  //   .post(url, formData, config)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
</script>

<style scoped>
.clouded-glass {
  backdrop-filter: blur(3px);
}
.exit::before {
  content: "\2716";
}
</style>
