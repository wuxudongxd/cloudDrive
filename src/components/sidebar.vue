<template>
  <div class="w-52 bg-gray-100 shadow flex flex-col justify-between">
    <div class="flex flex-col items-center">
      <div class="h-32 flex flex-col items-center">
        <SvgIcon name="胡萝卜" class="h-14 w-14 my-3"></SvgIcon>
        <div class="font-bold text-xl text-gray-600 select-none">萝卜云盘</div>
      </div>
      <div
        v-for="(item, index) in choiceItem"
        :key="item.id"
        @click="changeItem(index)"
        :class="[
          index === activeItemIndex ? 'bg-gray-300' : '',
          'h-12 w-full pl-10 mt-1 flex items-center hover:bg-gray-300 transition duration-200 ease-in-out rounded-md cursor-pointer',
        ]"
      >
        <SvgIcon :name="item.icon" class="h-5 w-5 mr-3 mt-0.5"></SvgIcon>
        <div class="select-none">{{ item.name }}</div>
      </div>
    </div>
    <div class="h-16 flex justify-center items-center">
      <div class="w-10/12">
        <div class="flex overflow-hidden rounded h-2 bg-gray-200">
          <div
            :style="capacity.progress"
            class="bg-green-500 rounded transition duration-500 ease-in-out"
          ></div>
        </div>
        <div class="text-xs mt-2 text-gray-600">
          {{ `${capacity.value}G/${capacity.total}GB` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import router from "@/router";
import SvgIcon from "@/components/SvgIcon.vue";
import { capacityReq } from "@/api";

/**
 * 侧栏选项
 */
interface choiceItemProps {
  id: number;
  name: string;
  link: string;
  icon: string;
  current?: boolean;
}
const choiceItem = reactive<choiceItemProps[]>([
  { id: 1, name: "文件", link: "", icon: "文件夹" },
  { id: 2, name: "最近", link: "recently", icon: "最近" },
  { id: 3, name: "收藏", link: "collection", icon: "收藏" },
  // { id: 4, name: "分享", link: "share", icon: "分享" },
  { id: 5, name: "音乐", link: "music", icon: "音乐" },
  { id: 6, name: "视频", link: "video", icon: "视频" },
  { id: 7, name: "图片", link: "picture", icon: "图片" },
]);

// 初始化
const routeValue = router.currentRoute.value.path.slice(1);
let activeItemIndex = ref(0); // 初始激活选项为0，即侧边栏第一个
// 从i=1，即第二项开始对比路由值
for (let i = 1; i < choiceItem.length; i++) {
  if (routeValue.includes(choiceItem[i].link)) {
    activeItemIndex.value = i;
  }
}

const changeItem = (index: number) => {
  activeItemIndex.value = index;
  router.push("/" + choiceItem[index].link);
};

/**
 * 初始化获取云盘容量
 */
const capacity = reactive({
  value: 0,
  total: 0,
  progress: "",
});

capacityReq
  .then((res) => {
    capacity.value = Number(
      (~~res.data.data.match(/\d+/g)[0] / 1024 / 1024 / 1024).toFixed(2)
    );
    capacity.total = Number(res.data.data.match(/\d+/g)[1]);
    capacity.progress = `width: ${(capacity.value / capacity.total).toFixed(2)}%`;
  })
  .catch(() => {});
</script>
