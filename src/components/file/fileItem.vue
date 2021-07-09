<template>
  <div>
    <span
      :class="[
        isActive ? 'border border-blue-400 bg-blue-100' : '',
        'flex flex-col items-center justify-center box-border w-24 h-28 mx-2 my-2 hover:bg-blue-100 rounded-md transition duration-200 ease-in-out',
      ]"
      @click="emit('activateFile', true)"
      @click.right.prevent="handleRightMenu"
    >
      <div v-if="filetype === 'image'" v-viewer>
        <img :src="img" alt="" />
      </div>
      <div v-else-if="filetype === 'video'">
        <NPlayer class="w-80 h-40" :options="video" />
      </div>
      <SvgIcon v-else :name="filetype" class="w-14 h-14 mb-3"></SvgIcon>
      <div class="text-gray-500 text-xs w-24 h-4 text-center overflow-hidden select-none">
        <div v-if="!isChangeName" ref="filenameDom">{{ filenameFilter }}</div>
        <input
          v-else
          type="text"
          v-model="filenameFilter"
          class="text-center w-full"
          @keyup.enter="changeInput"
        />
      </div>
    </span>
    <!-- 右键弹窗 -->
    <div
      v-if="props.rightMenuIndex === props.index"
      ref="rightMenu"
      :style="menuPosition"
      class="fixed w-24 h-24 bg-white shadow-md border rounded"
    >
      <ul class="flex flex-col space-y-2 py-2">
        <li
          class="h-8 w-full flex justify-center items-center text-gray-600 cursor-pointer hover:bg-blue-100 transition duration-200 ease-in-out"
          @click="renameFile"
        >
          重命名
        </li>
        <li
          class="h-8 w-full flex justify-center items-center text-gray-600 cursor-pointer hover:bg-blue-100 transition duration-200 ease-in-out"
        >
          删除
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineEmit, defineProps, ref } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import axios from "@/api";
import Player from "nplayer";

const props = defineProps({
  index: { type: Number, required: true },
  file: { type: Object, required: true },
  filetype: { type: String, required: true },
  filename: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  path: { type: String, required: true },
  rightMenuIndex: { required: true },
});
const emit = defineEmit(["activateFile", "update:rightMenuIndex"]);

/**
 * 计算属性：过滤过长的文件名
 */
const filename = ref<string>("");
filename.value = props.filename;
const filenameFilter = computed({
  get() {
    return filename.value.length > 10
      ? filename.value.slice(0, 10) + "..."
      : filename.value;
  },
  set(val: string) {
    console.log("val", val);

    filename.value = val;
  },
});

/**
 * 显示图片
 */
const img = ref<any>(null);
if (props.filetype === "image") {
  axios
    .get(`/file/file-content?filename=${props.path}/${props.filename}`, {
      responseType: "blob",
    })
    .then((res) => {
      img.value = window.URL.createObjectURL(res.data);
    })
    .catch((err) => {});
}

/**
 * 显示视频
 */
const video = ref<any>(null);
if (props.filetype === "video") {
  axios
    .get(`/file/file-content?filename=${props.path}/${props.filename}`, {
      responseType: "blob",
    })
    .then((res) => {
      video.value = { src: window.URL.createObjectURL(res.data) };
    })
    .catch((err) => {});
}

/**
 * 右键打开功能菜单
 */
const menuPosition = ref<string>("");
const rightMenu = ref<HTMLElement | null>(null);
const handleRightMenu = (event: MouseEvent) => {
  emit("update:rightMenuIndex", props.index);
  menuPosition.value = `top: ${event.clientY}px; left: ${event.clientX}px`;

  // 添加和移除监听器
  document.addEventListener("click", function changeOpen(event) {
    if (!rightMenu.value?.contains(event.target as Node)) {
      emit("update:rightMenuIndex", -1);
      menuPosition.value = "";
      document.removeEventListener("click", changeOpen);
    }
  });
};

/**
 * 文件重命名
 */
const filenameDom = ref<HTMLElement | null>(null);
// const filenameInput = ref<HTMLElement | null>(null);
const isChangeName = ref<boolean>(false);
const renameFile = () => {
  if (props.filetype !== "folder") {
    isChangeName.value = true;
    emit("update:rightMenuIndex", -1);
  }
};
const changeInput = () => {
  console.log(filenameFilter.value);

  isChangeName.value = false;
};
// (filenameInput.value as HTMLElement).onfocus = () => {

// };
</script>
