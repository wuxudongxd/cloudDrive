<template>
  <Login />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Login from "views/authentication/login.vue";

export default defineComponent({
  name: "App",
  components: {
    Login,
  },
});
</script>

<style></style>
