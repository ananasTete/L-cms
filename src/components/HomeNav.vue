<template>
  <div class="home-nav h-full">
    <div class="title">花店后台管理系统</div>
    <el-menu
      :default-active="currentIndex"
      class="el-menu-vertical-demo"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(item, index) in permission.menu"
        :key="index"
        :index="String(index)"
        @click="handlePush(item.to)"
      >
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import localCache from '../utils/cache'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const permission = localCache.getCache('permission')

const currentPath = route.path
const currentIndex = ref(0)
permission.menu.forEach((item, index) => {
  if (item.to === currentPath) {
    currentIndex.value = String(index)
    console.log(currentPath, item.to)
  }
})

const handleSelect = (index) => {
  console.log(index)
}
const handlePush = (route) => {
  router.push(route)
}
</script>

<style scoped lang="less">
.home-nav {
  // color: #fff;
  .el-menu-vertical-demo {
    // background: #ff7074;
    border: none;
  }
  .title {
    height: 50px;
    font-size: 18px;
    font-weight: 400;
    line-height: 50px;
    padding-left: 20px;
  }
}
</style>
