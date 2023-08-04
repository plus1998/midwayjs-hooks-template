<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
}
.ant-layout {
  overflow-x: scroll;
}
</style>
