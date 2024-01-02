<script setup></script>

<template>
  <router-view />

  <el-button>el button</el-button>
  <div>
    <router-link to="/">home </router-link> |
    <router-link to="/page1">page1 </router-link> |
    <router-link to="/page2">page2 </router-link>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
