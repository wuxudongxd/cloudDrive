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
        class="fixed top-18 right-10 w-48 z-50 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transition"
      >
        <router-link
          class="flex px-4 py-2 text-gray-800 hover:bg-indigo-400 hover:text-white transition duration-300 ease-in-out"
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
/* 
使用onclick
  优点：不需要担心多次重复绑定              
  缺点：只能绑定一个事件，需要多个类似的功能的话会被覆盖，可以把全部状态控制写进一个函数，不过这样不方便解耦
使用EventListener
  优点：一个事件可以绑定多个函数，适合需要多个类似功能的场景
  缺点：控制台中事件侦听器中可以看到多次点击头像会重复绑定函数，不过removeEventListener一次就会把全部重复绑定的函数都移除，一般情况下不会影响性能

*/
const selectMenu = ref<HTMLElement | null>(null);
const changeSelect = () => {
  isOpen.value = !isOpen.value;
  document.onclick = (event) => {
    if (!selectMenu.value?.contains(event.target as Node)) {
      isOpen.value = false;
      document.onclick = null;      
    }
  };
};
</script>
