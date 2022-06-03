<template>
  <div class="home flex">
    <!-- 左 -->
    <nav class="nav h-full">
      <home-nav></home-nav>
    </nav>

    <!-- 右 -->
    <main class="main h-full flex-1">
      <header class="header">
        <div>{{ bread }}</div>
        <el-dropdown>
          <el-avatar :size="50">{{ userInfo.name }}</el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLogout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </header>
      <div class="content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HomeNav from '../components/HomeNav.vue'
import localCache from '../utils/cache'

const router = useRouter()
const route = useRoute()

const permission = localCache.getCache('permission')
const currentPath = route.path
const bread = ref('')
permission.menu.forEach((item) => {
  if (item.to === currentPath) bread.value = `主页 / ${item.title}`
})

const userInfo = localCache.getCache('userInfo')

function handleLogout() {
  localCache.clearCache()
  router.push('/login')
}
</script>

<style scoped lang="less">
.home {
  .nav {
    width: 200px;
    min-width: 200px;
  }
  .main {
    .header {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 100px;
      background: #ebedef;
    }
    .content {
      height: calc(100% - 60px);
      overflow: auto;
      background: #f5f6f7;
    }
  }
}
</style>
