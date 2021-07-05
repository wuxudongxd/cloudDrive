<template>
  <div v-if="isUploadFile" class="fixed inset-0">
    <div
      class="flex justify-center items-center h-screen w-screen bg-black bg-opacity-25 clouded-glass"
    >
      <div class="flex flex-col h-4/5 w-4/5 bg-white shadow rounded-md overflow-hidden">
        <div class="h-10 w-full flex justify-between items-center border-b">
          <div class="ml-4 flex items-center">
            <span>上传个萝卜</span>
            <SvgIcon name="胡萝卜" class="h-5 w-5"></SvgIcon>
          </div>
          <button @click="exitUpload" class="w-8 h-8 mr-4 exit"></button>
        </div>
        <div class="flex-1 flex bg-gray-100">
          <div
            class="w-1/2 h-full bg-gray-300 outline"
            @dragenter.prevent=""
            @dragover.prevent=""
            @drop.prevent="handleDrop"
          >
            <input
              ref="fileInput"
              type="file"
              multiple
              class="h-0 w-0 opacity-0"
              @change="handleInput"
            />
            <div class="h-4/5 flex flex-col justify-around items-center">
              <SvgIcon name="拖拽上传" class="h-40 w-40 2xl:w-72 2xl:h-72"></SvgIcon>
              <div class="flex flex-col items-center">
                <div class="flex justify-between w-52">
                  <button
                    class="text-white w-24 h-10 rounded bg-blue-500 hover:bg-blue-400 shadow transition duration-300 ease-in-out"
                    @click="handleFile"
                  >
                    上传文件
                  </button>
                  <button
                    class="text-white w-24 h-10 rounded bg-blue-500 hover:bg-blue-400 shadow transition duration-300 ease-in-out"
                    @click="handleFolder"
                  >
                    上传文件夹
                  </button>
                </div>
                <span class="mt-6 text-gray-500">点击上传按钮，或拖拽文件到框内上传</span>
              </div>
            </div>
          </div>
          <div class="w-1/2 h-full flex flex-col justify-between">
            <ul v-if="uploadList">
              <li>名称-路径</li>
              <li v-for="item in uploadList">{{ item.name }}-{{ item.path }}</li>
            </ul>
            <button @click="updateFiles">上传</button>
          </div>
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
interface uploadListProp {
  name: string;
  path: string;
  file: File;
}
const uploadList = ref<uploadListProp[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);
let isFolder = false;
const formData = new FormData();

// 调用文件上传
const handleFile = () => {
  fileInput.value?.click();
};

// 调用文件夹上传
const handleFolder = () => {
  isFolder = true;
  (fileInput.value as any).webkitdirectory = true;
  fileInput.value?.click();
};

// 通过File类型的Input获取文件信息
const handleInput = (event: Event) => {
  const files = (event.target as HTMLInputElement).files as FileList;
  if (!files || files.length <= 0) {
    return;
  }
  uploadList.value = [];
  if (isFolder) {
    for (let i = 0; i < files.length; i++) {
      uploadList.value.push({
        name: files[i].name,
        path: (files[i] as any).webkitRelativePath,
        file: files[i],
      });
    }
  } else {
    for (let i = 0; i < files.length; i++) {
      uploadList.value.push({
        name: files[i].name,
        path: files[i].name,
        file: files[i],
      });
    }
  }

  for (const item of uploadList.value) {
    formData.append("file", item.file, item.path);
  }
  
};

// 通过拖拽获取文件信息
const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.items as DataTransferItemList;
  if (!files || files.length <= 0) {
    return;
  }

  uploadList.value = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i].kind === "file") {
      let entry = files[i].webkitGetAsEntry();
      getFileFromEntryRecursively(entry);
    }
  }
  function getFileFromEntryRecursively(entry: any) {
    if (entry.isFile) {
      entry.file(
        (file: File) => {
          let path = entry.fullPath.substring(1);
          uploadList.value.push({
            name: file.name,
            path: path,
            file,
          });
          formData.append("file", file, path);
        },
        (e: Error) => {
          console.log(e);
        }
      );
    } else {
      let reader = entry.createReader();
      reader.readEntries(
        (entries: any) => {
          entries.forEach((entry: any) => {
            getFileFromEntryRecursively(entry);
          });
        },
        (e: Error) => {
          console.log(e);
        }
      );
    }
  }
};

// 预览文件，显示文件信息和上传进度
// const previewFiles = async (files: FileList | undefined | null) => {
//   // console.log(files);
//   // 读取文件
//   // const uploadList = [];
//   // console.log(files);
//   // const readFileAsync = (file: File) =>
//   //   new Promise((resolve) => {
//   //     const reader = new FileReader();
//   //     reader.onload = (evt) => resolve(evt.target?.result);
//   //     reader.readAsDataURL(file);
//   //   });
//   // for (let i = 0; i < files.length; i++) {
//   //   uploadList.push(await readFileAsync(files[i]));
//   // }
//   // console.log(uploadList);
//   // updateFiles(files);
// };

// 上传文件
const updateFiles = () => {
  console.log(formData.getAll("file"));

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
.outline {
  outline: 4px dashed #f3f4f6;
  outline-offset: -20px;
}
</style>
