# 專案說明
學習如何使用 vite 建立 vue 專案, 並手動加入 vue-router , element-plus.
本文件記錄過程,供初始專案時使用.


## 版本資訊
nodejs v20.10
npm v10.2.3
vite v4
vue v3



## 步驟

### vite 建立基礎專案( vue + javascript )

```console=
# 建立專案
$ npm create vite@4 vue-vite-element-plus-starter

# 初始專案
$ cd my-vue-app
$ npm install
$ npm run dev
```

### 加入 element-plus

安裝 element-plus 
```console=
# install element-plus
$ npm install element-plus --save
```

安裝 vue auto import ( 免去手動宣告 )
```console=
# install unplugin-vue-components 和 unplugin-auto-import
$ npm install -D unplugin-vue-components unplugin-auto-import
```

在 vite 引入
```javascript=
// vite.cofig.js

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

在 main.js 引入 element-plus
```javascript=
// main.js

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './style.css'
import App from './App.vue'

createApp(App).use(router).use(ElementPlus).mount('#app')
```

測試 element-plus 是否正常載入 , 在 App.vue 加入 button 試試.
```html=
<el-button>el button</el-button>
```


### 加入 vue-router

基礎專案沒有包含 vue-router機制 , 將頁面拆解為 views & components.

```shell=
# install vue-router
$ npm install vue-router@4 --save
```

建立 router 結構

建立資料夾```src/router```

建立路由檔 ```src/router/index.js``` 

建立路由檔 ```src/router/routes.js``` 


```javascript=
// router/index.js

import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
 
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
 
router.beforeEach((to, from, next) => {
  next();
});
 
router.afterEach((to, from) => {
  const _title = to.meta.title;
  if (_title) {
    window.document.title = _title;
  }
});
 
export default router;
```

```javascript=
// router/routes.js

const routes = [
    {
        path: "/",
        name: "home",
        title: "首頁",
        component: () => import("@/views/home.vue"),
    },
    {
        path: "/",
        name: "page1",
        title: "page1",
        component: () => import("@/views/page1.vue"),
    },
    {
        path: "/",
        name: "page2",
        title: "page2",
        component: () => import("@/views/page2.vue"),
    },
];

export default routes;

```

在 ```main.js```引用 router

```javascript=
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './style.css'
import App from './App.vue'
import router from "./router/index";

createApp(App).use(router).use(ElementPlus).mount('#app')```

修改 Vite 的配置，支持 alias 別名 @
```javascript=
// vite.config.js

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import * as path from "path"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

若 IDE 內，path 出現文法報錯的紅色波浪線，安裝 @types/node

```shell=
$ npm install --save @types/node
```

以上完成了 router建制 , 接下將頁面拆分為 home/page1/page2

建立 ```src/views/home.vue```
建立 ```src/views/page1.vue```


```javascript=
// home.vue


<template>
    <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
</template>

<script setup>

</script>

```

```javascript=
// page1.vue

<script setup>
import { ref } from 'vue'


const count = ref(0)
</script>

<template>
    <h1>page1</h1>

    
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>

```

```javascript=
// App.vue

<script setup>
</script>

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

```

運行 ```npm run dev``` 驗證 vue-router 是否運作正常


### 參考資源

vue3-vite-router-typescript-starter
https://stackblitz.com/edit/vue3-vite-router-typescript-starter?file=src%2Fmain.ts,src%2Frouter.ts,src%2FApp.vue
