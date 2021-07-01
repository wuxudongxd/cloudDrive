<template>
    <div class="flex flex-wrap px-20 pt-20">
        <span v-for="item in 40">
            <span>
                <CloudIcon class="h-20 w-20 inline"/>
            </span>
        </span>
    </div>
</template>

<script setup>
import { CloudIcon } from "@heroicons/vue/solid";
</script>