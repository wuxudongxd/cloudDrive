<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <SvgIcon name="胡萝卜" class="mx-auto h-20 w-auto"></SvgIcon>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-700">萝卜云盘</h2>
      </div>
      <form class="space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">用户名</label>
            <!-- type="email"
              autocomplete="email" -->
            <input
              id="email-address"
              :required="true"
              v-model="registerForm.username"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              placeholder="请输入账号"
            />
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              :required="true"
              v-model="registerForm.password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              placeholder="请输入密码"
            />
          </div>
          <div>
            <label for="verifyPassword" class="sr-only">密码</label>
            <input
              id="verifyPassword"
              name="verifyPassword"
              type="password"
              autocomplete="current-verifyPassword"
              :required="true"
              v-model="verifyPassword"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              placeholder="请再次输入密码"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember_me" class="ml-2 block text-sm text-gray-900"
              >记住密码</label
            >
          </div>

          <div class="text-sm space-x-3">
            <router-link
              to="/login"
              class="font-medium text-indigo-600 hover:text-indigo-500"
              >现在登录？</router-link
            >
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
              >忘记密码？</a
            >
          </div>
        </div>

        <div>
          <button
            class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focuson:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click.prevent="register"
          >
            登录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { changeLogin } from "@/router";
import { useRouter } from "vue-router";
import SvgIcon from "@/components/SvgIcon.vue";
import { reactive, ref } from "vue";
import axios from "axios";

const registerForm = reactive({
  username: "",
  password: "",
});
const verifyPassword = ref<string>("");

const router = useRouter();
const register = () => {
  if (registerForm.password !== verifyPassword.value) {
    alert("两次密码输入不同！");
  } else {
    axios
      .post("api/user/regist", JSON.stringify(registerForm), {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        axios
          .post("api/user/login", JSON.stringify(registerForm), {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            localStorage.setItem("userId", res.data.data.id.toString());
            localStorage.setItem("isLogin", "true");
            changeLogin();
            router.push("/");
          });
      });
  }
};
</script>
