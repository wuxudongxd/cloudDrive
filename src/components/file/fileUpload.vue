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
          <div class="w-1/2 h-full flex flex-col justify-between relative">
            <ul v-if="fileList" class="h-80 overflow-auto">
              <li class="flex justify-evenly w-full absolute bg-gray-100 shadow-sm">
                <span>名称</span>
                <span>完整路径</span>
              </li>
              <li
                v-for="item in fileList"
                class="flex justify-around space-y-2 mt-10 border"
              >
                <span class="w-1/2 pl-10 mt-2">{{ item.name }}</span>
                <span class="w-1/2">{{ item.path }}</span>
              </li>
            </ul>
            <div class="flex justify-center items-center mb-5 h-20">
              <button
                @click="updateFiles"
                class="text-white w-24 h-10 rounded bg-blue-500 hover:bg-blue-400 shadow transition duration-300 ease-in-out"
              >
                上传
              </button>
            </div>
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
interface fileListProp {
  name: string;
  path: string;
  file: File;
}
const fileList = ref<fileListProp[]>([]);
const folderList = ref<string[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);
let isFolder = false;

// 调用文件上传
const handleFile = () => {
  isFolder = false;
  (fileInput.value as any).webkitdirectory = false;
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

  fileList.value = [];
  folderList.value = [];
  if (isFolder) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const path = (files[i] as any).webkitRelativePath;
      const name = file.name;
      fileList.value.push({ name, path, file });
      const folderPath = path.slice(0, path.length - name.length - 1);

      if (
        folderList.value.length === 0 ||
        folderList.value[folderList.value.length - 1] !== folderPath
      ) {
        folderList.value.push(folderPath);
      }
    }
  } else {
    for (let i = 0; i < files.length; i++) {
      fileList.value.push({
        name: files[i].name,
        path: files[i].name,
        file: files[i],
      });
    }
  }
};

// 通过拖拽获取文件信息
const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.items as DataTransferItemList;
  if (!files || files.length <= 0) {
    return;
  }

  fileList.value = [];
  folderList.value = [];
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
          fileList.value.push({
            name: file.name,
            path: path,
            file,
          });
        },
        (e: Error) => {
          console.log(e);
        }
      );
    } else {
      // 迭代获取文件夹名
      folderList.value.push(entry.fullPath.substring(1));
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
//   // const fileList = [];
//   // console.log(files);
//   // const readFileAsync = (file: File) =>
//   //   new Promise((resolve) => {
//   //     const reader = new FileReader();
//   //     reader.onload = (evt) => resolve(evt.target?.result);
//   //     reader.readAsDataURL(file);
//   //   });
//   // for (let i = 0; i < files.length; i++) {
//   //   fileList.push(await readFileAsync(files[i]));
//   // }
//   // console.log(fileList);
//   // updateFiles(files);
// };

// 上传文件
const updateFiles = () => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  // const url = "http://116.63.172.108/file/upload";
  const url = "/file/upload";
  if (folderList.value.length !== 0) {
    const folderReq = [];
    for (const folder of folderList.value) {
      const formData = new FormData();
      formData.append("currentDirectory", "");
      formData.append("filename", folder);
      folderReq.push(axios.post(url, formData, config));
    }
    Promise.all(folderReq).then(() => {
      for (const item of fileList.value) {
        const formData = new FormData();
        formData.append("file", item.file);
        formData.append("userId", "1");
        formData.append("currentDirectory", "");
        formData.append("relativePath", item.path);
        axios
          .post(url, formData, config)
          .then(function (response) {
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
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
