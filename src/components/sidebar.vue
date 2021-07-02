<template>
  <div class="w-52 bg-gray-100 shadow flex flex-col justify-between">
    <div class="flex flex-col items-center">
      <div class="h-32 flex flex-col items-center">
        <SvgIcon name="云盘" class="h-16 w-16 my-3"></SvgIcon>
        <div class="font-bold text-xl text-gray-600">简存取云盘</div>
      </div>
      <div
        v-for="item in choiceItem"
        :key="item.id"
        @click="changeItem"
        :class="[
          item.current ? 'bg-gray-300' : '',
          'h-12 w-full pl-10 mt-1 flex items-center hover:bg-gray-300 transition duration-200 ease-in-out rounded-md cursor-pointer',
        ]"
      >
        <SvgIcon :name="item.icon" class="h-5 w-5 mr-3 mt-0.5"></SvgIcon>
        {{ item.name }}
      </div>
    </div>
    <div class="h-16 flex justify-center items-center">
      <div class="w-10/12">
        <div class="flex overflow-hidden rounded h-2 bg-gray-200">
          <div
            style="width: 50%"
            class="bg-green-500 rounded transition duration-300 ease-in-out"
          ></div>
        </div>
        <div class="text-xs mt-2 text-gray-600">4.4G/10GB</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import router from "@/router";
import SvgIcon from "@/components/SvgIcon.vue";

const choiceItem = reactive([
  { id: 1, name: "文件", link: "", icon: "文件夹", current: true },
  { id: 2, name: "最近", link: "recently", icon: "时钟", current: false },
  { id: 3, name: "收藏", link: "collection", icon: "收藏", current: false },
  { id: 4, name: "分享", link: "share", icon: "分享", current: false },
  { id: 5, name: "音乐", link: "music", icon: "音乐", current: false },
  { id: 6, name: "视频", link: "video", icon: "视频", current: false },
  { id: 7, name: "图片", link: "picture", icon: "图片", current: false },
]);
const changeItem = (param: any) => {
  choiceItem.forEach((item) => {
    item.current = false;
  });
  for (const item of choiceItem) {
    if (param.target.innerText === item.name) {
      item.current = true;
      router.push("/" + item.link);
      break;
    }
  }
};
</script>
