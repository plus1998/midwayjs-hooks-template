<script lang="ts" setup>
import { ref, reactive } from "vue";
import { login } from "../api/controller/user.api";
import md5 from "js-md5";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formState = reactive({
  username: "",
  password: "",
} as {
  username: string;
  password: string;
});

const loading = ref(false);
const loginSubmit = async () => {
  loading.value = true;
  const ret = await login(
    formState.username,
    md5(formState.password)
  );
  message[ret.success ? "success" : "error"](ret.message);
  if (ret.success && ret.data) {
    localStorage.setItem("TOKEN", ret.data.token);
    localStorage.setItem("REFRESH_TOKEN", ret.data.refreshToken);
    router.replace("/home");
  }
  loading.value = false;
};
</script>

<template>
  <div id="login">
    <!-- 头部 -->
    <div class="header">
      <a-row>
        <a-col>
          <svg
            t="1676636170718"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="12643"
            width="64"
            height="64"
          >
            <path
              d="M814.933333 914.666667H214.4c-54.933333 0-99.733333-44.8-99.733333-99.733334V214.4c0-54.933333 44.8-99.733333 99.733333-99.733333h600.533333c54.933333 0 99.733333 44.8 99.733334 99.733333v600.533333c0 54.933333-44.8 99.733333-99.733334 99.733334z"
              fill="#3FCF77"
              p-id="12644"
            ></path>
            <path
              d="M533.333333 602.666667c0 56-57.066667 101.333333-128 101.333333-14.933333 0-28.8-2.133333-42.133333-5.866667-6.4-1.6-37.333333 24-43.2 21.866667-6.4-2.666667 11.2-34.666667 5.333333-37.866667-29.333333-18.666667-48-46.933333-48-79.466666 0-56 57.066667-101.333333 128-101.333334s128 45.333333 128 101.333334z"
              fill="#8CE2AD"
              p-id="12645"
            ></path>
            <path
              d="M746.666667 493.333333c0 54.4-32 102.4-81.066667 132.266667-8 4.8 26.133333 53.333333 17.066667 57.066667-8.533333 3.733333-60.266667-37.333333-69.866667-34.666667-19.2 5.333333-39.466667 8-60.8 8C444.266667 656 357.333333 582.933333 357.333333 493.333333S444.266667 330.666667 552 330.666667 746.666667 403.733333 746.666667 493.333333z"
              fill="#FFFFFF"
              p-id="12646"
            ></path>
            <path
              d="M485.333333 464m-21.333333 0a21.333333 21.333333 0 1 0 42.666667 0 21.333333 21.333333 0 1 0-42.666667 0Z"
              fill="#3FCF77"
              p-id="12647"
            ></path>
            <path
              d="M357.333333 581.333333m-14.933333 0a14.933333 14.933333 0 1 0 29.866667 0 14.933333 14.933333 0 1 0-29.866667 0Z"
              fill="#3FCF77"
              p-id="12648"
            ></path>
            <path
              d="M618.666667 464m-21.333334 0a21.333333 21.333333 0 1 0 42.666667 0 21.333333 21.333333 0 1 0-42.666667 0Z"
              fill="#3FCF77"
              p-id="12649"
            ></path>
          </svg>
        </a-col>
        <a-col>
          <h1 style="color: white">Demo</h1>
        </a-col>
      </a-row>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="loginForm">
        <a-form
          :model="formState"
          name="basic"
          autocomplete="off"
          layout="vertical"
          @submit="loginSubmit"
        >
          <a-form-item
            label="用户名"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
            label="密码"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit" :loading="loading">登入</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style>
#login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #1e1e1e;
}
.header {
  width: 100%;
  height: 70px;
  line-height: 70px;
  padding: 0 15px;
}
.content {
  width: 100%;
}
.loginForm {
  background-color: white;
  width: 40vw;
  min-width: 300px;
  margin: 10vh auto;
  border-radius: 8px;
  padding: 15px;
}
</style>