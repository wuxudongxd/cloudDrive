<template>
    <div class="flex flex-wrap px-20 pt-20">
        <span v-for="item in 12">
            <span class="flex flex-col items-center">
                <SvgIcon name="PDF" class="h-20 w-20 mx-4 my-6"></SvgIcon>
                PDF文件
            </span>
        </span>
    </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue';
</script>