<script lang="ts" setup>
import { ref, reactive, CSSProperties } from "vue";
import { login } from "../api/controller/user.api";
import md5 from "js-md5";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import bgImg from '../assets/bg.jpg';

const loginPageStyle: CSSProperties = {
  width: '100%',
  height: '100vh',
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

const router = useRouter();

const form = reactive({
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
    form.username,
    md5(form.password)
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
  <div id="login" :style="loginPageStyle">
    <!-- 头部 -->
    <div class="header">
      <a-row>
        <a-col class="flex flex-col justify-center mr-3">
          <svg t="1713958034108" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="21330" width="32" height="32">
            <path
              d="M613.546667 768l-0.64 92.458667h110.250666a39.125333 39.125333 0 0 1 0 78.208H346.282667a39.125333 39.125333 0 0 1-0.042667-78.208h110.293333L457.130667 768h-336.213334A78.208 78.208 0 0 1 42.666667 689.792V163.541333C42.666667 120.362667 77.653333 85.333333 120.874667 85.333333h782.250666C946.304 85.333333 981.333333 120.32 981.333333 163.541333v526.250667C981.333333 732.970667 946.346667 768 903.125333 768H613.546667z m44.245333-258.218667l-111.317333-96.128a115.370667 115.370667 0 0 0-63.829334-151.04 118.058667 118.058667 0 0 0-44.373333-8.661333c-21.248 0-41.045333 6.101333-58.325333 15.957333l90.282666 89.344-42.538666 42.069334L337.493333 312.021333a113.92 113.92 0 0 0-16.128 57.770667c0.042667 63.914667 52.48 115.712 117.077334 115.626667 15.189333 0 30.208-2.901333 44.288-8.618667l111.36 96.085333a45.44 45.44 0 0 0 63.744 0 44.373333 44.373333 0 0 0 0-63.146666z"
              fill="white" p-id="21331"></path>
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
        <a-form :model="form" @submit="loginSubmit" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <div style="text-align: center; margin-bottom: 3vh; font-weight: 200">
            <div style="font-size: 36px;">Admin</div>
          </div>
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="form.username" />
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input type="password" v-model:value="form.password" @keyup.enter="loginSubmit" />
          </a-form-item>
          <div style="text-align: center;">
            <div class="submit-button" type="primary" @click="loginSubmit">
              登录
            </div>
          </div>
          <div class="copyright">
            Copyright © 2024
            @Inc Happy Technology
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style>
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
  width: 80vw;
  max-width: 300px;
  margin: 10vw auto;
  height: 50%;
  border-radius: 1vh;
  padding: 5vh 48px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.submit-button {
  padding: 5px 0;
  border-radius: 6px;
  width: 50%;
  margin: auto;
  border: 1px solid white;
  font-size: 200;
}

.submit-button:hover {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.1);
}

.ant-form {
  color: white !important;
}

label {
  color: white !important;
}

#form_item_username,
#form_item_password {
  background-color: transparent !important;
  color: white !important;
}

.ant-input:focus {
  border: 1px solid white;
}

.ant-input:hover {
  border: 1px solid white;
}

.copyright {
  margin-top: 12vh;
  font-size: 12px;
  text-align: center;
  color: white;
  font-weight: 200;
}
</style>