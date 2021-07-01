<template>
    <div class="flex flex-row h-screen">
        <div class="w-52 bg-gray-100 shadow flex flex-col justify-between">
            <div class="flex flex-col items-center">
                <div class="h-28 flex flex-col">
                    <SvgIcon name="云盘" class="h-16 w-16 ml-3"></SvgIcon>简存取云盘
                </div>
                <div v-for="item in choiceItem" :key="item.id" @click="changeItem" class="h-12 w-full pl-10 flex items-center hover:bg-gray-300 transition-all duration-200 ease-in-out rounded-md cursor-pointer">
                    <SvgIcon :name="item.icon" class="h-5 w-5 mr-3 mt-0.5"></SvgIcon>
                    {{
                        item.name
                    }}
                </div>
            </div>
            <div>容量</div>
        </div>
        <div class="flex-1">
            <Headbar />
            <router-view />
        </div>
    </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import Headbar from "@/components/headbar.vue";
import SvgIcon from '@/components/SvgIcon.vue';

const choiceItem = [
    { id: 1, name: "文件", link: "", icon:"文件夹" },
    { id: 2, name: "最近", link: "recently", icon:"时钟"},
    { id: 3, name: "收藏", link: "collection", icon:"收藏" },
    { id: 4, name: "分享", link: "share", icon:"分享" },
    { id: 5, name: "音乐", link: "music", icon:"音乐" },
    { id: 6, name: "视频", link: "video", icon:"视频" },
    { id: 7, name: "图片", link: "picture", icon:"图片" },
];
const changeItem = (param: any) => {
    for (const item of choiceItem) {
        if (param.target.innerText === item.name) {
            router.push("/" + item.link);
            break;
        }
    }
};
</script>
