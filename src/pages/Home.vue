<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" theme="dark" mode="inline"
        @click="pageChange">
        <a-menu-item key="user">
          <UserOutlined />
          <span>个人中心</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <div class="bg-white flex p-4 justify-between">
        <div class="flex">
          <div class="font-semibold text-xl">Demo</div>
        </div>
        <div class="flex">
          <p class="my-auto mr-5">欢迎你, {{ user.username }}</p>
          <a @click="logout" class="my-auto">登出</a>
        </div>
      </div>
      <a-layout-content class="p-3 overflow-scroll" :style="'height:' + contentHeight">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import {
  UserOutlined,
} from "@ant-design/icons-vue";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import { info } from "../api/controller/user.api";
import { user } from "../store";

// 路由切换
const router = useRouter();
const pageChange = ({ key }) => {
  if (key) router.push({ path: key });
};
const route = useRoute();

const tmp = route.path.split("/");
const page = tmp[tmp.length - 1];

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>([page]);
const openKeys = ref([""]);

// 如果屏幕宽度小于768，收起侧边栏
onMounted(() => {
  if (window.innerWidth < 768) {
    collapsed.value = true;
  }
});

// 保存openKeys
const saveOpenKeys = () => {
  localStorage.setItem("openKeys", JSON.stringify(openKeys.value));
};
const loadOpenKeys = () => {
  const openKeysStr = localStorage.getItem("openKeys");
  if (openKeysStr) {
    openKeys.value = JSON.parse(openKeysStr);
  }
};

watch(
  () => openKeys.value,
  () => {
    saveOpenKeys();
  }
);

loadOpenKeys()

const userInfo = async () => {
  const { data } = await info();
  if (!data) {
    router.replace("/login");
    return;
  }
  Object.assign(user, data);
};

userInfo();

const logout = async () => {
  localStorage.removeItem("TOKEN");
  router.replace({ path: "/login" });
};

// content高度
const contentHeight = ref(0);
onMounted(() => {
  contentHeight.value = document.body.offsetHeight - 60;
});
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>