<template>
  <div class="flex justify-between items-center px-6 h-16 shadow-sm">
    <div class="text-lg text-gray-600 font-bold">控制台</div>
    <div>
      <button
        class="rounded-full w-10 h-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-400"
      >
        <img
          class="h-full w-full rounded-full object-cover"
          src="https://cloud1.jmal.top/api/view/thumbnail?jmal-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJXRUIiLCJpc3MiOiJTZXJ2aWNlIiwidXNlcm5hbWUiOiJhZG1pbiJ9.MVaDn9lVIQLaAVutnSuIxdBTKnQBqZZ70k04N38cFrc&id=60d960419c5adf84a4ee8211"
          alt="头像"
          @click.stop="changeSelect"
        />
      </button>
      <div
        v-if="isOpen"
        ref="selectMenu"
        class="fixed top-18 right-10 w-48 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transition"
      >
        <router-link
          class="flex px-4 py-2 text-gray-800 hover:bg-indigo-400 hover:text-white"
          v-for="item in selectItems"
          :to="item.link"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const isOpen = ref(false);
const selectItems = reactive([
  { name: "主页", link: "profile" },
  { name: "设置", link: "setting" },
  { name: "退出", link: "logout" },
]);

// 控制选项菜单弹窗
const selectMenu = ref<HTMLElement | null>(null);
const changeSelect = () => {
  isOpen.value = !isOpen.value;
  // 如果为同一个事件多次添加同一个监听函数，函数只会执行一次，多余的添加将自动删除，所以这里就不处理点击头像时多次绑定changeOpen函数的问题了
  document.addEventListener("click", function changeOpen(event) {
    if (!selectMenu.value?.contains(event.target as Node)) {
      isOpen.value = false;
      document.removeEventListener("click", changeOpen);
    }
  });
};
</script>
