<template>
    <div class="flex flex-row h-screen">
        <div class="w-52 bg-gray-100 shadow flex flex-col justify-between">
            <div class="flex flex-col items-center space-y-7">
                <span>
                    <SvgIcon name="云盘" class="h-16 w-16 ml-3"></SvgIcon>简存取云盘
                </span>
                <a v-for="item in choiceItem" :key="item.id" @click="changeItem">
                    {{
                        item.name
                    }}
                </a>
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
    { id: 1, name: "文件", link: "" },
    { id: 2, name: "最近", link: "recently" },
    { id: 3, name: "收藏", link: "collection" },
    { id: 4, name: "分享", link: "share" },
    { id: 5, name: "音乐", link: "music" },
    { id: 6, name: "视频", link: "video" },
    { id: 7, name: "图片", link: "picture" },
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
